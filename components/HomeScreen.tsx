import React from 'react';
import SafeImage from './SafeImage';
import { ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onGoToChat: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToChat }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-[#ffcc17] via-[#ffea9a] to-white min-h-screen">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-[#ff4d0a] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center items-start gap-6">
            <SafeImage src="/upg.png" alt="UPG" className="w-32 h-32 object-cover rounded-lg shadow-md" fallbackSrc="/upg.png" />
            <h1 className="text-4xl font-black" style={{ color: '#ff4d0a' }}>
              Bienvenido a UPG
            </h1>
            <p className="text-lg text-gray-700">
              Esta es la comunidad. Aquí encontrarás canales, eventos y salas de voz. Mantén el respeto y disfruta.
            </p>

            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={onGoToChat}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#ff4d0a] hover:bg-[#e03e00] text-white font-bold rounded-full shadow-md transition-colors"
              >
                Ir al Chat
                <ArrowRight size={18} />
              </button>
              <a
                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                href="/about"
              >
                ¿Qué es UPG?
              </a>
            </div>
          </div>
          <div className="p-8 md:p-12 bg-gradient-to-tr from-white to-[#fff7e0]">
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#ff4d0a' }}>
              Novedades
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li>• Nuevo panel de administración y moderación.</li>
              <li>• Mensajería en tiempo real con transformaciones (troll modes).</li>
              <li>• Voz en tiempo real y sincronización de perfiles.</li>
            </ul>
            <div className="mt-6 text-sm text-gray-600">Usa el menú lateral para navegar entre servidores y canales.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
