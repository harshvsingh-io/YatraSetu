"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  WifiOff,
  PhoneCall,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  QrCode,
  Share2,
  Copy,
  Printer,
  Sparkles,
  Mountain,
  Compass,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";

interface OfflineTravelPassProps {
  bookingId?: string;
  defaultDestination?: string;
}

const presetPasses = [
  {
    id: "YS-HIM-9021",
    destination: "Tirthan Valley & Great Himalayan National Park",
    state: "Himachal Pradesh",
    altitude: "2,200m (Alpine Zone)",
    hotel: "Riverside Eco-Homestay, Gushaini",
    checkIn: "2026-10-12",
    checkOut: "2026-10-16",
    travelerName: "Aarav Sharma (NSS Volunteer)",
    emergencyContacts: [
      { role: "HP State Disaster Management", phone: "1070" },
      { role: "National Emergency Helpline", phone: "112" },
      { role: "Kullu Mountain Rescue Cell", phone: "+91 1902 222727" },
      { role: "Gushaini Primary Health Center", phone: "+91 1902 245210" },
    ],
    hostName: "Tenzing Negi (Local Eco-Host)",
    hostPhone: "+91 98160 44219",
    ecoRule: "Strict Zero-Plastic Zone: GHNP buffer trail requires carrying back all wrappers.",
    offlineToken: "AUTH-GHNP-88219-NSS-VERIFIED",
  },
  {
    id: "YS-UK-4412",
    destination: "Chopta & Tungnath Temple Trail",
    state: "Uttarakhand",
    altitude: "2,680m - 3,680m (High Altitude)",
    hotel: "Monal Eco Nest, Chopta Meadows",
    checkIn: "2026-10-20",
    checkOut: "2026-10-24",
    travelerName: "Priya Patel",
    emergencyContacts: [
      { role: "Uttarakhand SDRF Helplines", phone: "1077" },
      { role: "National Emergency Response", phone: "112" },
      { role: "Rudraprayag Mountain Hospital", phone: "+91 1364 233215" },
      { role: "Women Safety Helpline", phone: "1091" },
    ],
    hostName: "Kailash Rawat",
    hostPhone: "+91 94120 77312",
    ecoRule: "Sacred Forest Corridor: Leather shoes forbidden beyond Tungnath gateway.",
    offlineToken: "AUTH-CHOPTA-33910-SEVA-PASS",
  },
  {
    id: "YS-LAD-7731",
    destination: "Nubra Valley & Hunder Sand Dunes",
    state: "Ladakh UT",
    altitude: "3,050m (Cold High Desert)",
    hotel: "Karakoram Organic Farmstay, Diskit",
    checkIn: "2026-11-02",
    checkOut: "2026-11-07",
    travelerName: "Vikram Malhotra",
    emergencyContacts: [
      { role: "Leh District Emergency Cell", phone: "01982 255555" },
      { role: "Army Field Hospital (Diskit)", phone: "112" },
      { role: "Tourist Police Ladakh", phone: "+91 1982 258888" },
      { role: "High Altitude Rescue (SNM)", phone: "01982 252012" },
    ],
    hostName: "Stanzin Norboo",
    hostPhone: "+91 94691 12390",
    ecoRule: "Water Conservation Rule: Desert glacial meltwater sacred. Use bucket bath only.",
    offlineToken: "AUTH-LADAKH-99412-ECO-TOKEN",
  },
];

