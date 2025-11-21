import React, { useState } from 'react';
import { User, Check, RefreshCw } from 'lucide-react';

const AVATARS = [
  'https://picsum.photos/id/1012/200/200',
  'https://picsum.photos/id/1025/200/200',
  'https://picsum.photos/id/177/200/200',
  'https://picsum.photos/id/237/200/200',
  'https://picsum.photos/id/1062/200/200',
  'https://picsum.photos/id/1011/200/200',
  'https://picsum.photos/id/1027/200/200',
  'https://picsum.photos/id/169/200/200'
] as const;

interface UserSetupProps {
  onComplete: (username: string, avatar: string) => void;
}

const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [error, setError] = useState('');

  const handleRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * AVATARS.length);
    setSelectedAvatar(AVATARS[randomIndex]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('El nombre de usuario es requerido');
      return;
    }
    
    if (trimmedUsername.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres');
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError('El nombre no puede exceder 20 caracteres');
      return;
    }

    onComplete(trimmedUsername, selectedAvatar);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-md bg-black/60 animate-fadeIn">
      <div className="bg-discord-sidebar rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border-2 border-discord-blurple/20 animate-scaleIn">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-discord-blurple rounded-full mb-4">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido a UPG!</h2>
          <p className="text-gray-400 text-sm">Personaliza tu perfil para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Avatar Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Elige tu avatar
            </label>
            <div className="flex items-center gap-4">
              <img 
                src={selectedAvatar} 
                alt="Avatar seleccionado"
                className="w-20 h-20 rounded-full object-cover border-4 border-discord-blurple shadow-lg"
              />
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 bg-discord-chat hover:bg-discord-sidebar-hover text-white rounded-lg transition-colors font-medium"
              >
                <RefreshCw size={16} />
                Aleatorio
              </button>
            </div>
            
            {/* Avatar Grid */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {AVATARS.map((avatar, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    selectedAvatar === avatar 
                      ? 'border-discord-blurple ring-2 ring-discord-blurple/50' 
                      : 'border-transparent hover:border-gray-500'
                  }`}
                >
                  <img 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedAvatar === avatar && (
                    <div className="absolute inset-0 bg-discord-blurple/40 flex items-center justify-center">
                      <Check size={24} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-300 mb-2">
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Ingresa tu nombre..."
              maxLength={20}
              className="w-full px-4 py-3 bg-discord-chat border-2 border-transparent rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-discord-blurple transition-colors"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              {username.length}/20 caracteres
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-discord-blurple hover:bg-discord-blurple-hover text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!username.trim()}
          >
            <Check size={20} />
            Comenzar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSetup;
