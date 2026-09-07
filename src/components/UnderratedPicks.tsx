"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CrowdBadge from "@/components/CrowdBadge";
import SectionReveal from "@/components/SectionReveal";
import { MapPin, ArrowRight, Compass, Mountain, Trees, Landmark } from "lucide-react";
import type { DestinationMetric } from "@/lib/seed-data";
import { getCrowdLevel } from "@/lib/seed-data";

export default function UnderratedPicks() {
  const [picks, setPicks] = useState<
    (DestinationMetric & { crowd_level: string })[]
  >([]);

  useEffect(() => {
    fetch("/api/decongestion?type=picks")
      .then((r) => r.json())
      .then((d) => setPicks(d.picks || []))
      .catch(() => {});
  }, []);

  if (picks.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "hill_station":
        return <Mountain className="h-6 w-6 text-sage-600" />;
      case "beach":
        return <Compass className="h-6 w-6 text-blue-600" />;
      case "heritage":
        return <Landmark className="h-6 w-6 text-amber-700" />;
      case "spiritual":
        return <Landmark className="h-6 w-6 text-terra-600" />;
      default:
        return <Trees className="h-6 w-6 text-sage-600" />;
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-sage-50 px-4 py-1 text-xs font-semibold text-sage-700 border border-sage-200">
                <Compass className="h-3.5 w-3.5" />
                Beat the Crowd
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold text-ink-900 sm:text-3xl lg:text-4xl">
                This Week&apos;s Underrated Picks
              </h2>
              <p className="mt-2 max-w-lg text-ink-500">
                Low crowd pressure, incredible experiences. These destinations
                are waiting for you — no queues, no chaos.
              </p>
            </div>
          </div>
        </SectionReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((pick, i) => (
            <SectionReveal key={pick.id} delay={i * 0.06}>
              <Link
                href={`/discover?q=${encodeURIComponent(pick.name)}`}
                className="group block overflow-hidden rounded-2xl border border-earth-200 bg-white transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-40 bg-gradient-to-br from-sage-50 via-earth-100 to-amber-50 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 shadow-sm border border-earth-200">
                    {getCategoryIcon(pick.category)}
                  </div>
                  <div className="absolute left-3 top-3">
                    <CrowdBadge crowdScore={pick.crowd_score} />
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold text-ink-700 backdrop-blur-sm border border-earth-200 uppercase tracking-wider">
                    {pick.category.replace("_", " ")}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-bold text-ink-800 group-hover:text-sage-700">
                        {pick.name}
                      </h3>
                      <div className="mt-0.5 flex items-center gap-1 text-sm text-ink-500">
                        <MapPin className="h-3.5 w-3.5" />
                        {pick.state}
                      </div>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-sage-500" />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-sage-600 font-semibold">
                      +50 bonus points
                    </span>
                    <span className="text-ink-400">
                      {pick.bookings_7d} bookings this week
                    </span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
