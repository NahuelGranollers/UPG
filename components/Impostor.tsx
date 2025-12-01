import React, { Suspense } from 'react';
import { useAuth } from '../context/AuthContext';

const ImpostorGame = React.lazy(() => import('../components/ImpostorGame'));

function Impostor() {
  const { currentUser, isLoading, loginWithDiscord, loginAsGuest } = useAuth();

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Cargando...
      </div>
    );

  // Si no hay usuario (caso raro tras isLoading), mostrar loading o error
  if (!currentUser)
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Usuario no encontrado
      </div>
    );

  return (
    <Suspense
      fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}
    >
      <ImpostorGame
        onClose={() => {
          // Redirect to home or main app
          window.location.href = '/';
        }}
      />
    </Suspense>
  );
}

export default Impostor;