import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockStays } from '../data/mockData';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { GlassInput } from '../components/ui/GlassInput';
import { GlassButton } from '../components/ui/GlassButton';
import { Display, Heading, Body, Meta, Label } from '../components/ui/Typography';
import { Search, Map } from 'lucide-react';
import { motion } from 'framer-motion';

export function StaysPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStays = mockStays.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '140px 24px 80px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
        <div style={{ maxWidth: '600px' }}>
          <Display style={{ marginBottom: '24px' }}>Extraordinary Stays</Display>
          <Body style={{ fontSize: '1.25rem' }}>
            Discover our highly curated collection of world-class properties, from hidden ryokans to private island villas.
          </Body>
        </div>
        <GlassButton variant="secondary" icon={<Map size={18}/>}>Map View</GlassButton>
      </div>

      <div style={{ maxWidth: '400px', marginBottom: '80px' }}>
        <GlassInput 
          icon={<Search size={20} />}
          placeholder="Search by hotel name or location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '48px' }}>
        {filteredStays.map((stay, index) => (
          <motion.div 
            key={stay.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Link to={`/stays/${stay.id}`} style={{ display: 'block' }}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ borderRadius: '16px', overflow: 'hidden', height: '320px', position: 'relative' }}>
                  <ImageWithFallback src={stay.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', padding: '6px 12px', borderRadius: '999px', color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                    ★ {stay.rating}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <Heading as="h3" style={{ fontSize: '1.5rem', margin: 0 }}>{stay.name}</Heading>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>${stay.pricePerNight}</div>
                      <Meta style={{ fontSize: '0.75rem' }}>/night</Meta>
                    </div>
                  </div>
                  <Meta style={{ display: 'block', marginBottom: '24px' }}>{stay.location}</Meta>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {stay.amenities.slice(0, 3).map((am, i) => (
                      <Label key={i} style={{ padding: '6px 10px', border: '1px solid var(--glass-border-secondary)', borderRadius: '6px' }}>
                        {am}
                      </Label>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
