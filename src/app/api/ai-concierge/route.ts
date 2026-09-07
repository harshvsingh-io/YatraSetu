import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Setu Saathi (सेतु साथी), the friendly and knowledgeable AI concierge of YatraSetu ("Yatra Bane Seva, Bina Bheed Ke").
Your mission is to help travelers discover crowd-free, offbeat destinations in India, participate in verified ecological restoration cleanups and plantation drives (beach cleanups in Goa, river trail revivals in Parvati Valley, mangrove restoration, temple conservation), earn Green Karma points and verifiable NSS/NCC certificates, and travel responsibly.
Keep your answers helpful, warm, culturally respectful, concise (2-4 sentences), and practical. If relevant, mention that users can earn +250 Green Karma by picking offbeat stays on the Discover page.`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}\nSetu Saathi Response:` },
                  ],
                },
              ],
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply: reply.trim(), source: "gemini-live" });
          }
        }
      } catch (err) {
        console.warn("Gemini API call failed, falling back to smart local responses", err);
      }
    }

    // Fallback smart responses grounded in YatraSetu platform data
    const q = message.toLowerCase();
    let reply = "Namaste! 🙏 I can guide you to crowd-free destinations like Kasol, Tirthan Valley, or Gokarna, help you register for weekend restoration drives, or show you how to redeem Green Karma for homestay discounts.";
    let actions: Array<{ label: string; href?: string }> = [
      { label: "Explore Discover", href: "/discover" },
      { label: "View Seva Drives", href: "/events" },
    ];

    if (q.includes("decongestion") || q.includes("crowd") || q.includes("bheed") || q.includes("offbeat")) {
      reply = "Our AI Decongestion Engine tracks real-time tourist density across India. Right now, popular hubs like North Goa and Shimla are crowded, but beautiful alternatives like Tirthan Valley, Kasol, and Chopta have under 25% crowd pressure and earn you +250 Green Karma!";
      actions = [{ label: "View Offbeat Picks", href: "/discover" }];
    } else if (q.includes("event") || q.includes("cleanup") || q.includes("drive") || q.includes("seva") || q.includes("plant")) {
      reply = "We have verified community restoration drives across India! You can join coastal cleanups in Goa, river revival in Kasol, or mangrove restoration at Divar Island. Attendance is verified via rotating 15s QR + 200m GPS geofencing.";
      actions = [{ label: "Browse Events", href: "/events" }];
    } else if (q.includes("reward") || q.includes("karma") || q.includes("point") || q.includes("coin")) {
      reply = "Every verified restoration event earns you 100 to 300 Green Karma points! You can redeem these for instant discounts on partner eco-homestays, state bus passes, or entry to ASI heritage monuments.";
      actions = [{ label: "Rewards Store", href: "/rewards" }, { label: "My Certificates", href: "/certificates" }];
    } else if (q.includes("certificate") || q.includes("nss") || q.includes("ncc") || q.includes("college")) {
      reply = "When you complete a verified restoration drive, an official NSS/NCC accredited Certificate of Voluntary Service is generated with a verifiable cryptographic hash ID and your logged hours.";
      actions = [{ label: "View Certificates", href: "/certificates" }];
    } else if (q.includes("hotel") || q.includes("stay") || q.includes("book") || q.includes("homestay")) {
      reply = "On our Discover page, you can search any Indian city and browse verified partner eco-homestays with live prices. You can also view them on our interactive Stay Map and redeem your Green Karma points during booking!";
      actions = [{ label: "Search Stays", href: "/discover" }];
    }

    return NextResponse.json({ reply, actions, source: "grounded-local" });
  } catch (error) {
    return NextResponse.json(
      { reply: "Namaste! I am here to help you discover offbeat India and join verified seva drives. How can I assist you today?" },
      { status: 200 }
    );
  }
}
