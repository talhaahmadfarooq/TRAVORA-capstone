import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface NavigationContextType {
  isCinematicState: boolean;
  setCinematicState: (value: boolean) => void;
  triggerHomeReset: () => void;
  homeResetCounter: number;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isCinematicState, setCinematicState] = useState(true);
  const [homeResetCounter, setHomeResetCounter] = useState(0);

  const triggerHomeReset = () => {
    setHomeResetCounter(prev => prev + 1);
  };

  return (
    <NavigationContext.Provider value={{ isCinematicState, setCinematicState, triggerHomeReset, homeResetCounter }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}

