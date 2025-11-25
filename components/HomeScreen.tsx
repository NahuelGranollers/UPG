import React, { useEffect, useState } from 'react';
import SafeImage from './SafeImage';
import { ArrowRight, Gamepad2, Users, Lock, Plus } from 'lucide-react';

interface HomeScreenProps {
  onGoToChat: () => void;
  onGoToWhoWeAre: () => void;
  onJoinServer: (gameType: string, roomId: string, password?: string) => void;
  onCreateServer: (gameType: string) => void;
}

interface GameServer {
  roomId: string;
  name: string;
  hostName: string;
  playerCount: number;
  maxPlayers: number;
  hasPassword: boolean;
  gameType: 'cs16' | 'impostor';
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToChat, onGoToWhoWeAre, onJoinServer, onCreateServer }) => {
  const [servers, setServers] = useState<GameServer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await fetch('/api/servers');
        const data = await res.json();
        const allServers: GameServer[] = [];
        
        if (data.servers?.cs16) {
          data.servers.cs16.forEach((s: any) => allServers.push({ ...s, gameType: 'cs16' }));
        }
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
    const interval = setInterval(fetchServers, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClick = (server: GameServer) => {
    if (server.hasPassword) {
      const password = prompt(`Contraseña para ${server.name}:`);
      if (password !== null) {
        onJoinServer(server.gameType, server.roomId, password);
      }
    } else {
      onJoinServer(server.gameType, server.roomId);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center p-4 md:p-8 lg:p-12 bg-discord-chat overflow-y-auto custom-scrollbar">
      {/* Hero Section */}
      <div className="max-w-4xl w-full bg-discord-surface backdrop-blur-sm rounded-discord shadow-discord border border-discord-hover overflow-hidden mb-12">
        <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center items-center text-center gap-8">
          <SafeImage
            src="/upg.png"
            alt="UPG"
            className="w-32 h-32 object-cover rounded-discord shadow-discord"
            fallbackSrc="/upg.png"
          />
          <h1 className="text-4xl font-black text-discord-text-header">Bienvenido a UPG</h1>
          <p className="text-lg text-discord-text-normal max-w-lg">
            Esta es la comunidad. Aquí encontrarás canales, eventos y salas de voz. Mantén el
            respeto y disfruta.
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button onClick={onGoToChat} className="discord-button">
              Ir al Chat
            </button>
            <button onClick={onGoToWhoWeAre} className="discord-button secondary">
              ¿Qué es UPG?
            </button>
          </div>
        </div>
      </div>

      {/* Active Servers Section */}
      <div className="max-w-6xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-discord-text-header flex items-center gap-2">
            <Gamepad2 className="text-discord-blurple" />
            Servidores Activos
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => onCreateServer('cs16')}
              className="discord-button small success flex items-center gap-1"
            >
              <Plus size={16} /> Crear CS 1.6
            </button>
            <button 
              onClick={() => onCreateServer('impostor')}
              className="discord-button small secondary flex items-center gap-1"
            >
              <Plus size={16} /> Crear Impostor
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-discord-text-muted">Cargando servidores...</div>
        ) : servers.length === 0 ? (
          <div className="text-center py-12 bg-discord-surface rounded-lg border border-discord-hover">
            <p className="text-discord-text-muted mb-4">No hay servidores activos en este momento.</p>
            <p className="text-sm text-discord-text-normal">¡Sé el primero en crear uno!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {servers.map((server) => (
              <div 
                key={server.roomId} 
                className="bg-discord-surface p-4 rounded-lg border border-discord-hover hover:border-discord-blurple transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-discord-text-header truncate max-w-[200px]" title={server.name}>
                      {server.name}
                    </h3>
                    <p className="text-xs text-discord-text-muted uppercase tracking-wider font-semibold mt-1">
                      {server.gameType === 'cs16' ? 'Counter-Strike 1.6' : 'Impostor'}
                    </p>
                  </div>
                  {server.hasPassword && <Lock size={16} className="text-yellow-500" />}
                </div>

                <div className="flex items-center gap-4 text-sm text-discord-text-normal mb-4">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{server.playerCount}/{server.maxPlayers}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>En espera</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-discord-border">
                  <span className="text-xs text-discord-text-muted truncate max-w-[100px]">
                    Host: {server.hostName}
                  </span>
                  <button 
                    onClick={() => handleJoinClick(server)}
                    className="discord-button small w-full ml-4"
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
  );
};
export default HomeScreen;

