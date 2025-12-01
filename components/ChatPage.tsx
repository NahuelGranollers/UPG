import React, { useState, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { AppView, ChannelData } from '../types';
import useVoice from '../hooks/useVoice';

// Componentes críticos (carga inmediata)
import ChannelList from './ChannelList';
import ChatInterface from './ChatInterface';
import UserList from './UserList';

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { isConnected, socket } = useSocket();

  const [activeView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({
    id: 'general',
    name: 'general',
    description: 'Chat general',
  });

  // Hook de chat para el canal actual
  const { messages, setMessages, sendMessage } = useChat(currentChannel.id);

  const voice = useVoice();

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
    </div>
  );
};

export default ChatPage;