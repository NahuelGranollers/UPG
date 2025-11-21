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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser?.role]);

  // Socket.IO reference - Obtener instancia global del socket (memoizado)
  const getSocket = useCallback(() => {
    return (window as any).socketInstance;
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [propMessages]);

  const handleSendMessage = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText);
    setInputText('');
  }, [inputText, onSendMessage]);

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
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="px-3 sm:px-4 pt-2 shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <div className="bg-[#383a40] rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-center">
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Enviar mensaje a #${currentChannel.name}`}
              className="bg-transparent w-full text-sm sm:text-base text-discord-text-normal placeholder-discord-text-muted outline-none min-h-[44px]"
              aria-label="Escribir mensaje"
              maxLength={2000}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInterface);
