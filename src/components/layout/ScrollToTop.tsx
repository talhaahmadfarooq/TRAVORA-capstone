import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Manages scroll restoration across route changes.
 * Remembers the scroll position for each page and restores it when returning.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Save scroll position for the current path continuously
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${pathname}`, window.scrollY.toString());
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const saved = sessionStorage.getItem(`scroll-${pathname}`);
    const pos = saved ? parseInt(saved, 10) : 0;
    
    const restore = () => {
      window.scrollTo({ top: pos, left: 0, behavior: 'instant' });
      // Fallbacks
      if (pos === 0) {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    restore();
    // In case of reflows/image loads, try again next frame
    const raf = requestAnimationFrame(restore);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
