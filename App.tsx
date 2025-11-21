import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// Componentes b├ísicos, puedes adaptar la importaci├│n
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import LockScreen from './components/LockScreen';
import DiscordLogin from './components/DiscordLogin';
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



function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Siempre autenticado como invitado
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isDiscordUser, setIsDiscordUser] = useState(false); // Track if logged in with Discord
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Checking Discord auth

  // UI & Channels
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({ 
    id: 'general', 
    name: 'general', 
    description: 'Chat general' 
  });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    // Check if coming from Discord callback
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');
    
    // If coming from Discord, wait for auth check
    if (authStatus === 'success') {
      console.log('🔐 [Init] Coming from Discord callback, showing loading state');
      // Temporary placeholder, will be updated in useEffect
      return {
        id: 'temp',
        username: 'Loading...',
        avatar: '',
        status: 'online' as const,
        online: true,
        color: '#808080',
        isGuest: true
      };
    }
    
    const saved = storage.loadUserData();
    // Verificar si hay usuario Discord guardado válido (no invitado)
    if (saved && saved.id && !saved.username.startsWith('Invitado') && !saved.id.startsWith('guest-')) {
      console.log('✅ [Init] Using cached Discord user from localStorage:', saved.username);
      // Usuario de Discord guardado
      return { ...saved, online: true, status: 'online' };
    }
    
    // Usuario invitado por defecto solo si no hay nada útil
    console.log('👤 [Init] No valid user found, creating guest');
    const randomId = Math.floor(Math.random() * 10000).toString();
    const guestUser = {
      id: `guest-${randomId}`,
      username: `Invitado${randomId}`,
      avatar: `https://ui-avatars.com/api/?name=I${randomId.charAt(0)}&background=gray&color=fff&size=200`,
      status: 'online' as const,
      online: true,
      color: '#808080',
      isGuest: true
    };
    storage.saveUserData(guestUser);
    return guestUser;
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

  // Usar producci├│n por defecto, localhost solo en desarrollo
  const API_URL = import.meta.env.DEV 
    ? 'http://localhost:3000'
    : 'https://mensajeria-ksc7.onrender.com';

  // Check Discord Authentication
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔐 checkAuth running. URL:', window.location.href);
      console.log('🔐 checkAuth start - currentUser in storage:', storage.loadUserData());
      
      try {
        // Verificar si viene del callback de Discord
        const urlParams = new URLSearchParams(window.location.search);
        const authStatus = urlParams.get('auth');
        const errorCode = urlParams.get('error_code');
        const errorDescription = urlParams.get('error_description');
        
        // Handle OAuth errors from backend
        if (authStatus === 'error') {
          console.error('ÔØî Discord OAuth error:', errorCode, errorDescription);
          alert(`Error de autenticaci├│n: ${decodeURIComponent(errorDescription || 'Error desconocido')}`);
          window.history.replaceState({}, document.title, '/');
          return;
        }
        
        if (authStatus === 'success') {
          console.log('✅ Received Discord OAuth callback, fetching user from backend...');
          window.history.replaceState({}, document.title, '/');
          
          console.log('🔄 Fetching /auth/user with credentials from', API_URL);
          // Consultar al backend por el usuario de Discord
          const response = await fetch(`${API_URL}/auth/user`, {
            credentials: 'include',
            headers: { 'Accept': 'application/json' }
          });

          console.log('🔁 /auth/user response status:', response.status);

          if (response.ok) {
            const discordUser = await response.json();
            console.log('Ô£à Discord user session found:', discordUser);
            
            // Crear User desde Discord
            const newUser: User = {
              id: discordUser.id,
              username: discordUser.username,
              avatar: discordUser.avatar 
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                : `https://ui-avatars.com/api/?name=${discordUser.username.charAt(0)}&background=5865F2&color=fff&size=200`,
              status: 'online',
              online: true,
              color: '#5865F2',
              isGuest: false
            };

            setCurrentUser(newUser);
            storage.saveUserData(newUser);
            setIsDiscordUser(true);
            setIsAuthenticated(true);
            console.log('✅ Logged in as Discord user', newUser.username);
            
            // Forzar reconexión del socket con el nuevo usuario
            if (socketRef.current) {
              socketRef.current.disconnect();
              socketRef.current.connect();
            }
            return;
          } else {
            console.warn(`⚠️ Failed to fetch Discord user: ${response.status} ${response.statusText}`);
            
            // Intentar usar usuario Discord guardado antes de crear invitado
            const savedUser = storage.loadUserData();
            if (savedUser && savedUser.id && !savedUser.username.startsWith('Invitado') && !savedUser.id.startsWith('guest-')) {
              console.log('✅ Using cached Discord user after auth failure:', savedUser.username);
              setCurrentUser(savedUser);
              setIsDiscordUser(true);
              return;
            }
            
            console.warn('⚠️ Session might not persist across domains. Falling back to guest mode.');
            
            // Solo crear invitado si no hay nada válido guardado
            const randomId = Math.floor(Math.random() * 10000).toString();
            const guestUser: User = {
              id: `guest-${randomId}`,
              username: `Invitado${randomId}`,
              avatar: `https://ui-avatars.com/api/?name=I${randomId.charAt(0)}&background=gray&color=fff&size=200`,
              status: 'online',
              online: true,
              color: '#808080',
              isGuest: true
            };
            console.log('👤 Using guest user', guestUser.username);
            setCurrentUser(guestUser);
            storage.saveUserData(guestUser);
            setIsDiscordUser(false);
          }
        }
        
        // Verificar si hay usuario de Discord guardado localmente
        const savedUser = storage.loadUserData();
        if (savedUser && savedUser.id && !savedUser.username.startsWith('Invitado') && !savedUser.id.startsWith('guest-')) {
          console.log('✅ Using cached Discord user', savedUser.username);
          setCurrentUser(savedUser);
          setIsDiscordUser(true);
          
          // Si tiene usuario guardado, reconectar el socket
          if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current.connect();
          }
        } else {
          console.log('­ƒæñ Entrando como invitado');
          setIsDiscordUser(false);
        }
      } catch (error) {
        console.error('❌ Error in checkAuth:', error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  const handleUnlock = useCallback(() => {
    storage.setAuthentication(true);
  }, []);

  // Socket.IO Connection - ACTUALIZADO CON GESTI├ôN DE USUARIOS
  useEffect(() => {
    if (!isAuthenticated || !currentUser) return;

    // Si el socket ya existe (creado en autenticaci├│n), reutilizarlo
    // Si no, crearlo ahora
    let socket = socketRef.current;
    if (!socket) {
      socket = io(SOCKET_URL, SOCKET_CONFIG);
      socketRef.current = socket;
      (window as any).socketInstance = socket;
    }

    // Remover todos los listeners anteriores para evitar duplicados
    socket.removeAllListeners();

    // Ô£à Conexi├│n establecida
    socket.on('connect', () => {
      console.log('­ƒöî Conectado a Socket.IO - ID:', socket.id);
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

    // Ô£à Desconexi├│n
    socket.on('disconnect', () => {
      console.log('Ôøö Desconectado de Socket.IO');
      setIsConnected(false);
    });

    // Ô£à Reconexi├│n exitosa
    socket.on('reconnect', (attemptNumber) => {
      console.log(`Ô£à Reconectado despu├®s de ${attemptNumber} intentos`);
      socket.emit('user:join', {
        ...currentUser,
        socketId: socket.id
      });
      socket.emit('users:request');
    });

    // Ô£à Lista completa de usuarios (primera carga)
    socket.on('users:list', (users: User[]) => {
      console.log('­ƒæÑ Lista de usuarios recibida:', users);
      if (currentUser) {
        setDiscoveredUsers(users.filter(u => u.id !== currentUser.id));
      }
    });

    // Ô£à Actualizaci├│n broadcast de usuarios
    socket.on('users:update', (users: User[]) => {
      console.log('­ƒöä Usuarios actualizados:', users.length);
      if (currentUser) {
        setDiscoveredUsers(users.filter(u => u.id !== currentUser.id));
      }
    });

    // Ô£à Usuario se conect├│ (cambiar a online)
    socket.on('user:online', (user: User) => {
      console.log('Ô£à Usuario online:', user.username);
      if (currentUser && user.id !== currentUser.id) {
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

    // Ô£à Usuario se desconect├│ (cambiar a offline, no eliminar)
    socket.on('user:offline', ({ userId, username }: { userId: string; username: string }) => {
      console.log('ÔÜ½ Usuario offline:', username);
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

    // Actualizaci├│n de canales de voz
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

    // Ô£à Eventos de administrador
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

    socket.on('user:kicked', ({ userId, username }: { userId: string; username: string }) => {
      console.log(`👢 Usuario ${username} ha sido expulsado`);
      setDiscoveredUsers(prev => prev.filter(u => u.id !== userId));
    });

    socket.on('banned', ({ reason }: { reason: string }) => {
      alert(`Has sido baneado del servidor.\nRaz├│n: ${reason}`);
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
      // Con Discord OAuth, esto no deber├¡a pasar ya que los IDs son ├║nicos
      window.location.reload();
    });

    // Admin events
    socket.on('admin:action-success', ({ action, message }: { action: string; message: string }) => {
      console.log(`Ô£à Admin action ${action}: ${message}`);
      alert(`Ô£à ${message}`);
    });

    socket.on('admin:notification', ({ message }: { message: string }) => {
      console.log(`­ƒôó Admin notification: ${message}`);
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
      alert('Ô£à Backup descargado correctamente');
    });

    socket.on('server:restarting', ({ message }: { message: string }) => {
      console.log(`­ƒöä ${message}`);
      alert(message);
    });

    // ✅ Usuario registrado confirmado por servidor (puede incluir datos recuperados)
    socket.on('user:registered', (userData: User) => {
      console.log('✅ Registro confirmado por servidor:', userData);
      
      // 🔐 PROTECCIÓN: Si ya estamos autenticados con Discord, NO aceptar cambio de usuario desde el servidor
      // Solo actualizar el rol, pero mantener identidad Discord
      if (isDiscordUser && currentUser && !currentUser.isGuest) {
        console.log('🔒 Usuario Discord protegido, solo actualizando rol:', userData.role);
        setCurrentUser(prev => ({
          ...prev,
          role: userData.role,
          color: userData.role === UserRole.ADMIN ? '#ff4d0a' : '#3ba55c'
        }));
        // Guardar con identidad Discord pero rol actualizado
        storage.saveUserData({
          ...currentUser,
          role: userData.role
        });
        return;
      }
      
      // Si es invitado, permitir actualización completa
      setCurrentUser(prev => ({
        ...prev,
        ...userData,
        color: userData.role === UserRole.ADMIN ? '#ff4d0a' : '#3ba55c'
      }));
      storage.saveUserData(userData);
    });

    // Ô£à Actualizaci├│n de rol desde servidor
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
      
      console.log(`­ƒøí´©Å Rol actualizado: ${role}`);
    });

    // Error de conexi├│n
    socket.on('connect_error', (error) => {
      console.error('ÔØî Error de conexi├│n:', error.message);
    });

    // Ô£à Heartbeat system - Responder a pings del servidor
    socket.on('heartbeat:ping', () => {
      socket.emit('heartbeat:pong');
    });

    // Rate limit exceeded notification
    socket.on('rate-limit-exceeded', ({ message }: { message: string }) => {
      console.warn('ÔÜá´©Å Rate limit:', message);
      // Podr├¡as mostrar un toast aqu├¡
    });

    // Message error notification
    socket.on('message-error', ({ message }: { message: string }) => {
      console.error('ÔØî Error mensaje:', message);
      // Podr├¡as mostrar un toast aqu├¡
    });

    // Cleanup: solo remover listeners, NO desconectar el socket si se va a reutilizar
    return () => {
      socket.removeAllListeners();
      // Solo desconectar si el componente se desmonta completamente
      if (!isAuthenticated || !currentUser) {
        socket.disconnect();
        socketRef.current = null;
        console.log('­ƒöî Socket desconectado y limpiado');
      }
    };
  }, [isAuthenticated, currentUser, currentChannel.id]);

  // Ô£à Solicitar lista de usuarios peri├│dicamente (fallback de sincronizaci├│n)
  useEffect(() => {
    if (!isConnected || !socketRef.current) return;

    const interval = setInterval(() => {
      socketRef.current?.emit('users:request');
      console.log('­ƒöä Solicitando actualizaci├│n de usuarios...');
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
  }, [activeVoiceChannel, currentUser, isAuthenticated]);

  // Persistir usuario actual usando servicio de storage
  useEffect(() => {
    if (currentUser) {
      storage.saveUserData(currentUser);
    }
  }, [currentUser]);

  // Memoizar lista de todos los usuarios
  const allUsers = useMemo(() => {
    const map = new Map<string, User>();
    map.set(BOT_USER.id, BOT_USER);
    discoveredUsers.forEach(u => map.set(u.id, u));
    if (currentUser) {
      map.set(currentUser.id, currentUser);
    }
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
      if (socketRef.current && isConnected && currentUser) {
        socketRef.current.emit('channel:join', { 
          channelId: channel.id, 
          userId: currentUser.id 
        });
      }
    }
    setMobileMenuOpen(false);
  }, [isConnected, currentUser, currentChannel.id]);

  const handleVoiceJoin = useCallback((channelName: string) => {
    setActiveVoiceChannel(prev => prev === channelName ? null : channelName);
  }, []);

  const handleSendMessage = useCallback((content: string) => {
    if (!socketRef.current || !isConnected || !currentUser) {
      console.error('ÔØî Socket no conectado o usuario no disponible');
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

  const handleLoginWithDiscord = useCallback(() => {
    // Redirigir a la ruta de Discord OAuth del backend
    window.location.href = `${API_URL}/auth/discord`;
  }, [API_URL]);

  const handleLogoutDiscord = useCallback(async () => {
    if (!confirm('¿Estás seguro de que quieres desconectar tu cuenta de Discord? Volverás a ser un usuario invitado.')) {
      return;
    }

    try {
      // Llamar al endpoint de logout del backend
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      // Limpiar datos locales
      storage.clearUserData();
      
      // Recargar la página para crear un nuevo usuario invitado
      window.location.reload();
    } catch (error) {
      console.error('Error al desconectar Discord:', error);
      alert('Error al desconectar. Por favor, intenta de nuevo.');
    }
  }, [API_URL]);

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

  // Primero verificar LockScreen
  const hasPassedLock = storage.isAuthenticated();
  
  // Si no pasó el LockScreen, mostrarlo primero
  if (!hasPassedLock) return <LockScreen onUnlock={handleUnlock} />;
  
  // Si está verificando autenticación de Discord, mostrar loading
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full bg-discord-dark items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-discord-blurple border-t-transparent rounded-full animate-spin"></div>
          <p className="text-discord-text-muted">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

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
            onLoginWithDiscord={handleLoginWithDiscord}
            onLogoutDiscord={handleLogoutDiscord}
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
                <UserList 
                  users={allUsers} 
                  currentUserId={currentUser.id}
                />
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
        <div className="flex md:hidden h-full w-full flex-col relative overflow-hidden" style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom))' }}>
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
                onLoginWithDiscord={handleLoginWithDiscord}
                onLogoutDiscord={handleLogoutDiscord}
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
              <UserList 
                users={allUsers} 
                currentUserId={currentUser.id} 
                isMobileView={true}
              />
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
