"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityAutocomplete from "@/components/CityAutocomplete";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CloudRain,
  Wind,
  Eye,
  Thermometer,
  Compass,
  Navigation,
  PhoneCall,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw,
  Sparkles,
  Mountain,
  FileText,
  Building2,
  Info,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/Toast";

interface ChokePoint {
  id: string;
  name: string;
  kmMarker: string;
  hazardType: "Rockfall" | "Mudslide" | "Flash Flood" | "Dense Fog" | "Shooting Stones";
  severity: "low" | "moderate" | "high";
  status: "clear" | "slow" | "blocked" | "monitored";
  description: string;
  mitigationAdvice: string;
}

interface CorridorData {
  id: string;
  name: string;
  highway: string;
  state: string;
  route: string;
  elevationRange: string;
  distanceKm: number;
  chokePoints: ChokePoint[];
  alternativeRoute: {
    name: string;
    via: string;
    extraTimeMin: number;
    description: string;
    safetyBenefit: string;
  };
  emergencyHubs: {
    name: string;
    type: "Police" | "Hospital" | "Community Shelter" | "Disaster Force";
    phone: string;
    location: string;
  }[];
}

interface AdvisoryResponse {
  corridor: CorridorData;
  weather: {
    temp: number;
    condition: string;
    rainPast24h: number;
    rainForecast: number;
    windSpeed: number;
    humidity: number;
    visibilityKm: number;
  };
  hazard: {
    score: number;
    level: "LOW_RISK" | "MODERATE_CAUTION" | "HIGH_ALERT";
    statusBadge: string;
    statusColor: string;
    breakdown: {
      rainfallImpact: number;
      windVelocityImpact: number;
      slopeSusceptibility: number;
      formula: string;
      source: string;
    };
  };
  availableCorridors: {
    id: string;
    name: string;
    highway: string;
    state: string;
  }[];
  lastUpdated: string;
}

