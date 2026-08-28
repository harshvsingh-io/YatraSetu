import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city") || "Goa";

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured", fallback: true }, { status: 503 });
  }

  try {
    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},IN&units=metric&appid=${apiKey}`;
    const currentRes = await fetch(currentUrl);
    const currentData = await currentRes.json();

    if (currentData.cod !== 200) {
      return NextResponse.json({ error: currentData.message, fallback: true }, { status: 502 });
    }

    // 5-day forecast (we'll take daily snapshots)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)},IN&units=metric&appid=${apiKey}`;
    const forecastRes = await fetch(forecastUrl);
    const forecastData = await forecastRes.json();

    // Extract daily forecasts (noon readings)
    const dailyForecasts = forecastData.list
      ?.filter((f: any) => f.dt_txt.includes("12:00:00"))
      .slice(0, 3)
      .map((f: any) => ({
        date: f.dt_txt.split(" ")[0],
        temp: Math.round(f.main.temp),
        condition: f.weather[0]?.main,
        icon: f.weather[0]?.icon,
        humidity: f.main.humidity,
      })) || [];

    const result = {
      current: {
        temp: Math.round(currentData.main.temp),
        feelsLike: Math.round(currentData.main.feels_like),
        condition: currentData.weather[0]?.main,
        description: currentData.weather[0]?.description,
        icon: currentData.weather[0]?.icon,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind?.speed,
        visibility: currentData.visibility,
      },
      forecast: dailyForecasts,
      city: currentData.name,
      country: currentData.sys?.country,
    };

    return NextResponse.json({ ...result, status: "live" });
  } catch {
    return NextResponse.json({ error: "Failed to fetch", fallback: true }, { status: 500 });
  }
}
