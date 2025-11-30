import React, { useEffect, useState } from 'react';
import SafeImage from './SafeImage';
import { ArrowRight, Gamepad2, Users, Lock, Plus, Menu } from 'lucide-react';
import MinecraftServerStatus from './MinecraftServerStatus';
import { getBackendUrl } from '../utils/config';

interface HomeScreenProps {
  onGoToChat: () => void;
  onGoToWhoWeAre: () => void;
  onJoinServer: (gameType: string, roomId: string, password?: string) => void;
  onCreateServer: (gameType: string) => void;
  onOpenSidebar?: () => void;
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

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToChat, onGoToWhoWeAre, onJoinServer, onCreateServer, onOpenSidebar }) => {
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

  // Auto-join listener
  useEffect(() => {
    const handleAutoJoin = (e: CustomEvent) => {
      const { type, roomId } = e.detail;
      onJoinServer(type, roomId);
    };
    
    // Listen for socket event dispatched as DOM event or direct socket
    // Since we don't have direct socket access here easily without context, 
    // we rely on the parent or a global event if implemented.
    // Ideally, SocketContext should handle this, but for now let's assume
    // the socket event 'game:auto-join' triggers a navigation.
  }, [onJoinServer]);

  return (
    <div className="flex flex-col h-full w-full bg-discord-bg overflow-hidden relative">
      {/* Mobile Menu Button */}
      {onOpenSidebar && (
        <button
          onClick={onOpenSidebar}
          className="md:hidden absolute top-4 left-4 p-2 liquid-glass rounded-full shadow-lg z-10 text-discord-text-normal hover:text-white"
        >
          <Menu size={24} />
        </button>
      )}

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 lg:p-12 flex flex-col items-center">
        
        {/* Unified Hero Section */}
        <div className="w-full max-w-4xl liquid-glass mb-8 mt-8 md:mt-0 p-6 sm:p-10 md:p-14 flex flex-col items-center text-center">
          <SafeImage
            src="/upg.png"
            alt="UPG"
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg mb-6"
            fallbackSrc="/upg.png"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">
            UPG
          </h1>
          <p className="text-base sm:text-lg text-discord-text-muted max-w-xl mb-8">
            Bienvenido a la comunidad oficial. Aquí encontrarás canales, eventos y salas de voz para echar unas partidillas. Mantén el respeto y disfruta.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-row gap-3 w-full sm:max-w-md md:max-w-none justify-center">
            <button 
              onClick={onGoToChat} 
              className="glass-btn primary w-full md:w-auto px-8 py-3 text-lg font-bold"
            >
              Entrar al Chat
            </button>
            
            <button 
              onClick={() => onCreateServer('impostor')}
              className="glass-btn w-full md:w-auto px-8 py-3 text-lg font-bold relative overflow-hidden group"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus size={20} />
                <span>Crear Impostor</span>
              </div>
               {/* Easter Egg Animation */}
               <img 
                src="/among-us.gif" 
                alt="Among Us" 
                className="absolute top-0 h-full w-auto pointer-events-none hidden group-hover:block animate-run-across"
                style={{ left: '-60px' }}
              />
            </button>

            <button 
              onClick={onGoToWhoWeAre} 
              className="glass-btn w-full md:w-auto px-8 py-3 text-lg font-bold sm:col-span-2 md:col-span-1"
            >
              ¿Qué es UPG?
            </button>
          </div>
        </div>

        {/* Minecraft Server Status */}
        <div className="w-full max-w-4xl mb-8">
          <MinecraftServerStatus />
        </div>

        {/* Active Servers Section */}
        <div className="max-w-6xl w-full">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-discord-text-header flex items-center gap-2">
              <Gamepad2 className="text-discord-blurple" />
              Servidores Activos
            </h2>
          </div>

        {loading ? (
          <div className="text-center py-12 text-discord-text-muted">Cargando servidores...</div>
        ) : servers.length === 0 ? (
          <div className="text-center py-8 md:py-12 liquid-glass">
            <p className="text-discord-text-muted mb-2 md:mb-4">No hay servidores activos.</p>
            <p className="text-sm text-discord-text-normal hidden md:block">¡Sé el primero en crear uno!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {servers.map((server) => (
              <div 
                key={server.roomId} 
                className="discord-glass-card p-4 hover:border-discord-blurple transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-discord-text-header truncate max-w-[200px]" title={server.name}>
                      {server.name}
                    </h3>
                    <p className="text-xs text-discord-text-muted uppercase tracking-wider font-semibold mt-1">
                      Impostor
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
                    <span className="hidden md:inline">En espera</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                  <span className="text-xs text-discord-text-muted truncate max-w-[100px]">
                    Host: {server.hostName}
                  </span>
                  <button 
                    onClick={() => handleJoinClick(server)}
                    className="glass-btn primary w-full ml-4 py-2 text-sm"
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
export default HomeScreen;

