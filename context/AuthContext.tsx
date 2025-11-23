import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as storage from '../utils/storageService';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithDiscord: () => void;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializar usuario
  useEffect(() => {
    const initAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authStatus = urlParams.get('auth');

      if (authStatus === 'success') {
        // Limpiar URL
        window.history.replaceState({}, document.title, '/');

        // Fetch user from backend
        try {
          const API_URL = import.meta.env.DEV
            ? 'http://localhost:3000'
            : 'https://mensajeria-ksc7.onrender.com';
          const res = await fetch(`${API_URL}/auth/user`, { credentials: 'include' });
          if (res.ok) {
            const discordUser = await res.json();
            const newUser: User = {
              id: discordUser.id,
              username: discordUser.username,
              avatar: discordUser.avatar
                ? `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`
                : `https://ui-avatars.com/api/?name=${discordUser.username.charAt(0)}`,
              status: 'online',
              online: true,
              role: discordUser.role || UserRole.USER,
              color: discordUser.color || (discordUser.role === 'admin' ? '#ff4d0a' : '#5865F2'),
              isGuest: false,
            };
            setCurrentUser(newUser);
            storage.saveUserData(newUser);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error('Auth check failed', e);
        }
      }

      // Fallback: LocalStorage
      const saved = storage.loadUserData();
      if (saved) {
        setCurrentUser({ ...saved, online: true, status: 'online' });
      } else {
        // Create Guest
        const randomId = Math.floor(Math.random() * 10000).toString();
        const guest: User = {
          id: `guest-${randomId}`,
          username: `Invitado${randomId}`,
          avatar: `https://ui-avatars.com/api/?name=I${randomId}`,
          status: 'online',
          online: true,
          color: '#808080',
          isGuest: true,
          role: UserRole.USER,
        };
        setCurrentUser(guest);
        storage.saveUserData(guest);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const loginWithDiscord = useCallback(() => {
    const API_URL = import.meta.env.DEV
      ? 'http://localhost:3000'
      : 'https://mensajeria-ksc7.onrender.com';
    window.location.href = `${API_URL}/auth/discord`;
  }, []);

  const logout = useCallback(async () => {
    const API_URL = import.meta.env.DEV
      ? 'http://localhost:3000'
      : 'https://mensajeria-ksc7.onrender.com';
    try {
      await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
      storage.clearUserData();
      window.location.reload();
    } catch (e) {
      console.error('Logout failed', e);
    }
  }, []);

  const updateUser = useCallback((user: User) => {
    setCurrentUser(user);
    storage.saveUserData(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        loginWithDiscord,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
