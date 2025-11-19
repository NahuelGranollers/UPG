import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import LockScreen from './components/LockScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { User, AppView } from './types';

// Bot siempre presente
const BOT_USER: User = {
  id: 'bot',
  username: 'UPG Bot',
  avatar: '/upg.png',
  status: 'online',
  isBot: true,
  color: '#5865F2'
};

import { getOrCreateUser } from './utils/userGenerator';
import { initFirebase, setUserOnline, subscribeToOnlineUsers, isFirebaseConfigured } from './services/firebaseService';
import { getDiscordUsers, discordUserToAppUser, DISCORD_USER_IDS } from './services/discordService';

export interface ChannelData {
  id: string;
  name: string;
  description: string;
}

function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [currentChannel, setCurrentChannel] = useState<ChannelData>({ 
    id: 'general', 
    name: 'general', 
    description: 'Chat general de UPG' 
  });
  
  const [currentUser, setCurrentUser] = useState<User>(() => {
     return getOrCreateUser();
  });

  // State for Discord users
  const [discordUsers, setDiscordUsers] = useState<User[]>([]);
  
  // State for online users from Firebase
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  
  // Map of UserId -> ChannelName
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});

  // Active Voice Channel State (Local)
  const [activeVoiceChannel, setActiveVoiceChannel] = useState<string | null>(null);

  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check Authentication on Mount
  useEffect(() => {
    const auth = localStorage.getItem('upg_access_token');
    if (auth === 'granted') {
      setIsAuthenticated(true);
    }
    setIsLoadingAuth(false);
  }, []);

  const handleUnlock = () => {
    localStorage.setItem('upg_access_token', 'granted');
    setIsAuthenticated(true);
  };

  // Load Discord users on mount
  useEffect(() => {
    const loadDiscordUsers = async () => {
      try {
        const users = await getDiscordUsers();
        const appUsers = users.map((user) => {
          // El status ya viene de la configuración o del usuario de Discord
          return discordUserToAppUser(user);
        });
        setDiscordUsers(appUsers);
      } catch (error) {
        console.error('Error cargando usuarios de Discord:', error);
        // Si falla, usar usuarios por defecto basados en los IDs
        const fallbackUsers: User[] = DISCORD_USER_IDS.map((id, index) => {
          const statuses: ('online' | 'idle' | 'dnd' | 'offline')[] = ['online', 'idle', 'dnd', 'online', 'online', 'online', 'offline'];
          const colors = ['#3ba55c', '#5865F2', '#faa61a', '#ed4245', '#eb459e', '#57f287', '#fee75c'];
          return {
            id,
            username: `Usuario${index + 1}`,
            avatar: `https://cdn.discordapp.com/embed/avatars/${index % 5}.png`,
            status: statuses[index] || 'online',
            color: colors[index % colors.length],
          };
        });
        setDiscordUsers(fallbackUsers);
      }
    };

    if (isAuthenticated) {
      loadDiscordUsers();
    }
  }, [isAuthenticated]);

  // Merge Discord users, Bot, Online users from Firebase, and Self
  const allUsers = useMemo(() => {
      const map = new Map<string, User>();
      // Add Bot (siempre presente)
      map.set(BOT_USER.id, BOT_USER);
      // Add Discord users
      discordUsers.forEach(u => map.set(u.id, u));
      // Add Online users from Firebase
      onlineUsers.forEach(u => map.set(u.id, u));
      // Add Self (ensure latest status)
      map.set(currentUser.id, currentUser);
      
      return Array.from(map.values());
  }, [discordUsers, onlineUsers, currentUser]);

  // Initialize Firebase and set user online
  useEffect(() => {
    if (!isAuthenticated) return;

    // Inicializar Firebase
    const firebase = initFirebase();
    if (!firebase) {
      console.warn('Firebase no configurado. El chat en tiempo real no funcionará.');
      return;
    }

    // Marcar usuario como online
    const disconnectUser = setUserOnline(currentUser);

    // Suscribirse a usuarios online
    const unsubscribeUsers = subscribeToOnlineUsers((users) => {
      setOnlineUsers(users);
    });

    return () => {
      disconnectUser();
      unsubscribeUsers();
    };
  }, [currentUser, isAuthenticated]);

  // ------------------------------------------------------------
  // Voice Channel Synchronization (BroadcastChannel para sincronizar entre pestañas)
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isAuthenticated) return;

    // Channel for synchronizing voice state between tabs
    const bc = new BroadcastChannel('upg_voice_sync_v1');

    const handleMessage = (e: MessageEvent) => {
        const data = e.data;
        
        // Handle Voice Updates between tabs
        if (data.type === 'VOICE_UPDATE') {
            setVoiceStates(prev => {
                const next = { ...prev };
                if (data.channelName) {
                    next[data.userId] = data.channelName;
                } else {
                    delete next[data.userId];
                }
                return next;
            });
        }
    };

    bc.addEventListener('message', handleMessage);

    return () => {
        bc.removeEventListener('message', handleMessage);
        bc.close();
    };
  }, [isAuthenticated]); 

  // ------------------------------------------------------------
  // Broadcast Local Voice State Changes
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isAuthenticated) return;

    const bc = new BroadcastChannel('upg_global_sync_v1');
    
    // Broadcast change
    bc.postMessage({
        type: 'VOICE_UPDATE',
        userId: currentUser.id,
        channelName: activeVoiceChannel
    });

    // Update local map for immediate UI feedback
    setVoiceStates(prev => {
        const next = { ...prev };
        if (activeVoiceChannel) next[currentUser.id] = activeVoiceChannel;
        else delete next[currentUser.id];
        return next;
    });

    return () => bc.close();
  }, [activeVoiceChannel, currentUser.id, isAuthenticated]);


  useEffect(() => {
    localStorage.setItem('upg_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const handleChannelSelect = useCallback((view: AppView, channel?: ChannelData) => {
    setActiveView(view);
    if (channel) {
      setCurrentChannel(channel);
    }
    setMobileMenuOpen(false);
  }, []);

  const handleVoiceJoin = useCallback((channelName: string) => {
      if (activeVoiceChannel === channelName) {
          setActiveVoiceChannel(null); // Leave
      } else {
          setActiveVoiceChannel(channelName); // Join
      }
  }, [activeVoiceChannel]);

  if (isLoadingAuth) return null;

  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full bg-discord-dark font-sans antialiased overflow-hidden relative">
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 flex h-full transition-transform duration-300 md:relative md:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
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

      {/* Main Content */}
      <div className="flex flex-1 min-w-0 relative">
        {activeView === AppView.CHAT && (
           <>
            <ChatInterface 
              currentUser={currentUser} 
              users={allUsers} 
              currentChannel={currentChannel}
              onMobileMenuClick={() => setMobileMenuOpen(true)}
            />
            <UserList users={allUsers} />
           </>
        )}

        {activeView === AppView.WHO_WE_ARE && (
            <div className="flex-1 flex flex-col h-full relative">
                 <div className="md:hidden h-12 bg-discord-chat flex items-center px-4 border-b border-gray-900/20 shrink-0 text-white">
                    <button onClick={() => setMobileMenuOpen(true)} className="mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    <span className="font-bold">Quiénes Somos</span>
                 </div>
                 <WhoWeAre />
            </div>
        )}

        {activeView === AppView.VOTING && (
            <div className="flex-1 flex flex-col h-full relative">
                <div className="md:hidden h-12 bg-discord-chat flex items-center px-4 border-b border-gray-900/20 shrink-0 text-white">
                    <button onClick={() => setMobileMenuOpen(true)} className="mr-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                     <span className="font-bold">Votaciones</span>
                 </div>
                <Voting />
            </div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}

export default App;