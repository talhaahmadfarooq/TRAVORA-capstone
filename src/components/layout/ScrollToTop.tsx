import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Manages scroll restoration across route changes.
 * Uses location.key to completely isolate scroll position per history entry.
 */
export function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    // Disable native browser scroll restoration to prevent conflicts
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Save scroll position on unmount or before route change
  useEffect(() => {
    const handleScroll = () => {
      scrollMap.current.set(location.key, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Ensure we save the exact position right before leaving this route
      scrollMap.current.set(location.key, window.scrollY);
    };
  }, [location.key]);

  // Restore scroll position on mount/route change
  useEffect(() => {
    // If it's a completely new navigation (PUSH or REPLACE), we always start at top
    if (navType === 'PUSH' || navType === 'REPLACE') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    // If it's a POP (browser back/forward), restore the exact saved position for this key
    if (navType === 'POP') {
      const savedPos = scrollMap.current.get(location.key) || 0;
      
      const restore = () => {
        window.scrollTo({ top: savedPos, left: 0, behavior: 'instant' });
      };

      restore();
      // Try again next frame in case DOM hasn't fully rendered height yet
      const raf = requestAnimationFrame(restore);
      const timeout = setTimeout(restore, 50); // Fallback for delayed image loads
      
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timeout);
      };
    }
  }, [location.key, navType]);

  return null;
}
