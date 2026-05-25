'use client';

import dynamic from 'next/dynamic';
import { WebGLFallback } from './WebGLFallback';

const DecisionEngineScene = dynamic(() => import('./DecisionEngineScene').then((mod) => mod.DecisionEngineScene), {
  ssr: false,
  loading: () => <WebGLFallback />
});

export function DecisionEngineHeroLayer() {
  return <DecisionEngineScene />;
}
