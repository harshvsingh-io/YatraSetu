// ═══════════════════════════════════════════════════════════════
// Seed data — used when Supabase tables aren't populated yet
// ═══════════════════════════════════════════════════════════════

export interface DestinationMetric {
  id: string;
  name: string;
  state: string;
  category: "hill_station" | "beach" | "heritage" | "spiritual" | "nature";
  lat: number;
  lng: number;
  bookings_7d: number;
  bookings_30d: number;
  weather_flag: "clear" | "caution" | "avoid";
  crowd_score: number;
}

export interface DestinationAlternative {
  source_destination_id: string;
  alt_destination_id: string;
  similarity_reason: string;
  rank: number;
}

export interface HeritageSite {
  id: string;
  destination_name: string;
  name: string;
  lat: number;
  lng: number;
  wikipedia_slug: string;
  category: string;
}

export interface LocalPartner {
  id: string;
  destination_name: string;
  name: string;
  type: string;
  price_range: string;
  contact_info: string;
  description: string;
}

export const DESTINATIONS: DestinationMetric[] = [
  { id: "d1", name: "Manali", state: "Himachal Pradesh", category: "hill_station", lat: 32.2396, lng: 77.1887, bookings_7d: 840, bookings_30d: 3200, weather_flag: "clear", crowd_score: 85 },
  { id: "d2", name: "Goa", state: "Goa", category: "beach", lat: 15.2993, lng: 74.124, bookings_7d: 720, bookings_30d: 2800, weather_flag: "clear", crowd_score: 78 },
  { id: "d3", name: "Shimla", state: "Himachal Pradesh", category: "hill_station", lat: 31.1048, lng: 77.1734, bookings_7d: 680, bookings_30d: 2600, weather_flag: "clear", crowd_score: 72 },
  { id: "d4", name: "Jaipur", state: "Rajasthan", category: "heritage", lat: 26.9124, lng: 75.7873, bookings_7d: 620, bookings_30d: 2400, weather_flag: "clear", crowd_score: 68 },
  { id: "d5", name: "Varanasi", state: "Uttar Pradesh", category: "spiritual", lat: 25.3176, lng: 82.9739, bookings_7d: 540, bookings_30d: 2100, weather_flag: "clear", crowd_score: 65 },
  { id: "d6", name: "Kasol", state: "Himachal Pradesh", category: "hill_station", lat: 32.0113, lng: 77.2674, bookings_7d: 120, bookings_30d: 480, weather_flag: "clear", crowd_score: 25 },
  { id: "d7", name: "Tirthan Valley", state: "Himachal Pradesh", category: "nature", lat: 31.5546, lng: 77.5012, bookings_7d: 45, bookings_30d: 180, weather_flag: "clear", crowd_score: 12 },
  { id: "d8", name: "Gokarna", state: "Karnataka", category: "beach", lat: 14.5204, lng: 74.32, bookings_7d: 85, bookings_30d: 340, weather_flag: "clear", crowd_score: 18 },
  { id: "d9", name: "Orchha", state: "Madhya Pradesh", category: "heritage", lat: 25.3512, lng: 78.6419, bookings_7d: 30, bookings_30d: 120, weather_flag: "clear", crowd_score: 8 },
  { id: "d10", name: "Chopta", state: "Uttarakhand", category: "nature", lat: 30.3752, lng: 79.0026, bookings_7d: 55, bookings_30d: 220, weather_flag: "caution", crowd_score: 15 },
  { id: "d11", name: "Munnar", state: "Kerala", category: "nature", lat: 10.0889, lng: 77.0595, bookings_7d: 380, bookings_30d: 1500, weather_flag: "clear", crowd_score: 48 },
  { id: "d12", name: "Hampi", state: "Karnataka", category: "heritage", lat: 15.335, lng: 76.46, bookings_7d: 95, bookings_30d: 380, weather_flag: "clear", crowd_score: 22 },
  { id: "d13", name: "Pondicherry", state: "Tamil Nadu", category: "beach", lat: 11.9416, lng: 79.8083, bookings_7d: 290, bookings_30d: 1100, weather_flag: "clear", crowd_score: 42 },
  { id: "d14", name: "Coorg", state: "Karnataka", category: "nature", lat: 12.3375, lng: 75.8069, bookings_7d: 200, bookings_30d: 800, weather_flag: "clear", crowd_score: 35 },
  { id: "d15", name: "Rishikesh", state: "Uttarakhand", category: "spiritual", lat: 30.0869, lng: 78.2676, bookings_7d: 450, bookings_30d: 1800, weather_flag: "clear", crowd_score: 58 },
];

export const ALTERNATIVES: DestinationAlternative[] = [
  { source_destination_id: "d1", alt_destination_id: "d6", similarity_reason: "same_category", rank: 1 },
  { source_destination_id: "d1", alt_destination_id: "d7", similarity_reason: "same_category", rank: 2 },
  { source_destination_id: "d2", alt_destination_id: "d8", similarity_reason: "same_category", rank: 1 },
  { source_destination_id: "d3", alt_destination_id: "d10", similarity_reason: "same_category", rank: 1 },
  { source_destination_id: "d4", alt_destination_id: "d9", similarity_reason: "same_category", rank: 1 },
  { source_destination_id: "d5", alt_destination_id: "d15", similarity_reason: "same_category", rank: 1 },
];

