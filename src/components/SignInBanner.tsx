"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, X, Sparkles, CheckCircle2, Award } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";

interface SignInBannerProps {
  message?: string;
}

export default function SignInBanner({ message }: SignInBannerProps) {
  const { user, isLoggedIn } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (isLoggedIn && user) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl border border-sage-200 bg-sage-50/90 p-4 shadow-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sage-600 text-white shadow-sm">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-sage-900">
                Logged in as {user.name} ({user.role === "student-nss" ? "NSS Volunteer" : "Traveler"})
              </p>
              <p className="text-[11px] text-sage-700">
                You currently have <span className="font-bold">{user.stats.karmaPoints} Green Karma points</span> and {user.stats.stampsEarned} stamps earned.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="inline-flex items-center gap-1 rounded-xl bg-sage-700 px-3.5 py-1.5 text-xs font-bold text-white transition-all hover:bg-sage-800"
            >
              <Award className="h-3.5 w-3.5" />
              My Profile
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="rounded-lg p-1 text-sage-500 hover:bg-sage-200/50 hover:text-sage-800"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-amber-200 bg-amber-50/90 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="text-xs sm:text-sm text-amber-900 font-medium">
            {message || (
              <>
                <span className="font-bold">Sign in</span> to save your progress, RSVP to verified restoration events, and redeem Green Karma rewards.
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-ink-800 active:scale-95 shadow-sm"
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-lg p-1 text-amber-500 hover:bg-amber-200/50 hover:text-amber-800"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
