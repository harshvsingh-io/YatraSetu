"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Camera,
  MapPin,
  Trash2,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  UploadCloud,
  Navigation,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";

interface ReportLitterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string;
}

const wasteCategories = [
  { id: "plastic", label: "Plastic Bottles & Bags", icon: "🧴" },
  { id: "camping", label: "Camping & Trekking Gear", icon: "⛺" },
  { id: "glass", label: "Broken Glass / Alcohol Bottles", icon: "🍾" },
  { id: "industrial", label: "Construction / Heavy Debris", icon: "🧱" },
  { id: "wrappers", label: "Snack & Food Packaging", icon: "🍫" },
];

export default function ReportLitterModal({
  isOpen,
  onClose,
  defaultLocation = "",
}: ReportLitterModalProps) {
  const { user, addKarma } = useAuth();
  const { toast } = useToast();

  const [locationName, setLocationName] = useState(defaultLocation);
  const [coordinates, setCoordinates] = useState<string>("");
  const [fetchingGps, setFetchingGps] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("plastic");
  const [volume, setVolume] = useState<"1-5kg" | "5-15kg" | "15kg+">("1-5kg");
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&h=400&fit=crop"
  );
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);

  const fetchCurrentLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({
        title: "GPS Not Supported",
        message: "Your browser does not support Geolocation.",
      });
      return;
    }

    setFetchingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lng = pos.coords.longitude.toFixed(4);
        setCoordinates(`${lat}° N, ${lng}° E`);
        setFetchingGps(false);
        toast({
          title: "GPS Geofence Captured",
          message: `Coordinates verified: ${lat}° N, ${lng}° E`,
        });
      },
      (err) => {
        // Simulated fallback coordinates for remote trail testing
        setCoordinates("32.2396° N, 77.1887° E (Himalayan Trail GPS)");
        setFetchingGps(false);
        toast({
          title: "Trail Geolocation Active",
          message: "Simulated GPS coordinates locked.",
        });
      },
      { timeout: 5000 }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationName) {
      toast({
        title: "Location Required",
        message: "Please enter the trail or landmark name.",
      });
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      const newTicket = `SW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(newTicket);
      setSubmitting(false);

      // Award +50 karma
      addKarma(50);

      // Save report in local storage for community feed
      try {
        const existing = JSON.parse(localStorage.getItem("yatrasetu_litter_reports") || "[]");
        existing.unshift({
          id: newTicket,
          location: locationName,
          coordinates: coordinates || "32.2396° N, 77.1887° E",
          category: selectedCategory,
          volume,
          reporter: user?.name || "Mindful Volunteer",
          date: new Date().toISOString().split("T")[0],
          status: "Assigned to NSS Unit",
          photo: photoPreview,
        });
        localStorage.setItem("yatrasetu_litter_reports", JSON.stringify(existing));
      } catch (e) {
        // ignore
      }

      toast({
        title: "Cleanup Ticket Dispatched!",
        message: `Report ${newTicket} assigned to local NSS & Volunteer crew. +50 Green Karma awarded!`,
      });
    }, 1200);
  };

  const handleReset = () => {
    setTicketId(null);
    setLocationName("");
    setCoordinates("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden border border-earth-200 my-8"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-ink-900 via-amber-950 to-terra-950 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-glow-amber">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      Swachh Yatra
                    </span>
                    <span className="rounded-md bg-sage-500/30 px-2 py-0.2 text-[10px] font-bold text-sage-200">
                      +50 Karma Reward
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Citizen Trail Litter Reporter
                  </h3>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="rounded-xl p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {ticketId ? (
              /* Success confirmation state */
              <div className="p-6 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage-50 text-sage-600 border border-sage-200 mb-4"
                >
                  <CheckCircle2 className="h-9 w-9" />
                </motion.div>

                <h4 className="font-display text-2xl font-bold text-ink-900">
                  Ticket Generated!
                </h4>
                <p className="text-xs text-ink-500 mt-1 max-w-xs mx-auto">
                  Your geo-tagged report has been verified and dispatched to the nearest university NSS cleanup unit.
                </p>

                <div className="mt-5 rounded-2xl border border-earth-200 bg-earth-50 p-4 text-left">
                  <div className="flex justify-between items-center text-xs border-b border-earth-200/80 pb-2">
                    <span className="text-ink-500">Ticket Reference:</span>
                    <span className="font-mono font-bold text-ink-900">{ticketId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-earth-200/80 py-2">
                    <span className="text-ink-500">Trail Location:</span>
                    <span className="font-semibold text-ink-800 truncate max-w-[200px]">{locationName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-2">
                    <span className="text-ink-500">Karma Earned:</span>
                    <span className="font-bold text-amber-700">+50 Green Karma</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 rounded-2xl bg-ink-900 py-3 text-xs font-bold text-white hover:bg-ink-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Location Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                    Trail / Landmark Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Parvati Riverbank Trail, Kasol"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="w-full rounded-2xl border border-earth-300 bg-earth-50/50 pl-10 pr-4 py-2.5 text-xs text-ink-900 focus:border-amber-400 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* GPS Coordinates Fetcher */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                    GPS Coordinates (Geofencing Verification)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      placeholder="Coordinates not captured yet..."
                      value={coordinates}
                      className="flex-1 rounded-2xl border border-earth-200 bg-earth-100/60 px-4 py-2 text-xs font-mono text-ink-800"
                    />
                    <button
                      type="button"
                      onClick={fetchCurrentLocation}
                      disabled={fetchingGps}
                      className="flex items-center gap-1.5 rounded-2xl border border-amber-300 bg-amber-50 px-3.5 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors disabled:opacity-50"
                    >
                      {fetchingGps ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Navigation className="h-3.5 w-3.5 text-amber-700" />
                      )}
                      <span>{fetchingGps ? "Acquiring..." : "Auto GPS"}</span>
                    </button>
                  </div>
                </div>

                {/* Waste Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                    Waste Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {wasteCategories.map((cat) => (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-2 rounded-xl p-2 text-left text-xs transition-all border ${
                          selectedCategory === cat.id
                            ? "border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-1 ring-amber-400"
                            : "border-earth-200 bg-white text-ink-600 hover:bg-earth-50"
                        }`}
                      >
                        <span className="text-base">{cat.icon}</span>
                        <span className="text-[11px] leading-tight truncate">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Estimated Volume */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                    Estimated Accumulation Volume
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["1-5kg", "5-15kg", "15kg+"] as const).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setVolume(v)}
                        className={`rounded-xl py-2 text-xs font-bold transition-all border ${
                          volume === v
                            ? "border-amber-500 bg-ink-900 text-white"
                            : "border-earth-200 bg-white text-ink-700 hover:bg-earth-50"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Snapshot Preview */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-700 mb-1.5">
                    Photo Proof (Camera Snapshot)
                  </label>
                  <div className="relative rounded-2xl border-2 border-dashed border-earth-300 p-2 text-center overflow-hidden group">
                    {photoPreview ? (
                      <div className="relative h-28 w-full rounded-xl overflow-hidden">
                        <img
                          src={photoPreview}
                          alt="Trail litter preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-ink-900 shadow-md">
                            Change Photo
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-4 cursor-pointer">
                        <UploadCloud className="h-7 w-7 text-ink-400 mb-1" />
                        <span className="text-xs font-bold text-ink-700">Upload or Snap Trail Photo</span>
                        <span className="text-[10px] text-ink-400">JPG, PNG up to 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-terra-500 py-3 text-xs font-bold text-white shadow-lg shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Dispatching Cleanup Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Dispatch Cleanup Ticket & Claim +50 Karma</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-ink-400 mt-2">
                    Verified through NSS Volunteer Geo-Geofencing Protocol
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
