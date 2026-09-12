import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { Search } from 'lucide-react';
import { GlassInput } from '../components/ui/GlassInput';
import { Heading, Body, Label } from '../components/ui/Typography';

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredDestinations = mockDestinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featured = filteredDestinations.slice(0, 2);
  const trending = filteredDestinations.slice(2, 6);
  const regions = filteredDestinations.slice(6);

  return (
    <div style={{ 
      width: '100vw', 
      minHeight: '100vh', 
      background: 'var(--neu-bg)',
      color: 'var(--color-text-primary)',
      paddingTop: '120px',
      paddingBottom: '80px',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 5%' }}>
        
        {/* Header & Search */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '80px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.5rem', marginBottom: '16px' }}>
            Discover the Extraordinary
          </h1>
          <Body style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', marginBottom: '40px' }}>
            From ancient ruins whispered about in legends to futuristic neon-lit skylines, explore our curated selection of global experiences.
          </Body>
          <div style={{ width: '100%', maxWidth: '600px' }}>
            <GlassInput 
              icon={<Search size={20} />} 
              placeholder="Search destinations, countries, or regions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredDestinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--color-text-secondary)' }}>
            No destinations found matching your search.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            
            {/* FEATURED SECTION */}
            {featured.length > 0 && (
              <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
                  <Heading as="h2" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem' }}>Featured Journeys</Heading>
                </div>
                <div style={{ display: 'flex', gap: '32px' }}>
                  {featured.map(dest => (
                    <motion.div 
                      key={dest.id}
                      whileHover={{ y: -8 }}
                      onClick={() => navigate(`/destination/${dest.id}`)}
                      style={{ 
                        flex: '1', 
                        height: '500px', 
                        position: 'relative',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={dest.heroImage} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', bottom: '32px', left: '32px' }}>
                        <Label style={{ display: 'block', color: 'var(--color-accent-gold)', marginBottom: '8px' }}>{dest.country}</Label>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '8px' }}>{dest.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '400px' }}>{dest.tagLine}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* TRENDING SECTION */}
            {trending.length > 0 && (
              <section>
                <Heading as="h2" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '32px' }}>Trending Now</Heading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                  {trending.map(dest => (
                    <motion.div
                      key={dest.id}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/destination/${dest.id}`)}
                      style={{
                        height: '340px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        position: 'relative',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={dest.heroImage} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                      <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                        <Label style={{ color: 'var(--color-accent-gold)', fontSize: '0.75rem', marginBottom: '4px' }}>{dest.country}</Label>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{dest.name}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* REGIONS SECTION */}
            {regions.length > 0 && (
              <section>
                <Heading as="h2" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '32px' }}>More Destinations</Heading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '24px' }}>
                  {regions.map(dest => (
                    <motion.div
                      key={dest.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => navigate(`/destination/${dest.id}`)}
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ height: '140px', width: '100%' }}>
                        <img src={dest.heroImage} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '16px' }}>
                        <Label style={{ color: 'var(--color-accent-gold)', fontSize: '0.7rem', marginBottom: '4px' }}>{dest.country}</Label>
                        <div style={{ fontSize: '1rem', fontWeight: 600 }}>{dest.name}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
