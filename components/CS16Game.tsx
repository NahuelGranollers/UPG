import React, { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

// Import CS 1.6 game engine and classes
import { initCS16Game, startCS16Game, cleanupCS16Game, setupMultiplayerEvents } from '../cs16-game/cs16-engine.js';

export default function CS16Game({ 
  onClose,
  autoJoinRoomId,
  autoJoinPassword,
  autoJoinBotCount
}: { 
  onClose?: () => void;
  autoJoinRoomId?: string;
  autoJoinPassword?: string;
  autoJoinBotCount?: number;
}) {
  const { socket } = useSocket();
  const { currentUser } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameInitializedRef = useRef(false);

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState(currentUser?.username || '');
  const [joined, setJoined] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [botCount, setBotCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [publicServers, setPublicServers] = useState<any[]>([]);
  // Only show public server listing by default
  const [showPublicServers, setShowPublicServers] = useState(true);
  const [showCreateServer, setShowCreateServer] = useState(false);
  const [serverName, setServerName] = useState('');
  const [serverPassword, setServerPassword] = useState('');
  
  useEffect(() => {
    if (!socket || !currentUser) return;

    // Auto-join logic when props are provided
    if (autoJoinRoomId && !joined) {
      setRoomId(autoJoinRoomId);
      setUsername(currentUser.username || '');
      if (autoJoinBotCount !== undefined) {
        setBotCount(autoJoinBotCount);
      }

      // Attempt to join the room
      setTimeout(() => {
        socket.emit('cs16:join-room', { 
          roomId: autoJoinRoomId, 
          userId: currentUser.id, 
          username: currentUser.username || '',
          password: autoJoinPassword
        }, (res: any) => {
          if (res && res.ok) {
            setJoined(true);
          } else {
            alert('Failed to join room: ' + (res?.error || 'Unknown error'));
            // Reset to allow manual joining if auto-join fails
            setRoomId('');
          }
        });
      }, 100); // Small delay to ensure socket is ready
    }
  }, [socket, currentUser, autoJoinRoomId, autoJoinPassword, autoJoinBotCount, joined]);

  useEffect(() => {
    if (!socket) return;

    // Socket event handlers for multiplayer
    socket.on('cs16:room-state', (data) => {
      // console.log('Room state:', data);
      setJoined(true);
      setIsHost(data.hostId === currentUser?.id);
    });

    socket.on('cs16:game-update', (data) => {
      // console.log('Game update:', data);
      const started = data.gameState?.gameStarted || false;
      setGameStarted(started);
      if (started) {
        startCS16Game();
      }
    });

    socket.on('cs16:player-joined', (data) => {
      // console.log('Player joined:', data);
    });

    socket.on('cs16:player-left', (data) => {
      // console.log('Player left:', data);
    });

    socket.on('cs16:player-hit', (data) => {
      // console.log('Player hit:', data);
    });

    socket.on('cs16:bomb-planted', (data) => {
      // console.log('Bomb planted:', data);
    });

    socket.on('cs16:bomb-defused', (data) => {
      // console.log('Bomb defused:', data);
    });

    return () => {
      socket.off('cs16:room-state');
      socket.off('cs16:game-update');
      socket.off('cs16:player-joined');
      socket.off('cs16:player-left');
      socket.off('cs16:player-hit');
      socket.off('cs16:bomb-planted');
      socket.off('cs16:bomb-defused');
    };
  }, [socket, currentUser]);

  // Auto-refresh public servers when viewing them
  useEffect(() => {
    if (!showPublicServers) return;
    const interval = setInterval(fetchPublicServers, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [showPublicServers]);

  // Initialize CS 1.6 game when component mounts and room is joined
  useEffect(() => {
    if (!canvasRef.current || !joined || gameInitializedRef.current) return;

    try {
      // Initialize the CS 1.6 game engine
      initCS16Game(canvasRef.current, socket, roomId, currentUser, isHost);
      setupMultiplayerEvents();
      gameInitializedRef.current = true;

      console.log('CS 1.6 game initialized successfully');
    } catch (error) {
      console.error('Failed to initialize CS 1.6 game:', error);
    }

    return () => {
      if (gameInitializedRef.current) {
        cleanupCS16Game();
        gameInitializedRef.current = false;
      }
    };
  }, [joined, socket, roomId, currentUser, isHost]);

  const handleCreate = () => {
    if (!socket) return;
    if (!roomId || !username) return;

    socket.emit('cs16:create-room', { roomId, userId: currentUser?.id, username, botCount }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
      } else {
        alert('Failed to create room: ' + (res?.error || 'Unknown error'));
      }
    });
  };

  const handleJoin = () => {
    if (!socket) return;
    if (!roomId || !username) return;

    socket.emit('cs16:join-room', { roomId, userId: currentUser?.id, username }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
      } else {
        alert('Failed to join room: ' + (res?.error || 'Unknown error'));
      }
    });
  };

  const handleLeave = () => {
    if (!socket) return;
    socket.emit('cs16:leave-room', { roomId, userId: currentUser?.id }, () => {
      setJoined(false);
      setGameStarted(false);
      setIsHost(false);
      if (gameInitializedRef.current) {
        cleanupCS16Game();
        gameInitializedRef.current = false;
      }
    });
  };

  const handleStartGame = () => {
    if (!socket || !isHost) return;
    socket.emit('cs16:start-game', { roomId, hostId: currentUser?.id }, (res: any) => {
      if (res && res.ok) {
        startCS16Game();
      } else {
        alert('Failed to start game: ' + (res?.error || 'Unknown error'));
      }
    });
  };

  // Fetch public servers
  const fetchPublicServers = async () => {
    try {
      const response = await fetch('/api/servers');
      const data = await response.json();
      setPublicServers(data.servers?.cs16 || []);
    } catch (error) {
      console.error('Error fetching public servers:', error);
    }
  };

  // Create public server
  const handleCreatePublicServer = (explicitRoomId?: string) => {
    if (!socket) return;
    const finalRoomId = explicitRoomId || roomId || `room_${Date.now()}`;
    if (!username) return;

    if (finalRoomId !== roomId) setRoomId(finalRoomId);

    socket.emit('cs16:create-room', {
      roomId: finalRoomId,
      userId: currentUser?.id,
      username,
      botCount,
      name: serverName || `Sala CS16 de ${username}`,
      password: serverPassword || null
    }, (res: any) => {
      if (res && res.ok) {
        setJoined(true);
        fetchPublicServers(); // Refresh the list
      } else {
        alert('Failed to create public room: ' + (res?.error || 'Unknown error'));
      }
    });
  };

  // Join public server
  const handleJoinPublicServer = (serverRoomId: string, password?: string) => {
    if (!socket) return;
    if (!username) return;
    setRoomId(serverRoomId);
    socket.emit('cs16:join-room', {
      roomId: serverRoomId,
      userId: currentUser?.id,
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

  return (
    <div className="flex flex-col min-h-screen w-full bg-discord-chat">
      <div className="w-full py-4 px-2 sm:py-6 sm:px-4 lg:py-8 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-discord-text-header">
            CS 1.6 Multiplayer
          </h1>
          <div className="flex gap-2">
            {!joined && (
              <button
                onClick={() => setShowCreateServer(true)}
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

        {showCreateServer && !joined && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-discord-surface p-6 rounded-lg max-w-md w-full space-y-4">
              <h3 className="text-xl font-bold text-white">Crear Servidor CS 1.6</h3>
              
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

              <div className="space-y-2">
                <label className="text-xs font-bold text-discord-text-muted uppercase">Bots ({botCount})</label>
                <input
                  type="range"
                  min="0"
                  max="9"
                  value={botCount}
                  onChange={(e) => setBotCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => setShowCreateServer(false)}
                  className="flex-1 discord-button secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const newId = `room_${Date.now()}`;
                    handleCreatePublicServer(newId);
                    setShowCreateServer(false);
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
                <h3 className="text-lg text-discord-text-header font-semibold">Servidores Públicos CS 1.6</h3>
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
                              {server.botCount > 0 && ` • ${server.botCount} bots`}
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Game Canvas */}
            <div className="lg:col-span-3">
              <div className="relative bg-black rounded-lg overflow-hidden" style={{ height: '600px' }}>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ display: joined ? 'block' : 'none' }}
                />
                {!gameStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-center text-white">
                      <h2 className="text-2xl font-bold mb-4">
                        {isHost ? 'Esperando inicio de partida' : 'Esperando al host...'}
                      </h2>
                      {isHost && (
                        <button onClick={handleStartGame} className="discord-button success">
                          Iniciar Partida
                        </button>
                      )}
                      <div className="mt-4 text-sm text-gray-300">
                        <p>Controles:</p>
                        <p>WASD - Moverse</p>
                        <p>Mouse - Apuntar</p>
                        <p>Clic izquierdo - Disparar</p>
                        <p>Shift - Saltar</p>
                        <p>Ctrl - Agacharse</p>
                        <p>R - Recargar</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Game Info Sidebar */}
            <div className="bg-discord-sidebar p-4 rounded-lg border border-discord-hover">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-discord-text-header mb-2">Estado del Juego</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sala:</span>
                    <span className="text-discord-text-normal">{roomId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estado:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      gameStarted ? 'bg-green-600' : 'bg-yellow-600'
                    }`}>
                      {gameStarted ? 'En juego' : 'Esperando'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rol:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      isHost ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      {isHost ? 'Host' : 'Jugador'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-discord-text-header mb-2">Controles</h3>
                <div className="space-y-1 text-xs text-discord-text-normal">
                  <div>WASD - Moverse</div>
                  <div>Mouse - Apuntar</div>
                  <div>Clic - Disparar</div>
                  <div>Shift - Saltar</div>
                  <div>Ctrl - Agacharse</div>
                  <div>R - Recargar</div>
                </div>
              </div>

              <div className="space-y-2">
                {isHost && !gameStarted && (
                  <button onClick={handleStartGame} className="w-full discord-button success">
                    Iniciar Partida
                  </button>
                )}
                <button onClick={handleLeave} className="w-full discord-button secondary">
                  Abandonar
                </button>
              </div>

              <div className="mt-4 p-3 bg-discord-surface rounded text-xs text-discord-text-muted">
                <p className="font-semibold mb-1">Sobre CS 1.6:</p>
                <p>Juego FPS completo con IA, pathfinding A*, físicas y multiplayer en tiempo real.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}