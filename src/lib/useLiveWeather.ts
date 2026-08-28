"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  current: {
    temp: number;
    feelsLike: number;
    condition: string;
    description: string;
    icon: string;
    humidity: number;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
  }>;
}

const fallbackWeather: WeatherData = {
  current: {
    temp: 31,
    feelsLike: 35,
    condition: "Partly Cloudy",
    description: "scattered clouds",
    icon: "02d",
    humidity: 72,
    windSpeed: 4.2,
  },
  forecast: [
    { date: "Mon", temp: 31, condition: "Clouds", icon: "02d", humidity: 70 },
    { date: "Tue", temp: 29, condition: "Rain", icon: "10d", humidity: 85 },
    { date: "Wed", temp: 32, condition: "Clear", icon: "01d", humidity: 65 },
  ],
};

export function useLiveWeather(city: string) {
  const [weather, setWeather] = useState<WeatherData>(fallbackWeather);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      setLoading(true);
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        if (!cancelled && !data.fallback && data.current) {
          setWeather(data);
          setIsLive(true);
        }
      } catch {
        // Use fallback silently
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWeather();
    return () => { cancelled = true; };
  }, [city]);

  return { weather, loading, isLive, fallback: fallbackWeather };
}
