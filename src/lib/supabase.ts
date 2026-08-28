"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  client = createClient(url || "https://placeholder.supabase.co", key || "placeholder");
  return client;
}

// Lazy proxy — only creates client when methods are called
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    const c = getClient();
    const val = (c as any)[prop];
    if (typeof val === "function") {
      return val.bind(c);
    }
    return val;
  },
});
