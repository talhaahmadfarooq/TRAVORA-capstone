import { useParams, Link } from 'react-router-dom';
import { mockDestinations, mockStays } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useToast } from '../components/ui/Toast';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { Display, Heading, Body, Meta, Label } from '../components/ui/Typography';
import { Heart, Plus, MapPin, Calendar, Globe, CreditCard, Clock, Cloud, Wind, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

export function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dest = mockDestinations.find(d => d.id === id);
  const { toggleFavorite, isFavorite } = useTrip();
  const { toast } = useToast();

  if (!dest) {
    return <div style={{ padding: '140px 24px', textAlign: 'center' }}><Body>Destination not found.</Body></div>;
  }

  const isFav = isFavorite('destination', dest.id);

  const handleFavorite = () => {
    toggleFavorite('destination', dest.id);
    toast(isFav ? 'Removed from favorites' : 'Added to favorites', 'success');
  };

  const handleAddTrip = () => {
    toast(`Added ${dest.name} to Trip!`, 'success');
  };

  const relatedStays = mockStays.filter(s => dest.recommendedStayIds.includes(s.id));

  return (
    <div style={{ paddingBottom: '80px', background: 'var(--color-bg)' }}>
      {/* Cinematic Hero */}
      <div style={{ position: 'relative', height: '80vh', minHeight: '600px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%' }}
        >
          <ImageWithFallback 
            src={dest.heroImage} 
            alt={dest.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </motion.div>
        
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(to top, var(--color-bg) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '80px 24px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}
          >
            <Label style={{ display: 'inline-block', marginBottom: '16px', color: 'rgba(255,255,255,0.7)' }}>{dest.category}</Label>
            <Display style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', margin: '0 0 16px 0', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>{dest.name}</Display>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)', fontSize: '1.1rem', marginBottom: '24px' }}>
              <MapPin size={18} />
              <span>{dest.country}</span>
            </div>
            <p style={{ fontSize: '1.75rem', fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.9)', margin: '0 0 40px 0', maxWidth: '800px', lineHeight: 1.4 }}>
              {dest.tagLine}
            </p>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <GlassButton variant="solid" onClick={handleAddTrip} icon={<Plus size={18} />}>
                Add to Trip
              </GlassButton>
              <GlassButton variant="secondary" onClick={handleFavorite} icon={<Heart size={18} fill={isFav ? 'var(--color-text-primary)' : 'none'} />}>
                {isFav ? 'Saved' : 'Save'}
              </GlassButton>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px' }}>
        
        {/* Info Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Calendar size={24} color="var(--color-text-secondary)" />
            <div>
              <Label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Best Time</Label>
              <Meta style={{ color: 'var(--color-text-primary)' }}>{dest.bestTime}</Meta>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Globe size={24} color="var(--color-text-secondary)" />
            <div>
              <Label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Language</Label>
              <Meta style={{ color: 'var(--color-text-primary)' }}>{dest.language}</Meta>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <CreditCard size={24} color="var(--color-text-secondary)" />
            <div>
              <Label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Currency</Label>
              <Meta style={{ color: 'var(--color-text-primary)' }}>{dest.currency}</Meta>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <Clock size={24} color="var(--color-text-secondary)" />
            <div>
              <Label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '8px' }}>Timezone</Label>
              <Meta style={{ color: 'var(--color-text-primary)' }}>{dest.timezone}</Meta>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px' }}>
          {/* Main Content */}
          <div>
            <Heading as="h2" style={{ marginBottom: '32px' }}>Overview</Heading>
            <Body style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '64px' }}>
              {dest.description}
            </Body>

            <Heading as="h2" style={{ marginBottom: '40px' }}>Curated Experiences</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '64px' }}>
              {dest.experiences.map(exp => (
                <div key={exp.id} style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                  <ImageWithFallback src={exp.image} style={{ width: '160px', height: '160px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <Heading as="h3" style={{ fontSize: '1.35rem', marginBottom: '12px' }}>{exp.title}</Heading>
                    <Body style={{ marginBottom: '16px' }}>{exp.description}</Body>
                    <Meta style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={16} /> {exp.duration}
                    </Meta>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <GlassSurface variant="secondary" style={{ padding: '32px', marginBottom: '48px' }}>
              <Heading as="h3" style={{ margin: '0 0 24px 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cloud size={20} /> Current Conditions
              </Heading>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                <Display style={{ fontSize: '3.5rem', margin: 0 }}>{dest.weather.temp}°</Display>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{dest.weather.condition}</div>
                  <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>Feels crisp</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border-secondary)', paddingTop: '24px' }}>
                <Meta style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Droplets size={16}/> {dest.weather.humidity}%</Meta>
                <Meta style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Wind size={16}/> {dest.weather.wind}</Meta>
              </div>
            </GlassSurface>

            <Heading as="h3" style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Where to Stay</Heading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {relatedStays.map(stay => (
                <Link to={`/stays/${stay.id}`} key={stay.id} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ scale: 1.02 }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ImageWithFallback src={stay.image} style={{ width: '100%', height: '200px', borderRadius: '12px', objectFit: 'cover' }} />
                    <div>
                      <Heading as="h4" style={{ margin: '0 0 8px 0', fontSize: '1.2rem' }}>{stay.name}</Heading>
                      <Meta>★ {stay.rating} • ${stay.pricePerNight}/night</Meta>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <GlassButton variant="secondary" style={{ width: '100%', marginTop: '48px', justifyContent: 'center' }} onClick={() => toast("Opening interactive globe view...", "info")}>
              See on Globe &rarr;
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
}
