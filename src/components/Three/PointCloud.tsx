import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { createNoise3D } from 'simplex-noise';
import type { Points, BufferAttribute } from 'three';

const POINT_COUNT = 6500;

const Cloud = () => {
  const pointsRef = useRef<Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);

  const { positions, basePositions } = useMemo(() => {
    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);
    for (let i = 0; i < POINT_COUNT; i += 1) {
      const i3 = i * 3;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.6 * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = r * Math.cos(phi);
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;
    }
    return { positions, basePositions };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;
    const t = state.clock.elapsedTime;
    const attr = points.geometry.attributes.position as BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < POINT_COUNT; i += 1) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];
      const n = noise3D(bx * 0.6, by * 0.6 + t * 0.2, bz * 0.6) * 0.25;
      arr[i3] = bx + n;
      arr[i3 + 1] = by + n;
      arr[i3 + 2] = bz + n;
    }
    attr.needsUpdate = true;
    points.rotation.y = t * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={POINT_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#ffffff" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

const PointCloud = () => {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 3.6], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Cloud />
    </Canvas>
  );
};

export default PointCloud;
