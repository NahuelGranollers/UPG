import React, { useState, useCallback, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import { useChat } from './hooks/useChat';
import { AppView, ChannelData, User } from './types';
import useVoice from './hooks/useVoice';

// Componentes críticos (carga inmediata)
import ErrorBoundary from './components/ErrorBoundary';
import MobileSidebar from './components/MobileSidebar';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
const HomeScreen = React.lazy(() => import('./components/HomeScreen'));
const ImpostorGame = React.lazy(() => import('./components/ImpostorGame'));
const WhoWeAre = React.lazy(() => import('./components/WhoWeAre'));
const Voting = React.lazy(() => import('./components/Voting'));
const UPGNews = React.lazy(() => import('./components/UPGNews'));
const HallOfFame = React.lazy(() => import('./components/HallOfFame'));
const CS16Game = React.lazy(() => import('./components/CS16Game'));

function MainApp() {
  const { currentUser, isLoading, loginWithDiscord, logout } = useAuth();
  const { isConnected, socket } = useSocket();

  const [activeView, setActiveView] = useState<AppView>(AppView.IMPOSTOR);
  const [showHome, setShowHome] = useState(true);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({
    id: 'general',
    name: 'general',
    description: 'Chat general',
  });
  const [activeSection, setActiveSection] = useState<
    'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame' | 'cs16'
  >('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'channels' | 'chat' | 'users' | 'news'>(
    'chat'
  );
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auto-join state
  const [autoJoinRoomId, setAutoJoinRoomId] = useState<string | undefined>(undefined);
  const [autoJoinPassword, setAutoJoinPassword] = useState<string | undefined>(undefined);

  const touchState = React.useRef({ startX: 0, startY: 0, started: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchState.current = { startX: t.clientX, startY: t.clientY, started: true };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.current.started) return;
    const t = e.touches[0];
    const dx = t.clientX - touchState.current.startX;
    const dy = Math.abs(t.clientY - touchState.current.startY);
    if (dy > 75) return; // ignore vertical drags
    if (touchState.current.startX < 30 && dx > 60) {
      setMobileSidebarOpen(true);
      touchState.current.started = false;
    }
    if (mobileSidebarOpen && dx < -40) {
      setMobileSidebarOpen(false);
      touchState.current.started = false;
    }
  };

  const handleTouchEnd = () => {
    touchState.current.started = false;
  };

  // Hook de chat para el canal actual
  const { messages, setMessages, sendMessage } = useChat(currentChannel.id);

  // Mock de usuarios (idealmente mover a un UsersContext o Hook)
  const [users, setUsers] = useState<User[]>([]);

  // Estado de voz
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});
  const activeVoiceChannel = currentUser ? voiceStates[currentUser.id] || null : null;

  // Estado de colores de usuario
  const [userColors, setUserColors] = useState<Record<string, string>>({});

  const voice = useVoice();

  // Función helper para navegación para reducir duplicación
  const navigateToSection = useCallback((section: string, setMobileTab = false) => {
    if (section === 'home') {
      setShowHome(true);
      setActiveSection('home');
    } else {
      setShowHome(false);
      switch (section) {
        case 'chat':
          setActiveView(AppView.CHAT);
          setActiveSection('chat');
          break;
        case 'impostor':
          setActiveView(AppView.IMPOSTOR);
          setActiveSection('impostor');
          break;
        case 'who':
          setActiveView(AppView.WHO_WE_ARE);
          setActiveSection('who');
          break;
        case 'voting':
          setActiveView(AppView.VOTING);
          setActiveSection('voting');
          break;
        case 'news':
          setActiveView(AppView.NEWS);
          setActiveSection('news');
          break;
        case 'hall_of_fame':
          setActiveView(AppView.HALL_OF_FAME);
          setActiveSection('hall_of_fame');
          break;
        case 'cs16':
          setActiveView(AppView.CS16);
          setActiveSection('cs16');
          break;
      }
      if (setMobileTab) setMobileActiveTab('chat');
    }
  }, []);

  const handleHomeClick = useCallback(() => {
    setShowHome(true);
    setActiveSection('home');
  }, []);

  const handleUPGClick = useCallback(() => {
    setShowHome(false);
    setActiveView(AppView.CHAT);
    setActiveSection('chat');
  }, []);

  const handleJoinServer = useCallback((gameType: string, roomId: string, password?: string) => {
    setAutoJoinRoomId(roomId);
    setAutoJoinPassword(password);
    setShowHome(false);
    if (gameType === 'cs16') {
      setActiveView(AppView.CS16);
      setActiveSection('cs16');
    } else {
      setActiveView(AppView.IMPOSTOR);
      setActiveSection('impostor');
    }
  }, []);

  const handleCreateServer = useCallback((gameType: string) => {
    setAutoJoinRoomId(undefined);
    setAutoJoinPassword(undefined);
    setShowHome(false);
    if (gameType === 'cs16') {
      setActiveView(AppView.CS16);
      setActiveSection('cs16');
    } else {
      setActiveView(AppView.IMPOSTOR);
      setActiveSection('impostor');
    }
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

  // Escuchar lista de usuarios globalmente (simplificado para este refactor)
  React.useEffect(() => {
    if (!socket) return;
    socket.on('users:list', list => {
      if (!Array.isArray(list)) {
        console.warn('Received invalid users list:', list);
        return;
      }
      setUsers(list);
      // Initialize user colors from list
      const mapping = (list || []).reduce(
        (acc, u) => {
          if (u && u.id && u.color) acc[u.id] = u.color;
          return acc;
        },
        {} as Record<string, string>
      );
      setUserColors(prev => ({ ...prev, ...mapping }));
    });
    socket.on('user:online', u =>
      setUsers(prev => {
        const exists = prev.find(x => x.id === u.id);
        if (exists)
          return prev.map(x => (x.id === u.id ? { ...u, online: true, status: 'online' } : x));
        return [...prev, u];
      })
    );
    // Handle profile updates (name/color)
    socket.on('user:updated', updated => {
      setUsers(prev => prev.map(u => (u.id === updated.id ? { ...u, ...updated } : u)));
      if (updated.color) setUserColors(prev => ({ ...prev, [updated.id]: updated.color }));
    });
    socket.on('user:color-changed', ({ userId, color }) => {
      setUserColors(prev => ({ ...prev, [userId]: color }));
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, color } : u)));
    });
    socket.on('user:profile-updated', updated => {
      setUsers(prev => prev.map(u => (u.id === updated.id ? { ...u, ...updated } : u)));
    });
    socket.on('user:offline', ({ userId }) =>
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, online: false, status: 'offline' } : u))
      )
    );

    // Escuchar cambios en canales de voz
    socket.on('voice:state', states => {
      setVoiceStates(states);
    });

    // Escuchar cambios de color de usuario (legacy/admin and user updates)
    socket.on('admin:user-color-changed', ({ userId, color }) => {
      setUserColors(prev => ({ ...prev, [userId]: color }));
    });

    // Solicitar usuarios iniciales
    socket.emit('users:request');

    return () => {
      socket.off('users:list');
      socket.off('user:online');
      socket.off('user:offline');
      socket.off('voice:state');
      socket.off('admin:user-color-changed');
    };
  }, [socket]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-[#313338] text-white">
        Cargando...
      </div>
    );

  // Si no hay usuario (caso raro tras isLoading), mostrar loading o error
  if (!currentUser)
    return (
      <div className="flex h-screen items-center justify-center bg-[#313338] text-white">
        Error de autenticación
      </div>
    );

  return (
    <div
      className="flex h-screen w-full bg-[#313338] font-sans antialiased overflow-hidden relative text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full h-full">
        {/* Sidebar (single instance, fixed left) */}
        <Sidebar
          currentUser={currentUser}
          setCurrentUser={() => {}}
          activeSection={activeSection}
          onNavigate={navigateToSection}
          onHomeClick={handleHomeClick}
          onUPGClick={handleUPGClick}
        />
        <div className="flex flex-1 min-w-0 relative">
          <Suspense
            fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}
          >
            {showHome ? (
              <HomeScreen
                onGoToChat={() => {
                  setShowHome(false);
                  setActiveView(AppView.CHAT);
                  setActiveSection('chat');
                }}
                onGoToWhoWeAre={() => {
                  setShowHome(false);
                  setActiveView(AppView.WHO_WE_ARE);
                  setActiveSection('who');
                }}
                onJoinServer={handleJoinServer}
                onCreateServer={handleCreateServer}
              />
            ) : activeView === AppView.IMPOSTOR ? (
              <ImpostorGame
                onClose={() => {
                  setShowHome(true);
                  setActiveView(AppView.CHAT);
                  setActiveSection('home');
                }}
                autoJoinRoomId={autoJoinRoomId}
                autoJoinPassword={autoJoinPassword}
              />
            ) : activeView === AppView.CHAT ? (
              <div className="flex w-full h-full">
                <ChannelList
                  activeView={activeView}
                  currentChannelId={currentChannel.id}
                  onChannelSelect={(view, channel) => {
                    if (view && channel) {
                      setActiveView(view);
                      setCurrentChannel(channel);
                    } else if (channel) {
                      setCurrentChannel(channel);
                    }
                  }}
                  currentUser={currentUser}
                  activeVoiceChannel={activeVoiceChannel}
                  onVoiceJoin={handleVoiceJoin}
                  voiceStates={voiceStates}
                  users={users}
                  onLoginWithDiscord={loginWithDiscord}
                  onLogoutDiscord={logout}
                  onToggleMic={handleToggleMute}
                  onVoiceLeave={handleVoiceLeave}
                />
                <ChatInterface
                  currentUser={currentUser}
                  users={users}
                  currentChannel={currentChannel}
                  onSendMessage={sendMessage}
                  messages={messages}
                  setMessages={setMessages}
                  onMenuToggle={() => {}}
                  userColors={userColors}
                />
                <UserList
                  users={users}
                  currentUserId={currentUser.id}
                  currentUser={currentUser}
                  userColors={userColors}
                />
              </div>
            ) : activeView === AppView.WHO_WE_ARE ? (
              <WhoWeAre />
            ) : activeView === AppView.VOTING ? (
              <Voting />
            ) : activeView === AppView.NEWS ? (
              <UPGNews />
            ) : activeView === AppView.HALL_OF_FAME ? (
              <HallOfFame />
            ) : activeView === AppView.CS16 ? (
              <CS16Game
                onClose={() => {
                  setShowHome(true);
                  setActiveView(AppView.CHAT);
                  setActiveSection('home');
                }}
                autoJoinRoomId={autoJoinRoomId}
                autoJoinPassword={autoJoinPassword}
              />
            ) : null}
          </Suspense>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden h-full w-full flex-col relative overflow-hidden">
        {showHome ? (
          <div className="flex h-full w-full">
            <HomeScreen
              onGoToChat={() => {
                setShowHome(false);
                setActiveView(AppView.CHAT);
                setActiveSection('chat');
              }}
              onGoToWhoWeAre={() => {
                setShowHome(false);
                setActiveView(AppView.WHO_WE_ARE);
                setActiveSection('who');
                setMobileActiveTab('chat');
              }}
              onJoinServer={handleJoinServer}
              onCreateServer={handleCreateServer}
            />
          </div>
        ) : (
          <>
            {mobileActiveTab === 'channels' && activeView === AppView.CHAT && (
              <ChannelList
                activeView={activeView}
                currentChannelId={currentChannel.id}
                onChannelSelect={(view, channel) => {
                  if (channel) {
                    setCurrentChannel(channel);
                  }
                  if (view) {
                    setActiveView(view);
                  }
                  setMobileActiveTab('chat');
                }}
                currentUser={currentUser}
                activeVoiceChannel={activeVoiceChannel}
                onVoiceJoin={handleVoiceJoin}
                voiceStates={voiceStates}
                users={users}
                onLoginWithDiscord={loginWithDiscord}
                onLogoutDiscord={logout}
                onToggleMic={handleToggleMute}
                onVoiceLeave={handleVoiceLeave}
              />
            )}

            {mobileActiveTab === 'chat' && (
              <>
                {activeView === AppView.CHAT && (
                  <ChatInterface
                    currentUser={currentUser}
                    users={users}
                    currentChannel={currentChannel}
                    onSendMessage={sendMessage}
                    messages={messages}
                    setMessages={setMessages}
                    onMenuToggle={() => setMobileActiveTab('channels')}
                    userColors={userColors}
                  />
                )}
                {activeView === AppView.IMPOSTOR && (
                  <ImpostorGame
                    onClose={() => {
                      setShowHome(true);
                      setActiveView(AppView.CHAT);
                      setActiveSection('home');
                    }}
                    autoJoinRoomId={autoJoinRoomId}
                    autoJoinPassword={autoJoinPassword}
                  />
                )}
                {activeView === AppView.WHO_WE_ARE && (
                  <WhoWeAre onMenuToggle={() => setMobileActiveTab('channels')} />
                )}
                {activeView === AppView.VOTING && (
                  <Voting onMenuToggle={() => setMobileActiveTab('channels')} />
                )}
                {activeView === AppView.NEWS && <UPGNews />}
                {activeView === AppView.HALL_OF_FAME && <HallOfFame />}
                {activeView === AppView.CS16 && (
                  <CS16Game
                    onClose={() => {
                      setShowHome(true);
                      setActiveView(AppView.CHAT);
                      setActiveSection('home');
                    }}
                    autoJoinRoomId={autoJoinRoomId}
                    autoJoinPassword={autoJoinPassword}
                  />
                )}
              </>
            )}

            {mobileActiveTab === 'users' && (
              <UserList
                users={users}
                currentUserId={currentUser.id}
                currentUser={currentUser}
                userColors={userColors}
                isMobileView
              />
            )}

            {/* Mobile bottom bar removed per request. Use swipe from left edge to open navigation. */}
            <MobileSidebar
              isOpen={mobileSidebarOpen}
              onClose={() => setMobileSidebarOpen(false)}
              onNavigate={navigateToSection}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <MainApp />
          <Toaster position="top-right" theme="dark" richColors />
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
