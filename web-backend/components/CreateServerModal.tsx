import React, { useState, useEffect } from 'react';
import { Users, Lock, Gamepad2 } from 'lucide-react';
import { getBackendUrl } from '../utils/config';

interface GameServer {
  roomId: string;
  name: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  hasPassword: boolean;
  gameType: 'impostor';
}

interface CreateServerModalProps {
  gameType: 'impostor';
  onCreate: (serverData: {
    name: string;
    password?: string;
    botCount?: number;
  }) => void;
  onCancel: () => void;
  onJoinServer?: (gameType: string, roomId: string, password?: string) => void;
}

const CreateServerModal: React.FC<CreateServerModalProps> = ({ gameType, onCreate, onCancel, onJoinServer }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [usePassword, setUsePassword] = useState(false);
  const [servers, setServers] = useState<GameServer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const API_URL = getBackendUrl();
          
        const res = await fetch(`${API_URL}/api/servers`);
        const data = await res.json();
        const allServers: GameServer[] = [];
        
        if (data.servers?.impostor) {
          data.servers.impostor.forEach((s: any) => allServers.push({ ...s, gameType: 'impostor' }));
        }
        
        setServers(allServers);
      } catch (e) {
        console.error('Error fetching servers', e);
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  const handleJoinClick = (server: GameServer) => {
    if (!onJoinServer) return;
    
    if (server.hasPassword) {
      const password = prompt(`Contraseña para ${server.name}:`);
      if (password !== null) {
        onJoinServer(server.gameType, server.roomId, password);
        onCancel(); // Close modal after joining
      }
    } else {
      onJoinServer(server.gameType, server.roomId);
      onCancel(); // Close modal after joining
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const serverData: any = {
      name: name.trim(),
    };

    if (usePassword && password.trim()) {
      serverData.password = password.trim();
    }

    onCreate(serverData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Crear Servidor Impostor
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="server-name" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre del Servidor
              </label>
              <input
                id="server-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mi servidor Impostor"
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={50}
                required
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <input
                  type="checkbox"
                  checked={usePassword}
                  onChange={(e) => setUsePassword(e.target.checked)}
                  className="mr-2"
                />
                Servidor Privado (requiere contraseña)
              </label>
              {usePassword && (
                <>
                  <label htmlFor="server-password" className="sr-only">Contraseña del servidor</label>
                  <input
                    id="server-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                    maxLength={20}
                  />
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Crear Servidor
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Active Servers Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="text-blue-400" size={20} />
            <h3 className="text-lg font-semibold text-white">Servidores Activos</h3>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Cargando servidores...</div>
          ) : servers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="mb-2">No hay servidores activos.</p>
              <p className="text-sm">¡Sé el primero en crear uno!</p>
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
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-white truncate" title={server.name}>
                          {server.name}
                        </h4>
                        {server.hasPassword && <Lock size={14} className="text-yellow-500" />}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>Host: {server.hostName}</span>
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>{server.playerCount}/{server.maxPlayers}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleJoinClick(server)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-600 disabled:opacity-50"
                      disabled={server.playerCount >= server.maxPlayers}
                    >
                      {server.playerCount >= server.maxPlayers ? 'Lleno' : 'Unirse'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateServerModal;