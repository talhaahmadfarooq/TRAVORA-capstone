import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { DESTINATION_THEMES, DEFAULT_THEME } from '../data/destinationThemes';
import { ArrowLeft, CloudSun, Calendar, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Inject Google Fonts dynamically based on theme
function useGoogleFonts(displayFont: string, secondaryFont: string) {
  useEffect(() => {
    const fonts = [displayFont, secondaryFont].map(f => {
      const match = f.match(/"([^"]+)"/);
      return match ? match[1] : null;
    }).filter(Boolean);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    const fontQuery = fonts.map(f => `family=${f?.replace(/ /g, '+')}:wght@400;700`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [displayFont, secondaryFont]);
}

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = mockDestinations.find(d => d.id === id);
  const theme = id ? (DESTINATION_THEMES[id] || DEFAULT_THEME) : DEFAULT_THEME;

  const [activeSection, setActiveSection] = useState('Overview');
  const [mastheadError, setMastheadError] = useState(false);

  useEffect(() => {
    setMastheadError(false);
  }, [id]);

  useGoogleFonts(theme.displayFont, theme.secondaryFont);

  if (!destination) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--neu-bg)', color: 'var(--color-text-primary)' }}>
        <h2>Destination not found</h2>
        <Button onClick={() => navigate('/explore')} style={{ marginLeft: '16px' }}>Back to Explore</Button>
      </div>
    );
  }

  // CSS variables for the theme
  const themeStyle = {
    '--theme-bg': theme.palette.background,
    '--theme-text-primary': theme.palette.textPrimary,
    '--theme-text-secondary': theme.palette.textSecondary,
    '--theme-accent': theme.palette.accent,
    '--theme-surface': theme.palette.surface,
    '--theme-surface-border': theme.palette.surfaceBorder,
    '--theme-display-font': theme.displayFont,
    '--theme-secondary-font': theme.secondaryFont,
    '--theme-body-font': theme.bodyFont,
  } as React.CSSProperties;

  const navItems = ['Overview', 'Places', 'Experiences', 'Food', 'Nightlife'];

  return (
    <div 
      style={{ 
        ...themeStyle,
        backgroundColor: 'var(--theme-bg)', 
        color: 'var(--theme-text-primary)',
        fontFamily: 'var(--theme-body-font)',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* Texture Overlay */}
      {theme.texture !== 'none' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: theme.texture,
          opacity: 0.4,
          zIndex: 10,
          mixBlendMode: 'multiply'
        }} />
      )}

      {/* HERO SECTION */}
      <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        
        {/* Background Image & Effects */}
        <motion.div 
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img 
            src={destination.heroImage} 
            alt={destination.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              filter: theme.heroStyle.imageTreatment
            }}
          />
        </motion.div>
        
        {/* Gradients */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: theme.heroStyle.overlayGradient,
          pointerEvents: 'none'
        }} />

        {/* Back Button */}
        <div style={{ position: 'absolute', top: '100px', left: '4%', zIndex: 20 }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: theme.glassTreatment.background,
              backdropFilter: theme.glassTreatment.backdropFilter,
              border: theme.glassTreatment.border,
              color: 'var(--theme-text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Typography & Content */}
        <div style={{ 
          position: 'absolute', 
          inset: '0 4%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: theme.heroStyle.alignment === 'center' ? 'center' : 'flex-start',
          textAlign: theme.heroStyle.alignment === 'center' ? 'center' : 'left',
          zIndex: 15
        }}>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ maxWidth: theme.heroStyle.alignment === 'center' ? '800px' : '600px' }}
          >
            <div style={{ 
              fontFamily: 'var(--theme-secondary-font)',
              fontSize: '1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--theme-accent)',
              marginBottom: '16px',
              opacity: 0.9
            }}>
              {destination.country}
            </div>
            
            {destination.mastheadImage && !mastheadError ? (
              <img 
                src={destination.mastheadImage} 
                alt={destination.name} 
                className="destination-masthead"
                onError={() => setMastheadError(true)}
                style={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '30vh',
                  objectFit: 'contain',
                  objectPosition: theme.heroStyle.alignment === 'center' ? 'center' : 'left center',
                  marginBottom: '32px',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                }}
              />
            ) : (
              <h1 style={{ 
                fontFamily: 'var(--theme-display-font)', 
                fontSize: theme.heroStyle.titleSize, 
                fontWeight: theme.heroStyle.titleWeight,
                letterSpacing: theme.heroStyle.titleSpacing,
                textTransform: theme.heroStyle.titleTransform as any,
                lineHeight: 1,
                marginBottom: '24px',
                textShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                {destination.name}
              </h1>
            )}
            
            <p style={{ 
              fontFamily: 'var(--theme-secondary-font)',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              color: 'var(--theme-text-secondary)',
              marginBottom: '48px',
              maxWidth: '500px'
            }}>
              {destination.tagLine}
            </p>

            {/* Meta Stats & CTA */}
            <div style={{ 
              display: 'flex', 
              gap: '32px', 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: theme.heroStyle.alignment === 'center' ? 'center' : 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CloudSun size={20} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{destination.weather.temp}°C</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>{destination.weather.condition}</div>
                </div>
              </div>
              
              <div style={{ width: '1px', height: '30px', background: 'var(--theme-surface-border)' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Best time</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>{destination.bestTime.split(' ')[0]}</div>
                </div>
              </div>

              <div style={{ width: '1px', height: '30px', background: 'var(--theme-surface-border)' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={20} color="var(--theme-accent)" />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>12.4M</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-secondary)' }}>Annual visitors</div>
                </div>
              </div>

              <button style={{ 
                marginLeft: 'auto',
                background: 'transparent',
                border: '1px solid var(--theme-surface-border)',
                borderRadius: '999px',
                padding: '12px 24px',
                color: 'var(--theme-text-primary)',
                fontFamily: 'var(--theme-body-font)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                backdropFilter: theme.glassTreatment.backdropFilter
              }}>
                Explore &rarr;
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar Nav */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ 
            position: 'absolute', 
            right: '4%', 
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            zIndex: 20
          }}
        >
          {navItems.map((item, i) => (
            <div 
              key={item}
              onClick={() => {
                setActiveSection(item);
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }}
              style={{
                background: theme.glassTreatment.background,
                backdropFilter: theme.glassTreatment.backdropFilter,
                border: theme.glassTreatment.border,
                padding: '12px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '180px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--theme-surface)';
                e.currentTarget.style.transform = 'translateX(-5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.glassTreatment.background;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', background: '#333' }}>
                <img src={destination.gallery[i % destination.gallery.length]} alt={item} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--theme-secondary-font)', color: 'var(--theme-text-secondary)' }}>{item}</span>
            </div>
          ))}
        </motion.div>

        </section>

        {/* ADDITIONAL CONTENT SECTION - OVERVIEW */}
      <section style={{ padding: '100px 4%', maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '80px', position: 'relative', zIndex: 15 }}>
        <div style={{ flex: '1 1 60%' }}>
          {activeSection === 'Overview' && (
            <>
              <h2 style={{ fontFamily: 'var(--theme-display-font)', fontSize: '3rem', marginBottom: '32px' }}>
                The Experience
              </h2>
              <p style={{ fontFamily: 'var(--theme-body-font)', fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--theme-text-secondary)', marginBottom: '60px' }}>
                {destination.description}
              </p>
            </>
          )}

          {activeSection !== 'Overview' && (
            <h3 style={{ fontFamily: 'var(--theme-display-font)', fontSize: '2.5rem', marginBottom: '40px' }}>
              {activeSection}
            </h3>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {/* Pick the right array based on activeSection */}
            {(() => {
              const items = activeSection === 'Overview' || activeSection === 'Experiences' ? destination.experiences : 
                activeSection === 'Places' ? destination.places || [] :
                activeSection === 'Food' ? destination.food || [] :
                activeSection === 'Nightlife' ? destination.nightlife || [] : [];
                
              if (items.length === 0) {
                return (
                  <p style={{ fontFamily: 'var(--theme-body-font)', fontSize: '1.25rem', color: 'var(--theme-text-secondary)' }}>
                    We are currently curating the finest {activeSection.toLowerCase()} recommendations for {destination.name}.
                  </p>
                );
              }
              
              return items.map((exp, idx) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ 
                  display: 'flex', 
                  flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                  gap: '40px',
                  alignItems: 'center'
                }}
              >
                <div style={{ flex: '1 1 50%', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: '1 1 50%' }}>
                  <div style={{ color: 'var(--theme-accent)', fontFamily: 'var(--theme-secondary-font)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '16px' }}>
                    {exp.duration}
                  </div>
                  <h4 style={{ fontFamily: 'var(--theme-display-font)', fontSize: '2rem', marginBottom: '24px' }}>
                    {exp.title}
                  </h4>
                  <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
                    {exp.description}
                  </p>
                  <Button variant="outline" style={{ borderColor: 'var(--theme-surface-border)', color: 'var(--theme-text-primary)' }}>
                    Add to Journey
                  </Button>
                </div>
              </motion.div>
            ))})()}
          </div>
        </div>
      </section>

    </div>
  );
}
