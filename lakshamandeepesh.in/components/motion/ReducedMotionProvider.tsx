'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

const ReducedMotionContext = createContext(false);

type ReducedMotionProviderProps = {
  children: ReactNode;
};

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  return <ReducedMotionContext.Provider value={shouldReduceMotion}>{children}</ReducedMotionContext.Provider>;
}

export function useReducedMotionPreference() {
  return useContext(ReducedMotionContext);
}
