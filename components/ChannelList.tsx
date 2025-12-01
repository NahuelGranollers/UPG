import React, { memo, useState, useMemo } from 'react';
import {
  Hash,
  Volume2,
  ChevronDown,
  Menu,
  Mic,
  Settings,
  LogIn,
  LogOut,
} from 'lucide-react';
import ServerSettings from './ServerSettings';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../context/UserContext';
import { AppView, User } from '../types';
import { ChannelData } from '../types';
import SafeImage from './SafeImage';

interface ChannelListProps {
  activeView: AppView;
  currentChannelId: string;
  onChannelSelect: (view: AppView, channel?: ChannelData) => void;
  currentUser: User;
  activeVoiceChannel: string | null;
  onVoiceJoin: (channelName: string) => void;
  onLoginWithDiscord?: () => void;
  onLogoutDiscord?: () => void;
  onToggleMic?: () => void;
  micActive?: boolean;
  voiceLevel?: number;
  onVoiceLeave?: () => void;
  onOpenSidebar?: () => void;
}

// Extracted TextChannelItem to prevent re-creation on every render
const TextChannelItem = React.memo(
  ({
    id,
    name,
    description,
    icon: Icon = Hash,
    view = AppView.CHAT,
    activeView,
    currentChannelId,
    onChannelSelect,
  }: {
    id: string;
    name: string;
    description: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
    view?: AppView;
    activeView: AppView;
    currentChannelId: string;
    onChannelSelect: (view: AppView, channel?: ChannelData) => void;
  }) => {
    const isActive = activeView === view && (view !== AppView.CHAT || currentChannelId === id);

    return (
      <button
        onClick={() =>
          onChannelSelect(view, view === AppView.CHAT ? { id, name, description } : undefined)
        }
        className={`w-full flex items-center px-2 py-2 sm:py-[6px] rounded-md mb-[2px] group transition-colors min-h-[44px] sm:min-h-0 ${
          isActive
            ? 'bg-discord-hover text-discord-text-header'
            : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'
        }`}
        title={description}
      >
        <Icon size={20} className="mr-2 sm:mr-1.5 text-gray-400 shrink-0" />
        <span
          className={`font-medium text-sm sm:text-[15px] truncate ${isActive ? 'text-white' : ''}`}
        >
          {name}
        </span>
      </button>
    );
  }
);

TextChannelItem.displayName = 'TextChannelItem';

