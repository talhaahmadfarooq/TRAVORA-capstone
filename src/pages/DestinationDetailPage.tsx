import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { ArrowLeft, MapPin, Calendar, Compass, CloudSun } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = mockDestinations.find(d => d.id === id);

  // Scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!destination) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--neu-bg)', color: 'var(--color-text-primary)' }}>
        <h2>Destination not found</h2>
        <Button onClick={() => navigate('/explore')} style={{ marginLeft: '16px' }}>Back to Explore</Button>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'var(--neu-bg)', 
      minHeight: '100vh', 
      color: 'var(--color-text-primary)',
      paddingBottom: '120px' 
    }}>
      {/* Hero Section */}
      <div style={{ position: 'relative', height: '70vh', width: '100%', overflow: 'hidden' }}>
        <img 
          src={destination.heroImage} 
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ 
          position: 'absolute', inset: 0, 
          background: 'linear-gradient(to bottom, rgba(10,15,25,0.2) 0%, rgba(10,15,25,0.8) 70%, var(--neu-bg) 100%)' 
        }} />
        
        <div style={{ position: 'absolute', top: '90px', left: '5%' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <ArrowLeft size={20} />
          </button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '5%',
            right: '5%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span style={{ 
              color: 'var(--color-accent-gold)', 
              fontSize: '0.85rem', 
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <MapPin size={14} /> {destination.country} &mdash; {destination.category}
            </span>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '4.5rem', 
              lineHeight: 1.1,
              marginBottom: '16px'
            }}>
              {destination.name}
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.02em',
              lineHeight: 1.6
            }}>
              {destination.tagLine}
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '32px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Weather</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <CloudSun size={18} color="var(--color-accent-gold)" />
                {destination.weather.temp}°C
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>Best Time</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <Calendar size={18} color="var(--color-accent-gold)" />
                {destination.bestTime.split(' ')[0]}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Asymmetric Layout */}
      <div style={{ padding: '80px 5%', display: 'flex', gap: '60px' }}>
        
        {/* Left Column (Content) */}
        <div style={{ flex: '1 1 60%' }}>
          <div style={{ marginBottom: '60px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '24px' }}>
              The Experience
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--color-text-secondary)' }}>
              {destination.description}
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '32px' }}>
              Curated Places & Experiences
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {destination.experiences.map((exp, index) => (
                <motion.div 
                  key={exp.id}
                  id={exp.id} // Support deep linking
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ 
                    display: 'flex', 
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    gap: '32px',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '24px',
                    padding: '24px',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{ flex: '1 1 50%', height: '300px', borderRadius: '16px', overflow: 'hidden' }}>
                    <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: '1 1 50%', padding: '24px' }}>
                    <div style={{ 
                      display: 'inline-block', padding: '4px 12px', borderRadius: '999px', 
                      background: 'rgba(226, 177, 112, 0.1)', color: 'var(--color-accent-gold)', 
                      fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '16px' 
                    }}>
                      {exp.duration}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '16px' }}>{exp.title}</h3>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>{exp.description}</p>
                    <Button variant="outline" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>Add to Journey</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Sidebar & Metadata) */}
        <div style={{ flex: '1 1 30%', position: 'relative' }}>
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              borderRadius: '24px', 
              padding: '32px', 
              border: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={20} color="var(--color-accent-gold)" /> Fast Facts
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Language</span>
                  <span>{destination.language}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Currency</span>
                  <span>{destination.currency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Timezone</span>
                  <span>{destination.timezone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Vibe</span>
                  <span>{destination.mood}</span>
                </div>
              </div>
            </div>

            <div style={{ 
              borderRadius: '24px', 
              overflow: 'hidden',
              position: 'relative',
              height: '400px'
            }}>
              <img src={destination.gallery[0]} alt="Gallery" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px' }}>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Start Planning</h4>
                <Button>Find Flights</Button>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
