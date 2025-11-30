import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { getBackendUrl } from '../utils/config';
import { toast } from 'sonner';
import { Menu, Gamepad2, Users, Smartphone, Globe, Check, Eye, EyeOff, LogOut, Trash2, Lock, Play, Zap, Skull, User, RotateCcw, MessageSquare } from 'lucide-react';
import Modal from './Modal';

interface PlayerInfo {
  id: string;
  username: string;
  revealedInnocent?: boolean;
}

const OFFLINE_WORDS = [
  { category: 'Animales', words: ['Elefante', 'Jirafa', 'León', 'Pingüino', 'Tiburón', 'Águila', 'Delfín', 'Tigre', 'Oso', 'Cebra'] },
  { category: 'Comida', words: ['Pizza', 'Sushi', 'Hamburguesa', 'Tacos', 'Helado', 'Paella', 'Chocolate', 'Ensalada', 'Espaguetis', 'Tarta'] },
  { category: 'Lugares', words: ['Playa', 'Montaña', 'Cine', 'Hospital', 'Escuela', 'Biblioteca', 'Parque', 'Aeropuerto', 'Restaurante', 'Gimnasio'] },
  { category: 'Objetos', words: ['Teléfono', 'Silla', 'Reloj', 'Cuchara', 'Lápiz', 'Gafas', 'Llave', 'Mochila', 'Ordenador', 'Libro'] },
  { category: 'Profesiones', words: ['Médico', 'Profesor', 'Bombero', 'Policía', 'Cocinero', 'Astronauta', 'Pintor', 'Mecánico', 'Jardinero', 'Dentista'] },
];

