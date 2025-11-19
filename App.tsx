import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

// Componentes básicos, puedes adaptar la importación
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import LockScreen from './components/LockScreen';
import ErrorBoundary from './components/ErrorBoundary';

import { User, AppView, Message } from './types';

// Bot siempre presente
const BOT_USER: User = {
  id: 'bot',
  username: 'UPG Bot',
  avatar: '/upg.png',
  status: 'online',
  isBot: true,
  color: '#5865F2'
};

export interface ChannelData {
  id: string;
  name: string;
  description: string;
}

// Usar variable de entorno o fallback
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://mensajeria-ksc7.onrender.com';

let socket: Socket | null = null;

function generateRandomUser(): User {
  const randomId = Math.floor(Math.random() * 10000).toString();
  const avatars = [
    'https://picsum.photos/id/1012/200/200',
    'https://picsum.photos/id/1025/200/200',
    'https://picsum.photos/id/177/200/200',
    'https://picsum.photos/id/237/200/200',
    'https://picsum.photos/id/1062/200/200'
  ];
  return {
    id: `user-${randomId}`,
    username: `Guest${randomId}`,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    status: 'online',
    color: '#3ba55c'
  };
}

function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // UI & Channels
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({ id: 'general', name: 'general', description: 'Chat general' });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('upg_current_user');
    return saved ? JSON.parse(saved) : generateRandomUser();
  });

  // Estado de usuarios conectados
  const [discoveredUsers, setDiscoveredUsers] = useState<User[]>([]);
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});
  const [activeVoiceChannel, setActiveVoiceChannel] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mensajes por canal
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isConnected, setIsConnected] = useState(false);

  // Check Authentication
  useEffect(() => {
    const auth = localStorage.getItem('upg_access_token');
    if (auth === 'granted') setIsAuthenticated(true);
    setIsLoadingAuth(false);
  }, []);
  const handleUnlock = () => {
    localStorage.setItem('upg_access_token', 'granted');
    setIsAuthenticated(true);
  };

  // Socket.IO Connection
  useEffect(() => {
    if (!isAuthenticated) return;

    socket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    socket.on('connect', () => {
      console.log('🔌 Conectado a Socket.IO');
      setIsConnected(true);

      // Registrar usuario
      socket?.emit('user:join', currentUser);

      // Unirse a canal actual
      socket?.emit('channel:join', { channelId: currentChannel.id, userId: currentUser.id });
    });

    socket.on('disconnect', () => {
      console.log('⛔ Desconectado de Socket.IO');
      setIsConnected(false);
    });

    socket.on('users:update', (users: User[]) => {
      setDiscoveredUsers(users.filter(u => u.id !== currentUser.id));
    });

    socket.on('channel:history', ({ channelId, messages: history }) => {
      setMessages(prev => ({
        ...prev,
        [channelId]: history
      }));
    });

    socket.on('message:received', (message: Message) => {
      setMessages(prev => ({
        ...prev,
        [message.channelId]: [...(prev[message.channelId] || []), message]
      }));
    });

    // Voice event example
    socket.on('voice:update', ({ userId, channelName, action }) => {
      setVoiceStates(prev => {
        const next = { ...prev };
        if (action === 'join' && channelName) {
          next[userId] = channelName;
        } else {
          delete next[userId];
        }
        return next;
      });
    });

    socket.on('user:disconnect', ({ userId }) => {
      setDiscoveredUsers(prev => prev.filter(u => u.id !== userId));
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [isAuthenticated, currentUser, currentChannel.id]);

  // Voice Channel Updates
  useEffect(() => {
    if (!isAuthenticated || !socket) return;

    if (activeVoiceChannel) {
      socket.emit('voice:join', { channelName: activeVoiceChannel, userId: currentUser.id });
    } else {
      socket.emit('voice:leave', { channelName: activeVoiceChannel, userId: currentUser.id });
    }

    setVoiceStates(prev => {
      const next = { ...prev };
      if (activeVoiceChannel) next[currentUser.id] = activeVoiceChannel;
      else delete next[currentUser.id];
      return next;
    });
  }, [activeVoiceChannel, currentUser.id, isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('upg_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const allUsers = useMemo(() => {
    const map = new Map<string, User>();
    map.set(BOT_USER.id, BOT_USER);
    discoveredUsers.forEach(u => map.set(u.id, u));
    map.set(currentUser.id, currentUser);
    return Array.from(map.values());
  }, [discoveredUsers, currentUser]);

  const handleChannelSelect = useCallback((view: AppView, channel?: ChannelData) => {
    setActiveView(view);
    if (channel) {
      setCurrentChannel(channel);

      if (socket && isConnected) {
        socket.emit('channel:join', { channelId: channel.id, userId: currentUser.id });
      }
    }
    setMobileMenuOpen(false);
  }, [isConnected, currentUser.id]);

  const handleVoiceJoin = useCallback((channelName: string) => {
    if (activeVoiceChannel === channelName) setActiveVoiceChannel(null);
    else setActiveVoiceChannel(channelName);
  }, [activeVoiceChannel]);

  const handleSendMessage = (content: string) => {
    if (!socket || !isConnected) {
      console.error('Socket no conectado');
      return;
    }

    socket.emit('message:send', {
      channelId: currentChannel.id,
      content,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      timestamp: new Date().toISOString()
    });
  };

  if (isLoadingAuth) return null;
  if (!isAuthenticated) return <LockScreen onUnlock={handleUnlock} />;

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative">
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <div className={`fixed inset-y-0 left-0 z-50 flex h-full transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar currentUser={currentUser} setCurrentUser={setCurrentUser} isConnected={isConnected} />
          <ChannelList 
            activeView={activeView} 
            currentChannelId={currentChannel.id}
            onChannelSelect={handleChannelSelect}
            currentUser={currentUser}
            activeVoiceChannel={activeVoiceChannel}
            onVoiceJoin={handleVoiceJoin}
            voiceStates={voiceStates}
            users={allUsers}
          />
        </div>
        <div className="flex flex-1 min-w-0 relative">
          {activeView === AppView.CHAT && (
            <>
              <ChatInterface
                currentUser={currentUser}
                users={allUsers}
                currentChannel={currentChannel}
                onSendMessage={handleSendMessage}
                messages={messages[currentChannel.id] || []}
                onMenuToggle={() => setMobileMenuOpen(true)}
              />
              <UserList users={allUsers} currentUserId={currentUser.id} />
            </>
          )}
          {activeView === AppView.WHO_WE_ARE && (
            <WhoWeAre onMenuToggle={() => setMobileMenuOpen(true)} />
          )}
          {activeView === AppView.VOTING && (
            <Voting onMenuToggle={() => setMobileMenuOpen(true)} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
