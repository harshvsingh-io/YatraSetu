import { NextRequest, NextResponse } from "next/server";
import { DESTINATIONS, ALTERNATIVES, getCrowdLevel } from "@/lib/seed-data";
import { createClient } from "@supabase/supabase-js";

// Optional Supabase connection with graceful fallback
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("placeholder")) return null;
  try {
    return createClient(url, key);
  } catch {
    return null;
  }
}

// Dynamic crowd score calculation model
function computeDynamicCrowdScore(d: {
  bookings_7d: number;
  bookings_30d?: number;
  weather_flag?: string;
  category?: string;
}) {
  const maxCapacity = 1000;
  const bookingLoad = Math.min(60, Math.round(((d.bookings_7d || 50) / maxCapacity) * 60));

  const weatherPenalty =
    d.weather_flag === "avoid" ? 18 : d.weather_flag === "caution" ? 10 : 4;

  const currentMonth = new Date().getMonth();
  let seasonFactor = 12;
  if (d.category === "hill_station") {
    seasonFactor = [3, 4, 5, 11, 0].includes(currentMonth) ? 20 : 10;
  } else if (d.category === "beach") {
    seasonFactor = [10, 11, 0, 1].includes(currentMonth) ? 20 : 8;
  } else if (d.category === "spiritual") {
    seasonFactor = 14;
  }

  const crowd_score = Math.min(100, Math.max(6, bookingLoad + weatherPenalty + seasonFactor));

  return {
    crowd_score,
    breakdown: {
      booking_load: bookingLoad,
      weather_impact: weatherPenalty,
      season_modifier: seasonFactor,
      formula: "bookings_7d (60% weight) + weather index (20%) + seasonal model (20%)",
      dataSource: "Simulated 7-Day Inflow Model + Open-Meteo Flag",
    },
  };
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const type = req.nextUrl.searchParams.get("type"); // "picks" for underrated

  let destinations = [...DESTINATIONS];

  // Try fetching dynamic metrics from Supabase if configured
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from("destination_metrics").select("*");
      if (!error && data && data.length > 0) {
        destinations = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          state: item.state,
          category: item.category,
          lat: Number(item.lat),
          lng: Number(item.lng),
          bookings_7d: Number(item.bookings_7d || 50),
          bookings_30d: Number(item.bookings_30d || 200),
          weather_flag: item.weather_flag || "clear",
          crowd_score: Number(item.crowd_score || 50),
        }));
      }
    } catch {
      // Gracefully fall back to seed data
    }
  }

  // Attach computed crowd scores and breakdowns to destinations
  const enrichedDestinations = destinations.map((d) => {
    const { crowd_score, breakdown } = computeDynamicCrowdScore(d);
    return {
      ...d,
      crowd_score,
      crowd_level: getCrowdLevel(crowd_score),
      breakdown,
    };
  });

  // Underrated picks — lowest crowd scores
  if (type === "picks") {
    const picks = [...enrichedDestinations]
      .sort((a, b) => a.crowd_score - b.crowd_score)
      .slice(0, 6);
    return NextResponse.json({ picks });
  }

  // Search for a destination and get its metrics + alternatives
  if (q) {
    const dest = enrichedDestinations.find(
      (d) => d.name.toLowerCase() === q.toLowerCase()
    );
    if (!dest) {
      return NextResponse.json({ destination: null, alternatives: [] });
    }

    const alts = ALTERNATIVES
      .filter((a) => a.source_destination_id === dest.id)
      .sort((a, b) => a.rank - b.rank)
      .map((a) => {
        const altDest = enrichedDestinations.find((d) => d.id === a.alt_destination_id);
        return altDest
          ? {
              ...altDest,
              similarity_reason: a.similarity_reason,
            }
          : null;
      })
      .filter(Boolean);

    return NextResponse.json({
      destination: dest,
      alternatives: alts,
    });
  }

  // Return all destinations
  return NextResponse.json({ destinations: enrichedDestinations });
}

