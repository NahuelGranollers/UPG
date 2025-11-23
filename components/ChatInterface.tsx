import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useSocket } from '../context/SocketContext';
import { Message, User, UserRole } from '../types';
import { Hash, Menu, Trash2, Ban, UserX, VolumeX, Palette, Zap } from 'lucide-react';
import SafeImage from './SafeImage';
import MessageInput from './MessageInput';

interface ChatInterfaceProps {
  currentUser: User;
  users: User[];
  currentChannel: { id: string; name: string };
  onSendMessage: (content: string) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onMenuToggle: () => void;
  userColors?: Record<string, string>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  users,
  currentChannel,
  onSendMessage,
  messages,
  setMessages,
  onMenuToggle,
  userColors = {},
}) => {
  // State
  const [inputText, setInputText] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [mentionStartPos, setMentionStartPos] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  // Ordenar mensajes: más antiguo arriba, más reciente abajo
  const orderedMessages = useMemo(() => {
    const combined = [...messages, ...localMessages];
    const sorted = combined.sort((a, b) => {
      const ta = new Date(a.timestamp).getTime();
      const tb = new Date(b.timestamp).getTime();
      return ta - tb;
    });
    // Limitar a los últimos 100 mensajes para performance
    return sorted.slice(-100);
  }, [messages, localMessages]);

  // Actualizar chat al recibir channel:history y nuevos mensajes
  const { socket, isConnected } = useSocket();
  useEffect(() => {
    if (!socket || !isConnected) return;
    const handleChannelHistory = (data: { channelId: string; messages: Message[] }) => {
      if (data.channelId === currentChannel.id) {
        setInputText('');
        setShowMentionSuggestions(false);
      }
    };
    const handleNewMessage = (msg: Message) => {
      if (msg.channelId === currentChannel.id && msg.userId === currentUser.id) {
        // Limpiar input cuando llega la confirmación del mensaje del usuario
        setInputText('');
        setShowMentionSuggestions(false);
        // Remover mensaje local duplicado: preferir match por localId si viene desde servidor
        setLocalMessages(prev =>
          prev.filter(local => {
            // If server returned localId, remove matching local
            if ((msg as any).localId && (local as any).localId && (local as any).localId === (msg as any).localId) return false;
            // Fallback: match by content + proximity in timestamp (5s)
            try {
              const localTime = new Date((local as any).timestamp).getTime();
              const serverTime = new Date(msg.timestamp).getTime();
              if ((local as any).id && (local as any).id.startsWith('local-') && local.userId === msg.userId && local.content === msg.content && Math.abs(localTime - serverTime) < 5000) {
                return false;
              }
            } catch (e) {}
            return true;
          })
        );
      }
    };
    socket.on('channel:history', handleChannelHistory);
    socket.on('message:received', handleNewMessage);
    return () => {
      socket.off('channel:history', handleChannelHistory);
      socket.off('message:received', handleNewMessage);
    };
  }, [socket, isConnected, currentChannel.id, currentUser]);



  // Lista de usuarios mencionables (bot + TODOS los usuarios, incluso offline y el usuario actual)
  const mentionableUsers = useMemo(() => {
    const botUser = {
      id: 'bot',
      username: 'UPG',
      avatar: '/upg.png',
      color: '#5865F2',
      online: true,
      isBot: true,
    };
    // Filtrar usuarios normales y bots
    const bots = [botUser];
    // Eliminar el bot de la lista de usuarios normales si está presente
    const normalUsers = users.filter(u => !u.isBot && u.id !== 'bot');
    return [...bots, ...normalUsers];
  }, [users]);

  // Filtrar sugerencias de menciones
  const mentionSuggestions = useMemo(() => {
    if (!mentionSearch) return mentionableUsers;
    const search = mentionSearch.toLowerCase();
    return mentionableUsers.filter(u => u.username.toLowerCase().includes(search));
  }, [mentionSearch, mentionableUsers]);

  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser?.role]);

  // Socket.IO reference
  const getSocket = useCallback(() => socket, [socket]);

  // Handle input change for mentions
  const handleInputChange = useCallback((value: string) => {
    // Modo mención: detectar @ y mostrar sugerencias
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1) {
      setShowMentionSuggestions(true);
      setMentionStartPos(atIndex);
      setMentionSearch(value.slice(atIndex + 1));
      setSelectedSuggestionIndex(0);
    } else {
      setShowMentionSuggestions(false);
      setMentionSearch('');
    }
  }, []);

  // Handle key down for mentions
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentionSuggestions && mentionSuggestions.length > 0) {
      if (e.key === 'Escape') {
        setShowMentionSuggestions(false);
        e.preventDefault();
      }
    }
  }, [showMentionSuggestions, mentionSuggestions.length]);

  // Handlers
  const completeMention = useCallback(
    (user: { username: string }) => {
      const before = inputText.slice(0, mentionStartPos);
      const after = inputText.slice(inputRef.current?.selectionStart || inputText.length);
      const newText = `${before}@${user.username} ${after}`;
      setInputText(newText);
      setShowMentionSuggestions(false);
      setMentionSearch('');
      setTimeout(() => {
        const newCursorPos = before.length + user.username.length + 2;
        inputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
        inputRef.current?.focus();
      }, 0);
    },
    [inputText, mentionStartPos]
  );

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      const lowerInput = inputText.toLowerCase();
      const mentionsBot = lowerInput.includes('@upg');
      const localId = 'local-' + Date.now();
      onSendMessage(inputText, localId);
      // Agregar mensaje local inmediatamente para feedback visual
      const localMessage: Message & { localId?: string } = {
        id: localId,
        localId,
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        content: inputText,
        timestamp: new Date().toISOString(),
        channelId: currentChannel.id,
      } as any;
      setLocalMessages(prev => [...prev, localMessage]);
      // No limpiar input aquí - se limpia cuando llega la confirmación del servidor
      if (mentionsBot) setIsBotTyping(true);
    },
    [inputText, onSendMessage, currentUser, currentChannel.id]
  );

  // Check if bot is typing (only if last message wasn't from bot)
  const shouldShowBotTyping =
    isBotTyping && (messages.length === 0 || messages[messages.length - 1]?.userId !== 'bot');

  // Renderizar preview del input con menciones destacadas en tiempo real
  const renderInputPreview = useCallback(
    (text: string) => {
      if (!text) return null;
      const mentionRegex = /@([\w]+)/g;
      const parts = text.split(mentionRegex);
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          const user = mentionableUsers.find(u => u.username.toLowerCase() === part.toLowerCase());
          return (
            <span
              key={index}
              className={`${user ? 'bg-blue-500/30 text-blue-300' : 'bg-gray-600/30 text-gray-400'} font-semibold px-1 rounded`}
            >
              @{part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      });
    },
    [mentionableUsers]
  );

  // Función para resaltar menciones en el texto del mensaje
  const highlightMentions = useCallback(
    (text: string) => {
      if (!text) return text;
      const mentionRegex = /@([\w]+)/g;
      const parts = text.split(mentionRegex);
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
    },
    [currentUser]
  );

  // Funciones de administrador
  const handleDeleteMessage = useCallback(
    (messageId: string) => {
      if (!isAdmin || !currentUser) return;
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:delete-message', {
          messageId,
          channelId: currentChannel.id,
          adminId: currentUser.id,
        });
      }
    },
    [isAdmin, currentUser, currentChannel.id, getSocket]
  );

  const handleBanUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id) return;
      if (
        window.confirm(
          `¿Estás seguro de que quieres banear a ${username}? Esta acción también bloqueará su IP.`
        )
      ) {
        const socket = getSocket();
        if (socket) {
          socket.emit('admin:ban-user', {
            userId,
            username,
            adminId: currentUser.id,
          });
        }
      }
    },
    [isAdmin, currentUser, getSocket]
  );

  const handleKickUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id) return;
      if (window.confirm(`¿Estás seguro de que quieres expulsar a ${username}?`)) {
        const socket = getSocket();
        if (socket) {
          socket.emit('admin:kick-user', {
            userId,
            username,
            adminId: currentUser.id,
          });
        }
      }
    },
    [isAdmin, currentUser, getSocket]
  );

  // Nueva acción: silenciar usuario
  const handleSilenceUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id) return;
      if (
        window.confirm(
          `¿Silenciar a ${username}? No podrá enviar mensajes hasta que lo des-silencies.`
        )
      ) {
        const socket = getSocket();
        if (socket) {
          socket.emit('admin:silence-user', {
            userId,
            adminId: currentUser.id,
          });
        }
      }
    },
    [isAdmin, currentUser, getSocket]
  );

  // Nueva acción: cambiar color de usuario
  const handleChangeColor = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id) return;
      const newColor = prompt(
        `Nuevo color HEX para ${username} (ejemplo: #ff0000):`,
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );
      if (newColor && /^#[0-9A-Fa-f]{6}$/.test(newColor)) {
        const socket = getSocket();
        if (socket) {
          socket.emit('admin:change-color', {
            userId,
            color: newColor,
            adminId: currentUser.id,
          });
        }
      } else {
        alert('Color inválido. Usa formato HEX (#RRGGBB)');
      }
    },
    [isAdmin, currentUser, getSocket]
  );

  // Nueva acción: modo troll
  const handleTrollMode = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id) return;
      if (window.confirm(`¿Activar modo troll para ${username}?`)) {
        const socket = getSocket();
        if (socket) {
          socket.emit('admin:troll-mode', {
            userId,
            adminId: currentUser.id,
          });
        }
      }
    },
    [isAdmin, currentUser, getSocket]
  );

  // Render
  return (
    <div className="flex-1 flex flex-col bg-discord-chat min-w-0 h-full">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0">
        <div className="flex items-center text-discord-text-header font-bold truncate">
          <button
            onClick={onMenuToggle}
            className="md:hidden mr-3 text-discord-text-muted hover:text-white"
            aria-label="Abrir menú"
            aria-expanded="false"
          >
            <Menu size={24} />
          </button>
          <Hash size={24} className="text-discord-text-muted mr-2 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
        </div>
      </div>
      {/* Mensajes */}
      <div
        className="flex-1 overflow-y-auto px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col chat-input-safe no-overlap"
        style={{ maxHeight: '100%' }}
      >
        <div className="mt-auto">
          <div className="mb-6 sm:mb-8 mt-3 sm:mt-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Hash size={32} className="text-white sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              ¡Bienvenido a #{currentChannel.name}!
            </h1>
            <p className="text-sm sm:text-base text-discord-text-muted">
              Este es el chat real del canal.
            </p>
          </div>
          <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
          {orderedMessages.map(msg => {
            const msgUser = users.find(u => u.id === msg.userId);
            const msgTimestamp =
              typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
            const mentioned =
              msg.content && currentUser && msg.content.includes(`@${currentUser.username}`);
            return (
              <div
                key={msg.id}
                className={`group flex pr-2 sm:pr-3 mt-2 sm:mt-3 py-0.5 relative transition-all ${mentioned ? 'bg-yellow-500/10 border-l-4 border-yellow-500 pl-2 -ml-1 hover:bg-yellow-500/15' : 'hover:bg-[rgba(255,255,255,0.02)]'}`}
                onMouseEnter={() => setHoveredMessageId(msg.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-600 mr-2 sm:mr-3 mt-0.5 overflow-hidden shrink-0 cursor-pointer">
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
                            : userColors[msg.userId] || msgUser?.color || '#fff',
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
                  </div>
                  <p className="text-sm sm:text-base text-discord-text-normal whitespace-pre-wrap leading-[1.3rem] sm:leading-[1.375rem]">
                    {highlightMentions(msg.content)}
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

          {/* Indicador de "bot escribiendo" */}
          {shouldShowBotTyping && (
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
      {/* Input: separado y con z-index para evitar solapamientos */}
      <div className="w-full px-3 sm:px-4 pb-3 sm:pb-4 z-base bg-transparent">
        <MessageInput
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={handleSendMessage}
        inputRef={inputRef}
        showMentionSuggestions={showMentionSuggestions}
        mentionSuggestions={mentionSuggestions}
        selectedSuggestionIndex={selectedSuggestionIndex}
        setSelectedSuggestionIndex={setSelectedSuggestionIndex}
        completeMention={completeMention}
        renderInputPreview={renderInputPreview}
        currentChannel={currentChannel}
        onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default memo(ChatInterface);
