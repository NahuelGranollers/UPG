import React, { useState, useEffect, useRef } from 'react';
import { Message, User, UserRole } from '../types';
import { Hash, Menu, Trash2, Shield, Ban } from 'lucide-react';
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
  
  const isAdmin = currentUser?.role === UserRole.ADMIN;

  // Socket.IO reference - Obtener instancia global del socket
  const getSocket = () => {
    return (window as any).socketInstance;
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [propMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText);
    setInputText('');
  };

  // Funciones de administrador
  const handleDeleteMessage = (messageId: string) => {
    if (!isAdmin || !currentUser) return;
    
    const socket = (window as any).socketInstance;
    if (socket) {
      socket.emit('admin:delete-message', { 
        messageId, 
        channelId: currentChannel.id,
        adminId: currentUser.id
      });
    }
  };

  const handleClearChannel = () => {
    if (!isAdmin) return;
    
    if (confirm(`┬┐Est├ís seguro de que quieres eliminar todos los mensajes de #${currentChannel.name}?`)) {
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:clear-channel', {
          channelId: currentChannel.id,
          adminId: currentUser.id
        });
      }
    }
  };

  const handleBanUser = (userId: string, username: string) => {
    if (!isAdmin || !currentUser || userId === currentUser.id) return;
    
    if (confirm(`┬┐Est├ís seguro de que quieres banear a ${username}? Esta acci├│n tambi├®n bloquear├í su IP.`)) {
      const socket = getSocket();
      if (socket) {
        socket.emit('admin:ban-user', {
          userId,
          username,
          adminId: currentUser.id
        });
      }
    }
  };

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
      <div className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col" style={{ maxHeight: '100%' }}>
        <div className="mt-auto">
          <div className="mb-8 mt-4">
            <div className="w-16 h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-4">
              <Hash size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">┬íBienvenido a #{currentChannel.name}!</h1>
            <p className="text-discord-text-muted">Este es el chat real del canal.</p>
          </div>
          <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
          {propMessages.map((msg) => {
            const msgUser = users.find(u => u.id === msg.userId);
            const msgTimestamp = typeof msg.timestamp === 'string' ? new Date(msg.timestamp) : msg.timestamp;
            
            return (
              <div 
                key={msg.id} 
                className="group flex pr-4 mt-4 py-0.5 hover:bg-[#2e3035] relative"
                onMouseEnter={() => setHoveredMessageId(msg.id)}
                onMouseLeave={() => setHoveredMessageId(null)}
              >
                <div className="w-10 h-10 rounded-full bg-gray-600 mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer">
                  <SafeImage 
                    src={msg.avatar || msgUser?.avatar || ''} 
                    alt={msg.username || msgUser?.username || ''} 
                    className="w-full h-full object-cover" 
                    fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.username || msgUser?.username || '')}&background=5865F2&color=fff&size=128`} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className="font-medium text-base mr-2" style={{ color: msgUser?.color || '#fff' }}>
                      {msg.username || msgUser?.username}
                    </span>
                    {msgUser?.role === UserRole.ADMIN && (
                      <span className="text-[10px] bg-discord-blurple px-1.5 py-0.5 rounded mr-2">
                        ADMIN
                      </span>
                    )}
                    <span className="text-xs text-discord-text-muted ml-2 font-medium">
                      {msgTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-discord-text-normal whitespace-pre-wrap leading-[1.375rem]">{msg.content}</p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="px-4 pt-2 shrink-0" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
        <div className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center">
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Enviar mensaje a #${currentChannel.name}`}
              className="bg-transparent w-full text-discord-text-normal placeholder-discord-text-muted outline-none"
              aria-label="Escribir mensaje"
              maxLength={2000}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
