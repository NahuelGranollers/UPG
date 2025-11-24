import React, { memo } from 'react';
import { Users, Shield, Trophy, Globe } from 'lucide-react';

const WhoWeAre: React.FC = () => {
  return (
    <div className="flex-1 bg-discord-chat overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-discord-text-header mb-3 sm:mb-4">
            Unas Partidillas Gang (UPG)
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-discord-text-muted max-w-2xl mx-auto px-2">
            Somos una comunidad dedicada a unir jugadores de todas las plataformas y niveles.
            Nuestra misión es crear un espacio seguro, divertido y competitivo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12">
          <div className="discord-card hover:border-discord-blurple/50 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-discord-blurple rounded-discord flex items-center justify-center mb-3 sm:mb-4">
              <Users className="text-discord-text-header" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-discord-text-header mb-2">Comunidad Activa</h3>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Más de 5000 miembros activos participando en eventos diarios, charlas y partidas
              grupales.
            </p>
          </div>

          <div className="discord-card hover:border-green-500/50 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-green-600 rounded-discord flex items-center justify-center mb-3 sm:mb-4">
              <Shield className="text-discord-text-header" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-discord-text-header mb-2">Moderación Justa</h3>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Un equipo de staff dedicado 24/7 a mantener un ambiente libre de toxicidad y amigable
              para todos.
            </p>
          </div>

          <div className="discord-card hover:border-yellow-500/50 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-yellow-600 rounded-discord flex items-center justify-center mb-3 sm:mb-4">
              <Trophy className="text-discord-text-header" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-discord-text-header mb-2">Torneos Semanales</h3>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Organizamos torneos con premios reales en juegos como Valorant, League of Legends y
              Rocket League.
            </p>
          </div>

          <div className="discord-card hover:border-pink-500/50 transition-colors">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-pink-600 rounded-discord flex items-center justify-center mb-3 sm:mb-4">
              <Globe className="text-discord-text-header" size={24} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-discord-text-header mb-2">Global</h3>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Miembros de toda latinoamérica y España. ¡Siempre encontrarás a alguien con quien
              jugar!
            </p>
          </div>
        </div>

        {/* Staff Section */}
        <h2 className="text-xl sm:text-2xl font-bold text-discord-text-header mb-4 sm:mb-5 md:mb-6 border-b border-discord-hover pb-2">
          Equipo Staff
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { name: 'AdminZero', role: 'Fundador', color: 'text-red-500', img: 10 },
            { name: 'ModLuna', role: 'Admin', color: 'text-green-400', img: 20 },
            { name: 'DevKai', role: 'Developer', color: 'text-blue-400', img: 30 },
            { name: 'ComMgr', role: 'Community', color: 'text-yellow-400', img: 40 },
          ].map((member, i) => (
            <div
              key={i}
              className="flex items-center discord-card p-3 sm:p-3 min-h-[60px]"
            >
              <img
                src={`https://picsum.photos/id/${member.img}/100/100`}
                alt={member.name}
                className="w-11 h-11 sm:w-10 sm:h-10 rounded-discord mr-3 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className={`font-bold text-sm ${member.color} truncate`}>{member.name}</div>
                <div className="text-xs text-discord-text-muted truncate">{member.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(WhoWeAre);
