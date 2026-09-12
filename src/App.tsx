import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './context/AppProviders';
import { MainLayout } from './components/layout/MainLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { FlightsPage } from './pages/FlightsPage';
import { StaysPage } from './pages/StaysPage';
import { StayDetailPage } from './pages/StayDetailPage';
import { TripsPage } from './pages/TripsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="stays" element={<StaysPage />} />
            <Route path="stays/:id" element={<StayDetailPage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProviders>
    </BrowserRouter>
  );
}



