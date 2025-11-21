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
import MobileTabBar from './components/MobileTabBar';

import { User, AppView, Message, UserRole } from './types';
import * as storage from './utils/storageService';
import { useSwipe } from './hooks/useSwipe';

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
  'https://ui-avatars.com/api/?name=A&background=5865F2&color=fff&size=200',
  'https://ui-avatars.com/api/?name=B&background=57F287&color=fff&size=200',
  'https://ui-avatars.com/api/?name=C&background=FEE75C&color=000&size=200',
  'https://ui-avatars.com/api/?name=D&background=EB459E&color=fff&size=200',
  'https://ui-avatars.com/api/?name=E&background=ED4245&color=fff&size=200'
] as const;

function generateRandomUser(): User {
  const randomId = Math.floor(Math.random() * 10000).toString();
  return {
    id: `user-${randomId}`,
    username: `Guest${randomId}`,
    avatar: AVATARS[Math.floor(Math.random() * AVATARS.length)],
    status: 'online',
    online: true,
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
      const username = decodeURIComponent(cookies.upg_username);
      const role = (cookies.upg_role as UserRole) || UserRole.USER;
      const isAdmin = role === UserRole.ADMIN;
      
      return {
        id: cookies.upg_user_id || `user-${Date.now()}`,
        username,
        avatar: decodeURIComponent(cookies.upg_avatar),
        status: 'online',
        online: true,
        color: isAdmin ? '#ff4d0a' : '#3ba55c', // Color basado en rol guardado
        role
      };
    }

    // Fallback a localStorage
    const saved = localStorage.getItem('upg_current_user');
    if (saved) {
      const user = JSON.parse(saved);
      return { ...user, online: true, status: 'online' };
    }
    
    // Si no hay nada, retornar null y mostrar setup
    return generateRandomUser();
  });

  // Estado de usuarios conectados
  const [discoveredUsers, setDiscoveredUsers] = useState<User[]>([]);
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});
  const [activeVoiceChannel, setActiveVoiceChannel] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile tabs state
  const [mobileActiveTab, setMobileActiveTab] = useState<'channels' | 'chat' | 'users'>('chat');

  // Mensajes por canal
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [isConnected, setIsConnected] = useState(false);

  // useRef para mantener referencia estable del socket
  const socketRef = useRef<Socket | null>(null);

  // Check Authentication y crear socket temprano
  useEffect(() => {
    if (storage.isAuthenticated()) {
      setIsAuthenticated(true);
      
      // Crear socket inmediatamente después de autenticar
      // Esto permite verificar username antes de completar el setup
      if (!socketRef.current) {
        const socket = io(SOCKET_URL, SOCKET_CONFIG);
        socketRef.current = socket;
        (window as any).socketInstance = socket;
        
        socket.on('connect', () => {
          console.log('🔌 Socket pre-conectado para verificación - ID:', socket.id);
        });
      }
    }
    setIsLoadingAuth(false);
  }, []);

  const handleUnlock = useCallback(() => {
    storage.setAuthentication(true);
    setIsAuthenticated(true);
    
    // Siempre verificar si hay datos de usuario válidos
    const userData = storage.loadUserData();
    
    // Si no hay datos o el usuario tiene un nombre temporal (Guest), mostrar setup
    if (!userData || userData.username.startsWith('Guest')) {
      setShowUserSetup(true);
    }
  }, []);

  const handleUserSetupComplete = useCallback((username: string, avatar: string) => {
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    const newUser: User = {
      id: userId,
      username,
      avatar,
      status: 'online',
      color: '#3ba55c',
      role: UserRole.USER // El servidor actualizará el rol según IP
    };
    
    // Usar servicio de storage centralizado
    storage.saveUserData(newUser);
    setCurrentUser(newUser);
    setShowUserSetup(false);
  }, []);

  // Socket.IO Connection - ACTUALIZADO CON GESTIÓN DE USUARIOS
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Si el usuario actual es un Guest (generado automáticamente), mostrar UserSetup
    if (currentUser.username.startsWith('Guest')) {
      setShowUserSetup(true);
      return;
    }
    
    if (!currentUser) return;

    // Si el socket ya existe (creado en autenticación), reutilizarlo
    // Si no, crearlo ahora
    let socket = socketRef.current;
    if (!socket) {
      socket = io(SOCKET_URL, SOCKET_CONFIG);
      socketRef.current = socket;
      (window as any).socketInstance = socket;
    }

    // Remover todos los listeners anteriores para evitar duplicados
    socket.removeAllListeners();

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

    // ✅ Usuario se conectó (cambiar a online)
    socket.on('user:online', (user: User) => {
      console.log('✅ Usuario online:', user.username);
      if (user.id !== currentUser.id) {
        setDiscoveredUsers(prev => {
          const index = prev.findIndex(u => u.id === user.id);
          if (index !== -1) {
            // Usuario existe, actualizar estado a online
            const updated = [...prev];
            updated[index] = { ...updated[index], online: true, status: 'online' };
            return updated;
          } else {
            // Usuario nuevo, agregarlo
            return [...prev, { ...user, online: true, status: 'online' }];
          }
        });
      }
    });

    // ✅ Usuario se desconectó (cambiar a offline, no eliminar)
    socket.on('user:offline', ({ userId, username }: { userId: string; username: string }) => {
      console.log('⚫ Usuario offline:', username);
      setDiscoveredUsers(prev => {
        const index = prev.findIndex(u => u.id === userId);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], online: false, status: 'offline' };
          return updated;
        }
        return prev;
      });
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

    // ✅ Eventos de administrador
    socket.on('message:deleted', ({ messageId, channelId }: { messageId: string; channelId: string }) => {
      setMessages(prev => ({
        ...prev,
        [channelId]: (prev[channelId] || []).filter(msg => msg.id !== messageId)
      }));
    });

    socket.on('channel:cleared', ({ channelId }: { channelId: string }) => {
      setMessages(prev => ({
        ...prev,
        [channelId]: []
      }));
    });

    socket.on('user:banned', ({ userId, username }: { userId: string; username: string }) => {
      console.log(`🔨 Usuario ${username} ha sido baneado`);
      setDiscoveredUsers(prev => prev.filter(u => u.id !== userId));
    });

    socket.on('banned', ({ reason }: { reason: string }) => {
      alert(`Has sido baneado del servidor.\nRazón: ${reason}`);
      storage.clearUserData();
      window.location.reload();
    });

    socket.on('kicked', ({ reason }: { reason: string }) => {
      alert(`${reason}`);
      window.location.reload();
    });

    socket.on('username:taken', ({ message }: { message: string }) => {
      alert(message);
      storage.clearUserData();
      setShowUserSetup(true);
    });

    // Admin events
    socket.on('admin:action-success', ({ action, message }: { action: string; message: string }) => {
      console.log(`✅ Admin action ${action}: ${message}`);
      alert(`✅ ${message}`);
    });

    socket.on('admin:notification', ({ message }: { message: string }) => {
      console.log(`📢 Admin notification: ${message}`);
    });

    socket.on('admin:export-data-result', ({ data }: { data: any }) => {
      // Create download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `upg-server-backup-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('✅ Backup descargado correctamente');
    });

    socket.on('server:restarting', ({ message }: { message: string }) => {
      console.log(`🔄 ${message}`);
      alert(message);
    });

    // ✅ Usuario registrado confirmado por servidor (puede incluir datos recuperados)
    socket.on('user:registered', (userData: User) => {
      console.log('✅ Registro confirmado por servidor:', userData);
      // Actualizar usuario con datos del servidor (incluye rol, etc.)
      setCurrentUser(prev => ({
        ...prev,
        ...userData,
        color: userData.role === UserRole.ADMIN ? '#ff4d0a' : '#3ba55c'
      }));
      storage.saveUserData(userData);
    });

    // ✅ Actualización de rol desde servidor
    socket.on('role:updated', ({ role }: { role: UserRole }) => {
      setCurrentUser(prev => {
        const isAdmin = role === UserRole.ADMIN;
        const updated = {
          ...prev,
          role,
          color: isAdmin ? '#ff4d0a' : '#3ba55c'
        };
        
        // Actualizar usando servicio de storage
        storage.updateUserRole(role);
        storage.saveUserData(updated);
        
        return updated;
      });
      
      console.log(`🛡️ Rol actualizado: ${role}`);
    });

    // Error de conexión
    socket.on('connect_error', (error) => {
      console.error('❌ Error de conexión:', error.message);
    });

    // ✅ Heartbeat system - Responder a pings del servidor
    socket.on('heartbeat:ping', () => {
      socket.emit('heartbeat:pong');
    });

    // Rate limit exceeded notification
    socket.on('rate-limit-exceeded', ({ message }: { message: string }) => {
      console.warn('⚠️ Rate limit:', message);
      // Podrías mostrar un toast aquí
    });

    // Message error notification
    socket.on('message-error', ({ message }: { message: string }) => {
      console.error('❌ Error mensaje:', message);
      // Podrías mostrar un toast aquí
    });

    // Cleanup: solo remover listeners, NO desconectar el socket si se va a reutilizar
    return () => {
      socket.removeAllListeners();
      // Solo desconectar si el componente se desmonta completamente
      if (!isAuthenticated || !currentUser) {
        socket.disconnect();
        socketRef.current = null;
        console.log('🔌 Socket desconectado y limpiado');
      }
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

  // Persistir usuario actual usando servicio de storage
  useEffect(() => {
    storage.saveUserData(currentUser);
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

  const handleMobileTabChange = useCallback((tab: 'channels' | 'chat' | 'users') => {
    setMobileActiveTab(tab);
  }, []);

  // Swipe gestures for mobile
  useSwipe({
    onSwipeLeft: () => {
      if (window.innerWidth < 768) { // Only on mobile
        if (mobileActiveTab === 'channels') setMobileActiveTab('chat');
        else if (mobileActiveTab === 'chat') setMobileActiveTab('users');
      }
    },
    onSwipeRight: () => {
      if (window.innerWidth < 768) { // Only on mobile
        if (mobileActiveTab === 'users') setMobileActiveTab('chat');
        else if (mobileActiveTab === 'chat') setMobileActiveTab('channels');
      }
    }
  });

  if (isLoadingAuth) return null;
  if (!isAuthenticated) return <LockScreen onUnlock={handleUnlock} />;
  if (showUserSetup) return <UserSetup onComplete={handleUserSetupComplete} />;

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-full w-full">
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

        {/* Mobile Layout */}
        <div className="flex md:hidden h-full w-full flex-col pb-16 relative overflow-hidden">
          {/* Channels Tab */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-out pb-16 ${
              mobileActiveTab === 'channels' 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 -translate-x-full pointer-events-none'
            }`}
          >
            <div className="flex h-full w-full overflow-hidden">
              <Sidebar 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                isConnected={isConnected} 
              />
              <ChannelList 
                activeView={activeView} 
                currentChannelId={currentChannel.id}
                onChannelSelect={(view, channel) => {
                  handleChannelSelect(view, channel);
                  setMobileActiveTab('chat');
                }}
                currentUser={currentUser}
                activeVoiceChannel={activeVoiceChannel}
                onVoiceJoin={handleVoiceJoin}
                voiceStates={voiceStates}
                users={allUsers}
              />
            </div>
          </div>

          {/* Chat Tab */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-out pb-16 ${
              mobileActiveTab === 'chat' 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 translate-x-full pointer-events-none'
            }`}
          >
            <div className="flex flex-1 min-w-0 relative h-full">
              {activeView === AppView.CHAT && (
                <ChatInterface
                  currentUser={currentUser}
                  users={allUsers}
                  currentChannel={currentChannel}
                  onSendMessage={handleSendMessage}
                  messages={currentChannelMessages}
                  onMenuToggle={() => setMobileActiveTab('channels')}
                />
              )}
              {activeView === AppView.WHO_WE_ARE && (
                <WhoWeAre onMenuToggle={() => setMobileActiveTab('channels')} />
              )}
              {activeView === AppView.VOTING && (
                <Voting onMenuToggle={() => setMobileActiveTab('channels')} />
              )}
            </div>
          </div>

          {/* Users Tab */}
          <div 
            className={`absolute inset-0 transition-all duration-300 ease-out pb-16 ${
              mobileActiveTab === 'users' 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 translate-x-full pointer-events-none'
            }`}
          >
            <div className="h-full w-full overflow-hidden">
              <UserList users={allUsers} currentUserId={currentUser.id} isMobileView={true} />
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <MobileTabBar 
            activeTab={mobileActiveTab} 
            onTabChange={handleMobileTabChange}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
