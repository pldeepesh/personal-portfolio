'use client';

import { Grid } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';
import { CanvasShell } from './CanvasShell';
import { DataNodes } from './DataNodes';
import { FloatingPanels } from './FloatingPanels';

function DecisionEngineCore() {
  const coreRef = useRef<Group>(null);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;
    const scrollProgress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);

    camera.position.x = scrollProgress * 0.55;
    camera.position.y = 0.85 + scrollProgress * 0.3;
    camera.lookAt(0, 0.1, 0);

    if (!coreRef.current) return;
    coreRef.current.rotation.y = elapsed * 0.18;
    coreRef.current.rotation.x = Math.sin(elapsed * 0.28) * 0.08;
  });

  return (
    <group ref={coreRef}>
      <mesh>
        <icosahedronGeometry args={[0.72, 2]} />
        <meshStandardMaterial color="#10223a" emissive="#37a8ff" emissiveIntensity={0.32} metalness={0.24} roughness={0.22} />
      </mesh>
      <mesh scale={1.18}>
        <torusGeometry args={[0.72, 0.01, 16, 120]} />
        <meshBasicMaterial color="#37a8ff" opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[Math.PI / 2.35, 0, 0]} scale={1.38}>
        <torusGeometry args={[0.68, 0.008, 16, 120]} />
        <meshBasicMaterial color="#53e6a6" opacity={0.34} transparent />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <color args={['#05070d']} attach="background" />
      <ambientLight intensity={0.55} />
      <pointLight color="#37a8ff" intensity={3.2} position={[2.8, 2.2, 3.6]} />
      <pointLight color="#53e6a6" intensity={1.1} position={[-2.4, -1, 2]} />
      <group position={[0.8, 0.08, 0]}>
        <DecisionEngineCore />
        <FloatingPanels />
        <DataNodes />
      </group>
      <Grid
        args={[8, 8]}
        cellColor="#15314d"
        cellSize={0.42}
        fadeDistance={5.8}
        fadeStrength={1.4}
        position={[0, -1.35, -0.4]}
        sectionColor="#37a8ff"
        sectionSize={1.68}
      />
    </>
  );
}

export function DecisionEngineScene() {
  return (
    <CanvasShell className="absolute inset-0" camera={{ position: [0, 0.85, 6.2], fov: 42 }}>
      <SceneContent />
    </CanvasShell>
  );
}
