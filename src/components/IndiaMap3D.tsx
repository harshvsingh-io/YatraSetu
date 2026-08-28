"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import * as THREE from "three";

// Simplified India outline as a 2D shape extruded to 3D
function IndiaShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    // Simplified India silhouette (scaled for visualization)
    const pts = [
      [-0.8, 2.2], [-0.4, 2.5], [0.0, 2.4], [0.3, 2.2], [0.6, 2.3],
      [0.8, 2.0], [1.2, 1.8], [1.5, 1.4], [1.8, 1.0], [2.0, 0.5],
      [1.8, 0.0], [1.5, -0.5], [1.3, -1.0], [1.0, -1.5], [0.6, -2.0],
      [0.3, -2.5], [0.0, -2.8], [-0.3, -2.5], [-0.5, -2.0], [-0.8, -1.5],
      [-1.0, -1.0], [-1.2, -0.5], [-1.5, 0.0], [-1.8, 0.5], [-2.0, 1.0],
      [-1.8, 1.5], [-1.5, 1.8], [-1.2, 2.0], [-0.8, 2.2],
    ];
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      s.lineTo(pts[i][0], pts[i][1]);
    }
    s.closePath();
    return s;
  }, []);

  const extrudeSettings = useMemo(
    () => ({ depth: 0.15, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.08, bevelSegments: 3 }),
    []
  );

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#312C24"
        roughness={0.6}
        metalness={0.2}
        emissive="#F59E0B"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}

// Glowing pin at a restoration site location
function GlowingPin({ position, color, label, delay }: {
  position: [number, number, number];
  color: string;
  label: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.3;
      ringRef.current.scale.setScalar(scale);
      (ringRef.current.material as THREE.MeshStandardMaterial).opacity = 0.3 - Math.sin(state.clock.elapsedTime * 2 + delay) * 0.15;
    }
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + delay) * 0.05;
    }
  });

  return (
    <group position={position}>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.12, 0.18, 32]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Pin sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Pin stem */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Label on hover */}
      {hovered && (
        <Float speed={2} rotationIntensity={0} floatIntensity={0.3}>
          <Text
            position={[0, 0.4, 0]}
            fontSize={0.12}
            color="#FAF8F5"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#1F1C17"
          >
            {label}
          </Text>
        </Float>
      )}
    </group>
  );
}

// Scene content
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FFF9ED" />
      <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#F59E0B" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#FFB633" />

      <IndiaShape />

      {/* Restoration site pins */}
      <GlowingPin position={[-0.6, 0.2, 0.25]} color="#F59E0B" label="Goa — Beach Cleanup" delay={0} />
      <GlowingPin position={[0.8, 1.2, 0.25]} color="#DC5A36" label="Rajasthan — Heritage Care" delay={0.5} />
      <GlowingPin position={[1.5, 0.3, 0.25]} color="#65904F" label="Kerala — Mangrove Planting" delay={1} />
      <GlowingPin position={[-1.2, 1.0, 0.25]} color="#F59E0B" label="Maharashtra — River Cleanup" delay={1.5} />
      <GlowingPin position={[0.3, 0.8, 0.25]} color="#DC5A36" label="Karnataka — Trail Restoration" delay={0.8} />
      <GlowingPin position={[-0.8, -0.5, 0.25]} color="#65904F" label="Tamil Nadu — Beach Cleanup" delay={1.2} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
      />
    </>
  );
}

// Loading fallback
function MapFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-900 via-ink-800 to-earth-900 rounded-2xl">
      <div className="text-center">
        <div className="animate-pulse text-4xl mb-2">🗺️</div>
        <p className="text-sm text-ink-400">Loading 3D map...</p>
      </div>
    </div>
  );
}

// Main export
export default function IndiaMap3D({ className }: { className?: string }) {
  const [webglFailed, setWebglFailed] = useState(false);

  // Check WebGL support
  if (typeof window !== "undefined") {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl && !webglFailed) {
        // Will set on next render
      }
    } catch {
      if (!webglFailed) setWebglFailed(true);
    }
  }

  if (webglFailed) return <MapFallback />;

  return (
    <div className={className}>
      <Suspense fallback={<MapFallback />}>
        <Canvas
          camera={{ position: [0, 3, 5], fov: 45 }}
          onCreated={() => {}}
          onError={() => setWebglFailed(true)}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
