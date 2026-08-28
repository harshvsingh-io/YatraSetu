"use client";

import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-amber-500/8 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] rounded-full bg-sage-500/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #FAF8F5 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-glow-amber">
              <Mountain className="h-8 w-8 text-white" />
            </div>

            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to make your next
              <br />
              trip count for something bigger?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base text-ink-400 sm:text-lg">
              Join thousands of travelers who are turning every journey into an
              act of service. Sign up in 30 seconds.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" variant="secondary">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/impact">
                <Button size="lg" variant="ghost" className="text-ink-300 hover:text-white hover:bg-ink-800">
                  See Our Impact
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-xs text-ink-600">
              Free forever. No credit card required. Built for India.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
