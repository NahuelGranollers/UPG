import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Componentes básicos, puedes adaptar la importación
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import LockScreen from './components/LockScreen';
import UserSetup from './components/UserSetup';
import ErrorBoundary from './components/ErrorBoundary';

import { User, AppView, Message } from './types';

// Bot siempre presente
const BOT_USER: User = {
  id: 'bot',
  username: 'UPG',
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
const SOCKET_URL = (import.meta.env.VITE_SOCKET_URL as string | undefined) || 'https://mensajeria-ksc7.onrender.com';

const SOCKET_CONFIG = {
  transports: ['websocket', 'polling'] as ('websocket' | 'polling')[],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  timeout: 10000
};

const AVATARS = [
  'https://picsum.photos/id/1012/200/200',
  'https://picsum.photos/id/1025/200/200',
  'https://picsum.photos/id/177/200/200',
  'https://picsum.photos/id/237/200/200',
  'https://picsum.photos/id/1062/200/200'
] as const;

function generateRandomUser(): User {
  const randomId = Math.floor(Math.random() * 10000).toString();
  return {
    id: `user-${randomId}`,
    username: `Guest${randomId}`,
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    status: 'online',
    color: '#3ba55c'
  };
}

function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [showUserSetup, setShowUserSetup] = useState(false);

  // UI & Channels
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({ 
    id: 'general', 
    name: 'general', 
    description: 'Chat general' 
  });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    // Intentar leer desde cookies primero
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies.upg_username && cookies.upg_avatar) {
      return {
        id: cookies.upg_user_id || `user-${Date.now()}`,
        username: decodeURIComponent(cookies.upg_username),
        avatar: decodeURIComponent(cookies.upg_avatar),
        status: 'online',
        color: '#3ba55c'
      };
    }

    // Fallback a localStorage
    const saved = localStorage.getItem('upg_current_user');
    if (saved) return JSON.parse(saved);
    
    // Si no hay nada, retornar null y mostrar setup
    return generateRandomUser();
  });

  // Estado de usuarios conectados
  const [discoveredUsers, setDiscoveredUsers] = useState<User[]>([]);
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});
  const [activeVoiceChannel, setActiveVoiceChannel] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mensajes por canal
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isConnected, setIsConnected] = useState(false);

  // useRef para mantener referencia estable del socket
  const socketRef = useRef<Socket | null>(null);

  // Check Authentication
  useEffect(() => {
    const auth = localStorage.getItem('upg_access_token');
    if (auth === 'granted') setIsAuthenticated(true);
    setIsLoadingAuth(false);
  }, []);

  const handleUnlock = useCallback(() => {
    localStorage.setItem('upg_access_token', 'granted');
    setIsAuthenticated(true);
    
    // Verificar si el usuario ya tiene datos en cookies
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    // Si no hay username en cookies, mostrar setup
    if (!cookies.upg_username) {
      setShowUserSetup(true);
    }
  }, []);

  const handleUserSetupComplete = useCallback((username: string, avatar: string) => {
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Guardar en cookies (30 días de expiración)
    const expirationDays = 30;
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    
    document.cookie = `upg_user_id=${userId}; ${expires}; path=/`;
    document.cookie = `upg_username=${encodeURIComponent(username)}; ${expires}; path=/`;
    document.cookie = `upg_avatar=${encodeURIComponent(avatar)}; ${expires}; path=/`;
    
    // Actualizar estado del usuario
    const newUser: User = {
      id: userId,
      username,
      avatar,
      status: 'online',
      color: '#3ba55c'
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('upg_current_user', JSON.stringify(newUser));
    setShowUserSetup(false);
  }, []);

  // Socket.IO Connection - ACTUALIZADO CON GESTIÓN DE USUARIOS
  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io(SOCKET_URL, SOCKET_CONFIG);
    socketRef.current = socket;

    // ✅ Conexión establecida
    socket.on('connect', () => {
      console.log('🔌 Conectado a Socket.IO - ID:', socket.id);
      setIsConnected(true);

      // Registrar usuario inmediatamente
      socket.emit('user:join', {
        ...currentUser,
        socketId: socket.id
      });

      // Solicitar lista de usuarios conectados
      socket.emit('users:request');

      // Unirse a canal actual
      socket.emit('channel:join', { channelId: currentChannel.id, userId: currentUser.id });
    });

    // ✅ Desconexión
    socket.on('disconnect', () => {
      console.log('⛔ Desconectado de Socket.IO');
      setIsConnected(false);
    });

    // ✅ Reconexión exitosa
    socket.on('reconnect', (attemptNumber) => {
      console.log(`✅ Reconectado después de ${attemptNumber} intentos`);
      socket.emit('user:join', {
        ...currentUser,
        socketId: socket.id
      });
      socket.emit('users:request');
    });

    // ✅ Lista completa de usuarios (primera carga)
    socket.on('users:list', (users: User[]) => {
      console.log('📋 Lista de usuarios recibida:', users.length);
      setDiscoveredUsers(users.filter(u => u.id !== currentUser.id));
    });

    // ✅ Actualización broadcast de usuarios
    socket.on('users:update', (users: User[]) => {
      console.log('🔄 Usuarios actualizados:', users.length);
      setDiscoveredUsers(users.filter(u => u.id !== currentUser.id));
    });

    // ✅ Nuevo usuario se conectó
    socket.on('user:joined', (user: User) => {
      console.log('👋 Usuario conectado:', user.username);
      if (user.id !== currentUser.id) {
        setDiscoveredUsers(prev => {
          // Evitar duplicados
          if (prev.some(u => u.id === user.id)) return prev;
          return [...prev, user];
        });
      }
    });

    // ✅ Usuario se desconectó
    socket.on('user:left', ({ userId, username }: { userId: string; username: string }) => {
      console.log('👋 Usuario desconectado:', username);
      setDiscoveredUsers(prev => prev.filter(u => u.id !== userId));
    });

    // Historial de mensajes del canal
    socket.on('channel:history', ({ channelId, messages: history }: { channelId: string; messages: Message[] }) => {
      setMessages(prev => ({
        ...prev,
        [channelId]: history
      }));
    });

    // Nuevo mensaje recibido
    socket.on('message:received', (message: Message) => {
      setMessages(prev => ({
        ...prev,
        [message.channelId]: [...(prev[message.channelId] || []), message]
      }));
    });

    // Actualización de canales de voz
    socket.on('voice:update', ({ userId, channelName, action }: { userId: string; channelName?: string; action: string }) => {
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

    // Error de conexión
    socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión:', error.message);
    });

    // Cleanup
    return () => {
      socket.disconnect();
      socketRef.current = null;
      console.log('🔌 Socket desconectado y limpiado');
    };
  }, [isAuthenticated, currentUser, currentChannel.id]);

  // ✅ Solicitar lista de usuarios periódicamente (fallback de sincronización)
  useEffect(() => {
    if (!isConnected || !socketRef.current) return;

    const interval = setInterval(() => {
      socketRef.current?.emit('users:request');
      console.log('🔄 Solicitando actualización de usuarios...');
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [isConnected]);

  // Voice Channel Updates
  useEffect(() => {
    if (!isAuthenticated || !socketRef.current) return;

    if (activeVoiceChannel) {
      socketRef.current.emit('voice:join', { 
        channelName: activeVoiceChannel, 
        userId: currentUser.id 
      });
    } else {
      socketRef.current.emit('voice:leave', { 
        channelName: null, 
        userId: currentUser.id 
      });
    }

    setVoiceStates(prev => {
      const next = { ...prev };
      if (activeVoiceChannel) {
        next[currentUser.id] = activeVoiceChannel;
      } else {
        delete next[currentUser.id];
      }
      return next;
    });
  }, [activeVoiceChannel, currentUser.id, isAuthenticated]);

  // Persistir usuario actual en localStorage
  useEffect(() => {
    localStorage.setItem('upg_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Memoizar lista de todos los usuarios
  const allUsers = useMemo(() => {
    const map = new Map<string, User>();
    map.set(BOT_USER.id, BOT_USER);
    discoveredUsers.forEach(u => map.set(u.id, u));
    map.set(currentUser.id, currentUser);
    return Array.from(map.values());
  }, [discoveredUsers, currentUser]);

  // Memoizar mensajes del canal actual
  const currentChannelMessages = useMemo(
    () => messages[currentChannel.id] || [],
    [messages, currentChannel.id]
  );

  const handleChannelSelect = useCallback((view: AppView, channel?: ChannelData) => {
    setActiveView(view);
    if (channel && channel.id !== currentChannel.id) {
      setCurrentChannel(channel);
      if (socketRef.current && isConnected) {
        socketRef.current.emit('channel:join', { 
          channelId: channel.id, 
          userId: currentUser.id 
        });
      }
    }
    setMobileMenuOpen(false);
  }, [isConnected, currentUser.id, currentChannel.id]);

  const handleVoiceJoin = useCallback((channelName: string) => {
    setActiveVoiceChannel(prev => prev === channelName ? null : channelName);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!socketRef.current || !isConnected) {
      console.error('❌ Socket no conectado');
      return;
    }

    socketRef.current.emit('message:send', {
      channelId: currentChannel.id,
      content,
      userId: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar,
      timestamp: new Date().toISOString()
    });
  }, [isConnected, currentChannel.id, currentUser]);

  const handleMenuToggle = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  if (isLoadingAuth) return null;
  if (!isAuthenticated) return <LockScreen onUnlock={handleUnlock} />;
  if (showUserSetup) return <UserSetup onComplete={handleUserSetupComplete} />;

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative">
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={handleMenuClose}
            role="button"
            aria-label="Cerrar menú"
          />
        )}

        <div className={`fixed inset-y-0 left-0 z-50 flex h-full transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            isConnected={isConnected} 
          />
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
                messages={currentChannelMessages}
                onMenuToggle={handleMenuToggle}
              />
              <UserList users={allUsers} currentUserId={currentUser.id} />
            </>
          )}
          {activeView === AppView.WHO_WE_ARE && (
            <WhoWeAre onMenuToggle={handleMenuToggle} />
          )}
          {activeView === AppView.VOTING && (
            <Voting onMenuToggle={handleMenuToggle} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
