"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  ShieldCheck,
  PhoneCall,
  Wind,
  CloudRain,
  Mountain,
  Waves,
  ChevronDown,
  Info,
  HeartPulse,
} from "lucide-react";

interface EcoSafetyAlertProps {
  destination: string;
  temp?: number;
  condition?: string;
  humidity?: number;
  precipitation?: number;
}

export default function EcoSafetyAlert({
  destination,
  temp = 24,
  condition = "Partly Cloudy",
  humidity = 65,
  precipitation = 0,
}: EcoSafetyAlertProps) {
  const [expanded, setExpanded] = useState(false);

  const destLower = destination.toLowerCase();

  // Determine terrain & elevation
  const isHighAltitude =
    destLower.includes("leh") ||
    destLower.includes("ladakh") ||
    destLower.includes("chopta") ||
    destLower.includes("spiti") ||
    destLower.includes("manali") ||
    destLower.includes("kedarnath") ||
    destLower.includes("kasol");

  const isCoastal =
    destLower.includes("goa") ||
    destLower.includes("gokarna") ||
    destLower.includes("kerala") ||
    destLower.includes("andaman") ||
    destLower.includes("varkala") ||
    destLower.includes("karwar");

  // Determine risk level based on live indicators
  let riskLevel: "low" | "moderate" | "high" = "low";
  let statusBadge = "Trail Safe & Favorable";
  let statusDesc = "Current environmental indicators show clear trekking paths and safe coastal waters.";
  let riskColor = "bg-sage-50 text-sage-800 border-sage-200";
  let dotColor = "bg-sage-500";

  if (destLower.includes("monsoon") || humidity > 85 || precipitation > 15) {
    riskLevel = "high";
    statusBadge = "Trail Hazard Alert (Saturated Soil)";
    statusDesc = "High moisture & rainfall may trigger loose gravel or coastal surge. Stick strictly to marked trails.";
    riskColor = "bg-red-50 text-red-800 border-red-200";
    dotColor = "bg-red-500 animate-ping";
  } else if (isHighAltitude && temp < 8) {
    riskLevel = "moderate";
    statusBadge = "Sub-Zero Night Caution (Alpine Frost)";
    statusDesc = "Pass temperatures dropping near freezing point. Windproof thermal layers required.";
    riskColor = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "bg-amber-500";
  } else if (isCoastal && humidity > 78) {
    riskLevel = "moderate";
    statusBadge = "High Humidity & Moderate Swell";
    statusDesc = "Afternoon sea chop expected. Swim only between designated lifeguard flags.";
    riskColor = "bg-amber-50 text-amber-800 border-amber-200";
    dotColor = "bg-amber-500";
  }

  return (
    <div className="w-full rounded-2xl border border-earth-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-earth-100 text-ink-700">
            {isCoastal ? (
              <Waves className="h-5 w-5 text-teal-600" />
            ) : isHighAltitude ? (
              <Mountain className="h-5 w-5 text-amber-600" />
            ) : (
              <ShieldCheck className="h-5 w-5 text-sage-600" />
            )}
            <span className={`absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full ${dotColor}`} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display text-sm font-bold text-ink-900">
                Eco-Safety & Trail Advisory
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${riskColor}`}>
                {statusBadge}
              </span>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Live terrain & weather risk indexing for {destination}
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 self-end sm:self-auto rounded-xl border border-earth-200 bg-earth-50 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-earth-100 transition-colors"
        >
          <span>{expanded ? "Hide Details" : "Safety Protocols"}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expanded Safety Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-earth-100 overflow-hidden space-y-4"
          >
            <p className="text-xs text-ink-600 leading-relaxed">
              {statusDesc}
            </p>

            {/* High Altitude Advisory */}
            {isHighAltitude && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
                  <HeartPulse className="h-4 w-4 text-amber-700" />
                  <span>High Altitude Acclimatization Advisory (&gt;2,200m)</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Avoid heavy exertion on Day 1. Drink 3–4 liters of fluids with electrolytes daily. If experiencing persistent headache or dizziness, descend immediately.
                </p>
              </div>
            )}

            {/* Emergency Rescue Directory */}
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400 mb-2">
                24/7 Verified Emergency Helplines (Direct Hardware Dial)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "National Emergency", number: "112", tag: "Police / Fire / Rescue" },
                  { name: "NDRF Disaster Cell", number: "1078", tag: "Natural Calamity" },
                  { name: "Medical Ambulance", number: "108", tag: "Trauma Care" },
                  { name: "Women Safety Cell", number: "1091", tag: "Solo Traveler Support" },
                ].map((item) => (
                  <a
                    key={item.number}
                    href={`tel:${item.number}`}
                    className="flex flex-col rounded-xl border border-earth-200 bg-earth-50/50 p-2.5 hover:border-amber-400 hover:bg-amber-50/50 transition-all"
                  >
                    <span className="font-mono text-xs font-bold text-amber-700">
                      📞 {item.number}
                    </span>
                    <span className="text-xs font-bold text-ink-800 mt-0.5">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-ink-500">
                      {item.tag}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
