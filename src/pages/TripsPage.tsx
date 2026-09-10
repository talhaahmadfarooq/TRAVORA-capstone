import { useTrip } from '../context/TripContext';
import { useToast } from '../components/ui/Toast';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { Display, Heading, Body, Meta, Label } from '../components/ui/Typography';
import { Plane, Heart, Clock, MapPin, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function TripsPage() {
  const { currentTrip, removeTripItem, reorderTripItems } = useTrip();
  const { toast } = useToast();

  if (!currentTrip || currentTrip.days.length === 0) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '140px 24px', minHeight: '80vh' }}>
        <MapPin size={64} color="var(--glass-border-primary)" style={{ marginBottom: '32px' }} />
        <Display style={{ marginBottom: '24px', textAlign: 'center' }}>Your Journey is Empty</Display>
        <Body style={{ marginBottom: '48px', fontSize: '1.25rem', textAlign: 'center' }}>Start exploring the world to build your itinerary.</Body>
        <Link to="/explore">
          <GlassButton variant="solid">Explore Destinations</GlassButton>
        </Link>
      </div>
    );
  }

  const handleRemove = (dayIdx: number, itemId: string) => {
    removeTripItem(dayIdx, itemId);
    toast('Item removed from itinerary', 'info');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane size={24} color="var(--color-text-primary)" />;
      case 'stay': return <Heart size={24} color="var(--color-text-primary)" />;
      default: return <Clock size={24} color="var(--color-text-primary)" />;
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '140px 24px 100px 24px', width: '100%' }}>
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <Display style={{ marginBottom: '24px' }}>{currentTrip.title}</Display>
        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', color: 'var(--color-text-secondary)' }}>
          <Meta style={{ fontSize: '1.1rem' }}>{currentTrip.destinationName}</Meta>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-text-muted)' }}></span>
          <Meta style={{ fontSize: '1.1rem' }}>{currentTrip.startDate} &mdash; {currentTrip.endDate}</Meta>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        {currentTrip.days.map((day, dayIdx) => (
          <motion.div 
            key={day.dayNumber}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
              <div style={{ 
                width: '64px', height: '64px', borderRadius: '50%', 
                background: 'var(--color-text-primary)', color: 'var(--color-bg)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontFamily: 'var(--font-serif)', fontSize: '2rem' 
              }}>
                {day.dayNumber}
              </div>
              <div>
                <Heading as="h2" style={{ margin: '0 0 4px 0', fontSize: '2rem' }}>Day {day.dayNumber}</Heading>
                <Meta style={{ fontSize: '1rem' }}>{day.date}</Meta>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '32px', borderLeft: '1px solid var(--glass-border-primary)', marginLeft: '31px' }}>
              {day.items.length === 0 && (
                <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', padding: '24px 0' }}>No plans for this day yet.</div>
              )}
              {day.items.map((item, itemIdx) => (
                <GlassSurface key={item.id} variant="tertiary" hoverEffect style={{ padding: '32px', display: 'flex', gap: '32px', position: 'relative' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {getIcon(item.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <Heading as="h3" style={{ margin: 0, fontSize: '1.35rem' }}>{item.title}</Heading>
                      <div style={{ display: 'flex', gap: '12px', opacity: 0.6, transition: 'opacity 0.2s' }} className="item-actions">
                        <button onClick={() => reorderTripItems(dayIdx, itemIdx, Math.max(0, itemIdx - 1))} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}><ArrowUp size={18}/></button>
                        <button onClick={() => reorderTripItems(dayIdx, itemIdx, Math.min(day.items.length - 1, itemIdx + 1))} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)', cursor: 'pointer' }}><ArrowDown size={18}/></button>
                        <button onClick={() => handleRemove(dayIdx, item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                      </div>
                    </div>
                    {item.time && <Label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-secondary)' }}>{item.time}</Label>}
                    {item.details && <Body style={{ margin: 0, color: 'var(--color-text-muted)' }}>{item.details}</Body>}
                  </div>
                </GlassSurface>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .item-actions:hover { opacity: 1 !important; }
      `}</style>
    </div>
  );
}
