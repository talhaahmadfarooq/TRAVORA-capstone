import { motion, AnimatePresence } from 'framer-motion';
import { GLOBE_LOCATIONS } from './GlobeScene';
import { GlassSurface } from '../ui/GlassSurface';
import { Heading, Meta } from '../ui/Typography';
import { Link } from 'react-router-dom';
import { mockDestinations } from '../../data/mockData';

interface DestinationCardsProps {
  appState: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
  isOpen: boolean;
}

export function DestinationCards({ appState, selectedId, onSelect, isOpen }: DestinationCardsProps) {
  if (appState !== 'EXPLORE') return null;

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -20, filter: 'blur(8px)', clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, scale: 0.85, y: -30, filter: 'blur(10px)', clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '240px',
              transformOrigin: 'top right',
            }}
          >
            {GLOBE_LOCATIONS.slice(0, 3).map((loc, i) => {
              const isSelected = selectedId === loc.id;
              const destData = mockDestinations.find(d => d.id === loc.id);
              const imageUrl = destData?.heroImage || '';
              
              return (
                <motion.div 
                  key={loc.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: 'easeOut' }}
                  onClick={() => onSelect(loc.id)}
                >
                  <GlassSurface
                    variant={isSelected ? 'primary' : 'secondary'}
                    hoverEffect={!isSelected}
                    style={{
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      transform: isSelected ? 'translateX(-10px)' : 'none',
                      borderColor: isSelected ? 'var(--color-accent-gold)' : 'var(--glass-border-secondary)',
                      boxShadow: isSelected ? '0 0 20px rgba(226, 177, 112, 0.2)' : 'none',
                      position: 'relative',
                    }}
                  >
                    <div style={{ height: '80px', borderRadius: '8px', background: 'var(--color-bg-elevated)', marginBottom: '16px', overflow: 'hidden' }}>
                      <img
                        src={imageUrl}
                        alt={loc.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isSelected ? 1 : 0.8 }}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                    <Heading as="h4" style={{ fontSize: '1.0rem', marginBottom: '8px', color: isSelected ? 'var(--color-accent-gold)' : 'var(--color-text-primary)' }}>{loc.name}</Heading>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Meta>Trending now</Meta>
                      
                      {/* Separate Explore Link that does NOT trigger the card click */}
                      <Link 
                        to={`/destination/${loc.id}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--color-text-primary)',
                          textDecoration: 'none',
                          background: 'rgba(255,255,255,0.1)',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          border: '1px solid rgba(255,255,255,0.2)',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                      >
                        Explore &rarr;
                      </Link>
                    </div>
                  </GlassSurface>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
