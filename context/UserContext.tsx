import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSocket } from './SocketContext';
import { User } from '../types';

interface UserContextType {
  users: User[];
  userColors: Record<string, string>;
  voiceStates: Record<string, string>;
  activeEffect: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { socket } = useSocket();
  const [users, setUsers] = useState<User[]>([]);
  const [userColors, setUserColors] = useState<Record<string, string>>({});
  const [voiceStates, setVoiceStates] = useState<Record<string, string>>({});
  const [activeEffect, setActiveEffect] = useState<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleUsersList = (list: User[]) => {
      if (!Array.isArray(list)) {
        console.warn('Received invalid users list:', list);
        return;
      }
      setUsers(list);
      const mapping = list.reduce((acc, u) => {
        if (u && u.id && u.color) acc[u.id] = u.color;
        return acc;
      }, {} as Record<string, string>);
      setUserColors(prev => ({ ...prev, ...mapping }));
    };

    const handleUserOnline = (u: User) => {
      setUsers(prev => {
        const exists = prev.find(x => x.id === u.id);
        if (exists) {
          return prev.map(x => (x.id === u.id ? { ...u, online: true, status: 'online' } : x));
        }
        return [...prev, u];
      });
    };

    const handleUserUpdated = (updated: Partial<User> & { id: string }) => {
      setUsers(prev => prev.map(u => (u.id === updated.id ? { ...u, ...updated } : u)));
      if (updated.color) {
        setUserColors(prev => ({ ...prev, [updated.id]: updated.color! }));
      }
    };

    const handleUserColorChanged = ({ userId, color }: { userId: string; color: string }) => {
      setUserColors(prev => ({ ...prev, [userId]: color }));
      setUsers(prev => prev.map(u => (u.id === userId ? { ...u, color } : u)));
    };

    const handleUserOffline = ({ userId }: { userId: string }) => {
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, online: false, status: 'offline' } : u))
      );
    };

    const handleVoiceState = (states: Record<string, string>) => {
      setVoiceStates(states);
    };

    const handleAdminEffect = ({ effect }: { effect: string }) => {
      setActiveEffect(effect);
      if (effect === 'rotate') {
        document.body.style.transform = 'rotate(180deg)';
        document.body.style.transition = 'transform 1s';
        setTimeout(() => {
          document.body.style.transform = '';
          setActiveEffect(null);
        }, 10000);
      } else if (effect === 'jumpscare') {
        const audio = new Audio('https://www.myinstants.com/media/sounds/fnaf-scream.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.error(e));
        setTimeout(() => setActiveEffect(null), 1500);
      } else if (effect === 'fart') {
         const audio = new Audio('https://www.myinstants.com/media/sounds/fart-with-reverb.mp3');
         audio.volume = 0.8;
         audio.play().catch(e => console.error(e));
         setTimeout(() => setActiveEffect(null), 3000);
      } else if (effect === 'confetti') {
         setTimeout(() => setActiveEffect(null), 5000);
      }
    };

    const handleAdminUserColorChanged = ({ userId, color }: { userId: string; color: string }) => {
      setUserColors(prev => ({ ...prev, [userId]: color }));
    };

    socket.on('users:list', handleUsersList);
    socket.on('user:online', handleUserOnline);
    socket.on('user:updated', handleUserUpdated);
    socket.on('user:color-changed', handleUserColorChanged);
    socket.on('user:profile-updated', handleUserUpdated);
    socket.on('user:offline', handleUserOffline);
    socket.on('voice:state', handleVoiceState);
    socket.on('admin:effect-triggered', handleAdminEffect);
    socket.on('admin:user-color-changed', handleAdminUserColorChanged);

    socket.emit('users:request');

    return () => {
      socket.off('users:list', handleUsersList);
      socket.off('user:online', handleUserOnline);
      socket.off('user:updated', handleUserUpdated);
      socket.off('user:color-changed', handleUserColorChanged);
      socket.off('user:profile-updated', handleUserUpdated);
      socket.off('user:offline', handleUserOffline);
      socket.off('voice:state', handleVoiceState);
      socket.off('admin:effect-triggered', handleAdminEffect);
      socket.off('admin:user-color-changed', handleAdminUserColorChanged);
    };
  }, [socket]);

  return (
    <UserContext.Provider value={{ users, userColors, voiceStates, activeEffect }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
