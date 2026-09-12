import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Plane, Hotel, Navigation } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const NAV_ITEMS = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Explore', path: '/explore', icon: Compass },
  { name: 'Flights', path: '/flights', icon: Plane },
  { name: 'Stays', path: '/stays', icon: Hotel },
  { name: 'Trips', path: '/trips', icon: Navigation },
];

// Fixed dimensions — no DOM measurement needed.
// Since all items are equal width, position is fully deterministic.
const ITEM_WIDTH = 58;     // px per nav item (compact for 6 items)
const PILL_PAD_H = 8;      // horizontal padding inside pill

export function BottomNavigation() {
  const { isCinematicState, triggerHomeReset } = useNavigation();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    let idx = NAV_ITEMS.findIndex(item =>
      item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
    );
    if (idx === -1) idx = 0;
    setActiveIndex(idx);
  }, [location.pathname]);

  const isVisible = !isCinematicState;

  // Center X of active item within the pill's coordinate system.
  // No DOM measurement — pure math. Updates the instant activeIndex changes.
  // PILL_PAD_H: left padding offset
  // (activeIndex * ITEM_WIDTH): start of active item
  // (ITEM_WIDTH / 2): center of active item
  const activeCenterX = PILL_PAD_H + (activeIndex * ITEM_WIDTH) + (ITEM_WIDTH / 2);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isVisible ? '28px' : '-140px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        opacity: isVisible ? 1 : 0,
        transition: 'bottom 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      {/*
       * ══════════════════════════════════════════════════════════
       * SINGLE ACTIVE GLOW — THE ONLY ILLUMINATION SOURCE
       * ══════════════════════════════════════════════════════════
       *
       * Architecture:
       * - Lives OUTSIDE the pill (z-index 1, pill is z-index 2)
       * - Positioned behind the glass; pill's backdrop-filter picks it up,
       *   creating "glass illuminated from behind" (the active icon area looks brighter)
       * - Extends slightly above the pill for ambient environmental light (matches reference)
       * - Moves via CSS `left` transition — one element, one transition, no DOM reads
       * - activeIndex changes → activeCenterX updates synchronously → CSS animates left
       * - NO per-item glow, NO per-item active background, NO per-item filter
       *
       * Ghost glow fix:
       * Moving the glow OUTSIDE the pill eliminates the filter-bleed issue
       * (CSS filter:blur can paint outside overflow:hidden in Chromium).
       * There is now exactly ONE glow element that moves cleanly.
       */}
      <div
        style={{
          position: 'absolute',
          // Center glow on active item, vertically aligned to pill's upper half
          left: activeCenterX,
          bottom: 14,
          width: '90px',
          height: '90px',
          transform: 'translateX(-50%) translateY(30%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          // Smooth single-source movement — 420ms matches premium easing
          transition: 'left 0.42s cubic-bezier(0.25, 1, 0.25, 1)',
          zIndex: 1,
          // Blue-white warm core — localized, not neon
          // Matches the reference: contained warm glow below/behind active icon
          background: [
            'radial-gradient(circle at 50% 55%,',
            '  rgba(210, 228, 255, 0.32) 0%,',
            '  rgba(180, 210, 255, 0.18) 32%,',
            '  rgba(140, 185, 255, 0.08) 58%,',
            '  transparent 80%',
            ')',
          ].join(''),
          filter: 'blur(10px)',
        }}
      />

      {/*
       * ══════════════════════════════════════════════════════════
       * THE GLASS PILL
       * ══════════════════════════════════════════════════════════
       *
       * Physical glass slab construction:
       * - Dark warm translucent glass body
       * - Prominent golden top-edge bevel (the "physical rim" seen in reference)
       * - No overflow:hidden — the external glow shows through the glass naturally
       *   via backdrop-filter (blurs the glow + page behind it = frosted glass with light)
       * - Layered inset shadows create internal depth/thickness illusion
       * - Outer drop shadows place the object above the page
       */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          padding: `6px ${PILL_PAD_H}px`,
          borderRadius: '999px',

          // Glass body: warm dark translucent — not cold black
          // Semi-transparent so glow behind it (from the external glow div) shows through
          background: [
            'linear-gradient(180deg,',
            '  rgba(255, 252, 248, 0.07) 0%,',
            '  rgba(16, 13, 22, 0.78) 4%,',
            '  rgba(11, 9, 17, 0.86) 100%',
            ')',
          ].join(''),
          backdropFilter: 'blur(24px) saturate(120%)',
          WebkitBackdropFilter: 'blur(24px) saturate(120%)',

          // Border: top = warm gold bevel (the visible physical rim from reference)
          // sides = barely perceptible edge definition
          // bottom = dark underside (communicates physical thickness)
          borderWidth: '1.5px 0.75px 0.75px 0.75px',
          borderStyle: 'solid',
          borderColor: [
            'rgba(195, 158, 80, 0.42)',   // top: warm gold — the physical rim
            'rgba(255, 255, 255, 0.05)',   // right: barely visible
            'rgba(0, 0, 0, 0.50)',          // bottom: dark underside
            'rgba(255, 255, 255, 0.05)',   // left: barely visible
          ].join(' '),

          // Layered box-shadow:
          // 1. Top inner warm highlight (light catching just inside the rim)
          // 2. Bottom inner depth (creates perceived slab thickness)
          // 3. Outer drop shadow (objects floats above the page)
          // 4. Ambient outer shadow
          boxShadow: [
            'inset 0 1px 0 rgba(255, 245, 210, 0.12)',  // top inner warm
            'inset 0 -2px 8px rgba(0, 0, 0, 0.38)',      // inner depth
            '0 4px 16px rgba(0, 0, 0, 0.45)',            // primary drop shadow
            '0 16px 40px rgba(0, 0, 0, 0.28)',           // ambient shadow
          ].join(', '),
        }}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex && !isActive;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => { if (item.path === '/') triggerHomeReset(); }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                width: `${ITEM_WIDTH}px`,
                height: '54px',
                borderRadius: '12px',
                // NO per-item background, shadow, or filter — all lighting comes
                // from the single external glow div. This is the architectural fix
                // for the ghost glow: remove every independent light source per item.
                background: 'transparent',
                border: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Icon — only color changes, no shadow/glow/filter */}
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2px',
                  borderRadius: '8px',
                  transition: 'transform 0.2s ease',
                  transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                  // No background — the external glow creates the "glass lit from behind" look
                  background: 'transparent',
                }}
              >
                <Icon
                  size={16}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  style={{
                    // Active: bright, clean. Inactive: subdued warm muted gray.
                    // These values are the ONLY per-item visual differentiation.
                    // No drop-shadow, no filter, no glow per item.
                    color: isActive
                      ? 'rgba(225, 240, 255, 1.0)'
                      : isHovered
                      ? 'rgba(255, 255, 255, 0.52)'
                      : 'rgba(190, 175, 185, 0.38)',
                    transition: 'color 0.2s ease',
                  }}
                />
              </div>

              {/* Label — clean typography, no glow, no shadow */}
              <span
                style={{
                  fontSize: '0.575rem',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.03em',
                  color: isActive
                    ? 'rgba(220, 235, 255, 0.90)'
                    : isHovered
                    ? 'rgba(255, 255, 255, 0.48)'
                    : 'rgba(190, 175, 185, 0.34)',
                  transition: 'color 0.2s ease',
                  // No text-shadow — clean typography from reference
                }}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
