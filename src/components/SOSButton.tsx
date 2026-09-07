"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, PhoneCall, ShieldAlert, X, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export default function SOSButton() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  const emergencyContacts = [
    { title: "National Emergency Helpline", number: "112", desc: "Police, Fire, Ambulance", color: "bg-red-50 text-red-700 border-red-200" },
    { title: "Women Helpline (India)", number: "1091", desc: "24x7 Safety & Distress Support", color: "bg-purple-50 text-purple-700 border-purple-200" },
    { title: "Ministry of Tourism Helpline", number: "1363", desc: "Multilingual Tourist Assistance", color: "bg-amber-50 text-amber-800 border-amber-200" },
    { title: "Railway Helpline (Rail Madad)", number: "139", desc: "Train security & medical emergency", color: "bg-blue-50 text-blue-700 border-blue-200" },
  ];

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          const msg = `EMERGENCY ALERT: I am traveler ${user?.name || "YatraSetu User"}. My current location is https://maps.google.com/?q=${lat},${lng}. Please assist immediately.`;
          window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
          setLocationSent(true);
          setTimeout(() => setLocationSent(false), 4000);
        },
        () => {
          const msg = `EMERGENCY ALERT: I am traveler ${user?.name || "YatraSetu User"}. I need emergency assistance.`;
          window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
          setLocationSent(true);
          setTimeout(() => setLocationSent(false), 4000);
        }
      );
    }
  };

  return (
    <>
      {/* Persistent SOS Floating Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/30 transition-all duration-300 hover:bg-red-700"
          aria-label="Emergency SOS Assistance"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white"></span>
          </span>
          <AlertTriangle className="h-4 w-4" />
          <span>SOS Help</span>
        </motion.button>
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-red-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-earth-200">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink-900">Emergency & Traveler Safety</h3>
                    <p className="text-xs text-ink-500">Government of India & Local Response Channels</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 text-ink-400 hover:bg-earth-100 hover:text-ink-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Verified Stays & Helplines */}
              <div className="mt-4 space-y-2.5">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number}`}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all hover:shadow-md ${contact.color}`}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">{contact.title}</p>
                      <p className="text-[11px] opacity-80 mt-0.5">{contact.desc}</p>
                    </div>
                    <div className="flex items-center gap-2 font-display text-base font-bold bg-white/80 px-3 py-1.5 rounded-xl">
                      <PhoneCall className="h-4 w-4" />
                      {contact.number}
                    </div>
                  </a>
                ))}
              </div>

              {/* Geo-location Broadcast */}
              <div className="mt-5 rounded-2xl bg-earth-100/70 p-4 border border-earth-200">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-terra-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-ink-900">Broadcast Live GPS Location</p>
                    <p className="text-[11px] text-ink-500 mt-0.5 leading-relaxed">
                      Sends your precise GPS coordinates with an SOS dispatch message to your trusted emergency contacts via WhatsApp / SMS.
                    </p>
                    <button
                      onClick={handleShareLocation}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2 text-xs font-bold text-white hover:bg-ink-800 active:scale-95 transition-all"
                    >
                      {locationSent ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-sage-400" /> Location Dispatched!
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" /> Share Location Now
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <p className="mt-4 text-center text-[10px] text-ink-400">
                SIH PS-Id SIH26202 · Verified Tourist Safety Network · YatraSetu
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
