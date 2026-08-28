"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionReveal from "@/components/SectionReveal";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Filter,
  Search,
  Shield,
  Leaf,
  Trash2,
  TreePine,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

const eventTypes = [
  { id: "all", label: "All Events", icon: Filter },
  { id: "beach", label: "Beach Cleanup", icon: Trash2 },
  { id: "plantation", label: "Plantation", icon: TreePine },
  { id: "heritage", label: "Heritage Care", icon: Leaf },
];

const events = [
  {
    id: 1,
    title: "Calangute Beach Cleanup Drive",
    type: "beach",
    location: "Calangute Beach, Goa",
    date: "Aug 31, 2024",
    time: "7:00 AM — 10:00 AM",
    organizer: "Goa Coastal Restoration Network",
    verified: true,
    volunteers: 142,
    maxVolunteers: 200,
    description:
      "Join us for a morning beach cleanup at Calangute. We'll collect litter along the 2km stretch from Calangute to Baga. Gloves, bags, and refreshments provided.",
    scope: "Litter cleanup only — no structural work",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Mangrove Plantation — Divar Island",
    type: "plantation",
    location: "Divar Island, Goa",
    date: "Sep 7, 2024",
    time: "6:30 AM — 11:00 AM",
    organizer: "Goa Forest Department",
    verified: true,
    volunteers: 68,
    maxVolunteers: 100,
    description:
      "Plant 500 mangrove saplings along the Divar Island waterfront. Transportation by boat included. Lunch provided for all participants.",
    scope: "Plantation only — protective area",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Heritage Walk & Cleanup — Fontainhas",
    type: "heritage",
    location: "Fontainhas, Panaji, Goa",
    date: "Sep 14, 2024",
    time: "8:00 AM — 12:00 PM",
    organizer: "Goa Heritage Action Group",
    verified: true,
    volunteers: 34,
    maxVolunteers: 50,
    description:
      "Guided heritage walk through Fontainhas followed by a targeted cleanup of common waste spots. Learn about Portuguese-era architecture while giving back.",
    scope: "Litter cleanup & surface maintenance",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Anjuna Cliff Erosion Cleanup",
    type: "beach",
    location: "Anjuna Beach, Goa",
    date: "Sep 21, 2024",
    time: "6:00 AM — 9:00 AM",
    organizer: "Beach Guardians Goa",
    verified: false,
    volunteers: 23,
    maxVolunteers: 75,
    description:
      "Clean up the cliff-side trails near Anjune Beach. Focus on plastic waste and microplastics along the cliff edges and tide pools.",
    scope: "Litter cleanup only",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Molem Forest Trail Restoration",
    type: "plantation",
    location: "Bhagwan Mahavir Wildlife Sanctuary, Goa",
    date: "Sep 28, 2024",
    time: "7:00 AM — 1:00 PM",
    organizer: "Goa Wildlife Foundation",
    verified: true,
    volunteers: 56,
    maxVolunteers: 80,
    description:
      "Restore the Molem Nature Trail by planting native species and removing invasive growth. Transportation from Panaji included.",
    scope: "Plantation only — ASI buffer zone notice applies",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
  },
];

