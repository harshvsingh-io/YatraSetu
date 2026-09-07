import { NextRequest, NextResponse } from "next/server";
import { LOCAL_PARTNERS } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const destination = req.nextUrl.searchParams.get("q") || "";

  if (!destination) {
    return NextResponse.json({ partners: [] });
  }

  const partners = LOCAL_PARTNERS.filter(
    (p) => p.destination_name.toLowerCase() === destination.toLowerCase()
  );

  return NextResponse.json({ partners });
}
