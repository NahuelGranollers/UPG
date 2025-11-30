import React, { useState, useCallback, Suspense } from 'react';
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
const WhoWeAre = React.lazy(() => import('./components/WhoWeAre'));
const Voting = React.lazy(() => import('./components/Voting'));
const UPGNews = React.lazy(() => import('./components/UPGNews'));
const HallOfFame = React.lazy(() => import('./components/HallOfFame'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));

function MainApp() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { currentUser, isLoading, loginWithDiscord, loginAsGuest, logout } = useAuth();
  const { isConnected, socket } = useSocket();
  const { activeEffect } = useUsers();

  const [activeView, setActiveView] = useState<AppView>(AppView.IMPOSTOR);
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
    setActiveView(AppView.IMPOSTOR);
    setActiveSection('impostor');
  }, []);

  const handleCreateServer = useCallback((gameType: string) => {
    setAutoJoinRoomId(undefined);
    setAutoJoinPassword(undefined);
    setShowHome(false);
    setActiveView(AppView.IMPOSTOR);
    setActiveSection('impostor');
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
    <div
      className="flex h-[100dvh] w-full bg-discord-bg font-sans antialiased overflow-hidden relative text-white"
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
          onOpenAdmin={() => setShowAdminPanel(true)}
          onEditProfile={() => setShowProfileModal(true)}
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
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden h-full w-full flex-col relative overflow-hidden">
        {/* Centralized Menu Button (only when sidebar is closed) */}
        {!mobileSidebarOpen && (
          <button
            className="md:hidden fixed top-3 left-3 p-3 liquid-glass rounded-full shadow-lg z-[100] text-discord-text-normal hover:text-white"
            style={{
              paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))',
              paddingLeft: 'max(0.75rem, env(safe-area-inset-left, 0px))',
              minWidth: 48,
              minHeight: 48,
            }}
            aria-label="Abrir menú"
            onClick={() => setMobileSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        )}
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
          <div className={`flex-1 w-full overflow-hidden relative ${activeView === AppView.CHAT ? 'pb-16' : ''}`}>
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
                activeVoiceChannel={voice.inChannel}
                micActive={!voice.isMuted}
                voiceLevel={voice.voiceLevel}
                onVoiceJoin={handleVoiceJoin}
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
                    currentChannel={currentChannel}
                    onSendMessage={sendMessage}
                    messages={messages}
                    setMessages={setMessages}
                    onMenuToggle={() => setMobileActiveTab('channels')}
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
                  <WhoWeAre />
                )}
                {activeView === AppView.VOTING && (
                  <Voting />
                )}
                {activeView === AppView.NEWS && <UPGNews />}
                {activeView === AppView.HALL_OF_FAME && <HallOfFame />}
              </>
            )}

            {mobileActiveTab === 'users' && (
              <UserList
                currentUserId={currentUser.id}
                currentUser={currentUser}
                isMobileView
              />
            )}
          </div>
        )}

        {/* Mobile Tab Bar - Only in Chat View */}
        {!showHome && activeView === AppView.CHAT && (
          <MobileTabBar
            activeTab={mobileActiveTab}
            onTabChange={setMobileActiveTab}
            unreadCount={0} // TODO: Implement unread count
          />
        )}

        {/* Mobile Sidebar available in all views */}
        <MobileSidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
          onNavigate={navigateToSection}
          currentUser={currentUser}
          activeSection={activeSection}
        />
      </div>

      {/* Admin Panel Modal */}
      {currentUser?.role === UserRole.ADMIN && (
        <Suspense fallback={null}>
          <AdminPanel
            isOpen={showAdminPanel}
            onClose={() => setShowAdminPanel(false)}
            currentUser={currentUser}
            socket={socket}
          />
        </Suspense>
      )}

      {/* User Profile Modal (centered, overlays whole page) */}
      {showProfileModal && console.log('Rendering UserProfileModal')}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={currentUser}
        onLoginWithDiscord={loginWithDiscord}
      />

      {/* Effects Overlay */}
      {activeEffect === 'jumpscare' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <img 
            src="/scare.gif" 
            alt="scare" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {activeEffect === 'confetti' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random()}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <UserProvider>
            <MainApp />
            <Toaster position="top-right" theme="dark" richColors />
          </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