export default function EventsPage() {
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [rsvpd, setRsvpd] = useState<Set<number>>(new Set());
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [waiverChecked, setWaiverChecked] = useState(false);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  const filteredEvents = events.filter((e) => {
    const matchesType = activeType === "all" || e.type === activeType;
    const matchesSearch =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleRSVP = () => {
    if (!selectedEvent || !waiverChecked) return;
    setRsvpLoading(true);
    setTimeout(() => {
      setRsvpd((prev) => new Set(prev).add(selectedEvent.id));
      setRsvpLoading(false);
      setShowRSVPModal(false);
      setWaiverChecked(false);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-earth-50">
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-6 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl lg:text-5xl">
              Restoration Events
            </h1>
            <p className="mt-2 text-ink-500 sm:text-lg">
              Join verified clean-up and plantation drives near your destination
            </p>
          </motion.div>

          {/* Search */}
          <div className="relative mt-6 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Search by location or event name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-xl border-2 border-ink-200 bg-white pl-12 pr-4 text-sm font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none"
            />
          </div>

          {/* Type filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeType === type.id
                    ? "bg-ink-800 text-white shadow-md"
                    : "border border-ink-200 bg-white text-ink-600 hover:border-ink-300"
                )}
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="py-4 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {filteredEvents.map((event, i) => (
              <SectionReveal key={event.id} delay={i * 0.08}>
                <div className="group overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <div className="grid sm:grid-cols-[280px_1fr]">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden sm:h-auto sm:min-h-[240px]">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Verified badge */}
                      {event.verified && (
                        <span className="absolute left-3 top-3 flex items-center gap-1 rounded-lg bg-sage-500/90 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white">
                          <Shield className="h-3 w-3" />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-xl font-bold text-ink-800">
                              {event.title}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-ink-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {event.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-ink-600 line-clamp-2">
                          {event.description}
                        </p>

                        {/* Scope notice */}
                        <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-xs text-amber-700">
                          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{event.scope}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-4">
                        <div className="flex items-center gap-4">
                          {/* Volunteer count */}
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-ink-400" />
                            <span className="text-sm font-semibold text-ink-700">
                              {event.volunteers}
                            </span>
                            <span className="text-xs text-ink-400">
                              / {event.maxVolunteers}
                            </span>
                          </div>
                          {/* Progress bar */}
                          <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-ink-100 sm:block">
                            <div
                              className={cn(
                                "h-full rounded-full transition-all",
                                event.volunteers / event.maxVolunteers > 0.8
                                  ? "bg-terra-500"
                                  : "bg-sage-500"
                              )}
                              style={{
                                width: `${(event.volunteers / event.maxVolunteers) * 100}%`,
                              }}
                            />
                          </div>
                          {/* Organizer */}
                          <span className="hidden text-xs text-ink-500 lg:inline">
                            by {event.organizer}
                          </span>
                        </div>

                        {rsvpd.has(event.id) ? (
                          <span className="flex items-center gap-1.5 rounded-xl bg-sage-50 px-4 py-2 text-sm font-semibold text-sage-700">
                            <CheckCircle2 className="h-4 w-4" />
                            RSVPed
                          </span>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              setSelectedEvent(event);
                              setShowRSVPModal(true);
                            }}
                          >
                            RSVP
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}

            {filteredEvents.length === 0 && (
              <div className="py-20 text-center">
                <p className="text-lg font-semibold text-ink-600">
                  No events found
                </p>
                <p className="mt-1 text-sm text-ink-400">
                  Try adjusting your filters or search
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <AnimatePresence>
        {showRSVPModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
              onClick={() => {
                setShowRSVPModal(false);
                setWaiverChecked(false);
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowRSVPModal(false);
                  setWaiverChecked(false);
                }}
                className="absolute right-4 top-4 rounded-lg p-1 text-ink-400 hover:bg-ink-50"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="pr-8 font-display text-xl font-bold text-ink-800">
                RSVP Confirmation
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                {selectedEvent.title}
              </p>

              <div className="mt-4 space-y-2 text-sm text-ink-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-ink-400" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-ink-400" />
                  {selectedEvent.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-ink-400" />
                  {selectedEvent.time}
                </div>
              </div>

              {/* Safety waiver */}
              <div className="mt-6 rounded-xl border border-ink-100 bg-earth-50 p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waiverChecked}
                    onChange={(e) => setWaiverChecked(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-ink-300 text-terra-500 focus:ring-terra-400"
                  />
                  <span className="text-xs leading-relaxed text-ink-600">
                    I understand this event is scoped to{" "}
                    <strong>litter cleanup/plantation only</strong>. I will
                    follow all safety guidelines and event organizer instructions.
                    I accept the{" "}
                    <a href="#" className="underline text-terra-500">
                      digital safety waiver
                    </a>
                    .
                  </span>
                </label>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => {
                    setShowRSVPModal(false);
                    setWaiverChecked(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  loading={rsvpLoading}
                  disabled={!waiverChecked}
                  onClick={handleRSVP}
                >
                  Confirm RSVP
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
