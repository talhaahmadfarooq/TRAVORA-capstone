import { motion } from 'framer-motion';
import { GLOBE_LOCATIONS } from './GlobeScene';
import { GlassSurface } from '../ui/GlassSurface';
import { Heading, Meta } from '../ui/Typography';

interface DestinationCardsProps {
  appState: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const LOCATION_IMAGES: Record<string, string> = {
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
  newyork: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
  lahore: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=600&q=80',
  switzerland: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
};

export function DestinationCards({ appState, selectedId, onSelect }: DestinationCardsProps) {
  // Only show in EXPLORE state
  if (appState !== 'EXPLORE') return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '240px'
      }}
    >
      {GLOBE_LOCATIONS.slice(0, 3).map((loc) => {
        const isSelected = selectedId === loc.id;
        const imageUrl = LOCATION_IMAGES[loc.id] || '';
        return (
          <div key={loc.id} onClick={() => onSelect(loc.id)}>
            <GlassSurface
              variant={isSelected ? 'primary' : 'secondary'}
              hoverEffect={!isSelected}
              style={{
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                transform: isSelected ? 'translateX(-10px)' : 'none',
                borderColor: isSelected ? 'var(--glass-border-highlight)' : 'var(--glass-border-secondary)'
              }}
            >
              <div style={{ height: '80px', borderRadius: '8px', background: 'var(--color-bg-elevated)', marginBottom: '16px', overflow: 'hidden' }}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={loc.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>
              <Heading as="h4" style={{ fontSize: '1.0rem', marginBottom: '4px' }}>{loc.name}</Heading>
              <Meta>Discover experiences</Meta>
            </GlassSurface>
          </div>
        );
      })}
    </motion.div>
  );
}