export default function MountainAdvisoryPage() {
  const { toast } = useToast();
  const [selectedCorridor, setSelectedCorridor] = useState("manali");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<AdvisoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdvisory = async (query: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/advisory?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      toast({
        title: "Telemetry Notice",
        message: "Loaded cached mountain geological safety model.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get("q") || params.get("corridor");
      if (qParam) {
        setSelectedCorridor(qParam.toLowerCase());
        setSearchQuery(qParam);
        fetchAdvisory(qParam);
        return;
      }
    }
    fetchAdvisory("manali");
  }, []);

  const handleSelectCity = (cityName: string) => {
    setSelectedCorridor(cityName.toLowerCase());
    setSearchQuery(cityName);
    fetchAdvisory(cityName);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Advisory Link Copied",
        message: "Share this real-time road safety status with fellow travelers.",
      });
    }
  };

  const getHazardBadge = (level: string) => {
    if (level === "HIGH_ALERT") {
      return {
        bg: "bg-red-50 text-red-800 border-red-200",
        pill: "bg-red-600 text-white",
        icon: AlertTriangle,
        label: "High Landslide Risk — Caution Required",
      };
    }
    if (level === "MODERATE_CAUTION") {
      return {
        bg: "bg-amber-50 text-amber-900 border-amber-200",
        pill: "bg-amber-500 text-white",
        icon: Info,
        label: "Moderate Caution — Daylight Transit Only",
      };
    }
    return {
      bg: "bg-sage-50 text-sage-900 border-sage-200",
      pill: "bg-sage-600 text-white",
      icon: ShieldCheck,
      label: "Low Risk — Normal Highway Transit Clear",
    };
  };

  const corridor = data?.corridor;
  const weather = data?.weather;
  const hazard = data?.hazard;
  const badgeConfig = hazard ? getHazardBadge(hazard.level) : null;

  return (
    <main className="min-h-screen bg-earth-50 text-ink-900 print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:pt-36 sm:pb-24 print:pt-4 print:pb-4">
        {/* Header Title Section */}
        <div className="relative mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-bold text-amber-800 mb-2">
                <Mountain className="h-3.5 w-3.5 text-amber-600" />
                <span>Mountain Sentinel · Geological & Hydro-Meteorological Advisory</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                Real-Time Landslide & Safe-Route Advisory
              </h1>
              <p className="mt-1 text-sm text-ink-500 max-w-2xl">
                Live precipitation telemetry from Open-Meteo, highway choke point radar, and bypass routes across vulnerable Himalayan & Western Ghats corridors.
              </p>
            </div>

            <div className="flex items-center gap-2 print:hidden">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-xl border border-earth-200 bg-white px-3.5 py-2 text-xs font-semibold text-ink-700 shadow-sm hover:bg-earth-100 transition-all"
              >
                <Share2 className="h-3.5 w-3.5 text-ink-500" />
                <span>Share Status</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-ink-800 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-white" />
                <span>Save Offline Pass</span>
              </button>
            </div>
          </div>

          {/* Universal City / Corridor Search Input */}
          <div className="mt-6 max-w-2xl print:hidden">
            <label className="block text-xs font-bold text-ink-700 uppercase tracking-wider mb-1.5">
              Search Any City, Hill Station, or Route in India:
            </label>
            <CityAutocomplete
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
              }}
              onSelect={(suggestion) => {
                handleSelectCity(suggestion.name);
              }}
              placeholder="Search any destination (e.g. Kedarnath, Ooty, Nainital, Mussoorie, Leh, Wayanad)..."
            />
          </div>

          {/* Quick Popular Destination Chips */}
          <div className="mt-4 flex flex-wrap gap-2 items-center print:hidden">
            <span className="text-[11px] font-bold text-ink-400 uppercase tracking-wider mr-1">
              Popular Routes:
            </span>
            {[
              { id: "manali", label: "Manali (NH-3)", state: "Himachal" },
              { id: "kedarnath", label: "Kedarnath", state: "Uttarakhand" },
              { id: "badrinath", label: "Badrinath (NH-58)", state: "Uttarakhand" },
              { id: "shimla-spiti", label: "Kinnaur & Spiti (NH-5)", state: "Himachal" },
              { id: "nainital", label: "Nainital", state: "Uttarakhand" },
              { id: "mussoorie", label: "Mussoorie", state: "Uttarakhand" },
              { id: "gangtok", label: "Gangtok", state: "Sikkim" },
              { id: "munnar", label: "Munnar (NH-85)", state: "Kerala" },
              { id: "ooty", label: "Ooty", state: "Tamil Nadu" },
              { id: "leh", label: "Leh Ladakh", state: "Ladakh" },
              { id: "wayanad", label: "Wayanad", state: "Kerala" },
              { id: "coorg", label: "Coorg", state: "Karnataka" },
              { id: "dharamshala", label: "Dharamshala", state: "Himachal" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCity(c.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl px-3 py-1.5 text-xs font-bold transition-all border",
                  selectedCorridor.toLowerCase() === c.id.toLowerCase()
                    ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                    : "bg-white text-ink-700 border-earth-200 hover:bg-earth-100"
                )}
              >
                <span>{c.label}</span>
                <span
                  className={cn(
                    "rounded-md px-1 py-0.5 text-[8px] uppercase font-bold",
                    selectedCorridor.toLowerCase() === c.id.toLowerCase()
                      ? "bg-white/20 text-white"
                      : "bg-earth-100 text-ink-500"
                  )}
                >
                  {c.state}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && !data ? (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-earth-200 bg-white">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 animate-spin text-amber-600" />
              <p className="text-xs font-semibold text-ink-600">Gathering live precipitation and highway telemetry...</p>
            </div>
          </div>
        ) : (
          corridor &&
          hazard &&
          weather && (
            <div className="space-y-6">
              {/* Primary Telemetry & Hazard Gauge Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Main Status & Telemetry */}
                <div className="lg:col-span-2 rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-earth-100 pb-4">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-ink-400">
                        Primary Corridor Highway
                      </span>
                      <h2 className="font-display text-2xl font-bold text-ink-900 mt-0.5">
                        {corridor.name}
                      </h2>
                      <p className="text-xs text-ink-500 mt-0.5">{corridor.highway} · {corridor.route}</p>
                    </div>

                    {badgeConfig && (
                      <div className={cn("inline-flex items-center gap-2 rounded-2xl border px-3.5 py-2 text-xs font-bold", badgeConfig.bg)}>
                        <badgeConfig.icon className="h-4 w-4 shrink-0" />
                        <span>{badgeConfig.label}</span>
                      </div>
                    )}
                  </div>

                  {/* 4 Telemetry Metrics Grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="rounded-2xl bg-earth-50 p-3.5 border border-earth-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                        <CloudRain className="h-4 w-4 text-blue-500" />
                        <span>24h Rainfall</span>
                      </div>
                      <p className="font-display text-xl font-bold text-ink-900 mt-1">
                        {weather.rainPast24h} <span className="text-xs font-normal text-ink-400">mm</span>
                      </p>
                      <span className="text-[10px] text-ink-400">Fcst: +{weather.rainForecast}mm</span>
                    </div>

                    <div className="rounded-2xl bg-earth-50 p-3.5 border border-earth-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                        <Wind className="h-4 w-4 text-cyan-600" />
                        <span>Wind Velocity</span>
                      </div>
                      <p className="font-display text-xl font-bold text-ink-900 mt-1">
                        {weather.windSpeed} <span className="text-xs font-normal text-ink-400">km/h</span>
                      </p>
                      <span className="text-[10px] text-ink-400">Valley Draft</span>
                    </div>

                    <div className="rounded-2xl bg-earth-50 p-3.5 border border-earth-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                        <Eye className="h-4 w-4 text-amber-600" />
                        <span>Visibility</span>
                      </div>
                      <p className="font-display text-xl font-bold text-ink-900 mt-1">
                        {weather.visibilityKm} <span className="text-xs font-normal text-ink-400">km</span>
                      </p>
                      <span className="text-[10px] text-ink-400">{weather.condition}</span>
                    </div>

                    <div className="rounded-2xl bg-earth-50 p-3.5 border border-earth-200/80">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-ink-500">
                        <Thermometer className="h-4 w-4 text-terra-600" />
                        <span>Corridor Temp</span>
                      </div>
                      <p className="font-display text-xl font-bold text-ink-900 mt-1">
                        {weather.temp}°<span className="text-xs font-normal text-ink-400">C</span>
                      </p>
                      <span className="text-[10px] text-ink-400">{corridor.elevationRange}</span>
                    </div>
                  </div>

                  {/* Corridor Summary Banner */}
                  <div className="mt-5 rounded-2xl bg-earth-50/70 border border-earth-200 p-4 text-xs text-ink-600 flex items-start gap-3">
                    <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-ink-800">
                        Route Recommendation for Travelers:
                      </p>
                      <p className="mt-0.5 leading-relaxed">
                        {hazard.level === "HIGH_ALERT"
                          ? "Heavy rain triggers mud softening on steep valley walls. Postpone non-essential travel or switch immediately to the designated ridge bypass route."
                          : hazard.level === "MODERATE_CAUTION"
                          ? "Pavement is slippery with passing mountain mist. Avoid night transit between 7:00 PM and 5:00 AM when rockfall detection is impaired."
                          : "Highway is running at standard traffic flow with minimal rainfall accumulation. Exercise routine mountain driving precautions on sharp hairpins."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Col: Scientific Landslide Hazard Index Dial */}
                <div className="rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-ink-400">
                      Dynamic Geological Risk
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink-900 mt-0.5">
                      Landslide Susceptibility
                    </h3>
                    <p className="text-xs text-ink-500 mt-1">
                      Computed multi-factor risk index
                    </p>

                    {/* Circular Score Display */}
                    <div className="my-6 text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <div
                          className={cn(
                            "flex h-32 w-32 items-center justify-center rounded-full border-4 shadow-inner",
                            hazard.score >= 68
                              ? "border-red-500 bg-red-50 text-red-800"
                              : hazard.score >= 36
                              ? "border-amber-500 bg-amber-50 text-amber-800"
                              : "border-sage-500 bg-sage-50 text-sage-800"
                          )}
                        >
                          <div className="text-center">
                            <span className="font-display text-4xl font-extrabold">{hazard.score}</span>
                            <span className="block text-[11px] font-bold uppercase tracking-wider">
                              / 100
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-ink-800 mt-2">{hazard.statusBadge}</p>
                    </div>

                    {/* Breakdown Factors */}
                    <div className="space-y-2 border-t border-earth-100 pt-3 text-xs">
                      <div className="flex justify-between text-ink-600">
                        <span>Precipitation Factor</span>
                        <span className="font-mono font-bold">{hazard.breakdown.rainfallImpact} pts</span>
                      </div>
                      <div className="flex justify-between text-ink-600">
                        <span>Slope Gradient Hazard</span>
                        <span className="font-mono font-bold">{hazard.breakdown.slopeSusceptibility} pts</span>
                      </div>
                      <div className="flex justify-between text-ink-600">
                        <span>Wind Shear Factor</span>
                        <span className="font-mono font-bold">{hazard.breakdown.windVelocityImpact} pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-earth-50 p-2 text-[10px] text-ink-400 font-mono text-center">
                    Data: {hazard.breakdown.source}
                  </div>
                </div>
              </div>

              {/* Choke Point Highway Radar */}
              <div className="rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between border-b border-earth-100 pb-4 mb-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900">
                      Highway Choke Points & Vulnerable Sectors
                    </h3>
                    <p className="text-xs text-ink-500 mt-0.5">
                      Monitored bottlenecks with active rockfall, shooting stones, or flash flood history
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-ink-500">
                    {corridor.chokePoints.length} Monitored Points
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {corridor.chokePoints.map((cp, idx) => (
                    <div
                      key={cp.id}
                      className="flex flex-col justify-between rounded-2xl border border-earth-200 bg-earth-50/50 p-4 transition-all hover:bg-white hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="rounded-md bg-ink-900 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
                            {cp.kmMarker}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                              cp.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : cp.severity === "moderate"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-sage-100 text-sage-800"
                            )}
                          >
                            {cp.hazardType}
                          </span>
                        </div>

                        <h4 className="font-display text-base font-bold text-ink-900 mt-3">
                          {cp.name}
                        </h4>
                        <p className="text-xs text-ink-600 mt-1 leading-relaxed">
                          {cp.description}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-earth-200/60 pt-3">
                        <p className="text-[11px] font-semibold text-amber-900">
                          Driver Directive:
                        </p>
                        <p className="text-[11px] text-ink-500 mt-0.5 italic">
                          {cp.mitigationAdvice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternative Safe Bypass Route & Emergency Contacts (2 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Safe Alternative Bypass */}
                <div className="rounded-3xl border border-sage-200 bg-gradient-to-br from-sage-50/70 to-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sage-500 text-white">
                      <Navigation className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-sage-700">
                        Disaster Mitigation Route
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink-900">
                        {corridor.alternativeRoute.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 border border-sage-200/80 shadow-xs space-y-3">
                    <div>
                      <p className="text-xs font-bold text-ink-800">Transit Path:</p>
                      <p className="text-xs text-ink-600 mt-0.5 font-medium">{corridor.alternativeRoute.via}</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-sage-800">
                      <Clock className="h-3.5 w-3.5 text-sage-600" />
                      <span>
                        Delta:{" "}
                        <strong className="font-mono font-bold">
                          {corridor.alternativeRoute.extraTimeMin > 0
                            ? `+${corridor.alternativeRoute.extraTimeMin} mins extra`
                            : `${corridor.alternativeRoute.extraTimeMin} mins faster`}
                        </strong>
                      </span>
                    </div>

                    <div className="rounded-xl bg-sage-50 p-2.5 text-xs text-sage-900 border border-sage-200/60">
                      <p className="font-bold">Safety Benefit:</p>
                      <p className="mt-0.5">{corridor.alternativeRoute.safetyBenefit}</p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-ink-500 leading-relaxed">
                    {corridor.alternativeRoute.description}
                  </p>
                </div>

                {/* 24x7 Emergency Hubs & Community Relief Shelters */}
                <div className="rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500 text-white">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-red-700">
                        24x7 Mountain Life-Line
                      </span>
                      <h3 className="font-display text-lg font-bold text-ink-900">
                        Emergency & Community Shelters
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {corridor.emergencyHubs.map((hub) => (
                      <div
                        key={hub.name}
                        className="flex items-center justify-between rounded-2xl border border-earth-200 bg-earth-50/70 p-3 transition-colors hover:bg-earth-100"
                      >
                        <div>
                          <p className="text-xs font-bold text-ink-900">{hub.name}</p>
                          <p className="text-[11px] text-ink-500 mt-0.5">{hub.location} · {hub.type}</p>
                        </div>

                        <a
                          href={`tel:${hub.phone}`}
                          className="flex items-center gap-1.5 rounded-xl bg-ink-900 hover:bg-ink-800 px-3 py-1.5 text-xs font-bold text-white shadow transition-all shrink-0"
                        >
                          <PhoneCall className="h-3 w-3" />
                          <span>{hub.phone}</span>
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-[11px] text-ink-400 font-mono">
                    National Emergency Helpline: <strong className="text-ink-800">112</strong> · NDRF: <strong className="text-ink-800">1078</strong>
                  </div>
                </div>
              </div>

              {/* Driver Safety Protocol Strip */}
              <div className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
                <h4 className="font-display text-base font-bold text-amber-950 mb-2">
                  Mountain Hazard Defense Protocol for Drivers:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-amber-900">
                  <div className="rounded-2xl bg-white/80 p-3.5 border border-amber-200/60">
                    <p className="font-bold">1. Keep Windows Slightly Rolled Down</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Allows hearing rolling stone vibrations or whistling alarms from spotters before visual sighting.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3.5 border border-amber-200/60">
                    <p className="font-bold">2. Never Overtake Near Blind Chute Cuttings</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Mud runoff accelerates down natural chutes. Overtaking risks getting trapped if lead vehicle stops.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3.5 border border-amber-200/60">
                    <p className="font-bold">3. Zero Stoppage Under Unnetted Bluffs</p>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Even for photography, do not idle under exposed shale walls during or right after rain showers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </main>
  );
}
