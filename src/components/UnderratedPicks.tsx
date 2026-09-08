"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SectionReveal from "@/components/SectionReveal";
import { MapPin, ArrowRight, Compass, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import type { DestinationMetric } from "@/lib/seed-data";

const DESTINATION_PHOTOS: Record<string, string> = {
  Kasol: "https://images.unsplash.com/photo-1675515642093-4fd5b6cca657?w=800&h=600&fit=crop",
  "Tirthan Valley": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
  Gokarna: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
  Orchha: "https://images.unsplash.com/photo-1642152654554-1c6d6e86c967?w=800&h=600&fit=crop",
  Chopta: "https://images.unsplash.com/photo-1631866647491-d3774677e0d5?w=800&h=600&fit=crop",
  Hampi: "https://images.unsplash.com/photo-1670280226105-c9210a22274d?w=800&h=600&fit=crop",
  Munnar: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&h=600&fit=crop",
  Pondicherry: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
};

export default function UnderratedPicks() {
  const [picks, setPicks] = useState<(DestinationMetric & { crowd_level: string })[]>([]);

  useEffect(() => {
    fetch("/api/decongestion?type=picks")
      .then((r) => r.json())
      .then((d) => setPicks(d.picks || []))
      .catch(() => {});
  }, []);

  if (picks.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-earth-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-50 px-3.5 py-1 text-xs font-bold text-sage-800 border border-sage-200 shadow-2xs">
                <Compass className="h-3.5 w-3.5 text-sage-600" />
                <span>AI Decongestion Engine</span>
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl tracking-tight">
                Underrated Hidden Gems
              </h2>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-ink-500 leading-relaxed">
                Rerouting tourism away from saturated hotspots. Experience pristine valleys, untouched beaches, and living heritage with zero queues.
              </p>
            </div>

            <Link
              href="/discover"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 group shrink-0"
            >
              <span>Explore all alternatives</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </SectionReveal>

        {/* Destination Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick, i) => {
            const photo =
              DESTINATION_PHOTOS[pick.name] ||
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";

            return (
              <SectionReveal key={pick.id} delay={i * 0.06}>
                <Link
                  href={`/discover?q=${encodeURIComponent(pick.name)}`}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-amber-300"
                >
                  {/* Photo with gradient overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-earth-100">
                    <img
                      src={photo}
                      alt={pick.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/15">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        {pick.crowd_score}% Crowd Pressure
                      </span>
                    </div>

                    <span className="absolute top-3.5 right-3.5 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-800 border border-earth-200">
                      {pick.category.replace("_", " ")}
                    </span>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5">
                      <h3 className="font-display text-xl font-bold text-white tracking-tight">
                        {pick.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-earth-200 mt-0.5">
                        <MapPin className="h-3.5 w-3.5 text-amber-400" />
                        <span>{pick.state}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-4 flex items-center justify-between border-t border-earth-100">
                    <div className="flex items-center gap-1.5 rounded-lg bg-sage-50 px-2.5 py-1 text-xs font-bold text-sage-700 border border-sage-200/80">
                      <Leaf className="h-3.5 w-3.5 text-sage-600" />
                      <span>+250 Green Karma</span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-ink-800 group-hover:text-amber-700 transition-colors">
                      <span>Explore Stays</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
