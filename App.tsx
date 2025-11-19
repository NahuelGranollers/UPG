import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import ChannelList from './components/ChannelList';
import ChatInterface from './components/ChatInterface';
import UserList from './components/UserList';
import WhoWeAre from './components/WhoWeAre';
import Voting from './components/Voting';
import LockScreen from './components/LockScreen';
import { User, AppView } from './types';

const MOCK_USERS: User[] = [
  { id: '1', username: 'AdminZero', avatar: 'https://picsum.photos/id/1005/200/200', status: 'dnd', color: '#ed4245' },
  { id: '2', username: 'GamerPro99', avatar: 'https://picsum.photos/id/1011/200/200', status: 'online', color: '#3ba55c' },
  { id: '3', username: 'LunaSky', avatar: 'https://picsum.photos/id/1027/200/200', status: 'idle', color: '#faa61a' },
  { id: 'bot', username: 'UPG Bot', avatar: 'public/upg.png', status: 'online', isBot: true, color: '#5865F2' },
  { id: '4', username: 'NoobMaster', avatar: 'https://picsum.photos/id/338/200/200', status: 'offline', color: '#949ba4' },
  { id: '5', username: 'ChillGuy', avatar: 'https://picsum.photos/id/669/200/200', status: 'online', color: '#3ba55c' },
];

// Generate a random user for this session if not exists
const generateRandomUser = (): User => {
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
};

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
     const saved = localStorage.getItem('upg_current_user');
     return saved ? JSON.parse(saved) : generateRandomUser();
  });

  // State for mock users + detected online users from other tabs
  const [discoveredUsers, setDiscoveredUsers] = useState<User[]>([]);
  
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

  // Merge Mock users with Discovered users
  const allUsers = useMemo(() => {
      const map = new Map<string, User>();
      // Add Mocks
      MOCK_USERS.forEach(u => map.set(u.id, u));
      // Add Discovered
      discoveredUsers.forEach(u => map.set(u.id, u));
      // Add Self (ensure latest status)
      map.set(currentUser.id, currentUser);
      
      return Array.from(map.values());
  }, [discoveredUsers, currentUser]);

  // ------------------------------------------------------------
  // Real-time Presence & Voice Synchronization
  // ------------------------------------------------------------
  useEffect(() => {
    if (!isAuthenticated) return;

    // Channel for synchronizing user presence and voice state
    const bc = new BroadcastChannel('upg_global_sync_v1');

    const handleMessage = (e: MessageEvent) => {
        const data = e.data;
        
        // 1. Handle User Presence (Hello/Welcome/Bye)
        if (data.type === 'PRESENCE') {
             const incomingUser = data.user as User;
             if (incomingUser.id === currentUser.id) return; // Ignore self

             if (data.subtype === 'HELLO') {
                 // A new tab opened. Add them.
                 setDiscoveredUsers(prev => {
                     if (prev.find(u => u.id === incomingUser.id)) return prev;
                     return [...prev, incomingUser];
                 });
                 // Respond to say "I am here too"
                 bc.postMessage({ type: 'PRESENCE', subtype: 'WELCOME', user: currentUser });
                 
                 // Also tell them where I am if I'm in voice
                 if (activeVoiceChannel) {
                     bc.postMessage({ type: 'VOICE_UPDATE', userId: currentUser.id, channelName: activeVoiceChannel });
                 }
             } 
             else if (data.subtype === 'WELCOME') {
                 // Existing tab responded. Add them.
                 setDiscoveredUsers(prev => {
                     if (prev.find(u => u.id === incomingUser.id)) return prev;
                     return [...prev, incomingUser];
                 });
             }
             else if (data.subtype === 'BYE') {
                 // Tab closed. Remove them.
                 setDiscoveredUsers(prev => prev.filter(u => u.id !== incomingUser.id));
                 setVoiceStates(prev => {
                     const next = { ...prev };
                     delete next[incomingUser.id];
                     return next;
                 });
             }
        }

        // 2. Handle Voice Updates
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
    
    // Announce I am online
    bc.postMessage({ type: 'PRESENCE', subtype: 'HELLO', user: currentUser });

    const handleUnload = () => {
        bc.postMessage({ type: 'PRESENCE', subtype: 'BYE', user: currentUser });
    };
    window.addEventListener('beforeunload', handleUnload);

    return () => {
        bc.removeEventListener('message', handleMessage);
        window.removeEventListener('beforeunload', handleUnload);
        bc.close();
    };
  }, [currentUser, isAuthenticated, activeVoiceChannel]); 

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

  const handleChannelSelect = (view: AppView, channel?: ChannelData) => {
    setActiveView(view);
    if (channel) {
      setCurrentChannel(channel);
    }
    setMobileMenuOpen(false);
  };

  const handleVoiceJoin = (channelName: string) => {
      if (activeVoiceChannel === channelName) {
          setActiveVoiceChannel(null); // Leave
      } else {
          setActiveVoiceChannel(channelName); // Join
      }
  };

  if (isLoadingAuth) return null;

  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
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
  );
}

export default App;