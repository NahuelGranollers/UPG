import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './context/AuthContext';
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
      // if (typeof io === 'undefined') {
      //   console.error('Socket.IO is not available. Make sure the CDN script is loaded.');
      //   return;
      // }

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
      console.log('Socket initial state:', {
        connected: socket.connected,
        disconnected: socket.disconnected,
        id: socket.id
      });
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log('🎉 Socket connected successfully! ID:', socket.id);
        console.log('Socket transport:', socket.io.engine.transport.name);
        setIsConnected(true);

        // Only identify if we have a current user
        if (currentUser) {
          console.log('Identifying user:', currentUser.username);
          socket.emit('user:join', {
            ...currentUser,
            socketId: socket.id,
          });
        } else {
          console.log('No current user to identify');
        }
      });

      // Listen for auto-join requests from server
      socket.on('game:auto-join', (data: { type: string, roomId: string }) => {
        console.log('Auto-joining game:', data);
        // Dispatch a custom event that App.tsx or HomeScreen can listen to
        window.dispatchEvent(new CustomEvent('game:auto-join', { detail: data }));
      });

      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected, reason:', reason);
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        console.error('❌ Socket connection error:', err.message, err);
        console.error('Error details:', {
          type: err.type,
          description: err.description,
          context: err.context
        });
        setIsConnected(false);
        // toast.error('Error de conexión con el chat');
      });

      socket.on('reconnect', (attemptNumber) => {
        console.log('Socket reconnected after', attemptNumber, 'attempts');
        setIsConnected(true);
      });

      socket.on('reconnect_error', (err) => {
        console.error('Socket reconnection error:', err.message, err);
      });

      socket.on('reconnect_failed', () => {
        console.error('Socket reconnection failed completely');
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    } catch (error) {
      console.error('Failed to create socket instance:', error);
      console.error('Socket.IO may not be available. Check if socket.io-client is properly imported.');
      // Don't set socketRef.current, so it stays null and dummy is used
    }
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
