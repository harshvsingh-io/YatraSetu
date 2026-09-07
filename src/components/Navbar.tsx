"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import {
  MapPin,
  Calendar,
  Wallet,
  BarChart3,
  Menu,
  X,
  Mountain,
  User,
  LogOut,
  BookmarkCheck,
  Award,
  Globe,
  ChevronDown,
  Sparkles,
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
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<"EN" | "HI">("EN");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setProfileDropdownOpen(false);
    router.push("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-earth-200/80 py-3" : "bg-transparent py-5"
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
                <span className="font-display text-xl leading-tight tracking-tight text-ink-900 font-bold">
                  YatraSetu
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-700">
                  {currentLang === "HI" ? "यात्रा बने सेवा" : "Yatra Bane Seva"}
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
                      "relative rounded-xl px-4 py-2 text-sm font-semibold transition-colors duration-200",
                      isActive
                        ? "text-amber-800"
                        : "text-ink-600 hover:text-ink-900 hover:bg-earth-100/70"
                    )}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-amber-100/70"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Side (Language + Auth) */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* Language Switcher */}
              <button
                onClick={() => setCurrentLang((prev) => (prev === "EN" ? "HI" : "EN"))}
                className="flex items-center gap-1.5 rounded-xl border border-earth-300/80 bg-white/60 px-3 py-1.5 text-xs font-semibold text-ink-700 transition-all hover:bg-earth-100"
                title="Toggle Language"
              >
                <Globe className="h-3.5 w-3.5 text-amber-600" />
                <span>{currentLang}</span>
              </button>

              {/* Authentication Actions */}
              {isLoggedIn && user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 rounded-2xl border border-earth-200 bg-white p-1.5 pr-3 shadow-sm hover:border-earth-300 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 text-xs font-bold text-white shadow-sm">
                      {getInitials(user.name)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-ink-900 leading-tight">
                        {user.name.split(" ")[0]}
                      </span>
                      <span className="text-[10px] font-medium text-amber-700 leading-none">
                        {user.stats.karmaPoints} pts
                      </span>
                    </div>
                    <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 rounded-2xl border border-earth-200 bg-white p-2 shadow-xl z-50"
                      >
                        {/* User Header */}
                        <div className="p-3 border-b border-earth-100 bg-earth-50/60 rounded-xl mb-1">
                          <p className="text-xs font-bold text-ink-900">{user.name}</p>
                          <p className="text-[11px] text-ink-500 truncate">{user.email || user.phone}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 rounded-md bg-sage-50 px-2 py-0.5 text-[10px] font-bold text-sage-700">
                              <Sparkles className="h-3 w-3" />
                              {user.role === "student-nss" ? "NSS Volunteer" : "Traveler"}
                            </span>
                            <span className="text-[11px] font-bold text-amber-700">
                              {user.stats.karmaPoints} Karma pts
                            </span>
                          </div>
                        </div>

                        {/* Menu Links */}
                        <div className="space-y-0.5">
                          <Link
                            href="/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-700 hover:bg-earth-100 transition-colors"
                          >
                            <User className="h-4 w-4 text-ink-500" />
                            My Profile
                          </Link>
                          <Link
                            href="/profile#bookings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-700 hover:bg-earth-100 transition-colors"
                          >
                            <BookmarkCheck className="h-4 w-4 text-ink-500" />
                            My Bookings
                            {user.bookings.length > 0 && (
                              <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                                {user.bookings.length}
                              </span>
                            )}
                          </Link>
                          <Link
                            href="/certificates"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-ink-700 hover:bg-earth-100 transition-colors"
                          >
                            <Award className="h-4 w-4 text-ink-500" />
                            My Certificates
                          </Link>
                        </div>

                        {/* Sign Out */}
                        <div className="pt-1 mt-1 border-t border-earth-100">
                          <button
                            onClick={handleSignOut}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl px-4 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-earth-100"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    className="group relative overflow-hidden rounded-xl bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ink-800 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="relative z-10">Get Started</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-terra-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setCurrentLang((prev) => (prev === "EN" ? "HI" : "EN"))}
                className="rounded-xl border border-earth-300 bg-white/80 px-2.5 py-1.5 text-xs font-bold text-ink-700"
              >
                {currentLang}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl text-ink-700 transition-colors hover:bg-earth-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[min(320px,85vw)] bg-earth-50 shadow-2xl overflow-y-auto"
            >
              <div className="flex h-full flex-col pt-24 px-6 pb-8">
                {/* User Card if logged in */}
                {isLoggedIn && user ? (
                  <div className="mb-6 p-4 rounded-2xl bg-white border border-earth-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-terra-500 text-sm font-bold text-white">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-ink-900">{user.name}</p>
                        <p className="text-xs text-amber-700 font-semibold">{user.stats.karmaPoints} Karma pts</p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold transition-all",
                          isActive ? "bg-amber-100/70 text-amber-800" : "text-ink-700 hover:bg-earth-100"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}

                  {isLoggedIn && user && (
                    <>
                      <div className="my-2 border-t border-earth-200" />
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-earth-100"
                      >
                        <User className="h-5 w-5 text-ink-500" />
                        My Profile & Stats
                      </Link>
                      <Link
                        href="/profile#bookings"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-earth-100"
                      >
                        <BookmarkCheck className="h-5 w-5 text-ink-500" />
                        My Bookings ({user.bookings.length})
                      </Link>
                      <Link
                        href="/certificates"
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink-700 hover:bg-earth-100"
                      >
                        <Award className="h-5 w-5 text-ink-500" />
                        My Certificates
                      </Link>
                    </>
                  )}
                </div>

                <div className="mt-auto pt-6 flex flex-col gap-3">
                  {isLoggedIn ? (
                    <button
                      onClick={handleSignOut}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="rounded-xl border border-earth-300 py-3 text-center text-sm font-semibold text-ink-700 transition-colors hover:bg-earth-100"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/login"
                        className="rounded-xl bg-ink-900 py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-ink-800"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
