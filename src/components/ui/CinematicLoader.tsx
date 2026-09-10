import { useEffect, useState, useCallback } from 'react';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [phase, setPhase] = useState<'loading' | 'revealing' | 'holding' | 'exiting'>('loading');

  const handleEarthReady = useCallback(() => {
    setPhase('revealing');
    const hold = setTimeout(() => {
      setPhase('holding');
      const exit = setTimeout(() => {
        setPhase('exiting');
        const done = setTimeout(onComplete, 850);
        return () => clearTimeout(done);
      }, 550);
      return () => clearTimeout(exit);
    }, 700);
    return () => clearTimeout(hold);
  }, [onComplete]);

  useEffect(() => {
    window.addEventListener('earth-ready', handleEarthReady, { once: true });
    // Fallback: if earth takes > 7s, proceed anyway
    const fallback = setTimeout(() => handleEarthReady(), 7000);
    return () => {
      window.removeEventListener('earth-ready', handleEarthReady);
      clearTimeout(fallback);
    };
  }, [handleEarthReady]);

  const isVisible = phase !== 'exiting';
  const logoVisible = phase === 'revealing' || phase === 'holding' || phase === 'exiting';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#050810',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        transition: phase === 'exiting' ? 'opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* Radial vignette for depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at center, transparent 20%, rgba(0,0,0,0.7) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Logo block */}
      <div style={{
        opacity: logoVisible ? 1 : 0,
        transform: logoVisible ? 'scale(1) translateY(0px)' : 'scale(0.97) translateY(8px)',
        transition: 'opacity 0.75s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1)',
        textAlign: 'center',
        userSelect: 'none',
      }}>
        <h1 style={{
          fontFamily: 'var(--font-serif, serif)',
          fontSize: 'clamp(2.8rem, 8vw, 5rem)',
          letterSpacing: '0.22em',
          margin: '0 0 14px 0',
          fontWeight: 400,
          background: 'linear-gradient(155deg, #ffffff 0%, rgba(195,215,245,0.9) 50%, rgba(255,255,255,0.95) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          TRAVORA
        </h1>
        <p style={{
          fontSize: '0.72rem',
          letterSpacing: '0.5em',
          color: 'rgba(255,255,255,0.32)',
          margin: 0,
          textTransform: 'uppercase',
          fontWeight: 400,
        }}>
          Preparing your journey
        </p>
      </div>

      {/* Thin scanning line — minimal progress indicator */}
      <div style={{
        position: 'absolute',
        bottom: '12%',
        width: '100px',
        height: '1px',
        background: 'rgba(255,255,255,0.07)',
        overflow: 'hidden',
        opacity: phase === 'exiting' ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '35%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
          animation: 'loaderScan 1.8s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes loaderScan {
          0% { left: -35%; }
          100% { left: 135%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition-duration: 1ms !important; }
        }
      `}</style>
    </div>
  );
}
