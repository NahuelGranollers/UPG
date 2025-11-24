import React, { useState, useRef, useEffect } from 'react';
import { Trophy, Star, Medal, Crown, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  winner: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const achievements: Achievement[] = [
  { id: '1', title: 'Campeón Torneo Verano 2024', description: 'Primer puesto en el torneo de la comunidad', winner: 'NahuelGranollers', icon: Crown, color: '#FFD700' },
  { id: '2', title: 'Mejor Estratega', description: 'Premio a la mejor estrategia en votaciones', winner: 'PlayerMaster', icon: Star, color: '#FF6B6B' },
  { id: '3', title: 'Jugador Más Activo', description: 'Mayor tiempo de juego en el mes', winner: 'GameAddict', icon: Trophy, color: '#4ECDC4' },
  { id: '4', title: 'Artista Comunidad', description: 'Mejor diseño y avatar', winner: 'PixelArtist', icon: Medal, color: '#45B7D1' },
  { id: '5', title: 'Líder de Equipo', description: 'Coordinación y liderazgo en partidas', winner: 'TeamLeader', icon: Award, color: '#96CEB4' },
  { id: '6', title: 'Leyenda Viva', description: 'Miembro fundador con más contribuciones', winner: 'LegendPlayer', icon: Crown, color: '#FFEAA7' }
];

const HallOfFame: React.FC = () => {
  const [selected, setSelected] = useState<Achievement | null>(null);

  const shelfRef = useRef<HTMLDivElement | null>(null);
  const [reflect, setReflect] = useState({ x: 0, y: 0, opacity: 0 });
  const [availableImages, setAvailableImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Check which trophy images actually exist in `public/assets/hall/` to avoid
    // rendering <img> tags that cause 404s in the browser console.
    let mounted = true;
    (async () => {
      const map: Record<string, boolean> = {};
      await Promise.all(
        achievements.map(async (a) => {
          try {
            const resp = await fetch(`/assets/hall/${a.id}.png`, { method: 'HEAD' });
            map[a.id] = resp.ok;
          } catch (err) {
            map[a.id] = false;
          }
        })
      );
      if (mounted) setAvailableImages(map);
    })();
    return () => { mounted = false; };
  }, []);

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
    <div className="h-full w-full p-6 overflow-y-auto discord-chat">
      <div className="max-w-6xl mx-auto">
        <header className="discord-header discord-glass-card p-4 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Salón de la Fama — UPG</h1>
            <p className="text-sm muted-contrast">Los logros de la comunidad, preservados en vitrina</p>
          </div>
          {/* share button removed per user request */}
        </header>

        <section className="discord-card discord-depth-2 p-6">

          {/* vitrina container: transparent background, glass overlay will provide reflection */}
          <div ref={shelfRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ background: 'transparent', borderRadius: 12, padding: 12, position: 'relative', overflow: 'hidden' }}>
            <div className="absolute inset-0 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm pointer-events-none" />

            {/* Three shelves */}
            <div className="grid grid-cols-1 gap-6">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center justify-between py-6" style={{ boxShadow: 'inset 0 -6px 10px rgba(0,0,0,0.35)' }}>
                  <div className="grid grid-cols-3 gap-6 w-full">
                    {achievements.slice(row * 2, row * 2 + 3).map((ach, i) => (
                      <div key={ach?.id ?? i} className="relative flex items-center justify-center">
                        {ach ? (
                          <div
                            role="button"
                            tabIndex={0}
                            aria-label={`${ach.title} — Ganador: ${ach.winner}`}
                            className="trophy-object-wrapper"
                            onClick={() => setSelected(ach)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(ach); }}
                          >
                            {availableImages[ach.id] ? (
                              <img
                                src={`/assets/hall/${ach.id}.png`}
                                alt=""
                                className="object-trophy block w-28 h-28 mx-auto rounded-md"
                              />
                            ) : null}
                            <div className="icon-fallback absolute inset-0 flex items-center justify-center">
                              <ach.icon className="w-12 h-12" style={{ color: ach.color }} />
                            </div>
                          </div>
                        ) : (
                          <div className="h-36 w-full bg-transparent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Glass front subtle shine */}
            <div className="absolute inset-0 pointer-events-none rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.02)' }} />

            {/* glass reflection layer that follows cursor */}
            <div
              className="glass-reflection pointer-events-none"
              style={{
                left: reflect.x,
                top: reflect.y,
                opacity: reflect.opacity,
                transform: `translate(-50%, -50%)`
              }}
            />
          </div>
        </section>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 flex items-center justify-center z-overlay p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
            <div className="discord-glass p-6 rounded-2xl max-w-xl w-full z-top">
              <div className="flex items-start gap-4">
                <selected.icon className="w-14 h-14 text-yellow-400" />
                <div>
                  <h2 className="text-2xl font-bold">{selected.title}</h2>
                  <p className="text-sm muted-contrast mt-2">{selected.description}</p>
                  <p className="mt-3"><strong>Ganador:</strong> <span className="text-yellow-400">{selected.winner}</span></p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button className="discord-button secondary" onClick={() => setSelected(null)}>Cerrar</button>
                <button className="discord-button" onClick={() => alert('Ver historial (placeholder)')}>Ver historial</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .trophy-object-wrapper { width: 112px; height: 112px; display: inline-block; border-radius: 8px; position: relative; }
        .object-trophy { object-fit: contain; display: block; }
        .icon-fallback { color: rgba(255,255,255,0.95); }
        .trophy-object-wrapper { transition: transform .2s ease, box-shadow .2s ease; }
        .trophy-object-wrapper:hover { transform: translateY(-10px) rotate(-3deg) scale(1.08); filter: drop-shadow(0 14px 24px rgba(0,0,0,0.45)); }
        .trophy-object-wrapper:focus { outline: 2px solid rgba(88,101,242,0.14); transform: translateY(-8px) scale(1.06); }
        .trophy-object-wrapper::after { content: ''; position: absolute; top: 8px; right: 12px; width: 8px; height: 8px; background: rgba(255,255,255,0.5); box-shadow: 0 0 10px rgba(255,255,255,0.25); border-radius: 2px; opacity: .95; }
        @media (max-width: 768px) { .trophy-object-wrapper { width: 72px; height: 72px; } .object-trophy { width: 72px; height: 72px; } }
      `}</style>
    </div>
  );
};

export default HallOfFame;