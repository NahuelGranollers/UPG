import React from 'react';
import { Home, Users, Vote, Newspaper, Trophy, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

const MobileSidebar: React.FC<Props> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div className={`absolute inset-0 bg-black/50`} onClick={onClose} />

      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-discord-dark shadow-xl transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-[-100%]'}`}
        style={{ transitionProperty: 'transform', transitionDuration: '220ms' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-discord-chat/30">
          <div className="text-lg font-bold">UPG</div>
          <button className="p-2 rounded-md hover:bg-discord-chat/30" onClick={onClose} aria-label="Cerrar sidebar">
            <X size={18} />
          </button>
        </div>

        <nav className="p-3 space-y-2">
          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('home'); onClose(); }}
          >
            <Home /> <span>Inicio</span>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('chat'); onClose(); }}
          >
            <Users /> <span>Canales</span>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('who'); onClose(); }}
          >
            <Users /> <span>Quiénes somos</span>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('voting'); onClose(); }}
          >
            <Vote /> <span>Votaciones</span>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('news'); onClose(); }}
          >
            <Newspaper /> <span>Noticias</span>
          </button>

          <button
            className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-discord-card"
            onClick={() => { onNavigate('hall_of_fame'); onClose(); }}
          >
            <Trophy /> <span>Salón</span>
          </button>
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
