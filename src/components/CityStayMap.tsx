"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Building2, ExternalLink, Compass, ShieldCheck } from "lucide-react";

interface HotelPin {
  id: string | number;
  name: string;
  rating: number;
  type: string;
  address: string;
  priceRange: string;
  priceNum: number;
  lat: number;
  lng: number;
  photo: string;
  amenities: string[];
}

interface CityStayMapProps {
  city: string;
  hotels: HotelPin[];
  onSelectHotel: (hotel: HotelPin) => void;
}

export default function CityStayMap({ city, hotels, onSelectHotel }: CityStayMapProps) {
  const [selectedPin, setSelectedPin] = useState<HotelPin | null>(hotels[0] || null);

  // Compute bounding box
  const lats = hotels.map((h) => h.lat).filter(Boolean);
  const lngs = hotels.map((h) => h.lng).filter(Boolean);

  const minLat = lats.length > 0 ? Math.min(...lats) : 15.0;
  const maxLat = lats.length > 0 ? Math.max(...lats) : 16.0;
  const minLng = lngs.length > 0 ? Math.min(...lngs) : 73.0;
  const maxLng = lngs.length > 0 ? Math.max(...lngs) : 74.5;

  const latSpan = maxLat - minLat || 0.1;
  const lngSpan = maxLng - minLng || 0.1;

  // Convert lat/lng to percentage coordinates
  const getCoords = (lat: number, lng: number, idx: number) => {
    // If coordinates are identical or zero, spread them deterministically
    if (latSpan === 0.1 && lngSpan === 0.1) {
      const angles = [30, 90, 150, 210, 270, 330];
      const angle = (angles[idx % angles.length] * Math.PI) / 180;
      const radius = 25 + (idx % 2) * 10;
      return {
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle),
      };
    }

    const x = 15 + ((lng - minLng) / lngSpan) * 70;
    const y = 85 - ((lat - minLat) / latSpan) * 70;
    return {
      x: Math.min(Math.max(x, 10), 90),
      y: Math.min(Math.max(y, 15), 85),
    };
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-earth-200 bg-earth-900/5 shadow-inner">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-earth-200/80 bg-white/95 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-700">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-ink-900">
              Interactive Stay Map: {city}
            </h4>
            <p className="text-[10px] text-ink-500">
              {hotels.length} verified partner stays & eco-lodges
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-sage-50 px-2 py-0.5 text-[10px] font-bold text-sage-700">
            <ShieldCheck className="h-3 w-3" />
            Verified Eco-Audited
          </span>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative h-[380px] w-full bg-[#f6f5f0] overflow-hidden">
        {/* Subtle grid pattern resembling topo map */}
        <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="city-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2c4c38" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#city-grid)" />
          {/* Topo style contour curves */}
          <path d="M 0 100 Q 200 40 400 120 T 800 80" fill="none" stroke="#2c4c38" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 0 250 Q 250 180 500 290 T 1000 220" fill="none" stroke="#2c4c38" strokeWidth="1" strokeDasharray="4 4" />
        </svg>

        {/* City Central Badge */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center opacity-30">
          <p className="font-display text-4xl font-black uppercase tracking-widest text-ink-800">
            {city}
          </p>
          <p className="text-xs font-semibold text-ink-600">Restoration & Tourism Hub</p>
        </div>

        {/* Hotel Markers */}
        {hotels.map((hotel, idx) => {
          const { x, y } = getCoords(hotel.lat, hotel.lng, idx);
          const isSelected = selectedPin?.id === hotel.id;

          return (
            <motion.div
              key={hotel.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              style={{ left: `${x}%`, top: `${y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setSelectedPin(hotel)}
                className={`group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-md transition-all ${
                  isSelected
                    ? "bg-amber-600 text-white ring-4 ring-amber-300 scale-110 z-30"
                    : "bg-white text-ink-900 hover:bg-earth-50 hover:scale-105"
                }`}
              >
                <Building2 className={`h-3.5 w-3.5 ${isSelected ? "text-white" : "text-amber-600"}`} />
                <span>{hotel.priceRange.split("/")[0]}</span>
              </button>
            </motion.div>
          );
        })}

        {/* Selected Hotel Floating Card */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 rounded-2xl border border-earth-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md"
            >
              <div className="flex gap-3">
                <img
                  src={selectedPin.photo}
                  alt={selectedPin.name}
                  className="h-20 w-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                      {selectedPin.type}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                      <span>{selectedPin.rating}</span>
                    </div>
                  </div>
                  <h5 className="mt-1 text-xs font-bold text-ink-900 truncate">
                    {selectedPin.name}
                  </h5>
                  <p className="text-[11px] text-ink-500 truncate">
                    {selectedPin.address}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-ink-900">
                      {selectedPin.priceRange}
                    </span>
                    <button
                      onClick={() => onSelectHotel(selectedPin)}
                      className="rounded-lg bg-ink-900 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-amber-600 transition-colors"
                    >
                      Book Stay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
