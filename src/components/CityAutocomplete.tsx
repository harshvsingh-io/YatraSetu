"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Suggestion {
  name: string;
  state: string;
  lat: number;
  lng: number;
  displayName: string;
}

interface CityAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: Suggestion) => void;
  placeholder?: string;
  className?: string;
}

export default function CityAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Search any destination in India...",
  className,
}: CityAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      fetch(`/api/cities?q=${encodeURIComponent(value.trim())}`)
        .then((r) => r.json())
        .then((d) => {
          setSuggestions(d.suggestions || []);
          if (document.activeElement === inputRef.current) {
            setOpen(true);
          }
          setSelectedIndex(-1);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, value.trim().length === 0 ? 0 : 150);

    return () => clearTimeout(timer);
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.name);
    setOpen(false);
    onSelect(suggestion);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-400" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onKeyDown={handleKeyDown}
        className="h-14 w-full rounded-2xl border-2 border-ink-200 bg-white pl-12 pr-4 text-base font-medium text-ink-800 placeholder:text-ink-300 transition-all focus:border-terra-400 focus:ring-4 focus:ring-terra-100 focus:outline-none shadow-sm"
      />
      {loading && (
        <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-ink-400" />
      )}

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-earth-200 bg-white shadow-2xl"
          >
            <div className="bg-earth-50/80 px-4 py-2 border-b border-earth-100 flex items-center justify-between text-[11px] font-bold text-ink-500 uppercase tracking-wider">
              <span>{value.trim().length === 0 ? "Trending Indian Destinations" : "Suggestions for you"}</span>
              <span className="text-[10px] font-normal text-amber-700 font-mono">Instant Search</span>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-earth-100">
              {suggestions.map((s, i) => (
                <button
                  key={`${s.name}-${s.lat}`}
                  onClick={() => handleSelect(s)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors",
                    i === selectedIndex
                      ? "bg-amber-50"
                      : "hover:bg-earth-50/80"
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-ink-900 truncate">{s.name}</p>
                    {s.state && (
                      <p className="text-xs text-ink-500 truncate">{s.displayName || s.state}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold text-earth-500 bg-earth-100 px-2 py-0.5 rounded-md shrink-0">
                    Explore
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
