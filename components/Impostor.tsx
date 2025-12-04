import React, { Suspense, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UsernamePrompt from './UsernamePrompt';

const ImpostorGame = React.lazy(() => import('../components/ImpostorGame'));

function Impostor() {
  const { currentUser, isLoading, loginAsGuest, loginWithDiscord } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params for direct links
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const queryRoomId = queryParams.get('roomId');
  const queryPassword = queryParams.get('password');

  const { autoJoinRoomId, autoJoinPassword } = location.state || {};

  // Determine final join params (state takes precedence, or query params if state is missing)
  const finalRoomId = autoJoinRoomId || queryRoomId;
  const finalPassword = autoJoinPassword || queryPassword;

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center bg-discord-bg text-white">
        Cargando...
      </div>
    );

  // Si no hay usuario, mostrar el prompt de nombre
  if (!currentUser) {
    return (
      <UsernamePrompt
        onSubmit={loginAsGuest}
        onLoginWithDiscord={loginWithDiscord}
      />
    );
  }

  return (
    <Suspense
      fallback={<div className="flex-1 flex items-center justify-center">Cargando...</div>}
    >
      <ImpostorGame
        onClose={() => {
          navigate('/');
        }}
        autoJoinRoomId={finalRoomId}
        autoJoinPassword={finalPassword}
      />
    </Suspense>
  );
}

export default Impostor;