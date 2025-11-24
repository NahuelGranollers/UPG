import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

interface ServerInfo {
  roomId: string;
  name: string;
  hostId: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  hasPassword: boolean;
  createdAt: string;
  gameState: any;
  botCount?: number;
}

interface ServerBrowserProps {
  gameType: 'impostor' | 'cs16';
  onJoinServer: (roomId: string, password?: string) => void;
  onCreateServer: () => void;
}

const ServerBrowser: React.FC<ServerBrowserProps> = ({ gameType, onJoinServer, onCreateServer }) => {
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [joiningPassword, setJoiningPassword] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const fetchServers = async () => {
    try {
      const response = await fetch('/api/servers');
      const data = await response.json();
      setServers(data.servers[gameType] || []);
    } catch (error) {
      console.error('Error fetching servers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServers();
    // Refresh server list every 30 seconds
    const interval = setInterval(fetchServers, 30000);

    return () => clearInterval(interval);
  }, [gameType]);

  // Listen for real-time updates via socket
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handler = (payload: any) => {
      try {
        const list = (payload && payload.servers && payload.servers[gameType]) || [];
        setServers(list);
      } catch (e) {
        console.error('Error applying servers:updated payload', e);
      }
    };
    socket.on('servers:updated', handler);
    return () => {
      socket.off('servers:updated', handler);
    };
  }, [socket, gameType]);

  const handleJoinServer = (server: ServerInfo) => {
    if (server.hasPassword) {
      setSelectedServer(server.roomId);
      setShowPasswordPrompt(true);
    } else {
      onJoinServer(server.roomId);
    }
  };

  const handlePasswordSubmit = () => {
    if (selectedServer && joiningPassword.trim()) {
      onJoinServer(selectedServer, joiningPassword.trim());
      setShowPasswordPrompt(false);
      setJoiningPassword('');
      setSelectedServer(null);
    }
  };

  const formatGameState = (gameState: any) => {
    if (gameType === 'impostor') {
      return gameState.started ? 'En juego' : 'Esperando';
    } else {
      if (gameState.gameStarted) {
        return `En ronda (${gameState.roundTime}s)`;
      }
      return 'Esperando';
    }
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Cargando servidores...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Servidores {gameType === 'impostor' ? 'Impostor' : 'CS 1.6'}
        </h2>
        <button
          onClick={onCreateServer}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Crear Servidor
        </button>
      </div>

      {servers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">No hay servidores disponibles</p>
          <p className="text-sm text-gray-500">¡Sé el primero en crear uno!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {servers.map((server) => (
            <div
              key={server.roomId}
              className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{server.name}</h3>
                    {server.hasPassword && (
                      <span className="bg-yellow-600 text-yellow-100 px-2 py-1 rounded text-xs font-medium">
                        Privado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span>Host: {server.hostName}</span>
                    <span>Jugadores: {server.playerCount}/{server.maxPlayers}</span>
                    {server.botCount && server.botCount > 0 && (
                      <span>Bots: {server.botCount}</span>
                    )}
                    <span>Estado: {formatGameState(server.gameState)}</span>
                    <span className="text-gray-500">Hace {formatCreatedAt(server.createdAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleJoinServer(server)}
                  disabled={server.playerCount >= server.maxPlayers}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {server.playerCount >= server.maxPlayers ? 'Lleno' : 'Unirse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-4">Servidor Privado</h3>
            <p className="text-gray-300 mb-4">Este servidor requiere una contraseña para unirse.</p>
            <input
              type="password"
              value={joiningPassword}
              onChange={(e) => setJoiningPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <div className="flex gap-3">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Unirse
              </button>
              <button
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setJoiningPassword('');
                  setSelectedServer(null);
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerBrowser;