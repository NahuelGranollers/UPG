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
      console.log('FRONTEND: Mensaje recibido:', message);
      if (message.channelId === channelId) {
        console.log('FRONTEND: Agregando mensaje al estado:', message);
        setMessages(prev => {
          // Remover mensaje local duplicado si existe
          const filtered = prev.filter(
            local => !(local.id.startsWith('local-') && 
                      local.timestamp === message.timestamp && 
                      local.content === message.content &&
                      local.userId === message.userId)
          );
          return [...filtered, message];
        });
        console.log('FRONTEND: Mensaje agregado al estado');
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
    (content: string) => {
      if (!socket || !isConnected || !currentUser) {
        toast.error('No hay conexión con el servidor');
        return;
      }
      console.log('Enviando mensaje:', content);
      // Forzar unión al canal antes de enviar el mensaje
      socket.emit('channel:join', { channelId, userId: currentUser.id });
      socket.emit('message:send', {
        channelId,
        content,
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
      });
      console.log('Mensaje enviado al servidor');
    },
    [socket, isConnected, channelId, currentUser]
  );

  return { messages, setMessages, sendMessage };
};
