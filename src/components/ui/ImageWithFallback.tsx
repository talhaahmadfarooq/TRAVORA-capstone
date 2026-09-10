import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackColor?: string;
}

export function ImageWithFallback({ 
  src, 
  alt = '', 
  className = '', 
  fallbackColor = 'linear-gradient(135deg, #0a1128 0%, #0f172a 100%)',
  style,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error || !src) {
    return (
      <div 
        className={className}
        style={{ 
          background: fallbackColor,
          width: props.width || '100%',
          height: props.height || '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
          ...style 
        }}
      >
        <span style={{ opacity: 0.5 }}>Image Unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      onLoad={() => setLoaded(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        objectFit: 'cover',
        ...style
      }}
      {...props}
    />
  );
}
