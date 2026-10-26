import "server-only";
import { createClient } from "@supabase/supabase-js";

/** Server-only client using the service role key. Never import this in a client component. */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not configured");
  return createClient(url, key, { auth: { persistSession: false } });
}
