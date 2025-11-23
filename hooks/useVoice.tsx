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

    const handleSignal = async ({ fromUserId, data }: { fromUserId: string; data: any }) => {
      if (!currentUser) return;
      // Ensure peer exists
      let pc = peersRef.current[fromUserId];
      if (!pc) {
        pc = createPeerConnection(fromUserId);
        peersRef.current[fromUserId] = pc;
      }

      try {
        if (data.type === 'offer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          socket.emit('voice:signal', { toUserId: fromUserId, data: pc.localDescription });
        } else if (data.type === 'answer') {
          await pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
      } catch (err) {
        console.error('Error handling signal', err);
      }
    };

    socket.on('voice:signal', handleSignal);

    return () => {
      socket.off('voice:signal', handleSignal);
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
