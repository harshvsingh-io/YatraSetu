"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Sparkles,
  Users,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Compass,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

export interface RestorationSite {
  id: string;
  name: string;
  state: string;
  category: "coastal" | "river" | "mountain" | "heritage" | "forest";
  lat: number;
  lng: number;
  status: "Live Now" | "Upcoming";
  volunteers: number;
  wasteCollectedKg: number;
  nextDate: string;
  description: string;
}

export const RESTORATION_SITES: RestorationSite[] = [
  {
    id: "site-goa",
    name: "Goa Beach Cleanup & Dune Care",
    state: "Goa",
    category: "coastal",
    lat: 15.52,
    lng: 73.74,
    status: "Live Now",
    volunteers: 420,
    wasteCollectedKg: 4200,
    nextDate: "Every Saturday & Sunday",
    description: "Weekly coastal plastic retrieval and Olive Ridley turtle nesting dune restoration.",
  },
  {
    id: "site-kasol",
    name: "Parvati River Trail Revival",
    state: "Himachal Pradesh",
    category: "river",
    lat: 32.01,
    lng: 77.31,
    status: "Live Now",
    volunteers: 185,
    wasteCollectedKg: 1850,
    nextDate: "Oct 12, 2026",
    description: "Alpine trail cleanup removing non-biodegradable waste left by trekkers.",
  },
  {
    id: "site-ladakh",
    name: "Pangong High-Altitude Waste Sweep",
    state: "Ladakh",
    category: "mountain",
    lat: 33.75,
    lng: 78.66,
    status: "Upcoming",
    volunteers: 110,
    wasteCollectedKg: 950,
    nextDate: "Oct 24, 2026",
    description: "Specialized zero-waste sweep in fragile high-altitude wetland habitats.",
  },
  {
    id: "site-kerala",
    name: "Vembanad Backwater Revival",
    state: "Kerala",
    category: "coastal",
    lat: 9.58,
    lng: 76.42,
    status: "Live Now",
    volunteers: 310,
    wasteCollectedKg: 3400,
    nextDate: "Oct 18, 2026",
    description: "Water hyacinth clearing and wetland bio-filtration reed bed planting.",
  },
  {
    id: "site-rajasthan",
    name: "Amber Fort & Water Baori Care",
    state: "Rajasthan",
    category: "heritage",
    lat: 26.98,
    lng: 75.85,
    status: "Upcoming",
    volunteers: 240,
    wasteCollectedKg: 1600,
    nextDate: "Nov 02, 2026",
    description: "Heritage stepwell conservation and desilting of rainwater reservoirs.",
  },
  {
    id: "site-mumbai",
    name: "Versova Mangrove Forest Revival",
    state: "Maharashtra",
    category: "coastal",
    lat: 19.13,
    lng: 72.81,
    status: "Live Now",
    volunteers: 560,
    wasteCollectedKg: 8900,
    nextDate: "Oct 10, 2026",
    description: "Mangrove sapling plantation and marine micro-plastic trapping barriers.",
  },
  {
    id: "site-chennai",
    name: "Marina Coastline Marine Sweep",
    state: "Tamil Nadu",
    category: "coastal",
    lat: 13.05,
    lng: 80.28,
    status: "Live Now",
    volunteers: 340,
    wasteCollectedKg: 2750,
    nextDate: "Oct 15, 2026",
    description: "Student NSS driven shoreline audit and ghost fishing net recovery.",
  },
  {
    id: "site-rishikesh",
    name: "Ganga Ghats Sacred River Clean",
    state: "Uttarakhand",
    category: "river",
    lat: 30.12,
    lng: 78.32,
    status: "Live Now",
    volunteers: 290,
    wasteCollectedKg: 2100,
    nextDate: "Oct 22, 2026",
    description: "Pilgrim-engagement seva for zero-plastic floral offering recovery.",
  },
  {
    id: "site-kolkata",
    name: "East Kolkata Wetlands Bio-Shield",
    state: "West Bengal",
    category: "river",
    lat: 22.51,
    lng: 88.42,
    status: "Upcoming",
    volunteers: 195,
    wasteCollectedKg: 1400,
    nextDate: "Nov 12, 2026",
    description: "Ramsar wetland desiltation and indigenous freshwater fish sanctuary care.",
  },
  {
    id: "site-ooty",
    name: "Nilgiri Shola Forest Plantation",
    state: "Tamil Nadu",
    category: "forest",
    lat: 11.41,
    lng: 76.69,
    status: "Upcoming",
    volunteers: 175,
    wasteCollectedKg: 850,
    nextDate: "Nov 18, 2026",
    description: "Native shola tree planting to restore crucial Western Ghats cloud moisture.",
  },
  {
    id: "site-meghalaya",
    name: "Sohra Living Root Bridge Guard",
    state: "Meghalaya",
    category: "forest",
    lat: 25.27,
    lng: 91.73,
    status: "Upcoming",
    volunteers: 140,
    wasteCollectedKg: 620,
    nextDate: "Dec 05, 2026",
    description: "Ficus elastica bio-engineering preservation and tourist trail waste sweeps.",
  },
];

