"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin, Sparkles, Compass, ShieldCheck, Thermometer, ArrowRight } from "lucide-react";

export interface SevaNode {
  id: string;
  name: string;
  state: string;
  position: [number, number, number];
  color: string;
  crowdScore: number;
  temp: string;
  ecoStay: string;
  event: string;
  karma: number;
}

export const SEVA_NODES: SevaNode[] = [
  {
    id: "tirthan",
    name: "Tirthan Valley",
    state: "Himachal Pradesh",
    position: [-0.4, 0.95, 0.45],
    color: "#10B981", // Emerald
    crowdScore: 14,
    temp: "19°C",
    ecoStay: "Riverside Cedar Eco-Homestay",
    event: "River Tirthan Stream Clean",
    karma: 250,
  },
  {
    id: "chopta",
    name: "Chopta & Tungnath",
    state: "Uttarakhand",
    position: [0.15, 0.85, 0.55],
    color: "#F59E0B", // Amber
    crowdScore: 11,
    temp: "14°C",
    ecoStay: "Monal Eco-Nest Cabin",
    event: "Tungnath Sacred Bugyal Sweep",
    karma: 250,
  },
  {
    id: "kasol",
    name: "Kasol (Parvati)",
    state: "Himachal Pradesh",
    position: [-0.3, 1.1, 0.3],
    color: "#34D399",
    crowdScore: 22,
    temp: "17°C",
    ecoStay: "Parvati Pine Cabins",
    event: "Parvati Trail Plastic Revival",
    karma: 300,
  },
  {
    id: "orchha",
    name: "Orchha",
    state: "Madhya Pradesh",
    position: [0.1, 0.2, 0.4],
    color: "#F97316", // Terracotta
    crowdScore: 16,
    temp: "27°C",
    ecoStay: "Betwa Riverside Retreat",
    event: "Royal Cenotaphs Heritage Care",
    karma: 200,
  },
  {
    id: "hampi",
    name: "Hampi UNESCO",
    state: "Karnataka",
    position: [-0.2, -0.65, 0.45],
    color: "#FBBF24",
    crowdScore: 19,
    temp: "31°C",
    ecoStay: "Kishkinda Boulders Resort",
    event: "Vitthala River & Heritage Clean",
    karma: 350,
  },
  {
    id: "gokarna",
    name: "Gokarna Coast",
    state: "Karnataka",
    position: [-0.65, -0.75, 0.55],
    color: "#06B6D4", // Cyan
    crowdScore: 18,
    temp: "29°C",
    ecoStay: "Kudle Cliff Coconut Grove",
    event: "Olive Ridley Coastal Dune Care",
    karma: 300,
  },
  {
    id: "munnar",
    name: "Munnar Hills",
    state: "Kerala",
    position: [-0.35, -1.25, 0.4],
    color: "#22C55E",
    crowdScore: 15,
    temp: "21°C",
    ecoStay: "Tea Valley Cloud Nine Lodge",
    event: "Western Ghats Watershed Drive",
    karma: 280,
  },
];

// Stylized 3D Topographic Terrain of India
function StylizedTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate terrain geometry with mountain ridges and river valleys
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(3.6, 4.2, 48, 48);
    const pos = geo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // Mask to India's approximate triangular tapering contour
      const widthAtY = Math.max(0.3, 1.6 - (y < 0 ? -y * 0.75 : 0));
      const inBounds = Math.abs(x) < widthAtY && y > -2.1 && y < 1.8;

      if (!inBounds) {
        pos.setZ(i, -0.6);
      } else {
        // Northern Himalayas elevation
        const himalayanRidge = y > 0.6 ? Math.sin((x + 1) * 2) * 0.4 + (y - 0.6) * 0.5 : 0;
        // Central plateau & Western Ghats ridge
        const westernGhats = x < -0.3 && y < 0.2 && y > -1.5 ? 0.22 : 0;
        const plateau = (Math.sin(x * 3) + Math.cos(y * 3)) * 0.06;

        const totalZ = Math.max(0, himalayanRidge + westernGhats + plateau);
        pos.setZ(i, totalZ);
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 4, 0, 0]} position={[0, -0.1, -0.2]}>
      <meshStandardMaterial
        color="#221C16"
        roughness={0.7}
        metalness={0.25}
        wireframe={false}
        flatShading={true}
      />
    </mesh>
  );
}

// 3D Animated Wireframe Grid overlay
function ElevationWireframe() {
  return (
    <mesh rotation={[-Math.PI / 4, 0, 0]} position={[0, -0.09, -0.2]}>
      <planeGeometry args={[3.8, 4.4, 24, 24]} />
      <meshBasicMaterial color="#F59E0B" wireframe={true} transparent={true} opacity={0.08} />
    </mesh>
  );
}

