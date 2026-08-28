import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query") || "hotels in Goa";
  const type = searchParams.get("type") || "lodging";

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured", fallback: true }, { status: 503 });
  }

  try {
    // Use Google Places Text Search API
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&type=${type}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK") {
      return NextResponse.json({ error: data.status, fallback: true }, { status: 502 });
    }

    const results = data.results.map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      rating: place.rating,
      totalRatings: place.user_ratings_total,
      priceLevel: place.price_level,
      location: place.geometry?.location,
      photos: place.photos?.slice(0, 3).map((p: any) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${p.photo_reference}&key=${apiKey}`
      ) || [],
      isOpen: place.opening_hours?.open_now,
      types: place.types,
    }));

    return NextResponse.json({ results, status: "live" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch", fallback: true }, { status: 500 });
  }
}
