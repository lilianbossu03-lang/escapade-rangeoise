import { createClient } from "@/lib/supabase/server";

/**
 * Defense-in-depth auth guard for server actions that mutate admin data.
 * The middleware already protects /admin/* routes, but this guard ensures
 * a future middleware misconfiguration cannot bypass per-action auth.
 *
 * Throws an Error (surfaced as 500) when called without a valid session.
 */
export async function requireAdmin() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: authentication required");
  }

  return user;
}
