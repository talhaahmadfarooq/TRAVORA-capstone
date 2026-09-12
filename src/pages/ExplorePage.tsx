import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { Search, MapPin, Building, Leaf, Utensils, Compass, Home, ChevronRight } from 'lucide-react';
import { DESTINATION_THEMES, DEFAULT_THEME } from '../data/destinationThemes';

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter logic
  const filteredDestinations = mockDestinations.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.country.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const featuredIds = ['tokyo', 'venice', 'paris', 'istanbul', 'santorini', 'newyork'];
  const featured = featuredIds.map(id => filteredDestinations.find(d => d.id === id)).filter(Boolean) as typeof mockDestinations;

  const categories = [
    { name: 'All', icon: Home },
    { name: 'Cities', icon: Building },
    { name: 'Nature', icon: Leaf },
    { name: 'Culture', icon: MapPin },
    { name: 'Food', icon: Utensils },
    { name: 'Adventure', icon: Compass },
  ];

  const exploreByCategory = ['Food & Drink', 'Culture', 'Nature', 'Nightlife', 'Shopping', 'Wellness', 'Adventure', 'History'];

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      background: '#050a10',
      color: '#ffffff',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      {/* Cinematic Earth Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, left: 0, width: '100%', height: '100vh', 
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.6
      }}>
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80" 
          alt="Earth from space" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #050a10 10%, rgba(5,10,16,0.6) 50%, #050a10 95%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050a10 0%, transparent 30%)' }} />
      </div>

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '1800px', 
        margin: '0 auto', 
        padding: '160px 4% 80px',
        display: 'flex',
        gap: '60px',
        alignItems: 'flex-start'
      }}>
        
        {/* LEFT COLUMN: TITLE & CONTROLS */}
        <div style={{ flex: '1 1 30%', position: 'sticky', top: '160px' }}>
          <div style={{ 
            fontSize: '0.8rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'var(--color-accent-gold)',
            marginBottom: '16px'
          }}>
            Discover the World
          </div>
          
          <div style={{ position: 'relative', marginBottom: '40px' }}>
            <h1 style={{ 
              fontFamily: '"Playfair Display", serif', 
              fontSize: '6rem', 
              fontWeight: 700, 
              lineHeight: 1,
              letterSpacing: '-0.02em',
              margin: 0
            }}>
              Explore
            </h1>
            <span style={{ 
              fontFamily: '"Great Vibes", cursive', 
              fontSize: '5rem',
              color: 'var(--color-text-secondary)',
              position: 'absolute',
              top: '40px',
              left: '180px',
              transform: 'rotate(-5deg)'
            }}>
              More
            </span>
          </div>

          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--color-text-secondary)', 
            marginBottom: '48px',
            fontFamily: '"Inter", sans-serif'
          }}>
            Extraordinary places. Curated for you.
          </p>

          <div style={{ 
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
            maxWidth: '400px'
          }}>
            <Search size={20} color="var(--color-text-secondary)" />
            <input 
              type="text" 
              placeholder="Search destinations, countries, or experiences..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none',
                width: '100%',
                fontFamily: '"Inter", sans-serif'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.name;
              return (
                <div 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.6,
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.opacity = '0.6'; }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s'
                  }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{cat.name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* CENTER: ASYMMETRIC DESTINATION GRID */}
        <div style={{ flex: '1 1 50%' }}>
          <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
            Featured Destinations
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gridAutoRows: '180px',
            gap: '24px'
          }}>
            {featured.map((dest, i) => {
              // Asymmetric logic: Make first and last items span 2 cols and be taller
              const isLarge = i === 0 || i === 5;
              const theme = DESTINATION_THEMES[dest.id] || DEFAULT_THEME;
              
              return (
                <motion.div
                  key={dest.id}
                  onClick={() => navigate(`/destination/${dest.id}`)}
                  whileHover={{ y: -5 }}
                  style={{
                    gridColumn: isLarge ? 'span 2' : 'span 1',
                    gridRow: isLarge ? 'span 2' : 'span 1',
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <img src={dest.heroImage} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: theme.heroStyle.imageTreatment }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)' }} />
                  
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      {isLarge ? (
                        <>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '4px' }}>{dest.name}</h3>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{dest.country}</div>
                        </>
                      ) : (
                        <>
                          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '2px' }}>{dest.name}</h3>
                          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{dest.country}</div>
                        </>
                      )}
                    </div>
                    <div style={{ 
                      width: '32px', height: '32px', borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center' 
                    }}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* RIGHT: EXPLORE BY CATEGORY & EDITORIAL CARD */}
        <div style={{ flex: '1 1 20%', display: 'flex', flexDirection: 'column', gap: '60px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Explore By Category
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {exploreByCategory.map(cat => (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', opacity: 0.7, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.paddingLeft = '8px'; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.paddingLeft = '0'; }}
                >
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Compass size={12} />
                  </div>
                  <span style={{ fontSize: '0.9rem', fontFamily: '"Inter", sans-serif' }}>{cat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            position: 'relative', 
            height: '300px', 
            borderRadius: '16px', 
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80" alt="Journal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%)' }} />
            
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', marginBottom: '8px', lineHeight: 1.2 }}>
                Not just places.<br/>Stories.
              </h4>
              <button style={{ 
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '999px',
                padding: '8px 16px', fontSize: '0.75rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px',
                cursor: 'pointer'
              }}>
                Explore Journal <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
