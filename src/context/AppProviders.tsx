import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { NavigationProvider } from './NavigationContext';
import { TripProvider, useTrip } from './TripContext';

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NavigationProvider>
      <AuthProvider>
      <TripProvider>
        {children}
      </TripProvider>
    </AuthProvider>
    </NavigationProvider>
  );
}

export { useAuth, useTrip };



