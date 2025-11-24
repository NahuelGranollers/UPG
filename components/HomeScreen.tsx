import React from 'react';
import SafeImage from './SafeImage';
import { ArrowRight } from 'lucide-react';

interface HomeScreenProps {
  onGoToChat: () => void;
  onGoToWhoWeAre: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGoToChat, onGoToWhoWeAre }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-discord-chat min-h-screen">
      <div className="max-w-2xl w-full bg-discord-surface backdrop-blur-sm rounded-discord shadow-discord border border-discord-hover overflow-hidden">
        <div className="p-10 md:p-14 lg:p-16 flex flex-col justify-center items-center text-center gap-8">
          <SafeImage src="/upg.png" alt="UPG" className="w-32 h-32 object-cover rounded-discord shadow-discord" fallbackSrc="/upg.png" />
          <h1 className="text-4xl font-black text-discord-text-header">
            Bienvenido a UPG
          </h1>
          {/* JSON-LD structured data for Organization / WebSite */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Unas Partidillas Gang (UPG)",
            "url": "https://unaspartidillas.online/",
            "logo": "https://unaspartidillas.online/upg.png",
            "sameAs": [
              "https://twitter.com/unaspartidillas"
            ]
          }) }} />
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
            <button
              onClick={onGoToWhoWeAre}
              className="discord-button secondary"
            >
              ¿Qué es UPG?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};export default HomeScreen;
