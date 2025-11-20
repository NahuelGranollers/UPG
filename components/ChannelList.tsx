import React from 'react';
import { Hash, Volume2, ChevronDown, Vote, Users, Mic, HeadphoneOff, Settings } from 'lucide-react';
import { AppView, User } from '../types';
import { ChannelData } from '../App';
import SafeImage from './SafeImage';

interface ChannelListProps {
  activeView: AppView;
  currentChannelId: string;
  onChannelSelect: (view: AppView, channel?: ChannelData) => void;
  currentUser: User;
  activeVoiceChannel: string | null;
  onVoiceJoin: (channelName: string) => void;
  voiceStates: Record<string, string>;
  users: User[];
}

const ChannelList: React.FC<ChannelListProps> = ({ 
  activeView, 
  currentChannelId, 
  onChannelSelect,
  currentUser,
  activeVoiceChannel,
  onVoiceJoin,
  voiceStates,
  users
}) => {
  
  const TextChannelItem = ({ 
    id,
    name, 
    description,
    icon: Icon = Hash,
    view = AppView.CHAT
  }: { 
    id: string;
    name: string; 
    description: string;
    icon?: any;
    view?: AppView; 
  }) => {
    const isActive = activeView === view && (view !== AppView.CHAT || currentChannelId === id);
    
    return (
      <button
        onClick={() => onChannelSelect(view, view === AppView.CHAT ? { id, name, description } : undefined)}
        className={`w-full flex items-center px-2 py-[6px] rounded-md mb-[2px] group transition-colors ${
          isActive 
            ? 'bg-discord-hover text-discord-text-header' 
            : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'
        }`}
      >
        <Icon size={20} className="mr-1.5 text-gray-400" />
        <span className={`font-medium truncate ${isActive ? 'text-white' : ''}`}>{name}</span>
      </button>
    );
  };

  const VoiceChannelItem = ({ name }: { name: string }) => {
    const isConnected = activeVoiceChannel === name;
    // Filter users who are in this specific channel
    const usersInChannel = users.filter(u => voiceStates[u.id] === name);

    return (
      <div className="mb-1">
        <div 
            onClick={() => onVoiceJoin(name)}
            className={`w-full flex items-center px-2 py-[6px] rounded-md group transition-colors cursor-pointer ${
                isConnected 
                ? 'bg-discord-hover text-white'
                : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'
            }`}
        >
            <Volume2 size={20} className={`mr-1.5 ${isConnected ? 'text-green-500' : 'text-gray-400'}`} />
            <span className="font-medium truncate flex-1">{name}</span>
        </div>
        {/* Render Users Inside Channel */}
        {usersInChannel.length > 0 && (
            <div className="pl-8 pr-2 space-y-1 pb-1">
                {usersInChannel.map(u => (
                    <div key={u.id} className="flex items-center group/user cursor-pointer py-0.5 rounded hover:bg-white/5">
                        <SafeImage 
                            src={u.avatar} 
                            alt={u.username} 
                            className={`w-5 h-5 rounded-full mr-2 border border-[#2b2d31] ${u.status === 'online' ? 'ring-1 ring-green-500' : ''}`}
                            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.username)}&background=5865F2&color=fff&size=128`}
                        />
                        <span className={`text-sm truncate ${u.id === currentUser.id ? 'font-bold text-white' : 'text-discord-text-muted group-hover/user:text-discord-text-normal'}`}>
                            {u.username}
                        </span>
                        {u.isBot && <span className="ml-1 text-[9px] bg-discord-blurple text-white px-1 rounded">BOT</span>}
                    </div>
                ))}
            </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-60 bg-discord-sidebar flex flex-col shrink-0 relative">
      {/* Server Header */}
      <div className="h-12 px-4 flex items-center justify-between shadow-sm hover:bg-discord-hover transition-colors cursor-pointer border-b border-gray-900/20 shrink-0">
        <h1 className="font-bold text-discord-text-header text-[15px] truncate">UPG Community</h1>
        <ChevronDown size={16} className="text-discord-text-header" />
      </div>

      {/* Scrollable Channels */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-5 pb-24">
        
        {/* Category: Important */}
        <div>
          <div className="flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={10} className="mr-0.5" />
              INFORMACIÓN
            </div>
          </div>
          
          <TextChannelItem 
            id="quienes-somos"
            name="quienes-somos" 
            description="Sobre nosotros"
            icon={Users} 
            view={AppView.WHO_WE_ARE} 
          />
          <TextChannelItem 
            id="votaciones"
            name="votaciones" 
            description="Vota por el futuro"
            icon={Vote} 
            view={AppView.VOTING} 
          />
        </div>

        {/* Category: Text Channels */}
        <div>
          <div className="flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={10} className="mr-0.5" />
              CANALES DE TEXTO
            </div>
            <span className="text-xl leading-none relative top-[1px]">+</span>
          </div>
          
          <TextChannelItem 
            id="general"
            name="general" 
            description="Chat general de UPG"
          />
        </div>

         {/* Category: Voice Channels */}
        <div>
          <div className="flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer">
             <div className="flex items-center">
              <ChevronDown size={10} className="mr-0.5" />
              CANALES DE VOZ
            </div>
          </div>
          
           <VoiceChannelItem name="Plaza UPG" />
        </div>

      </div>

      {/* Connection Panel (If connected) */}
      {activeVoiceChannel && (
        <div className="bg-[#232428] border-b border-gray-800 p-2 shrink-0">
            <div className="flex items-center justify-between text-green-400 text-xs font-bold px-1 mb-1">
                <span className="flex items-center"><Volume2 size={12} className="mr-1" /> Voz Conectada</span>
                <span className="text-discord-text-muted font-normal cursor-pointer hover:underline">{activeVoiceChannel}</span>
            </div>
            <div className="flex items-center justify-between">
                 <div className="text-discord-text-muted text-[10px] px-1">Latencia: 24ms</div>
                 <button onClick={() => onVoiceJoin(activeVoiceChannel)} className="hover:bg-gray-700 p-1 rounded">
                    <HeadphoneOff size={14} className="text-discord-text-header" />
                 </button>
            </div>
        </div>
      )}

      {/* Bottom Controls (User) */}
      <div className="bg-[#232428] shrink-0 flex flex-col z-10">
        <div className="h-[52px] px-2 flex items-center">
            <div className="group flex items-center py-1 px-1 pl-0.5 rounded-md hover:bg-discord-hover cursor-pointer mr-auto min-w-[120px]">
                <div className="relative w-8 h-8 mr-2 ml-1">
                    <SafeImage 
                      src={currentUser.avatar} 
                      className="w-8 h-8 rounded-full object-cover" 
                      alt="User"
                      fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=5865F2&color=fff&size=128`}
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#232428] rounded-full ${
                         currentUser.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                </div>
                <div className="text-sm min-w-0">
                    <div className="font-semibold text-white text-xs truncate w-20">{currentUser.username}</div>
                    <div className="text-[10px] text-gray-400 truncate">#{currentUser.id.substring(0,4)}</div>
                </div>
            </div>
            
            <div className="flex items-center">
                <button className="p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal">
                    <Mic size={18} />
                </button>
                <button className="p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal">
                    <HeadphoneOff size={18} />
                </button>
                <button className="p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal">
                    <Settings size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelList;