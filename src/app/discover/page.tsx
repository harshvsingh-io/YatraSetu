"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import BookingModal from "@/components/BookingModal";
import CityAutocomplete from "@/components/CityAutocomplete";
import SmartAlternatives from "@/components/SmartAlternatives";
import CrowdBadge from "@/components/CrowdBadge";
import CrowdNudgeModal from "@/components/CrowdNudgeModal";
import { CardSkeleton } from "@/components/Skeleton";
import { useLiveWeather } from "@/lib/useLiveWeather";
import AIItineraryModal from "@/components/AIItineraryModal";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { Landmark, Compass, Car, Sparkles, ShieldCheck } from "lucide-react";
import {
  MapPin,
  Star,
  CloudSun,
  Train,
  Bus,
  Plane,
  Phone,
  Navigation,
  Filter,
  TrendingUp,
  Heart,
  ExternalLink,
} from "lucide-react";

const popularDestinations = [
  "Goa", "Manali", "Jaipur", "Varanasi", "Darjeeling", "Kerala",
  "Udaipur", "Rishikesh", "Andaman", "Leh Ladakh",
];

const sampleHotels = [
  {
    id: 1,
    name: "The Fern Resort & Spa",
    location: "Calangute, Goa",
    rating: 4.5,
    reviews: 2340,
    priceRange: "₹3,200/night",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    type: "Hotel",
    amenities: ["Pool", "Spa", "Wifi"],
  },
  {
    id: 2,
    name: "Casa Susegad",
    location: "Loutolim, Goa",
    rating: 4.8,
    reviews: 567,
    priceRange: "₹5,800/night",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
    type: "Homestay",
    amenities: ["Heritage", "Garden", "Wifi"],
  },
  {
    id: 3,
    name: "ITC Grand Goa",
    location: "Arossim, Goa",
    rating: 4.7,
    reviews: 3120,
    priceRange: "₹8,500/night",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop",
    type: "Hotel",
    amenities: ["Beach", "Pool", "Spa"],
  },
  {
    id: 4,
    name: "The Postcard Moira",
    location: "Moira, Goa",
    rating: 4.6,
    reviews: 892,
    priceRange: "₹4,200/night",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    type: "Boutique",
    amenities: ["Heritage", "Pool", "Dining"],
  },
  {
    id: 5,
    name: "Alila Diwa Goa",
    location: "Majorda, Goa",
    rating: 4.4,
    reviews: 1876,
    priceRange: "₹6,900/night",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    type: "Resort",
    amenities: ["Spa", "Pool", "Beach"],
  },
  {
    id: 6,
    name: "B bogaloo Homestay",
    location: "Arambol, Goa",
    rating: 4.3,
    reviews: 345,
    priceRange: "₹1,800/night",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&h=400&fit=crop",
    type: "Homestay",
    amenities: ["Budget", "Kitchen", "Wifi"],
  },
];

const weatherData = {
  temp: "31°C",
  condition: "Partly Cloudy",
  humidity: "72%",
  forecast: [
    { day: "Mon", temp: "31°", icon: "⛅" },
    { day: "Tue", temp: "29°", icon: "🌧" },
    { day: "Wed", temp: "32°", icon: "☀️" },
  ],
};

const attractions = [
  { name: "Basilica of Bom Jesus", rating: 4.6, distance: "8.2 km" },
  { name: "Dudhsagar Falls", rating: 4.7, distance: "58 km" },
  { name: "Fort Aguada", rating: 4.4, distance: "12 km" },
  { name: "Anjuna Flea Market", rating: 4.3, distance: "3.1 km" },
];

const transportOptions = [
  { type: "Train", icon: Train, label: "Mumbai → Goa", time: "12h", price: "₹450" },
  { type: "Bus", icon: Bus, label: "Pune → Goa", time: "8h", price: "₹800" },
  { type: "Flight", icon: Plane, label: "Delhi → Goa", time: "2h 15m", price: "₹4,200" },
];

