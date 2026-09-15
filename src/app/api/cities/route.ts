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
  { name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.209, displayName: "New Delhi & Old Delhi (Red Fort, Qutub), Delhi", tags: ["capital", "monuments", "heritage", "food", "history"] },
  { name: "Mumbai", state: "Maharashtra", lat: 18.922, lng: 72.8347, displayName: "Mumbai (Gateway of India & Marine Drive), Maharashtra", tags: ["coastal", "bollywood", "heritage", "sea", "city"] },
  { name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, displayName: "Bengaluru (Garden City & Cubbon Park), Karnataka", tags: ["gardens", "palaces", "tech", "pleasant weather"] },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, displayName: "Kolkata (City of Joy, Victoria Memorial), West Bengal", tags: ["culture", "hooghly", "colonial", "durga puja"] },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, displayName: "Chennai (Marina Beach & Kapaleeshwarar), Tamil Nadu", tags: ["beaches", "carnatic", "temple", "coastal"] },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, displayName: "Hyderabad (Charminar & Golconda Fort), Telangana", tags: ["biryani", "heritage", "charminar", "palace"] },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, displayName: "Pune (Shaniwar Wada & Western Ghats), Maharashtra", tags: ["forts", "sahaydri", "peshwa", "monsoon treks"] },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, displayName: "Ahmedabad (Sabarmati Ashram UNESCO), Gujarat", tags: ["unesco", "heritage city", "sabarmati", "stepwells"] },
  { name: "Chandigarh", state: "Chandigarh", lat: 30.7333, lng: 76.7794, displayName: "Chandigarh (Rock Garden & Sukhna Lake), Chandigarh", tags: ["cleanest city", "gardens", "modern architecture"] },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, displayName: "Bhopal (City of Lakes & Upper Lake), Madhya Pradesh", tags: ["lakes", "sanchi nearby", "bhimbetka", "heritage"] },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577, displayName: "Indore (Cleanest City, Sarafa & Rajwada), Madhya Pradesh", tags: ["cleanest city", "food street", "heritage", "maheshwar"] },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, displayName: "Lucknow (City of Nawabs & Bara Imambara), Uttar Pradesh", tags: ["awadh", "imambara", "kebabs", "chikan", "culture"] },
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, displayName: "Patna (Ancient Pataliputra & Ganga Ghats), Bihar", tags: ["pataliputra", "ganga", "nalanda nearby", "history"] },
  { name: "Prayagraj", state: "Uttar Pradesh", lat: 25.4358, lng: 81.8463, displayName: "Prayagraj (Triveni Sangam & Akbar Fort), Uttar Pradesh", tags: ["sangam", "kumbh", "ganga yamuna", "spiritual"] },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, displayName: "Agra (Taj Mahal & Agra Fort UNESCO), Uttar Pradesh", tags: ["taj mahal", "unesco", "mughal", "monuments"] },
  { name: "Haridwar", state: "Uttarakhand", lat: 29.9457, lng: 78.1642, displayName: "Haridwar (Har Ki Pauri & Ganga Aarti), Uttarakhand", tags: ["ganga aarti", "spiritual", "ghats", "kumbh"] },
  { name: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, displayName: "Dehradun (Doon Valley & Robber's Cave), Uttarakhand", tags: ["doon valley", "foothills", "nature", "pleasant"] },
  { name: "Srinagar", state: "Jammu and Kashmir", lat: 34.0837, lng: 74.7973, displayName: "Srinagar & Dal Lake (Houseboats & Shikara), J&K", tags: ["dal lake", "shikara", "mughal gardens", "paradise"] },
  { name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, displayName: "Kochi / Cochin (Fort Kochi & Chinese Nets), Kerala", tags: ["fort kochi", "colonial", "spice route", "coastal"] },
  { name: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312, displayName: "Puri (Jagannath Temple & Golden Beach), Odisha", tags: ["jagannath", "blue flag beach", "konark nearby", "spiritual"] },
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, displayName: "Bhubaneswar (Temple City & Lingaraj), Odisha", tags: ["temple city", "lingaraj", "odissi", "heritage"] },
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, displayName: "Guwahati (Kamakhya Temple & Brahmaputra), Assam", tags: ["kamakhya", "brahmaputra", "gateway to northeast"] },
  { name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394, displayName: "Mysore (Mysore Palace & Chamundi Hill), Karnataka", tags: ["palace", "dasara", "sandalwood", "heritage"] },
  { name: "Bodh Gaya", state: "Bihar", lat: 24.6961, lng: 84.9869, displayName: "Bodh Gaya (Mahabodhi Temple UNESCO), Bihar", tags: ["buddha", "unesco", "enlightenment", "monasteries"] },
  { name: "Ujjain", state: "Madhya Pradesh", lat: 23.1765, lng: 75.7885, displayName: "Ujjain (Mahakaleshwar Jyotirlinga & Shipra), MP", tags: ["jyotirlinga", "shipra", "spiritual", "kumbh"] },
  { name: "Tirupati", state: "Andhra Pradesh", lat: 13.6288, lng: 79.4192, displayName: "Tirupati (Sri Venkateswara Swamy Temple), Andhra Pradesh", tags: ["balaji", "seven hills", "spiritual", "darshan"] },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, displayName: "Madurai (Meenakshi Amman Temple), Tamil Nadu", tags: ["meenakshi", "gopuram", "ancient city", "heritage"] },
  { name: "Coonoor", state: "Tamil Nadu", lat: 11.353, lng: 76.7959, displayName: "Coonoor (Nilgiri Tea Hills & Sim's Park), Tamil Nadu", tags: ["tea gardens", "nilgiri toy train", "serene", "hills"] },
  { name: "Tawang", state: "Arunachal Pradesh", lat: 27.5861, lng: 91.8654, displayName: "Tawang (Tawang Monastery & Sela Pass), Arunachal Pradesh", tags: ["monastery", "snow peaks", "high altitude", "himalayas"] },
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
    if (seen.has(c.name.toLowerCase())) return false;
    seen.add(c.name.toLowerCase());
    return true;
  });

  const formatted = curatedResults.slice(0, 8).map((r) => ({
    name: r.name,
    state: r.state,
    lat: r.lat,
    lng: r.lng,
    displayName: r.displayName,
  }));

  // If we already have strong curated matches (4+), return instantly (<5ms)
  if (formatted.length >= 4) {
    return NextResponse.json({ suggestions: formatted });
  }

  // Otherwise, supplement with OpenStreetMap Nominatim live search with 1.8s timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800);

    const params = new URLSearchParams({
      q: q,
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
