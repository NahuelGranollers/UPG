import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { toast } from 'sonner';
import { useSocket } from '../context/SocketContext';
import { useUsers } from '../context/UserContext';
import { useChat } from '../hooks/useChat';
import { Message, User, UserRole } from '../types';
import { Hash, Menu } from 'lucide-react';
import MessageInput from './MessageInput';
import { MessageList } from './MessageList';

interface ChatInterfaceProps {
  currentUser: User;
  currentChannel: { id: string; name: string };
  onMenuToggle: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  currentUser,
  currentChannel,
  onMenuToggle,
}) => {
  const { users, userColors } = useUsers();
  const { messages, sendMessage } = useChat(currentChannel.id);
  const { socket } = useSocket();

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
    const combined = [...(messages || []), ...localMessages];
    
    // Filter out messages with invalid timestamps or missing content
    const validMessages = combined.filter(msg => {
      if (!msg || !msg.timestamp) return false;
      const date = new Date(msg.timestamp);
      return !isNaN(date.getTime());
    });

    const sorted = validMessages.sort((a, b) => {
      const ta = new Date(a.timestamp).getTime();
      const tb = new Date(b.timestamp).getTime();

      // If timestamps are equal, prioritize user messages over bot messages
      if (ta === tb) {
        if (a.userId === 'bot' && b.userId !== 'bot') return 1;
        if (a.userId !== 'bot' && b.userId === 'bot') return -1;
        return 0;
      }

      return ta - tb;
    });
    // Limitar a los últimos 100 mensajes para performance
    return sorted.slice(-100);
  }, [messages, localMessages]);

  // Auto-scroll to bottom when new messages arrive (only if user is near bottom)
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement?.parentElement;
    if (container && messagesEndRef.current && orderedMessages.length > 0) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;

      // Only auto-scroll if user is near bottom or at bottom, or if it's a new message from the current user
      const lastMessage = orderedMessages[orderedMessages.length - 1];
      const shouldAutoScroll = isNearBottom || isAtBottom ||
        (lastMessage && lastMessage.userId === currentUser.id);

      if (shouldAutoScroll) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
      }
    }
  }, [orderedMessages, currentUser.id]);

  // Scroll to bottom when changing channels
  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, 100);
  }, [currentChannel.id]);

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
    const normalUsers = (users || []).filter(u => !u.isBot && u.id !== 'bot');
    return [...bots, ...normalUsers];
  }, [users]);

  // Filtrar sugerencias de menciones
  const mentionSuggestions = useMemo(() => {
    if (!mentionSearch) return mentionableUsers;
    const search = mentionSearch.toLowerCase();
    return mentionableUsers.filter(u => u.username.toLowerCase().includes(search));
  }, [mentionSearch, mentionableUsers]);

  const isAdmin = useMemo(() => currentUser?.role === UserRole.ADMIN, [currentUser?.role]);

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
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showMentionSuggestions && mentionSuggestions.length > 0) {
        if (e.key === 'Escape') {
          setShowMentionSuggestions(false);
          e.preventDefault();
        }
      }
    },
    [showMentionSuggestions, mentionSuggestions.length]
  );

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
        if (inputRef.current) {
          const newCursorPos = before.length + user.username.length + 2;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          try {
            inputRef.current.focus();
          } catch (e) {
            // Ignorar errores de foco
          }
        }
      }, 0);
    },
    [inputText, mentionStartPos]
  );

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputText.trim()) return;
      const lowerInput = inputText.toLowerCase();
      const mentionsBot = lowerInput.includes('@upg');
      const localId = 'local-' + Date.now();
      // Agregar mensaje local inmediatamente para feedback visual
      const localMessage: Message & { localId?: string } = {
        id: localId,
        localId,
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        content: inputText,
        timestamp: new Date().toISOString(), // Use current time consistently
        channelId: currentChannel.id,
        status: 'sending',
      } as any;
      setLocalMessages(prev => [...prev, localMessage]);
      // Clear input immediately for better UX
      setInputText('');
      setShowMentionSuggestions(false);
      if (mentionsBot) setIsBotTyping(true);

      try {
        const res = await sendMessage(inputText, localId);
        if (res && res.ok === false) {
          // Remove optimistic local message on failure
          setLocalMessages(prev =>
            prev.filter(m => !(m as any).localId || (m as any).localId !== localId)
          );
          toast.error(res.error || 'Mensaje no enviado');
        }
      } catch (e) {
        setLocalMessages(prev =>
          prev.filter(m => !(m as any).localId || (m as any).localId !== localId)
        );
        toast.error('Error enviando mensaje');
      }
    },
    [inputText, sendMessage, currentUser, currentChannel.id]
  );

  // Auto-enfocar el input cuando se entra al chat o cambia de canal
  useEffect(() => {
    // Pequeño delay para asegurar que el componente esté completamente renderizado
    const timeoutId = setTimeout(() => {
      if (inputRef.current) {
        try {
          inputRef.current.focus();
        } catch (e) {
          // Ignorar errores de foco que pueden ser causados por extensiones
          console.debug('Error focusing input:', e);
        }
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentChannel.id]);

  // Check if bot is typing (only if last message wasn't from bot)
  const shouldShowBotTyping =
    isBotTyping && ((messages || []).length === 0 || messages[messages.length - 1]?.userId !== 'bot');

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



  // Funciones de administrador
  const handleDeleteMessage = useCallback(
    (messageId: string) => {
      if (!isAdmin || !currentUser || !socket) return;
      socket.emit('admin:delete-message', {
        messageId,
        channelId: currentChannel.id,
        adminId: currentUser.id,
      });
    },
    [isAdmin, currentUser, currentChannel.id, socket]
  );

  const handleBanUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id || !socket) return;
      if (
        window.confirm(
          `¿Estás seguro de que quieres banear a ${username}? Esta acción también bloqueará su IP.`
        )
      ) {
        socket.emit('admin:ban-user', {
          userId,
          username,
          adminId: currentUser.id,
        });
      }
    },
    [isAdmin, currentUser, socket]
  );

  const handleKickUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id || !socket) return;
      if (window.confirm(`¿Estás seguro de que quieres expulsar a ${username}?`)) {
        socket.emit('admin:kick-user', {
          userId,
          username,
          adminId: currentUser.id,
        });
      }
    },
    [isAdmin, currentUser, socket]
  );

  // Nueva acción: silenciar usuario
  const handleSilenceUser = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id || !socket) return;
      if (
        window.confirm(
          `¿Silenciar a ${username}? No podrá enviar mensajes hasta que lo des-silencies.`
        )
      ) {
        socket.emit('admin:silence-user', {
          userId,
          adminId: currentUser.id,
        });
      }
    },
    [isAdmin, currentUser, socket]
  );

  // Nueva acción: cambiar color de usuario
  const handleChangeColor = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id || !socket) return;
      const newColor = prompt(
        `Nuevo color HEX para ${username} (ejemplo: #ff0000):`,
        '#' + Math.floor(Math.random() * 16777215).toString(16)
      );
      if (newColor && /^#[0-9A-Fa-f]{6}$/.test(newColor)) {
        socket.emit('admin:change-color', {
          userId,
          color: newColor,
          adminId: currentUser.id,
        });
      } else {
        alert('Color inválido. Usa formato HEX (#RRGGBB)');
      }
    },
    [isAdmin, currentUser, socket]
  );

  // Nueva acción: modo troll
  const handleTrollMode = useCallback(
    (userId: string, username: string) => {
      if (!isAdmin || !currentUser || userId === currentUser.id || !socket) return;
      if (window.confirm(`¿Activar modo troll para ${username}?`)) {
        socket.emit('admin:troll-mode', {
          userId,
          adminId: currentUser.id,
        });
      }
    },
    [isAdmin, currentUser, socket]
  );

  // Render
  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      {/* Header */}
      <header className="header flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center text-header font-bold truncate">
          <button
            onClick={onMenuToggle}
            className="md:hidden mr-4 btn-ghost touch-target"
            aria-label="Abrir menú"
          >
            <Menu size={24} />
          </button>
          <Hash size={24} className="text-muted mr-3 shrink-0" />
          <span className="truncate">{currentChannel.name}</span>
        </div>
      </header>

      {/* Mensajes */}
      <MessageList
        orderedMessages={orderedMessages}
        currentUser={currentUser}
        isAdmin={isAdmin}
        hoveredMessageId={hoveredMessageId}
        setHoveredMessageId={setHoveredMessageId}
        handleDeleteMessage={handleDeleteMessage}
        handleKickUser={handleKickUser}
        handleBanUser={handleBanUser}
        handleSilenceUser={handleSilenceUser}
        handleChangeColor={handleChangeColor}
        handleTrollMode={handleTrollMode}
        isBotTyping={shouldShowBotTyping}
        messagesEndRef={messagesEndRef}
        // MessageInput props
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

      {/* Chat Input */}
      <div className="p-4 bg-discord-dark-light shrink-0">
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
