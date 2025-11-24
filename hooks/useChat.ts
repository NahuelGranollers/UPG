import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import { Message } from '../types';
import { toast } from 'sonner';

export const useChat = (channelId: string) => {
  const { socket, isConnected } = useSocket();
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

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
        setMessages(history);
      }
    };

    // Escuchar mensajes nuevos en tiempo real
    const handleNewMessage = (message: Message) => {
      if (message.channelId === channelId) {
        setMessages(prev => {
          // Remover mensaje local duplicado si existe
          const filtered = prev.filter(local => {
            // If local message has a localId and server returned same localId, drop local
            if (
              local.id &&
              local.id.startsWith('local-') &&
              (message as any).localId &&
              local.id === (message as any).localId
            )
              return false;
            // Fallback: match by userId + content + timestamp proximity (5s)
            try {
              const localTime = new Date(local.timestamp).getTime();
              const serverTime = new Date(message.timestamp).getTime();
              if (
                local.id &&
                local.id.startsWith('local-') &&
                local.userId === message.userId &&
                local.content === message.content &&
                Math.abs(localTime - serverTime) < 5000
              ) {
                return false;
              }
            } catch (e) {}
            return true;
          });
          return [...filtered, message];
        });
      }
    };

    socket.on('channel:history', handleHistory);
    socket.on('message:received', handleNewMessage);

    return () => {
      socket.off('channel:history', handleHistory);
      socket.off('message:received', handleNewMessage);
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
        // Forzar unión al canal antes de enviar el mensaje
        socket.emit('channel:join', { channelId, userId: currentUser.id });
        const payload: any = {
          channelId,
          content,
          userId: currentUser.id,
          username: currentUser.username,
          avatar: currentUser.avatar,
        };
        if (localId) payload.localId = localId;
        try {
          socket.emit('message:send', payload, (res: any) => {
            if (res && res.ok === false) {
              toast.error(res.error || 'Error enviando mensaje');
            }
            resolve(res || { ok: true });
          });
        } catch (e) {
          toast.error('Error enviando mensaje');
          resolve({ ok: false, error: 'emit_exception' });
        }
      });
    },
    [socket, isConnected, channelId, currentUser]
  );

  return { messages, setMessages, sendMessage };
};
