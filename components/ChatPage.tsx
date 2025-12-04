import React, { useState, useCallback, useEffect, memo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { AppView, ChannelData } from '../types';
import useVoice from '../hooks/useVoice';

// Componentes críticos (carga inmediata)
import ChannelList from './ChannelList';
import ChatInterface from './ChatInterface';
import UserList from './UserList';
import MobileTabBar from './MobileTabBar';

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { isConnected, socket } = useSocket();

  const [activeView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({
    id: 'general',
    name: 'general',
    description: 'Chat general',
  });

  // Estado para móvil
  const [isMobile, setIsMobile] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'channels' | 'chat' | 'users'>('chat');

  const voice = useVoice();

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(prev => prev !== mobile ? mobile : prev); // Only update if changed
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleVoiceJoin = useCallback(
    async (channelId: string) => {
      try {
        await voice.joinChannel(channelId);
      } catch (err) {
        console.error('Failed to join voice channel', err);
      }
    },
    [voice]
  );

  const handleVoiceLeave = useCallback(async () => {
    try {
      if ((voice as any).closeAll) (voice as any).closeAll();
    } catch (e) {
      console.error('Failed to leave voice channel', e);
    }
  }, [voice]);

  const handleToggleMute = useCallback(() => {
    try {
      if ((voice as any).toggleMute) (voice as any).toggleMute();
    } catch (e) {
      console.error('Failed to toggle mute', e);
    }
  }, [voice]);

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        <div className="text-center">
          <p className="mb-4">Debes iniciar sesión para acceder al chat</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-discord-blurple text-white rounded hover:bg-discord-blurple/80"
          >
            Ir al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      {/* Desktop Layout */}
      {!isMobile ? (
        <>
          <ChannelList
            activeView={activeView}
            currentChannelId={currentChannel.id}
            onChannelSelect={(view, channel) => {
              if (view && channel) {
                setCurrentChannel(channel);
              } else if (channel) {
                setCurrentChannel(channel);
              }
            }}
            currentUser={currentUser}
            activeVoiceChannel={voice.inChannel}
            micActive={!voice.isMuted}
            voiceLevel={voice.voiceLevel}
            onVoiceJoin={handleVoiceJoin}
            onLoginWithDiscord={() => {}}
            onLogoutDiscord={() => {}}
            onToggleMic={handleToggleMute}
            onVoiceLeave={handleVoiceLeave}
          />
          <ChatInterface
            currentUser={currentUser}
            currentChannel={currentChannel}
            onMenuToggle={() => {}}
          />
          <UserList
            currentUserId={currentUser.id}
            currentUser={currentUser}
          />
        </>
      ) : (
        /* Mobile Layout */
        <div className="flex flex-col w-full h-full">
          {activeMobileTab === 'channels' && (
            <ChannelList
              activeView={activeView}
              currentChannelId={currentChannel.id}
              onChannelSelect={(view, channel) => {
                if (view && channel) {
                  setCurrentChannel(channel);
                } else if (channel) {
                  setCurrentChannel(channel);
                }
                setActiveMobileTab('chat'); // Switch to chat after selecting
              }}
              currentUser={currentUser}
              activeVoiceChannel={voice.inChannel}
              micActive={!voice.isMuted}
              voiceLevel={voice.voiceLevel}
              onVoiceJoin={handleVoiceJoin}
              onLoginWithDiscord={() => {}}
              onLogoutDiscord={() => {}}
              onToggleMic={handleToggleMute}
              onVoiceLeave={handleVoiceLeave}
            />
          )}
          {activeMobileTab === 'chat' && (
            <ChatInterface
              currentUser={currentUser}
              currentChannel={currentChannel}
              onMenuToggle={() => setActiveMobileTab('channels')}
              isMobile={true}
            />
          )}
          {activeMobileTab === 'users' && (
            <UserList
              currentUserId={currentUser.id}
              currentUser={currentUser}
              isMobileView={true}
            />
          )}
          <MobileTabBar
            activeTab={activeMobileTab}
            onTabChange={setActiveMobileTab}
          />
        </div>
      )}
    </div>
  );
};

export default memo(ChatPage);