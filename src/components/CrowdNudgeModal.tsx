"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Sparkles, X, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";

interface CrowdNudgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  destinationName: string;
  alternatives: { name: string; state: string; crowd_score: number }[];
}

export default function CrowdNudgeModal({
  isOpen,
  onClose,
  destinationName,
  alternatives,
}: CrowdNudgeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="relative bg-gradient-to-r from-terra-500 to-amber-500 p-6 text-white">
              <button
                onClick={onClose}
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
              <AlertTriangle className="h-8 w-8" />
              <h3 className="mt-3 font-display text-xl font-bold">
                {destinationName} is under heavy tourist pressure
              </h3>
              <p className="mt-1 text-sm text-white/80">
                This month it&apos;s busier than usual. Here are similar options with the same vibe.
              </p>
            </div>

            <div className="p-5">
              {alternatives.length > 0 && (
                <div className="space-y-2">
                  {alternatives.map((alt) => (
                    <Link
                      key={alt.name}
                      href={`/discover?q=${encodeURIComponent(alt.name)}`}
                      onClick={onClose}
                      className="group flex items-center justify-between rounded-xl border border-ink-100 p-3 transition-all hover:border-sage-200 hover:bg-sage-50"
                    >
                      <div>
                        <p className="text-sm font-bold text-ink-800 group-hover:text-sage-700">
                          {alt.name}
                        </p>
                        <p className="text-xs text-ink-500">{alt.state}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-sage-50 px-2 py-0.5 text-[10px] font-semibold text-sage-700">
                          🟢 Much less crowded
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-sage-500" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
                <Sparkles className="h-4 w-4 shrink-0" />
                Booking an alternative earns +50 bonus reward points
              </div>

              <div className="mt-4 flex gap-3">
                <Button variant="outline" className="flex-1" onClick={onClose}>
                  I&apos;ll book {destinationName} anyway
                </Button>
                <Button variant="warm" className="flex-1" onClick={onClose}>
                  Show me alternatives
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
