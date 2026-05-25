'use client';

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Suspense, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotionPreference } from '@/components/motion/ReducedMotionProvider';
import { WebGLFallback } from './WebGLFallback';

type CanvasShellProps = {
  children: ReactNode;
  className?: string;
  camera?: CanvasProps['camera'];
  mobileFallback?: boolean;
};

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl') ?? canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

export function CanvasShell({ children, className, camera, mobileFallback = true }: CanvasShellProps) {
  const shouldReduceMotion = useReducedMotionPreference();
  const [status, setStatus] = useState<'checking' | 'ready' | 'fallback'>('checking');
  const [preserveDrawingBuffer, setPreserveDrawingBuffer] = useState(false);

  useEffect(() => {
    const isSmallScreen = mobileFallback && window.matchMedia('(max-width: 767px)').matches;
    setPreserveDrawingBuffer(window.location.search.includes('verify-canvas=1'));
    setStatus(!shouldReduceMotion && !isSmallScreen && canUseWebGL() ? 'ready' : 'fallback');
  }, [mobileFallback, shouldReduceMotion]);

  if (status !== 'ready') {
    return <WebGLFallback />;
  }

  return (
    <div aria-hidden="true" className={className}>
      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          camera={camera ?? { position: [0, 0.85, 6.2], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ alpha: false, antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
