import { useAuth } from '../context/AuthContext';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { Display, Heading, Body, Meta, Label } from '../components/ui/Typography';
import { LogOut, Settings, CreditCard, Bell, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const { user, isAuthenticated, logout, setLoginOpen } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <GlassButton variant="secondary" icon={<ChevronLeft size={20} />} onClick={() => navigate(-1)} style={{ position: 'absolute', top: '120px', left: '5%', zIndex: 10 }}>Back</GlassButton>
        <Display style={{ marginBottom: '24px' }}>Not Signed In</Display>
        <Body style={{ marginBottom: '40px' }}>Sign in to view your profile.</Body>
        <GlassButton variant="solid" onClick={() => setLoginOpen(true)}>Sign In</GlassButton>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '140px 24px 100px 24px', width: '100%' }}>
      <div style={{ marginBottom: '40px' }}>
        <GlassButton variant="secondary" icon={<ChevronLeft size={20} />} onClick={() => navigate(-1)} style={{ padding: '12px 24px', borderRadius: '999px' }}>
          Back
        </GlassButton>
      </div>
      <GlassSurface variant="tertiary" style={{ padding: '64px', textAlign: 'center', marginBottom: '64px' }}>
        {user?.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name} 
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '32px', border: '2px solid var(--glass-border-primary)' }} 
          />
        )}
        <Display style={{ fontSize: '3rem', marginBottom: '16px' }}>{user?.name}</Display>
        <Meta style={{ fontSize: '1.1rem' }}>{user?.email}</Meta>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '48px', borderTop: '1px solid var(--glass-border-secondary)', paddingTop: '48px' }}>
          <div>
            <Display style={{ fontSize: '2.5rem', margin: '0 0 8px 0' }}>{user?.savedDestinationsCount}</Display>
            <Label style={{ color: 'var(--color-text-secondary)' }}>Saved Destinations</Label>
          </div>
          <div>
            <Display style={{ fontSize: '2.5rem', margin: '0 0 8px 0' }}>{user?.savedStaysCount}</Display>
            <Label style={{ color: 'var(--color-text-secondary)' }}>Saved Stays</Label>
          </div>
        </div>
      </GlassSurface>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <GlassSurface hoverEffect style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}>
          <Settings size={24} color="var(--color-text-secondary)" />
          <Heading as="h3" style={{ fontSize: '1.25rem', margin: 0, flex: 1 }}>Account Settings</Heading>
        </GlassSurface>
        <GlassSurface hoverEffect style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}>
          <CreditCard size={24} color="var(--color-text-secondary)" />
          <Heading as="h3" style={{ fontSize: '1.25rem', margin: 0, flex: 1 }}>Payment Methods</Heading>
        </GlassSurface>
        <GlassSurface hoverEffect style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}>
          <Bell size={24} color="var(--color-text-secondary)" />
          <Heading as="h3" style={{ fontSize: '1.25rem', margin: 0, flex: 1 }}>Notifications</Heading>
        </GlassSurface>
        
        <GlassSurface 
          hoverEffect 
          style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer', marginTop: '32px' }}
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          <LogOut size={24} color="#ef4444" />
          <Heading as="h3" style={{ fontSize: '1.25rem', margin: 0, color: '#ef4444' }}>Sign Out</Heading>
        </GlassSurface>
      </div>
    </div>
  );
}


