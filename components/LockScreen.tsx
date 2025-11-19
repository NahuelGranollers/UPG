import React, { useState, useEffect, useRef } from 'react';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

// SHA-256 Hash of "UnasPartidillasGang"
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      // Calculate SHA-256 hash of input
      const msgBuffer = new TextEncoder().encode(password);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (hashHex === TARGET_HASH) {
        // Success
        setTimeout(() => {
            onUnlock();
        }, 500); // Small delay for effect
      } else {
        // Fail
        setError(true);
        setLoading(false);
      }
    } catch (err) {
      console.error("Crypto error", err);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden w-full h-full" style={{ backgroundColor: '#ffcc17' }}>
      
      {/* Animated Logo */}
      <img 
        ref={logoRef}
        src="public/upg.png" 
        alt="UPG Logo" 
        className="object-cover mb-8 w-[150px] h-[150px] md:w-[300px] md:h-[300px] block"
        style={{ transition: 'transform 0.1s linear' }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      {/* Work in Progress Text */}
      <div 
        className="font-black text-center text-[2em] md:text-[3.5em] mb-8 px-4 leading-tight" 
        style={{ 
          color: '#ff4d0a', 
          fontFamily: '"Arial Black", Arial, sans-serif',
          textShadow: '3px 3px 0px #ff9300',
          letterSpacing: '1px'
      }}>
         WORK IN PROGRESS
      </div>

      {/* Password Form */}
      <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col items-center relative z-10">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={20} className="text-[#ff4d0a]" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                if(error) setError(false);
            }}
            placeholder="Contraseña..."
            className="block w-full pl-10 pr-3 py-3 border-4 border-[#ff4d0a] rounded-xl leading-5 bg-white placeholder-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-300/50 sm:text-sm font-bold text-orange-600 shadow-lg"
            style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
          />
        </div>

        {error && (
          <div className="mt-3 flex items-center text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full animate-bounce">
            <AlertCircle size={16} className="mr-1" />
            <span>Contraseña incorrecta</span>
          </div>
        )}

        <button 
          type="submit"
          disabled={loading}
          className="mt-6 flex items-center justify-center px-8 py-3 border-transparent text-base font-black rounded-full text-white bg-[#ff4d0a] hover:bg-[#e03e00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-[3px_3px_0px_#cc3300] active:translate-y-[2px] active:shadow-none transition-all"
          style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
        >
          {loading ? 'VERIFICANDO...' : 'ACCEDER'}
          {!loading && <ArrowRight size={20} className="ml-2" />}
        </button>
      </form>
    </div>
  );
};

export default LockScreen;