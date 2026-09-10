import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position to the top on every route change.
 *
 * Why double-fire:
 * The immediate `reset()` handles the majority of cases.
 * The `requestAnimationFrame` deferred `reset()` catches pages where content
 * reflows after the initial render (e.g. images load, layout shifts), which
 * would push document height beyond 100vh and "reveal" the old scroll position.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reset = () => {
      // Hit all three targets — different browsers honour different ones
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    reset(); // immediate
    const raf = requestAnimationFrame(reset); // post-paint
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
