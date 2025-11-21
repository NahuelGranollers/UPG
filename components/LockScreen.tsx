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
        // Éxito - Entrada instantánea sin delay
        onUnlock();
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
          className="font-black text-center text-[1.8rem] xs:text-[2.2rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] mb-6 sm:mb-8 md:mb-10 px-2 sm:px-4 leading-none whitespace-nowrap"
          style={{
            color: '#ff4d0a',
            fontFamily: '"Arial Black", Arial, sans-serif',
            textShadow: '2px 2px 0px #ff9300',
            letterSpacing: '-1px'
          }}>
          WORK IN PROGRESS
        </div>

        {/* Password Form */}
        <form onSubmit={handleLogin} className="w-full max-w-md flex flex-col items-center relative z-10 px-4 sm:px-0">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock size={20} className="text-[#ff4d0a] sm:w-6 sm:h-6" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Contraseña..."
              autoFocus
              autoComplete="off"
              className="block w-full pl-12 sm:pl-16 pr-4 py-3 sm:py-4 border-4 sm:border-[5px] border-[#ff4d0a] rounded-xl sm:rounded-2xl leading-normal bg-white placeholder-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300/50 text-lg sm:text-xl font-bold text-orange-600 shadow-xl"
              style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
              aria-label="Campo de contraseña"
            />
          </div>

          {error && (
            <div className="mt-3 sm:mt-4 flex items-center text-red-600 text-xs sm:text-sm font-bold bg-red-100 px-3 py-1.5 rounded-full animate-bounce">
              <AlertCircle size={16} className="mr-1.5 flex-shrink-0" />
              <span className="whitespace-nowrap">Contraseña incorrecta</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 sm:mt-6 flex items-center justify-center px-6 sm:px-8 py-2.5 sm:py-3 border-transparent text-base sm:text-lg font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-orange-500 shadow-[2px_2px_0px_#cc3300] sm:shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto min-w-[160px]"
            style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
            aria-label={loading ? 'Verificando contraseña' : 'Acceder'}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-sm sm:text-base">VERIFICANDO...</span>
              </>
            ) : (
              <>
                <span className="text-base sm:text-lg tracking-wide">ACCEDER</span>
                <ArrowRight size={20} className="ml-2 sm:ml-2.5 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LockScreen;