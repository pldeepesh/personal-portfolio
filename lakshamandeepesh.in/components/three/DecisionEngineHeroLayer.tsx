'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useReducedMotionPreference } from '@/components/motion/ReducedMotionProvider';
import { WebGLFallback } from './WebGLFallback';

const DecisionEngineScene = dynamic(() => import('./DecisionEngineScene').then((mod) => mod.DecisionEngineScene), {
  ssr: false,
  loading: () => <WebGLFallback />
});

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function DecisionEngineHeroLayer() {
  const shouldReduceMotion = useReducedMotionPreference();
  const [shouldLoadScene, setShouldLoadScene] = useState(false);

  useEffect(() => {
    const isSmallScreen = window.matchMedia('(max-width: 767px)').matches;
    const forcedFallback = window.location.search.includes('force-webgl-fallback=1');

    setShouldLoadScene(!forcedFallback && !shouldReduceMotion && !isSmallScreen && canUseWebGL());
  }, [shouldReduceMotion]);

  if (!shouldLoadScene) {
    return <WebGLFallback />;
  }

  return <DecisionEngineScene />;
}
