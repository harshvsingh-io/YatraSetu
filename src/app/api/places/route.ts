import { NextRequest, NextResponse } from "next/server";

// Nominatim (OpenStreetMap) — free, no API key needed
// Rate limit: max 1 request/second (be nice to the service)
const NOMINATIM_BASE = "https://nominatim.openstreetmap.org";
const USER_AGENT = "YatraSetu/1.0 (Smart India Hackathon)";

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  category: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  importance: number;
  icon?: string;
  namedetails?: { name?: string; [key: string]: unknown };
}

async function searchNominatim(
  query: string,
  limit: number = 10,
  viewbox?: string
): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: "json",
    limit: String(limit),
    addressdetails: "1",
    extratags: "1",
    namedetails: "1",
  });
  if (viewbox) params.set("viewbox", viewbox);
  params.set("bounded", "0");

  const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) return [];
  return res.json();
}

// Seed data fallback — popular Indian destinations
const SEED_DESTINATIONS: Record<
  string,
  {
    places: Array<{
      id: string;
      name: string;
      rating: number;
      type: string;
      address: string;
      lat: number;
      lng: number;
      photo: string;
    }>;
    attractions: Array<{
      id: string;
      name: string;
      rating: number;
      type: string;
      address: string;
      distance: string;
    }>;
  }
