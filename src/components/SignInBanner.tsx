"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LogIn, X } from "lucide-react";
import { useState } from "react";

interface SignInBannerProps {
  message?: string;
}

export default function SignInBanner({ message }: SignInBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl border border-amber-200 bg-amber-50 p-4"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-amber-800">
          {message || (
            <>
              <span className="font-semibold">Sign in</span> to save your
              progress, RSVP to events, and earn rewards.
            </>
          )}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink-800 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-ink-700 active:scale-95"
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="flex h-6 w-6 items-center justify-center rounded-md text-amber-600 hover:bg-amber-100"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
