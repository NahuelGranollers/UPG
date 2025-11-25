import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';

interface PlayerInfo {
  id: string;
  username: string;
  revealedInnocent?: boolean;
}

export default function ImpostorGame({ 
  onClose,
  autoJoinRoomId,
  autoJoinPassword
}: { 
  onClose?: () => void;
  autoJoinRoomId?: string;
  autoJoinPassword?: string;
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

    const onTurn = (d: any) => {
      setCurrentTurn(d.currentTurn || null);
    };

    const onTurnOrder = (d: any) => {
      setTurnOrder(d.turnOrder || []);
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
    socket.on('impostor:turn', onTurn);
    socket.on('impostor:turn-order', onTurnOrder);
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
      
      let msg = '';
      let type = 'info';
      
      if (data.winner === 'impostor') {
        msg = `¡El Impostor (${data.impostorName}) gana! Adivinó la palabra: ${data.word}`;
        type = 'error'; // Bad for crewmates
      } else {
        msg = `¡Los Tripulantes ganan! El Impostor (${data.impostorName}) falló al adivinar: ${data.guess} (Era: ${data.word})`;
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
    });

    return () => {
      socket.off('impostor:room-state', onRoomState);
      socket.off('impostor:assign', onAssign);
      socket.off('impostor:started', onStarted);
      socket.off('impostor:turn', onTurn);
      socket.off('impostor:turn-order', onTurnOrder);
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
    socket.emit('impostor:start', { 
      roomId, 
      hostId: userId,
      category: selectedCategory,
      timerDuration: selectedTime
    }, (res: any) => {
      if (res && res.ok) {
        setStatusMessage('Ronda iniciada — revisa tu carta');
      } else {
        setStatusMessage(res?.error || 'No se pudo iniciar');
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
      const API_URL = import.meta.env.DEV 
        ? 'http://localhost:3000' 
        : 'https://mensajeria-ksc7.onrender.com';
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
          setJoined(true);
          setIsHost(true); // Creator is always host
          setHostId(generatedUserId);
          fetchPublicServers(); // Refresh the list
        } else {
          alert('Failed to create public room: ' + (res?.error || 'Unknown error'));
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
      } else {
        alert('Failed to join public room: ' + (res?.error || 'Unknown error'));
      }
    });
  };

  const currentPlayer = players.find(p => p.id === userId);
  const isCurrentPlayerAlive = !currentPlayer?.revealedInnocent;

  // Calculate if all alive players have voted
  const alivePlayersCount = players.filter(p => !p.revealedInnocent).length;
  const allAliveVoted = totalVotes >= alivePlayersCount;

  return (
    <div className="flex flex-col min-h-screen w-full bg-discord-chat">
      <div className="w-full py-4 px-2 sm:py-6 sm:px-4 lg:py-8 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-discord-text-header">
            🎭 Impostor
          </h1>
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
          autoJoinRoomId ? (
            <div className="panel-glass lg liquid-glass bg-[#071017] p-6 rounded-lg max-w-md mx-auto">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto border-4 border-t-transparent border-discord-blurple animate-spin rounded-full"></div>
                <p className="text-discord-text-normal">Uniéndose a la sala {autoJoinRoomId}...</p>
              </div>
            </div>
          ) : (
            <div className="panel-glass lg liquid-glass bg-[#071017] p-6 rounded-lg max-w-2xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-lg text-discord-text-header font-semibold">Servidores Públicos Impostor</h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
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
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Main Game Area */}
            <div className="md:col-span-3 space-y-4">
              {/* Game Header */}
              <div className="bg-discord-sidebar p-4 rounded-lg border border-discord-hover">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-discord-text-muted">Sala</div>
                    <div className="text-xl font-bold text-discord-text-header">{roomId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-discord-text-muted">
                      {players.length} jugador{players.length !== 1 ? 'es' : ''}
                    </div>
                    {timeLeft !== null && timeLeft > 0 && (
                      <div className="text-2xl font-mono font-bold text-yellow-400">
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </div>
                    )}
                    {!gameStarted && (
                      <div className="text-sm text-yellow-400">Esperando...</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Player Cards Area */}
              <div className="bg-discord-sidebar p-6 rounded-lg border border-discord-hover min-h-[500px]">
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
                    {/* Palabras personalizadas ocultas - funcionalidad sigue activa */}
                    {/* {customWords.length > 0 && (
                  <div className="mt-4">
                    <div className="text-sm text-gray-400 mb-2">Palabras personalizadas ({customWords.length}):</div>
                    <div className="text-xs text-gray-300 break-words">{customWords.join(', ')}</div>
                  </div>
                )} */}

                {/* Turn order moved to right column on wide screens */}
                {/* (right column will show the turn order) */}
                {/* Innocent reveal overlay (temporary) */}
                {revealedPlayer && !revealedPlayer.wasImpostor && (
                  <div className={`fixed bottom-8 right-8 z-50`}>
                    <div className="bg-gray-800/90 border border-green-600 text-white p-4 rounded-lg shadow-lg backdrop-blur">
                      <div className="text-sm uppercase text-green-300 font-semibold">
                        Revelación
                      </div>
                      <div className="text-lg font-bold mt-1">
                        {players.find(p => p.id === revealedPlayer.id)?.username ||
                          revealedPlayer.id}
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        Era inocente — la ronda continúa
                      </div>
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

                  {/* Game Content */}
                  <div className="space-y-4">
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
                        {/* Assignment card with flip animation */}
                        <div className={`impostor-card mb-6 ${cardRevealed ? 'flipped' : ''}`}>
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
                            className="impostor-card-face impostor-card-front discord-glass p-6 rounded-lg"
                            style={{ position: 'relative', cursor: 'pointer' }}
                          >
                            <div className="text-lg text-discord-text-normal mb-3 font-semibold">
                              Tu carta
                            </div>
                            <div className="text-xl font-semibold text-discord-text-normal">
                              Haz click o presiona Enter para voltear
                            </div>
                          </div>
                          <div
                            className="impostor-card-face impostor-card-back discord-glass p-6 rounded-lg"
                            style={{ position: 'relative', cursor: 'pointer' }}
                          >
                            {assigned ? (
                              <div className="text-center w-full">
                                <div className="text-lg text-discord-text-normal mb-3 font-semibold">
                                  Tu carta
                                </div>
                                <div className="text-3xl font-bold text-yellow-400">
                                  {assigned.role === 'impostor' ? 'IMPOSTOR' : assigned.word}
                                </div>
                                <div className="text-base text-discord-text-muted mt-3">
                                  {statusMessage}
                                </div>
                              </div>
                            ) : (
                              <div className="text-center w-full">
                                <div className="text-lg text-discord-text-normal font-semibold mb-3">
                                  Aún no hay ronda
                                </div>
                                <div className="text-base text-discord-text-muted">
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
                      <div className="discord-panel mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-lg text-discord-text-normal font-semibold">
                            Votación
                          </div>
                          <div className="text-base text-discord-text-muted">
                            {voting ? `Votos: ${totalVotes}/${alivePlayersCount}` : 'Inactiva'}
                          </div>
                        </div>

                        {voting ? (
                          <div className="space-y-3">
                            {players.map(p => {
                              const isDead = p.revealedInnocent;
                              const isCurrentUser = p.id === userId;
                              const canVote = !myVote && isCurrentPlayerAlive && !isDead;
                              return (
                                <div
                                  key={p.id}
                                  className={`impostor-voting-item ${isDead ? 'opacity-50' : ''}`}
                                >
                                  <div className="impostor-voting-info flex items-center gap-3 flex-1 min-w-0">
                                    <div
                                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-lg font-semibold flex-shrink-0 ${isDead ? 'bg-gray-500' : 'bg-discord-sidebar'} text-discord-text-normal`}
                                    >
                                      {p.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div
                                      className={`text-discord-text-normal break-all font-semibold text-sm sm:text-lg flex-1 min-w-0 ${isDead ? 'text-discord-text-muted line-through' : ''}`}
                                      style={{ textShadow: '0 0 3px rgba(0,0,0,0.8)' }}
                                      title={p.username}
                                    >
                                      {p.username}
                                      {isDead ? ' (Muerto)' : ''}
                                    </div>
                                  </div>
                                  <div className="impostor-voting-actions flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                    <div className="text-sm sm:text-lg text-discord-text-muted font-semibold">
                                      {voteCounts[p.id] || 0}
                                    </div>
                                    {!isDead && (
                                      <button
                                        disabled={!canVote}
                                        onClick={() => handleCastVote(p.id)}
                                        className={`discord-button ${canVote ? '' : 'opacity-50 cursor-not-allowed'}`}
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
                          <div className="text-lg text-discord-text-muted font-semibold">
                            No hay votación en curso.
                          </div>
                        )}

                        {votingResult && (
                          <div className="mt-4 text-lg text-discord-text-normal font-semibold">
                            Resultado:{' '}
                            {votingResult.eliminated
                              ? `Eliminado ${votingResult.eliminated}`
                              : 'Empate'}
                          </div>
                        )}
                      </div>

                      <div className="impostor-button-grid mt-6">
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
                        {isHost && assigned && (
                          <button
                            onClick={handleRevealAll}
                            className="discord-button"
                            style={{
                              background: 'linear-gradient(180deg,#ff8c00,#ff4500)',
                              color: 'white',
                            }}
                          >
                            Revelar todas las cartas
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
                            Reiniciar ronda
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

            {/* Sidebar */}
            <div className="bg-discord-sidebar p-4 rounded-lg border border-discord-hover h-fit sticky top-6">
              {/* Game Status */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-discord-text-header mb-3">Estado</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-discord-text-muted">Host:</span>
                    <span className={`px-2 py-1 rounded text-xs ${isHost ? 'bg-blue-600' : 'bg-gray-600'}`}>
                      {isHost ? 'Tú' : 'Otro'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-discord-text-muted">Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs ${gameStarted ? 'bg-green-600' : 'bg-yellow-600'}`}>
                      {gameStarted ? 'En juego' : 'En espera'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Players List */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-discord-text-header mb-3">
                  Jugadores ({players.length})
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {players.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 rounded bg-discord-surface">
                      <span className="text-discord-text-normal truncate">{p.username}</span>
                      {p.id === userId && (
                        <span className="text-xs px-2 py-1 bg-discord-blurple rounded">Tú</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Turn Order */}
              {gameStarted && turnOrder.length > 0 && (
                <div className="mb-6 border-t border-discord-hover pt-4">
                  <h3 className="text-lg font-semibold text-discord-text-header mb-3">
                    Orden de Turnos
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
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
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                                active
                                  ? 'bg-yellow-400 text-black'
                                  : revealed
                                  ? 'bg-red-600'
                                  : 'bg-discord-chat'
                              }`}
                            >
                              {name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm truncate">{name}</span>
                          </div>
                          <span className="text-xs text-discord-text-muted">#{idx + 1}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Add Word Input - Deshabilitado */}
              {/* <div className="border-t border-discord-hover pt-4">
                <h3 className="text-sm font-semibold text-discord-text-header mb-2">
                  Agregar Palabra
                </h3>
                <input
                  type="text"
                  placeholder="Nueva palabra..."
                  className="w-full discord-input text-sm"
                  onKeyDown={e => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleAddWord(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div> */}

              {/* Status Message */}
              {statusMessage && (
                <div className="mt-4 p-3 bg-discord-surface rounded text-sm text-discord-text-normal border-l-4 border-discord-blurple">
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
