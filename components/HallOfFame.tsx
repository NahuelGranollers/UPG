import React, { useState } from 'react';
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
  {
    id: '1',
    title: 'Campeón del Torneo de Verano 2024',
    description: 'Primer lugar en el torneo de Among Us con más de 50 participantes',
    winner: 'NahuelGranollers',
    icon: Crown,
    color: '#FFD700'
  },
  {
    id: '2',
    title: 'Mejor Estratega',
    description: 'Ganador del premio a la mejor estrategia en votaciones',
    winner: 'PlayerMaster',
    icon: Star,
    color: '#FF6B6B'
  },
  {
    id: '3',
    title: 'Jugador Más Activo',
    description: 'Más horas jugadas en la comunidad durante el mes',
    winner: 'GameAddict',
    icon: Trophy,
    color: '#4ECDC4'
  },
  {
    id: '4',
    title: 'Artista de la Comunidad',
    description: 'Mejor diseño de avatar personalizado',
    winner: 'PixelArtist',
    icon: Medal,
    color: '#45B7D1'
  },
  {
    id: '5',
    title: 'Líder de Equipo',
    description: 'Mejor coordinador en juegos de equipo',
    winner: 'TeamLeader',
    icon: Award,
    color: '#96CEB4'
  },
  {
    id: '6',
    title: 'Leyenda Viva',
    description: 'Miembro fundador con más contribuciones',
    winner: 'LegendPlayer',
    icon: Crown,
    color: '#FFEAA7'
  }
];

const HallOfFame: React.FC = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const pixelArtStyle = {
    imageRendering: 'pixelated' as const,
    borderRadius: '2px'
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-white discord-glass p-4 rounded-lg">
          🏆 Salón de la Fama UPG 🏆
        </h1>

        {/* Vitrina de Cristal */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl"></div>

          {/* Marco de la vitrina */}
          <div className="relative p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    onClick={() => setSelectedAchievement(achievement)}
                  >
                    {/* Trofeo con estilo pixelart */}
                    <div
                      className="relative bg-gradient-to-b from-yellow-400 to-yellow-600 p-6 rounded-lg border-4 border-yellow-300 shadow-lg"
                      style={pixelArtStyle}
                    >
                      {/* Efecto de cristal sobre el trofeo */}
                      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg"></div>

                      <div className="relative flex flex-col items-center text-center">
                        <IconComponent
                          className="w-16 h-16 mb-4 text-white drop-shadow-lg"
                          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.5))' }}
                        />
                        <h3 className="text-lg font-bold text-white mb-2 pixel-text">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-yellow-100 pixel-text">
                          Ganador: {achievement.winner}
                        </p>
                      </div>

                      {/* Brillo pixelado */}
                      <div className="absolute top-2 right-2 w-3 h-3 bg-white/60 rounded-sm pixel-glow"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-white/40 rounded-sm pixel-glow"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal de detalles */}
        {selectedAchievement && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
              <div className="text-center">
                <selectedAchievement.icon
                  className="w-20 h-20 mx-auto mb-4 text-yellow-400"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.5))' }}
                />
                <h2 className="text-2xl font-bold text-white mb-4 pixel-text">
                  {selectedAchievement.title}
                </h2>
                <p className="text-gray-300 mb-4 pixel-text">
                  {selectedAchievement.description}
                </p>
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <p className="text-yellow-300 font-semibold pixel-text">
                    🏆 Ganador: {selectedAchievement.winner}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors pixel-text"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .pixel-text {
          font-family: 'Courier New', monospace;
          text-shadow: 1px 1px 0px rgba(0,0,0,0.8);
        }
        .pixel-glow {
          box-shadow: 0 0 4px rgba(255,255,255,0.6);
        }
      `}</style>
    </div>
  );
};

export default HallOfFame;