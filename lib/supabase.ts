import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/supabase/database.types";

declare global {
  var __supabase: SupabaseClient<Database> | undefined;
}

function createServerSupabase(): SupabaseClient<Database> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient<Database>(url, key, { auth: { persistSession: false } });
}

export function db(): SupabaseClient<Database> {
  if (process.env.NODE_ENV === "production") return createServerSupabase();

  global.__supabase ??= createServerSupabase();

  return global.__supabase;
}
