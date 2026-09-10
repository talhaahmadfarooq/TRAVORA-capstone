import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNavigation } from './BottomNavigation';
import { Footer } from './Footer';
import { ToastProvider } from '../ui/Toast';

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isProfile = location.pathname.startsWith('/profile');

  return (
    <ToastProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: isHome ? '0px' : '100px', display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </main>
        {!isHome && <Footer />}
        {!isProfile && <BottomNavigation />}
      </div>
    </ToastProvider>
  );
}

