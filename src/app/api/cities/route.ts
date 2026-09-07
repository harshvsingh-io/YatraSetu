import { NextRequest, NextResponse } from "next/server";

interface DestinationItem {
  name: string;
  state: string;
  lat: number;
  lng: number;
  displayName: string;
  tags: string[];
}

const CURATED_DESTINATIONS: DestinationItem[] = [
  { name: "Goa", state: "Goa", lat: 15.2993, lng: 74.124, displayName: "Goa (North & South Beaches), Goa", tags: ["beach", "party", "heritage", "coastal"] },
  { name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, displayName: "Manali, Himachal Pradesh", tags: ["snow", "mountains", "trekking", "hill station"] },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, displayName: "Jaipur (Pink City), Rajasthan", tags: ["palaces", "forts", "heritage", "culture"] },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, displayName: "Varanasi (Kashi & Ghats), Uttar Pradesh", tags: ["ghats", "spiritual", "ganga", "temple"] },
  { name: "Kasol", state: "Himachal Pradesh", lat: 32.01, lng: 77.315, displayName: "Kasol (Parvati Valley), Himachal Pradesh", tags: ["valley", "treks", "riverside", "underrated", "nature"] },
  { name: "Chopta", state: "Uttarakhand", lat: 30.4853, lng: 79.1722, displayName: "Chopta & Tungnath, Uttarakhand", tags: ["meadow", "bugyal", "mini switzerland", "underrated", "trek"] },
  { name: "Hampi", state: "Karnataka", lat: 15.335, lng: 76.46, displayName: "Hampi (Vijayanagara UNESCO), Karnataka", tags: ["unesco", "ruins", "stone chariot", "heritage", "bouldering"] },
  { name: "Orchha", state: "Madhya Pradesh", lat: 25.3516, lng: 78.6424, displayName: "Orchha & Betwa Chattris, Madhya Pradesh", tags: ["cenotaphs", "palaces", "heritage", "underrated", "betwa"] },
  { name: "Gokarna", state: "Karnataka", lat: 14.5479, lng: 74.3188, displayName: "Gokarna (Kudle & Om Beach), Karnataka", tags: ["beach", "serene", "temple", "underrated"] },
  { name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595, displayName: "Munnar Tea Hills, Kerala", tags: ["tea", "fog", "western ghats", "green"] },
  { name: "Tirthan Valley", state: "Himachal Pradesh", lat: 31.642, lng: 77.348, displayName: "Tirthan Valley & GHNP, Himachal Pradesh", tags: ["national park", "trout", "river", "eco", "underrated"] },
  { name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, displayName: "Udaipur (City of Lakes), Rajasthan", tags: ["lakes", "palaces", "romantic", "rajasthan"] },
  { name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, displayName: "Rishikesh & Ganga Ghats, Uttarakhand", tags: ["yoga", "rafting", "ganga", "spiritual"] },
  { name: "Darjeeling", state: "West Bengal", lat: 27.041, lng: 88.2663, displayName: "Darjeeling & Kanchenjunga, West Bengal", tags: ["tea", "toy train", "himalayas", "views"] },
  { name: "Pondicherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, displayName: "Pondicherry (White Town), Puducherry", tags: ["french colony", "beaches", "auroville", "coastal"] },
  { name: "Leh Ladakh", state: "Ladakh", lat: 34.1526, lng: 77.5771, displayName: "Leh Ladakh (Pangong & Nubra), Ladakh", tags: ["high altitude", "monasteries", "desert mountain", "lakes"] },
  { name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, displayName: "Shimla & Kufri, Himachal Pradesh", tags: ["mall road", "british era", "hill station"] },
  { name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.695, displayName: "Ooty (Nilgiri Hills), Tamil Nadu", tags: ["tea gardens", "nilgiri", "botanical garden", "lake"] },
  { name: "Kodaikanal", state: "Tamil Nadu", lat: 10.2381, lng: 77.4892, displayName: "Kodaikanal (Princess of Hill Stations), Tamil Nadu", tags: ["mist", "pine forest", "lakes"] },
  { name: "Mussoorie", state: "Uttarakhand", lat: 30.4598, lng: 78.0644, displayName: "Mussoorie (Queen of Hills), Uttarakhand", tags: ["kempty falls", "mall road", "doon valley"] },
  { name: "Nainital", state: "Uttarakhand", lat: 29.3919, lng: 79.4542, displayName: "Nainital (Lake District), Uttarakhand", tags: ["naini lake", "boating", "himalayas"] },
  { name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933, displayName: "Shillong & Cherrapunji, Meghalaya", tags: ["waterfalls", "living root bridges", "clouds", "scotland of east"] },
  { name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065, displayName: "Gangtok & Tsomgo Lake, Sikkim", tags: ["monasteries", "kanchenjunga", "clean city"] },
  { name: "Wayanad", state: "Kerala", lat: 11.6854, lng: 76.132, displayName: "Wayanad Rainforests, Kerala", tags: ["waterfalls", "caves", "spices", "green"] },
  { name: "Alleppey", state: "Kerala", lat: 9.4981, lng: 76.3388, displayName: "Alleppey (Backwaters & Houseboats), Kerala", tags: ["backwaters", "houseboats", "canals", "venice of east"] },
  { name: "Coorg", state: "Karnataka", lat: 12.3375, lng: 75.8069, displayName: "Coorg / Kodagu (Coffee Plantations), Karnataka", tags: ["coffee", "western ghats", "mist", "waterfalls"] },
  { name: "Jaisalmer", state: "Rajasthan", lat: 26.9157, lng: 70.9083, displayName: "Jaisalmer (Golden City & Thar), Rajasthan", tags: ["desert", "camel safari", "fort", "dunes"] },
  { name: "Pushkar", state: "Rajasthan", lat: 26.4899, lng: 74.5511, displayName: "Pushkar Sacred Lake, Rajasthan", tags: ["brahma temple", "ghats", "camel fair"] },
  { name: "Spiti Valley", state: "Himachal Pradesh", lat: 32.2461, lng: 78.0349, displayName: "Spiti Valley (Kaza & Key Monastery), Himachal Pradesh", tags: ["cold desert", "fossil village", "monastery", "stars"] },
  { name: "Ziro Valley", state: "Arunachal Pradesh", lat: 27.5645, lng: 93.8385, displayName: "Ziro Valley (Apatani Heritage), Arunachal Pradesh", tags: ["paddy fields", "music festival", "underrated", "tribal"] },
  { name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lng: 79.9199, displayName: "Khajuraho UNESCO Temples, Madhya Pradesh", tags: ["sculptures", "unesco", "heritage", "chandela"] },
  { name: "Mount Abu", state: "Rajasthan", lat: 24.5926, lng: 72.7156, displayName: "Mount Abu & Dilwara Temples, Rajasthan", tags: ["hill station", "marble temples", "nakki lake"] },
  { name: "Andaman", state: "Andaman and Nicobar Islands", lat: 11.6234, lng: 92.7265, displayName: "Andaman (Havelock & Radhanagar Beach), Andaman", tags: ["turquoise water", "coral reefs", "scuba", "islands"] },
  { name: "Kumarakom", state: "Kerala", lat: 9.6175, lng: 76.4301, displayName: "Kumarakom Bird Sanctuary, Kerala", tags: ["bird sanctuary", "lake", "ayurveda"] },
  { name: "Chikmagalur", state: "Karnataka", lat: 13.3161, lng: 75.772, displayName: "Chikmagalur (Mullayanagiri Peak), Karnataka", tags: ["coffee", "highest peak", "waterfalls", "trek"] },
  { name: "Ayodhya", state: "Uttar Pradesh", lat: 26.7922, lng: 82.1998, displayName: "Ayodhya (Saryu Ghats & Ram Mandir), Uttar Pradesh", tags: ["spiritual", "saryu", "temple", "ram katha"] },
  { name: "Mathura", state: "Uttar Pradesh", lat: 27.4924, lng: 77.6737, displayName: "Mathura & Vrindavan, Uttar Pradesh", tags: ["krishna", "yamuna", "temples", "holi"] },
  { name: "Amritsar", state: "Punjab", lat: 31.634, lng: 74.8723, displayName: "Amritsar (Golden Temple & Wagah), Punjab", tags: ["golden temple", "seva", "langar", "history"] },
  { name: "Dharamshala", state: "Himachal Pradesh", lat: 32.219, lng: 76.3234, displayName: "Dharamshala & McLeod Ganj, Himachal Pradesh", tags: ["tibetan", "dalai lama", "triund", "cricket stadium"] },
  { name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243, displayName: "Jodhpur (Mehrangarh & Blue City), Rajasthan", tags: ["blue city", "mehrangarh fort", "umaid bhawan"] },
  { name: "Kutch", state: "Gujarat", lat: 23.7337, lng: 69.8597, displayName: "Rann of Kutch (White Desert), Gujarat", tags: ["white desert", "salt marsh", "rann utsav", "crafts"] },
];

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim().toLowerCase();

  // If query is empty, return top trending recommendations immediately
  if (!q) {
    const popular = CURATED_DESTINATIONS.slice(0, 8).map((d) => ({
      name: d.name,
      state: d.state,
      lat: d.lat,
      lng: d.lng,
      displayName: d.displayName,
    }));
    return NextResponse.json({ suggestions: popular });
  }

  // Instant local search algorithm (matches name prefix, substring, state, or tags)
  const exactPrefixMatches: typeof CURATED_DESTINATIONS = [];
  const substringMatches: typeof CURATED_DESTINATIONS = [];
  const tagMatches: typeof CURATED_DESTINATIONS = [];

  for (const item of CURATED_DESTINATIONS) {
    const nameLower = item.name.toLowerCase();
    const stateLower = item.state.toLowerCase();
    const displayLower = item.displayName.toLowerCase();

    if (nameLower.startsWith(q)) {
      exactPrefixMatches.push(item);
    } else if (nameLower.includes(q) || displayLower.includes(q) || stateLower.includes(q)) {
      substringMatches.push(item);
    } else if (item.tags.some((t) => t.includes(q))) {
      tagMatches.push(item);
    }
  }

  const combined = [...exactPrefixMatches, ...substringMatches, ...tagMatches];
  const seen = new Set<string>();
  const curatedResults = combined.filter((c) => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  });

  const formatted = curatedResults.slice(0, 8).map((r) => ({
    name: r.name,
    state: r.state,
    lat: r.lat,
    lng: r.lng,
    displayName: r.displayName,
  }));

  // If we already have strong curated matches, return instantly (<5ms)
  if (formatted.length >= 4) {
    return NextResponse.json({ suggestions: formatted });
  }

  // Otherwise, optionally supplement with Nominatim live search with 1.5s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);

    const params = new URLSearchParams({
      q: `${q} India`,
      format: "json",
      countrycodes: "in",
      limit: "6",
      addressdetails: "1",
    });

    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "User-Agent": "YatraSetu/2.0 (Smart India Hackathon)" },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const results = await res.json();
      if (Array.isArray(results)) {
        for (const r of results) {
          const parts = (r.display_name || "").split(", ");
          const city = parts[0] || r.name;
          const state = parts.length > 2 ? parts[parts.length - 3] || parts[1] : "";
          if (city && !seen.has(city.toLowerCase())) {
            seen.add(city.toLowerCase());
            formatted.push({
              name: city,
              state: state,
              lat: parseFloat(r.lat) || 20.5937,
              lng: parseFloat(r.lon) || 78.9629,
              displayName: `${city}${state ? ", " + state : ""}`,
            });
          }
          if (formatted.length >= 8) break;
        }
      }
    }
  } catch {
    // Ignore network or abort errors, return our guaranteed curated results
  }

  return NextResponse.json({ suggestions: formatted.slice(0, 8) });
}
