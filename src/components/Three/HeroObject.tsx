import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2, type Group, type Mesh, type MeshStandardMaterial } from 'three';

// Stand-in retro-tech gadget built from primitives until a real GLB model is provided.
const Gadget = () => {
  const groupRef = useRef<Group>(null);
  const screenRef = useRef<Mesh>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const { x, y } = state.pointer;
    group.rotation.y += (x * 0.6 - group.rotation.y) * 0.06;
    group.rotation.x += (-y * 0.35 - group.rotation.x) * 0.06;
    if (screenRef.current) {
      const intensity = 0.65 + Math.sin(state.clock.elapsedTime * 2.4) * 0.18;
      (screenRef.current.material as MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <RoundedBox args={[2.6, 1.7, 0.55]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.4} />
      </RoundedBox>
      {/* Inner bezel */}
      <RoundedBox args={[2.2, 1.3, 0.58]} radius={0.06} smoothness={4} position={[0, 0.05, 0.01]}>
        <meshStandardMaterial color="#161616" />
      </RoundedBox>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.05, 0.31]}>
        <planeGeometry args={[1.95, 1.1]} />
        <meshStandardMaterial color="#ffe600" emissive="#ffe600" emissiveIntensity={0.65} toneMapped={false} />
      </mesh>
      {/* Buttons */}
      {[-0.85, -0.55, -0.25].map((x) => (
        <mesh key={x} position={[x, -0.7, 0.32]}>
          <cylinderGeometry args={[0.06, 0.06, 0.05, 24]} />
          <meshStandardMaterial color="#ffe600" />
        </mesh>
      ))}
      <mesh position={[0.85, -0.7, 0.32]}>
        <torusGeometry args={[0.13, 0.04, 12, 32]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
    </group>
  );
};

const HeroObject = () => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#ff00cc" />
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <Gadget />
      </Float>
      <EffectComposer>
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new Vector2(0.0025, 0.0025)}
        />
      </EffectComposer>
    </Canvas>
  );
};

export default HeroObject;
