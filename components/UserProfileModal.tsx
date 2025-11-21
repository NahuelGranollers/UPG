import React from 'react';
import { X, LogIn } from 'lucide-react';
import { User } from '../types';
import SafeImage from './SafeImage';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLoginWithDiscord: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  user,
  onLoginWithDiscord 
}) => {
  if (!isOpen) return null;

  const isGuest = user.isGuest || user.username.startsWith('Invitado');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-discord-sidebar rounded-lg shadow-xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-24 bg-gradient-to-r from-purple-500 to-pink-500">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="relative px-4 pb-4">
          {/* Avatar */}
          <div className="absolute -top-12 left-4">
            <div className="relative">
              <SafeImage
                src={user.avatar}
                alt={user.username}
                className="w-24 h-24 rounded-full border-8 border-discord-sidebar object-cover"
                fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=5865F2&color=fff&size=200`}
              />
              <div className={`absolute bottom-1 right-1 w-6 h-6 border-[4px] border-discord-sidebar rounded-full ${
                user.status === 'online' ? 'bg-green-500' : 
                user.status === 'idle' ? 'bg-yellow-500' : 
                user.status === 'dnd' ? 'bg-red-500' : 
                'bg-gray-500'
              }`} />
            </div>
          </div>

          {/* User Info */}
          <div className="pt-14">
            <div className="bg-discord-dark rounded-lg p-4 mb-4">
              <h2 className="text-xl font-bold text-white mb-1" style={{ color: user.color }}>
                {user.username}
              </h2>
              <p className="text-sm text-discord-text-muted">
                {user.id}
              </p>
              
              {isGuest && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                  <p className="text-sm text-yellow-200">
                    👋 Estás navegando como invitado
                  </p>
                </div>
              )}
            </div>

            {/* Login Button for Guests */}
            {isGuest && (
              <button
                onClick={onLoginWithDiscord}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={20} />
                Iniciar sesión con Discord
              </button>
            )}

            {/* Logout Button for Discord Users */}
            {!isGuest && (
              <div className="space-y-2">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                  <p className="text-sm text-green-200 flex items-center gap-2">
                    ✓ Conectado con Discord
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (confirm('¿Seguro que quieres cerrar sesión?')) {
                      // Clear localStorage and reload
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Cerrar sesión
                </button>
              </div>
            )}

            {/* User Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="bg-discord-dark rounded p-3">
                <p className="text-xs text-discord-text-muted uppercase">Estado</p>
                <p className="text-sm font-semibold text-white capitalize">
                  {user.status === 'online' ? 'Disponible' : 
                   user.status === 'idle' ? 'Ausente' : 
                   user.status === 'dnd' ? 'No molestar' : 
                   'Desconectado'}
                </p>
              </div>
              <div className="bg-discord-dark rounded p-3">
                <p className="text-xs text-discord-text-muted uppercase">Rol</p>
                <p className="text-sm font-semibold text-white">
                  {user.role === 'admin' ? '👑 Admin' : isGuest ? '🚶 Invitado' : '👤 Miembro'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
