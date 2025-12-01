import React, { memo, useMemo } from 'react';
import { readableTextColor } from '../utils/colorUtils';
import { Message, User, UserRole } from '../types';
import { Trash2, Shield, Ban, UserX, VolumeX, Palette, Zap } from 'lucide-react';
import SafeImage from './SafeImage';
import { useUsers } from '../context/UserContext';

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

const MessageList: React.FC<MessageListProps> = memo(({
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

  // Agrupar mensajes como en Discord: mensajes consecutivos del mismo usuario dentro de 5 minutos
  const groupedMessages = useMemo(() => {
    const groups: Array<{
      userId: string;
      username: string;
      avatar: string;
      color: string;
      role?: UserRole;
      messages: Message[];
      timestamp: Date;
    }> = [];

    // Crear mapas locales para evitar dependencias complejas
    const localUserMap = new Map<string, User>();
    users.forEach(u => localUserMap.set(u.id, u));
    const localColorMap = new Map<string, string>();
    Object.entries(userColors).forEach(([userId, color]) => {
      localColorMap.set(userId, color as string);
    });

    for (let i = 0; i < orderedMessages.length; i++) {
      const msg = orderedMessages[i];
      const msgUser = localUserMap.get(msg.userId);
      const msgTimestamp = new Date(msg.timestamp);

      // Si es el primer mensaje o el usuario cambió o pasaron más de 5 minutos
      const shouldStartNewGroup =
        groups.length === 0 ||
        groups[groups.length - 1].userId !== msg.userId ||
        (msgTimestamp.getTime() - groups[groups.length - 1].timestamp.getTime()) > 5 * 60 * 1000; // 5 minutos

      if (shouldStartNewGroup) {
        groups.push({
          userId: msg.userId,
          username: msg.username || msgUser?.username || 'Unknown',
          avatar: msg.avatar || msgUser?.avatar || '',
          color: localColorMap.get(msg.userId) || msgUser?.color || '#ffffff',
          role: msgUser?.role,
          messages: [msg],
          timestamp: msgTimestamp,
        });
      } else {
        // Agregar al grupo existente
        groups[groups.length - 1].messages.push(msg);
      }
    }

    return groups;
  }, [orderedMessages, users, userColors]);

  return (
    <div className="flex-1 overflow-y-auto px-2 sm:px-4 pt-2 sm:pt-4 flex flex-col custom-scrollbar" style={{ maxHeight: '100%', minHeight: '100%' }}>
      <div className="flex-1 flex flex-col justify-end min-h-full">
        <div className="mb-4 sm:mb-6 mt-2 sm:mt-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-2 sm:mb-3">
            <Shield size={24} className="text-white sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">¡Bienvenido al chat!</h1>
          <p className="text-sm text-discord-text-muted">Este es el chat real.</p>
        </div>
        <div className="h-[1px] bg-discord-text-muted/20 w-full my-2" />

        <div className="flex-1 space-y-1">
          {groupedMessages.map((group, groupIndex) => (
            <div key={`${group.userId}-${group.timestamp.getTime()}`} className="mb-2">
              {group.messages.map((msg, msgIndex) => {
                const isFirstInGroup = msgIndex === 0;
                const msgTimestamp = new Date(msg.timestamp);
                const mentioned = msg.content && currentUser && msg.content.includes(`@${currentUser.username}`);

                // Renderizar contenido con menciones destacadas
                const renderMessageContent = () => {
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
                    return <span key={index}>{part}</span>;
                  });
                };

                return (
                  <div
                    key={msg.id}
                    className={`group flex pr-2 sm:pr-4 py-0.5 relative transition-all ${mentioned ? 'bg-yellow-500/10 border-l-4 border-yellow-500 pl-2 -ml-1 hover:bg-yellow-500/15' : 'hover:bg-[#2e3035]'}`}
                    onMouseEnter={() => setHoveredMessageId(msg.id)}
                    onMouseLeave={() => setHoveredMessageId(null)}
                  >
                    {/* Avatar solo en el primer mensaje del grupo */}
                    {isFirstInGroup && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-600 mr-3 sm:mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer">
                        <SafeImage
                          src={group.avatar}
                          alt={group.username}
                          className="w-full h-full object-cover"
                          fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(group.username)}&background=5865F2&color=fff&size=128`}
                        />
                      </div>
                    )}
                    {/* Espacio para alinear mensajes consecutivos */}
                    {!isFirstInGroup && (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 shrink-0" />
                    )}

                    <div className="flex-1 min-w-0">
                      {/* Header solo en el primer mensaje del grupo */}
                      {isFirstInGroup && (
                        <div className="flex items-center flex-wrap mb-1">
                          <span
                            className="font-medium text-sm sm:text-base mr-2"
                            style={{
                              color: group.userId === 'bot' ? '#5865F2' : readableTextColor(group.color),
                            }}
                          >
                            {group.username}
                          </span>
                          {group.role === UserRole.ADMIN && (
                            <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                              ADMIN
                            </span>
                          )}
                          {group.userId === 'bot' && (
                            <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                              BOT
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
                        </div>
                      )}

                      {/* Timestamp para mensajes consecutivos (no el primero del grupo) */}
                      {!isFirstInGroup && (
                        <div className="flex items-center mb-1">
                          <span className="text-[11px] sm:text-xs text-discord-text-muted ml-1 sm:ml-2 font-medium hover:underline cursor-pointer">
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
                      )}

                      {/* Contenido del mensaje */}
                      <p className={`text-sm sm:text-base text-discord-text-normal whitespace-pre-wrap leading-[1.3rem] sm:leading-[1.375rem] ${msg.status === 'sending' ? 'opacity-70' : ''} ${!isFirstInGroup ? 'ml-0' : ''}`}>
                        {renderMessageContent()}
                        {/* Estado de envío solo para el primer mensaje del grupo si está enviando */}
                        {isFirstInGroup && msg.status === 'sending' && (
                          <span className="ml-2 text-[10px] text-discord-text-muted italic flex items-center gap-1">
                            <span className="w-2 h-2 border-2 border-discord-text-muted border-t-transparent rounded-full animate-spin" />
                            Enviando...
                          </span>
                        )}
                        {isFirstInGroup && msg.status === 'error' && (
                          <span className="ml-2 text-[10px] text-red-500 italic">
                            Error al enviar
                          </span>
                        )}
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
              })}
            </div>
          ))}
        </div>

        {/* Indicador de "bot escribiendo" */}
        {isBotTyping && (
          <div className="flex pr-2 sm:pr-4 mt-2 sm:mt-4 py-0.5">
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
});

MessageList.displayName = 'MessageList';

export { MessageList };
