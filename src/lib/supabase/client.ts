import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export function createClient() {
  // During build/prerender, env vars may not be available - that's OK for client-side only pages
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a dummy client for build time - actual client will be created on browser
    return createBrowserClient<Database>(
      url || "https://placeholder.supabase.co",
      key || "placeholder-key"
    );
  }

  return createBrowserClient<Database>(url, key);
}
