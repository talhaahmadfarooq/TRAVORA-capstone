import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer style={{ 
      borderTop: '1px solid var(--color-border)', 
      padding: '48px 24px', 
      marginTop: 'auto',
      background: 'var(--color-bg)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          TRAVORA
        </div>
        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', maxWidth: '400px', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Curating the world's most extraordinary journeys, blending deep editorial insight with luxury travel architecture.
        </p>
        <div style={{ display: 'flex', gap: '24px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
          <Link to="/explore">Explore</Link>
          <Link to="/stays">Stays</Link>
          <Link to="/trips">My Trips</Link>
        </div>
        <div style={{ marginTop: '24px', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} TRAVORA Expeditions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

