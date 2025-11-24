import React, { memo, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Home, Shield, Users, Vote, Newspaper, Trophy } from 'lucide-react';
import SafeImage from './SafeImage';
import AdminPanel from './AdminPanel';
import { UserRole, User } from '../types';

interface SidebarProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  onHomeClick?: () => void;
  onUPGClick?: () => void;
  // activeSection allows parent to indicate which sidebar node is active
  activeSection?: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame';
  // navigation callback when clicking a sidebar node
  onNavigate?: (section: 'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame') => void;
}

const Sidebar: React.FC<SidebarProps> = memo(({ currentUser, setCurrentUser: _setCurrentUser, onHomeClick, onUPGClick, activeSection, onNavigate }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  // Impostor is now a full page route/view
  const isAdmin = currentUser?.role === UserRole.ADMIN;

  // Obtener socket desde el contexto
  const { socket } = useSocket();
  return (
    <div className="w-[84px] bg-discord-dark flex flex-col items-center py-5 space-y-4 overflow-y-auto shrink-0">
      {/* Direct Messages / Home */}
      {(() => {
        const active = activeSection === 'home';
        return (
          <div className={`relative ${active ? 'group active' : 'group'}`}>
            {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
            <button
              onClick={() => {
                if (onNavigate) onNavigate('home');
                if (onHomeClick) onHomeClick();
              }}
              className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-blurple hover:text-white'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
              aria-pressed={active}
            >
              <Home size={32} />
            </button>
          </div>
        );
      })()}

      <div className="w-10 h-[2px] bg-discord-chat rounded-lg mx-auto" />

      {/* UPG Server (Active) */}
      {(() => {
        const active = activeSection === 'chat' || activeSection === 'upg';
        return (
          <div className="relative">
            {active && <div className="absolute left-0 bg-white rounded-r-md w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
            <button
              onClick={() => {
                if (onNavigate) onNavigate('chat');
                if (onUPGClick) onUPGClick();
              }}
              className={`w-14 h-14 ${active ? 'bg-discord-green text-white' : 'bg-discord-chat text-discord-green hover:bg-discord-yellow hover:text-white'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
              title="UPG"
              aria-pressed={active}
            >
              <SafeImage
                src="/upg.png"
                alt="UPG"
                className="object-cover w-full h-full"
                fallbackSrc="https://ui-avatars.com/api/?name=UPG&background=ffcc17&color=ffcc17&size=128"
              />
            </button>
          </div>
        );
      })()}

      <div className="w-10 h-[2px] bg-discord-chat rounded-lg mx-auto" />

      {/* Impostor game (navigate to full page) */}
      {(() => {
        const active = activeSection === 'impostor';
        return (
          <div className="relative">
            {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
            <button onClick={() => onNavigate && onNavigate('impostor')} className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-blurple hover:text-white'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`} title="Impostor" aria-pressed={active}>
              <SafeImage
                src="https://cdn3.emoji.gg/emojis/8886-among-us-red.png"
                alt="Impostor"
                className="object-cover w-full h-full"
                fallbackSrc="https://ui-avatars.com/api/?name=Impostor&background=5865f2&color=ffffff&size=128"
              />
            </button>
          </div>
        );
      })()}

      {/* New direct nodes: Quiénes somos & Votaciones */}
      <div className="mt-2 space-y-2">
        {(() => {
          const active = activeSection === 'who';
          return (
            <div className="relative">
              {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('who');
                }}
                className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-hover hover:text-discord-text-normal'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
                title="Quiénes somos"
                aria-pressed={active}
              >
                <Users size={24} />
              </button>
            </div>
          );
        })()}

        {(() => {
          const active = activeSection === 'voting';
          return (
            <div className="relative">
              {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('voting');
                }}
                className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-hover hover:text-discord-text-normal'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
                title="Votaciones"
                aria-pressed={active}
              >
                <Vote size={24} />
              </button>
            </div>
          );
        })()}

        {(() => {
          const active = activeSection === 'news';
          return (
            <div className="relative">
              {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('news');
                }}
                className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-hover hover:text-discord-text-normal'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
                title="Noticias UPG"
                aria-pressed={active}
              >
                <Newspaper size={24} />
              </button>
            </div>
          );
        })()}

        {(() => {
          const active = activeSection === 'hall_of_fame';
          return (
            <div className="relative">
              {active && <div className="absolute left-0 bg-white rounded-r w-1 h-12 top-1/2 -translate-y-1/2 -ml-1" />}
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('hall_of_fame');
                }}
                className={`w-14 h-14 ${active ? 'bg-discord-blurple text-white' : 'bg-discord-chat text-discord-text-normal hover:bg-discord-hover hover:text-discord-text-normal'} rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center`}
                title="Salón de la Fama"
                aria-pressed={active}
              >
                <Trophy size={24} />
              </button>
            </div>
          );
        })()}
      </div>

      {/* Admin Panel Button - Only visible for admins */}
      {isAdmin && (
        <>
          <div className="w-10 h-[2px] bg-discord-chat rounded-lg mx-auto mt-auto" />
          <button
            onClick={() => setShowAdminPanel(true)}
            className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-[28px] hover:rounded-[18px] transition-all duration-200 flex items-center justify-center"
            title="Panel de Administración"
          >
            <Shield size={28} />
          </button>
        </>
      )}

      {/* Admin Panel Modal */}
      {isAdmin && (
        <AdminPanel
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          currentUser={currentUser}
          socket={socket}
        />
      )}

      {/* Impostor is displayed as a full page in App when selected */}
    </div>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
