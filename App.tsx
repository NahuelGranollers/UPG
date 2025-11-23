import React, { useState, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import { useChat } from './hooks/useChat';
import { AppView, ChannelData, User } from './types';
import useVoice from './hooks/useVoice';

// Componentes críticos (carga inmediata)
import LockScreen from './components/LockScreen';
import ErrorBoundary from './components/ErrorBoundary';
import MobileTabBar from './components/MobileTabBar';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';

// Componentes no críticos (lazy loading)
const WhoWeAre = lazy(() => import('./components/WhoWeAre'));
const Voting = lazy(() => import('./components/Voting'));

function MainApp() {
  const { currentUser, isLoading, loginWithDiscord, logout } = useAuth();
  const { isConnected } = useSocket();

  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({
    id: 'general',
    name: 'general',
    description: 'Chat general',
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<'channels' | 'chat' | 'users'>('chat');

  const [isLocked, setIsLocked] = useState(() => !sessionStorage.getItem('app_unlocked'));

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

  const handleVoiceJoin = async (channelId: string) => {
    try {
      await voice.joinChannel(channelId);
    } catch (err) {
      console.error('Failed to join voice channel', err);
    }
  };
  const handleToggleMute = () => {
    try {
      if ((voice as any).toggleMute) (voice as any).toggleMute();
    } catch (e) {
      console.error('Failed to toggle mute', e);
    }
  };

  // Escuchar lista de usuarios globalmente (simplificado para este refactor)
  const { socket } = useSocket();
  React.useEffect(() => {
    if (!socket) return;
    socket.on('users:list', list => setUsers(list));
    socket.on('user:online', u =>
      setUsers(prev => {
        const exists = prev.find(x => x.id === u.id);
        if (exists)
          return prev.map(x => (x.id === u.id ? { ...u, online: true, status: 'online' } : x));
        return [...prev, u];
      })
    );
    socket.on('user:offline', ({ userId }) =>
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, online: false, status: 'offline' } : u))
      )
    );

    // Escuchar cambios en canales de voz
    socket.on('voice:state', states => {
      setVoiceStates(states);
      try {
        // Si estamos en un canal (intentamos unirnos), crear ofertas hacia los usuarios ya presentes
        if (voice && (voice as any).inChannel) {
          const myChannel = (voice as any).inChannel as string;
          const participants = Object.entries(states)
            .filter(([userId, ch]) => ch === myChannel)
            .map(([userId]) => userId);
          // Offer to existing participants (excluding self)
          (voice as any).offerToUsers(participants);
        }
      } catch (e) {
        console.error('Error while offering to users after voice:state', e);
      }
    });

    // Escuchar cambios de color de usuario
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

  // Mostrar LockScreen si está bloqueado, independientemente de la autenticación
  if (isLocked)
    return (
      <LockScreen
        onUnlock={() => {
          setIsLocked(false);
          sessionStorage.setItem('app_unlocked', 'true');
        }}
      />
    );

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
    <div className="flex h-screen w-full bg-[#313338] font-sans antialiased overflow-hidden relative text-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full w-full">
        <Sidebar
          currentUser={currentUser}
          setCurrentUser={() => {}} // Ya no se usa localmente
          isConnected={isConnected}
        />
        <ChannelList
          activeView={activeView}
          currentChannelId={currentChannel.id}
          onChannelSelect={(view, channel) => {
            setActiveView(view);
            if (channel) setCurrentChannel(channel);
          }}
          currentUser={currentUser}
          activeVoiceChannel={activeVoiceChannel}
          onVoiceJoin={handleVoiceJoin}
          voiceStates={voiceStates}
          onToggleMic={handleToggleMute}
          micActive={(voice as any).isMuted ? false : true}
          users={users}
          onLoginWithDiscord={loginWithDiscord}
          onLogoutDiscord={logout}
        />

        <div className="flex flex-1 min-w-0 relative">
          {activeView === AppView.CHAT && (
            <>
              <ChatInterface
                currentUser={currentUser}
                users={users}
                currentChannel={currentChannel}
                onSendMessage={sendMessage}
                messages={messages}
                setMessages={setMessages}
                onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                userColors={userColors}
              />
              <UserList users={users} currentUserId={currentUser.id} userColors={userColors} />
            </>
          )}
          {activeView === AppView.WHO_WE_ARE && <WhoWeAre onMenuToggle={() => {}} />}
          {activeView === AppView.VOTING && <Voting onMenuToggle={() => {}} />}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden h-full w-full flex-col relative overflow-hidden pb-16">
        {mobileActiveTab === 'channels' && (
          <div className="flex h-full w-full">
            <Sidebar
              currentUser={currentUser}
              setCurrentUser={() => {}}
              isConnected={isConnected}
            />
            <ChannelList
              activeView={activeView}
              currentChannelId={currentChannel.id}
              onChannelSelect={(view, channel) => {
                setActiveView(view);
                if (channel) setCurrentChannel(channel);
                setMobileActiveTab('chat');
              }}
              currentUser={currentUser}
              activeVoiceChannel={activeVoiceChannel}
              onVoiceJoin={handleVoiceJoin}
              voiceStates={voiceStates}
              users={users}
              onLoginWithDiscord={loginWithDiscord}
              onLogoutDiscord={logout}
            />
          </div>
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
            {activeView === AppView.WHO_WE_ARE && <WhoWeAre onMenuToggle={() => setMobileActiveTab('channels')} />}
            {activeView === AppView.VOTING && <Voting onMenuToggle={() => setMobileActiveTab('channels')} />}
          </>
        )}

        {mobileActiveTab === 'users' && <UserList users={users} currentUserId={currentUser.id} userColors={userColors} isMobileView />}

        <MobileTabBar
          activeTab={mobileActiveTab}
          onTabChange={setMobileActiveTab}
          unreadCount={0}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <Suspense fallback={null}>
            <MainApp />
            <Toaster position="top-right" theme="dark" richColors />
          </Suspense>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
