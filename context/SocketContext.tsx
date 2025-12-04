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
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
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
    disconnected: true,
    active: false,
    id: null,
    auth: {},
    io: {
      engine: {
        transport: {
          name: 'disconnected'
        }
      }
    },
  } as Socket), []);

  useEffect(() => {
    // Always create a socket, even if user is not logged in
    const SOCKET_URL = getSocketUrl();
    console.log('Attempting to create socket with URL:', SOCKET_URL);

    try {
      const socket = io(SOCKET_URL, {
        transports: ['polling'], // Use polling for compatibility
        path: '/socket.io',
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000, // Increase timeout
        forceNew: true, // Force new connection
      });

      // Socket created successfully
      console.log('Socket.IO instance created successfully:', socket);
      socketRef.current = socket;
      setSocketInstance(socket);

      socket.on('connect', () => {
        console.log('🎉 Socket connected successfully! ID:', socket.id);
        setIsConnected(true);
      });

      socket.on('game:auto-join', (data: { type: string, roomId: string }) => {
        console.log('Auto-joining game:', data);
        window.dispatchEvent(new CustomEvent('game:auto-join', { detail: data }));
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected, reason:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        console.error('❌ Socket connection error:', err.message, err);
        setIsConnected(false);
      });

      socket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
        setIsConnected(true);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
        setSocketInstance(null);
      };
    } catch (error) {
      console.error('Failed to create socket instance:', error);
    }
  }, []); // Run once on mount

  // When user logs in/out, update identification
  useEffect(() => {
    if (!socketInstance) return;

    if (currentUser && isConnected) {
      // User logged in and socket is connected - identify
      console.log('Identifying user:', currentUser.username);
      socketInstance.emit('user:join', {
        ...currentUser,
        socketId: socketInstance.id,
      });
    }
  }, [currentUser, isConnected, socketInstance]);

  return (
    <SocketContext.Provider value={{ socket: socketInstance || dummySocket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
