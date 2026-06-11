import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* Ashima 3D simplex noise — standard GLSL implementation */
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform vec2 uMouse;

varying float vNoise;
varying vec3 vNormal;
varying vec3 vView;

${NOISE_GLSL}

void main() {
  float t = uTime * 0.28;
  float swell = 1.0 + length(uMouse) * 0.45;

  float n1 = snoise(position * 0.85 + vec3(t, t * 0.7, -t * 0.4));
  float n2 = snoise(position * 2.3 - vec3(t * 1.5, -t, t * 0.6)) * 0.32;
  float n = n1 + n2;

  vec3 displaced = position + normal * n * uAmp * swell;

  vNoise = n;
  vNormal = normalize(normalMatrix * normalize(normal + vec3(n2 * 0.9)));

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uViolet;

varying float vNoise;
varying vec3 vNormal;
varying vec3 vView;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vView);
  float fres = pow(1.0 - max(dot(N, V), 0.0), 2.2);

  vec3 col = uBase;
  col = mix(col, uViolet, smoothstep(-0.7, 0.9, vNoise) * 0.6);
  col = mix(col, uAccent, fres * 1.15);

  // thin iridescent bands following the noise field
  float band = smoothstep(0.55, 0.98, sin(vNoise * 7.0 + fres * 4.0));
  col += uAccent * band * 0.14;

  // soft top light
  col += vec3(0.06) * max(dot(N, normalize(vec3(0.4, 0.8, 0.6))), 0.0);

  gl_FragColor = vec4(col, 1.0);
}
`;

/* Tracks the pointer on window (the canvas itself is pointer-events: none) */
const usePointer = () => {
  const pointer = useRef(new THREE.Vector2(0, 0));
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return pointer;
};

const makeUniforms = () => ({
  uTime: { value: 0 },
  uAmp: { value: 0.34 },
  uMouse: { value: new THREE.Vector2(0, 0) },
  uBase: { value: new THREE.Color('#101013') },
  uAccent: { value: new THREE.Color('#c9f73a') },
  uViolet: { value: new THREE.Color('#5b46c4') },
});

const Blob = ({ detail }: { detail: number }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const pointer = usePointer();

  const uniforms = useMemo(() => makeUniforms(), []);

  useFrame((_, delta) => {
    const u = material.current?.uniforms;
    if (u) {
      u.uTime.value += delta;
      (u.uMouse.value as THREE.Vector2).lerp(pointer.current, 0.04);
    }
    if (mesh.current && u) {
      const m = u.uMouse.value as THREE.Vector2;
      mesh.current.rotation.y += delta * 0.12;
      mesh.current.rotation.x = m.y * 0.25;
      mesh.current.rotation.z = m.x * -0.15;
    }
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.55, detail]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
      />
    </mesh>
  );
};

const Halo = ({ count }: { count: number }) => {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random point on a loose shell around the blob
      const r = 2.3 + (Math.sin(i * 12.9898) * 0.5 + 0.5) * 1.3;
      const theta = (i / count) * Math.PI * 2 * 13.7;
      const phi = Math.acos(2 * ((Math.sin(i * 78.233) * 0.5 + 0.5)) - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y -= delta * 0.03;
      points.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.016}
        color="#c9f73a"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const SceneGroup = ({ isMobile }: { isMobile: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // keep the blob to the right of the headline on wide screens, centered on small
  const x = isMobile ? 0 : Math.min(viewport.width * 0.24, 2.2);
  const y = isMobile ? 0.85 : 0.35;
  const scale = isMobile ? 0.58 : Math.min(1, viewport.width / 9.5);

  return (
    <group ref={group} position={[x, y, 0]} scale={scale}>
      <Blob detail={isMobile ? 32 : 64} />
      <Halo count={isMobile ? 220 : 480} />
    </group>
  );
};

const HeroScene = ({ isMobile }: { isMobile: boolean }) => (
  <Canvas
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 5.2], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    style={{ position: 'absolute', inset: 0 }}
  >
    <SceneGroup isMobile={isMobile} />
  </Canvas>
);

export default HeroScene;