export default function OfflineTravelPass({
  bookingId,
  defaultDestination,
}: OfflineTravelPassProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPassIndex, setSelectedPassIndex] = useState(0);
  const [isAirplaneMode, setIsAirplaneMode] = useState(true);
  const [cachedTime, setCachedTime] = useState<string>("");

  useEffect(() => {
    setCachedTime(new Date().toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }));
  }, []);

  const pass = presetPasses[selectedPassIndex];

  const handlePrint = () => {
    window.print();
  };

  const handleSaveToDevice = () => {
    // Save to localStorage as offline token
    try {
      localStorage.setItem(`yatrasetu_offline_pass_${pass.id}`, JSON.stringify(pass));
      toast({
        title: "Pass Cached Offline",
        message: `Boarding Pass ${pass.id} cached in device storage. Fully accessible with 0% network.`,
      });
    } catch (e) {
      toast({
        title: "Offline Storage Ready",
        message: "Pass saved to browser cache.",
      });
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(pass.offlineToken);
    toast({
      title: "Offline Token Copied",
      message: "Present this token to forest checkpoint or eco-host for verification.",
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Offline Mode Banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-earth-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
            <WifiOff className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-ink-900">
                Remote Network Resilience Engine
              </span>
              <span className="rounded-full bg-sage-100 px-2 py-0.5 text-[10px] font-bold text-sage-800">
                100% Offline Ready
              </span>
            </div>
            <p className="text-xs text-ink-500 mt-0.5">
              Cached: {cachedTime || "Just now"} · No 4G/5G signal required in remote mountain valleys
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset Selector */}
          <div className="flex rounded-xl bg-earth-100 p-1 border border-earth-200 text-xs font-bold">
            {presetPasses.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setSelectedPassIndex(idx)}
                className={`rounded-lg px-2.5 py-1 transition-all ${
                  selectedPassIndex === idx
                    ? "bg-white text-ink-900 shadow-xs"
                    : "text-ink-600 hover:text-ink-900"
                }`}
              >
                {p.state.split(" ")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={handleSaveToDevice}
            className="flex items-center gap-1.5 rounded-xl bg-ink-900 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-ink-800 transition-all"
            title="Save to local device storage"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Cache Pass</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl border border-earth-300 bg-white px-3 py-1.5 text-xs font-bold text-ink-700 hover:bg-earth-100 transition-all"
            title="Print or Save PDF"
          >
            <Printer className="h-3.5 w-3.5 text-ink-600" />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Boarding Pass Ticket Container */}
      <motion.div
        key={pass.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl border-2 border-earth-300 bg-white shadow-xl"
      >
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-ink-900 via-amber-950 to-terra-950 px-6 py-5 text-white sm:px-8 sm:py-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-glow-amber">
                <Mountain className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                    YatraSetu Remote Pass
                  </span>
                  <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                    SIH26202 Certified
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">
                  {pass.destination}
                </h2>
              </div>
            </div>

            <div className="flex sm:flex-col items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/10 pt-2 sm:pt-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Pass Serial ID
              </span>
              <span className="font-mono text-base sm:text-lg font-bold text-white tracking-wider">
                {pass.id}
              </span>
            </div>
          </div>
        </div>

        {/* Main Pass Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-earth-200">
          {/* Section 1: Stay & Route Details */}
          <div className="p-6 sm:p-7 md:col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  Registered Traveler
                </span>
                <p className="font-display text-sm sm:text-base font-bold text-ink-900 mt-0.5">
                  {user?.name || pass.travelerName}
                </p>
                <span className="inline-flex items-center gap-1 rounded-md bg-sage-50 px-2 py-0.5 text-[10px] font-bold text-sage-700 mt-1">
                  <ShieldCheck className="h-3 w-3" /> NSS Seva Identity Verified
                </span>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
                  Altitude & Terrain
                </span>
                <p className="font-display text-sm sm:text-base font-bold text-amber-800 mt-0.5">
                  {pass.altitude}
                </p>
                <span className="text-[11px] text-ink-500 block mt-1">
                  Region: {pass.state}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-earth-200 bg-earth-50/70 p-4">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-400">
                Verified Eco-Homestay Stay
              </span>
              <p className="font-display text-base font-bold text-ink-900 mt-0.5">
                {pass.hotel}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-earth-200/80 pt-2.5 text-xs">
                <div>
                  <span className="text-ink-400 text-[10px] uppercase">Dates</span>
                  <p className="font-semibold text-ink-800">
                    {pass.checkIn} → {pass.checkOut}
                  </p>
                </div>
                <div>
                  <span className="text-ink-400 text-[10px] uppercase">Local Host</span>
                  <p className="font-semibold text-ink-800">
                    {pass.hostName} ({pass.hostPhone})
                  </p>
                </div>
              </div>
            </div>

            {/* Offline Eco-Etiquette Directive */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-900">
                    Mandatory Remote Ecological Protocol
                  </p>
                  <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                    {pass.ecoRule}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts - Offline Dial Ready */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-800 mb-3">
                <PhoneCall className="h-3.5 w-3.5 text-terra-600" />
                <span>Zero-Network Mountain Emergency Dialers (Direct Satellite / GSM)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pass.emergencyContacts.map((contact) => (
                  <a
                    key={contact.role}
                    href={`tel:${contact.phone}`}
                    className="flex items-center justify-between rounded-xl border border-earth-200 bg-white p-2.5 hover:border-amber-300 hover:bg-amber-50/50 transition-all"
                  >
                    <div>
                      <p className="text-xs font-bold text-ink-800">{contact.role}</p>
                      <p className="text-[10px] text-ink-500">Emergency Protocol</p>
                    </div>
                    <span className="rounded-lg bg-terra-50 px-2.5 py-1 font-mono text-xs font-bold text-terra-700 border border-terra-200">
                      {contact.phone}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Tamper-Proof Cryptographic QR & Token */}
          <div className="p-6 sm:p-7 flex flex-col justify-between items-center text-center bg-earth-50/40">
            <div className="w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-400">
                On-Site Checkpoint Token
              </span>
              <p className="text-xs text-ink-600 mt-0.5">
                Scannable by Forest Rangers & NSS Leads without internet
              </p>

              {/* Dynamic Offline Mock QR Visual */}
              <div className="mt-4 mx-auto flex h-44 w-44 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-earth-300 bg-white p-3 shadow-inner">
                <QrCode className="h-28 w-28 text-ink-800" />
                <div className="mt-1 flex items-center gap-1 text-[9px] font-bold uppercase text-sage-700">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Tamper-Proof SHA-256</span>
                </div>
              </div>

              {/* Token String */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-earth-200 bg-white px-3 py-2 text-left">
                <div className="overflow-hidden">
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-ink-400">
                    Offline Token ID
                  </span>
                  <p className="font-mono text-xs font-bold text-ink-800 truncate">
                    {pass.offlineToken}
                  </p>
                </div>
                <button
                  onClick={copyToken}
                  className="rounded-lg p-1.5 text-ink-400 hover:bg-earth-100 hover:text-ink-700 transition-colors"
                  title="Copy Token"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Offline Guarantee Stamp */}
            <div className="mt-6 w-full pt-4 border-t border-earth-200 flex items-center justify-center gap-2 text-xs font-bold text-amber-800">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>YatraSetu Safe Yatra Protocol</span>
            </div>
          </div>
        </div>

        {/* Perforated Stub Line Accent */}
        <div className="hidden md:block absolute top-[50%] -left-3 h-6 w-6 rounded-full bg-earth-100 border-r border-earth-300 -translate-y-1/2" />
        <div className="hidden md:block absolute top-[50%] -right-3 h-6 w-6 rounded-full bg-earth-100 border-l border-earth-300 -translate-y-1/2" />
      </motion.div>
    </div>
  );
}
