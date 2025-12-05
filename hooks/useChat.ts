import { useEffect, useState, useCallback, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types';
import { toast } from 'sonner';

export const useChat = (channelId: string) => {
  const { socket, isConnected } = useSocket();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const processedMessageIds = useRef<Set<string>>(new Set());

  // Unirse al canal y escuchar mensajes
  useEffect(() => {
    if (!socket || !isConnected) return;

    // Unirse al canal
    socket.emit('channel:join', { channelId, userId: currentUser?.id });

    // Escuchar historial
    const handleHistory = ({
      channelId: cid,
      messages: history,
    }: {
      channelId: string;
      messages: Message[];
    }) => {
      if (cid === channelId || cid === null) {
        // Reset processed IDs on history load
        processedMessageIds.current = new Set(history.map(m => m.id));
        
        setMessages(prev => {
          // Keep local messages that haven't been confirmed yet
          const localMessages = prev.filter(m => 
            (m as any).localId && 
            !history.some(h => h.id === m.id || (h as any).localId === (m as any).localId)
          );
          
          // Combine history with pending local messages
          // Sort by timestamp to be safe
          const combined = [...history, ...localMessages].sort((a, b) => 
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
          
          return combined;
        });
      }
    };

    // Escuchar mensajes nuevos en tiempo real
    const handleNewMessage = (message: Message) => {
      if (message.channelId !== channelId) return;

      setMessages(prev => {
        // Check if we already have this message (by ID or localId)
        const existingIndex = prev.findIndex(m => 
          m.id === message.id || 
          ((m as any).localId && (m as any).localId === (message as any).localId)
        );

        if (existingIndex !== -1) {
          // Replace existing (optimistic) message with confirmed one
          const newMessages = [...prev];
          newMessages[existingIndex] = message;
          return newMessages;
        }

        // Add new message
        return [...prev, message];
      });
    };

    // Escuchar actualizaciones de mensajes (reacciones, ediciones)
    const handleMessageUpdate = (updatedMessage: Message) => {
      if (updatedMessage.channelId === channelId) {
        setMessages(prev => prev.map(msg => 
          msg.id === updatedMessage.id ? updatedMessage : msg
        ));
      }
    };

    socket.on('channel:history', handleHistory);
    socket.on('message:received', handleNewMessage);
    socket.on('message:update', handleMessageUpdate);

    return () => {
      socket.off('channel:history', handleHistory);
      socket.off('message:received', handleNewMessage);
      socket.off('message:update', handleMessageUpdate);
    };
  }, [socket, isConnected, channelId, currentUser]);

  const sendMessage = useCallback(
    (content: string, localId?: string) => {
      return new Promise<any>(resolve => {
        if (!socket || !isConnected || !currentUser) {
          toast.error('No hay conexión con el servidor');
          resolve({ ok: false, error: 'no_connection' });
          return;
        }

        // Optimistic update
        const tempId = localId || `local-${Date.now()}`;
        const optimisticMessage: Message = {
          id: tempId,
          channelId,
          userId: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          content,
          timestamp: new Date().toISOString(),
          isSystem: false,
          reactions: {},
          // @ts-ignore
          localId: tempId
        };

        setMessages(prev => [...prev, optimisticMessage]);

        const payload: any = {
          channelId,
          content,
          userId: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
          localId: tempId
        };

        try {
          socket.emit('message:send', payload, (response: any) => {
            if (response && response.ok === false) {
              toast.error(response.error || 'Error enviando mensaje');
              // Remove optimistic message on failure
              setMessages(prev => prev.filter(m => m.id !== tempId));
            }
            resolve(response || { ok: true });
          });
        } catch (e) {
          toast.error('Error enviando mensaje');
          setMessages(prev => prev.filter(m => m.id !== tempId));
          resolve({ ok: false, error: 'emit_exception' });
        }
      });
    },
    [socket, isConnected, currentUser, channelId]
  );

  return { messages, setMessages, sendMessage };
};