export default function ImpostorGame({ 
  onClose,
  autoJoinRoomId,
  autoJoinPassword,
  onOpenSidebar
}: { 
  onClose?: () => void;
  autoJoinRoomId?: string;
  autoJoinPassword?: string;
  onOpenSidebar?: () => void;
}) {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  
  // Game Mode State
  const [gameMode, setGameMode] = useState<'online' | 'offline' | null>(null);
  
  // Offline Mode State
  const [offlinePlayers, setOfflinePlayers] = useState<{id: string, name: string, role?: 'impostor'|'crewmate', word?: string, seen?: boolean, isDead?: boolean}[]>([]);
  const [offlineNewPlayerName, setOfflineNewPlayerName] = useState('');
  const [offlinePhase, setOfflinePhase] = useState<'setup' | 'reveal' | 'game'>('setup');
  const [offlineRevealingPlayer, setOfflineRevealingPlayer] = useState<string | null>(null);
  const [offlineWord, setOfflineWord] = useState('');
  const [offlineImpostorName, setOfflineImpostorName] = useState('');

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [isHost, setIsHost] = useState(false);
  const [hostId, setHostId] = useState<string>('');
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const [publicServers, setPublicServers] = useState<any[]>([]);
  // Only show public server listing by default (no manual create/join UI)
  const [showPublicServers, setShowPublicServers] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [serverName, setServerName] = useState('');
  const [serverPassword, setServerPassword] = useState('');
  const [assigned, setAssigned] = useState<{
    role: 'impostor' | 'crewmate';
    word: string | null;
  } | null>(null);
  const [pendingAssigned, setPendingAssigned] = useState<any>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [voting, setVoting] = useState(false);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({});
  const [votingResult, setVotingResult] = useState<any>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [turnOrder, setTurnOrder] = useState<string[]>([]);
  const [revealInfo, setRevealInfo] = useState<{
    impostorId: string | null;
    word?: string | null;
  } | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [revealPhase, setRevealPhase] = useState<'hidden' | 'enter' | 'visible' | 'exit'>('hidden');
  const [revealedPlayer, setRevealedPlayer] = useState<{
    id: string;
    wasImpostor: boolean;
    word?: string | null;
  } | null>(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [revealedRoles, setRevealedRoles] = useState<Record<
    string,
    'impostor' | 'crewmate'
  > | null>(null);
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [joined, setJoined] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTime, setSelectedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [showGuessInput, setShowGuessInput] = useState(false);
  const [mobileTab, setMobileTab] = useState<'game' | 'info'>('game');
  const [gameOverInfo, setGameOverInfo] = useState<{
    winner: 'impostor' | 'crewmates';
    word: string;
    impostorName: string;
    reason?: string;
  } | null>(null);

  // UI / Modal States
  const [showEliminateModal, setShowEliminateModal] = useState(false);
  const [playerToEliminate, setPlayerToEliminate] = useState<{id: string, name: string} | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [targetServerId, setTargetServerId] = useState<string | null>(null);

  // Offline Logic
  const handleAddOfflinePlayer = () => {
    if (!offlineNewPlayerName.trim()) return;
    if (offlinePlayers.some(p => p.name.toLowerCase() === offlineNewPlayerName.trim().toLowerCase())) {
      toast.error('Ese nombre ya existe');
      return;
    }
    setOfflinePlayers([...offlinePlayers, { id: Date.now().toString(), name: offlineNewPlayerName.trim() }]);
    setOfflineNewPlayerName('');
  };

  const handleStartOfflineGame = async () => {
    if (offlinePlayers.length < 3) {
      toast.error('Mínimo 3 jugadores');
      return;
    }

    const startWithWord = (word: string) => {
        // 2. Assign roles
        const impostorIndex = Math.floor(Math.random() * offlinePlayers.length);
        const playersWithRoles = offlinePlayers.map((p, index) => ({
          ...p,
          role: (index === impostorIndex ? 'impostor' : 'crewmate') as 'impostor' | 'crewmate',
          word: index === impostorIndex ? null : word,
          seen: false,
          isDead: false
        }));

        setOfflineWord(word);
        setOfflineImpostorName(playersWithRoles[impostorIndex].name);
        setOfflinePlayers(playersWithRoles);
        setOfflinePhase('reveal');
        setJoined(true);
    };

    const categoryToUse = selectedCategory.trim() || 'General';
    const toastId = toast.loading(`Generando palabra (${categoryToUse})...`);

    try {
        const API_URL = getBackendUrl();
        const response = await fetch(`${API_URL}/api/generate-word`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: categoryToUse })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        toast.dismiss(toastId);

        if (data && data.word) {
            startWithWord(data.word);
        } else {
            throw new Error('Invalid response');
        }
    } catch (error) {
        console.error("Error generating word:", error);
        toast.dismiss(toastId);
        toast.error("Error conectando con IA. Usando palabras locales.");
        
        // Fallback
        const category = OFFLINE_WORDS[Math.floor(Math.random() * OFFLINE_WORDS.length)];
        const word = category.words[Math.floor(Math.random() * category.words.length)];
        startWithWord(word);
    }
  };

  const handleOfflineReveal = (playerId: string) => {
    setOfflineRevealingPlayer(playerId);
  };

  const handleOfflineConfirmSeen = () => {
    if (!offlineRevealingPlayer) return;
    setOfflinePlayers(prev => prev.map(p => p.id === offlineRevealingPlayer ? { ...p, seen: true } : p));
    setOfflineRevealingPlayer(null);
  };

  const checkOfflineAllSeen = () => {
    if (offlinePlayers.every(p => p.seen)) {
      // Start Game
      // Randomize turn order
      const shuffledIds = [...offlinePlayers].map(p => p.id).sort(() => Math.random() - 0.5);
      setTurnOrder(shuffledIds);
      setCurrentTurn(shuffledIds[0]);
      setPlayers(offlinePlayers.map(p => ({ id: p.id, username: p.name }))); // Map to standard player format for UI
      setGameStarted(true);
      setOfflinePhase('game');
      setJoined(true); // To show game UI
      setIsHost(true); // Enable controls
    }
  };

  useEffect(() => {
    if (gameMode === 'offline' && offlinePhase === 'reveal') {
      checkOfflineAllSeen();
    }
  }, [offlinePlayers, offlinePhase, gameMode]);

  const handleOfflineNextTurn = () => {
    if (!currentTurn) return;
    const currentIndex = turnOrder.indexOf(currentTurn);
    let nextIndex = (currentIndex + 1) % turnOrder.length;
    let attempts = 0;
    
    // Find next alive player
    while (attempts < turnOrder.length) {
        const nextId = turnOrder[nextIndex];
        const player = offlinePlayers.find(p => p.id === nextId);
        if (player && !player.isDead) {
            setCurrentTurn(nextId);
            return;
        }
        nextIndex = (nextIndex + 1) % turnOrder.length;
        attempts++;
    }
  };

  const handleOfflineEliminate = (playerId: string) => {
    const player = offlinePlayers.find(p => p.id === playerId);
    if (!player) return;

    // Mark as dead
    const updatedPlayers = offlinePlayers.map(p => p.id === playerId ? { ...p, isDead: true } : p);
    setOfflinePlayers(updatedPlayers);
    
    // Update UI players list
    setPlayers(updatedPlayers.map(p => ({ id: p.id, username: p.name, revealedInnocent: p.isDead && p.role !== 'impostor' })));

    if (player.role === 'impostor') {
      // Crewmates win
      setGameOverInfo({
        winner: 'crewmates',
        word: offlineWord,
        impostorName: player.name,
        reason: 'voted_out'
      });
    } else {
      // Check if impostor wins (1 vs 1)
      const aliveCrewmates = updatedPlayers.filter(p => !p.isDead && p.role === 'crewmate').length;
      const aliveImpostor = updatedPlayers.some(p => !p.isDead && p.role === 'impostor');
      
      if (aliveImpostor && aliveCrewmates <= 1) {
        setGameOverInfo({
          winner: 'impostor',
          word: offlineWord,
          impostorName: offlineImpostorName,
          reason: 'impostor_majority'
        });
      } else {
        toast.error(`${player.name} era INOCENTE. La ronda continúa.`);
        // Next turn if eliminated player was current turn
        if (currentTurn === playerId) {
            // Logic to find next turn is complex here because state update is async
            // For simplicity, just force next turn logic in next render or manually call it
            // But we need updated state. 
            // Let's just let the user click "Next Turn" or auto-advance?
            // Auto-advance is better.
            // We'll rely on the effect or just let the "Terminar Turno" button handle it if it was their turn.
            // Actually, if they are dead, they can't click.
            // So we should advance turn.
        }
      }
    }
  };

  useEffect(() => {
    if (!socket || !currentUser) return;

    // Auto-join logic when props are provided
    if (autoJoinRoomId && !joined) {
      setGameMode('online'); // Force online mode for auto-join
      setRoomId(autoJoinRoomId);
      setUsername(currentUser.username || '');
      
      // Attempt to join the room
      setTimeout(() => {
        const generatedUserId = currentUser?.id || `guest-${Math.random().toString(36).slice(2, 8)}`;
        setUserId(generatedUserId);
        socket.emit('impostor:join-room', { 
          roomId: autoJoinRoomId, 
          userId: generatedUserId, 
          username: currentUser.username || '',
          password: autoJoinPassword
        }, (res: any) => {
          if (res && res.ok) {
            setJoined(true);
            setStatusMessage('Te has unido a la sala');
          } else {
            setStatusMessage(res?.error || 'Error al unirse');
            // Reset to allow manual joining if auto-join fails
            setRoomId('');
            setUserId('');
          }
        });
      }, 100); // Small delay to ensure socket is ready
    }
  }, [socket, currentUser, autoJoinRoomId, autoJoinPassword]);

  useEffect(() => {
    if (!socket) return;

    const onRoomState = (data: any) => {
      setPlayers(data.players || []);
      const hostIdFromData = data.hostId || '';
      setHostId(hostIdFromData);
      // Check if current user is host
      const currentUserId = userId || currentUser?.id;
      setIsHost(hostIdFromData === currentUserId);
      setJoined(true);
      setGameStarted(data.started || false);
      setCustomWords(data.customWords || []);
      
      // Update turn info
      if (data.turnOrder) setTurnOrder(data.turnOrder);
      if (data.currentTurn) setCurrentTurn(data.currentTurn);
      
      // Update roomId if provided
      if (data.roomId && data.roomId !== roomId) {
        setRoomId(data.roomId);
      }
    };

    const onAssign = (data: any) => {
      // data: { role, word }
      // show spinner animation then reveal
      setPendingAssigned(data);
      setSpinning(true);
      setTimeout(() => {
        setAssigned(data);
        setCardRevealed(true);
        setStatusMessage(data.role === 'impostor' ? 'Eres el IMPOSTOR' : `Palabra: ${data.word}`);
        setSpinning(false);
      }, 1400);
    };

    const onTurnUpdate = (d: any) => {
      if (d.currentTurn) setCurrentTurn(d.currentTurn);
      if (d.turnOrder) setTurnOrder(d.turnOrder);
    };

    const onVotingStart = (d: any) => {
      setVoting(true);
      setMyVote(null);
      setVoteCounts({});
      setVotingResult(null);
      setTotalVotes(0);
      setStatusMessage('Votación iniciada');
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), type: 'warning', message: '¡Votación iniciada!', timestamp: new Date() },
      ]);
      setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
    };

    const onVotingUpdate = (d: any) => {
      setVoteCounts(d.counts || {});
      setTotalVotes(d.totalVotes || 0);
    };

    const onVotingResult = (d: any) => {
      setVoting(false);
      setVotingResult(d);
      if (d.eliminated) {
        // Show result overlay
        const p = players.find(player => player.username === d.eliminated);
        if (p) {
          setRevealedPlayer({
            id: p.id,
            wasImpostor: d.wasImpostor
          });
          // Auto hide after 4 seconds
          setTimeout(() => setRevealedPlayer(null), 4000);
        }

        // Show different behaviour depending if eliminated was the impostor
        if (d.wasImpostor) {
          setStatusMessage(`El jugador ${d.eliminated} era el impostor — ronda terminada`);
          setNotifications(prev => [
            ...prev,
            {
              id: Date.now(),
              type: 'success',
              message: `¡${d.eliminated} era el impostor! Ronda terminada.`,
              timestamp: new Date(),
            },
          ]);
        } else {
          setStatusMessage(`El jugador ${d.eliminated} era INOCENTE — la ronda continúa`);
          setNotifications(prev => [
            ...prev,
            {
              id: Date.now(),
              type: 'error',
              message: `${d.eliminated} era inocente. La ronda continúa.`,
              timestamp: new Date(),
            },
          ]);
        }
        setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
        // 'impostor:reveal' will also be emitted by server, client will receive it and show overlay
      } else {
        setStatusMessage('Empate — nadie ha sido eliminado');
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now(),
            type: 'info',
            message: 'Empate — nadie eliminado.',
            timestamp: new Date(),
          },
        ]);
        setTimeout(() => setNotifications(prev => prev.slice(1)), 5000);
      }
    };

    const onStarted = (d: any) => {
      setStatusMessage('Ronda iniciada');
      setGameStarted(true);
      if (d.turnOrder) setTurnOrder(d.turnOrder);
      if (d.currentTurn) setCurrentTurn(d.currentTurn);
    };

    const onRevealAll = (d: any) => {
      setRevealedRoles(d.players);
      setStatusMessage('Todas las cartas reveladas');
    };

    const onPlayerLeft = (d: any) => {
      setStatusMessage(`${d.username} ha abandonado la sala`);
      setNotifications(prev => [
        ...prev,
        {
          id: Date.now(),
          type: 'info',
          message: `${d.username} ha abandonado la sala`,
          timestamp: new Date(),
        },
      ]);
      setTimeout(() => setNotifications(prev => prev.slice(1)), 5000); // Auto remove after 5s
    };

    const onTimerUpdate = (data: any) => {
      setTimeLeft(data.timeLeft);
    };

    const onTimerEnd = () => {
      setTimeLeft(0);
      setStatusMessage('¡Tiempo agotado!');
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), type: 'warning', message: '¡Tiempo agotado!', timestamp: new Date() },
      ]);
    };

    const onGameOver = (data: any) => {
      setGameStarted(false);
      setVoting(false);
      setAssigned(null);
      setCardRevealed(false);
      
      setGameOverInfo({
        winner: data.winner,
        word: data.word,
        impostorName: data.impostorName,
        reason: data.reason
      });

      let msg = '';
      let type = 'info';
      
      if (data.winner === 'impostor') {
        msg = `¡El Impostor (${data.impostorName}) gana! Adivinó la palabra: ${data.word}`;
        type = 'error'; // Bad for crewmates
      } else {
        if (data.reason === 'voted_out') {
           msg = `¡Los Tripulantes ganan! El Impostor (${data.impostorName}) fue expulsado.`;
        } else {
           msg = `¡Los Tripulantes ganan! El Impostor (${data.impostorName}) falló al adivinar: ${data.guess} (Era: ${data.word})`;
        }
        type = 'success';
      }
      
      setStatusMessage(msg);
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), type: type, message: msg, timestamp: new Date() },
      ]);
    };

    const onRestarted = () => {
      setAssigned(null);
      setPendingAssigned(null);
      setVoting(false);
      setMyVote(null);
      setVoteCounts({});
      setVotingResult(null);
      setTotalVotes(0);
      setStatusMessage('Ronda reiniciada');
      setCardRevealed(false);
      setRevealedRoles(null);
      setGameStarted(false);
      setGameOverInfo(null);
      setTurnOrder([]);
      setCurrentTurn(null);
    };

    socket.on('impostor:room-state', onRoomState);
    socket.on('impostor:assign', onAssign);
    socket.on('impostor:started', onStarted);
    socket.on('impostor:reveal-all', onRevealAll);
    socket.on('impostor:player-left', onPlayerLeft);
    socket.on('impostor:turn-update', onTurnUpdate);
    socket.on('impostor:voting-start', onVotingStart);
    socket.on('impostor:voting-update', onVotingUpdate);
    socket.on('impostor:voting-result', onVotingResult);
    socket.on('impostor:timer-update', onTimerUpdate);
    socket.on('impostor:timer-end', onTimerEnd);
    socket.on('impostor:game-over', onGameOver);
    socket.on('impostor:restarted', onRestarted);

    return () => {
      socket.off('impostor:room-state', onRoomState);
      socket.off('impostor:assign', onAssign);
      socket.off('impostor:started', onStarted);
      socket.off('impostor:turn-update', onTurnUpdate);
      socket.off('impostor:voting-start', onVotingStart);
      socket.off('impostor:voting-update', onVotingUpdate);
      socket.off('impostor:voting-result', onVotingResult);
      socket.off('impostor:reveal-all', onRevealAll);
      socket.off('impostor:player-left', onPlayerLeft);
      socket.off('impostor:timer-update', onTimerUpdate);
      socket.off('impostor:timer-end', onTimerEnd);
      socket.off('impostor:game-over', onGameOver);
      socket.off('impostor:restarted', onRestarted);
    };
  }, [socket, currentUser]);

  // Update isHost when userId or hostId changes
  useEffect(() => {
    const currentUserId = userId || currentUser?.id;
    setIsHost(hostId === currentUserId);
  }, [userId, hostId, currentUser?.id]);

  const handleCreate = () => {
    if (!socket) return;
    if (!roomId || !username) return setStatusMessage('Room y nombre requeridos');
    const generatedUserId =
      userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2, 8)}`;
    setUserId(generatedUserId);
    socket.emit(
      'impostor:create-room',
      { roomId, userId: generatedUserId, username },
      (res: any) => {
        if (res && res.ok) {
          setJoined(true);
          setStatusMessage('Sala creada. Esperando jugadores...');
        } else {
          setStatusMessage(res?.error || 'Error creando sala');
        }
      }
    );
  };

  const handleJoin = () => {
    if (!socket) return;
    if (!roomId || !username) return setStatusMessage('Room y nombre requeridos');
    const generatedUserId =
      userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2, 8)}`;
    setUserId(generatedUserId);
    socket.emit('impostor:join-room', { roomId, userId: generatedUserId, username }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
        setStatusMessage('Te has unido a la sala');
      } else {
        setStatusMessage(res?.error || 'Error al unirse');
      }
    });
  };

  const handleLeave = () => {
    if (!socket) return;
    socket.emit('impostor:leave-room', { roomId, userId }, (res: any) => {
      setJoined(false);
      setPlayers([]);
      setAssigned(null);
      setIsHost(false);
      setHostId('');
      setStatusMessage('Has salido de la sala');
      setCardRevealed(false);
      setUserId('');
      setGameStarted(false);
    });
  };

  const handleStart = () => {
    if (!socket) return;
    console.log('Starting game with:', { roomId, userId, selectedCategory });
    socket.emit('impostor:start', { 
      roomId, 
      hostId: userId,
      category: selectedCategory
    }, (res: any) => {
      console.log('Start response:', res);
      if (res && res.ok) {
        setStatusMessage('Ronda iniciada — revisa tu carta');
        toast.success('Ronda iniciada');
      } else {
        toast.error('Error al iniciar: ' + (res?.error || 'No se pudo iniciar'));
      }
    });
  };

  const handleStartVoting = () => {
    if (!socket) return;
    socket.emit('impostor:start-voting', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación iniciada');
      else setStatusMessage(res?.error || 'No se pudo iniciar votación');
    });
  };

  const handleCastVote = (targetId: string) => {
    if (!socket) return;
    socket.emit(
      'impostor:cast-vote',
      { roomId, voterId: userId, votedId: targetId },
      (res: any) => {
        if (res && res.ok) setMyVote(targetId);
        else
          setStatusMessage(
            res?.error === 'dead_cannot_vote'
              ? 'Los muertos no pueden votar'
              : res?.error || 'Error votando'
          );
      }
    );
  };

  const handleEndVoting = () => {
    if (!socket) return;
    socket.emit('impostor:end-voting', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Votación cerrada');
      else setStatusMessage(res?.error || 'Error cerrando votación');
    });
  };

  const handleRevealAll = () => {
    if (!socket) return;
    socket.emit('impostor:reveal-all', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) setStatusMessage('Todas las cartas reveladas');
      else setStatusMessage(res?.error || 'Error al revelar todas las cartas');
    });
  };

  const handleRestart = () => {
    if (!socket) return;
    socket.emit('impostor:restart', { roomId, hostId: userId }, (res: any) => {
      if (res && res.ok) {
        setStatusMessage('Ronda reiniciada');
      } else {
        setStatusMessage(res?.error || 'Error reiniciando ronda');
      }
    });
  };

  const handleNextTurn = () => {
    if (!socket) return;
    socket.emit('impostor:next-turn', { roomId, userId }, (res: any) => {
      if (!res || !res.ok) {
        setStatusMessage(res?.error || 'Error cambiando turno');
      }
    });
  };

  const handleAddWord = (word: string) => {
    if (!socket || !word.trim()) return;
    socket.emit('impostor:add-word', { roomId, userId, word: word.trim() }, (res: any) => {
      if (!res || !res.ok) {
        setStatusMessage(res?.error || 'Error agregando palabra');
      } else {
        setCustomWords(prev => [...prev, word.trim()]);
        setStatusMessage('Palabra agregada');
      }
    });
  };


  // Fetch public servers
  const fetchPublicServers = async () => {
    try {
      const API_URL = getBackendUrl();
      const response = await fetch(`${API_URL}/api/servers`);
      const data = await response.json();
      setPublicServers(data.servers?.impostor || []);
    } catch (error) {
      console.error('Error fetching public servers:', error);
    }
  };

  // Listen for real-time updates from backend
  useEffect(() => {
    if (!socket) return;
    const handler = (payload: any) => {
      try {
        const list = (payload && payload.servers && payload.servers.impostor) || [];
        setPublicServers(list);
      } catch (e) {
        console.error('Error applying servers:updated payload', e);
      }
    };
    socket.on('servers:updated', handler);
    return () => {
      socket.off('servers:updated', handler);
    };
  }, [socket]);

  // Create public server
  const handleCreatePublicServer = (explicitRoomId?: string) => {
    if (!socket) return;
    const finalRoomId = explicitRoomId || roomId || `room_${Date.now()}`;
    if (!username) return;

    if (finalRoomId !== roomId) setRoomId(finalRoomId);

    const generatedUserId =
      userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2, 8)}`;
    
    // Set userId BEFORE emitting so it's available when room-state arrives
    setUserId(generatedUserId);

    socket.emit(
      'impostor:create-room',
      {
        roomId: finalRoomId,
        userId: generatedUserId,
        username,
        name: serverName || `Sala de ${username}`,
        password: serverPassword || null
      },
      (res: any) => {
        if (res && res.ok) {
          // Ensure roomId is set from server response
          if (res.roomId && res.roomId !== roomId) {
            setRoomId(res.roomId);
          }
          setJoined(true);
          setIsHost(true); // Creator is always host
          setHostId(generatedUserId);
          fetchPublicServers(); // Refresh the list
          toast.success('Sala pública creada');
        } else {
          toast.error('Error al crear sala pública: ' + (res?.error || 'Error desconocido'));
        }
      }
    );
  };

  // Join public server
  const handleJoinPublicServer = (serverRoomId: string, password?: string) => {
    if (!socket) return;
    if (!username) return;
    const generatedUserId =
      userId || currentUser?.id || `guest-${Math.random().toString(36).slice(2, 8)}`;
    setUserId(generatedUserId);
    setRoomId(serverRoomId);
    socket.emit('impostor:join-room', {
      roomId: serverRoomId,
      userId: generatedUserId,
      username,
      password
    }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
        fetchPublicServers(); // Refresh the list
        toast.success('Te has unido a la sala');
      } else {
        toast.error('Error al unirse a sala pública: ' + (res?.error || 'Error desconocido'));
      }
    });
  };

  const currentPlayer = players.find(p => p.id === userId);
  const isCurrentPlayerAlive = !currentPlayer?.revealedInnocent;

  // Calculate if all alive players have voted
  const alivePlayersCount = players.filter(p => !p.revealedInnocent).length;
  const allAliveVoted = totalVotes >= alivePlayersCount;

  return (
    <div className="flex flex-col h-screen w-full bg-discord-chat overflow-hidden">
      {/* Header - Fixed */}
      <div className="w-full py-4 px-2 sm:py-4 sm:px-4 lg:py-4 lg:px-6 flex-shrink-0 z-10 bg-discord-chat">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onOpenSidebar && (
              <button
                onClick={onOpenSidebar}
                className="md:hidden text-discord-text-muted hover:text-white"
                aria-label="Abrir menú"
              >
                <Menu size={24} />
              </button>
            )}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-discord-text-header">
              🎭 Impostor
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (joined) handleLeave();
                if (onClose) onClose();
              }}
              className="discord-button secondary"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Flex/Scrollable */}
      <div className="flex-1 w-full px-2 sm:px-4 lg:px-6 pb-4 overflow-hidden relative">
        {showCreateForm && !joined && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-discord-surface p-6 rounded-lg max-w-md w-full space-y-4">
              <h3 className="text-xl font-bold text-white">Crear Servidor Impostor</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-discord-text-muted uppercase">Nombre del Servidor</label>
                <input
                  type="text"
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  placeholder={`Sala de ${username}`}
                  className="w-full bg-discord-input p-2 rounded text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-discord-text-muted uppercase">Contraseña (Opcional)</label>
                <input
                  type="password"
                  value={serverPassword}
                  onChange={(e) => setServerPassword(e.target.value)}
                  placeholder="Dejar vacío para público"
                  className="w-full bg-discord-input p-2 rounded text-white"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 discord-button secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const newId = `room_${Date.now()}`;
                    handleCreatePublicServer(newId);
                    setShowCreateForm(false);
                  }}
                  className="flex-1 discord-button success"
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        )}

        {!joined && !gameMode ? (
          // Initial Mode Selection Screen
          <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">¿Cómo quieres jugar?</h2>
              <p className="text-discord-text-muted">Selecciona el modo de juego</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
              {/* Online Mode Card */}
              <button 
                onClick={() => setGameMode('online')}
                className="group relative overflow-hidden bg-discord-surface hover:bg-discord-surface-hover border border-discord-blurple/30 hover:border-discord-blurple rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-left"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-discord-blurple/20 flex items-center justify-center text-discord-blurple group-hover:bg-discord-blurple group-hover:text-white transition-colors">
                    <Globe size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Online Multijugador</h3>
                    <p className="text-discord-text-muted">
                      Juega con amigos a distancia. Cada uno usa su propio dispositivo.
                      <br/>
                      <span className="text-sm text-discord-blurple mt-2 inline-block">Requiere conexión a internet</span>
                    </p>
                  </div>
                </div>
              </button>

              {/* Offline Mode Card */}
              <button 
                onClick={() => setGameMode('offline')}
                className="group relative overflow-hidden bg-discord-surface hover:bg-discord-surface-hover border border-green-500/30 hover:border-green-500 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl text-left"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Smartphone size={120} />
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Offline Local</h3>
                    <p className="text-discord-text-muted">
                      Un solo dispositivo para todos. Pásalo a tus amigos.
                      <br/>
                      <span className="text-sm text-green-500 mt-2 inline-block">No requiere internet (ideal fiestas)</span>
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : !joined && gameMode === 'offline' ? (
          // Offline Setup Screen
          <div className="flex flex-col items-center justify-center h-full animate-fade-in p-4">
            <div className="bg-discord-surface p-6 rounded-2xl max-w-md w-full border border-discord-hover shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Configurar Partida Local</h2>
                <p className="text-discord-text-muted text-sm">Añade los nombres de los jugadores</p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={offlineNewPlayerName}
                    onChange={(e) => setOfflineNewPlayerName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOfflinePlayer()}
                    placeholder="Nombre del jugador..."
                    className="discord-input flex-1"
                    autoFocus
                  />
                  <button 
                    onClick={handleAddOfflinePlayer}
                    className="discord-button success px-4"
                    disabled={!offlineNewPlayerName.trim()}
                  >
                    <Check size={20} />
                  </button>
                </div>

                <div className="bg-discord-chat rounded-xl p-2 max-h-[300px] overflow-y-auto custom-scrollbar space-y-2 min-h-[100px]">
                  {offlinePlayers.length === 0 ? (
                    <div className="text-center text-discord-text-muted py-8 italic">
                      Añade al menos 3 jugadores
                    </div>
                  ) : (
                    offlinePlayers.map((p, idx) => (
                      <div key={p.id} className="flex items-center justify-between bg-discord-surface p-3 rounded-lg animate-slide-in-up group border border-transparent hover:border-discord-hover transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center font-bold text-white shadow-sm">
                            {p.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-white">{p.name}</span>
                        </div>
                        <button 
                          onClick={() => setOfflinePlayers(offlinePlayers.filter(x => x.id !== p.id))}
                          className="text-discord-text-muted hover:text-red-400 p-2 transition-colors opacity-0 group-hover:opacity-100"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-4 space-y-1">
                    <label className="text-xs font-bold text-discord-text-muted uppercase flex items-center gap-2">
                        <Zap size={12} className="text-yellow-400" />
                        Categoría de palabras (IA)
                    </label>
                    <input 
                        type="text"
                        className="discord-input w-full"
                        placeholder="Ej: Animales, Comida... (Vacío = General)"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    onClick={() => setGameMode(null)}
                    className="discord-button secondary flex-1"
                  >
                    Volver
                  </button>
                  <button 
                    onClick={handleStartOfflineGame}
                    disabled={offlinePlayers.length < 3}
                    className={`discord-button flex-1 flex items-center justify-center gap-2 ${offlinePlayers.length < 3 ? 'opacity-50 cursor-not-allowed' : 'success'}`}
                  >
                    <Play size={18} fill="currentColor" />
                    Iniciar ({offlinePlayers.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : !joined && gameMode === 'online' ? (
          <div className="h-full overflow-y-auto">
          <div className="max-w-2xl mx-auto mt-4 mb-4 px-4">
             <button onClick={() => setGameMode(null)} className="text-discord-text-muted hover:text-white flex items-center gap-2 mb-2">
               ← Volver a selección de modo
             </button>
          </div>
          {autoJoinRoomId ? (
            <div className="panel-glass lg liquid-glass bg-[#071017] p-6 rounded-lg max-w-md mx-auto mt-10">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto border-4 border-t-transparent border-discord-blurple animate-spin rounded-full"></div>
                <p className="text-discord-text-normal">Uniéndose a la sala {autoJoinRoomId}...</p>
              </div>
            </div>
          ) : (
            <div className="panel-glass lg liquid-glass bg-[#071017] p-6 rounded-lg max-w-2xl mx-auto mt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg text-discord-text-header font-semibold">Servidores Públicos Impostor</h3>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className="discord-button success"
                  >
                    Crear Servidor
                  </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto space-y-2 custom-scrollbar">
                  {publicServers.length === 0 ? (
                    <div className="text-center text-discord-text-muted py-8">No hay servidores públicos disponibles</div>
                  ) : (
                    publicServers.map((server) => (
                      <div key={server.roomId} className="discord-panel p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-discord-text-header font-semibold">{server.name}</h4>
                            <p className="text-sm text-discord-text-muted">
                              Host: {server.hostName} • {server.playerCount}/10 jugadores
                            </p>
                            {server.hasPassword && (
                              <span className="text-xs text-yellow-400">🔒 Protegido por contraseña</span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              if (server.hasPassword) {
                                setTargetServerId(server.roomId);
                                setPasswordInput('');
                                setShowPasswordModal(true);
                              } else {
                                handleJoinPublicServer(server.roomId);
                              }
                            }}
                            className="discord-button success"
                            disabled={server.playerCount >= 10}
                          >
                            {server.playerCount >= 10 ? 'Lleno' : 'Unirse'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          </div>
        ) : joined && gameMode === 'offline' && offlinePhase === 'reveal' ? (
           // Offline Reveal Phase
           <div className="flex flex-col items-center justify-center h-full p-4 animate-fade-in">
             <div className="bg-discord-surface p-6 rounded-2xl max-w-md w-full border border-discord-hover shadow-2xl text-center">
               <div className="mb-6">
                 <div className="w-16 h-16 bg-discord-blurple/20 rounded-full flex items-center justify-center mx-auto mb-3 text-discord-blurple">
                   <Eye size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-white mb-1">Revelar Roles</h2>
                 <p className="text-discord-text-muted text-sm">Pasa el dispositivo al jugador correspondiente para que vea su rol en secreto.</p>
               </div>
               
               <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-1">
                 {offlinePlayers.map(p => (
                   <button
                     key={p.id}
                     onClick={() => !p.seen && handleOfflineReveal(p.id)}
                     disabled={p.seen}
                     className={`p-4 rounded-xl border transition-all flex items-center justify-between group ${
                       p.seen 
                         ? 'bg-discord-chat border-transparent opacity-50 cursor-not-allowed' 
                         : 'bg-discord-surface hover:bg-discord-surface-hover border-discord-blurple/50 hover:border-discord-blurple shadow-sm hover:shadow-md hover:scale-[1.02]'
                     }`}
                   >
                     <div className="flex items-center gap-3">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${p.seen ? 'bg-gray-600' : 'bg-discord-blurple'}`}>
                         {p.name.charAt(0).toUpperCase()}
                       </div>
                       <span className={`font-bold text-lg ${p.seen ? 'text-discord-text-muted line-through' : 'text-white'}`}>{p.name}</span>
                     </div>
                     {p.seen ? (
                        <div className="flex items-center gap-1 text-green-500 text-sm font-bold uppercase">
                            <Check size={18} /> Listo
                        </div>
                     ) : (
                        <div className="flex items-center gap-1 text-discord-blurple text-sm font-bold uppercase group-hover:text-white transition-colors">
                            <Eye size={18} /> Ver
                        </div>
                     )}
                   </button>
                 ))}
               </div>
             </div>

             {/* Reveal Modal */}
             {offlineRevealingPlayer && (
               <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                 <div className="bg-discord-surface p-8 rounded-2xl max-w-sm w-full text-center space-y-6 animate-scale-in border border-discord-hover shadow-2xl relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-discord-blurple/5 to-transparent pointer-events-none" />
                   
                   <div className="space-y-2 relative z-10">
                     <h3 className="text-discord-text-muted uppercase text-xs font-bold tracking-widest">Jugador</h3>
                     <h2 className="text-3xl font-bold text-white">
                       {offlinePlayers.find(p => p.id === offlineRevealingPlayer)?.name}
                     </h2>
                   </div>

                   <div className="py-6 relative z-10">
                     <div className="text-discord-text-muted uppercase text-xs font-bold mb-4 tracking-widest">Tu Rol Secreto</div>
                     {(() => {
                       const p = offlinePlayers.find(x => x.id === offlineRevealingPlayer);
                       if (p?.role === 'impostor') {
                         return (
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-2 animate-pulse">
                                    <Skull size={48} />
                                </div>
                                <div className="text-5xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] tracking-tighter">IMPOSTOR</div>
                                <p className="text-red-400/80 text-sm font-medium">Engaña a los demás. No dejes que te descubran.</p>
                            </div>
                         );
                       } else {
                         return (
                           <div className="space-y-6">
                             <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-2">
                                    <User size={32} />
                                </div>
                                <div className="text-2xl font-black text-green-500 tracking-tight">CIVIL</div>
                             </div>
                             
                             <div className="bg-discord-chat/50 p-6 rounded-xl border border-discord-hover">
                               <p className="text-discord-text-muted text-xs uppercase font-bold mb-2">Tu palabra secreta</p>
                               <div className="text-4xl font-black text-white tracking-wide">
                                 {p?.word}
                               </div>
                             </div>
                           </div>
                         );
                       }
                     })()}
                   </div>

                   <button 
                     onClick={handleOfflineConfirmSeen}
                     className="w-full py-4 rounded-xl bg-discord-blurple hover:bg-discord-blurple-hover text-white font-bold text-lg transition-all transform active:scale-95 shadow-lg shadow-discord-blurple/20 flex items-center justify-center gap-2"
                   >
                     <Check size={20} />
                     Entendido, ocultar
                   </button>
                 </div>
               </div>
             )}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-[95%] 2xl:max-w-[1600px] mx-auto h-full pb-16 md:pb-0">
            {/* Main Game Area */}
            <div className={`md:col-span-3 xl:col-span-4 flex-col h-full overflow-hidden gap-4 ${mobileTab === 'info' ? 'hidden md:flex' : 'flex'}`}>
              {/* Game Header */}
              <div className="bg-discord-sidebar p-3 rounded-lg border border-discord-hover flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-discord-text-muted">Sala</div>
                    <div className="text-lg font-bold text-discord-text-header">
                      {gameMode === 'offline' ? 'Modo Offline' : roomId}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-discord-text-muted">
                      {players.length} jugador{players.length !== 1 ? 'es' : ''}
                    </div>
                    {timeLeft !== null && timeLeft > 0 && (
                      <div className="text-xl font-mono font-bold text-yellow-400">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </div>
                    )}
                    {!gameStarted && (
                      <div className="text-xs text-yellow-400">Esperando...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Player Cards Area - Scrollable */}
              <div className="bg-discord-sidebar p-4 rounded-lg border border-discord-hover flex-1 overflow-y-auto custom-scrollbar flex flex-col relative">
                
                {/* Ejection Result Overlay */}
                {revealedPlayer && (
                  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className={`p-8 rounded-xl max-w-md w-full mx-4 text-center shadow-2xl transform scale-100 animate-scale-in border ${revealedPlayer.wasImpostor ? 'bg-red-900/90 border-red-500' : 'bg-discord-surface border-discord-blurple'}`}>
                      <div className="mb-4">
                        <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl font-bold mb-4 ${revealedPlayer.wasImpostor ? 'bg-red-600' : 'bg-discord-sidebar'}`}>
                           {(players.find(p => p.id === revealedPlayer.id)?.username || revealedPlayer.id).charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-1">
                          {players.find(p => p.id === revealedPlayer.id)?.username || revealedPlayer.id}
                        </h2>
                        <div className={`text-xl font-black uppercase ${revealedPlayer.wasImpostor ? 'text-red-300' : 'text-green-400'}`}>
                          {revealedPlayer.wasImpostor ? 'Era el Impostor' : 'Era Inocente'}
                        </div>
                      </div>
                      
                      {!revealedPlayer.wasImpostor && (
                        <div className="text-discord-text-muted">
                          La ronda continúa...
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {/* Reveal overlay */}
                {showReveal && revealInfo && (
                  <div className="impostor-reveal-overlay fixed inset-0 z-60 flex items-center justify-center">
                      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                      <div
                        className={`impostor-reveal-panel discord-glass relative z-70 border border-discord-hover p-6 rounded-lg max-w-3xl w-full mx-4`}
                      >
                      <div className="text-sm text-discord-text-muted mb-2">REVELACIÓN</div>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
                        <div className="w-28 h-28 rounded-full avatar-accent flex items-center justify-center text-5xl font-extrabold shadow-lg">
                          {(
                            players.find(p => p.id === revealInfo.impostorId)?.username ||
                            revealInfo.impostorId ||
                            '?!'
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                        <div className="text-left">
                          <div className="text-lg text-red-300 uppercase font-extrabold">
                            Impostor
                          </div>
                          <div className="text-3xl font-bold mt-1">
                            {players.find(p => p.id === revealInfo.impostorId)?.username ||
                              revealInfo.impostorId}
                          </div>
                          <div className="text-sm text-discord-text-normal mt-2">
                            Palabra: <span className="font-semibold">{revealInfo.word}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setRevealPhase('exit');
                            setTimeout(() => {
                              setShowReveal(false);
                              setRevealInfo(null);
                              setRevealPhase('hidden');
                            }, 300);
                          }}
                          className="discord-button secondary"
                        >
                          Cerrar
                        </button>
                      </div>
                      <div className="confetti" aria-hidden>
                        {Array.from({ length: 28 }).map((_, i) => {
                          const left = Math.random() * 100;
                          const delay = Math.random() * 400;
                          const bg = [
                            '#FF6B6B',
                            '#FFB86L',
                            '#6BFFB8',
                            '#6BC8FF',
                            '#D56BFF',
                            '#FFD56B',
                          ][i % 6];
                          return (
                            <span
                              key={i}
                              style={{
                                left: `${left}%`,
                                top: `${-10 - Math.random() * 20}%`,
                                background: bg,
                                animationDelay: `${delay}ms`,
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Game Over Overlay */}
                {gameOverInfo && (
                  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in">
                    <div className="bg-discord-surface border border-discord-hover p-8 rounded-xl max-w-lg w-full mx-4 text-center shadow-2xl transform scale-100 animate-scale-in">
                      <div className="mb-6">
                        {gameOverInfo.winner === 'crewmates' ? (
                          <div className="text-5xl mb-2">🎉</div>
                        ) : (
                          <div className="text-5xl mb-2">😈</div>
                        )}
                        <h2 className={`text-3xl font-black uppercase ${gameOverInfo.winner === 'crewmates' ? 'text-green-400' : 'text-red-500'}`}>
                          {gameOverInfo.winner === 'crewmates' ? '¡Tripulantes Ganan!' : '¡Impostor Gana!'}
                        </h2>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        <div className="bg-discord-chat p-4 rounded-lg">
                          <div className="text-sm text-discord-text-muted uppercase font-bold mb-1">El Impostor era</div>
                          <div className="text-2xl font-bold text-white">{gameOverInfo.impostorName}</div>
                        </div>
                        
                        <div className="bg-discord-chat p-4 rounded-lg">
                          <div className="text-sm text-discord-text-muted uppercase font-bold mb-1">La Palabra era</div>
                          <div className="text-2xl font-bold text-yellow-400">{gameOverInfo.word}</div>
                        </div>

                        {gameOverInfo.reason && (
                          <div className="text-discord-text-normal italic">
                            {gameOverInfo.reason === 'voted_out' 
                              ? 'El impostor fue descubierto y expulsado.' 
                              : 'El impostor adivinó la palabra correctamente.'}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setGameOverInfo(null)}
                        className="discord-button w-full py-3 text-lg"
                      >
                        Cerrar
                      </button>
                    </div>
                    {gameOverInfo.winner === 'crewmates' && (
                      <div className="confetti fixed inset-0 pointer-events-none">
                        {Array.from({ length: 50 }).map((_, i) => (
                          <span
                            key={i}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${-10 - Math.random() * 20}%`,
                              background: ['#FF6B6B', '#4ECDC4', '#FFE66D'][i % 3],
                              animationDelay: `${Math.random() * 2}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!gameStarted ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-discord-text-header mb-4">
                        {isHost ? 'Configura y comienza la partida' : 'Esperando al host...'}
                      </h3>
                      <div className="text-discord-text-muted">
                        {players.length} jugador{players.length !== 1 ? 'es' : ''} en la sala
                      </div>
                    </div>

                    {/* Botones de inicio para el host */}
                    {isHost && (
                      <div className="w-full max-w-md space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-discord-text-muted uppercase">
                                Categoría de palabras (IA)
                            </label>
                            <input 
                                type="text"
                                className="discord-input w-full"
                                placeholder="Ej: Animales, Comida, Objetos de casa... (Vacío = General)"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            />
                        </div>
                        <button onClick={handleStart} className="discord-button success w-full">
                          🎮 Iniciar Partida
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {gameMode === 'offline' ? (
                        <div className="flex flex-col h-full animate-fade-in">
                            {/* Offline Turn List - Full Screen */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar bg-discord-sidebar rounded-xl border border-discord-hover p-4 mb-4">
                                <div className="flex items-center justify-between mb-6 sticky top-0 bg-discord-sidebar/95 backdrop-blur-sm py-3 z-10 border-b border-discord-hover">
                                    <h3 className="text-discord-text-muted uppercase text-xs font-bold flex items-center gap-2 tracking-wider">
                                        <Users size={16} />
                                        Orden de Turnos
                                    </h3>
                                    <button 
                                        onClick={handleOfflineNextTurn}
                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-green-900/20 active:scale-95"
                                    >
                                        <RotateCcw size={16} />
                                        Siguiente Turno
                                    </button>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-3 pb-2">
                                    {turnOrder.map((playerId, idx) => {
                                        const p = offlinePlayers.find(x => x.id === playerId);
                                        if (!p) return null;
                                        const isCurrent = currentTurn === playerId;
                                        
                                        return (
                                            <div key={p.id} className={`relative overflow-hidden flex items-center justify-between p-4 rounded-xl border transition-all group ${
                                                p.isDead 
                                                    ? 'bg-discord-chat border-transparent opacity-60 grayscale' 
                                                    : isCurrent
                                                        ? 'bg-discord-blurple/10 border-discord-blurple shadow-lg shadow-discord-blurple/10 scale-[1.01]'
                                                        : 'bg-discord-surface border-discord-hover hover:border-discord-blurple/50'
                                            }`}>
                                                {isCurrent && !p.isDead && (
                                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-discord-blurple animate-pulse" />
                                                )}

                                                <div className="flex items-center gap-4 z-10">
                                                    <div className={`font-mono font-bold text-lg w-8 h-8 flex items-center justify-center rounded-lg ${isCurrent ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-muted'}`}>
                                                        {idx + 1}
                                                    </div>
                                                    
                                                    <div className="relative">
                                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-sm border-2 ${p.isDead ? 'bg-gray-700 border-gray-600' : isCurrent ? 'bg-discord-blurple border-white/20' : 'bg-discord-blurple border-transparent'}`}>
                                                            {p.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        {isCurrent && !p.isDead && (
                                                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-discord-surface animate-bounce" />
                                                        )}
                                                    </div>

                                                    <div>
                                                        <div className={`font-bold text-lg ${p.isDead ? 'text-discord-text-muted line-through decoration-2' : 'text-white'}`}>
                                                            {p.name}
                                                        </div>
                                                        {p.isDead ? (
                                                            <div className="text-xs text-red-400 font-bold uppercase flex items-center gap-1">
                                                                <Skull size={12} /> Eliminado
                                                            </div>
                                                        ) : isCurrent ? (
                                                            <div className="text-xs text-green-400 font-bold uppercase animate-pulse flex items-center gap-1">
                                                                <MessageSquare size={12} /> Turno Actual
                                                            </div>
                                                        ) : (
                                                            <div className="text-xs text-discord-text-muted font-medium">Esperando...</div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {!p.isDead && (
                                                    <button 
                                                        onClick={() => {
                                                            setPlayerToEliminate({ id: p.id, name: p.name });
                                                            setShowEliminateModal(true);
                                                        }}
                                                        className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-lg transition-all active:scale-95 border border-red-500/20 hover:border-red-500"
                                                        title="Eliminar Jugador"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-discord-hover">
                                <button 
                                    onClick={() => setShowExitModal(true)}
                                    className="discord-button secondary w-full flex items-center justify-center gap-2 py-3"
                                >
                                    <LogOut size={18} />
                                    Salir de la Partida
                                </button>
                            </div>
                        </div>
                    ) : (
                      <>
                    {spinning && (
                      <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full border-4 border-t-transparent border-discord-blurple animate-spin mb-4" />
                          <div className="text-lg text-discord-text-normal font-semibold">
                            Asignando carta...
                          </div>
                        </div>
                      </div>
                    )}

                    {!spinning && (
                      <>
                        {/* Turn Info Banner */}
                        {gameStarted && currentTurn && (
                          <div className="mb-4 bg-discord-surface p-3 rounded-lg border border-discord-blurple flex items-center justify-between animate-fade-in">
                            <div>
                              <div className="text-xs text-discord-text-muted uppercase font-bold">Turno Actual</div>
                              <div className="text-xl font-bold text-white flex items-center gap-2">
                                {players.find(p => p.id === currentTurn)?.username || 'Desconocido'}
                                {currentTurn === userId && <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">Tú</span>}
                              </div>
                            </div>
                            <div className="text-right">
                               <div className="text-xs text-discord-text-muted uppercase font-bold">Siguiente</div>
                               <div className="text-base text-discord-text-normal">
                                 {(() => {
                                   const idx = turnOrder.indexOf(currentTurn);
                                   if (idx === -1) return '-';
                                   // Find next alive player
                                   let nextIdx = (idx + 1) % turnOrder.length;
                                   let attempts = 0;
                                   while (attempts < turnOrder.length) {
                                      const nextId = turnOrder[nextIdx];
                                      const nextPlayer = players.find(p => p.id === nextId);
                                      // If player exists and is not revealed innocent (dead), they are next
                                      if (nextPlayer && !nextPlayer.revealedInnocent) {
                                          return nextPlayer.username;
                                      }
                                      nextIdx = (nextIdx + 1) % turnOrder.length;
                                      attempts++;
                                   }
                                   return '-';
                                 })()}
                               </div>
                            </div>
                          </div>
                        )}

                        {/* Assignment card with flip animation */}
                        <div className={`impostor-card mb-4 ${cardRevealed ? 'flipped' : ''}`}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => setCardRevealed(r => !r)}
                          onKeyDown={e => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setCardRevealed(r => !r);
                            }
                          }}
                          className="impostor-card-inner"
                          aria-pressed={cardRevealed}
                        >
                          <div
                            className="impostor-card-face impostor-card-front discord-glass p-4 rounded-lg"
                            style={{ position: 'relative', cursor: 'pointer' }}
                          >
                            <div className="text-base text-discord-text-normal mb-2 font-semibold">
                              Tu carta
                            </div>
                            <div className="text-lg font-semibold text-discord-text-normal">
                              Haz click o presiona Enter para voltear
                            </div>
                          </div>
                          <div
                            className="impostor-card-face impostor-card-back discord-glass p-4 rounded-lg"
                            style={{ position: 'relative', cursor: 'pointer' }}
                          >
                            {assigned ? (
                              <div className="text-center w-full">
                                <div className="text-base text-discord-text-normal mb-2 font-semibold">
                                  Tu carta
                                </div>
                                <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
                                  {assigned.role === 'impostor' ? 'IMPOSTOR' : assigned.word}
                                </div>
                                <div className="text-sm text-discord-text-muted mt-1">
                                  {statusMessage}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center w-full">
                                <div className="text-base text-discord-text-normal font-semibold mb-2">
                                  Aún no hay ronda
                                </div>
                                <div className="text-sm text-discord-text-muted">
                                  {isHost
                                    ? 'Haz click en "Iniciar ronda" para comenzar'
                                    : 'Espera al host para iniciar'}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Voting area */}
                      <div className="discord-panel mt-4 flex flex-col flex-1 min-h-0">
                        <div className="flex items-center justify-between mb-2 flex-shrink-0">
                          <div className="text-base text-discord-text-normal font-semibold">
                            Votación
                          </div>
                          <div className="text-sm text-discord-text-muted">
                            {voting ? `Votos: ${totalVotes}/${alivePlayersCount}` : 'Inactiva'}
                          </div>
                        </div>

                        <div className="overflow-y-auto custom-scrollbar pr-2 flex-1">
                        {voting ? (
                          <div className="space-y-2">
                            {players.map(p => {
                              const isDead = p.revealedInnocent;
                              const isCurrentUser = p.id === userId;
                              const canVote = !myVote && isCurrentPlayerAlive && !isDead;
                              return (
                                <div
                                  key={p.id}
                                  className={`impostor-voting-item p-2 ${isDead ? 'opacity-50' : ''}`}
                                >
                                  <div className="impostor-voting-info flex items-center gap-2 flex-1 min-w-0">
                                    <div
                                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 ${isDead ? 'bg-gray-500' : 'bg-discord-sidebar'} text-discord-text-normal`}
                                    >
                                      {p.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div
                                      className={`text-discord-text-normal break-all font-semibold text-sm flex-1 min-w-0 ${isDead ? 'text-discord-text-muted line-through' : ''}`}
                                      title={p.username}
                                    >
                                      {p.username}
                                      {isDead ? ' (Muerto)' : ''}
                                    </div>
                                  </div>
                                  <div className="impostor-voting-actions flex items-center gap-2 flex-shrink-0">
                                    <div className="text-sm text-discord-text-muted font-semibold">
                                      {voteCounts[p.id] || 0}
                                    </div>
                                    {!isDead && (
                                      <button
                                        disabled={!canVote}
                                        onClick={() => handleCastVote(p.id)}
                                        className={`discord-button text-xs py-1 px-2 ${canVote ? '' : 'opacity-50 cursor-not-allowed'}`}
                                      >
                                        {myVote === p.id ? 'Votado' : 'Votar'}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-base text-discord-text-muted font-semibold">
                            No hay votación en curso.
                          </div>
                        )}

                        {votingResult && (
                          <div className="mt-2 text-base text-discord-text-normal font-semibold">
                            Resultado:{' '}
                            {votingResult.eliminated
                              ? `Eliminado ${votingResult.eliminated}`
                              : 'Empate'}
                          </div>
                        )}
                        </div>
                      </div>

                      <div className="impostor-button-grid mt-4 flex-shrink-0">
                        {assigned && assigned.role === 'impostor' && (
                          <div className="w-full">
                            {!showGuessInput ? (
                              <button 
                                onClick={() => setShowGuessInput(true)}
                                className="discord-button w-full"
                                style={{ background: '#9b59b6', color: 'white' }}
                              >
                                Adivinar Palabra
                              </button>
                            ) : (
                              <div className="flex gap-2 animate-fade-in">
                                <input
                                  type="text"
                                  className="discord-input flex-1"
                                  placeholder="Escribe la palabra..."
                                  value={guessInput}
                                  onChange={(e) => setGuessInput(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && guessInput.trim()) {
                                      socket.emit('impostor:guess-word', { roomId, userId, guess: guessInput }, (res: any) => {
                                        if (!res.ok) setStatusMessage(res.error);
                                      });
                                      setGuessInput('');
                                      setShowGuessInput(false);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => {
                                    if (guessInput.trim()) {
                                      socket.emit('impostor:guess-word', { roomId, userId, guess: guessInput }, (res: any) => {
                                        if (!res.ok) setStatusMessage(res.error);
                                      });
                                      setGuessInput('');
                                      setShowGuessInput(false);
                                    }
                                  }}
                                  className="discord-button success"
                                >
                                  Enviar
                                </button>
                                <button
                                  onClick={() => setShowGuessInput(false)}
                                  className="discord-button secondary"
                                >
                                  Cancelar
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Next Turn Button */}
                        {gameStarted && currentTurn === userId && !voting && (
                          <button
                            onClick={handleNextTurn}
                            className="discord-button w-full animate-pulse"
                            style={{ background: '#2ecc71', color: 'white' }}
                          >
                            Terminar Turno
                          </button>
                        )}
                        {isHost && assigned && (
                          <button
                            onClick={handleRevealAll}
                            className="discord-button"
                            style={{
                              background: 'linear-gradient(180deg,#ff8c00,#ff4500)',
                              color: 'white',
                            }}
                          >
                            Revelar todas
                          </button>
                        )}
                        {isHost && (
                          <button onClick={handleStartVoting} className="discord-button">
                            Iniciar votación
                          </button>
                        )}
                        {isHost && voting && (
                          <button
                            onClick={handleEndVoting}
                            disabled={!allAliveVoted}
                            className={`discord-button danger ${allAliveVoted ? '' : 'opacity-50 cursor-not-allowed'}`}
                          >
                            Terminar votación ({totalVotes}/{alivePlayersCount})
                          </button>
                        )}
                        {isHost && (
                          <button onClick={handleRestart} className="discord-button secondary">
                            Reiniciar
                          </button>
                        )}
                        <button onClick={handleLeave} className="discord-button secondary">
                          Abandonar
                        </button>
                      </div>
                    </>
                  )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Scrollable */}
            <div className={`bg-discord-sidebar p-4 rounded-lg border border-discord-hover h-full overflow-y-auto custom-scrollbar ${mobileTab === 'game' ? 'hidden md:block' : 'block'}`}>
              {/* Game Status */}
              <div className="mb-4">
                <h3 className="text-base font-semibold text-discord-text-header mb-2">Estado</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-discord-text-muted">Host:</span>
                    <span className={`px-2 py-1 rounded ${isHost ? 'bg-blue-600' : 'bg-gray-600'}`}>
                      {isHost ? 'Tú' : 'Otro'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-discord-text-muted">Estado:</span>
                    <span className={`px-2 py-1 rounded ${gameStarted ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {gameStarted ? 'En juego' : 'En espera'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Players List */}
              <div className="mb-4">
                <h3 className="text-base font-semibold text-discord-text-header mb-2">
                  Jugadores ({players.length})
                </h3>
                <div className="space-y-1">
                  {players.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded bg-discord-surface">
                      <span className="text-discord-text-normal truncate text-sm">{p.username}</span>
                      {p.id === userId && (
                        <span className="text-xs px-2 py-0.5 bg-discord-blurple rounded">Tú</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Turn Order */}
              {gameStarted && turnOrder.length > 0 && (
                <div className="mb-4 border-t border-discord-hover pt-4">
                  <h3 className="text-base font-semibold text-discord-text-header mb-2">
                    Orden de Turnos
                  </h3>
                  <div className="space-y-1">
                    {turnOrder.map((id, idx) => {
                      const p = players.find(x => x.id === id);
                      const name = p ? p.username : id;
                      const active = id === currentTurn;
                      const revealed = revealInfo && revealInfo.impostorId === id;
                      const innocentRevealed = p && (p as any).revealedInnocent;
                      return (
                        <div
                          key={id}
                          className={`flex items-center justify-between p-2 rounded ${
                            active
                              ? 'bg-blue-600 text-white'
                              : innocentRevealed
                              ? 'bg-green-900'
                              : 'bg-discord-surface'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : revealed
                                  ? 'bg-red-600'
                                  : 'bg-discord-chat'
                              }`}
                            >
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-xs truncate">{name}</span>
                          </div>
                          <span className="text-xs text-discord-text-muted">#{idx + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status Message */}
              {statusMessage && (
                <div className="mt-4 p-2 bg-discord-surface rounded text-xs text-discord-text-normal border-l-4 border-discord-blurple">
                  {statusMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Tab Bar */}
      {joined && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-discord-sidebar border-t border-discord-hover p-2 flex justify-around shrink-0 z-50 safe-area-bottom">
          <button 
            onClick={() => setMobileTab('game')} 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileTab === 'game' ? 'text-white bg-discord-blurple/20' : 'text-discord-text-muted'}`}
          >
            <Gamepad2 size={24} />
            <span className="text-xs font-bold">Juego</span>
          </button>
          <button 
            onClick={() => setMobileTab('info')} 
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${mobileTab === 'info' ? 'text-white bg-discord-blurple/20' : 'text-discord-text-muted'}`}
          >
            <div className="relative">
              <Users size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full min-w-[16px] text-center">
                {players.length}
              </span>
            </div>
            <span className="text-xs font-bold">Info</span>
          </button>
        </div>
      )}
      {/* Modals */}
      <Modal
        isOpen={showEliminateModal}
        onClose={() => setShowEliminateModal(false)}
        title="Confirmar Eliminación"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mb-4">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¿Eliminar Jugador?</h3>
            <p className="text-discord-text-muted">
              ¿Estás seguro de que quieres eliminar a <span className="font-bold text-white">{playerToEliminate?.name}</span>?
              <br />
              Esta acción no se puede deshacer.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEliminateModal(false)}
              className="discord-button secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (playerToEliminate) handleOfflineEliminate(playerToEliminate.id);
                setShowEliminateModal(false);
              }}
              className="discord-button danger flex-1"
            >
              Sí, Eliminar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Salir de la Partida"
        size="sm"
        headerColor="bg-yellow-600"
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-500 mb-4">
              <LogOut size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">¿Abandonar Partida?</h3>
            <p className="text-discord-text-muted">
              El progreso actual se perderá y volverás al menú principal.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowExitModal(false)}
              className="discord-button secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setGameMode(null);
                setJoined(false);
                setOfflinePlayers([]);
                setShowExitModal(false);
              }}
              className="discord-button danger flex-1"
            >
              Salir
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Servidor Protegido"
        size="sm"
        headerColor="bg-discord-blurple"
      >
        <div className="space-y-4">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-16 h-16 bg-discord-blurple/20 rounded-full flex items-center justify-center text-discord-blurple mb-4">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Contraseña Requerida</h3>
            <p className="text-discord-text-muted mb-4">
              Este servidor está protegido. Ingresa la contraseña para entrar.
            </p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Contraseña..."
              className="discord-input w-full text-center"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && targetServerId) {
                  handleJoinPublicServer(targetServerId, passwordInput);
                  setShowPasswordModal(false);
                }
              }}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="discord-button secondary flex-1"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (targetServerId) {
                  handleJoinPublicServer(targetServerId, passwordInput);
                  setShowPasswordModal(false);
                }
              }}
              className="discord-button success flex-1"
            >
              Entrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
