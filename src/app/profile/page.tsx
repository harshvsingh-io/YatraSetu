"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { useAuth, UserProfile } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  LogOut,
  Calendar,
  Clock,
  Award,
  MapPin,
  Shield,
  CheckCircle2,
  BookmarkCheck,
  Building,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle,
  FileText,
  WifiOff,
} from "lucide-react";

export default function ProfilePage() {
  const { user, isLoggedIn, updateProfile, cancelBooking, signOut, signInDemo } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "edit">("overview");

  // Edit profile form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student-nss" as UserProfile["role"],
    institution: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "student-nss",
        institution: user.institution || "",
      });
    }
  }, [user]);

  // Check URL hash for bookings tab
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#bookings") {
      setActiveTab("bookings");
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      institution: formData.institution,
    });
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Profile Updated", message: "Your changes have been saved." });
      setActiveTab("overview");
    }, 400);
  };

  const handleCancelBooking = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id);
      toast({ title: "Booking Cancelled", message: `Booking ${id} has been cancelled.` });
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <main className="min-h-screen bg-earth-50">
        <Navbar />
        <div className="mx-auto max-w-lg px-4 pt-36 pb-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 mb-6">
            <User className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-ink-900">Sign In to View Profile</h1>
          <p className="mt-3 text-sm text-ink-500">
            Access your verified seva passport, attended events, certificates, and trip bookings.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 py-3 px-6 text-sm font-bold text-white shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all"
            >
              Sign In with Phone / Google
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => signInDemo("volunteer")}
              className="rounded-2xl border border-earth-300 bg-white py-3 px-6 text-xs font-bold text-ink-700 hover:bg-earth-100 transition-all"
            >
              Quick Demo Login (NSS Student)
            </button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      <section className="pt-28 pb-16 sm:pt-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header Profile Card */}
          <SectionReveal>
            <div className="relative overflow-hidden rounded-3xl border border-earth-200 bg-white shadow-sm">
              {/* Banner with gradient */}
              <div className="h-32 bg-gradient-to-r from-ink-900 via-amber-950 to-terra-900 relative">
                <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-amber-500/15 blur-2xl" />
                <div className="absolute left-1/3 bottom-0 h-32 w-32 rounded-full bg-sage-500/15 blur-2xl" />
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                <div className="-mt-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  {/* Avatar */}
                  <div className="flex items-end gap-4">
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-amber-500 to-terra-500 text-3xl font-bold text-white shadow-xl">
                      {getInitials(user.name)}
                    </div>
                    <div className="mb-1">
                      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">
                        {user.name}
                      </h1>
                      <p className="text-xs sm:text-sm text-ink-500 flex items-center gap-1.5 mt-0.5">
                        <Building className="h-3.5 w-3.5 text-ink-400" />
                        {user.institution || "Verified Community Member"} · Member since {user.joinDate}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Karma pill */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Green Karma</p>
                      <p className="font-display text-xl font-bold text-amber-800">
                        {user.stats.karmaPoints} <span className="text-xs font-normal">pts</span>
                      </p>
                    </div>

                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-1.5 rounded-2xl border border-earth-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Tab switcher */}
                <div className="mt-8 flex gap-2 border-b border-earth-200 pb-2">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      activeTab === "overview"
                        ? "bg-ink-900 text-white shadow-sm"
                        : "text-ink-600 hover:bg-earth-100"
                    }`}
                  >
                    Overview & Stats
                  </button>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      activeTab === "bookings"
                        ? "bg-ink-900 text-white shadow-sm"
                        : "text-ink-600 hover:bg-earth-100"
                    }`}
                  >
                    My Bookings
                    {user.bookings.length > 0 && (
                      <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.2 text-[10px]">
                        {user.bookings.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("edit")}
                    className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      activeTab === "edit"
                        ? "bg-ink-900 text-white shadow-sm"
                        : "text-ink-600 hover:bg-earth-100"
                    }`}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Events Attended", value: user.stats.eventsAttended, icon: Calendar, color: "text-amber-600 bg-amber-50 border-amber-200" },
                    { label: "Volunteer Hours", value: `${user.stats.volunteerHours}h`, icon: Clock, color: "text-terra-600 bg-terra-50 border-terra-200" },
                    { label: "Certificates", value: user.stats.certificatesCount, icon: Award, color: "text-sage-600 bg-sage-50 border-sage-200" },
                    { label: "Passport Stamps", value: user.stats.stampsEarned, icon: MapPin, color: "text-blue-600 bg-blue-50 border-blue-200" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-3xl border border-earth-200 bg-white p-5 shadow-sm">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${s.color} mb-3`}>
                        <s.icon className="h-5 w-5" />
                      </div>
                      <p className="font-display text-2xl font-bold text-ink-900">{s.value}</p>
                      <p className="text-xs text-ink-500 font-medium mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Shortcuts */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-sage-800 uppercase tracking-wider mb-2">
                        <Award className="h-4 w-4 text-sage-600" />
                        <span>Verifiable Certificates</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900">
                        {user.stats.certificatesCount} Certificates of Seva Ready
                      </h3>
                      <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                        Issued with official digital signatures and Ministry of Tourism NSS recognition metadata.
                      </p>
                    </div>
                    <Link
                      href="/certificates"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                    >
                      View & Download Certificates <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                        <Sparkles className="h-4 w-4 text-amber-600" />
                        <span>Reward Redemption</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-ink-900">
                        {user.stats.karmaPoints} Points Available
                      </h3>
                      <p className="text-xs text-ink-500 mt-1 leading-relaxed">
                        Redeem points for eco-homestay stay discounts, state transport passes, or ASI monument passes.
                      </p>
                    </div>
                    <Link
                      href="/rewards"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
                    >
                      Browse Rewards Catalog <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold text-ink-900">My Trip & Stay Bookings</h2>
                  <Link
                    href="/discover"
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
                  >
                    + Book New Journey
                  </Link>
                </div>

                {user.bookings.length === 0 ? (
                  <div className="rounded-3xl border border-earth-200 bg-white p-12 text-center">
                    <BookmarkCheck className="mx-auto h-12 w-12 text-ink-300 mb-3" />
                    <h3 className="font-display text-lg font-bold text-ink-900">No Bookings Yet</h3>
                    <p className="text-xs text-ink-500 max-w-sm mx-auto mt-1">
                      Explore verified local partner homestays and get routed to low-crowd alternative destinations.
                    </p>
                    <Link
                      href="/discover"
                      className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-ink-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-ink-800 transition-all"
                    >
                      Explore Destinations
                    </Link>
                  </div>
                ) : (
                  user.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-3xl border border-earth-200 bg-white p-6 shadow-sm transition-all hover:border-earth-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-earth-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-ink-900">{booking.id}</span>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                booking.status === "confirmed"
                                  ? "bg-sage-100 text-sage-800"
                                  : booking.status === "completed"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <h3 className="font-display text-lg font-bold text-ink-900 mt-1">
                            {booking.hotelName}
                          </h3>
                          <p className="text-xs text-ink-500">{booking.destination}</p>
                        </div>

                        <div className="text-right">
                          <p className="font-display text-xl font-bold text-ink-900">₹{booking.amount}</p>
                          <p className="text-[11px] text-sage-700 font-semibold">+{booking.bonusKarma} Karma Earned</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <span className="text-ink-400 block text-[10px] uppercase">Check-in</span>
                          <span className="font-semibold text-ink-800">{booking.checkIn}</span>
                        </div>
                        <div>
                          <span className="text-ink-400 block text-[10px] uppercase">Check-out</span>
                          <span className="font-semibold text-ink-800">{booking.checkOut}</span>
                        </div>
                        <div>
                          <span className="text-ink-400 block text-[10px] uppercase">Guests</span>
                          <span className="font-semibold text-ink-800">{booking.guests} Guest(s)</span>
                        </div>
                        <div>
                          <span className="text-ink-400 block text-[10px] uppercase">Booked On</span>
                          <span className="font-semibold text-ink-800">{booking.createdAt}</span>
                        </div>
                      </div>

                      {booking.restorationEventLinked && (
                        <div className="mt-4 rounded-2xl bg-amber-50/70 p-3 border border-amber-200/60 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-amber-900 font-medium">
                            <Sparkles className="h-4 w-4 text-amber-600" />
                            <span>Linked Seva: {booking.restorationEventLinked}</span>
                          </div>
                          <Link
                            href="/events"
                            className="text-xs font-bold text-amber-700 hover:underline"
                          >
                            View Event
                          </Link>
                        </div>
                      )}

                      {booking.status === "confirmed" && (
                        <div className="mt-4 flex flex-wrap justify-end gap-2 pt-2">
                          <Link
                            href={`/offline-pass?id=${booking.id}`}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50/70 px-3 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100"
                          >
                            <WifiOff className="h-3.5 w-3.5 text-amber-600" />
                            Offline Pass
                          </Link>
                          <button
                            onClick={() => {
                              toast({ title: "Booking Slip Downloaded", message: `Slip for ${booking.id} saved.` });
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-earth-300 px-3 py-1.5 text-xs font-semibold text-ink-700 hover:bg-earth-100"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download Voucher
                          </button>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="rounded-xl border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "edit" && (
              <div className="rounded-3xl border border-earth-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="font-display text-xl font-bold text-ink-900 mb-6">Edit Profile Information</h2>
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 px-4 py-3 text-sm text-ink-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 px-4 py-3 text-sm text-ink-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 px-4 py-3 text-sm text-ink-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                        className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 px-4 py-3 text-sm text-ink-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100"
                      >
                        <option value="student-nss">Student NSS / NCC Volunteer</option>
                        <option value="tourist">Responsible Traveler</option>
                        <option value="community-lead">Community Restoration Lead</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-2">
                      Affiliated Institution / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g. NSS Unit · Goa University"
                      className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 px-4 py-3 text-sm text-ink-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-100"
                    />
                  </div>

                  <div className="pt-4 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("overview")}
                      className="rounded-xl border border-earth-300 px-5 py-2.5 text-xs font-bold text-ink-700 hover:bg-earth-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-xl bg-ink-900 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-ink-800 disabled:opacity-50"
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
