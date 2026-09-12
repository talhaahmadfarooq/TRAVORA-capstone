import React from 'react';

// Common interface for title assets
export interface TitleAssetProps {
  color?: string;
  secondaryColor?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const TokyoTitle = ({ color = '#ffffff', secondaryColor = '#ff2a5f', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    {/* SVG filter for rough brush edges */}
    <defs>
      <filter id="brush-texture">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="neon-glow">
        <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <text x="10" y="140" fontFamily="'Permanent Marker', cursive" fontSize="130" fill={color} filter="url(#brush-texture)" style={{ letterSpacing: '0.02em', textShadow: `0 0 20px ${secondaryColor}` }} transform="rotate(-4 10 140)">
      Tokyo
    </text>
    <text x="360" y="190" fontFamily="'Noto Sans JP', sans-serif" fontSize="60" fontWeight="900" fill={color} opacity="0.85" filter="url(#brush-texture)">
      東京
    </text>
  </svg>
);

export const KyotoTitle = ({ color = '#f4f4f4', secondaryColor = '#e8d3b3', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 450 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="5" y="120" fontFamily="'Shippori Mincho', serif" fontSize="100" fontWeight="400" fill={color} style={{ letterSpacing: '0.05em' }}>
      Kyoto
    </text>
    <text x="8" y="160" fontFamily="'Shippori Mincho', serif" fontSize="36" fill={secondaryColor} opacity="0.7" style={{ letterSpacing: '0.2em' }}>
      京都
    </text>
  </svg>
);

export const LahoreTitle = ({ color = '#f8eedc', secondaryColor = '#d8a47f', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="120" fontFamily="'Playfair Display', serif" fontSize="120" fontWeight="600" fill={color} style={{ letterSpacing: '-0.02em' }}>
      Lahore
    </text>
    <text x="10" y="170" fontFamily="'Noto Nastaliq Urdu', serif" fontSize="48" fill={secondaryColor} opacity="0.6">
      لاہور
    </text>
  </svg>
);

export const AmsterdamTitle = ({ color = '#ffffff', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="100" fontFamily="'Playfair Display', serif" fontSize="110" fontWeight="700" fill={color} style={{ letterSpacing: '-0.04em', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      Amsterdam
    </text>
  </svg>
);

export const MarrakechTitle = ({ color = '#f8e5c0', secondaryColor = '#d17a45', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="120" fontFamily="'Cinzel Decorative', serif" fontSize="100" fontWeight="700" fill={color} style={{ letterSpacing: '0.02em' }}>
      Marrakech
    </text>
    <text x="5" y="180" fontFamily="'Noto Sans Arabic', sans-serif" fontSize="40" fill={secondaryColor} opacity="0.7">
      مراكش
    </text>
  </svg>
);

export const ParisTitle = ({ color = '#ffffff', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="120" fontFamily="'Great Vibes', cursive" fontSize="140" fill={color} style={{ textShadow: '0 8px 30px rgba(0,0,0,0.6)' }} transform="rotate(-6 0 120)">
      Paris
    </text>
  </svg>
);

export const VeniceTitle = ({ color = '#f8f4ec', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 500 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="100" fontFamily="'Playfair Display', serif" fontSize="100" fontWeight="400" fill={color} style={{ letterSpacing: '-0.02em', textShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
      Venice
    </text>
  </svg>
);

export const IstanbulTitle = ({ color = '#e8e4db', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 500 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="100" fontFamily="'Cinzel', serif" fontSize="90" fontWeight="400" fill={color} style={{ letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
      Istanbul
    </text>
  </svg>
);

export const SantoriniTitle = ({ color = '#f2f8fa', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 600 140" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="100" fontFamily="'Cinzel Decorative', serif" fontSize="80" fontWeight="400" fill={color} style={{ letterSpacing: '0.1em', textTransform: 'uppercase', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
      Santorini
    </text>
  </svg>
);

export const NewYorkTitle = ({ color = '#ffffff', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="110" fontFamily="'Anton', sans-serif" fontSize="110" fontWeight="400" fill={color} style={{ letterSpacing: '-0.02em', textTransform: 'uppercase', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
      New York
    </text>
  </svg>
);

export const BaliTitle = ({ color = '#f5efe6', style, className }: TitleAssetProps) => (
  <svg viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', ...style }} className={className}>
    <text x="0" y="120" fontFamily="'Caveat', cursive" fontSize="130" fill={color} style={{ textShadow: '0 4px 15px rgba(0,0,0,0.4)' }} transform="rotate(-3 0 120)">
      Bali
    </text>
  </svg>
);
