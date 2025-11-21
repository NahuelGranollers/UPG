import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../types';
import { Hash, Menu } from 'lucide-react';
import SafeImage from './SafeImage';
import { ChannelData } from '../App';

interface ChatInterfaceProps {
  currentUser: User;
  users: User[];
  currentChannel: ChannelData;
  onMobileMenuClick: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  users,
  currentChannel,
  onMobileMenuClick
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Socket.IO reference
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Crea la conexión solo una vez
    if (!socketRef.current && typeof window !== 'undefined' && (window as any).io) {
      socketRef.current = (window as any).io('https://mensajeria-ksc7.onrender.com', {
        transports: ['websocket']
      });
    }
    const socket = socketRef.current;

    // Registrar usuario y canal (solo la primera vez)
    socket.emit('user:join', {
      id: currentUser.id,
      username: currentUser.username,
      avatar: currentUser.avatar || '',
      status: 'online'
    });
    socket.emit('channel:join', { channelId: currentChannel.id, userId: currentUser.id });

    // Recibe historial de mensajes
    socket.on('channel:history', (data: any) => {
      if (data && data.messages) {
        setMessages(
          data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        );
      }
    });

    // Recibe mensajes nuevos en tiempo real
    socket.on('message:received', (msg: any) => {
      setMessages(prev => [
        ...prev,
        { ...msg, timestamp: new Date(msg.timestamp) },
      ]);
    });

    // Cleanup al desmontar
    return () => {
      socket.off('channel:history');
      socket.off('message:received');
    };
    // eslint-disable-next-line
  }, [currentChannel.id]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const socket = socketRef.current;
    if (socket) {
      socket.emit('message:send', {
        channelId: currentChannel.id,
        content: inputText,
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        timestamp: new Date().toISOString()
      });
    }
    setInputText('');
  };

  return (
    <div className="flex-1 flex flex-col bg-discord-chat min-w-0">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0">
        <div className="flex items-center text-discord-text-header font-bold truncate">
          <button 
            onClick={onMobileMenuClick}
            className="md:hidden mr-3 text-discord-text-muted hover:text-white"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <Hash size={24} className="text-discord-text-muted mr-2 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
        </div>
      </div>
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 flex flex-col">
        <div className="mt-auto">
          <div className="mb-8 mt-4">
            <div className="w-16 h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-4">
              <Hash size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">¡Bienvenido a #{currentChannel.name}!</h1>
            <p className="text-discord-text-muted">Este es el chat real del canal.</p>
          </div>
          <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
          {messages.map((msg) => (
            <div key={msg.id} className="flex pr-4 mt-4 py-0.5 hover:bg-[#2e3035]">
              <div className="w-10 h-10 rounded-full bg-gray-600 mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer">
                <SafeImage src={msg.avatar || ''} alt={msg.username || ''} className="w-full h-full object-cover" fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.username || '')}&background=5865F2&color=fff&size=128`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <span className="font-medium text-base mr-2" style={{ color: '#fff' }}>
                    {msg.username}
                  </span>
                  <span className="text-xs text-discord-text-muted ml-2 font-medium">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-discord-text-normal whitespace-pre-wrap leading-[1.375rem]">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Input */}
      <div className="px-4 pb-6 pt-2 shrink-0">
        <div className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center">
          <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Enviar mensaje a #${currentChannel.name}`}
              className="bg-transparent w-full text-discord-text-normal placeholder-discord-text-muted outline-none"
              maxLength={2000}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
