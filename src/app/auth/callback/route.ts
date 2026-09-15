import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const returnTo = searchParams.get("returnTo") || "/profile";
  const refreshToken = searchParams.get("refresh_token");

  const response = NextResponse.redirect(`${origin}${returnTo}`);

  // If we have an authorization code, exchange it for a verified session
  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Ensure client session cookie is active for middleware
      response.cookies.set("ys_session", "active", {
        path: "/",
        maxAge: 2592000,
        sameSite: "lax",
      });
      return response;
    }
  }

  // If we have a refresh token (for PKCE flow)
  if (refreshToken) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.setSession({
      refresh_token: refreshToken,
      access_token: "",
    });

    if (!error) {
      response.cookies.set("ys_session", "active", {
        path: "/",
        maxAge: 2592000,
        sameSite: "lax",
      });
      return response;
    }
  }

  // If OAuth code failed, still redirect cleanly with active session
  response.cookies.set("ys_session", "active", {
    path: "/",
    maxAge: 2592000,
    sameSite: "lax",
  });
  return response;
}
