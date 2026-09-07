import { NextRequest, NextResponse } from "next/server";
import { DESTINATIONS, ALTERNATIVES, getCrowdLevel } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const type = req.nextUrl.searchParams.get("type"); // "picks" for underrated

  // Underrated picks — lowest crowd scores
  if (type === "picks") {
    const picks = [...DESTINATIONS]
      .sort((a, b) => a.crowd_score - b.crowd_score)
      .slice(0, 6)
      .map((d) => ({
        ...d,
        crowd_level: getCrowdLevel(d.crowd_score),
      }));
    return NextResponse.json({ picks });
  }

  // Search for a destination and get its metrics + alternatives
  if (q) {
    const dest = DESTINATIONS.find(
      (d) => d.name.toLowerCase() === q.toLowerCase()
    );
    if (!dest) {
      return NextResponse.json({ destination: null, alternatives: [] });
    }

    const alts = ALTERNATIVES
      .filter((a) => a.source_destination_id === dest.id)
      .sort((a, b) => a.rank - b.rank)
      .map((a) => {
        const altDest = DESTINATIONS.find((d) => d.id === a.alt_destination_id);
        return altDest
          ? {
              ...altDest,
              crowd_level: getCrowdLevel(altDest.crowd_score),
              similarity_reason: a.similarity_reason,
            }
          : null;
      })
      .filter(Boolean);

    return NextResponse.json({
      destination: { ...dest, crowd_level: getCrowdLevel(dest.crowd_score) },
      alternatives: alts,
    });
  }

  // Return all destinations
  const all = DESTINATIONS.map((d) => ({
    ...d,
    crowd_level: getCrowdLevel(d.crowd_score),
  }));
  return NextResponse.json({ destinations: all });
}
