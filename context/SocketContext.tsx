import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { getSocketUrl } from '../utils/config';

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

  // Create a dummy socket that does nothing until the real socket is available
  const dummySocket = useMemo(() => ({
    emit: (...args: any[]) => {
      console.warn('Socket not initialized, ignoring emit:', args[0]);
    },
    on: (...args: any[]) => {
      console.warn('Socket not initialized, ignoring on:', args[0]);
    },
    off: (...args: any[]) => {
      console.warn('Socket not initialized, ignoring off:', args[0]);
    },
    disconnect: () => {
      console.warn('Socket not initialized, ignoring disconnect');
    },
    connected: false,
    id: null,
  } as Socket), []);

  useEffect(() => {
    // Always create a socket, even if user is not logged in
    const SOCKET_URL = getSocketUrl();

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

      // Only identify if we have a current user
      if (currentUser) {
        socket.emit('user:join', {
          ...currentUser,
          socketId: socket.id,
        });
      }
    });

    // Listen for auto-join requests from server
    socket.on('game:auto-join', (data: { type: string, roomId: string }) => {
      console.log('Auto-joining game:', data);
      // Dispatch a custom event that App.tsx or HomeScreen can listen to
      window.dispatchEvent(new CustomEvent('game:auto-join', { detail: data }));
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
      socketRef.current = null;
    };
  }, []); // Remove currentUser dependency - socket is always created

  // When user logs in/out, update identification
  useEffect(() => {
    if (!socketRef.current) return;

    if (currentUser && isConnected) {
      // User logged in and socket is connected - identify
      socketRef.current.emit('user:join', {
        ...currentUser,
        socketId: socketRef.current.id,
      });
    } else if (!currentUser && isConnected) {
      // User logged out - we could emit a leave event here if needed
      // For now, just keep the socket connected but not identified
    }
  }, [currentUser, isConnected]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current || dummySocket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