export const HERITAGE_SITES: HeritageSite[] = [
  { id: "h1", destination_name: "Kasol", name: "Manikaran Sahib", lat: 32.0094, lng: 77.3186, wikipedia_slug: "Manikaran", category: "temple" },
  { id: "h2", destination_name: "Kasol", name: "Raghunath Temple", lat: 32.04, lng: 77.28, wikipedia_slug: "Raghunath_Temple,_Kullu", category: "temple" },
  { id: "h3", destination_name: "Tirthan Valley", name: "Great Himalayan National Park", lat: 31.55, lng: 77.5, wikipedia_slug: "Great_Himalayan_National_Park", category: "natural" },
  { id: "h4", destination_name: "Gokarna", name: "Mahabaleshwar Temple", lat: 14.5219, lng: 74.3184, wikipedia_slug: "Mahabaleshwar_Temple,_Gokarna", category: "temple" },
  { id: "h5", destination_name: "Orchha", name: "Orchha Fort Complex", lat: 25.3512, lng: 78.6419, wikipedia_slug: "Orchha_Fort_Complex", category: "fort" },
  { id: "h6", destination_name: "Orchha", name: "Raja Mahal", lat: 25.352, lng: 78.642, wikipedia_slug: "Raja_Mahal,_Orchha", category: "palace" },
  { id: "h7", destination_name: "Hampi", name: "Virupaksha Temple", lat: 15.335, lng: 76.46, wikipedia_slug: "Virupaksha_Temple,_Hampi", category: "temple" },
  { id: "h8", destination_name: "Hampi", name: "Vittala Temple", lat: 15.349, lng: 76.472, wikipedia_slug: "Vittala_Temple,_Hampi", category: "temple" },
  { id: "h9", destination_name: "Jaipur", name: "Amber Fort", lat: 26.9855, lng: 75.8513, wikipedia_slug: "Amber_Fort", category: "fort" },
  { id: "h10", destination_name: "Jaipur", name: "Hawa Mahal", lat: 26.9239, lng: 75.8267, wikipedia_slug: "Hawa_Mahal", category: "palace" },
  { id: "h11", destination_name: "Varanasi", name: "Kashi Vishwanath Temple", lat: 25.3109, lng: 83.0107, wikipedia_slug: "Kashi_Vishwanath_Temple", category: "temple" },
  { id: "h12", destination_name: "Rishikesh", name: "Laxman Jhula", lat: 30.124, lng: 78.321, wikipedia_slug: "Laxman_Jhula", category: "monument" },
];

export const LOCAL_PARTNERS: LocalPartner[] = [
  { id: "lp1", destination_name: "Kasol", name: "Parvati Woods Camps", type: "camp", price_range: "₹1,200/night", contact_info: "+91 98765 43210", description: "Riverside camping with mountain views, home-cooked meals" },
  { id: "lp2", destination_name: "Kasol", name: "Kasol Homestay", type: "homestay", price_range: "₹800/night", contact_info: "+91 98765 43211", description: "Family-run homestay in the village, walking distance to river" },
  { id: "lp3", destination_name: "Tirthan Valley", name: "Thakur Guest House", type: "guesthouse", price_range: "₹1,500/night", contact_info: "+91 98765 43212", description: "Traditional stone house with garden, GHNP trail access" },
  { id: "lp4", destination_name: "Gokarna", name: "Namaste Sanjeevini", type: "homestay", price_range: "₹700/night", contact_info: "+91 98765 43213", description: "Quiet homestay 10 min walk from Om Beach" },
  { id: "lp5", destination_name: "Orchha", name: "Orchha Heritage Stay", type: "hotel", price_range: "₹2,000/night", contact_info: "+91 98765 43214", description: "Heritage haveli converted to hotel, view of Jahangir Mahal" },
  { id: "lp6", destination_name: "Chopta", name: "Chopta Meadows Camp", type: "camp", price_range: "₹1,000/night", contact_info: "+91 98765 43215", description: "Tented camps with bonfire, near Tungnath trek start" },
  { id: "lp7", destination_name: "Hampi", name: "Goan Corner Hampi", type: "homestay", price_range: "₹600/night", contact_info: "+91 98765 43216", description: "Basic but clean stay on the riverside, sunset view" },
  { id: "lp8", destination_name: "Coorg", name: "Coorg Green Homestay", type: "homestay", price_range: "₹1,800/night", contact_info: "+91 98765 43217", description: "Coffee plantation stay, includes plantation walk tour" },
];

// Crowd score thresholds
export const CROWD_THRESHOLDS = {
  LOW: 30,
  MODERATE: 60,
  HIGH: 70,
} as const;

export function getCrowdLevel(score: number): "low" | "moderate" | "high" {
  if (score >= CROWD_THRESHOLDS.HIGH) return "high";
  if (score >= CROWD_THRESHOLDS.MODERATE) return "moderate";
  return "low";
}

export function getCrowdColor(level: "low" | "moderate" | "high") {
  switch (level) {
    case "low": return { bg: "bg-sage-50", text: "text-sage-700", dot: "bg-sage-500", label: "🟢 Low Pressure" };
    case "moderate": return { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", label: "🟡 Moderate" };
    case "high": return { bg: "bg-terra-50", text: "text-terra-700", dot: "bg-terra-500", label: "🔴 High Pressure" };
  }
}
