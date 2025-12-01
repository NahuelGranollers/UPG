import React, { useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { SocketProvider, useSocket } from '../context/SocketContext';
import { UserProvider, useUsers } from '../context/UserContext';
import { useChat } from '../hooks/useChat';
import { AppView, ChannelData, User, UserRole } from '../types';
import useVoice from '../hooks/useVoice';

// Componentes críticos (carga inmediata)
import ErrorBoundary from '../components/ErrorBoundary';
import UsernamePrompt from '../components/UsernamePrompt';

const ImpostorGame = React.lazy(() => import('../components/ImpostorGame'));

function ImpostorPage() {
  const [searchParams] = useSearchParams();
  const invite = searchParams.get('invite');

  const [showHome, setShowHome] = useState(false);
  const [autoJoinRoomId, setAutoJoinRoomId] = useState<string | undefined>(invite || undefined);
  const [autoJoinPassword, setAutoJoinPassword] = useState<string | undefined>(undefined);

  const { currentUser, isLoading, loginWithDiscord, loginAsGuest, logout } = useAuth();
  const { isConnected, socket } = useSocket();
  const { activeEffect } = useUsers();

  const touchState = React.useRef({ startX: 0, startY: 0, started: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchState.current = { startX: t.clientX, startY: t.clientY, started: true };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchState.current.started) return;
    const t = e.touches[0];
    const dx = t.clientX - touchState.current.startX;
    const dy = Math.abs(t.clientY - touchState.current.startY);
    if (dy > 75) return; // ignore vertical drags
  };

  const handleTouchEnd = () => {
    touchState.current.started = false;
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Cargando...
      </div>
    );

  // Si no hay usuario (caso raro tras isLoading), mostrar loading o error
  if (!currentUser)
    return (
      <UsernamePrompt
        onSubmit={loginAsGuest}
        onLoginWithDiscord={loginWithDiscord}
      />
    );

  return (
    <div
      className="flex h-[100dvh] w-full bg-discord-bg font-sans antialiased overflow-hidden relative text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Suspense
        fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}
      >
        <ImpostorGame
          onClose={() => {
            // Redirect to home or main app
            window.location.href = '/';
          }}
          autoJoinRoomId={autoJoinRoomId}
          autoJoinPassword={autoJoinPassword}
        />
      </Suspense>

      {/* Effects Overlay */}
      {activeEffect === 'jumpscare' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <img
            src="/scare.gif"
            alt="scare"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {activeEffect === 'confetti' && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random()}s`
              }}
            >
              🎉
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Impostor() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <UserProvider>
            <ImpostorPage />
            <Toaster position="top-right" theme="dark" richColors />
          </UserProvider>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}