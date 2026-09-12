import { useState, useEffect } from 'react';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { GlobeScene } from '../components/globe/GlobeScene';
import { JourneySearchPanel } from '../components/globe/JourneySearchPanel';
import { DestinationCards } from '../components/globe/DestinationCards';
import { AuthCabin } from '../components/globe/AuthCabin';
import { Map2D } from '../components/globe/Map2D';
import { Button } from '../components/ui/Button';
import { CinematicLoader } from '../components/ui/CinematicLoader';
import { mockDestinations } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

type AppState = 'INTRO' | 'EXPLORE' | 'CALCULATING' | 'RESULT';

export function HomePage() {
  const navigate = useNavigate();
  const { isLoginOpen, setLoginOpen } = useAuth();
  const [appState, setAppState] = useState<AppState>('INTRO');
  const [viewMode, setViewMode] = useState<'3D' | '2D'>('3D');
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [flightProgress, setFlightProgress] = useState(0);
  const [flightData, setFlightData] = useState<{ startLat: number, startLng: number, endLat: number, endLng: number } | null>(null);
  const [isTrendingOpen, setIsTrendingOpen] = useState(false);

  // appInitialized lives in NavigationContext (app-level) — survives route changes.
  // The cinematic loader only runs once per app session, NOT on every Home remount.
  const { setCinematicState, homeResetCounter, appInitialized, setAppInitialized } = useNavigation();

  // Reset journey state when returning Home via navbar
  useEffect(() => {
    if (homeResetCounter > 0) {
      setAppState('INTRO');
      setFlightProgress(0);
      setSelectedDestId(null);
      setFlightData(null);
    }
  }, [homeResetCounter]);

  // Sync navbar cinematic state
  useEffect(() => {
    setCinematicState(appState === 'INTRO');
  }, [appState, setCinematicState]);

  // Flight progress animation
  useEffect(() => {
    let animationFrame: number;
    if (appState === 'CALCULATING') {
      const startTime = Date.now();
      const duration = 3000;
      
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setFlightProgress(progress);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setAppState('RESULT');
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationFrame);
  }, [appState]);

  const handleExploreClick = () => {
    setAppState('EXPLORE');
    // Camera pullback begins immediately — GlobeScene reads 'EXPLORE' as journey camera state
  };

  const handleSearch = (originQuery: string, destQuery: string) => {
    let originDest = mockDestinations.find(d => d.name.toLowerCase() === originQuery.toLowerCase());
    let targetDest = mockDestinations.find(d => d.name.toLowerCase() === destQuery.toLowerCase());
    
    if (selectedDestId) {
      const activeSelection = mockDestinations.find(d => d.id === selectedDestId);
      if (activeSelection) targetDest = activeSelection;
    }
    
    setFlightData({
      startLat: originDest ? originDest.coordinates[0] : 31.5204,
      startLng: originDest ? originDest.coordinates[1] : 74.3587,
      endLat: targetDest ? targetDest.coordinates[0] : 35.6762,
      endLng: targetDest ? targetDest.coordinates[1] : 139.6503,
    });
    
    setFlightProgress(0);
    setAppState('CALCULATING');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: 'var(--neu-bg)' }}>
      
      {/* 3D/2D Toggle */}
      <div style={{ position: 'absolute', bottom: '120px', right: '32px', zIndex: 100, display: 'flex', background: 'var(--neu-bg)', borderRadius: '999px', boxShadow: 'var(--neu-raised)', padding: '4px' }}>
        <button 
          onClick={() => setViewMode('3D')}
          style={{
            padding: '8px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
            background: 'transparent',
            boxShadow: viewMode === '3D' ? 'var(--neu-pressed)' : 'none',
            color: viewMode === '3D' ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
          }}
        >3D</button>
        <button 
          onClick={() => setViewMode('2D')}
          style={{
            padding: '8px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
            background: 'transparent',
            boxShadow: viewMode === '2D' ? 'var(--neu-pressed)' : 'none',
            color: viewMode === '2D' ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
          }}
        >2D</button>
      </div>

      {/* 3D Globe Canvas */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transition: 'opacity 0.5s ease', opacity: viewMode === '3D' ? 1 : 0, pointerEvents: viewMode === '3D' ? 'auto' : 'none' }}>
        <ErrorBoundary fallback={<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--color-text-secondary)' }}>3D Context Lost. Please refresh.</div>}>
          <GlobeScene 
            appState={appState} 
            selectedDestinationId={selectedDestId}
            onDestinationClick={(id) => setSelectedDestId(prev => prev === id ? null : id)}
            flightData={flightData} 
            flightProgress={flightProgress} 
          />
        </ErrorBoundary>
      </div>

      {/* 2D Map */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', transition: 'opacity 0.5s ease', opacity: viewMode === '2D' ? 1 : 0, pointerEvents: viewMode === '2D' ? 'auto' : 'none' }}>
        {viewMode === '2D' && (
          <Map2D 
            selectedDestinationId={selectedDestId} 
            onDestinationClick={(id) => setSelectedDestId(id)}
            flightData={flightData} 
          />
        )}
      </div>

      {/* Auth overlay */}
      <AuthCabin isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />

      {/* UI Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
        
        {/* INTRO STATE — hidden until appInitialized (first load) or shown immediately on return */}
        <div style={{
          position: 'absolute', top: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center',
          transition: 'all 0.8s ease',
          opacity: appState === 'INTRO' && appInitialized ? 1 : 0,
          transform: appState === 'INTRO' ? 'translateY(0)' : 'translateY(-40px)',
          pointerEvents: appState === 'INTRO' && appInitialized ? 'auto' : 'none'
        }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', letterSpacing: '0.2em', margin: '0 0 16px 0', color: 'var(--color-text-primary)' }}>
            TRAVORA
          </h1>
          <p style={{ fontSize: '1.25rem', letterSpacing: '0.3em', color: 'var(--color-text-secondary)', marginBottom: '48px' }}>
            THE WORLD IS WAITING
          </p>
          <Button 
            onClick={handleExploreClick}
            style={{
              background: 'var(--neu-bg)',
              boxShadow: 'var(--neu-raised)',
              color: 'var(--color-accent-cyan)',
              padding: '16px 48px',
              fontSize: '1.1rem',
              letterSpacing: '0.1em',
              border: 'none',
              borderRadius: '999px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--neu-pressed)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--neu-raised)'}
          >
            FIND MY NEXT JOURNEY
          </Button>
        </div>

        {/* EXPLORE STATE — horizontal search bar, bottom-center like the reference */}
        <div style={{
          position: 'absolute',
          bottom: '130px',
          left: '50%',
          transform: 'translateX(-50%)',
          transition: 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
          opacity: appState === 'EXPLORE' || appState === 'CALCULATING' ? 1 : 0,
          pointerEvents: appState === 'EXPLORE' ? 'auto' : 'none',
          zIndex: 20,
        }}>
          <JourneySearchPanel onSearch={handleSearch} appState={appState} />
        </div>

        <div style={{
          position: 'absolute', top: '90px', right: '5%',
          pointerEvents: appState === 'EXPLORE' ? 'auto' : 'none',
          transition: 'opacity 0.6s ease',
          opacity: appState === 'EXPLORE' ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          zIndex: 50
        }}>
          {/* Minimalist Trending Toggle */}
          <button 
            onClick={() => setIsTrendingOpen(!isTrendingOpen)}
            style={{
              background: isTrendingOpen ? 'rgba(255,255,255,0.1)' : 'rgba(10,15,25,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'var(--color-text-primary)',
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              marginBottom: '16px',
              outline: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span style={{ 
              width: '6px', 
              height: '6px', 
              borderRadius: '50%', 
              background: 'var(--color-accent-gold)',
              boxShadow: '0 0 8px var(--color-accent-gold)'
            }} />
            Trending
          </button>
          
          <DestinationCards 
            appState={appState} 
            selectedId={selectedDestId} 
            onSelect={(id) => setSelectedDestId(prev => prev === id ? null : id)} 
            isOpen={isTrendingOpen}
          />
        </div>

        {/* RESULT STATE */}
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%',
          transition: 'all 0.8s ease',
          opacity: appState === 'RESULT' ? 1 : 0,
          transform: appState === 'RESULT' ? 'translateY(0)' : 'translateY(40px)',
          pointerEvents: appState === 'RESULT' ? 'auto' : 'none'
        }}>
          <div style={{
            background: 'var(--neu-bg)',
            boxShadow: 'var(--neu-raised)',
            borderRadius: '16px',
            padding: '32px',
            width: '320px',
            border: '1px solid rgba(255,255,255,0.02)',
          }}>
            <h3 style={{ color: 'var(--color-accent-gold)', margin: '0 0 16px 0', fontSize: '1.25rem' }}>Journey Found</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--color-text-secondary)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Est. Time</div>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>14h 15m</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Stops</div>
                <div style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>1 Stop</div>
              </div>
            </div>
            <Button 
              fullWidth 
              onClick={() => navigate('/flights')}
              style={{
                background: 'var(--neu-bg)',
                boxShadow: 'var(--neu-raised)',
                color: 'var(--color-text-primary)',
                border: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--neu-pressed)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--neu-raised)'}
            >
              View Flights
            </Button>
          </div>
        </div>

      </div>

      {/* CINEMATIC STARTUP LOADER
          - Only shown on first app load (appInitialized === false)
          - After onComplete fires, appInitialized becomes true at context level
          - Subsequent Home mounts skip this entirely */}
      {!appInitialized && (
        <CinematicLoader onComplete={() => setAppInitialized(true)} />
      )}
    </div>
  );
}
