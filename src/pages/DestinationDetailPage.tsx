import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockDestinations } from '../data/mockData';
import { DESTINATION_THEMES, DEFAULT_THEME } from '../data/destinationThemes';
import { ArrowLeft, CloudSun, Calendar, MapPin, Coffee, Moon, Camera } from 'lucide-react';
import { Button } from '../components/ui/Button';

// Inject Google Fonts dynamically
function useGoogleFonts(fontsToLoad: string[]) {
  useEffect(() => {
    const fonts = fontsToLoad.map(f => {
      const match = f.match(/"([^"]+)"/);
      return match ? match[1] : null;
    }).filter(Boolean);

    if (fonts.length === 0) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    const fontQuery = fonts.map(f => `family=${f?.replace(/ /g, '+')}:wght@400;600;700;900`).join('&');
    link.href = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [fontsToLoad.join(',')]);
}

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = mockDestinations.find(d => d.id === id);
  const theme = id ? (DESTINATION_THEMES[id] || DEFAULT_THEME) : DEFAULT_THEME;

  const [activeSection, setActiveSection] = useState('hero');

  // Load necessary fonts. We also include the fonts needed by the SVGs
  const fontsToLoad = [
    theme.displayFont, 
    theme.secondaryFont, 
    theme.bodyFont,
    '"Noto Nastaliq Urdu"', '"Great Vibes"', '"Permanent Marker"', 
    '"Shippori Mincho"', '"Cinzel Decorative"', '"Noto Sans Arabic"', 
    '"Noto Sans JP"', '"Playfair Display"', '"Caveat"', '"Anton"', '"Cinzel"'
  ];
  
  useGoogleFonts(fontsToLoad);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ScrollSpy implementation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    const sections = document.querySelectorAll('section[id], div[id="places"], div[id="food"], div[id="nightlife"], div[id="photos"], div[id="experiences"]');
    sections.forEach(s => observer.observe(s));
    
    return () => observer.disconnect();
  }, [destination]);

  if (!destination) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
        <h2>Destination not found</h2>
        <Button onClick={() => navigate('/explore')} style={{ marginLeft: '16px' }}>Back to Explore</Button>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', id: 'hero', icon: <MapPin size={16} /> },
    { label: 'Experiences', id: 'experiences', icon: <Camera size={16} /> },
    { label: 'Top Places', id: 'places', icon: <MapPin size={16} /> }, 
    { label: 'Food & Drink', id: 'food', icon: <Coffee size={16} /> }, 
    { label: 'Nightlife', id: 'nightlife', icon: <Moon size={16} /> }, 
  ];

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const TitleComponent = theme.TitleComponent;

  return (
    <div 
      style={{ 
        backgroundColor: theme.colorGrade.pageBackground, 
        color: theme.palette.textPrimary,
        fontFamily: theme.bodyFont,
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative'
      }}
    >
      {/* LOCALIZED READABILITY GRADIENT FOR SANTORINI/VENICE */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '350px',
        background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        zIndex: 15,
        pointerEvents: 'none'
      }} />

      {/* RIGHT SIDEBAR NAVIGATION (PRIMARY NAV) */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ 
          position: 'fixed', 
          right: '2%', 
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 20
        }}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <div 
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              style={{
                background: isActive ? theme.palette.accent : theme.colorGrade.glassBackground,
                backdropFilter: `blur(${theme.colorGrade.glassBlur})`,
                border: `1px solid ${isActive ? 'transparent' : theme.colorGrade.glassBorder}`,
                padding: '12px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                width: '180px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
                color: isActive ? '#000' : theme.palette.textPrimary,
                transform: isActive ? 'translateX(-10px)' : 'none',
                boxShadow: isActive ? `0 10px 20px rgba(0,0,0,0.3)` : 'none'
              }}
            >
              <div style={{ opacity: isActive ? 1 : 0.7 }}>
                {item.icon}
              </div>
              <span style={{ 
                fontSize: '0.8rem', 
                fontFamily: theme.secondaryFont, 
                fontWeight: isActive ? 700 : 400,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {item.label}
              </span>
            </div>
          )
        })}
      </motion.div>

      {/* HERO SECTION */}
      <section id="hero" style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
        
        {/* Cinematic Photography */}
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
        
        {/* Destination Color Grade Overlays */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: theme.colorGrade.overlayGradient,
          pointerEvents: 'none'
        }} />

        {/* Back Button */}
        <div style={{ position: 'absolute', top: '40px', left: '4%', zIndex: 20 }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              background: theme.colorGrade.glassBackground,
              backdropFilter: `blur(${theme.colorGrade.glassBlur})`,
              border: `1px solid ${theme.colorGrade.glassBorder}`,
              color: theme.palette.textPrimary,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <ArrowLeft size={18} />
          </button>
        </div>

        {/* Masthead & Content */}
        <div style={{ 
          position: 'absolute', 
          inset: '0 4%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: theme.heroStyle.alignment === 'center' ? 'center' : 'flex-start',
          textAlign: theme.heroStyle.alignment === 'center' ? 'center' : 'left',
          zIndex: 10
        }}>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ maxWidth: '800px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: theme.heroStyle.alignment === 'center' ? 'center' : 'flex-start' }}
          >
            <div style={{ 
              fontFamily: theme.secondaryFont,
              fontSize: '1rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: theme.palette.accent,
              marginBottom: '16px',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {destination.country}
            </div>
            
            {TitleComponent ? (
              <div style={{ width: theme.heroStyle.titleWidth, maxWidth: '100%', marginBottom: '24px' }}>
                <TitleComponent color={theme.palette.textPrimary} secondaryColor={theme.palette.accent} />
              </div>
            ) : (
              <h1 style={{ 
                fontFamily: theme.displayFont, 
                fontSize: '8rem', 
                fontWeight: 700,
                marginBottom: '24px',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                {destination.name}
              </h1>
            )}
            
            <p style={{ 
              fontFamily: theme.secondaryFont,
              fontSize: '1.25rem',
              lineHeight: 1.6,
              color: theme.palette.textPrimary,
              marginBottom: '48px',
              maxWidth: '500px',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}>
              {destination.tagLine}
            </p>

            {/* Meta Stats */}
            <div style={{ 
              display: 'flex', 
              gap: '32px', 
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: theme.heroStyle.alignment === 'center' ? 'center' : 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CloudSun size={20} color={theme.palette.accent} />
                <div style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>{destination.weather.temp}°C</div>
                  <div style={{ fontSize: '0.75rem', color: theme.palette.textSecondary }}>{destination.weather.condition}</div>
                </div>
              </div>
              <div style={{ width: '1px', height: '30px', background: theme.colorGrade.glassBorder }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={20} color={theme.palette.accent} />
                <div style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 600 }}>Best time</div>
                  <div style={{ fontSize: '0.75rem', color: theme.palette.textSecondary }}>{destination.bestTime.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDITORIAL SECTIONS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 4%', display: 'flex', flexDirection: 'column', gap: '160px', position: 'relative', zIndex: 10 }}>
        
        {/* Curated Experiences (Asymmetric overlap) */}
        <div id="experiences">
          <div style={{ marginBottom: '80px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: theme.displayFont, fontSize: '3.5rem', marginBottom: '16px' }}>Curated Experiences</h2>
              <p style={{ fontFamily: theme.secondaryFont, color: theme.palette.textSecondary, fontSize: '1.2rem', maxWidth: '500px' }}>
                {destination.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
            {destination.experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={exp.id} style={{ display: 'flex', flexDirection: isEven ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center' }}>
                  {/* Large Cinematic Image */}
                  <div style={{ flex: '1 1 60%', height: '500px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    <img src={exp.image} alt={exp.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: theme.heroStyle.imageTreatment }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%)' }} />
                  </div>
                  
                  {/* Editorial Text Block */}
                  <div style={{ flex: '1 1 40%', padding: '40px' }}>
                    <div style={{ color: theme.palette.accent, fontFamily: theme.secondaryFont, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '24px' }}>
                      {exp.duration}
                    </div>
                    <h3 style={{ fontFamily: theme.displayFont, fontSize: '2.5rem', marginBottom: '24px', lineHeight: 1.1 }}>
                      {exp.title}
                    </h3>
                    <p style={{ color: theme.palette.textSecondary, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '40px' }}>
                      {exp.description}
                    </p>
                    <button style={{
                      background: 'transparent',
                      border: `1px solid ${theme.colorGrade.glassBorder}`,
                      color: theme.palette.textPrimary,
                      padding: '12px 32px',
                      borderRadius: '999px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}>
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Places (Masonry-style editorial) */}
        <div id="places">
          <h2 style={{ fontFamily: theme.displayFont, fontSize: '3.5rem', marginBottom: '60px', textAlign: 'center' }}>Top Places</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: 'span 7', height: '600px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              <img src={destination.gallery[0] || destination.heroImage} alt="Place 1" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: theme.heroStyle.imageTreatment }} />
            </div>
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ flex: '1', borderRadius: '16px', overflow: 'hidden', position: 'relative', background: theme.colorGrade.glassBackground, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                 <h3 style={{ fontFamily: theme.secondaryFont, fontSize: '1.8rem', marginBottom: '16px' }}>Iconic Landmarks</h3>
                 <p style={{ color: theme.palette.textSecondary }}>Explore the architecture and history that defined {destination.name}.</p>
              </div>
              <div style={{ flex: '2', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                <img src={destination.gallery[1] || destination.heroImage} alt="Place 2" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: theme.heroStyle.imageTreatment }} />
              </div>
            </div>
          </div>
        </div>

        {/* Food & Drink (Full width cinematic break) */}
        <div id="food" style={{ position: 'relative', height: '70vh', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80" alt="Food" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: theme.heroStyle.imageTreatment }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '600px' }}>
            <div style={{ color: theme.palette.accent, fontFamily: theme.secondaryFont, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Gastronomy</div>
            <h2 style={{ fontFamily: theme.displayFont, fontSize: '4rem', marginBottom: '24px' }}>A Taste of {destination.name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', marginBottom: '40px' }}>Immerse yourself in the local culinary scene, from street markets to Michelin-starred dining.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
