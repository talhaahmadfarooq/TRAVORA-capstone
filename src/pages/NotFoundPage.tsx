import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' }}>
      <h1 style={{ fontSize: '4rem', margin: '0 0 16px 0', color: 'var(--color-accent-gold)' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', margin: '0 0 24px 0' }}>Looks like you've gone off the map.</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '400px' }}>
        The page you are looking for doesn't exist or has been moved to another coordinate.
      </p>
      <Link to="/explore">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}

