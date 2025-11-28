import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within a SocketProvider');
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!currentUser) return;

    const SOCKET_URL =
      (import.meta.env.VITE_SOCKET_URL as string) ||
      (import.meta.env.DEV ? 'http://localhost:3000' : 'https://api.unaspartidillas.online');

    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      secure: true,
      withCredentials: true,
      path: '/socket.io/',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);

      // Identificarse
      socket.emit('user:join', {
        ...currentUser,
        socketId: socket.id,
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', err => {
      console.error('Socket error:', err);
      // toast.error('Error de conexión con el chat');
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
