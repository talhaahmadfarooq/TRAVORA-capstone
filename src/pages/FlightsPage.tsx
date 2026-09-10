import { useState } from 'react';
import { mockFlights } from '../data/mockData';
import { useTrip } from '../context/TripContext';
import { useToast } from '../components/ui/Toast';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { Heading, Body, Meta, Label } from '../components/ui/Typography';
import { Plane, Filter } from 'lucide-react';


export function FlightsPage() {
  const { journeySearch, addFlightToTrip } = useTrip();
  const { toast } = useToast();
  const [maxStops, setMaxStops] = useState<number | null>(null);

  const filteredFlights = mockFlights.filter(f => {
    if (maxStops !== null && f.stops > maxStops) return false;
    return true;
  });

  const handleSelectFlight = (flight: typeof mockFlights[0]) => {
    addFlightToTrip(flight, 1);
    toast(`Added flight ${flight.airline} to Day 1`, 'success');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 24px 80px 24px', display: 'flex', gap: '48px' }}>
      {/* Sidebar Filters */}
      <aside style={{ width: '280px', flexShrink: 0 }}>
        <GlassSurface variant="tertiary" style={{ padding: '32px', position: 'sticky', top: '120px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', borderBottom: '1px solid var(--glass-border-secondary)', paddingBottom: '16px' }}>
            <Filter size={20} color="var(--color-text-secondary)" />
            <Heading as="h2" style={{ fontSize: '1.25rem', margin: 0 }}>Filters</Heading>
          </div>

          <div>
            <Label style={{ display: 'block', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>Stops</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="stops" checked={maxStops === null} onChange={() => setMaxStops(null)} />
                <Body style={{ margin: 0 }}>Any number of stops</Body>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="stops" checked={maxStops === 0} onChange={() => setMaxStops(0)} />
                <Body style={{ margin: 0 }}>Non-stop only</Body>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                <input type="radio" name="stops" checked={maxStops === 1} onChange={() => setMaxStops(1)} />
                <Body style={{ margin: 0 }}>1 stop or fewer</Body>
              </label>
            </div>
          </div>
        </GlassSurface>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <div style={{ marginBottom: '48px' }}>
          <Heading as="h1" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '16px' }}>Select Departure Flight</Heading>
          <Body style={{ fontSize: '1.1rem' }}>
            {journeySearch.origin} &rarr; {journeySearch.destination} â€¢ {journeySearch.date} â€¢ {journeySearch.travelers} Travelers
          </Body>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredFlights.map(flight => (
            <GlassSurface key={flight.id} variant="secondary" hoverEffect style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
                <div style={{ width: '80px', textAlign: 'center' }}>
                  <Plane size={32} color="var(--color-text-primary)" style={{ marginBottom: '12px' }} />
                  <Label style={{ display: 'block', color: 'var(--color-text-secondary)' }}>{flight.airline}</Label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                  <div>
                    <Heading as="h3" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{flight.departureTime}</Heading>
                    <Meta>{flight.departureAirport}</Meta>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '120px' }}>
                    <Meta style={{ marginBottom: '8px' }}>{flight.duration}</Meta>
                    <div style={{ width: '100%', height: '1px', background: 'var(--glass-border-primary)', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--color-bg)', padding: '0 8px', fontSize: '0.75rem', color: 'var(--color-text-secondary)', borderRadius: '4px' }}>
                        {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Heading as="h3" style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{flight.arrivalTime}</Heading>
                    <Meta>{flight.arrivalAirport}</Meta>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                <Heading as="div" style={{ fontSize: '2.25rem', color: 'var(--color-text-primary)' }}>
                  ${flight.price}
                </Heading>
                <GlassButton variant="solid" onClick={() => handleSelectFlight(flight)}>
                  Select Flight
                </GlassButton>
              </div>
            </GlassSurface>
          ))}
          {filteredFlights.length === 0 && (
            <div style={{ padding: '64px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No flights found matching criteria.</div>
          )}
        </div>
      </main>
    </div>
  );
}

