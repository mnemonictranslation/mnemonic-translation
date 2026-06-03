'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface NavContextType {
  scrollThreshold: number;
  setScrollThreshold: (height: number) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: ReactNode }) {
  // Start with a high value so nav doesn't hide on initial load
  const [scrollThreshold, setScrollThreshold] = useState(99999);

  return (
    <NavContext.Provider value={{ scrollThreshold, setScrollThreshold }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNavThreshold() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNavThreshold must be used within NavProvider');
  }
  return context;
}