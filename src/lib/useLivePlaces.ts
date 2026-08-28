"use client";

import { useState, useEffect, useCallback } from "react";

interface Place {
  id: string;
  name: string;
  rating: number;
  type: string;
  address: string;
  lat?: number;
  lng?: number;
  photo: string;
  reviews?: { author: string; rating: number; text: string }[];
  priceLevel?: number;
  phone?: string;
}

interface Attraction {
  id: string;
  name: string;
  rating: number;
  type: string;
  address: string;
  distance: string;
}

interface PlacesResult {
  places: Place[];
  attractions: Attraction[];
  source: string;
  query: string;
}

const PLACEHOLDER_IMAGES: Record<string, string> = {
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
  transport: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
  attraction: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop",
  default: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
};

export function useLivePlaces(query: string) {
  const [data, setData] = useState<PlacesResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaces = useCallback(async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/places?q=${encodeURIComponent(q)}&type=all`);
      if (!res.ok) throw new Error("Failed to fetch places");
      const json = await res.json();

      // Ensure every place has a photo
      const places = (json.places || []).map((p: Place) => ({
        ...p,
        photo: p.photo || PLACEHOLDER_IMAGES[p.type] || PLACEHOLDER_IMAGES.default,
      }));

      setData({
        ...json,
        places,
        attractions: json.attractions || [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      // Use fallback seed data
      setData(getFallbackData(q));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) fetchPlaces(query);
    }, 500); // debounce 500ms
    return () => clearTimeout(timer);
  }, [query, fetchPlaces]);

  return { data, loading, error, refetch: () => fetchPlaces(query) };
}

function getFallbackData(query: string): PlacesResult {
  return {
    source: "fallback",
    query,
    places: [
      {
        id: "fb-1",
        name: `Stay Inn ${query}`,
        rating: 4.2,
        type: "hotel",
        address: `${query}, India`,
        photo: PLACEHOLDER_IMAGES.hotel,
        priceLevel: 2,
      },
      {
        id: "fb-2",
        name: `Heritage Resort ${query}`,
        rating: 4.5,
        type: "hotel",
        address: `Near City Center, ${query}`,
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
        priceLevel: 3,
      },
      {
        id: "fb-3",
        name: `Local Transport`,
        rating: 4.0,
        type: "transport",
        address: `${query}`,
        photo: PLACEHOLDER_IMAGES.transport,
      },
    ],
    attractions: [
      {
        id: "fb-a1",
        name: `${query} Fort`,
        rating: 4.4,
        type: "heritage",
        address: `${query}, India`,
        distance: "2 km",
      },
      {
        id: "fb-a2",
        name: `${query} Lake`,
        rating: 4.2,
        type: "nature",
        address: `${query}, India`,
        distance: "5 km",
      },
      {
        id: "fb-a3",
        name: `${query} Market`,
        rating: 4.0,
        type: "market",
        address: `${query} Center`,
        distance: "1 km",
      },
    ],
  };
}
