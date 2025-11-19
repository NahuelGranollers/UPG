import React from 'react';
import { Users, Shield, Trophy, Globe } from 'lucide-react';

const WhoWeAre: React.FC = () => {
  return (
    <div className="flex-1 bg-discord-chat overflow-y-auto custom-scrollbar p-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                 <h1 className="text-4xl font-extrabold text-white mb-4">United Player Group (UPG)</h1>
                 <p className="text-discord-text-muted text-lg max-w-2xl mx-auto">
                    Somos una comunidad dedicada a unir jugadores de todas las plataformas y niveles. 
                    Nuestra misión es crear un espacio seguro, divertido y competitivo.
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-discord-blurple/50 transition-colors">
                    <div className="w-12 h-12 bg-discord-blurple rounded-lg flex items-center justify-center mb-4">
                        <Users className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Comunidad Activa</h3>
                    <p className="text-discord-text-muted">
                        Más de 5000 miembros activos participando en eventos diarios, charlas y partidas grupales.
                    </p>
                </div>

                <div className="bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-green-500/50 transition-colors">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Moderación Justa</h3>
                    <p className="text-discord-text-muted">
                        Un equipo de staff dedicado 24/7 a mantener un ambiente libre de toxicidad y amigable para todos.
                    </p>
                </div>

                <div className="bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-yellow-500/50 transition-colors">
                    <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                        <Trophy className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Torneos Semanales</h3>
                    <p className="text-discord-text-muted">
                        Organizamos torneos con premios reales en juegos como Valorant, League of Legends y Rocket League.
                    </p>
                </div>

                 <div className="bg-[#2b2d31] p-6 rounded-lg border border-gray-800/50 hover:border-pink-500/50 transition-colors">
                    <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                        <Globe className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Global</h3>
                    <p className="text-discord-text-muted">
                        Miembros de toda latinoamérica y España. ¡Siempre encontrarás a alguien con quien jugar!
                    </p>
                </div>
            </div>

            {/* Staff Section */}
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Equipo Staff</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                     { name: 'AdminZero', role: 'Fundador', color: 'text-red-500', img: 10 },
                     { name: 'ModLuna', role: 'Admin', color: 'text-green-400', img: 20 },
                     { name: 'DevKai', role: 'Developer', color: 'text-blue-400', img: 30 },
                     { name: 'ComMgr', role: 'Community', color: 'text-yellow-400', img: 40 }
                 ].map((member, i) => (
                     <div key={i} className="flex items-center bg-[#2b2d31] p-3 rounded-md">
                         <img src={`https://picsum.photos/id/${member.img}/100/100`} alt={member.name} className="w-10 h-10 rounded-full mr-3" />
                         <div>
                             <div className={`font-bold text-sm ${member.color}`}>{member.name}</div>
                             <div className="text-xs text-discord-text-muted">{member.role}</div>
                         </div>
                     </div>
                 ))}
            </div>
        </div>
    </div>
  );
};

export default WhoWeAre;