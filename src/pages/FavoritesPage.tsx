import { Link, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { mockDestinations, mockStays } from '../data/mockData';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { GlassSurface } from '../components/ui/GlassSurface';
import { Display, Heading, Body, Meta } from '../components/ui/Typography';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const backButtonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  color: 'var(--color-text-primary)',
  padding: '10px 20px',
  borderRadius: '999px',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: 500,
  backdropFilter: 'blur(8px)',
  marginBottom: '40px',
  transition: 'all 0.2s ease',
};

export function FavoritesPage() {
  const { favorites } = useTrip();
  const navigate = useNavigate();

  const favDestinations = mockDestinations.filter(d => favorites.destinations.includes(d.id));
  const favStays = mockStays.filter(s => favorites.stays.includes(s.id));

  if (favDestinations.length === 0 && favStays.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '140px 24px' }}>
        <button
          onClick={() => navigate(-1)}
          style={backButtonStyle}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <Display style={{ marginBottom: '24px', textAlign: 'center' }}>No Saved Items</Display>
        <Body style={{ fontSize: '1.25rem' }}>Your personal collection is empty.</Body>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '140px 24px 100px 24px' }}>
      <button
        onClick={() => navigate(-1)}
        style={backButtonStyle}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      >
        <ChevronLeft size={16} />
        Back
      </button>
      <Display style={{ marginBottom: '80px', textAlign: 'center' }}>Personal Collection</Display>

      {favDestinations.length > 0 && (
        <div style={{ marginBottom: '80px' }}>
          <Heading as="h2" style={{ marginBottom: '40px', fontSize: '2.5rem', borderBottom: '1px solid var(--glass-border-secondary)', paddingBottom: '24px' }}>Destinations</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {favDestinations.map((dest, idx) => (
              <motion.div key={dest.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Link to={`/destinations/${dest.id}`} style={{ display: 'block' }}>
                  <GlassSurface hoverEffect style={{ padding: '16px' }}>
                    <ImageWithFallback src={dest.heroImage} style={{ width: '100%', height: '240px', borderRadius: '12px', marginBottom: '24px', objectFit: 'cover' }} />
                    <Heading as="h3" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{dest.name}</Heading>
                    <Meta>{dest.country}</Meta>
                  </GlassSurface>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {favStays.length > 0 && (
        <div>
          <Heading as="h2" style={{ marginBottom: '40px', fontSize: '2.5rem', borderBottom: '1px solid var(--glass-border-secondary)', paddingBottom: '24px' }}>Stays</Heading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {favStays.map((stay, idx) => (
              <motion.div key={stay.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Link to={`/stays/${stay.id}`} style={{ display: 'block' }}>
                  <GlassSurface hoverEffect style={{ padding: '16px' }}>
                    <ImageWithFallback src={stay.image} style={{ width: '100%', height: '240px', borderRadius: '12px', marginBottom: '24px', objectFit: 'cover' }} />
                    <Heading as="h3" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{stay.name}</Heading>
                    <Meta>{stay.location}</Meta>
                  </GlassSurface>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
