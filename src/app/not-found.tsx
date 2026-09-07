"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mountain, ArrowLeft } from "lucide-react";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-earth-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-terra-500 shadow-lg">
          <Mountain className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-6 font-display text-6xl font-bold text-ink-900">
          404
        </h1>
        <p className="mt-2 font-display text-xl text-ink-600">
          This page wandered off the trail
        </p>
        <p className="mt-2 max-w-md text-sm text-ink-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant="warm">Explore Destinations</Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
