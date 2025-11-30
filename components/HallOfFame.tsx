import React, { useState, useRef } from 'react';
import { Trophy, Star, Medal, Crown, Award, Menu } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  winner: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface HallOfFameProps {
  onOpenSidebar?: () => void;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Premio al más correas',
    description: 'UPG Awards 2024',
    winner: 'Martí',
    icon: Trophy,
    color: '#FFD700',
  },
  {
    id: '2',
    title: 'Premio al más inter',
    description: 'UPG Awards 2024',
    winner: 'Gerytuber',
    icon: Star,
    color: '#FF6B6B',
  },
  {
    id: '3',
    title: 'Premio al más tocapelotas',
    description: 'UPG Awards 2024',
    winner: 'Gerytuber',
    icon: Crown,
    color: '#4ECDC4',
  },
  {
    id: '4',
    title: 'Premio a las excusas del año',
    description: 'UPG Awards 2024',
    winner: 'Dufac',
    icon: Medal,
    color: '#45B7D1',
  },
  {
    id: '5',
    title: 'Premio al mejor informante',
    description: 'UPG Awards 2024',
    winner: 'Fishker',
    icon: Award,
    color: '#96CEB4',
  },
  {
    id: '6',
    title: 'Premio al anfitrión del año',
    description: 'UPG Awards 2024',
    winner: 'Mate',
    icon: Crown,
    color: '#FFEAA7',
  },
  {
    id: '7',
    title: 'Premio al más farmer (voicechat)',
    description: 'UPG Awards 2024',
    winner: 'Glowik',
    icon: Trophy,
    color: '#FF9F43',
  },
  {
    id: '8',
    title: 'Premio al más farmer (textchat)',
    description: 'UPG Awards 2024',
    winner: 'Dufac',
    icon: Star,
    color: '#54A0FF',
  },
  {
    id: '9',
    title: 'Bromista del año',
    description: 'UPG Awards 2024',
    winner: 'Nahuel',
    icon: Medal,
    color: '#5F27CD',
  },
  {
    id: '10',
    title: 'Virgen del año',
    description: 'UPG Awards 2024',
    winner: 'Dufac',
    icon: Award,
    color: '#FF6B6B',
  },
  {
    id: '11',
    title: 'Premio al más retrasado (impuntual)',
    description: 'UPG Awards 2024',
    winner: 'Dufac',
    icon: Crown,
    color: '#C8D6E5',
  },
  {
    id: '12',
    title: 'Pareja del año',
    description: 'UPG Awards 2024',
    winner: 'Berni & Marta',
    icon: Trophy,
    color: '#FF9FF3',
  },
  {
    id: '13',
    title: 'Sub-grupo del año',
    description: 'UPG Awards 2024',
    winner: 'Padel & Ping Pong',
    icon: Star,
    color: '#1DD1A1',
  },
  {
    id: '14',
    title: 'Amigo del año',
    description: 'UPG Awards 2024',
    winner: 'Fishker',
    icon: Medal,
    color: '#FECA57',
  },
];

const HallOfFame: React.FC<HallOfFameProps> = ({ onOpenSidebar }) => {
  const [selected, setSelected] = useState<Achievement | null>(null);

  const shelfRef = useRef<HTMLDivElement | null>(null);
  const [reflect, setReflect] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = shelfRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // normalize opacity based on distance to center (simple)
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = Math.abs(x - cx);
    const dy = Math.abs(y - cy);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const max = Math.sqrt(cx * cx + cy * cy);
    const opacity = Math.max(0.12, 1 - dist / max);
    setReflect({ x, y, opacity });
  };

  const handleMouseLeave = () => setReflect({ x: 0, y: 0, opacity: 0 });

  return (
    <div className="flex flex-col h-full w-full bg-discord-chat overflow-hidden relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="discord-header discord-glass-card p-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-discord-text-header mb-2">Salón de la Fama — UPG</h1>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Los logros de la comunidad, preservados en vitrina
            </p>
          </div>
          {/* share button removed per user request */}
        </header>

        <section className="discord-card discord-depth-2 p-6">
          {/* vitrina container: transparent background, glass overlay will provide reflection */}
          <div
            ref={shelfRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              background: 'transparent',
              borderRadius: 12,
              padding: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm pointer-events-none" />

            {/* Shelves */}
            <div className="grid grid-cols-1 gap-6">
              {Array.from({ length: Math.ceil(achievements.length / 6) }).map((_, row) => (
                <div
                  key={row}
                  className="flex items-center justify-between py-6"
                  style={{ boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.35)' }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full justify-items-center">
                    {achievements.slice(row * 6, row * 6 + 6).map((ach, i) => (
                      <div key={ach?.id ?? i} className={`relative flex items-center justify-center ${!ach ? 'hidden sm:flex' : ''}`}>
                        {ach ? (
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label={`${ach.title} — Ganador: ${ach.winner}`}
                            className="w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 inline-block rounded-lg relative transition-transform duration-200 ease-in-out hover:-translate-y-2.5 hover:-rotate-3 hover:scale-110 hover:drop-shadow-2xl focus:outline-2 focus:outline-blue-500/14 focus:-translate-y-2 focus:scale-105 after:content-[''] after:absolute after:top-2 after:right-3 after:w-2 after:h-2 after:bg-white/50 after:shadow-lg after:rounded-sm after:opacity-95"
                            onClick={() => setSelected(ach)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' || e.key === ' ') setSelected(ach);
                            }}
                          >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/95 p-2 text-center">
                              <ach.icon className="w-8 h-8 xs:w-10 xs:h-10 sm:w-14 sm:h-14 mb-2" style={{ color: ach.color }} />
                              <span className="text-[10px] xs:text-xs sm:text-sm leading-tight font-bold line-clamp-2">{ach.title}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-28 w-full bg-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Glass front subtle shine */}
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{ border: '1px solid rgba(255,255,255,0.02)' }}
            />

            {/* glass reflection layer that follows cursor */}
            <div
              className="glass-reflection pointer-events-none"
              style={{
                left: reflect.x,
                top: reflect.y,
                opacity: reflect.opacity,
                transform: `translate(-50%, -50%)`,
              }}
            />
          </div>
        </section>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center z-overlay p-4">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <div className="discord-glass p-6 rounded-2xl max-w-xl w-full z-top">
              <div className="flex items-start gap-4">
                <selected.icon className="w-14 h-14 text-yellow-400" />
                <div>
                  <h2 className="text-2xl font-bold">{selected.title}</h2>
                  <p className="text-sm muted-contrast mt-2">{selected.description}</p>
                  <p className="mt-3">
                    <strong>Ganador:</strong>{' '}
                    <span className="text-yellow-400">{selected.winner}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="discord-button secondary" onClick={() => setSelected(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default HallOfFame;
