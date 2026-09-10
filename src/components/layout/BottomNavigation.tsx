import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, MapPin, Plane, Hotel, Navigation } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Destinations', path: '/destinations', icon: MapPin },
  { name: 'Flights', path: '/flights', icon: Plane },
  { name: 'Stays', path: '/stays', icon: Hotel },
  { name: 'Trips', path: '/trips', icon: Navigation },
];

export function BottomNavigation() {
  const { isCinematicState, triggerHomeReset } = useNavigation();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navRef = useRef<HTMLDivElement>(null);
  const [activeRect, setActiveRect] = useState({ left: 0, width: 0, centerX: 0 });

  useEffect(() => {
    let index = NAV_ITEMS.findIndex(item => 
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    );
    if (index === -1) index = 0;
    setActiveIndex(index);
  }, [location.pathname]);

  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        const navItem = navRef.current.children[activeIndex] as HTMLElement;
        if (navItem) {
          setActiveRect({
            left: navItem.offsetLeft,
            width: navItem.offsetWidth,
            centerX: navItem.offsetLeft + navItem.offsetWidth / 2,
          });
        }
      }
    };
    measure();
    // Re-measure after a frame to ensure layout is stable
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, isCinematicState]);

  const isVisible = !isCinematicState;
  const ITEM_W = 68;
  const ITEM_H = 60;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: isVisible ? '28px' : '-120px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transition: 'bottom 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/* 
        LAMP GLOW — bleeds upward from active icon ABOVE the navbar pill.
        This is the key "light source behind glass" effect from the reference.
      */}
      {activeRect.width > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: activeRect.centerX - 40,
            width: '80px',
            height: '80px',
            pointerEvents: 'none',
            transition: 'left 0.45s cubic-bezier(0.3, 1, 0.3, 1)',
            zIndex: -1,
          }}
        >
          {/* Outer soft bloom */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(180, 210, 255, 0.22) 0%, rgba(150, 190, 255, 0.08) 50%, transparent 75%)',
            filter: 'blur(12px)',
          }} />
          {/* Inner brighter core glow */}
          <div style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220, 235, 255, 0.55) 0%, rgba(190, 215, 255, 0.2) 55%, transparent 80%)',
            filter: 'blur(6px)',
          }} />
        </div>
      )}

      {/* THE PILL */}
      <div 
        ref={navRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 10px',
          // Physical glass slab: dark translucent body
          background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(14, 18, 28, 0.82) 6%, rgba(10, 13, 22, 0.92) 100%)',
          backdropFilter: 'blur(28px) saturate(160%)',
          WebkitBackdropFilter: 'blur(28px) saturate(160%)',
          borderRadius: '999px',
          // Physical thickness: top bevel is brightest, sides/bottom darker
          borderWidth: '1.5px 1px 1px 1px',
          borderStyle: 'solid',
          borderColor: 'rgba(255,255,255,0.30) rgba(255,255,255,0.09) rgba(255,255,255,0.05) rgba(255,255,255,0.09)',
          // Layered shadows for material depth
          boxShadow: [
            'inset 0 1px 0 rgba(255,255,255,0.20)',   // top inner rim highlight
            'inset 0 -1px 0 rgba(0,0,0,0.40)',          // bottom inner shadow
            '0 2px 0 rgba(255,255,255,0.06)',            // outer top edge glint
            '0 8px 24px rgba(0,0,0,0.55)',              // main shadow
            '0 24px 56px rgba(0,0,0,0.38)',             // ambient shadow
            '0 1px 0 rgba(255,255,255,0.08)',            // ground reflection
          ].join(', '),
          position: 'relative',
          isolation: 'isolate',
        }}
      >
        {/* ACTIVE LAMP — inside the pill, behind the active icon */}
        {activeRect.width > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: activeRect.left,
              width: activeRect.width,
              pointerEvents: 'none',
              transition: 'left 0.45s cubic-bezier(0.3, 1, 0.3, 1), width 0.45s cubic-bezier(0.3, 1, 0.3, 1)',
              zIndex: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {/* Pill-shaped active highlight */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 60%, rgba(200, 225, 255, 0.28) 0%, rgba(170, 205, 255, 0.12) 45%, transparent 70%)',
              filter: 'blur(4px)',
            }} />
            {/* Bright inner point — the lamp filament */}
            <div style={{
              position: 'absolute',
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(240, 248, 255, 0.75) 0%, rgba(200, 225, 255, 0.35) 50%, transparent 75%)',
              filter: 'blur(3px)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
          </div>
        )}

        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name}
              to={item.path}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => { if (item.path === '/') triggerHomeReset(); }}
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                width: `${ITEM_W}px`,
                height: `${ITEM_H}px`,
                borderRadius: '14px',
                transition: 'all 0.3s ease',
                zIndex: 1,
              }}
            >
              {/* 3D Icon Container — filled/volumetric look */}
              <div style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '3px',
                borderRadius: '10px',
                // Active: raised glass platform with subtle fill
                background: isActive
                  ? 'linear-gradient(160deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)'
                  : isHovered
                  ? 'rgba(255,255,255,0.07)'
                  : 'transparent',
                boxShadow: isActive
                  ? 'inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 6px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)'
                  : 'none',
                border: isActive
                  ? '1px solid rgba(255,255,255,0.20)'
                  : '1px solid transparent',
                transition: 'all 0.35s ease',
                transform: isActive ? 'translateY(-1px)' : isHovered ? 'translateY(-1px)' : 'translateY(0)',
              }}>
                <Icon 
                  size={18}
                  strokeWidth={isActive ? 2.5 : 1.75}
                  style={{
                    color: isActive 
                      ? 'rgba(230, 243, 255, 1)' 
                      : isHovered 
                      ? 'rgba(255,255,255,0.75)' 
                      : 'rgba(255,255,255,0.42)',
                    transition: 'all 0.3s ease',
                    // Active icon glows white — lit from behind
                    filter: isActive
                      ? 'drop-shadow(0 0 5px rgba(200,225,255,0.8)) drop-shadow(0 0 2px rgba(255,255,255,0.9))'
                      : isHovered
                      ? 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
                      : 'none',
                  }}
                />
              </div>
              
              <span 
                style={{
                  fontSize: '0.62rem',
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: '0.04em',
                  color: isActive 
                    ? 'rgba(230, 243, 255, 0.95)' 
                    : isHovered 
                    ? 'rgba(255,255,255,0.65)' 
                    : 'rgba(255,255,255,0.38)',
                  transition: 'color 0.3s ease',
                  textShadow: isActive ? '0 0 8px rgba(200,225,255,0.6)' : 'none',
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Ground reflection — faint glow below the pill, like light pooling under a physical object */}
      {activeRect.width > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: activeRect.centerX - 30,
          width: '60px',
          height: '20px',
          pointerEvents: 'none',
          transition: 'left 0.45s cubic-bezier(0.3, 1, 0.3, 1)',
          background: 'radial-gradient(ellipse, rgba(180,210,255,0.12) 0%, transparent 70%)',
          filter: 'blur(4px)',
          marginTop: '4px',
        }} />
      )}
    </div>
  );
}
