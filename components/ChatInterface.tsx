import React, { useState, useEffect, useRef } from 'react';
import { Message, User } from '../types';
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, Smile, Sticker, Menu, AlertCircle } from 'lucide-react';
import { generateBotResponse } from '../services/geminiService';
import { ChannelData } from '../App';
import SafeImage from './SafeImage';
import { formatMessage, getPlainText } from '../utils/messageFormatter';
import { sendMessage as sendFirebaseMessage, subscribeToMessages, isFirebaseConfigured } from '../services/firebaseService';
import { initSocket, getSocketService } from '../services/socketService';

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

const MAX_MESSAGE_LENGTH = 2000;
const MAX_MESSAGES_PER_MINUTE = 10;

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentUser, users, currentChannel, onMobileMenuClick }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState(0);
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Channel for cross-tab communication (fallback si Firebase/Socket.IO no está configurado)
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const socketServiceRef = useRef<any>(null);
  const [useFirebase, setUseFirebase] = useState(false);
  const [useSocketIO, setUseSocketIO] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  // Initialize Socket.IO
  useEffect(() => {
    // Verificar si Socket.IO está disponible
    if (typeof window !== 'undefined' && (window as any).io) {
      try {
        const socketService = initSocket('https://mensajeria-three.vercel.app/');
        socketServiceRef.current = socketService;
        setUseSocketIO(true);

        // Suscribirse a cambios de conexión
        const unsubscribeConnection = socketService.onConnectionChange((connected) => {
          setSocketConnected(connected);
        });

        return () => {
          unsubscribeConnection();
          socketService.disconnect();
        };
      } catch (error) {
        console.warn('Error inicializando Socket.IO:', error);
        setUseSocketIO(false);
      }
    } else {
      console.warn('Socket.IO no está disponible. Asegúrate de que el script esté cargado.');
      setUseSocketIO(false);
    }
  }, []);

  // Check if Firebase is configured
  useEffect(() => {
    setUseFirebase(isFirebaseConfigured());
  }, []);

  // Load messages from Socket.IO, Firebase, or LocalStorage
  useEffect(() => {
    if (useSocketIO && socketServiceRef.current) {
      // Usar Socket.IO para chat en tiempo real
      const socketService = socketServiceRef.current;
      
      const unsubscribe = socketService.subscribeToMessages(currentChannel.id, (socketMsg: any) => {
        const message: Message = {
          id: socketMsg.id,
          userId: socketMsg.userId,
          content: socketMsg.content,
          timestamp: socketMsg.timestamp instanceof Date ? socketMsg.timestamp : new Date(socketMsg.timestamp),
          attachments: socketMsg.attachments || [],
        };

        setMessages(prev => {
          const exists = prev.find(p => p.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
        scrollToBottom();
      });

      return () => {
        unsubscribe();
      };
    } else if (useFirebase) {
      // Usar Firebase para chat en tiempo real
      const unsubscribe = subscribeToMessages(currentChannel.id, (firebaseMessages) => {
        setMessages(firebaseMessages);
        scrollToBottom();
      });

      return () => {
        unsubscribe();
      };
    } else {
      // Fallback: usar LocalStorage y BroadcastChannel
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
    }
  }, [currentChannel.id, useFirebase]);

  // Save to local storage whenever messages change (solo si no usamos Firebase)
  useEffect(() => {
    if (!useFirebase && messages.length > 0) {
      const storageKey = `upg_messages_${currentChannel.id}`;
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, currentChannel.id, useFirebase]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sanitize input - just trim, formatting will be done by formatter
  const sanitizeInput = (text: string): string => {
    return text.trim();
  };

  // Reset message count every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageCount(0);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const trimmedText = inputText.trim();
    
    // Validation
    if (!trimmedText) return;
    
    if (trimmedText.length > MAX_MESSAGE_LENGTH) {
      setError(`El mensaje es demasiado largo (máximo ${MAX_MESSAGE_LENGTH} caracteres)`);
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastMessageTime < 6000) { // 6 seconds minimum between messages
      setError('Espera un momento antes de enviar otro mensaje');
      return;
    }

    if (messageCount >= MAX_MESSAGES_PER_MINUTE) {
      setError(`Has enviado demasiados mensajes. Espera un minuto.`);
      return;
    }

    try {
      // Sanitize content
      const sanitizedContent = sanitizeInput(trimmedText);

      const userQuery = trimmedText;
      setInputText('');
      setMessageCount(prev => prev + 1);
      setLastMessageTime(now);

      // Enviar mensaje a Socket.IO, Firebase o BroadcastChannel
      if (useSocketIO && socketServiceRef.current) {
        // Enviar a Socket.IO
        socketServiceRef.current.sendMessage(
          currentChannel.id,
          sanitizedContent,
          currentUser.id,
          currentUser.username,
          currentUser.avatar
        );
      } else if (useFirebase) {
        // Enviar a Firebase
        try {
          await sendFirebaseMessage(currentChannel.id, {
            content: sanitizedContent,
            attachments: [],
          }, currentUser.id);
        } catch (error) {
          console.error('Error enviando mensaje a Firebase:', error);
          setError('Error al enviar el mensaje. Intenta de nuevo.');
          return;
        }
      } else {
        // Fallback: usar estado local y BroadcastChannel
        const newMessage: Message = {
          id: Date.now().toString() + Math.random().toString(36).substring(2),
          userId: currentUser.id,
          content: sanitizedContent,
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
      }

      // Check for bot interaction
      if ((currentChannel.id === 'general' || currentChannel.id === 'comandos' || userQuery.toLowerCase().startsWith('/ai')) && 
         (userQuery.toLowerCase().includes('bot') || userQuery.toLowerCase().startsWith('/'))) {
         
         setIsTyping(true);
         
         try {
           const history = messages.slice(-5).map(m => ({
               role: m.userId === currentUser.id ? 'user' : 'model',
               content: m.content
           }));

           const responseText = await generateBotResponse(history, userQuery);
           
           // Enviar respuesta del bot
           if (useSocketIO && socketServiceRef.current) {
             socketServiceRef.current.sendMessage(
               currentChannel.id,
               responseText,
               'bot',
               'UPG Bot',
               '/upg.png'
             );
           } else if (useFirebase) {
             try {
               await sendFirebaseMessage(currentChannel.id, {
                 content: responseText,
                 attachments: [],
               }, 'bot');
             } catch (error) {
               console.error('Error enviando respuesta del bot a Firebase:', error);
             }
           } else {
             // Fallback: estado local
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
           }
         } catch (error) {
           console.error('Error generating bot response:', error);
           setError('Error al generar respuesta del bot. Intenta más tarde.');
         } finally {
           setIsTyping(false);
         }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error al enviar el mensaje. Intenta de nuevo.');
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
      <div className="h-12 flex items-center justify-between px-4 shadow-sm border-b border-gray-900/20 shrink-0" role="banner">
        <div className="flex items-center text-discord-text-header font-bold truncate">
          {/* Mobile Hamburger Menu */}
          <button 
            onClick={onMobileMenuClick} 
            className="md:hidden mr-3 text-discord-text-muted hover:text-white"
            aria-label="Abrir menú"
            aria-expanded="false"
          >
            <Menu size={24} />
          </button>

          <Hash size={24} className="text-discord-text-muted mr-2 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
          <div className="hidden md:block h-6 w-[1px] bg-discord-text-muted/30 mx-4 shrink-0"></div>
          <span className="hidden md:block text-xs font-normal text-discord-text-muted truncate">{currentChannel.description}</span>
          {/* Connection Status Indicator */}
          {useSocketIO && (
            <div className="ml-2 flex items-center">
              <div className={`w-2 h-2 rounded-full ${socketConnected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} title={socketConnected ? 'Conectado' : 'Desconectado'}></div>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 md:space-x-4 text-discord-text-muted shrink-0">
          <button aria-label="Notificaciones" className="hidden md:block hover:text-discord-text-header cursor-pointer">
            <Bell size={24} />
          </button>
          <button aria-label="Mensajes fijados" className="hover:text-discord-text-header cursor-pointer">
            <Pin size={24} />
          </button>
          <button aria-label="Lista de usuarios" className="md:hidden hover:text-discord-text-header cursor-pointer">
            <Users size={24} />
          </button>
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Buscar" 
              className="bg-discord-dark text-sm text-discord-text-normal rounded-md px-2 py-1 w-24 lg:w-36 transition-all focus:w-60 outline-none"
              aria-label="Buscar mensajes"
            />
            <Search size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-discord-text-muted pointer-events-none" aria-hidden="true" />
          </div>
          <button aria-label="Bandeja de entrada" className="hidden md:block hover:text-discord-text-header cursor-pointer">
            <Inbox size={24} />
          </button>
          <button aria-label="Ayuda" className="hidden md:block hover:text-discord-text-header cursor-pointer">
            <HelpCircle size={24} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 custom-scrollbar flex flex-col" role="log" aria-label={`Mensajes del canal ${currentChannel.name}`}>
        <div className="mt-auto"> {/* Push messages to bottom initially if few */}
            
            {/* Welcome Message */}
            <div className="mb-8 mt-4" role="region" aria-label="Mensaje de bienvenida">
                <div className="w-16 h-16 bg-discord-text-muted/20 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
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
                           <SafeImage 
                             src={msgUser.avatar} 
                             alt={msgUser.username} 
                             className="w-full h-full object-cover"
                             fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(msgUser.username)}&background=5865F2&color=fff&size=128`}
                           />
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
                            <SafeImage 
                              src={msg.content} 
                              alt="GIF" 
                              className="mt-1 rounded-lg max-w-[300px] border border-gray-800"
                              showFallbackIcon={false}
                            />
                        ) : (
                            <p 
                              className={`text-discord-text-normal whitespace-pre-wrap leading-[1.375rem]`}
                              dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                              aria-label={getPlainText(msg.content)}
                            />
                        )}
                    </div>
                </div>
                );
            })}
             {isTyping && (
                <div className="ml-14 mt-2 text-discord-text-muted text-xs font-bold flex items-center" role="status" aria-live="polite">
                    <div className="flex space-x-1 mr-2">
                        <div className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-discord-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    UPG Bot está escribiendo...
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 pb-6 pt-2 shrink-0">
        {error && (
          <div className="mb-2 px-3 py-2 bg-red-500/20 border border-red-500/50 rounded-md text-red-400 text-sm flex items-center">
            <AlertCircle size={16} className="mr-2" />
            {error}
          </div>
        )}
        <div className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center">
            <button 
              type="button"
              className="text-discord-text-muted hover:text-discord-text-header mr-4 sticky hidden sm:block"
              aria-label="Adjuntar archivo"
            >
                <PlusCircle size={24} className="bg-discord-text-muted rounded-full text-discord-chat p-0.5 hover:text-white transition-colors" />
            </button>
            <form onSubmit={handleSendMessage} className="flex-1 flex items-center">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                        setInputText(e.target.value);
                        setError(null);
                      }
                    }}
                    placeholder={`Enviar mensaje a #${currentChannel.name}`}
                    className="bg-transparent w-full text-discord-text-normal placeholder-discord-text-muted outline-none"
                    maxLength={MAX_MESSAGE_LENGTH}
                    aria-label="Escribir mensaje"
                />
                {inputText.length > MAX_MESSAGE_LENGTH * 0.9 && (
                  <span className={`text-xs ml-2 ${inputText.length >= MAX_MESSAGE_LENGTH ? 'text-red-400' : 'text-discord-text-muted'}`}>
                    {inputText.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                )}
            </form>
            <div className="flex items-center space-x-3 text-discord-text-muted">
                <Gift size={24} className="hover:text-discord-text-header cursor-pointer hidden sm:block" aria-label="Enviar regalo" />
                <Sticker size={24} className="hover:text-discord-text-header cursor-pointer hidden sm:block" aria-label="Enviar sticker" />
                <Smile size={24} className="hover:text-discord-text-header cursor-pointer" aria-label="Emoji" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;