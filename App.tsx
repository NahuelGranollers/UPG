import React, { useState, useCallback, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import { UserProvider, useUsers } from './context/UserContext';
import { useChat } from './hooks/useChat';
import { AppView, ChannelData, User, UserRole } from './types';
import useVoice from './hooks/useVoice';

// Componentes críticos (carga inmediata)
import ErrorBoundary from './components/ErrorBoundary';
import MobileSidebar from './components/MobileSidebar';
import MobileTabBar from './components/MobileTabBar';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import UsernamePrompt from './components/UsernamePrompt';
import UserProfileModal from './components/UserProfileModal';

const HomeScreen = React.lazy(() => import('./components/HomeScreen'));
const ImpostorGame = React.lazy(() => import('./components/ImpostorGame'));
const Impostor = React.lazy(() => import('./components/Impostor'));
const WhoWeAre = React.lazy(() => import('./components/WhoWeAre'));
const Voting = React.lazy(() => import('./components/Voting'));
const UPGNews = React.lazy(() => import('./components/UPGNews'));
const HallOfFame = React.lazy(() => import('./components/HallOfFame'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));
const Layout = React.lazy(() => import('./components/Layout'));
const ChatPage = React.lazy(() => import('./components/ChatPage'));

function Home() {
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { currentUser, isLoading, loginWithDiscord, loginAsGuest, logout } = useAuth();
  const { isConnected, socket } = useSocket();
  const { activeEffect } = useUsers();

  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [showHome, setShowHome] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({
    id: 'general',
    name: 'general',
    description: 'Chat general',
  });
  const [activeSection, setActiveSection] = useState<
    'home' | 'chat' | 'who' | 'voting' | 'upg' | 'impostor' | 'news' | 'hall_of_fame'
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
    if (touchState.current.startX < 80 && dx > 60) {
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
          navigate('/chat');
          break;
        case 'impostor':
          navigate('/impostor');
          break;
        case 'who':
          navigate('/quienes-somos');
          break;
        case 'voting':
          navigate('/votaciones');
          break;
        case 'news':
          navigate('/noticias');
          break;
        case 'hall_of_fame':
          navigate('/salon-fama');
          break;
      }
      if (setMobileTab) setMobileActiveTab('chat');
    }
  }, [navigate]);

  const handleHomeClick = useCallback(() => {
    setShowHome(true);
    setActiveSection('home');
  }, []);

  const handleUPGClick = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  const handleJoinServer = useCallback((gameType: string, roomId: string, password?: string) => {
    setAutoJoinRoomId(roomId);
    setAutoJoinPassword(password);
    navigate('/impostor');
  }, [navigate]);

  const handleCreateServer = useCallback((gameType: string) => {
    setAutoJoinRoomId(undefined);
    setAutoJoinPassword(undefined);
    navigate('/impostor');
  }, [navigate]);

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

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Cargando...
      </div>
    );

  // Si no hay usuario (caso raro tras isLoading), mostrar loading o error
  if (!currentUser)
    return (
      <UsernamePrompt
        onSubmit={loginAsGuest}
        onLoginWithDiscord={loginWithDiscord}
      />
    );

  return (
    <Suspense
      fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}
    >
      {showHome ? (
        <HomeScreen
          onGoToChat={() => {
            navigate('/chat');
          }}
          onGoToWhoWeAre={() => {
            setShowHome(false);
            setActiveView(AppView.WHO_WE_ARE);
            setActiveSection('who');
          }}
          onJoinServer={handleJoinServer}
          onCreateServer={handleCreateServer}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />
      ) : activeView === AppView.IMPOSTOR ? (
        <ImpostorGame
          onClose={() => {
            setShowHome(true);
            setActiveView(AppView.CHAT);
            setActiveSection('home');
            setAutoJoinRoomId(undefined);
            setAutoJoinPassword(undefined);
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
            activeVoiceChannel={voice.inChannel}
            micActive={!voice.isMuted}
            voiceLevel={voice.voiceLevel}
            onVoiceJoin={handleVoiceJoin}
            onLoginWithDiscord={loginWithDiscord}
            onLogoutDiscord={logout}
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
      ) : activeView === AppView.WHO_WE_ARE ? (
        <WhoWeAre />
      ) : activeView === AppView.VOTING ? (
        <Voting />
      ) : activeView === AppView.NEWS ? (
        <UPGNews />
      ) : activeView === AppView.HALL_OF_FAME ? (
        <HallOfFame />
      ) : null}
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="home" onActiveSectionChange={(section) => {
                        // Handle navigation from sidebar in home page
                        if (section === 'chat') {
                          window.location.href = '/chat';
                        } else if (section === 'impostor') {
                          window.location.href = '/impostor';
                        } else if (section === 'who') {
                          // Stay on home page but show "who we are" content
                          // This will be handled by the Home component's internal state
                        } else if (section === 'voting') {
                          window.location.href = '/votaciones';
                        } else if (section === 'news') {
                          window.location.href = '/noticias';
                        } else if (section === 'hall_of_fame') {
                          window.location.href = '/salon-fama';
                        }
                      }}>
                        <Home />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/chat" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="chat">
                        <ChatPage />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/impostor" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="impostor">
                        <Impostor />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/quienes-somos" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="who">
                        <WhoWeAre />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/votaciones" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="voting">
                        <Voting />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/noticias" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="news">
                        <UPGNews />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
          <Route path="/salon-fama" element={
            <ErrorBoundary>
              <AuthProvider>
                <SocketProvider>
                  <UserProvider>
                    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-discord-bg text-white">Cargando...</div>}>
                      <Layout activeSection="hall_of_fame">
                        <HallOfFame />
                      </Layout>
                    </Suspense>
                    <Toaster position="top-right" theme="dark" richColors />
                  </UserProvider>
                </SocketProvider>
              </AuthProvider>
            </ErrorBoundary>
          } />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
