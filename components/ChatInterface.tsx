import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { Message, User, UserRole } from '../types';
import { Hash, Menu, Trash2, Shield, Ban, UserX } from 'lucide-react';
import SafeImage from './SafeImage';
import { ChannelData } from '../App';

interface ChatInterfaceProps {
  currentUser: User;
  users: User[];
  currentChannel: ChannelData;
  onSendMessage: (content: string) => void;
  messages: Message[];
  onMenuToggle: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  users,
  currentChannel,
  onSendMessage,
  messages: propMessages,
  onMenuToggle
}) => {
  const [inputText, setInputText] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [mentionStartPos, setMentionStartPos] = useState(0);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser?.role]);

  // Socket.IO reference - Obtener instancia global del socket (memoizado)
  const getSocket = useCallback(() => {
    return (window as any).socketInstance;
  }, []);

  // Lista de usuarios mencionables (bot + usuarios reales)
  const mentionableUsers = useMemo(() => {
    const botUser = { id: 'bot', username: 'UPG', avatar: '/upg.png', color: '#5865F2' };
    return [botUser, ...users.filter(u => u.id !== currentUser?.id)];
  }, [users, currentUser]);

  // Filtrar sugerencias de menciones
  const mentionSuggestions = useMemo(() => {
    if (!mentionSearch) return mentionableUsers;
    const search = mentionSearch.toLowerCase();
    return mentionableUsers.filter(u => u.username.toLowerCase().includes(search));
  }, [mentionSearch, mentionableUsers]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [propMessages]);

  // Manejar input de texto con detección de @
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const cursorPos = e.target.selectionStart || 0;
    
    setInputText(text);

    // Buscar @ antes del cursor
    const textBeforeCursor = text.slice(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    
    if (lastAtIndex !== -1) {
      // Hay un @ antes del cursor
      const textAfterAt = textBeforeCursor.slice(lastAtIndex + 1);
      
      // Solo mostrar si no hay espacios después del @ y está cerca del cursor
      if (!textAfterAt.includes(' ') && (cursorPos - lastAtIndex) <= 20) {
        setShowMentionSuggestions(true);
        setMentionSearch(textAfterAt);
        setMentionStartPos(lastAtIndex);
        setSelectedSuggestionIndex(0);
      } else if (textAfterAt.includes(' ')) {
        setShowMentionSuggestions(false);
      }
    } else {
      setShowMentionSuggestions(false);
    }
  }, []);

  // Manejar teclas especiales
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentionSuggestions && mentionSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < mentionSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : mentionSuggestions.length - 1
        );
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        if (e.key === 'Tab' || (e.key === 'Enter' && showMentionSuggestions)) {
          e.preventDefault();
          completeMention(mentionSuggestions[selectedSuggestionIndex]);
        }
      } else if (e.key === 'Escape') {
        setShowMentionSuggestions(false);
      }
    }
  }, [showMentionSuggestions, mentionSuggestions, selectedSuggestionIndex]);

  // Completar mención
  const completeMention = useCallback((user: { username: string }) => {
    const before = inputText.slice(0, mentionStartPos);
    const after = inputText.slice(inputRef.current?.selectionStart || inputText.length);
    const newText = `${before}@${user.username} ${after}`;
    
    setInputText(newText);
    setShowMentionSuggestions(false);
    setMentionSearch('');
    
    // Mover cursor después de la mención
    setTimeout(() => {
      const newCursorPos = before.length + user.username.length + 2; // +2 por @ y espacio
      inputRef.current?.setSelectionRange(newCursorPos, newCursorPos);
      inputRef.current?.focus();
    }, 0);
  }, [inputText, mentionStartPos]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Detectar si se menciona al bot (case insensitive)
    const lowerInput = inputText.toLowerCase();
    const mentionsBot = lowerInput.includes('@upg');
    
    onSendMessage(inputText);
    setInputText('');
    setShowMentionSuggestions(false);
    
    // Mostrar feedback de "bot escribiendo" si se menciona al bot
    if (mentionsBot) {
      setIsBotTyping(true);
      // El estado se limpiará cuando llegue el mensaje del bot
    }
  }, [inputText, onSendMessage]);

  // Detectar cuando llega un mensaje del bot y limpiar el estado de "escribiendo"
  useEffect(() => {
    if (propMessages.length > 0) {
      const lastMessage = propMessages[propMessages.length - 1];
      if (lastMessage.userId === 'bot') {
        setIsBotTyping(false);
      }
    }
  }, [propMessages]);

  // Funciones de administrador (memoizadas)
  const handleDeleteMessage = useCallback((messageId: string) => {
    if (!isAdmin || !currentUser) return;
    
    const socket = (window as any).socketInstance;
    if (socket) {
      socket.emit('admin:delete-message', { 
        messageId, 
        channelId: currentChannel.id,
        adminId: currentUser.id
      });
    }
  }, [isAdmin, currentUser, currentChannel.id]);

  const handleClearChannel = useCallback(() => {
    if (!isAdmin) return;
    
    if (confirm(`¿Estás seguro de que quieres eliminar todos los mensajes de #${currentChannel.name}?`)) {
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:clear-channel', {
          channelId: currentChannel.id,
          adminId: currentUser.id
        });
      }
    }
  }, [isAdmin, currentChannel, currentUser, getSocket]);

  const handleBanUser = useCallback((userId: string, username: string) => {
    if (!isAdmin || !currentUser || userId === currentUser.id) return;
    
    if (confirm(`¿Estás seguro de que quieres banear a ${username}? Esta acción también bloqueará su IP.`)) {
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:ban-user', {
          userId,
          username,
          adminId: currentUser.id
        });
      }
    }
  }, [isAdmin, currentUser, getSocket]);

  const handleKickUser = useCallback((userId: string, username: string) => {
    if (!isAdmin || !currentUser || userId === currentUser.id) return;
    
    if (confirm(`¿Estás seguro de que quieres expulsar a ${username}?`)) {
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:kick-user', {
          userId,
          username,
          adminId: currentUser.id
        });
      }
    }
  }, [isAdmin, currentUser, getSocket]);

  // Mostrar todos los mensajes recibidos online
  return (
    <div className="flex-1 flex flex-col bg-discord-chat min-w-0 h-full">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0">
        <div className="flex items-center text-discord-text-header font-bold truncate">
          <button 
            onClick={onMenuToggle}
            className="md:hidden mr-3 text-discord-text-muted hover:text-white"
            aria-label="Abrir men├║"
            aria-expanded="false"
          >
            <Menu size={24} />
          </button>
          <Hash size={24} className="text-discord-text-muted mr-2 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-discord-blurple px-2 py-1 rounded flex items-center gap-1">
              <Shield size={12} />
              ADMIN
            </span>
            <button
              onClick={handleClearChannel}
              className="text-red-400 hover:text-red-300 px-2 py-1 hover:bg-red-500/10 rounded transition-colors"
              title="Limpiar chat"
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col" style={{ maxHeight: '100%' }}>
        <div className="mt-auto">
          <div className="mb-6 sm:mb-8 mt-3 sm:mt-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <Hash size={32} className="text-white sm:w-10 sm:h-10" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">¡Bienvenido a #{currentChannel.name}!</h1>
            <p className="text-sm sm:text-base text-discord-text-muted">Este es el chat real del canal.</p>
          </div>
          <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
          {propMessages.map((msg) => {
            const msgUser = users.find(u => u.id === msg.userId);
            const msgTimestamp = typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
            
            return (
              <div 
                key={msg.id} 
                className="group flex pr-2 sm:pr-4 mt-3 sm:mt-4 py-0.5 hover:bg-[#2e3035] relative"
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
                    <span className="font-medium text-sm sm:text-base mr-2" style={{ color: msgUser?.color || '#fff' }}>
                      {msg.username || msgUser?.username}
                    </span>
                    {msgUser?.role === UserRole.ADMIN && (
                      <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                        ADMIN
                      </span>
                    )}
                    <span className="text-[11px] sm:text-xs text-discord-text-muted ml-1 sm:ml-2 font-medium">
                      {msgTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-discord-text-normal whitespace-pre-wrap leading-[1.3rem] sm:leading-[1.375rem]">{msg.content}</p>
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
                  </div>
                )}
              </div>
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
                  <span className="font-medium text-sm sm:text-base mr-2 text-[#5865F2]">
                    UPG
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                    BOT
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-xs text-discord-text-muted ml-2">escribiendo...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="px-3 sm:px-4 pt-2 shrink-0 relative" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        {/* Sugerencias de menciones */}
        {showMentionSuggestions && mentionSuggestions.length > 0 && (
          <div className="absolute bottom-full left-3 sm:left-4 right-3 sm:right-4 mb-2 bg-[#2f3136] rounded-lg shadow-2xl border border-gray-800 overflow-hidden max-h-64 overflow-y-auto z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="py-2">
              <div className="px-3 py-1 text-xs font-semibold text-discord-text-muted uppercase">
                Mencionar
              </div>
              {mentionSuggestions.map((user, index) => (
                <button
                  key={user.id}
                  onClick={() => completeMention(user)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`w-full px-3 py-2 flex items-center gap-3 transition-all duration-150 ${
                    index === selectedSuggestionIndex 
                      ? 'bg-discord-blurple scale-[1.02] shadow-lg' 
                      : 'hover:bg-[#36373d] hover:scale-[1.01]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gray-600">
                    <SafeImage 
                      src={user.avatar || ''} 
                      alt={user.username} 
                      className="w-full h-full object-cover" 
                      fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=5865F2&color=fff&size=128`} 
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white flex items-center gap-2">
                      {user.username}
                      {user.id === 'bot' && (
                        <span className="text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded uppercase">
                          Bot
                        </span>
                      )}
                    </div>
                    {user.id === 'bot' && (
                      <div className="text-xs text-discord-text-muted">
                        Bot de la comunidad UPG
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-discord-text-muted">
                    {index === selectedSuggestionIndex && (
                      <span className="bg-gray-700 px-2 py-0.5 rounded">Tab</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className={`bg-[#383a40] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-center transition-all duration-200 ${
          showMentionSuggestions ? 'ring-2 ring-discord-blurple shadow-lg shadow-discord-blurple/20' : ''
        }`}>
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={`Enviar mensaje a #${currentChannel.name}`}
              className="bg-transparent w-full text-sm sm:text-base text-discord-text-normal placeholder-discord-text-muted outline-none min-h-[44px] transition-all"
              aria-label="Escribir mensaje"
              maxLength={2000}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInterface);
