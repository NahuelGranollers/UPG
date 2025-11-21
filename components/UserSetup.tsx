import React, { useState, useRef } from 'react';
import { User, Check, RefreshCw, Upload, X } from 'lucide-react';
import { uploadProfileImage, validateImageFile } from '../services/firebaseService';

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
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * AVATARS.length);
    setSelectedAvatar(AVATARS[randomIndex]);
    setCustomAvatar(null); // Resetear avatar personalizado
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar archivo
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Error validando imagen');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      // Generar ID temporal para la subida
      const tempUserId = `temp-${Date.now()}`;
      const downloadURL = await uploadProfileImage(file, tempUserId);
      
      setCustomAvatar(downloadURL);
      setSelectedAvatar(downloadURL as any); // Usar la URL personalizada
    } catch (err) {
      console.error('Error subiendo imagen:', err);
      setError('Error subiendo la imagen. Intenta de nuevo.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveCustomAvatar = () => {
    setCustomAvatar(null);
    setSelectedAvatar(AVATARS[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    // Verificar si el username ya existe en el servidor
    setCheckingUsername(true);
    try {
      const socket = (window as any).socketInstance;
      if (socket) {
        // Emitir evento para verificar username
        socket.emit('username:check', { username: trimmedUsername });
        
        // Esperar respuesta
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Timeout verificando username'));
          }, 5000);

          socket.once('username:check-result', ({ available, message }: { available: boolean; message?: string }) => {
            clearTimeout(timeout);
            if (!available) {
              setError(message || 'Este nombre de usuario ya está en uso');
              reject(new Error('Username no disponible'));
            } else {
              resolve();
            }
          });
        });
      }
    } catch (err) {
      console.error('Error verificando username:', err);
      setCheckingUsername(false);
      return;
    }
    setCheckingUsername(false);

    // Usar avatar personalizado o el seleccionado
    const finalAvatar = customAvatar || selectedAvatar;
    onComplete(trimmedUsername, finalAvatar);
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
              <div className="relative">
                <img 
                  src={customAvatar || selectedAvatar} 
                  alt="Avatar seleccionado"
                  className="w-20 h-20 rounded-full object-cover border-4 border-discord-blurple shadow-lg"
                />
                {customAvatar && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomAvatar}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                    title="Eliminar foto personalizada"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="flex items-center gap-2 px-4 py-2 bg-discord-chat hover:bg-discord-sidebar-hover text-white rounded-lg transition-colors font-medium"
                  disabled={uploadingImage}
                >
                  <RefreshCw size={16} />
                  Aleatorio
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-discord-blurple hover:bg-discord-blurple-hover text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Subir foto
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
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
            disabled={!username.trim() || checkingUsername || uploadingImage}
          >
            {checkingUsername ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Check size={20} />
                Comenzar
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserSetup;
