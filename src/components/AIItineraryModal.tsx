"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Compass,
  MapPin,
  Clock,
  Download,
  Share2,
  X,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Layers,
} from "lucide-react";
import { useToast } from "@/components/Toast";

interface AIItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  destination: string;
}

interface DayPlan {
  day: number;
  title: string;
  morning: { activity: string; place: string; note: string };
  afternoon: { activity: string; place: string; sevaEvent: string; karmaBonus: number };
  evening: { activity: string; place: string; diningTip: string };
}

export default function AIItineraryModal({
  isOpen,
  onClose,
  destination = "Goa",
}: AIItineraryModalProps) {
  const { toast } = useToast();
  const [days, setDays] = useState(3);
  const [travelStyle, setTravelStyle] = useState<"eco" | "backpacker" | "heritage">("eco");
  const [interest, setInterest] = useState<"nature" | "heritage" | "slow">("nature");
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);

  const generatePlan = () => {
    setGenerating(true);
    setTimeout(() => {
      const destClean = destination || "Goa";
      const plan: DayPlan[] = [
        {
          day: 1,
          title: `Arrival & Eco-Homestay Settling in ${destClean}`,
          morning: {
            activity: "Arrival & Check-in",
            place: "Verified Partner Eco-Lodge",
            note: "Solar-powered stay with zero single-use plastic policy.",
          },
          afternoon: {
            activity: "Community Seva Orientation",
            place: `${destClean} Community Center`,
            sevaEvent: "Orientation with NSS chapter & coastal waste audit",
            karmaBonus: 150,
          },
          evening: {
            activity: "Sunset Walk & Heritage Storytelling",
            place: "Old Village Viewpoint",
            diningTip: "Try traditional millets & farm-to-table coastal curry.",
          },
        },
        {
          day: 2,
          title: `Active Restoration & Heritage Exploration`,
          morning: {
            activity: "Early Trail & Forest Clean-up",
            place: `${destClean} Forest Perimeter`,
            note: "Gloves & bio-degradable bags provided by local lead.",
          },
          afternoon: {
            activity: "Verified Dynamic QR Check-in",
            place: "Restoration Base Camp",
            sevaEvent: "Mangrove / River corridor revival drive (3 hours)",
            karmaBonus: 250,
          },
          evening: {
            activity: "AI Storyteller Guided Monument Walk",
            place: "Ancient Stone Baori / Temple Heritage Site",
            diningTip: "Local community cooperative tea house.",
          },
        },
        {
          day: 3,
          title: `Low-Pressure Scenic Hidden Gems & Departure`,
          morning: {
            activity: "Sunrise Birdwatching & Bamboo Rafting",
            place: "Decongested River Sanctuary",
            note: "Away from overcrowded tourist boat zones.",
          },
          afternoon: {
            activity: "Artisan Handicraft Souvenir Exchange",
            place: "Self-Help Women's Cooperative",
            sevaEvent: "Plastic-free upcycling workshop",
            karmaBonus: 100,
          },
          evening: {
            activity: "Karma Points Redemption & Departure",
            place: `${destClean} Transit Hub`,
            diningTip: "Eco-packed travel snacks from partner bakery.",
          },
        },
      ];

      setItinerary(plan.slice(0, days));
      setGenerating(false);
      toast({
        title: "Itinerary Crafted!",
        message: `Tailored ${days}-day smart seva itinerary for ${destClean}.`,
      });
    }, 900);
  };

  const handleDownload = () => {
    toast({
      title: "Itinerary Downloaded",
      message: `Your eco-plan for ${destination} saved to offline PDF.`,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-earth-200"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-1.5 text-ink-400 hover:bg-earth-100 hover:text-ink-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span>AI Decongested Itinerary Planner</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
          Smart Travel Plan for {destination}
        </h2>
        <p className="text-xs sm:text-sm text-ink-500 mt-1">
          Combines eco-homestays, uncrowded attractions, and verified community seva events.
        </p>

        {/* Configuration Bar */}
        <div className="mt-6 rounded-2xl bg-earth-50 p-4 border border-earth-200 grid sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-ink-700 mb-1.5">Trip Duration</label>
            <div className="flex gap-1.5">
              {[2, 3, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`flex-1 rounded-xl py-1.5 font-bold transition-all ${
                    days === d ? "bg-ink-900 text-white shadow-sm" : "bg-white border border-earth-300 text-ink-700"
                  }`}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-ink-700 mb-1.5">Travel Style</label>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value as any)}
              className="w-full rounded-xl border border-earth-300 bg-white py-1.5 px-2 text-ink-800 font-medium"
            >
              <option value="eco">Eco-Homestay & Nature</option>
              <option value="backpacker">Budget Backpacker</option>
              <option value="heritage">Heritage & Cultural</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-ink-700 mb-1.5">Primary Focus</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value as any)}
              className="w-full rounded-xl border border-earth-300 bg-white py-1.5 px-2 text-ink-800 font-medium"
            >
              <option value="nature">Restoration + Scenic</option>
              <option value="heritage">Ancient Monuments</option>
              <option value="slow">Slow Offbeat Travel</option>
            </select>
          </div>
        </div>

        <button
          onClick={generatePlan}
          disabled={generating}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 py-3 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
        >
          {generating ? (
            <span>Analyzing Crowd Pressure & Crafting Seva Route...</span>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Decongested Itinerary</span>
            </>
          )}
        </button>

        {/* Itinerary Output */}
        {itinerary && (
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between border-b border-earth-200 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sage-800 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-sage-600" />
                Audited for Low Tourist Pressure
              </span>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
              >
                <Download className="h-3.5 w-3.5" />
                Download Plan
              </button>
            </div>

            {itinerary.map((day) => (
              <div
                key={day.day}
                className="rounded-2xl border border-earth-200 bg-earth-50/50 p-5 space-y-3.5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                    Day {day.day}
                  </span>
                  <span className="font-display text-sm font-bold text-ink-900">
                    {day.title}
                  </span>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  {/* Morning */}
                  <div className="rounded-xl bg-white p-3 border border-earth-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-ink-400 uppercase">Morning</span>
                    <p className="font-bold text-ink-900 mt-0.5">{day.morning.activity}</p>
                    <p className="text-ink-500 text-[11px] mt-1">{day.morning.place}</p>
                  </div>

                  {/* Afternoon - Seva */}
                  <div className="rounded-xl bg-sage-50/80 p-3 border border-sage-200 shadow-2xs">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold text-sage-700 uppercase">Seva Act</span>
                      <span className="text-[10px] font-bold text-amber-700">+{day.afternoon.karmaBonus} pts</span>
                    </div>
                    <p className="font-bold text-sage-900 mt-0.5">{day.afternoon.sevaEvent}</p>
                    <p className="text-sage-700 text-[11px] mt-1">{day.afternoon.place}</p>
                  </div>

                  {/* Evening */}
                  <div className="rounded-xl bg-white p-3 border border-earth-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-ink-400 uppercase">Evening</span>
                    <p className="font-bold text-ink-900 mt-0.5">{day.evening.activity}</p>
                    <p className="text-amber-700 text-[11px] mt-1 italic font-medium">{day.evening.diningTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
