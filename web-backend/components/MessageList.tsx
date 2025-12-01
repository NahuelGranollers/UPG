import React, { memo, useMemo } from 'react';
import { readableTextColor } from '../utils/colorUtils';
import { Message, User, UserRole } from '../types';
import { Trash2, Shield, Ban, UserX, VolumeX, Palette, Zap } from 'lucide-react';
import SafeImage from './SafeImage';
import { useUsers } from '../context/UserContext';

interface MessageItemProps {
  msg: Message;
  msgUser: User | undefined;
  currentUser: User;
  isAdmin: boolean;
  senderColor: string;
  hoveredMessageId: string | null;
  setHoveredMessageId: (id: string | null) => void;
  handleDeleteMessage: (id: string) => void;
  handleKickUser: (userId: string, username: string) => void;
  handleBanUser: (userId: string, username: string) => void;
  handleSilenceUser: (userId: string, username: string) => void;
  handleChangeColor: (userId: string, username: string) => void;
  handleTrollMode: (userId: string, username: string) => void;
}

const MessageItem: React.FC<MessageItemProps> = memo(
  ({
    msg,
    msgUser,
    currentUser,
    isAdmin,
    senderColor,
    hoveredMessageId,
    setHoveredMessageId,
    handleDeleteMessage,
    handleKickUser,
    handleBanUser,
    handleSilenceUser,
    handleChangeColor,
    handleTrollMode,
  }) => {
    const msgTimestamp =
      typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
    const mentioned =
      msg.content && currentUser && msg.content.includes(`@${currentUser.username}`);

    const highlightedContent = useMemo(() => {
      if (!msg.content) return null;
      const mentionRegex = /@([\w]+)/g;
      const parts = msg.content.split(mentionRegex);
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          const isMentioningCurrentUser =
            currentUser && part.toLowerCase() === currentUser.username.toLowerCase();
          return (
            <span
              key={index}
              className={`font-semibold ${isMentioningCurrentUser ? 'text-blue-400 bg-blue-500/20 px-1 rounded' : 'text-blue-300 hover:underline cursor-pointer'}`}
            >
              @{part}
            </span>
          );
        }
        return part;
      });
    }, [msg.content, currentUser]);

    return (
      <div
        key={msg.id}
        className={`group flex pr-2 sm:pr-4 mt-3 sm:mt-4 py-0.5 relative transition-all ${mentioned ? 'bg-yellow-500/10 border-l-4 border-yellow-500 pl-2 -ml-1 hover:bg-yellow-500/15' : 'hover:bg-[#2e3035]'}`}
        onMouseEnter={() => setHoveredMessageId(msg.id)}
        onMouseLeave={() => setHoveredMessageId(null)}
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 mr-3 sm:mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer">
          <SafeImage
            src={msg.avatar || msgUser?.avatar || ''}
            alt={msg.username || msgUser?.username || ''}
            className="w-full h-full object-cover"
            fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.username || msgUser?.username || '')}&background=5865F2&color=fff&size=128`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap">
            <span
              className="font-medium text-sm sm:text-base mr-2"
              style={{
                color:
                  msg.userId === 'bot'
                    ? '#5865F2'
                    : readableTextColor(senderColor || '#ffffff'),
              }}
            >
              {msg.username || msgUser?.username}
            </span>
            {msgUser?.role === UserRole.ADMIN && (
              <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                ADMIN
              </span>
            )}
            {mentioned && (
              <span className="text-[9px] sm:text-[10px] bg-yellow-500 text-black px-1.5 py-0.5 rounded mr-2 font-bold">
                MENCIÓN
              </span>
            )}
            <span className="text-[11px] sm:text-xs text-discord-text-muted ml-1 sm:ml-2 font-medium">
              {msgTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            {msg.status === 'sending' && (
              <span className="ml-2 text-[10px] text-discord-text-muted italic flex items-center gap-1">
                <span className="w-2 h-2 border-2 border-discord-text-muted border-t-transparent rounded-full animate-spin" />
                Enviando...
              </span>
            )}
            {msg.status === 'error' && (
              <span className="ml-2 text-[10px] text-red-500 italic">
                Error al enviar
              </span>
            )}
          </div>
          <p className={`text-sm sm:text-base text-discord-text-normal whitespace-pre-wrap leading-[1.3rem] sm:leading-[1.375rem] ${msg.status === 'sending' ? 'opacity-70' : ''}`}>
            {highlightedContent}
          </p>
        </div>
        {/* Admin Actions */}
        {isAdmin && hoveredMessageId === msg.id && msg.userId !== currentUser.id && (
          <div className="absolute right-2 sm:right-4 top-1 bg-discord-sidebar rounded shadow-lg flex gap-0.5 sm:gap-1 p-1 border border-gray-700">
            <button
              onClick={() => handleDeleteMessage(msg.id)}
              className="p-2 sm:p-1.5 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Eliminar mensaje"
            >
              <Trash2 size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleKickUser(msg.userId, msg.username)}
              className="p-2 sm:p-1.5 hover:bg-orange-500/20 rounded text-orange-400 hover:text-orange-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Expulsar usuario"
            >
              <UserX size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleBanUser(msg.userId, msg.username)}
              className="p-2 sm:p-1.5 hover:bg-red-500/20 rounded text-red-500 hover:text-red-400 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Banear usuario y su IP"
            >
              <Ban size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleSilenceUser(msg.userId, msg.username)}
              className="p-2 sm:p-1.5 hover:bg-gray-500/20 rounded text-gray-400 hover:text-gray-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Silenciar usuario"
            >
              <VolumeX size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleChangeColor(msg.userId, msg.username)}
              className="p-2 sm:p-1.5 hover:bg-blue-500/20 rounded text-blue-400 hover:text-blue-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Cambiar color de usuario"
            >
              <Palette size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => handleTrollMode(msg.userId, msg.username)}
              className="p-2 sm:p-1.5 hover:bg-pink-500/20 rounded text-pink-400 hover:text-pink-300 transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Modo troll"
            >
              <Zap size={16} className="sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

MessageItem.displayName = 'MessageItem';

interface MessageListProps {
  orderedMessages: Message[];
  currentUser: User;
  isAdmin: boolean;
  hoveredMessageId: string | null;
  setHoveredMessageId: (id: string | null) => void;
  handleDeleteMessage: (id: string) => void;
  handleKickUser: (userId: string, username: string) => void;
  handleBanUser: (userId: string, username: string) => void;
  handleSilenceUser: (userId: string, username: string) => void;
  handleChangeColor: (userId: string, username: string) => void;
  handleTrollMode: (userId: string, username: string) => void;
  isBotTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = memo(
  ({
    orderedMessages,
    currentUser,
    isAdmin,
    hoveredMessageId,
    setHoveredMessageId,
    handleDeleteMessage,
    handleKickUser,
    handleBanUser,
    handleSilenceUser,
    handleChangeColor,
    handleTrollMode,
    isBotTyping,
    messagesEndRef,
  }) => {
    const { users, userColors } = useUsers();
    // Optimización: Crear mapa de usuarios para búsqueda O(1)
    const userMap = useMemo(() => {
      const map = new Map<string, User>();
      users.forEach(u => map.set(u.id, u));
      return map;
    }, [users]);

    return (
      <div
        className="flex-1 overflow-y-auto px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col"
        style={{ maxHeight: '100%' }}
      >
        <div className="flex-1">
          <div className="mb-6 sm:mb-8 mt-3 sm:mt-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Shield size={32} className="text-white sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">¡Bienvenido al chat!</h1>
            <p className="text-sm sm:text-base text-discord-text-muted">Este es el chat real.</p>
          </div>
          <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
          {orderedMessages.map(msg => {
            const msgUser = userMap.get(msg.userId);
            const senderColor = userColors[msg.userId] || msgUser?.color || '#ffffff';
            return (
              <MessageItem
                key={msg.id}
                msg={msg}
                msgUser={msgUser}
                currentUser={currentUser}
                isAdmin={isAdmin}
                senderColor={senderColor}
                hoveredMessageId={hoveredMessageId}
                setHoveredMessageId={setHoveredMessageId}
                handleDeleteMessage={handleDeleteMessage}
                handleKickUser={handleKickUser}
                handleBanUser={handleBanUser}
                handleSilenceUser={handleSilenceUser}
                handleChangeColor={handleChangeColor}
                handleTrollMode={handleTrollMode}
              />
            );
          })}

          {/* Indicador de "bot escribiendo" */}
          {isBotTyping && (
            <div className="flex pr-2 sm:pr-4 mt-3 sm:mt-4 py-0.5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 mr-3 sm:mr-4 mt-0.5 overflow-hidden shrink-0">
                <SafeImage
                  src="/upg.png"
                  alt="UPG"
                  className="w-full h-full object-cover"
                  fallbackSrc="https://ui-avatars.com/api/?name=UPG&background=5865F2&color=fff&size=128"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap mb-1">
                  <span className="font-medium text-sm sm:text-base mr-2 text-[#5865F2]">UPG</span>
                  <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                    BOT
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></span>
                  </div>
                  <span className="text-xs text-discord-text-muted ml-2">escribiendo...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';

export { MessageList, MessageItem };
