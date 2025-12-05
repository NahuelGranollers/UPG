import React, { useEffect, useState } from 'react';
import SafeImage from './SafeImage';
import { ArrowRight, Gamepad2, Shield, Zap, Globe, Users, Lock } from 'lucide-react';
import { TEXTS } from '../utils/texts';
import { useNavigate } from 'react-router-dom';
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
  gameType: 'impostor';
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onGoToChat,
  onGoToWhoWeAre,
  onJoinServer,
  onCreateServer,
  onOpenSidebar
}) => {
  const navigate = useNavigate();
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
      const password = prompt(`${TEXTS.enterPassword} ${server.name}:`);
      if (password !== null) {
        onJoinServer(server.gameType, server.roomId, password);
      }
    } else {
      onJoinServer(server.gameType, server.roomId);
    }
  };

  return (
    <div className="app-container">
      <div className="scroll-area custom-scrollbar">
        <div className="container-responsive py-6 md:py-8 space-y-6 md:space-y-8 w-full">
          {/* Hero Section */}
          <section className="text-center space-y-6 animate-fade-in">
            <div className="glass p-6 md:p-8 lg:p-12 max-w-4xl mx-auto">
              <SafeImage
                src="/upg.png"
                alt="UPG Logo"
                className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mx-auto mb-6 rounded-2xl shadow-lg"
                fallbackSrc="/upg.png"
              />

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 text-balance">
                {TEXTS.appTitle}
              </h1>

              <p className="text-lg md:text-xl text-secondary mb-8 max-w-2xl mx-auto text-balance">
                {TEXTS.welcomeMessage}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <button
                  onClick={onGoToChat}
                  className="btn btn-primary w-full group"
                >
                  <Zap size={20} />
                  {TEXTS.enterChat}
                  <ArrowRight size={16} className="ml-auto group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/impostor')}
                  className="btn btn-secondary w-full group relative overflow-hidden"
                >
                  <Gamepad2 size={20} />
                  Jugar al Impostor
                </button>

                <button
                  onClick={onGoToWhoWeAre}
                  className="btn btn-ghost w-full sm:col-span-2 lg:col-span-1"
                >
                  <Globe size={20} />
                  {TEXTS.whatIsUPG}
                </button>
              </div>
            </div>
          </section>

          {/* Active Servers Section */}
          <section className="space-y-6 animate-slide-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Gamepad2 className="text-accent" size={28} />
                  {TEXTS.activeServers}
                </h2>
                <p className="text-secondary mt-1">
                  {servers.length} {servers.length === 1 ? 'servidor activo' : 'servidores activos'}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="card text-center py-12 max-w-4xl mx-auto">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-secondary">{TEXTS.loadingServers}</p>
              </div>
            ) : servers.length === 0 ? (
              <div className="card text-center py-12 max-w-4xl mx-auto">
                <Gamepad2 className="w-16 h-16 text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">{TEXTS.noActiveServers}</h3>
                <p className="text-secondary mb-6">{TEXTS.beTheFirst}</p>
                <button
                  onClick={() => navigate('/impostor')}
                  className="btn btn-primary"
                >
                  <Gamepad2 size={20} />
                  Crear Partida
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {servers.map((server, index) => (
                  <div
                    key={server.roomId}
                    className="card group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate mb-1" title={server.name}>
                          {server.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-secondary">
                          <span className="px-2 py-1 bg-accent/10 text-accent rounded-md text-xs font-medium uppercase">
                            {TEXTS.impostor}
                          </span>
                          {server.hasPassword && (
                            <Lock size={14} className="text-warning" title="Requiere contraseña" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-muted" />
                          <span className="font-medium">
                            {server.playerCount}/{server.maxPlayers}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            server.playerCount >= server.maxPlayers ? 'bg-danger' :
                            server.playerCount > server.maxPlayers * 0.8 ? 'bg-warning' : 'bg-success'
                          }`}></div>
                          <span className="text-secondary text-xs">
                            {server.playerCount >= server.maxPlayers ? 'Lleno' : 'Disponible'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-muted">
                        {TEXTS.host}: <span className="font-medium">{server.hostName}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleJoinClick(server)}
                      className="btn btn-primary w-full group"
                      disabled={server.playerCount >= server.maxPlayers}
                    >
                      {server.playerCount >= server.maxPlayers ? (
                        <>
                          <Lock size={16} />
                          {TEXTS.full}
                        </>
                      ) : (
                        <>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          {TEXTS.join}
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;

