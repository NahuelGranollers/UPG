import { useEffect, useRef, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

type PeerMap = Record<string, RTCPeerConnection>;

const STUN_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:global.stun.twilio.com:3478' }
  ],
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
  const animationFrameRef = useRef<number>();

  // Cleanup function for audio context and stream
  const cleanupAudio = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      localStreamRef.current = null;
    }

    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(console.error);
      audioCtxRef.current = null;
    }
    
    analyserRef.current = null;
    setVoiceLevel(0);
  }, []);

  // Handle incoming WebRTC signals
  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleSignal = async ({ fromUserId, data }: { fromUserId: string; data: any }) => {
      if (!localStreamRef.current) return;

      let pc = peersRef.current[fromUserId];

      // If we receive an offer, we must create the PC if it doesn't exist
      if (!pc) {
        if (data.type === 'offer') {
          pc = createPeerConnection(fromUserId);
          peersRef.current[fromUserId] = pc;
        } else {
          // If we receive an answer or candidate for a non-existent PC, ignore or handle error
          return;
        }
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
        console.error('Error handling signal from', fromUserId, err);
      }
    };

    socket.on('voice:signal', handleSignal);

    // Handle voice state updates to initiate P2P connections when joining
    const handleVoiceState = (states: Record<string, string>) => {
      if (pendingOfferRef.current) {
        const myChannel = pendingOfferRef.current;
        const participants = Object.entries(states)
          .filter(([uid, ch]) => ch === myChannel)
          .map(([uid]) => uid);
        
        offerToUsers(participants);
        pendingOfferRef.current = null;
      }
    };
    socket.on('voice:state', handleVoiceState);

    return () => {
      socket.off('voice:signal', handleSignal);
      socket.off('voice:state', handleVoiceState);
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

    // Handle remote stream
    pc.ontrack = (ev) => {
      const remoteStream = ev.streams[0];
      if (!remoteStream) return;

      // Create or reuse audio element
      let audioEl = document.getElementById(`audio-${remoteUserId}`) as HTMLAudioElement;
      if (!audioEl) {
        audioEl = document.createElement('audio');
        audioEl.id = `audio-${remoteUserId}`;
        audioEl.autoplay = true;
        audioEl.setAttribute('playsinline', '');
        audioEl.style.display = 'none';
        document.body.appendChild(audioEl);
      }
      audioEl.srcObject = remoteStream;
      audioEl.play().catch(e => console.warn('Autoplay prevented:', e));
    };

    pc.onicecandidate = (ev) => {
      if (ev.candidate && socket) {
        socket.emit('voice:signal', { toUserId: remoteUserId, data: { candidate: ev.candidate } });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        const audioEl = document.getElementById(`audio-${remoteUserId}`);
        if (audioEl) audioEl.remove();
        
        // Only cleanup PC if it's truly dead
        if (pc.connectionState !== 'closed') {
           pc.close();
        }
        delete peersRef.current[remoteUserId];
      }
    };

    return pc;
  }

  async function ensureLocalStream() {
    if (localStreamRef.current) return localStreamRef.current;
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast.error('Tu navegador no soporta llamadas de voz.');
      throw new Error('Browser does not support getUserMedia');
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      localStreamRef.current = stream;

      // Setup AudioContext for visualizer only
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        const source = audioCtxRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioCtxRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);
        
        const updateLevel = () => {
          if (!analyserRef.current) return;
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          
          // Calculate RMS
          let sum = 0;
          for(let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i] * dataArray[i];
          }
          const rms = Math.sqrt(sum / dataArray.length);
          // Normalize to 0-100 roughly
          setVoiceLevel(Math.min(100, (rms / 255) * 200));
          
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        };
        updateLevel();
      } catch (e) {
        console.warn('Audio analyser setup failed', e);
      }

      return stream;
    } catch (err) {
      console.error('getUserMedia error', err);
      throw err;
    }
  }

  async function joinChannel(channelId: string) {
    if (!socket) {
      toast.error('No hay conexión con el servidor.');
      return;
    }
    if (!currentUser) {
      toast.error('Debes iniciar sesión para unirte al chat de voz.');
      return;
    }

    try {
      await ensureLocalStream();
      
      // Emit join to server
      socket.emit('voice:join', { channelId });
      
      setInChannel(channelId);
      pendingOfferRef.current = channelId;
      setIsMuted(false);
      toast.success(`Conectado a ${channelId}`);
    } catch (e) {
      console.error('Failed to join voice channel', e);
      toast.error('No se pudo acceder al micrófono. Verifica los permisos.');
    }
  }

  function toggleMute() {
    if (!localStreamRef.current) return;
    const newMuted = !isMuted;
    localStreamRef.current.getAudioTracks().forEach(track => {
      track.enabled = !newMuted;
    });
    setIsMuted(newMuted);
  }

  function consumePendingOffer() {
    const v = pendingOfferRef.current;
    pendingOfferRef.current = null;
    return v;
  }

  async function offerToUsers(userIds: string[]) {
    if (!socket || !currentUser) return;
    
    for (const uid of userIds) {
      if (uid === currentUser.id) continue;
      
      // Close existing connection if any
      if (peersRef.current[uid]) {
        peersRef.current[uid].close();
      }

      const pc = createPeerConnection(uid);
      peersRef.current[uid] = pc;

      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('voice:signal', { toUserId: uid, data: pc.localDescription });
      } catch (err) {
        console.error('Error creating offer for', uid, err);
      }
    }
  }

  function closeAll() {
    // Notify server we are leaving
    if (socket && inChannel) {
      socket.emit('voice:leave', { channelId: inChannel });
    }

    // Close all peer connections
    Object.entries(peersRef.current).forEach(([uid, pc]) => {
      pc.close();
      const audioEl = document.getElementById(`audio-${uid}`);
      if (audioEl) audioEl.remove();
    });
    peersRef.current = {};
    
    cleanupAudio();
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