// Glowing Interactive Seva Node Pin
function InteractivePin({
  node,
  selected,
  onSelect,
}: {
  node: SevaNode;
  selected: boolean;
  onSelect: (node: SevaNode) => void;
}) {
  const pinRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 3 + node.position[0]) * 0.35;
      ringRef.current.scale.set(s, s, s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(
        0.1,
        0.6 - (s - 1)
      );
    }
    if (pinRef.current && (hovered || selected)) {
      pinRef.current.position.y = node.position[1] + Math.sin(t * 4) * 0.04;
    }
  });

  return (
    <group
      ref={pinRef}
      position={node.position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Expanding pulse wave */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.13, 24]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Main beacon core */}
      <mesh>
        <sphereGeometry args={[selected ? 0.09 : hovered ? 0.075 : 0.06, 20, 20]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={selected ? 1.4 : hovered ? 1.0 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Vertical light stem */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.2, 12]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.8} />
      </mesh>

      {/* Micro Pin Label */}
      <Html position={[0, 0.14, 0]} center distanceFactor={8}>
        <button
          onClick={() => onSelect(node)}
          className={`pointer-events-auto flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md transition-all duration-300 shadow-lg ${
            selected
              ? "bg-amber-500 text-white ring-2 ring-white scale-110"
              : hovered
              ? "bg-white text-ink-900 ring-2 ring-amber-400 scale-105"
              : "bg-ink-900/80 text-white border border-white/20"
          }`}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse"
            style={{ backgroundColor: node.color }}
          />
          <span>{node.name}</span>
        </button>
      </Html>
    </group>
  );
}

// Orbiting Atmospheric Firefly Dust
function AtmosphericFireflies() {
  const count = 75;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
    }
    return [pos];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#F59E0B"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// 3D Scene Wrapper
function SceneContents({
  selectedNode,
  onSelectNode,
}: {
  selectedNode: SevaNode;
  onSelectNode: (node: SevaNode) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#FFF5EB" />
      <pointLight position={[-3, -2, 2]} intensity={0.6} color="#F59E0B" />
      <pointLight position={[2, 3, 2]} intensity={0.7} color="#10B981" />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group>
          <StylizedTerrain />
          <ElevationWireframe />

          {SEVA_NODES.map((node) => (
            <InteractivePin
              key={node.id}
              node={node}
              selected={selectedNode.id === node.id}
              onSelect={onSelectNode}
            />
          ))}

          <AtmosphericFireflies />
        </group>
      </Float>

      <OrbitControls
        enableZoom={true}
        minDistance={2.5}
        maxDistance={5.5}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

export default function DigitalTwin3D() {
  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SevaNode>(SEVA_NODES[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[480px] w-full items-center justify-center rounded-3xl border border-earth-200 bg-ink-950 p-6 text-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
          <p className="font-display text-sm font-semibold tracking-wide text-earth-300">
            Initializing 3D Topographic Digital Twin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[520px] w-full flex-col overflow-hidden rounded-3xl border border-earth-300/80 bg-gradient-to-b from-[#181410] via-[#1F1914] to-[#120F0C] shadow-2xl">
      {/* Top Overlay Badge & Controls hint */}
      <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-white">
            WebGL 3D Digital Twin
          </span>
          <span className="text-[10px] text-earth-400 font-mono">· India Topography</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold text-earth-300 backdrop-blur-md">
          <Compass className="h-3 w-3 text-amber-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Drag to Orbit 360° · Click Pins</span>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <div className="h-full w-full">
        <Canvas
          camera={{ position: [0, 0.4, 3.8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneContents
            selectedNode={selectedNode}
            onSelectNode={(node) => setSelectedNode(node)}
          />
        </Canvas>
      </div>

      {/* Bottom Floating Interactive Card for Selected 3D Node */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="rounded-2xl border border-white/15 bg-black/75 p-4 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  {selectedNode.name}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-earth-200">
                  {selectedNode.state}
                </span>
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-earth-300">
                <span className="flex items-center gap-1 font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {selectedNode.crowdScore}% Crowd Pressure
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-earth-200">
                  <Thermometer className="h-3.5 w-3.5 text-amber-400" />
                  {selectedNode.temp}
                </span>
                <span>·</span>
                <span className="text-earth-300 truncate max-w-[200px]">
                  {selectedNode.ecoStay}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-right">
                <p className="text-[10px] uppercase font-bold text-emerald-300">Seva Bounty</p>
                <p className="text-xs font-black text-white">+{selectedNode.karma} Karma</p>
              </div>

              <a
                href={`/discover?q=${encodeURIComponent(selectedNode.name.split(" ")[0])}`}
                className="flex items-center gap-1 rounded-xl bg-amber-500 px-3.5 py-2 text-xs font-bold text-ink-950 transition-all hover:bg-amber-400 active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
