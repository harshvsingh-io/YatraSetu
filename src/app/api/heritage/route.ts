import { NextRequest, NextResponse } from "next/server";
import { HERITAGE_SITES } from "@/lib/seed-data";

// Cache for generated stories (in production, use Supabase)
const storyCache = new Map<string, string>();

async function fetchWikipediaSummary(slug: string): Promise<string> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`,
      { headers: { "User-Agent": "YatraSetu/2.0 (Smart India Hackathon)" } }
    );
    if (!res.ok) return "";
    const data = await res.json();
    return data.extract || "";
  } catch {
    return "";
  }
}

async function generateStory(
  siteName: string,
  wikiSummary: string,
  language: string
): Promise<string> {
  // Check cache first
  const cacheKey = `${siteName}-${language}`;
  if (storyCache.has(cacheKey)) return storyCache.get(cacheKey)!;

  // Check for Gemini API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Fallback: generate a basic story from Wikipedia content
    const fallback = generateFallbackStory(siteName, wikiSummary);
    storyCache.set(cacheKey, fallback);
    return fallback;
  }

  try {
    const langName = language === "hi" ? "Hindi" : "English";
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a warm, engaging tour guide speaking to a visitor standing at ${siteName}. Turn the following facts into a 90-second spoken narrative — conversational, vivid, with a touch of wonder. Write in ${langName}. Keep it under 200 words.\n\nFacts: ${wikiSummary}`,
                },
              ],
            },
          ],
        }),
      }
    );
    if (!res.ok) throw new Error("Gemini API error");
    const data = await res.json();
    const story = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (story) {
      storyCache.set(cacheKey, story);
      return story;
    }
  } catch {
    // Fall through to fallback
  }

  const fallback = generateFallbackStory(siteName, wikiSummary);
  storyCache.set(cacheKey, fallback);
  return fallback;
}

function generateFallbackStory(siteName: string, wikiSummary: string): string {
  if (wikiSummary) {
    return `Welcome to ${siteName}. ${wikiSummary.slice(0, 400)}... This is a place where history comes alive around every corner. Take a moment to soak in the atmosphere — feel the centuries of stories embedded in these walls. Every stone here has witnessed something remarkable. As you explore, notice the details: the craftsmanship, the way light plays across the surfaces, the sounds of the place. This is what makes ${siteName} truly special — it's not just a monument, it's a living piece of India's heritage.`;
  }
  return `Welcome to ${siteName}, one of India's treasured heritage sites. This place holds centuries of history and cultural significance. As you stand here, imagine the people who walked these grounds before you — traders, pilgrims, artisans, and rulers, all leaving their mark on this remarkable place. ${siteName} represents the incredible diversity and richness of Indian heritage. Take your time to explore, observe the architectural details, and feel the connection to the past. Every visit here reveals something new, something you missed before. This is the magic of India's living heritage.`;
}

export async function GET(req: NextRequest) {
  const siteId = req.nextUrl.searchParams.get("siteId");
  const language = req.nextUrl.searchParams.get("lang") || "en";

  if (siteId) {
    const site = HERITAGE_SITES.find((s) => s.id === siteId);
    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    // Try to get cached story first
    const cacheKey = `${site.name}-${language}`;
    if (storyCache.has(cacheKey)) {
      return NextResponse.json({ site, story: storyCache.get(cacheKey)! });
    }

    // Fetch from Wikipedia + generate story
    const wikiSummary = await fetchWikipediaSummary(site.wikipedia_slug);
    const story = await generateStory(site.name, wikiSummary, language);

    return NextResponse.json({ site, story, wikiSummary });
  }

  // Return all heritage sites (optionally filtered by destination)
  const destination = req.nextUrl.searchParams.get("destination");
  let sites = HERITAGE_SITES;
  if (destination) {
    sites = sites.filter(
      (s) => s.destination_name.toLowerCase() === destination.toLowerCase()
    );
  }

  return NextResponse.json({ sites });
}
