import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  showFallbackIcon?: boolean;
}

const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc, 
  showFallbackIcon = true,
  className = '',
  onError,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (onError) {
      onError(e);
    }

    // Try fallback if provided
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    // If no fallback or fallback also failed, show error state
    setHasError(true);
  };

  if (hasError) {
    if (showFallbackIcon) {
      return (
        <div 
          className={`bg-discord-hover flex items-center justify-center ${className}`}
          role="img"
          aria-label={alt || 'Imagen no disponible'}
        >
          <ImageOff className="text-discord-text-muted" size={24} />
        </div>
      );
    }
    return null;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;

