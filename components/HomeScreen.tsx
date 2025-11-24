import React from 'react';
import SafeImage from './SafeImage';
import { ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onGoToChat: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToChat }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-discord-chat min-h-screen">
      <div className="max-w-2xl w-full bg-discord-surface backdrop-blur-sm rounded-discord shadow-discord border border-discord-hover overflow-hidden">
        <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center gap-6">
          <SafeImage src="/upg.png" alt="UPG" className="w-32 h-32 object-cover rounded-discord shadow-discord" fallbackSrc="/upg.png" />
          <h1 className="text-4xl font-black text-discord-text-header">
            Bienvenido a UPG
          </h1>
          <p className="text-lg text-discord-text-normal max-w-lg">
            Esta es la comunidad. Aquí encontrarás canales, eventos y salas de voz. Mantén el respeto y disfruta.
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={onGoToChat}
              className="discord-button"
            >
              Ir al Chat
            </button>
            <a
              className="discord-button secondary"
              href="/about"
            >
              ¿Qué es UPG?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};export default HomeScreen;
