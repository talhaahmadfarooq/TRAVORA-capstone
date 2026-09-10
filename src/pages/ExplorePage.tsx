import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockDestinations } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useToast } from '../components/ui/Toast';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { Search, ArrowRight, Bookmark } from 'lucide-react';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Display, Heading, Body, Meta, Label } from '../components/ui/Typography';
import { motion, AnimatePresence } from 'framer-motion';

export function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useTrip();
  const { toast } = useToast();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Drag support refs
  const dragStartX = useRef<number | null>(null);
  const isDraggingCarousel = useRef(false);

  const filteredDestinations = mockDestinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeDestination = filteredDestinations[activeIndex] || filteredDestinations[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') {
        setActiveIndex(prev => Math.min(prev + 1, filteredDestinations.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredDestinations.length]);

  const handleFavoriteClick = (e: React.MouseEvent, id: string, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite('destination', id);
    const isNowFav = !isFavorite('destination', id);
    toast(isNowFav ? `${name} added to favorites` : `${name} removed from favorites`, 'success');
  };


  if (!activeDestination && filteredDestinations.length === 0) {
    return (
      <div style={{ paddingTop: '100px', padding: '24px', textAlign: 'center' }}>
        <GlassInput 
          icon={<Search size={20} />} 
          placeholder="Search destinations..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: '400px', margin: '0 auto 40px auto' }}
        />
        <Body>No destinations found.</Body>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'relative', 
      width: '100vw', 
      minHeight: '100vh', 
      overflow: 'hidden',
      background: 'var(--color-bg)'
    }}>
      {/* Background Hero Image with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDestination.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 0
          }}
        >
          <img 
            src={activeDestination.heroImage} 
            alt={activeDestination.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)'
          }} />
        </motion.div>
      </AnimatePresence>

      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        paddingTop: '120px', 
        paddingBottom: '40px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        
        {/* Top Search Bar */}
        <div style={{ position: 'absolute', top: '100px', left: '24px', right: '24px', zIndex: 20 }}>
          <div style={{ maxWidth: '400px', marginLeft: '5%' }}>
            <GlassInput 
              icon={<Search size={20} />} 
              placeholder="Search destinations, countries..." 
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setActiveIndex(0);
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          
          {/* Left Side: Destination Info */}
          <div style={{ width: '40%', paddingLeft: '6%', paddingRight: '4%' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${activeDestination.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <Label style={{ display: 'block', marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>
                  {activeDestination.country}
                </Label>
                <Display style={{ textTransform: 'uppercase', marginBottom: '24px' }}>
                  {activeDestination.name}
                </Display>
                <Body style={{ maxWidth: '450px', marginBottom: '40px', color: 'rgba(255,255,255,0.9)' }}>
                  {activeDestination.description}
                </Body>
                
                <Link to={`/destinations/${activeDestination.id}`}>
                  <GlassButton variant="primary" icon={<ArrowRight size={18} />}>
                    Explore
                  </GlassButton>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Horizontal Carousel with drag support */}
          <div
            style={{ width: '60%', height: '60vh', overflow: 'hidden', cursor: 'grab', userSelect: 'none' }}
            onMouseDown={(e) => { dragStartX.current = e.clientX; isDraggingCarousel.current = false; }}
            onMouseMove={() => { if (dragStartX.current !== null) isDraggingCarousel.current = true; }}
            onMouseUp={(e) => {
              if (dragStartX.current !== null) {
                const diff = e.clientX - dragStartX.current;
                if (Math.abs(diff) > 50) {
                  if (diff < 0) setActiveIndex(prev => Math.min(prev + 1, filteredDestinations.length - 1));
                  else setActiveIndex(prev => Math.max(prev - 1, 0));
                }
                dragStartX.current = null;
              }
            }}
            onMouseLeave={(e) => {
              if (dragStartX.current !== null) {
                const diff = e.clientX - dragStartX.current;
                if (Math.abs(diff) > 50) {
                  if (diff < 0) setActiveIndex(prev => Math.min(prev + 1, filteredDestinations.length - 1));
                  else setActiveIndex(prev => Math.max(prev - 1, 0));
                }
                dragStartX.current = null;
              }
            }}
          >
            <div 
              ref={carouselRef}
              style={{ 
                display: 'flex',
                gap: '24px',
                transform: `translateX(calc(-${activeIndex} * 304px))`,
                transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
                paddingLeft: '24px',
                alignItems: 'center',
                height: '100%',
                willChange: 'transform',
              }}
            >
              {filteredDestinations.map((dest, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.div 
                    key={dest.id}
                    onClick={() => setActiveIndex(idx)}
                    style={{ 
                      flexShrink: 0, 
                      width: isActive ? '340px' : '280px', 
                      height: isActive ? '480px' : '400px',
                      cursor: 'pointer',
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
                    }}
                  >
                    <ImageWithFallback 
                      src={dest.gallery[0] || dest.heroImage} 
                      alt={dest.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    {/* Glass Overlay on Card */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%)' : 'rgba(0,0,0,0.4)',
                      transition: 'background 0.3s'
                    }}>
                      <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%', flexDirection: 'column' }}>
                        
                        {/* Top Meta */}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Label style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{dest.country}</Label>
                          <GlassSurface variant="tertiary" style={{ borderRadius: '50%', padding: '8px' }} onClick={(e) => handleFavoriteClick(e, dest.id, dest.name)}>
                            <Bookmark size={18} fill={isFavorite('destination', dest.id) ? 'white' : 'none'} color="white" />
                          </GlassSurface>
                        </div>
                        
                        {/* Bottom Info */}
                        {isActive && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                            <Heading as="h3" style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{dest.name}</Heading>
                            <Meta>{dest.category}</Meta>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
