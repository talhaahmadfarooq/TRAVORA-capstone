import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockStays } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useToast } from '../components/ui/Toast';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { Display, Heading, Body, Meta } from '../components/ui/Typography';
import { Heart, Plus, MapPin, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function StayDetailPage() {
  const { id } = useParams<{ id: string }>();
  const stay = mockStays.find(s => s.id === id);
  const { toggleFavorite, isFavorite, addStayToTrip } = useTrip();
  const { toast } = useToast();
  const [reservingRoom, setReservingRoom] = useState<string | null>(null);

  if (!stay) return <div style={{ padding: '140px', textAlign: 'center' }}><Body>Stay not found.</Body></div>;

  const isFav = isFavorite('stay', stay.id);

  const handleFavorite = () => {
    toggleFavorite('stay', stay.id);
    toast(isFav ? 'Removed from favorites' : 'Added to favorites', 'success');
  };

  const handleReserve = (roomType: string) => {
    setReservingRoom(roomType);
    addStayToTrip(stay);
    setTimeout(() => {
      setReservingRoom(null);
      toast(`Reserved ${roomType} at ${stay.name}`, 'success');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '140px 24px 80px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
        <div>
          <Display style={{ fontSize: '4rem', marginBottom: '16px' }}>{stay.name}</Display>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', color: 'var(--color-text-secondary)' }}>
            <Meta style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}><MapPin size={20}/> {stay.location}</Meta>
            <Meta style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>â˜… {stay.rating}</Meta>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <GlassButton variant="secondary" onClick={handleFavorite} icon={<Heart size={20} fill={isFav ? 'var(--color-text-primary)' : 'none'} />}>
            {isFav ? 'Saved' : 'Save'}
          </GlassButton>
          <GlassButton variant="solid" onClick={() => addStayToTrip(stay)} icon={<Plus size={20} />}>
            Add to Trip
          </GlassButton>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', minHeight: '600px', marginBottom: '80px' }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{ flex: '2 1 400px', height: '600px', minWidth: 0 }}>
          <ImageWithFallback src={stay.gallery[0] || stay.image} style={{ width: '100%', height: '100%', borderRadius: '24px', objectFit: 'cover' }} />
        </motion.div>
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px', height: '600px', minWidth: 0 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ height: 'calc(50% - 12px)' }}>
            <ImageWithFallback src={stay.gallery[1] || stay.image} style={{ width: '100%', height: '100%', borderRadius: '24px', objectFit: 'cover' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ height: 'calc(50% - 12px)' }}>
            <GlassSurface hoverEffect style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '24px' }}>
              <Heading as="span" style={{ fontSize: '1.5rem' }}>View All Photos</Heading>
            </GlassSurface>
          </motion.div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '80px' }}>
        <div style={{ flex: '1 1 600px', minWidth: 0 }}>
          <Heading as="h2" style={{ marginBottom: '32px' }}>Overview</Heading>
          <Body style={{ fontSize: '1.25rem', lineHeight: 1.8, marginBottom: '64px' }}>
            {stay.overview}
          </Body>

          <Heading as="h2" style={{ marginBottom: '32px' }}>Available Suites</Heading>
          <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '24px', height: '600px', minWidth: 0 }}>
            {stay.rooms.map((room, idx) => (
              <GlassSurface key={idx} variant="tertiary" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Heading as="h3" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{room.type}</Heading>
                  <Meta>Up to {room.capacity} guests â€¢ King Bed â€¢ Living Area</Meta>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 500 }}>${room.price} <Meta>/night</Meta></div>
                  <GlassButton variant="solid" onClick={() => handleReserve(room.type)} disabled={reservingRoom === room.type}>
                    {reservingRoom === room.type ? 'Confirming...' : 'Reserve Suite'}
                  </GlassButton>
                </div>
              </GlassSurface>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 300px', minWidth: 0 }}>
          <GlassSurface variant="secondary" style={{ padding: '40px', position: 'sticky', top: '140px' }}>
            <Heading as="h3" style={{ fontSize: '1.75rem', marginBottom: '32px' }}>Amenities</Heading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {stay.amenities.map((am, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Check size={20} color="var(--color-text-primary)" /> 
                  <Body style={{ margin: 0 }}>{am}</Body>
                </li>
              ))}
            </ul>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
}





