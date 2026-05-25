'use client';

import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Group } from 'three';

const nodes = [
  [-1.8, 0.75, 0.2],
  [-0.8, -0.45, -0.4],
  [0.3, 0.55, 0.15],
  [1.5, -0.2, -0.25],
  [2.1, 0.85, -0.75]
] as const;

export function DataNodes() {
  const groupRef = useRef<Group>(null);
  const connections = useMemo(() => nodes.slice(0, -1).map((node, index) => [node, nodes[index + 1]] as const), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });

  return (
    <group ref={groupRef} position={[0.05, 0, 0]}>
      {connections.map(([start, end], index) => (
        <Line
          color={index % 2 === 0 ? '#37a8ff' : '#53e6a6'}
          key={`${start.join('-')}-${end.join('-')}`}
          lineWidth={1}
          opacity={0.38}
          points={[start, end]}
          transparent
        />
      ))}
      {nodes.map((position, index) => (
        <mesh key={position.join('-')} position={position}>
          <sphereGeometry args={[index === 2 ? 0.105 : 0.075, 24, 24]} />
          <meshStandardMaterial
            color={index === 2 ? '#f3c56b' : '#37a8ff'}
            emissive={index === 2 ? '#f3c56b' : '#37a8ff'}
            emissiveIntensity={index === 2 ? 0.9 : 0.55}
            roughness={0.42}
          />
        </mesh>
      ))}
    </group>
  );
}
