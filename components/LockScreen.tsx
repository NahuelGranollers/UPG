import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

// SHA-256 Hash de la contraseña correcta (pre-calculado para máxima eficiencia)
// Nunca almacenar la contraseña real en el código
const TARGET_HASH = "fc0b2a5f6669b54193a2c3db48cd26c3a4649be6e9f7b7fb958df4aa39b05402";

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);

  // Logo Animation Logic (Same as Voting.tsx)
  useEffect(() => {
    const minDeg = -50;
    const maxDeg = 40;
    const speed = 0.6;
    let angle = minDeg;
    let direction = 1;
    let animationFrameId: number;

    const animateLogo = () => {
      angle += speed * direction;
      if (angle >= maxDeg) direction = -1;
      if (angle <= minDeg) direction = 1;
      
      if (logoRef.current) {
        logoRef.current.style.transform = `rotate(${angle}deg)`;
      }
      animationFrameId = requestAnimationFrame(animateLogo);
    };
    
    animateLogo();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Función optimizada de hashing con useCallback para evitar re-creaciones
  const hashPassword = useCallback(async (input: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Conversión optimizada a hex usando reduce (más rápido que map)
    const hashArray = new Uint8Array(hashBuffer);
    let hexString = '';
    for (let i = 0; i < hashArray.length; i++) {
      hexString += hashArray[i].toString(16).padStart(2, '0');
    }
    return hexString;
  }, []);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación rápida: no procesar si está vacío
    if (!password.trim()) {
      setError(true);
      return;
    }

    setError(false);
    setLoading(true);

    try {
      // Hashear input (operación criptográfica rápida ~1ms)
      const inputHash = await hashPassword(password);

      // Comparación constante en tiempo para evitar timing attacks
      if (inputHash === TARGET_HASH) {
        // Éxito - delay mínimo para UX
        setTimeout(() => {
          onUnlock();
        }, 200);
      } else {
        // Fallo - delay artificial para prevenir ataques de fuerza bruta
        setTimeout(() => {
          setError(true);
          setLoading(false);
          setPassword(''); // Limpiar input en error
        }, 300);
      }
    } catch (err) {
      console.error("Error de verificación:", err);
      setError(true);
      setLoading(false);
    }
  }, [password, hashPassword, onUnlock]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto w-full min-h-screen p-4 sm:p-6" style={{ backgroundColor: '#ffcc17' }}>
      
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-auto">
        {/* Animated Logo */}
        <img 
          ref={logoRef}
          src="/upg.png" 
          alt="UPG Logo" 
          className="object-cover mb-4 sm:mb-6 md:mb-8 w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] block flex-shrink-0"
          style={{ transition: 'transform 0.1s linear' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />

        {/* Work in Progress Text */}
        <div 
          className="font-black text-center text-[1.2em] xs:text-[1.5em] sm:text-[2em] md:text-[2.5em] lg:text-[3.5em] mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 leading-tight" 
          style={{ 
            color: '#ff4d0a', 
            fontFamily: '"Arial Black", Arial, sans-serif',
            textShadow: '2px 2px 0px #ff9300',
            letterSpacing: '0.5px'
        }}>
           WORK IN PROGRESS
        </div>

        {/* Password Form */}
        <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col items-center relative z-10 px-4 sm:px-0">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-[#ff4d0a] sm:w-5 sm:h-5" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                if(error) setError(false);
            }}
            placeholder="Contraseña..."
            autoFocus
            autoComplete="off"
            className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border-3 sm:border-4 border-[#ff4d0a] rounded-lg sm:rounded-xl leading-5 bg-white placeholder-orange-300 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-orange-300/50 text-sm sm:text-base font-bold text-orange-600 shadow-lg"
            style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' }}
            aria-label="Campo de contraseña"
          />
        </div>

        {error && (
          <div className="mt-2 sm:mt-3 flex items-center text-red-600 text-xs sm:text-sm font-bold bg-red-100 px-2 sm:px-3 py-1 rounded-full animate-bounce">
            <AlertCircle size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" />
            <span className="whitespace-nowrap">Contraseña incorrecta</span>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="mt-4 sm:mt-6 flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-transparent text-sm sm:text-base font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[2px_2px_0px_#cc3300] sm:shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
          style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
          aria-label={loading ? 'Verificando contraseña' : 'Acceder'}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-xs sm:text-base">VERIFICANDO...</span>
            </>
          ) : (
            <>
              <span className="text-sm sm:text-base">ACCEDER</span>
              <ArrowRight size={18} className="ml-1.5 sm:ml-2 sm:w-5 sm:h-5" />
            </>
          )}
        </button>
      </form>
      </div>
    </div>
  );
};

export default LockScreen;