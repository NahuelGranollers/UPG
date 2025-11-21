import React, { useState, useMemo } from 'react';
import { User, Check } from 'lucide-react';

interface UserSetupProps {
  onComplete: (username: string, avatar: string) => void;
}

const UserSetup: React.FC<UserSetupProps> = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [error, setError] = useState('');

  // Generar avatar basado en la primera letra del nombre
  const generatedAvatar = useMemo(() => {
    const firstLetter = username.trim().charAt(0).toUpperCase() || 'U';
    const colors = [
      { bg: '5865F2', text: 'fff' }, // Discord blurple
      { bg: '57F287', text: 'fff' }, // Green
      { bg: 'FEE75C', text: '000' }, // Yellow
      { bg: 'EB459E', text: 'fff' }, // Pink
      { bg: 'ED4245', text: 'fff' }, // Red
      { bg: '9B59B6', text: 'fff' }, // Purple
      { bg: '3498DB', text: 'fff' }, // Blue
      { bg: 'E67E22', text: 'fff' }, // Orange
      { bg: '11806A', text: 'fff' }, // Teal
      { bg: '992D22', text: 'fff' }  // Dark red
    ];
    
    // Seleccionar color basado en el código ASCII de la primera letra
    const charCode = firstLetter.charCodeAt(0);
    const colorIndex = charCode % colors.length;
    const color = colors[colorIndex];
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstLetter)}&background=${color.bg}&color=${color.text}&size=200&bold=true&font-size=0.5`;
  }, [username]);



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
    setError('');
    
    try {
      const socket = (window as any).socketInstance;
      
      if (!socket) {
        console.warn('Socket no disponible aún, omitiendo verificación de username');
        setCheckingUsername(false);
        // Continuar sin verificación si el socket no está disponible
      } else {
        // Verificar si el socket está conectado
        if (!socket.connected) {
          console.log('Socket no conectado, esperando conexión...');
          // Esperar a que se conecte (máximo 3 segundos)
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.warn('Timeout esperando conexión, continuando sin verificación');
              resolve(); // No rechazar, solo continuar
            }, 3000);

            if (socket.connected) {
              clearTimeout(timeout);
              resolve();
            } else {
              socket.once('connect', () => {
                clearTimeout(timeout);
                resolve();
              });
            }
          });
        }

        // Si está conectado, verificar username
        if (socket.connected) {
          socket.emit('username:check', { username: trimmedUsername });
          
          await new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.warn('Timeout verificando username, continuando de todos modos');
              resolve(); // No rechazar, permitir continuar
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
        
        setCheckingUsername(false);
      }
    } catch (err) {
      console.error('Error verificando username:', err);
      setCheckingUsername(false);
      return;
    }

    // Usar el avatar generado automáticamente
    onComplete(trimmedUsername, generatedAvatar);
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
          
          {/* Avatar Preview */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3 text-center">
              Tu avatar
            </label>
            <div className="flex justify-center">
              <div className="relative">
                <img 
                  src={generatedAvatar} 
                  alt="Tu avatar"
                  className="w-32 h-32 rounded-full object-cover border-4 border-discord-blurple shadow-lg transition-all duration-300"
                  key={generatedAvatar}
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400 text-center">
              El avatar se genera automáticamente con la primera letra de tu nombre
            </p>
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
            disabled={!username.trim() || checkingUsername}
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
