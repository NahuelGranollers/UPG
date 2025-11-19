import React, { useEffect, useRef } from 'react';

const Voting: React.FC = () => {
  const logoRef = useRef<HTMLImageElement>(null);

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

  return (
    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden w-full h-full" style={{ backgroundColor: '#ffcc17' }}>
      <img 
        ref={logoRef}
        src="public/upg.png" 
        alt="UPG Logo" 
        className="object-cover mb-6 md:mb-10 w-[200px] h-[200px] md:w-[400px] md:h-[400px] block"
        style={{ 
            transition: 'transform 0.1s linear'
        }}
        onError={(e) => {
            // Fallback visual if image is missing in development environment
            e.currentTarget.style.display = 'none';
            const fallback = document.getElementById('logo-fallback');
            if (fallback) fallback.style.display = 'flex';
        }}
      />
      
      {/* Fallback circle if image fails to load */}
      <div 
        id="logo-fallback"
        ref={logoRef as any} // Apply animation here too if img fails
        className="hidden w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-orange-500 rounded-full items-center justify-center mb-6 md:mb-10 border-4 border-white text-white font-bold text-2xl"
      >
        UPG
      </div>

      <div 
        className="font-black text-center text-[1.7em] md:text-[3em]" 
        style={{ 
          color: '#ff4d0a', 
          fontFamily: '"Arial Black", Arial, sans-serif',
          textShadow: '3px 3px 0px #ff9300', // Mobile shadow
          letterSpacing: '2px'
      }}>
         coming soon...
      </div>
      
      {/* Desktop shadow adjustment via style tag for media query specific override if needed, 
          but generic 3px usually works for both based on your CSS */}
      <style>{`
        @media (min-width: 768px) {
            .coming-text {
                text-shadow: 3px 3px 0px #ff9300;
            }
        }
      `}</style>
    </div>
  );
};

export default Voting;