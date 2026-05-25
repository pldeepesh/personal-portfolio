'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

const panels = [
  { position: [-1.8, 1.15, -0.9], rotation: [0.05, 0.38, -0.08], scale: [0.9, 0.36, 1], color: '#37a8ff' },
  { position: [1.65, 0.55, -1.1], rotation: [-0.02, -0.42, 0.06], scale: [1.05, 0.42, 1], color: '#53e6a6' },
  { position: [0.65, -0.8, -0.6], rotation: [0.18, -0.12, 0.02], scale: [1.2, 0.34, 1], color: '#f3c56b' }
] as const;

export function FloatingPanels() {
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {panels.map((panel, index) => (
        <group key={panel.color} position={panel.position} rotation={panel.rotation}>
          <mesh scale={panel.scale}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <meshStandardMaterial color="#0d1728" emissive={panel.color} emissiveIntensity={0.08} opacity={0.76} transparent />
          </mesh>
          <mesh position={[0, 0, 0.01]} scale={[panel.scale[0] * 0.82, 0.018, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <meshBasicMaterial color={panel.color} opacity={index === 2 ? 0.52 : 0.64} transparent />
          </mesh>
          <mesh position={[-panel.scale[0] * 0.34, -0.08, 0.012]} scale={[panel.scale[0] * 0.2, 0.018, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <meshBasicMaterial color="#e8f1ff" opacity={0.28} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}