export default function InteractiveMap({ className = "" }: { className?: string }) {
  const [selectedSite, setSelectedSite] = useState<RestorationSite>(RESTORATION_SITES[0]);
  const [activeFilter, setActiveFilter] = useState<"all" | "Live Now" | "Upcoming">("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredSites = RESTORATION_SITES.filter(
    (s) => activeFilter === "all" || s.status === activeFilter
  );

  // Conversion of India coordinates to SVG canvas viewBox [0 0 800 900]
  // Lat range: 8 to 36 (south to north)
  // Lng range: 68 to 96 (west to east)
  const projectCoords = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 96.0;
    const minLat = 8.0;
    const maxLat = 36.5;

    const x = ((lng - minLng) / (maxLng - minLng)) * 700 + 50;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 760 + 70;
    return { x, y };
  };

  return (
    <div className={`relative h-full w-full overflow-hidden rounded-2xl bg-ink-950 select-none ${className}`}>
      {/* Dark topographic grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#2d2822_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-tr from-ink-950 via-ink-900/90 to-earth-950/80" />

      {/* Top Map Controls Header */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-ink-900/90 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg">
          {(["all", "Live Now", "Upcoming"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                activeFilter === filter
                  ? "bg-amber-500 text-ink-950 shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {filter === "all" ? "All (11)" : filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-ink-900/90 backdrop-blur-md p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            title="Zoom In"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.9))}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            title="Zoom Out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setSelectedSite(RESTORATION_SITES[0]);
            }}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
            title="Reset Map"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Vector Map Canvas */}
      <div
        className="relative h-full w-full flex items-center justify-center transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <svg
          viewBox="0 0 800 900"
          className="h-full w-full max-h-[500px] object-contain drop-shadow-2xl"
        >
          {/* Stylized geometric India contour silhouette */}
          <path
            d="M 280 90 
               L 330 80 L 370 120 L 400 135 L 430 180 L 490 220 L 580 230 L 640 260 
               L 670 290 L 640 330 L 590 320 L 540 340 L 530 380 L 490 410 L 470 470 
               L 430 520 L 400 620 L 370 700 L 350 780 L 330 840 L 310 820 L 280 740 
               L 260 670 L 230 580 L 220 500 L 200 440 L 160 400 L 140 330 L 150 260 
               L 180 220 L 220 180 L 240 140 Z"
            fill="#1E1B18"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="opacity-40"
          />

          {/* Regional Connection Flow Lines */}
          <path
            d="M 230 580 Q 280 450 330 120 T 490 410 T 350 780"
            fill="none"
            stroke="rgba(245, 158, 11, 0.15)"
            strokeWidth="1.5"
          />

          {/* Render Pin Markers */}
          {filteredSites.map((site) => {
            const { x, y } = projectCoords(site.lat, site.lng);
            const isSelected = selectedSite.id === site.id;
            const isLive = site.status === "Live Now";

            return (
              <g
                key={site.id}
                className="cursor-pointer group"
                onClick={() => setSelectedSite(site)}
              >
                {/* Pulsing Radar Ring on Live Sites */}
                {isLive && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 22 : 14}
                    fill="none"
                    stroke={isLive ? "#10B981" : "#F59E0B"}
                    strokeWidth="1.5"
                    className="animate-ping opacity-60"
                  />
                )}

                {/* Outer Glow Halo */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 16 : 10}
                  fill={isSelected ? (isLive ? "rgba(16, 185, 129, 0.4)" : "rgba(245, 158, 11, 0.4)") : "rgba(255,255,255,0.1)"}
                  stroke={isLive ? "#10B981" : "#F59E0B"}
                  strokeWidth={isSelected ? 2 : 1.2}
                  className="transition-all duration-300"
                />

                {/* Inner Core */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 6 : 4}
                  fill={isLive ? "#10B981" : "#F59E0B"}
                />

                {/* State Label Preview */}
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  fill={isSelected ? "#F59E0B" : "rgba(255, 255, 255, 0.85)"}
                  fontSize={isSelected ? "12px" : "10px"}
                  fontWeight={isSelected ? "bold" : "600"}
                  className="pointer-events-none drop-shadow-md select-none font-sans"
                >
                  {site.state}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Selected Site Detail Card Popup */}
      <AnimatePresence mode="wait">
        {selectedSite && (
          <motion.div
            key={selectedSite.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 left-3 right-3 z-30 rounded-2xl border border-white/15 bg-ink-900/90 p-4 backdrop-blur-xl shadow-2xl text-white pointer-events-auto"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      selectedSite.status === "Live Now"
                        ? "bg-sage-500/20 text-sage-400 border border-sage-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {selectedSite.status}
                  </span>
                  <span className="text-[11px] text-white/60 font-medium">
                    {selectedSite.state}
                  </span>
                </div>
                <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                  {selectedSite.name}
                </h4>
                <p className="text-[11px] text-white/70 line-clamp-1 mt-0.5">
                  {selectedSite.description}
                </p>
              </div>

              <Link
                href="/events"
                className="shrink-0 inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-amber-500 to-terra-500 px-3.5 py-2 text-xs font-bold text-white shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>RSVP</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px]">
              <div className="flex items-center gap-1.5 text-white/80">
                <Users className="h-3.5 w-3.5 text-amber-400" />
                <span>{selectedSite.volunteers} Active Volunteers</span>
              </div>
              <div className="flex items-center gap-1.5 text-sage-300 font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{selectedSite.wasteCollectedKg} kg Waste Restored</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
