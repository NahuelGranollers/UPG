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

  // UI & Channels
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({ 
    id: 'general', 
    name: 'general', 
    description: 'Chat general' 
  });
  const [currentUser, setCurrentUser] = useState<User>(() => {
    console.log('🔍 [DEBUG] Inicializando currentUser...');
    const saved = storage.loadUserData();
    console.log('🔍 [DEBUG] Usuario guardado en localStorage:', saved);
    
    if (saved && saved.id && !saved.username.startsWith('Guest')) {
      // Usuario de Discord guardado
      console.log('✅ [DEBUG] Usuario Discord detectado en localStorage:', saved.username);
      return { ...saved, online: true, status: 'online' };
    }
    
    // Usuario invitado por defecto
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
    console.log('👤 [DEBUG] Usuario invitado creado:', guestUser);
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

  // Usar producción por defecto, localhost solo en desarrollo
  const API_URL = import.meta.env.DEV 
    ? 'http://localhost:3000'
    : 'https://mensajeria-ksc7.onrender.com';

  // Check Discord Authentication
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 [DEBUG] === INICIANDO checkAuth() ===');
      console.log('🔍 [DEBUG] URL actual:', window.location.href);
      console.log('🔍 [DEBUG] API_URL:', API_URL);
      
      try {
        // Verificar si viene del callback de Discord
        const urlParams = new URLSearchParams(window.location.search);
        const authStatus = urlParams.get('auth');
        const errorCode = urlParams.get('error_code');
        const errorDescription = urlParams.get('error_description');
        
        console.log('🔍 [DEBUG] URL Params:', { authStatus, errorCode, errorDescription });
        
        // Handle OAuth errors from backend
        if (authStatus === 'error') {
          console.error('❌ Discord OAuth error:', errorCode, errorDescription);
          alert(`Error de autenticación: ${decodeURIComponent(errorDescription || 'Error desconocido')}`);
          window.history.replaceState({}, document.title, '/');
          return;
        }
        
        if (authStatus === 'success') {
          console.log('✅ [DEBUG] Discord OAuth callback detectado');
          console.log('🔍 [DEBUG] Limpiando URL...');
          window.history.replaceState({}, document.title, '/');
          console.log('🔍 [DEBUG] URL limpiada:', window.location.href);
          
          // Consultar al backend por el usuario de Discord
          console.log('🔍 [DEBUG] Consultando backend en:', `${API_URL}/auth/user`);
          const response = await fetch(`${API_URL}/auth/user`, {
            credentials: 'include',
            headers: { 'Accept': 'application/json' }
          });
          
          console.log('🔍 [DEBUG] Response status:', response.status);
          console.log('🔍 [DEBUG] Response headers:', Object.fromEntries(response.headers.entries()));

          if (response.ok) {
            const discordUser = await response.json();
            console.log('✅ [DEBUG] Discord user session encontrada:', discordUser);
            
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
            
            console.log('👤 [DEBUG] Usuario Discord creado:', newUser);
            console.log('💾 [DEBUG] Guardando en localStorage...');
            
            setCurrentUser(newUser);
            storage.saveUserData(newUser);
            setIsDiscordUser(true);
            
            console.log('✅ [DEBUG] Usuario Discord autenticado completamente:', newUser.username);
            console.log('🔍 [DEBUG] Estado actualizado - isDiscordUser: true');
            return;
          } else {
            console.error('❌ [DEBUG] Response NO OK:', response.status, response.statusText);
            const errorText = await response.text();
            console.error('❌ [DEBUG] Response body:', errorText);
          }
        }
        
        // Verificar si hay usuario de Discord guardado localmente
        console.log('🔍 [DEBUG] Verificando usuario en localStorage...');
        const savedUser = storage.loadUserData();
        console.log('🔍 [DEBUG] Usuario en localStorage:', savedUser);
        
        if (savedUser && savedUser.id && !savedUser.username.startsWith('Invitado') && !savedUser.id.startsWith('guest-')) {
          console.log('📦 [DEBUG] Usuario Discord cacheado encontrado:', savedUser.username);
          console.log('🔍 [DEBUG] Verificaciones:', {
            hasId: !!savedUser.id,
            notStartsWithInvitado: !savedUser.username.startsWith('Invitado'),
            notStartsWithGuest: !savedUser.id.startsWith('guest-'),
            isGuest: savedUser.isGuest
          });
          setCurrentUser(savedUser);
          setIsDiscordUser(true);
          console.log('✅ [DEBUG] Usuario Discord restaurado desde caché');
        } else {
          console.log('👤 [DEBUG] No hay usuario Discord, entrando como invitado');
          console.log('🔍 [DEBUG] Razón:', {
            noSavedUser: !savedUser,
            noId: savedUser && !savedUser.id,
            startsWithInvitado: savedUser && savedUser.username.startsWith('Invitado'),
            startsWithGuest: savedUser && savedUser.id.startsWith('guest-')
          });
          setIsDiscordUser(false);
        }
      } catch (error) {
        console.error('❌ Error checking auth:', error);
      }
    };

    checkAuth();
  }, [API_URL]);

  const handleUnlock = useCallback(() => {
    storage.setAuthentication(true);
  }, []);

  // Socket.IO Connection - ACTUALIZADO CON GESTIÓN DE USUARIOS
  useEffect(() => {
    console.log('🔍 [DEBUG] === useEffect Socket.IO ejecutado ===');
    console.log('🔍 [DEBUG] isAuthenticated:', isAuthenticated);
    console.log('🔍 [DEBUG] currentUser:', currentUser);
    
    if (!isAuthenticated || !currentUser) {
      console.log('⚠️ [DEBUG] Socket.IO no se conectará - Falta autenticación o usuario');
      return;
    }
    
    console.log('🔌 [DEBUG] Iniciando conexión Socket.IO...');

    // Si el socket ya existe (creado en autenticación), reutilizarlo
    // Si no, crearlo ahora
    let socket = socketRef.current;
    if (!socket) {
      console.log('🔌 [DEBUG] Creando nueva instancia Socket.IO...');
      console.log('🔍 [DEBUG] SOCKET_URL:', SOCKET_URL);
      console.log('🔍 [DEBUG] SOCKET_CONFIG:', SOCKET_CONFIG);
      socket = io(SOCKET_URL, SOCKET_CONFIG);
      socketRef.current = socket;
      (window as any).socketInstance = socket;
      console.log('✅ [DEBUG] Socket.IO instancia creada');
    } else {
      console.log('♻️ [DEBUG] Reutilizando instancia Socket.IO existente');
    }

    // Remover todos los listeners anteriores para evitar duplicados
    socket.removeAllListeners();

    // ✅ Conexión establecida
    socket.on('connect', () => {
      console.log('🔌 [DEBUG] === SOCKET CONECTADO ===');
      console.log('🔍 [DEBUG] Socket ID:', socket.id);
      console.log('🔍 [DEBUG] Usuario actual:', currentUser);
      setIsConnected(true);

      // Registrar usuario inmediatamente
      const userJoinData = {
        ...currentUser,
        socketId: socket.id
      };
      console.log('📤 [DEBUG] Emitiendo user:join con:', userJoinData);
      socket.emit('user:join', userJoinData);

      // Solicitar lista de usuarios conectados
      console.log('📤 [DEBUG] Solicitando lista de usuarios (users:request)');
      socket.emit('users:request');

      // Unirse a canal actual
      console.log('📤 [DEBUG] Uniéndose a canal:', currentChannel.id);
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
      console.log('📥 [DEBUG] === users:list recibido ===');
      console.log('🔍 [DEBUG] Total usuarios:', users.length);
      console.log('🔍 [DEBUG] Usuarios:', users.map(u => ({ id: u.id, username: u.username, online: u.online })));
      if (currentUser) {
        const filtered = users.filter(u => u.id !== currentUser.id);
        console.log('🔍 [DEBUG] Usuarios filtrados (sin current):', filtered.length);
        setDiscoveredUsers(filtered);
      }
    });

    // ✅ Actualización broadcast de usuarios
    socket.on('users:update', (users: User[]) => {
      console.log('📥 [DEBUG] === users:update recibido ===');
      console.log('🔍 [DEBUG] Total usuarios:', users.length);
      console.log('🔍 [DEBUG] Usuarios:', users.map(u => ({ id: u.id, username: u.username, online: u.online })));
      if (currentUser) {
        const filtered = users.filter(u => u.id !== currentUser.id);
        console.log('🔍 [DEBUG] Usuarios filtrados (sin current):', filtered.length);
        setDiscoveredUsers(filtered);
      }
    });

    // ✅ Usuario se conectó (cambiar a online)
    socket.on('user:online', (user: User) => {
      console.log('✅ Usuario online:', user.username);
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
      // Con Discord OAuth, esto no debería pasar ya que los IDs son únicos
      window.location.reload();
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
      console.log('📥 [DEBUG] === user:registered recibido ===');
      console.log('🔍 [DEBUG] Datos del servidor:', userData);
      console.log('🔍 [DEBUG] Usuario previo:', currentUser);
      
      // Actualizar usuario con datos del servidor (incluye rol, etc.)
      const updatedUser = {
        ...currentUser,
        ...userData,
        color: userData.role === UserRole.ADMIN ? '#ff4d0a' : '#3ba55c'
      };
      
      console.log('🔍 [DEBUG] Usuario actualizado:', updatedUser);
      console.log('💾 [DEBUG] Guardando usuario actualizado...');
      
      setCurrentUser(updatedUser);
      storage.saveUserData(updatedUser);
      
      console.log('✅ [DEBUG] Usuario registrado y guardado');
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
      console.error('❌ Socket no conectado o usuario no disponible');
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
                <UserList 
                  users={allUsers} 
                  currentUserId={currentUser.id}
                  onLoginWithDiscord={handleLoginWithDiscord}
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
                onLoginWithDiscord={handleLoginWithDiscord}
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