> = {
  goa: {
    places: [
      {
        id: "g1",
        name: "Taj Fort Aguada Resort",
        rating: 4.5,
        type: "hotel",
        address: "Sinquerim, Goa",
        lat: 15.4926,
        lng: 73.7741,
        photo: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400",
      },
      {
        id: "g2",
        name: "ITC Grand Goa",
        rating: 4.6,
        type: "hotel",
        address: "Arossim, Goa",
        lat: 15.3909,
        lng: 73.8896,
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
      },
      {
        id: "g3",
        name: "The Park Calangute",
        rating: 4.2,
        type: "hotel",
        address: "Calangute, Goa",
        lat: 15.5449,
        lng: 73.7551,
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      },
      {
        id: "g4",
        name: "Ola Ride Airport",
        rating: 4.0,
        type: "transport",
        address: "Dabolim Airport, Goa",
        lat: 15.3809,
        lng: 73.8314,
        photo: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400",
      },
    ],
    attractions: [
      { id: "a1", name: "Baga Beach", rating: 4.3, type: "beach", address: "Baga, North Goa", distance: "3.2 km" },
      { id: "a2", name: "Basilica of Bom Jesus", rating: 4.5, type: "heritage", address: "Old Goa", distance: "12 km" },
      { id: "a3", name: "Dudhsagar Falls", rating: 4.6, type: "nature", address: "Sanguem, Goa", distance: "58 km" },
    ],
  },
  jaipur: {
    places: [
      { id: "j1", name: "Rambagh Palace", rating: 4.7, type: "hotel", address: "Bhawani Singh Road, Jaipur", lat: 26.8931, lng: 75.8073, photo: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400" },
      { id: "j2", name: "ITC Rajputana", rating: 4.3, type: "hotel", address: "Palace Road, Jaipur", lat: 26.9228, lng: 75.7877, photo: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400" },
      { id: "j3", name: "Uber Jaipur", rating: 4.1, type: "transport", address: "Jaipur", lat: 26.9124, lng: 75.7873, photo: "https://images.unsplash.com/photo-1549317661-bd32c8ce0abb?w=400" },
    ],
    attractions: [
      { id: "b1", name: "Amber Fort", rating: 4.6, type: "heritage", address: "Amer, Jaipur", distance: "11 km" },
      { id: "b2", name: "Hawa Mahal", rating: 4.4, type: "heritage", address: "Badi Choupad, Jaipur", distance: "2 km" },
      { id: "b3", name: "Nahargarh Fort", rating: 4.3, type: "heritage", address: "Jaipur-Delhi Highway", distance: "7 km" },
    ],
  },
  kerala: {
    places: [
      { id: "k1", name: "Kumarakom Lake Resort", rating: 4.6, type: "hotel", address: "Kumarakom, Kerala", lat: 9.5972, lng: 76.429, photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
      { id: "k2", name: "Leela Kerala", rating: 4.7, type: "hotel", address: "Kovalam, Kerala", lat: 8.3988, lng: 76.9782, photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" },
      { id: "k3", name: "Kerala RTC Bus", rating: 4.0, type: "transport", address: "Statewide", lat: 10.8505, lng: 76.2711, photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400" },
    ],
    attractions: [
      { id: "c1", name: "Alleppey Backwaters", rating: 4.5, type: "nature", address: "Alleppey, Kerala", distance: "8 km" },
      { id: "c2", name: "Munnar Tea Gardens", rating: 4.6, type: "nature", address: "Munnar, Idukki", distance: "110 km" },
      { id: "c3", name: "Fort Kochi", rating: 4.4, type: "heritage", address: "Kochi, Kerala", distance: "45 km" },
    ],
  },
  varanasi: {
    places: [
      { id: "v1", name: "Taj Nadesar Palace", rating: 4.5, type: "hotel", address: "Nadesar Palace Grounds, Varanasi", lat: 25.3218, lng: 83.0096, photo: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400" },
      { id: "v2", name: "Suryaudan Haveli", rating: 4.3, type: "hotel", address: "Assi Ghat, Varanasi", lat: 25.3356, lng: 83.0128, photo: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400" },
    ],
    attractions: [
      { id: "d1", name: "Dashashwamedh Ghat", rating: 4.7, type: "heritage", address: "Varanasi", distance: "0 km" },
      { id: "d2", name: "Kashi Vishwanath Temple", rating: 4.8, type: "heritage", address: "Varanasi", distance: "1 km" },
      { id: "d3", name: "Sarnath", rating: 4.5, type: "heritage", address: "Sarnath, Varanasi", distance: "10 km" },
    ],
  },
  ladakh: {
    places: [
      { id: "l1", name: "The Grand Dragon", rating: 4.4, type: "hotel", address: "Skara, Leh", lat: 34.1642, lng: 77.5854, photo: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=400" },
      { id: "l2", name: "Zostan Leh", rating: 4.2, type: "hotel", address: "Leh, Ladakh", lat: 34.1526, lng: 77.5771, photo: "https://images.unsplash.com/photo-1614328909298-22e45f9d6084?w=400" },
    ],
    attractions: [
      { id: "e1", name: "Pangong Lake", rating: 4.8, type: "nature", address: "Pangong Tso", distance: "160 km" },
      { id: "e2", name: "Nubra Valley", rating: 4.6, type: "nature", address: "Nubra", distance: "120 km" },
      { id: "e3", name: "Magnetic Hill", rating: 4.2, type: "nature", address: "Leh-Kargil Highway", distance: "30 km" },
    ],
  },
};

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "";
  const type = req.nextUrl.searchParams.get("type") || "all"; // hotel | attraction | transport | all

  if (!q) {
    return NextResponse.json({ error: "Query required" }, { status: 400 });
  }

  const queryLower = q.toLowerCase().trim();

  // Try Nominatim first (free, no API key)
  try {
    const viewbox = "68.0,8.0,97.5,37.0"; // India bounding box
    const nominatimResults = await searchNominatim(q, 15, viewbox);

    if (nominatimResults.length > 0) {
      // Transform Nominatim results into our format
      const places = nominatimResults
        .filter((r) =>
          ["hotel", "hostel", "motel", "restaurant", "cafe", "bar", "transport", "taxi"].includes(r.type) ||
          ["tourism", "amenity", "shop"].includes(r.category)
        )
        .slice(0, 8)
        .map((r) => ({
          id: `nominatim-${r.place_id}`,
          name: r.namedetails?.name || r.display_name.split(",")[0],
          rating: 3.5 + Math.random() * 1.5,
          type: r.type === "hotel" || r.type === "hostel" ? "hotel" : r.type,
          address: r.display_name.split(",").slice(0, 3).join(","),
          lat: parseFloat(r.lat),
          lng: parseFloat(r.lon),
          photo: "",
        }));

      const attractions = nominatimResults
        .filter((r) =>
          ["tourism", "attraction", "museum", "monument", "viewpoint", "park", "temple", "church", "mosque"].includes(r.type) ||
          r.category === "tourism" ||
          r.category === "historic"
        )
        .slice(0, 6)
        .map((r) => ({
          id: `attr-${r.place_id}`,
          name: r.namedetails?.name || r.display_name.split(",")[0],
          rating: 3.5 + Math.random() * 1.5,
          type: r.category === "historic" ? "heritage" : "attraction",
          address: r.display_name.split(",").slice(0, 3).join(","),
          distance: `${Math.floor(Math.random() * 20 + 1)} km`,
        }));

      if (places.length > 0 || attractions.length > 0) {
        return NextResponse.json({
          source: "openstreetmap",
          query: q,
          places: places.length > 0 ? places : undefined,
          attractions: attractions.length > 0 ? attractions : undefined,
        });
      }
    }
  } catch {
    // Nominatim failed, fall through to seed data
  }

  // Fallback to seed data
  const seedData = SEED_DESTINATIONS[queryLower];
  if (seedData) {
    return NextResponse.json({
      source: "seed",
      query: q,
      places: type === "all" || type === "hotel" || type === "transport" ? seedData.places : undefined,
      attractions: type === "all" || type === "attraction" ? seedData.attractions : undefined,
    });
  }

  // Generic seed for unknown destinations
  return NextResponse.json({
    source: "seed",
    query: q,
    places: [
      {
        id: "gen-1",
        name: `Top Stay in ${q}`,
        rating: 4.3,
        type: "hotel",
        address: `${q}, India`,
        lat: 20 + Math.random() * 10,
        lng: 75 + Math.random() * 10,
        photo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
      },
      {
        id: "gen-2",
        name: `Heritage Inn ${q}`,
        rating: 4.1,
        type: "hotel",
        address: `Near City Center, ${q}`,
        lat: 20 + Math.random() * 10,
        lng: 75 + Math.random() * 10,
        photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400",
      },
    ],
    attractions: [
      {
        id: "gen-a1",
        name: `${q} Fort`,
        rating: 4.4,
        type: "heritage",
        address: `${q}, India`,
        distance: "2 km",
      },
      {
        id: "gen-a2",
        name: `${q} Lake`,
        rating: 4.2,
        type: "nature",
        address: `${q}, India`,
        distance: "5 km",
      },
    ],
  });
}
