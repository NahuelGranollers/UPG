import React, { useEffect, useRef, memo } from 'react';
import { Menu } from 'lucide-react';

interface VotingProps {
  onMenuToggle?: () => void;
}

const Voting: React.FC<VotingProps> = ({ onMenuToggle }) => {
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
    <div className="flex-1 flex flex-col items-center justify-center overflow-hidden w-full h-full px-4 bg-discord-chat relative" style={{ paddingTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))', paddingLeft: 'calc(1rem + env(safe-area-inset-left, 0px))' }}>
      <img
        ref={logoRef}
        src="/upg.png"
        alt="UPG Logo"
        className="object-cover mb-6 sm:mb-8 md:mb-10 w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] block"
        style={{
          transition: 'transform 0.1s linear',
        }}
        onError={e => {
          // Fallback visual if image is missing in development environment
          e.currentTarget.style.display = 'none';
          const fallback = document.getElementById('logo-fallback');
          if (fallback) fallback.style.display = 'flex';
        }}
      />

      {/* Fallback circle if image fails to load */}
      <div
        id="logo-fallback"
        ref={logoRef as React.RefObject<HTMLDivElement>} // Apply animation here too if img fails
        className="hidden w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-discord-blurple rounded-discord items-center justify-center mb-6 sm:mb-8 md:mb-10 border-4 border-discord-hover text-discord-text-header font-bold text-xl sm:text-2xl"
      >
        UPG
      </div>

      <div className="font-black text-center text-[1.5em] sm:text-[1.7em] md:text-[2.5em] lg:text-[3em] text-discord-text-header">
        coming soon...
      </div>
    </div>
  );
};

export default memo(Voting);
