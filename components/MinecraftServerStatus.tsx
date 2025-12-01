import React, { useEffect, useState } from 'react';
import { Wifi, Users, Copy, Check, Server, Clock } from 'lucide-react';
import { TEXTS } from '../utils/texts';

interface ServerStatus {
  online: boolean;
  ip: string;
  port: number;
  players: {
    online: number;
    max: number;
  };
  motd: {
    html: string[];
    clean: string[];
  };
  icon?: string;
  version?: string;
}

const MinecraftServerStatus: React.FC = () => {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const SERVER_IP = 'mc.unaspartidillas.online';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await res.json();
        setStatus(data);
      } catch (e) {
        console.error('Error fetching MC status', e);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mb-8 p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] animate-pulse flex items-center justify-center h-32">
        <div className="text-white/50 font-mono">Cargando estado del servidor...</div>
      </div>
    );
  }

  const isOnline = status?.online;

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 relative group">
      {/* Liquid Glass Container */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0f0f0f]/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_8px_32px_0_rgba(88,101,242,0.2)] hover:border-white/20">
        
        {/* Background Gradient Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/20 rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full pointer-events-none" />

        {/* Countdown Overlay removed as requested */}

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          
          {/* Server Icon / Status Indicator */}
          <div className="relative shrink-0">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 ${isOnline ? 'border-green-500/50' : 'border-red-500/50'} shadow-lg relative group-hover:scale-105 transition-transform duration-300`}>
              <img src="https://filterforge.com/filters/11635.jpg" alt="Server Icon" className="w-full h-full object-cover" />
              {/* Online/Offline Badge */}
              <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-[#0f0f0f] ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
          </div>

          {/* Server Info */}
          <div className="flex-1 text-center md:text-left w-full">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-2 mb-2">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  UPG
                  {isOnline && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30 uppercase tracking-wider">
                      {TEXTS.online}
                    </span>
                  )}
                </h2>
                <p className="text-white/60 font-mono text-sm mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Wifi size={14} />
                  {SERVER_IP}
                </p>
              </div>
              
              <button 
                onClick={copyIp}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 group/btn"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-white/70 group-hover/btn:text-white" />}
                <span className={`text-sm font-medium ${copied ? 'text-green-400' : 'text-white/70 group-hover/btn:text-white'}`}>
                  {copied ? TEXTS.copied : TEXTS.copyIp}
                </span>
              </button>
            </div>

            {/* MOTD */}
            <div className="bg-black/30 rounded-xl p-4 mb-4 border border-white/5 font-minecraft text-gray-300 text-sm leading-relaxed shadow-inner">
              {isOnline && status?.motd?.clean ? (
                status.motd.clean.map((line, i) => (
                  <div key={i} className="whitespace-pre-wrap text-center md:text-left">{line}</div>
                ))
              ) : (
                <div className="text-white/40 italic">El servidor está desconectado actualmente.</div>
              )}
            </div>

            {/* Player Count & Version */}
            {isOnline && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-white/50 uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1"><Users size={12} /> Jugadores</span>
                  <span>{status?.players.online} / {status?.players.max}</span>
                </div>
                
                {/* Online Players List */}
                {status?.players.list && status.players.list.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Jugadores Online</div>
                    <div className="flex flex-wrap gap-2">
                      {status.players.list.slice(0, 10).map((playerName, index) => (
                        <div key={index} className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/5 hover:border-white/10 transition-colors group">
                          <img 
                            src={`https://mc-heads.net/avatar/${playerName}/32`}
                            alt={`${playerName} avatar`}
                            className="w-6 h-6 rounded border border-white/10 group-hover:border-white/20 transition-colors"
                            onError={(e) => {
                              // Fallback to default Minecraft head if avatar fails to load
                              (e.target as HTMLImageElement).src = 'https://mc-heads.net/avatar/Steve/32';
                            }}
                          />
                          <span className="text-xs text-white/80 font-medium truncate max-w-[80px]" title={playerName}>
                            {playerName}
                          </span>
                        </div>
                      ))}
                      {status.players.list.length > 10 && (
                        <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 border border-white/5">
                          <div className="w-6 h-6 rounded bg-gray-600 flex items-center justify-center text-xs text-white/60">
                            +{status.players.list.length - 10}
                          </div>
                          <span className="text-xs text-white/60 font-medium">más</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Custom Progress Bar */}
                <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-green-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-out relative"
                    style={{ width: `${Math.min(100, ((status?.players.online || 0) / (status?.players.max || 1)) * 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-30" />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-white/30 font-mono">1.21.10</span>
                  <span className="text-xs text-green-400/80 font-mono animate-pulse">● Señal estable</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinecraftServerStatus;