const filterTabs = ["All", "Hotels", "Homestays", "Resorts", "Boutique"];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("Goa");
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [bookingHotel, setBookingHotel] = useState<typeof sampleHotels[0] | null>(null);
  const [crowdData, setCrowdData] = useState<{ destination: any; alternatives: any[] } | null>(null);
  const [showNudge, setShowNudge] = useState(false);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [heritageSites, setHeritageSites] = useState<any[]>([]);
  const [localPartners, setLocalPartners] = useState<any[]>([]);

  const { weather: liveWeather } = useLiveWeather(selectedDestination);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSearch = (query: string) => {
    setLoading(true);
    setSelectedDestination(query);
    // Fetch crowd data
    fetch(`/api/decongestion?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => setCrowdData(d))
      .catch(() => {});
    // Fetch heritage sites
    fetch(`/api/heritage?destination=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => setHeritageSites(d.sites || []))
      .catch(() => {});
    // Fetch local partners
    fetch(`/api/local-partners?q=${encodeURIComponent(query)}`)
      .then((r) => r.json())
      .then((d) => setLocalPartners(d.partners || []))
      .catch(() => {});
    setTimeout(() => setLoading(false), 1500);
  };

  // Fetch initial data for default destination
  useEffect(() => {
    handleSearch(selectedDestination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredHotels =
    activeFilter === "All"
      ? sampleHotels
      : sampleHotels.filter(
          (h) => h.type.toLowerCase() === activeFilter.toLowerCase()
        );

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Search Hero */}
      <section className="relative pt-28 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Discover {selectedDestination}
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Hotels, transport, weather, and attractions for your destination
            </p>
            {crowdData?.destination && (
              <div className="mt-3">
                <CrowdBadge crowdScore={crowdData.destination.crowd_score} />
              </div>
            )}
          </motion.div>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-6 max-w-2xl"
          >
            <CityAutocomplete
              value={searchQuery}
              onChange={setSearchQuery}
              onSelect={(s) => {
                setSearchQuery(s.name);
                handleSearch(s.name);
              }}
            />
          </motion.div>

          {/* Quick destination chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {popularDestinations.map((dest) => (
              <button
                key={dest}
                onClick={() => handleSearch(dest)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  selectedDestination === dest
                    ? "bg-ink-800 text-white shadow-md"
                    : "border border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:bg-ink-50"
                )}
              >
                {dest}
              </button>
            ))}
          </motion.div>

          {/* Smart Alternatives for high-pressure destinations */}
          {crowdData?.alternatives && crowdData.alternatives.length > 0 && (
            <div className="mt-6">
              <SmartAlternatives
                alternatives={crowdData.alternatives}
                sourceName={selectedDestination}
              />
            </div>
          )}
        </div>
      </section>

      {/* AI Itinerary + Offbeat Nudge Strip */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-2 mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-900">
                AI Seva & Decongested Itinerary Planner
              </p>
              <p className="text-[11px] text-amber-800">
                Generate a custom 2–5 day route blending uncrowded attractions with verified restoration events in {selectedDestination}.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowItineraryModal(true)}
            className="shrink-0 rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-ink-800 active:scale-95 transition-all"
          >
            Plan with AI
          </button>
        </div>
      </div>

      {/* Weather + Transport strip */}
      <section className="border-y border-earth-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid py-6 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Current live weather */}
            <div className="flex items-center gap-4 rounded-2xl bg-earth-50 p-4 border border-earth-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <CloudSun className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-2xl font-bold text-ink-900">
                    {liveWeather.current.temp}°C
                  </p>
                  <span className="rounded-full bg-sage-100 px-2 py-0.2 text-[9px] font-bold text-sage-800 uppercase">
                    Live API
                  </span>
                </div>
                <p className="text-xs text-ink-500 capitalize mt-0.5">
                  {liveWeather.current.description || liveWeather.current.condition} · {liveWeather.current.humidity}% humidity
                </p>
              </div>
            </div>

            {/* 3-day forecast */}
            <div className="flex items-center justify-around rounded-2xl bg-earth-50 p-4 border border-earth-200 sm:col-span-1 lg:col-span-1">
              {liveWeather.forecast.map((day) => (
                <div key={day.date} className="text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{day.date}</p>
                  <p className="my-0.5 text-sm font-bold text-ink-800">{day.temp}°C</p>
                  <p className="text-[10px] text-ink-500 font-medium">{day.condition}</p>
                </div>
              ))}
            </div>

            {/* Transport options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-2xl bg-earth-50 p-3 border border-earth-200 sm:col-span-2 lg:col-span-2">
              {[
                { type: "Train", icon: Train, label: "IRCTC Trains", time: "Express", price: "₹450+", href: "https://www.irctc.co.in" },
                { type: "Bus", icon: Bus, label: "RedBus", time: "AC Sleeper", price: "₹750+", href: "https://www.redbus.in" },
                { type: "Flight", icon: Plane, label: "Skyscanner", time: "Direct Air", price: "₹3,400+", href: "https://www.skyscanner.co.in" },
                { type: "Cab", icon: Car, label: "Ola Outstation", time: "Doorstep", price: "₹2,800+", href: "https://www.olacabs.com" },
              ].map((t) => (
                <a
                  key={t.type}
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-earth-200 bg-white p-2.5 text-center transition-all hover:border-amber-400 hover:shadow-sm group"
                >
                  <t.icon className="h-4 w-4 text-ink-600 group-hover:text-amber-600 transition-colors" />
                  <span className="text-[10px] font-bold text-ink-800 leading-tight">
                    {t.label}
                  </span>
                  <span className="text-[10px] text-amber-700 font-bold">
                    {t.price}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Hotels grid */}
            <div className="lg:col-span-2">
              {/* Filter tabs */}
              <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={cn(
                      "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      activeFilter === tab
                        ? "bg-ink-800 text-white"
                        : "text-ink-600 hover:bg-ink-100"
                    )}
                  >
                    {tab}
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-2 text-sm text-ink-500">
                  <Filter className="h-4 w-4" />
                  <span>{filteredHotels.length} results</span>
                </div>
              </div>

              {/* Hotel cards */}
              {loading ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <AnimatePresence>
                    {filteredHotels.map((hotel, i) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <TiltCard>
                          <div className="group overflow-hidden rounded-2xl border border-ink-100 bg-white">
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={hotel.image}
                                alt={hotel.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              {/* Type badge */}
                              <span className="absolute left-3 top-3 rounded-lg bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-ink-700">
                                {hotel.type}
                              </span>
                              {/* Favorite */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(hotel.id);
                                }}
                                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-transform hover:scale-110 active:scale-90"
                              >
                                <Heart
                                  className={cn(
                                    "h-4 w-4 transition-colors",
                                    favorites.has(hotel.id)
                                      ? "fill-terra-500 text-terra-500"
                                      : "text-ink-400"
                                  )}
                                />
                              </button>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-display text-lg font-bold text-ink-800 leading-tight">
                                  {hotel.name}
                                </h3>
                                <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5">
                                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                  <span className="text-xs font-bold text-amber-700">
                                    {hotel.rating}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-1 flex items-center gap-1 text-sm text-ink-500">
                                <MapPin className="h-3.5 w-3.5" />
                                {hotel.location}
                                <span className="text-ink-300">·</span>
                                <span className="text-xs">{hotel.reviews.toLocaleString()} reviews</span>
                              </div>

                              {/* Amenities */}
                              <div className="mt-3 flex gap-1.5">
                                {hotel.amenities.map((a) => (
                                  <span
                                    key={a}
                                    className="rounded-md bg-ink-50 px-2 py-0.5 text-[11px] font-medium text-ink-600"
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>

                              {/* Price + actions */}
                              <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
                                <span className="font-display text-lg font-bold text-ink-800">
                                  {hotel.priceRange}
                                </span>
                                <div className="flex gap-2">
                                  <a
                                    href={`tel:`}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50"
                                  >
                                    <Phone className="h-3.5 w-3.5" />
                                  </a>
                                  <a
                                    href="#"
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-200 text-ink-500 transition-colors hover:bg-ink-50"
                                  >
                                    <Navigation className="h-3.5 w-3.5" />
                                  </a>
                                  <button
                                    onClick={() => {
                                      if (crowdData?.destination?.crowd_score >= 70) {
                                        setShowNudge(true);
                                      } else {
                                        setBookingHotel(hotel);
                                      }
                                    }}
                                    className="flex items-center gap-1 rounded-lg bg-terra-500 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-terra-600 active:scale-95"
                                  >
                                    Book
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TiltCard>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Nearby Attractions */}
              <SectionReveal>
                <div className="rounded-2xl border border-ink-100 bg-white p-5">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                    <TrendingUp className="h-5 w-5 text-terra-500" />
                    Nearby Attractions
                  </h3>
                  <div className="mt-4 space-y-3">
                    {attractions.map((a) => (
                      <div
                        key={a.name}
                        className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-ink-50"
                      >
                        <div>
                          <p className="text-sm font-semibold text-ink-700">
                            {a.name}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-ink-500">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {a.rating}
                            <span className="text-ink-300">·</span>
                            {a.distance}
                          </div>
                        </div>
                        <button className="rounded-lg bg-ink-50 p-2 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-600">
                          <MapPin className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Quick book links */}
              <SectionReveal delay={0.1}>
                <div className="rounded-2xl border border-ink-100 bg-white p-5">
                  <h3 className="font-display text-lg font-bold text-ink-800">
                    Book Transport
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    Deep links to official booking sites
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      { label: "IRCTC — Trains", href: "https://www.irctc.co.in" },
                      { label: "RedBus — Buses", href: "https://www.redbus.in" },
                      { label: "Skyscanner — Flights", href: "https://www.skyscanner.co.in" },
                      { label: "Ola — Local Cabs", href: "https://www.olacabs.com" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-xl border border-ink-100 p-3 text-sm font-medium text-ink-700 transition-all hover:border-terra-200 hover:bg-terra-50/50"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5 text-ink-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Nearby restoration event teaser */}
              <SectionReveal delay={0.2}>
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700 p-5 text-white">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                  <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5" />
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-semibold">
                      <Sparkles className="h-3.5 w-3.5" /> Nearby Restoration Event
                    </span>
                    <h3 className="mt-3 font-display text-lg font-bold">
                      Goa Beach Cleanup
                    </h3>
                    <p className="mt-1 text-sm text-sage-100">
                      Calangute Beach · This Saturday · 7:00 AM
                    </p>
                    <p className="mt-2 text-xs text-sage-200">
                      142 volunteers already joined
                    </p>
                    <a
                      href="/events"
                      className="mt-4 inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-sage-700 transition-all hover:bg-sage-50 active:scale-95"
                    >
                      RSVP Now →
                    </a>
                  </div>
                </div>
              </SectionReveal>

              {/* Heritage Sites */}
              {heritageSites.length > 0 && (
                <SectionReveal delay={0.3}>
                  <div className="rounded-2xl border border-ink-100 bg-white p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                      <Landmark className="h-5 w-5 text-amber-500" />
                      Heritage Sites
                    </h3>
                    <div className="mt-4 space-y-2">
                      {heritageSites.map((site: any) => (
                        <a
                          key={site.id}
                          href={`/heritage/${site.id}`}
                          className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-amber-50"
                        >
                          <div>
                            <p className="text-sm font-semibold text-ink-700">
                              {site.name}
                            </p>
                            <p className="text-xs text-ink-500 capitalize">
                              {site.category}
                            </p>
                          </div>
                          <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
                            Start Story →
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              )}

              {/* Local Partners */}
              {localPartners.length > 0 && (
                <SectionReveal delay={0.35}>
                  <div className="rounded-2xl border border-ink-100 bg-white p-5">
                    <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                      <Compass className="h-5 w-5 text-sage-500" />
                      Verified Local Stays
                    </h3>
                    <p className="mt-1 text-xs text-ink-500">
                      Curated by our team — real properties, not API listings
                    </p>
                    <div className="mt-4 space-y-3">
                      {localPartners.map((partner: any) => (
                        <div
                          key={partner.id}
                          className="rounded-xl border border-ink-100 p-3 transition-colors hover:bg-ink-50"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-semibold text-ink-700">
                                {partner.name}
                              </p>
                              <p className="text-xs text-ink-500 capitalize">
                                {partner.type} · {partner.price_range}
                              </p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-md bg-sage-50 px-2 py-0.5 text-[10px] font-semibold text-sage-700">
                              <ShieldCheck className="h-3 w-3" /> Verified Stay
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs text-ink-500">
                            {partner.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {bookingHotel && (
        <BookingModal
          isOpen={!!bookingHotel}
          onClose={() => setBookingHotel(null)}
          hotel={bookingHotel}
        />
      )}

      <CrowdNudgeModal
        isOpen={showNudge}
        onClose={() => {
          setShowNudge(false);
          // If they choose to proceed anyway, open the booking modal
        }}
        destinationName={selectedDestination}
        alternatives={crowdData?.alternatives || []}
      />

      {showItineraryModal && (
        <AIItineraryModal
          isOpen={showItineraryModal}
          onClose={() => setShowItineraryModal(false)}
          destination={selectedDestination}
        />
      )}
    </main>
  );
}
