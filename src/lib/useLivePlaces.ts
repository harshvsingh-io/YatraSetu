"use client";

import { useState, useEffect } from "react";

interface PlaceResult {
  id: string;
  name: string;
  address: string;
  rating: number;
  totalRatings: number;
  priceLevel: number;
  location: { lat: number; lng: number };
  photos: string[];
  isOpen: boolean;
  types: string[];
}

const fallbackPlaces: PlaceResult[] = [
  {
    id: "1",
    name: "The Fern Resort & Spa",
    address: "Calangute, Goa",
    rating: 4.5,
    totalRatings: 2340,
    priceLevel: 3,
    location: { lat: 15.5449, lng: 73.7551 },
    photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "spa", "point_of_interest"],
  },
  {
    id: "2",
    name: "Casa Susegad",
    address: "Loutolim, Goa",
    rating: 4.8,
    totalRatings: 567,
    priceLevel: 4,
    location: { lat: 15.3232, lng: 73.9664 },
    photos: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "point_of_interest"],
  },
  {
    id: "3",
    name: "ITC Grand Goa",
    address: "Arossim, Goa",
    rating: 4.7,
    totalRatings: 3120,
    priceLevel: 4,
    location: { lat: 15.3850, lng: 73.8890 },
    photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "spa", "point_of_interest"],
  },
  {
    id: "4",
    name: "The Postcard Moira",
    address: "Moira, Goa",
    rating: 4.6,
    totalRatings: 892,
    priceLevel: 3,
    location: { lat: 15.5833, lng: 73.8667 },
    photos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "point_of_interest"],
  },
  {
    id: "5",
    name: "Alila Diwa Goa",
    address: "Majorda, Goa",
    rating: 4.4,
    totalRatings: 1876,
    priceLevel: 4,
    location: { lat: 15.3500, lng: 73.8833 },
    photos: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "spa", "point_of_interest"],
  },
  {
    id: "6",
    name: "Bogaloo Homestay",
    address: "Arambol, Goa",
    rating: 4.3,
    totalRatings: 345,
    priceLevel: 2,
    location: { lat: 15.6833, lng: 73.7333 },
    photos: ["https://images.unsplash.com/photo-1596394516093501ba68a0ba6?w=600&h=400&fit=crop"],
    isOpen: true,
    types: ["lodging", "point_of_interest"],
  },
];

export function useLivePlaces(query: string, type: string = "lodging") {
  const [places, setPlaces] = useState<PlaceResult[]>(fallbackPlaces);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPlaces() {
      setLoading(true);
      try {
        const res = await fetch(`/api/places?query=${encodeURIComponent(query)}&type=${type}`);
        const data = await res.json();

        if (!cancelled && !data.fallback && data.results?.length) {
          setPlaces(data.results);
          setIsLive(true);
        }
      } catch {
        // Use fallback silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPlaces();
    return () => { cancelled = true; };
  }, [query, type]);

  return { places, loading, isLive, fallback: fallbackPlaces };
}
