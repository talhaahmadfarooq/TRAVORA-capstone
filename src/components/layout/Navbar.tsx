import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTrip } from '../../context/TripContext';
import { Bookmark, User } from 'lucide-react';

export function Navbar() {
  const { isAuthenticated, setLoginOpen } = useAuth();
  const { favorites } = useTrip();
  
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const favCount = favorites.destinations.length + favorites.stays.length;
  
  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10, 15, 25, 0.5)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        pointerEvents: 'auto'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-primary)' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.15em' }}>
            TRAVORA
          </span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link 
          to="/favorites"
          style={{ 
            color: 'var(--color-text-primary)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            transition: 'background 0.2s',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Bookmark size={18} />
          {favCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: 'var(--color-accent-gold)',
              color: '#000',
              fontSize: '0.65rem',
              fontWeight: 700,
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}>
              {favCount}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <Link 
            to="/profile"
            title="Profile"
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'var(--color-text-primary)',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <User size={17} color="#fff" />
          </Link>
        ) : (
          <button 
            onClick={() => setLoginOpen(true)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'var(--color-text-primary)',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <User size={16} />
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
}