// Extracted VoiceChannelItem to prevent re-creation on every render
const VoiceChannelItem = React.memo(({ 
  name, 
  activeVoiceChannel, 
  onVoiceJoin, 
  currentUser 
}: { 
  name: string;
  activeVoiceChannel: string | null;
  onVoiceJoin: (channelName: string) => void;
  currentUser: User;
}) => {
  const { users, voiceStates } = useUsers();
  const isConnected = activeVoiceChannel === name;
  // Filter users who are in this specific channel (memoizado)
  const usersInChannel = useMemo(
    () => users.filter(u => voiceStates[u.id] === name),
    [users, voiceStates, name]
  );

  return (
    <div className="mb-1">
      <div
        onClick={() => onVoiceJoin(name)}
        className={`w-full flex items-center px-2 py-2 sm:py-[6px] rounded-md group transition-colors cursor-pointer min-h-[44px] sm:min-h-0 ${
          isConnected
            ? 'bg-discord-hover text-white'
            : 'text-discord-text-muted hover:bg-discord-hover hover:text-discord-text-normal'
        }`}
        title={`${name} - ${usersInChannel.length} usuario${usersInChannel.length !== 1 ? 's' : ''} conectado${usersInChannel.length !== 1 ? 's' : ''}`}
      >
        <Volume2
          size={20}
          className={`mr-2 sm:mr-1.5 shrink-0 ${isConnected ? 'text-green-500' : 'text-gray-400'}`}
        />
        <span className="font-medium text-sm sm:text-[15px] truncate flex-1">{name}</span>
        {usersInChannel.length > 0 && (
          <span className="text-xs text-discord-text-muted ml-2">
            ({usersInChannel.length})
          </span>
        )}
      </div>
      {/* Render Users Inside Channel */}
      {usersInChannel.length > 0 && (
        <div className="pl-8 sm:pl-7 pr-2 space-y-1 pb-1">
          {usersInChannel.map(u => (
            <div
              key={u.id}
              className="flex items-center group/user cursor-pointer py-1 sm:py-0.5 rounded hover:bg-white/5 min-h-[36px] sm:min-h-0"
            >
              <SafeImage
                src={u.avatar}
                alt={u.username}
                className={`w-6 h-6 sm:w-5 sm:h-5 rounded-full mr-2 border border-[#2b2d31] ${u.status === 'online' ? 'ring-1 ring-green-500' : ''}`}
                fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(u.username)}&background=5865F2&color=fff&size=128`}
              />
              <span
                className={`text-sm sm:text-[13px] truncate ${u.id === currentUser?.id ? 'font-bold text-white' : 'text-discord-text-muted group-hover/user:text-discord-text-normal'}`}
              >
                {u.username}
              </span>
              {u.isBot && (
                <span className="ml-1 text-[9px] sm:text-[8px] bg-discord-blurple text-white px-1 rounded">
                  BOT
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

VoiceChannelItem.displayName = 'VoiceChannelItem';

const ChannelList: React.FC<ChannelListProps> = ({
  activeView,
  currentChannelId,
  onChannelSelect,
  currentUser,
  activeVoiceChannel,
  onVoiceJoin,
  onLoginWithDiscord,
  onLogoutDiscord,
  onToggleMic,
  micActive,
  voiceLevel,
  onVoiceLeave,
  onOpenSidebar,
}) => {
  // micActive is now controlled by parent via props; keep local for fallback
  const [localMicActive, setLocalMicActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { updateUser } = useAuth();
  const { socket } = useSocket();

  // Define available text channels
  const textChannels = [
    { id: 'general', name: 'general', description: 'Chat general de UPG' },
  ];

  // Define available voice channels
  const voiceChannels = [
    { id: 'plaza-upg', name: 'Plaza UPG', description: 'Canal de voz principal' },
  ];

  return (
    <div className="bg-[#232428] shrink-0 flex flex-col z-30 md:static mt-auto md:mt-0 md:rounded-t-none rounded-t-lg">
      <div className="h-[64px] sm:h-[52px] px-2 flex items-center">
        {/* User avatar/name/status block removed as requested */}
        <div className="flex items-center gap-1 ml-2">
          {onOpenSidebar && (
            <button
              onClick={e => {
                e.stopPropagation();
                onOpenSidebar();
              }}
              className="md:hidden text-discord-text-muted hover:text-white"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="font-bold text-discord-text-header text-[15px] truncate">Unas Partidillas?©</h1>
        </div>
        <ChevronDown size={16} className="text-discord-text-header" />
      </div>
      {/* ...existing code... */}

      {/* Scrollable Channels */}
      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar space-y-5 pb-4 md:pb-24">
        {/* Category: Text Channels */}
        <div>
          <div className="flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={10} className="mr-0.5" />
              CANALES DE TEXTO
            </div>
            <span className="text-xl leading-none relative top-[1px]">+</span>
          </div>

          {textChannels.map(channel => (
            <TextChannelItem 
              key={channel.id}
              id={channel.id} 
              name={channel.name} 
              description={channel.description} 
              activeView={activeView}
              currentChannelId={currentChannelId}
              onChannelSelect={onChannelSelect}
            />
          ))}
        </div>

        {/* Category: Voice Channels */}
        <div>
          <div className="flex items-center justify-between px-0.5 mb-1 text-xs font-bold text-discord-text-muted hover:text-discord-text-header uppercase tracking-wide cursor-pointer">
            <div className="flex items-center">
              <ChevronDown size={10} className="mr-0.5" />
              CANALES DE VOZ
            </div>
          </div>

          {voiceChannels.map(channel => (
            <VoiceChannelItem 
              key={channel.id}
              name={channel.name} 
              activeVoiceChannel={activeVoiceChannel}
              onVoiceJoin={onVoiceJoin}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>

      {/* Connection Panel (If connected) */}
      {activeVoiceChannel && (
        <div className="bg-[#232428] border-b border-gray-800 p-2 shrink-0">
          <div className="flex items-center justify-between text-green-400 text-xs font-bold px-1 mb-1">
            <span className="flex items-center">
              <Volume2 size={12} className="mr-1" /> Voz Conectada
            </span>
            <span className="text-discord-text-muted font-normal cursor-pointer hover:underline">
              {activeVoiceChannel}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-discord-text-muted text-[10px] px-1">Latencia: 24ms</div>
            {/* Headphone button removed */}
          </div>
          <div className="flex items-center justify-end mt-2">
            <button
              onClick={() => {
                if (typeof onVoiceLeave === 'function') onVoiceLeave();
                else onVoiceJoin(activeVoiceChannel);
              }}
              className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
            >
              Desconectar
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls (User) */}
      <div className="bg-[#232428] shrink-0 flex flex-col z-30 md:static mt-auto md:mt-0 md:rounded-t-none rounded-t-lg">
        <div className="h-[64px] sm:h-[52px] px-2 flex items-center">
          <div className="group flex items-center py-1 px-1 pl-0.5 rounded-md hover:bg-discord-hover cursor-pointer mr-2 min-w-0 flex-1">
            <div className="relative w-9 h-9 sm:w-8 sm:h-8 mr-2 ml-1 shrink-0">
              <SafeImage
                src={currentUser?.avatar || ''}
                className="w-9 h-9 sm:w-8 sm:h-8 rounded-full object-cover"
                alt="User"
                fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser?.username || 'U')}&background=5865F2&color=fff&size=128`}
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#232428] rounded-full ${
                  currentUser?.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              ></div>
            </div>
            <div className="text-sm min-w-0 flex-1">
              <div className="font-semibold text-white text-xs truncate">
                {currentUser?.username || 'User'}
              </div>
              <div className="text-[10px] text-gray-400 truncate">
                #{currentUser?.id?.substring(0, 4) || '0000'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 ml-2">
            {currentUser?.isGuest && onLoginWithDiscord && (
              <button
                onClick={onLoginWithDiscord}
                className="p-2 sm:p-1.5 rounded hover:bg-discord-blurple text-discord-blurple hover:text-white transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                title="Iniciar sesión con Discord"
              >
                <LogIn size={18} />
              </button>
            )}
            {!currentUser?.isGuest && onLogoutDiscord && (
              <button
                onClick={onLogoutDiscord}
                className="p-2 sm:p-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
                title="Desconectar Discord (volver a invitado)"
              >
                <LogOut size={18} />
              </button>
            )}
            <button
              onClick={() => {
                if (onToggleMic) onToggleMic();
                else setLocalMicActive(s => !s);
              }}
              className={`hidden sm:flex p-1.5 rounded transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${micActive || localMicActive ? 'bg-green-600 text-white' : 'hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal'} ${voiceLevel && voiceLevel > 0.03 ? 'animate-glow' : ''}`}
              title={micActive || localMicActive ? 'Micrófono activado' : 'Activar micrófono'}
            >
              <Mic size={18} />
            </button>

            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 sm:p-1.5 rounded hover:bg-discord-hover text-discord-text-muted hover:text-discord-text-normal min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Editar perfil"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      <ServerSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        initialName={currentUser?.username || ''}
        initialColor={currentUser?.color || '#808080'}
        onSave={(name, color) => {
          if (!currentUser) return;
          const newUser = { ...currentUser, username: name, color };
          // Update local auth context and storage
          updateUser(newUser);
          // Notify server to persist and broadcast to all clients
          try {
            if (socket) socket.emit('user:update', { username: name, color });
          } catch (e) {
            console.warn('Failed to emit user:update', e);
          }
          try {
            // show toast via sonner (ServerSettings already shows success for local save, but adding here for completeness)
            // If you want a toast here, ServerSettings already invoked toast.success
          } catch (e) {}
        }}
        onLinkDiscord={onLoginWithDiscord}
        onUnlinkDiscord={onLogoutDiscord}
        isGuest={currentUser?.isGuest}
      />
    </div>
  );
};

export default memo(ChannelList);
