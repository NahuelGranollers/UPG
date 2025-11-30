import React, { useEffect, useState } from 'react';
import { Wifi, Users, Copy, Check, Server, Clock } from 'lucide-react';

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
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const SERVER_IP = 'mc.unaspartidillas.online';
  // Set target date to 2 days from now (approx Nov 30, 2025 based on context, or just +48h from mount)
  // For a static "2 days" countdown, I'll set a fixed future date relative to now.
  // If the user wants a specific date, they can adjust. For now, let's assume 2 days from "now".
  // However, to make it persistent across reloads for "2 days", I should probably pick a fixed date.
  // Let's set it to 48 hours from the moment this code runs, or better, a fixed timestamp if I knew the event.
  // Since I don't, I'll set it to a fixed date 2 days in the future from the current context date (Nov 28).
  // Target: Nov 30, 2025 21:00:00
  const TARGET_DATE = new Date('2025-11-30T21:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Countdown Overlay */}
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center p-6">
          <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <Clock size={48} className="text-white animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            PRÓXIMAMENTE
          </h2>
          <p className="text-white/60 font-mono mb-8 max-w-md">
            El servidor abrirá sus puertas en:
          </p>
          
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            {[
              { label: 'Días', value: timeLeft.days },
              { label: 'Horas', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Seg', value: timeLeft.seconds }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-lg backdrop-blur-sm">
                  <span className="text-2xl md:text-3xl font-bold text-white font-mono">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-white/40 uppercase tracking-wider font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 opacity-20 pointer-events-none filter blur-sm">
          
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
                      Online
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
                  {copied ? 'Copiado!' : 'Copiar IP'}
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
