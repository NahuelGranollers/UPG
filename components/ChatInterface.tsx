import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../types';
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, Smile, Sticker, Menu } from 'lucide-react';
import { generateBotResponse } from '../services/geminiService';
import { ChannelData } from '../App';

interface ChatInterfaceProps {
  currentUser: User;
  users: User[];
  currentChannel: ChannelData;
  onMobileMenuClick: () => void;
}

const INITIAL_MESSAGES: Record<string, Message[]> = {
    'general': [
        { id: '1', userId: 'bot', content: '¡Bienvenido al servidor UPG! 🎮', timestamp: new Date(Date.now() - 100000) },
        { id: '2', userId: '2', content: '¿Alguien para unas partidas de Valorant?', timestamp: new Date(Date.now() - 80000) },
        { id: '3', userId: '3', content: 'Yo me apunto en 5 min.', timestamp: new Date(Date.now() - 60000) },
    ],
    'memes': [
        { id: 'm1', userId: '3', content: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWJ4eXJ6aHZ6M3J6aHZ6M3J6aHZ6M3J6aHZ6M3J6aHZ6M3J6/Lq0h93752f6J9t6j6z/giphy.gif', timestamp: new Date(Date.now() - 300000) },
        { id: 'm2', userId: '1', content: 'Jajaja clásico', timestamp: new Date(Date.now() - 120000) },
    ],
    'comandos': [
        { id: 'c1', userId: 'bot', content: 'Lista de comandos:\n/rank - Ver tu nivel\n/play - Música\n/poll - Crear votación', timestamp: new Date(Date.now() - 900000) },
        { id: 'c2', userId: '4', content: '/rank', timestamp: new Date(Date.now() - 60000) },
        { id: 'c3', userId: 'bot', content: '👑 Nivel: 42 (Experto)', timestamp: new Date(Date.now() - 59000) },
    ]
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentUser, users, currentChannel, onMobileMenuClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Channel for cross-tab communication
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  // Load messages from LocalStorage or Initial
  useEffect(() => {
      const storageKey = `upg_messages_${currentChannel.id}`;
      const savedMessages = localStorage.getItem(storageKey);
      
      if (savedMessages) {
          // Rehydrate dates from strings
          const parsed = JSON.parse(savedMessages).map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp)
          }));
          setMessages(parsed);
      } else {
          setMessages(INITIAL_MESSAGES[currentChannel.id] || []);
      }

      // Setup BroadcastChannel for Real-Time effect across tabs
      const bc = new BroadcastChannel('upg_chat_channel');
      broadcastChannelRef.current = bc;
      
      bc.onmessage = (event) => {
          if (event.data.type === 'NEW_MESSAGE' && event.data.channelId === currentChannel.id) {
              const incomingMsg = {
                  ...event.data.message,
                  timestamp: new Date(event.data.message.timestamp)
              };
              setMessages(prev => {
                  const exists = prev.find(p => p.id === incomingMsg.id);
                  if (exists) return prev;
                  const newHistory = [...prev, incomingMsg];
                  // Save to local storage to keep sync
                  localStorage.setItem(storageKey, JSON.stringify(newHistory));
                  return newHistory;
              });
          }
      };

      return () => {
          bc.close();
      };
  }, [currentChannel.id]);

  // Save to local storage whenever messages change
  useEffect(() => {
      if (messages.length > 0) {
        const storageKey = `upg_messages_${currentChannel.id}`;
        localStorage.setItem(storageKey, JSON.stringify(messages));
      }
      scrollToBottom();
  }, [messages, currentChannel.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      userId: currentUser.id,
      content: inputText,
      timestamp: new Date(),
    };

    // Update local state
    setMessages(prev => [...prev, newMessage]);
    
    // Broadcast to other tabs (Real-time effect)
    if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
            type: 'NEW_MESSAGE',
            channelId: currentChannel.id,
            message: newMessage
        });
    }

    const userQuery = inputText;
    setInputText('');

    // Check for bot interaction
    if ((currentChannel.id === 'general' || currentChannel.id === 'comandos' || userQuery.toLowerCase().startsWith('/ai')) && 
       (userQuery.toLowerCase().includes('bot') || userQuery.toLowerCase().startsWith('/'))) {
       
       setIsTyping(true);
       
       const history = messages.slice(-5).map(m => ({
           role: m.userId === currentUser.id ? 'user' : 'model',
           content: m.content
       }));

       const responseText = await generateBotResponse(history, userQuery);
       
       const botMessage: Message = {
           id: (Date.now() + 1).toString(),
           userId: 'bot',
           content: responseText,
           timestamp: new Date()
       };

       setMessages(prev => [...prev, botMessage]);
       
       // Broadcast Bot Message too
       if (broadcastChannelRef.current) {
            broadcastChannelRef.current.postMessage({
                type: 'NEW_MESSAGE',
                channelId: currentChannel.id,
                message: botMessage
            });
       }
       
       setIsTyping(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
     return date.toLocaleDateString([], {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex-1 flex flex-col bg-discord-chat min-w-0">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0">
        <div className="flex items-center text-discord-text-header font-bold truncate">
          {/* Mobile Hamburger Menu */}
          <button onClick={onMobileMenuClick} className="md:hidden mr-3 text-discord-text-muted hover:text-white">
            <Menu size={24} />
          </button>

          <Hash size={24} className="text-discord-text-muted mr-2 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
          <div className="hidden md:block h-6 w-[1px] bg-discord-text-muted/30 mx-4 shrink-0"></div>
          <span className="hidden md:block text-xs font-normal text-discord-text-muted truncate">{currentChannel.description}</span>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 text-discord-text-muted shrink-0">
          <Bell size={24} className="hidden md:block hover:text-discord-text-header cursor-pointer" />
          <Pin size={24} className="hover:text-discord-text-header cursor-pointer" />
          <Users size={24} className="md:hidden hover:text-discord-text-header cursor-pointer" />
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Buscar" 
              className="bg-discord-dark text-sm text-discord-text-normal rounded-md px-2 py-1 w-24 lg:w-36 transition-all focus:w-60 outline-none"
            />
            <Search size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-discord-text-muted" />
          </div>
          <Inbox size={24} className="hidden md:block hover:text-discord-text-header cursor-pointer" />
          <HelpCircle size={24} className="hidden md:block hover:text-discord-text-header cursor-pointer" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 custom-scrollbar flex flex-col">
        <div className="mt-auto"> {/* Push messages to bottom initially if few */}
            
            {/* Welcome Message */}
            <div className="mb-8 mt-4">
                <div className="w-16 h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-4">
                    <Hash size={40} className="text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">¡Te damos la bienvenida a #{currentChannel.name}!</h1>
                <p className="text-discord-text-muted">Este es el comienzo del canal #{currentChannel.name}.</p>
            </div>

            <div className="h-[1px] bg-discord-text-muted/20 w-full my-4" />
            
            {messages.map((msg, index) => {
                // Try to find user in the list, or create a dummy visual if it's a guest from another tab
                let msgUser = users.find(u => u.id === msg.userId);
                if (!msgUser && msg.userId.startsWith('user-')) {
                     // It's a guest from another tab, probably
                     msgUser = {
                         id: msg.userId,
                         username: 'Invitado Online', 
                         avatar: `https://picsum.photos/seed/${msg.userId}/200/200`,
                         status: 'online',
                         color: '#3ba55c'
                     }
                     // If it is CURRENT user (reloaded page scenario where currentUser obj changed but ID persisted? Unlikely in this setup but good fallback)
                     if (msg.userId === currentUser.id) msgUser = currentUser;
                }
                // Final fallback
                if (!msgUser) msgUser = { id: 'unknown', username: 'Usuario', avatar: '', color: '#fff', status: 'offline' };

                const prevMsg = messages[index - 1];
                const isSameUser = prevMsg && prevMsg.userId === msg.userId && (msg.timestamp.getTime() - prevMsg.timestamp.getTime() < 300000); 

                const isGif = msg.content.startsWith('http') && (msg.content.includes('.gif') || msg.content.includes('giphy'));

                return (
                <div key={msg.id} className={`group flex pr-4 ${isSameUser ? 'mt-0.5 py-0.5 hover:bg-[#2e3035]' : 'mt-4 py-0.5 hover:bg-[#2e3035]'}`}>
                    {!isSameUser ? (
                        <div className="w-10 h-10 rounded-full bg-gray-600 mr-4 mt-0.5 overflow-hidden shrink-0 cursor-pointer active:translate-y-[1px]">
                           <img src={msgUser.avatar} alt={msgUser.username} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-10 mr-4 shrink-0 flex justify-end opacity-0 group-hover:opacity-100 text-[10px] text-discord-text-muted pt-1">
                            {formatTime(msg.timestamp)}
                        </div>
                    )}

                    <div className="flex-1 min-w-0">
                        {!isSameUser && (
                            <div className="flex items-center">
                                <span className="font-medium text-base hover:underline cursor-pointer mr-2" style={{ color: msgUser.color }}>
                                    {msgUser.username}
                                </span>
                                {msgUser.isBot && (
                                    <span className="bg-[#5865F2] text-white text-[10px] px-1.5 rounded-[4px] flex items-center h-[15px] uppercase font-bold">Bot</span>
                                )}
                                <span className="text-xs text-discord-text-muted ml-2 font-medium">
                                    {formatDate(msg.timestamp)}
                                </span>
                            </div>
                        )}
                        {isGif ? (
                            <img src={msg.content} alt="GIF" className="mt-1 rounded-lg max-w-[300px] border border-gray-800" />
                        ) : (
                            <p className={`text-discord-text-normal whitespace-pre-wrap leading-[1.375rem]`}>
                                {msg.content}
                            </p>
                        )}
                    </div>
                </div>
                );
            })}
             {isTyping && (
                <div className="ml-14 mt-2 text-discord-text-muted text-xs font-bold animate-pulse">
                    UPG Bot está escribiendo...
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 pt-2 shrink-0">
        <div className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center">
            <button className="text-discord-text-muted hover:text-discord-text-header mr-4 sticky hidden sm:block">
                <PlusCircle size={24} className="bg-discord-text-muted rounded-full text-discord-chat p-0.5 hover:text-white transition-colors" />
            </button>
            <form onSubmit={handleSendMessage} className="flex-1">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Enviar mensaje a #${currentChannel.name}`}
                    className="bg-transparent w-full text-discord-text-normal placeholder-discord-text-muted outline-none"
                />
            </form>
            <div className="flex items-center space-x-3 text-discord-text-muted">
                <Gift size={24} className="hover:text-discord-text-header cursor-pointer hidden sm:block" />
                <Sticker size={24} className="hover:text-discord-text-header cursor-pointer hidden sm:block" />
                <Smile size={24} className="hover:text-discord-text-header cursor-pointer" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;