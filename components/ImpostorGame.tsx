import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

interface PlayerInfo {
  id: string;
  username: string;
  revealedInnocent?: boolean;
}

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
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [selectedTime, setSelectedTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [showGuessInput, setShowGuessInput] = useState(false);
  const [gameOverInfo, setGameOverInfo] = useState<{
    winner: 'impostor' | 'crewmates';
    word: string;
    impostorName: string;
    reason?: string;
  } | null>(null);

  useEffect(() => {
    if (!socket || !currentUser) return;

    // Auto-join logic when props are provided
    if (autoJoinRoomId && !joined) {
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

    socket.on('impostor:room-state', onRoomState);
    socket.on('impostor:assign', onAssign);
    socket.on('impostor:started', onStarted);
    socket.on('impostor:reveal-all', onRevealAll);
    socket.on('impostor:player-left', onPlayerLeft);
    socket.on('impostor:turn-update', onTurnUpdate);
    socket.on('impostor:voting-start', onVotingStart);
    socket.on('impostor:voting-update', onVotingUpdate);
    socket.on('impostor:voting-result', onVotingResult);
    socket.on('impostor:timer-update', (data: any) => {
      setTimeLeft(data.timeLeft);
    });
    socket.on('impostor:timer-end', () => {
      setTimeLeft(0);
      setStatusMessage('¡Tiempo agotado!');
      setNotifications(prev => [
        ...prev,
        { id: Date.now(), type: 'warning', message: '¡Tiempo agotado!', timestamp: new Date() },
      ]);
    });
    socket.on('impostor:game-over', (data: any) => {
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
    });
    socket.on('impostor:restarted', () => {
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
    });

    return () => {
      socket.off('impostor:room-state', onRoomState);
      socket.off('impostor:assign', onAssign);
      socket.off('impostor:started', onStarted);
      socket.off('impostor:turn-update', onTurnUpdate);
      socket.off('impostor:voting-start', onVotingStart);
      socket.off('impostor:voting-update', onVotingUpdate);
      socket.off('impostor:voting-result', onVotingResult);
      socket.off('impostor:reveal-all');
      socket.off('impostor:player-left');
      socket.off('impostor:restarted');
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
    console.log('Starting game with:', { roomId, userId, selectedCategory, selectedTime });
    socket.emit('impostor:start', { 
      roomId, 
      hostId: userId,
      category: selectedCategory,
      timerDuration: selectedTime
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
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV 
        ? 'http://localhost:3000/api' 
        : 'https://api.unaspartidillas.online/api');
      const response = await fetch(`${API_URL}/servers`);
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
            {!joined && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="discord-button success"
              >
                Crear Servidor
              </button>
            )}
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

        {!joined ? (
          <div className="h-full overflow-y-auto">
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
                <h3 className="text-lg text-discord-text-header font-semibold">Servidores Públicos Impostor</h3>
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
                                const password = prompt('Ingresa la contraseña del servidor:');
                                if (password !== null) {
                                  handleJoinPublicServer(server.roomId, password);
                                }
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4 w-full max-w-[95%] 2xl:max-w-[1600px] mx-auto h-full">
            {/* Main Game Area */}
            <div className="md:col-span-3 xl:col-span-4 flex flex-col h-full overflow-hidden gap-4">
              {/* Game Header */}
              <div className="bg-discord-sidebar p-3 rounded-lg border border-discord-hover flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs text-discord-text-muted">Sala</div>
                    <div className="text-lg font-bold text-discord-text-header">{roomId}</div>
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
                        <div className="flex gap-2">
                          <select 
                            className="discord-input flex-1 cursor-pointer"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            <option className="bg-discord-sidebar text-discord-text-normal" value="General">General</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value="Fantasía">Fantasía</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value="Transporte">Transporte</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value="Objetos">Objetos</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value="Lugares">Lugares</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value="IA (Generado)">✨ IA (Generado)</option>
                          </select>
                          <select 
                            className="discord-input flex-1 cursor-pointer"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(Number(e.target.value))}
                          >
                            <option className="bg-discord-sidebar text-discord-text-normal" value={0}>Sin tiempo</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value={180}>3 Minutos</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value={300}>5 Minutos</option>
                            <option className="bg-discord-sidebar text-discord-text-normal" value={600}>10 Minutos</option>
                          </select>
                        </div>
                        <button onClick={handleStart} className="discord-button success w-full">
                          🎮 Iniciar Partida
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
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

                  {/* Game Content */}
                  <div className="space-y-4 pb-4">
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
                  </div>
                  </>
                )}
              </div>
            </div>

            {/* Sidebar - Scrollable */}
            <div className="bg-discord-sidebar p-4 rounded-lg border border-discord-hover h-full overflow-y-auto custom-scrollbar">
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
    </div>
  );
}
