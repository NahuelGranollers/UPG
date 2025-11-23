import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

type PeerMap = Record<string, RTCPeerConnection>;

const STUN_SERVERS = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export function useVoice() {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<PeerMap>({});
  const [inChannel, setInChannel] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [voiceLevel, setVoiceLevel] = useState<number>(0);
  const pendingOfferRef = useRef<string | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!socket) return;

    // Handler for incoming relayed audio chunks from server
    const handleChunk = (payload: { fromUserId: string; buffer: ArrayBuffer; sampleRate: number }) => {
      try {
        const { fromUserId, buffer, sampleRate } = payload as any;
        // Convert to Float32Array and play via AudioContext
        const float32 = new Float32Array(buffer);
        if (!audioCtxRef.current) {
          audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioCtxRef.current;
        const audioBuffer = ctx.createBuffer(1, float32.length, sampleRate || ctx.sampleRate);
        audioBuffer.copyToChannel(float32, 0, 0);
        const src = ctx.createBufferSource();
        src.buffer = audioBuffer;
        src.connect(ctx.destination);
        src.start();
      } catch (e) {
        console.error('Error playing remote audio chunk', e);
      }
    };

    const handleLevel = (data: { userId: string; level: number }) => {
      // emit a custom event so App can subscribe if needed; we'll also update local ref
      try {
        // store last known levels in a ref for consumers; simplest approach is emitting via socket listener in App
        // no-op here; App registers its own handler for 'voice:level'
      } catch (e) {}
    };

    socket.on('voice:chunk', handleChunk as any);
    socket.on('voice:level', handleLevel as any);

    return () => {
      socket.off('voice:chunk', handleChunk as any);
      socket.off('voice:level', handleLevel as any);
    };
  }, [socket, currentUser]);

  function createPeerConnection(remoteUserId: string) {
    const pc = new RTCPeerConnection(STUN_SERVERS);

    // Add local tracks
    if (localStreamRef.current) {
      for (const track of localStreamRef.current.getTracks()) {
        pc.addTrack(track, localStreamRef.current);
      }
    }

    // Create audio element for remote stream
    const remoteStream = new MediaStream();
    const audioEl = document.createElement('audio');
    audioEl.autoplay = true;
    audioEl.setAttribute('playsinline', '');
    audioEl.style.display = 'none';
    document.body.appendChild(audioEl);

    pc.ontrack = ev => {
      try {
        for (const t of ev.streams) {
          t.getTracks().forEach(track => remoteStream.addTrack(track));
        }
        audioEl.srcObject = remoteStream;
        // Try to play (some browsers require a user gesture but attempt anyway)
        const p = audioEl.play();
        if (p && typeof p.then === 'function') {
          p.catch(err => {
            console.warn('Autoplay prevented for remote audio:', err);
          });
        }
      } catch (e) {
        console.error('ontrack error', e);
      }
    };

    pc.onicecandidate = ev => {
      if (ev.candidate && socket && currentUser) {
        socket.emit('voice:signal', { toUserId: remoteUserId, data: { candidate: ev.candidate } });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
        // cleanup
        audioEl.remove();
        pc.close();
        delete peersRef.current[remoteUserId];
      }
    };

    return pc;
  }

  async function ensureLocalStream() {
    if (localStreamRef.current) return localStreamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      try {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtxRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        source.connect(analyserRef.current);
        const data = new Uint8Array(analyserRef.current.frequencyBinCount);
        const loop = () => {
          if (!analyserRef.current) return;
          analyserRef.current.getByteFrequencyData(data);
          // compute RMS
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            const v = data[i] / 255;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / data.length);
          setVoiceLevel(rms);
          requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
      } catch (e) {
        console.warn('Audio analyser not available', e);
      }
      return stream;
    } catch (err) {
      console.error('getUserMedia error', err);
      throw err;
    }
  }

  // Call this to join (or toggle) a voice channel
  async function joinChannel(channelId: string) {
    if (!socket || !currentUser) return;

    // Obtain mic first
    await ensureLocalStream();

    // Emit join to server which updates voice state
    socket.emit('voice:join', { channelId });

    // Mark as attempting join; actual state updated from 'voice:state' handler in App
    setInChannel(channelId);
    pendingOfferRef.current = channelId;

    // Start streaming raw audio chunks to server.
    try {
      if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioCtxRef.current;
      const source = ctx.createMediaStreamSource(localStreamRef.current as MediaStream);
      // Create a silent gain to keep the graph alive when necessary
      const zeroGain = ctx.createGain();
      zeroGain.gain.value = 0;
      zeroGain.connect(ctx.destination);

      // Prefer AudioWorklet (modern, non-deprecated) and fall back to ScriptProcessor if unavailable
      let usedWorklet = false;
      if (ctx.audioWorklet && typeof ctx.audioWorklet.addModule === 'function') {
        try {
          // Load worklet relative to current page so it works on GitHub Pages subpaths
          const workletUrl = new URL('voice-processor.js', window.location.href).href;
          await ctx.audioWorklet.addModule(workletUrl);
          const node: any = new (window as any).AudioWorkletNode(ctx, 'voice-processor', {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [1],
            processorOptions: { chunkSize: 4096 },
          });
          // Listen for chunk & level messages from the worklet
          node.port.onmessage = (ev: MessageEvent) => {
            try {
              const d = ev.data as any;
              if (d && d.type === 'chunk') {
                const ab = d.samples as ArrayBuffer;
                // forward binary buffer to server (socket.io supports binary)
                if (socket && ab) {
                  socket.emit('voice:chunk', { buffer: ab, sampleRate: ctx.sampleRate });
                }
                if (typeof d.level === 'number') setVoiceLevel(d.level);
              } else if (d && d.type === 'level') {
                if (typeof d.level === 'number') setVoiceLevel(d.level);
              }
            } catch (e) {
              console.error('Worklet message handling error', e);
            }
          };
          // connect graph: source -> worklet -> zeroGain (keeps node alive)
          source.connect(node);
          node.connect(zeroGain);
          (localStreamRef as any).processorNode = node;
          (localStreamRef as any).zeroGain = zeroGain;
          usedWorklet = true;
        } catch (e) {
          console.warn('AudioWorklet failed, falling back to ScriptProcessor', e);
        }
      }

      if (!usedWorklet) {
        // Fallback to ScriptProcessor for older browsers
        const processor = (ctx.createScriptProcessor || (ctx as any).createJavaScriptNode).call(ctx, 4096, 1, 1);
        processor.onaudioprocess = ev => {
          try {
            const input = ev.inputBuffer.getChannelData(0);
            // copy to Float32Array
            const buffer = new Float32Array(input.length);
            buffer.set(input);
            // emit as ArrayBuffer
            if (socket && buffer.buffer) {
              socket.emit('voice:chunk', { buffer: buffer.buffer, sampleRate: ctx.sampleRate });
            }
          } catch (e) {
            console.error('Error processing local audio', e);
          }
        };
        source.connect(processor);
        processor.connect(zeroGain);
        // save nodes for cleanup
        (localStreamRef as any).processorNode = processor;
        (localStreamRef as any).zeroGain = zeroGain;
      }
    } catch (e) {
      console.error('Failed to start audio chunking', e);
    }
  }

  function toggleMute() {
    if (!localStreamRef.current) return;
    const newMuted = !isMuted;
    for (const track of localStreamRef.current.getAudioTracks()) {
      track.enabled = !newMuted;
    }
    setIsMuted(newMuted);
  }

  function consumePendingOffer() {
    const v = pendingOfferRef.current;
    pendingOfferRef.current = null;
    return v;
  }

  // Create offers to a list of existing participants (call this when you join and server emits voice:state)
  async function offerToUsers(userIds: string[]) {
    if (!socket || !currentUser) return;
    for (const uid of userIds) {
      if (uid === currentUser.id) continue;
      // create pc if not exists
      let pc = peersRef.current[uid];
      if (!pc) {
        pc = createPeerConnection(uid);
        peersRef.current[uid] = pc;
      }
      try {
        if (localStreamRef.current) {
          for (const track of localStreamRef.current.getTracks()) pc.addTrack(track, localStreamRef.current);
        }
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('voice:signal', { toUserId: uid, data: pc.localDescription });
      } catch (err) {
        console.error('Error creating offer', err);
      }
    }
  }

  function closeAll() {
    for (const k of Object.keys(peersRef.current)) {
      try {
        peersRef.current[k].close();
      } catch (e) {}
      delete peersRef.current[k];
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    setInChannel(null);
    // cleanup processor if present
    try {
      const proc = (localStreamRef as any).processorNode;
      const zg = (localStreamRef as any).zeroGain;
      if (proc) {
        try {
          proc.disconnect();
        } catch (e) {}
        try { if ((proc as any).onaudioprocess) (proc as any).onaudioprocess = null; } catch(e){}
        try { if ((proc as any).port) (proc as any).port.onmessage = null; } catch(e){}
        delete (localStreamRef as any).processorNode;
      }
      if (zg) {
        zg.disconnect();
        delete (localStreamRef as any).zeroGain;
      }
    } catch (e) {}
  }

  return {
    joinChannel,
    offerToUsers,
    closeAll,
    inChannel,
    toggleMute,
    isMuted,
    voiceLevel,
    consumePendingOffer,
  };
}

export default useVoice;
