import { Link } from 'react-router-dom';
import { mockDestinations } from '../data/mockData';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { Display, Heading, Meta } from '../components/ui/Typography';

import { motion } from 'framer-motion';

export function DestinationsPage() {
  return (
    <div style={{ padding: '140px 24px 80px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <Display style={{ marginBottom: '64px', textAlign: 'center' }}>
        The Collection
      </Display>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {mockDestinations.map((dest, index) => (
          <motion.div 
            key={dest.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: '48px',
              alignItems: 'center'
            }}
          >
            <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
              <Link to={`/destinations/${dest.id}`} style={{ display: 'block', overflow: 'hidden', borderRadius: '16px' }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }}>
                  <ImageWithFallback 
                    src={dest.heroImage} 
                    alt={dest.name} 
                    style={{ width: '100%', height: '600px', objectFit: 'cover' }} 
                  />
                </motion.div>
              </Link>
            </div>
            
            <div style={{ order: index % 2 === 0 ? 2 : 1, padding: '0 40px' }}>
              <Meta style={{ display: 'block', marginBottom: '16px' }}>{dest.country}</Meta>
              <Heading as="h2" style={{ fontSize: '3.5rem', marginBottom: '24px' }}>{dest.name}</Heading>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '40px' }}>
                {dest.description}
              </p>
              
              <Link to={`/destinations/${dest.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                Explore Destination <span style={{ transition: 'transform 0.3s' }}>&rarr;</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

