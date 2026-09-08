"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

function CoinMesh({ karma = 1450 }: { karma?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.7;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.4;
      ring2Ref.current.rotation.z = t * 0.6;
    }
  });

  return (
    <group>
      {/* Orbiting Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Orbital Ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.75, 0.012, 16, 64]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Main 3D Medallion Coin Body */}
      <group ref={meshRef}>
        {/* Outer Coin Cylinder */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.08, 1.08, 0.16, 48]} />
          <meshStandardMaterial
            color="#D97706"
            metalness={0.9}
            roughness={0.2}
            emissive="#78350F"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Outer Gold Rim Bevel */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.06, 16, 48]} />
          <meshStandardMaterial
            color="#FBBF24"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Front Coin Face Disc */}
        <mesh position={[0, 0, 0.082]}>
          <circleGeometry args={[0.96, 48]} />
          <meshStandardMaterial
            color="#92400E"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Front Inscription / Emblem */}
        <Text
          position={[0, 0.35, 0.09]}
          fontSize={0.14}
          color="#FDE68A"
          anchorX="center"
          anchorY="middle"
        >
          YATRA SETU
        </Text>

        <Text
          position={[0, 0.05, 0.09]}
          fontSize={0.26}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          {karma.toLocaleString()}
        </Text>

        <Text
          position={[0, -0.22, 0.09]}
          fontSize={0.11}
          color="#34D399"
          anchorX="center"
          anchorY="middle"
        >
          GREEN KARMA
        </Text>

        <Text
          position={[0, -0.45, 0.09]}
          fontSize={0.09}
          color="#FDE68A"
          anchorX="center"
          anchorY="middle"
        >
          ★ 2026 SEVA PASSPORT ★
        </Text>

        {/* Back Coin Face Disc */}
        <mesh position={[0, 0, -0.082]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.96, 48]} />
          <meshStandardMaterial
            color="#92400E"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Back Inscription */}
        <Text
          position={[0, 0.1, -0.09]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.22}
          color="#FDE68A"
          anchorX="center"
          anchorY="middle"
        >
          यात्रा बने सेवा
        </Text>
        <Text
          position={[0, -0.2, -0.09]}
          rotation={[0, Math.PI, 0]}
          fontSize={0.1}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          CIVIC REGENERATION
        </Text>
      </group>
    </group>
  );
}

export default function SevaMedallion3D({
  karma = 1450,
  className = "h-64 w-64",
}: {
  karma?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-amber-500/5 ${className}`}>
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas camera={{ position: [0, 0, 3.8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 5]} intensity={1.8} color="#FFFBEB" />
        <directionalLight position={[-4, -3, -2]} intensity={0.9} color="#FEF3C7" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#F59E0B" />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.3}>
          <CoinMesh karma={karma} />
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
