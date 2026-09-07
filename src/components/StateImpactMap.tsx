"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

interface StateImpactData {
  state: string;
  code: string;
  sites: number;
  wasteKg: string;
  volunteers: number;
  trend: string;
  leadPartner: string;
  x: number; // percentage on map
  y: number;
}

const STATES: StateImpactData[] = [
  { state: "Ladakh", code: "LK", sites: 14, wasteKg: "12,400 kg", volunteers: 890, trend: "+18%", leadPartner: "Himalayan Eco Guild", x: 38, y: 14 },
  { state: "Himachal Pradesh", code: "HP", sites: 26, wasteKg: "21,800 kg", volunteers: 1650, trend: "+14%", leadPartner: "Parvati Valley NSS Unit", x: 39, y: 24 },
  { state: "Uttarakhand", code: "UK", sites: 22, wasteKg: "16,000 kg", volunteers: 1100, trend: "+9%", leadPartner: "Ganga Seva Dal", x: 44, y: 28 },
  { state: "Rajasthan", code: "RJ", sites: 24, wasteKg: "18,000 kg", volunteers: 1200, trend: "+10%", leadPartner: "Desert Heritage Care", x: 28, y: 38 },
  { state: "Maharashtra", code: "MH", sites: 52, wasteKg: "55,000 kg", volunteers: 4100, trend: "+15%", leadPartner: "Mumbai Mangrove Mission", x: 32, y: 56 },
  { state: "Goa", code: "GA", sites: 48, wasteKg: "42,000 kg", volunteers: 3200, trend: "+12%", leadPartner: "Goa Coastal Defense", x: 30, y: 68 },
  { state: "Karnataka", code: "KA", sites: 28, wasteKg: "22,000 kg", volunteers: 1600, trend: "+5%", leadPartner: "Western Ghats Foundation", x: 35, y: 72 },
  { state: "Kerala", code: "KL", sites: 36, wasteKg: "38,000 kg", volunteers: 2800, trend: "+8%", leadPartner: "Vembanad Wetland Care", x: 37, y: 84 },
  { state: "Tamil Nadu", code: "TN", sites: 32, wasteKg: "28,000 kg", volunteers: 2100, trend: "+7%", leadPartner: "Marina NSS Chapter", x: 44, y: 80 },
  { state: "West Bengal", code: "WB", sites: 18, wasteKg: "14,000 kg", volunteers: 980, trend: "+3%", leadPartner: "Sundarbans Bio-Shield", x: 68, y: 46 },
  { state: "Meghalaya", code: "ML", sites: 12, wasteKg: "8,500 kg", volunteers: 620, trend: "+11%", leadPartner: "Living Root Preservers", x: 78, y: 38 },
];

export default function StateImpactMap() {
  const [activeState, setActiveState] = useState<StateImpactData>(STATES[5]); // Default Goa

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-center rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm">
      {/* Interactive Map Visual (Left 7 Cols) */}
      <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] w-full rounded-2xl bg-ink-950 p-4 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#312c24_1px,transparent_1px)] [background-size:20px_20px] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-900/60 to-earth-950/90" />

        <div className="relative z-10 flex items-center justify-between text-xs text-white/70 pb-2 border-b border-white/10">
          <span className="font-bold flex items-center gap-1.5 text-amber-400">
            <Sparkles className="h-3.5 w-3.5" />
            Pan-India Active State Restoration Hubs
          </span>
          <span>Hover or tap a state badge</span>
        </div>

        {/* Simplified Geometric India outline SVG */}
        <div className="relative h-full w-full flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-full w-full object-contain drop-shadow-lg">
            <polygon
              points="38,10 46,18 52,24 64,28 78,32 82,42 74,48 64,52 56,62 48,74 44,92 38,90 32,80 28,68 24,54 22,40 28,26 34,16"
              fill="rgba(30, 27, 24, 0.6)"
              stroke="rgba(245, 158, 11, 0.3)"
              strokeWidth="0.8"
            />
          </svg>

          {/* State interactive pins */}
          {STATES.map((s) => {
            const isSelected = activeState.state === s.state;
            return (
              <button
                key={s.code}
                onMouseEnter={() => setActiveState(s)}
                onClick={() => setActiveState(s)}
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-20 group`}
              >
                <div
                  className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold shadow-md transition-all ${
                    isSelected
                      ? "bg-amber-500 text-ink-950 scale-125 ring-4 ring-amber-500/30"
                      : "bg-ink-800 text-white/90 border border-white/20 hover:bg-amber-400 hover:text-ink-900"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sage-400"></span>
                  <span>{s.state}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected State Metrics Card (Right 5 Cols) */}
      <div className="lg:col-span-5 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeState.state}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  State Code: {activeState.code}
                </span>
                <span className="text-xs font-semibold text-sage-700 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {activeState.trend} this month
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-900">
                {activeState.state}
              </h3>
              <p className="text-xs text-ink-500 mt-1">
                Lead Partner: <span className="font-semibold text-ink-700">{activeState.leadPartner}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl bg-earth-50 p-4 border border-earth-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Waste Cleared</span>
                <p className="font-display text-xl font-bold text-ink-900 mt-1">{activeState.wasteKg}</p>
                <span className="text-[11px] text-sage-700 font-medium">Audited & Verified</span>
              </div>
              <div className="rounded-2xl bg-earth-50 p-4 border border-earth-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Active Volunteers</span>
                <p className="font-display text-xl font-bold text-ink-900 mt-1">{activeState.volunteers}</p>
                <span className="text-[11px] text-amber-700 font-medium">Across {activeState.sites} sites</span>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/70 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xs text-amber-950 leading-relaxed font-medium">
                All events in <span className="font-bold">{activeState.state}</span> are supervised by certified student NSS chapters and local panchayat eco-boards.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
