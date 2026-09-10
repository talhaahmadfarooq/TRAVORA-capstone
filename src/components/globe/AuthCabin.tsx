import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';
import { Display, Body, Label, Meta } from '../ui/Typography';
import { Mail, Lock } from 'lucide-react';

interface AuthCabinProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthCabin({ isOpen, onClose }: AuthCabinProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
          
          {/* Subtle scene darkening */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.6)', pointerEvents: 'auto' }}
            onClick={onClose}
          />

          {/* Cinematic Cabin/Window Element */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              width: '100%',
              maxWidth: '480px',
              background: 'var(--glass-bg-primary)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid var(--glass-border-primary)',
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '64px',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.8)'
            }}
          >
            <div style={{ position: 'relative', zIndex: 10 }}>
              <Display style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Welcome Aboard</Display>
              <Body style={{ marginBottom: '48px' }}>Enter your credentials to access your curated journeys.</Body>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <Label style={{ display: 'block', marginBottom: '12px' }}>Email</Label>
                  <GlassInput type="email" icon={<Mail size={18} />} placeholder="traveler@example.com" />
                </div>
                <div>
                  <Label style={{ display: 'block', marginBottom: '12px' }}>Password</Label>
                  <GlassInput type="password" icon={<Lock size={18} />} placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Meta style={{ cursor: 'pointer' }}>Forgot Password?</Meta>
                </div>
                
                <GlassButton variant="solid" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); onClose(); }}>
                  Authenticate Journey
                </GlassButton>
                <GlassButton variant="secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={(e) => { e.preventDefault(); }}>
                  Create Traveler Profile
                </GlassButton>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}



