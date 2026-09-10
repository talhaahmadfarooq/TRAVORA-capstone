import { useState } from 'react';
import { GlassSurface } from '../ui/GlassSurface';
import { GlassInput } from '../ui/GlassInput';
import { GlassButton } from '../ui/GlassButton';
import { Heading, Label } from '../ui/Typography';
import { MapPin, Navigation } from 'lucide-react';

interface JourneySearchPanelProps {
  onSearch: (origin: string, destination: string) => void;
  appState: string;
}

export function JourneySearchPanel({ onSearch, appState }: JourneySearchPanelProps) {
  const [origin, setOrigin] = useState('Lahore');
  const [destination, setDestination] = useState('Tokyo');

  if (appState === 'INTRO' || appState === 'RESULT') return null;

  return (
    <GlassSurface 
      variant="primary"
      style={{
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        pointerEvents: 'auto',
        transition: 'opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        opacity: appState === 'CALCULATING' ? 0 : 1
      }}
    >
      <Heading as="h2" style={{ margin: '0 0 32px 0', fontSize: '1.5rem' }}>Plan Journey</Heading>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
        <div>
          <Label style={{ display: 'block', marginBottom: '12px' }}>Origin</Label>
          <GlassInput 
            icon={<MapPin size={18} />}
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </div>
        <div>
          <Label style={{ display: 'block', marginBottom: '12px' }}>Destination</Label>
          <GlassInput 
            icon={<Navigation size={18} />}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
      
      <GlassButton 
        variant="solid" 
        style={{ width: '100%', justifyContent: 'center' }}
        onClick={() => onSearch(origin, destination)}
      >
        FIND JOURNEY
      </GlassButton>
    </GlassSurface>
  );
}
