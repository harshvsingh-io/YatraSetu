"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Calendar,
  Wallet,
  BarChart3,
  Menu,
  X,
  Mountain,
} from "lucide-react";

const navLinks = [
  { href: "/discover", label: "Discover", icon: MapPin },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/rewards", label: "Rewards", icon: Wallet },
  { href: "/impact", label: "Impact", icon: BarChart3 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass shadow-glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 shadow-glow-amber transition-transform duration-300 group-hover:scale-105">
                <Mountain className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl leading-tight tracking-tight text-ink-900">
                  YatraSetu
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-amber-600">
                  यात्रा बने सेवा
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isActive
                        ? "text-amber-700"
                        : "text-ink-600 hover:text-ink-900 hover:bg-earth-100/60"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-lg bg-amber-50/80"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-earth-100"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                className="group relative overflow-hidden rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-ink-800 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-terra-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-earth-100 lg:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-earth-50 shadow-2xl">
              <div className="flex h-full flex-col pt-24 px-6 pb-8">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div key={link.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all",
                            isActive ? "bg-amber-50 text-amber-700" : "text-ink-700 hover:bg-earth-100"
                          )}
                        >
                          <link.icon className="h-5 w-5" />
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-auto flex flex-col gap-3">
                  <Link href="/login" className="rounded-xl border border-earth-200 px-4 py-3 text-center text-sm font-medium text-ink-700 transition-colors hover:bg-earth-100">
                    Sign in
                  </Link>
                  <Link href="/login" className="rounded-xl bg-ink-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg transition-all hover:bg-ink-800">
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
