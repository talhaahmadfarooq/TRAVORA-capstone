import { useEffect, useState, useMemo } from 'react';
import { geoPath, geoEquirectangular } from 'd3-geo';
import * as topojson from 'topojson-client';
import { GLOBE_LOCATIONS } from './GlobeScene';

interface Map2DProps {
  selectedDestinationId: string | null;
  onDestinationClick?: (id: string) => void;
  flightData?: {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
  } | null;
}

export function Map2D({ selectedDestinationId, onDestinationClick, flightData }: Map2DProps) {
  const [geographies, setGeographies] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json')
      .then(res => res.json())
      .then(worldData => {
        const features = (topojson.feature(worldData, worldData.objects.countries) as any).features;
        setGeographies(features);
      });
  }, []);

  const projection = useMemo(() => {
    return geoEquirectangular()
      .scale(150)
      .translate([800 / 2, 450 / 2]);
  }, []);

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="800" height="450" viewBox="0 0 800 450" style={{ filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.1))' }}>
        <g>
          {geographies.map((geo, i) => (
            <path
              key={`geo-${i}`}
              d={pathGenerator(geo) || ''}
              fill="rgba(30, 36, 51, 0.4)"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={0.5}
            />
          ))}
        </g>
        
        {flightData && (
          <path
            d={pathGenerator({
              type: "LineString",
              coordinates: [
                [flightData.startLng, flightData.startLat],
                [flightData.endLng, flightData.endLat]
              ]
            }) || ''}
            fill="none"
            stroke="var(--color-accent-cyan)"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        )}

        {GLOBE_LOCATIONS.map(loc => {
          const coords = projection([loc.lng, loc.lat]);
          if (!coords) return null;
          const [cx, cy] = coords;
          const isSelected = selectedDestinationId === loc.id;
          
          return (
            <g 
              key={loc.id} 
              transform={`translate(${cx}, ${cy})`}
              onClick={() => onDestinationClick && onDestinationClick(loc.id)}
              style={{ cursor: 'pointer' }}
            >
              <circle r={isSelected ? 6 : 4} fill={isSelected ? "var(--color-accent-gold)" : "var(--color-accent-cyan)"} />
              {isSelected && <circle r={10} fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5" opacity="0.6" />}
              <text 
                y={-12} 
                textAnchor="middle" 
                fill={isSelected ? "var(--color-accent-gold)" : "var(--color-text-primary)"}
                fontSize="12px"
                fontWeight="600"
                style={{ pointerEvents: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
              >
                {loc.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

