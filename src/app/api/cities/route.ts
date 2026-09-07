import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  if (q.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const params = new URLSearchParams({
      q: `${q} India`,
      format: "json",
      countrycodes: "in",
      limit: "8",
      addressdetails: "1",
    });

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
      {
        headers: {
          "User-Agent": "YatraSetu/2.0 (Smart India Hackathon)",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const results = await res.json();

    // Filter to city/town/village level and deduplicate by name
    const seen = new Set<string>();
    const suggestions = results
      .filter((r: { type: string; class: string }) => {
        const type = r.type || "";
        const cls = r.class || "";
        return (
          ["city", "town", "village", "administrative"].includes(type) ||
          cls === "place"
        );
      })
      .map((r: { display_name: string; lat: string; lon: string; name: string }) => {
        const parts = r.display_name.split(", ");
        const city = parts[0];
        const state = parts.length > 2 ? parts[1] : "";
        return {
          name: city,
          state: state,
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
          displayName: `${city}${state ? ", " + state : ""}`,
        };
      })
      .filter((s: { name: string }) => {
        const key = s.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .slice(0, 6);

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
