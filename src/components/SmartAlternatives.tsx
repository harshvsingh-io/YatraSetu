"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CrowdBadge from "@/components/CrowdBadge";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";
import type { DestinationMetric } from "@/lib/seed-data";

interface SmartAlternativesProps {
  alternatives: (DestinationMetric & { crowd_level: string })[];
  sourceName: string;
}

export default function SmartAlternatives({
  alternatives,
  sourceName,
}: SmartAlternativesProps) {
  if (alternatives.length === 0) return null;

  return (
    <div className="rounded-2xl border border-sage-200 bg-sage-50/50 p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-sage-600" />
        <h3 className="font-display text-sm font-bold text-sage-800">
          Just as good, way less crowded
        </h3>
      </div>
      <p className="mt-1 text-xs text-sage-600">
        {sourceName} is under heavy tourist pressure — try these alternatives
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {alternatives.map((alt, i) => (
          <motion.div
            key={alt.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              href={`/discover?q=${encodeURIComponent(alt.name)}`}
              className="group block rounded-xl border border-sage-200 bg-white p-4 transition-all hover:border-sage-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-base font-bold text-ink-800 group-hover:text-sage-700">
                    {alt.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
                    <MapPin className="h-3 w-3" />
                    {alt.state}
                  </div>
                </div>
                <CrowdBadge crowdScore={alt.crowd_score} size="sm" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-sage-600">
                  +50 bonus points for choosing alternatives
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-sage-500 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
