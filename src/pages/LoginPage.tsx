import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { GlassSurface } from '../components/ui/GlassSurface';
import { GlassButton } from '../components/ui/GlassButton';
import { GlassInput } from '../components/ui/GlassInput';
import { Display, Body, Label } from '../components/ui/Typography';
import { Plane, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [stage, setStage] = useState<'initial' | 'flying' | 'form'>('initial');

  useEffect(() => {
    // Start cinematic sequence
    const t1 = setTimeout(() => setStage('flying'), 500);
    const t2 = setTimeout(() => setStage('form'), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email);
    navigate('/profile');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: 'var(--color-bg)' }}>
      {/* Dark Cinematic Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, var(--color-bg-elevated) 0%, var(--color-bg) 100%)' }} />

      {/* Cinematic Animation Sequence */}
      <AnimatePresence>
        {stage === 'flying' && (
          <motion.div
            initial={{ x: '-100vw', y: '50vh', scale: 0.5, rotate: 15 }}
            animate={{ x: '100vw', y: '30vh', scale: 1, rotate: -5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: 'absolute', zIndex: 10 }}
          >
            <Plane size={48} color="var(--color-text-primary)" style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.8))' }} />
            {/* Flight streak */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '400px', opacity: 1 }}
              style={{
                position: 'absolute', top: '24px', right: '48px', height: '2px',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8))',
                transformOrigin: 'right'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <AnimatePresence>
        {stage === 'form' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ 
              position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 20 
            }}
          >
            <GlassSurface variant="primary" style={{ padding: '64px', width: '100%', maxWidth: '480px', textAlign: 'center' }}>
              <Display style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Welcome Aboard</Display>
              <Body style={{ marginBottom: '48px' }}>Authenticate to access your curated journeys and luxury properties.</Body>
              
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
                <div>
                  <Label style={{ display: 'block', marginBottom: '12px' }}>Email Address</Label>
                  <GlassInput 
                    type="email" 
                    icon={<Mail size={18} />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                  />
                </div>
                <div>
                  <Label style={{ display: 'block', marginBottom: '12px' }}>Password</Label>
                  <GlassInput 
                    type="password" 
                    icon={<Lock size={18} />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                
                <GlassButton variant="solid" type="submit" style={{ width: '100%', marginTop: '24px', justifyContent: 'center' }}>
                  Authenticate
                </GlassButton>
              </form>
            </GlassSurface>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
