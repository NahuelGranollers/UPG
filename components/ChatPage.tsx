import React, { useState, useCallback, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
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

  // Hook de chat para el canal actual
  const { messages, setMessages, sendMessage } = useChat(currentChannel.id);

  const voice = useVoice();

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
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
        Debes iniciar sesión para acceder al chat
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      {/* Desktop Layout */}
      {!isMobile && (
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
            onSendMessage={sendMessage}
            messages={messages}
            setMessages={setMessages}
            onMenuToggle={() => {}}
          />
          <UserList
            currentUserId={currentUser.id}
            currentUser={currentUser}
          />
        </>
      )}

      {/* Mobile Layout */}
      {isMobile && (
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
              onSendMessage={sendMessage}
              messages={messages}
              setMessages={setMessages}
              onMenuToggle={() => setActiveMobileTab('channels')}
            />
          )}
          {activeMobileTab === 'users' && (
            <UserList
              currentUserId={currentUser.id}
              currentUser={currentUser}
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

export default ChatPage;