import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

/**
 * Returns rate limiters only when UPSTASH env vars are configured.
 * Falls back to null (no rate limiting) so local dev works without Upstash.
 */
function buildClients() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  const redis = new Redis({ url, token });
  return {
    reservation: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "ratelimit:reservation",
      analytics: true,
    }),
    login: new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "15 m"),
      prefix: "ratelimit:login",
      analytics: true,
    }),
  };
}

// Lazy singleton — evaluated once per cold start
let _clients: ReturnType<typeof buildClients> | undefined;
function getClients() {
  if (_clients === undefined) _clients = buildClients();
  return _clients;
}

/** Returns { blocked: false } when Upstash is not configured (dev fallback). */
export async function checkReservationLimit(
  ip: string
): Promise<{ blocked: false } | { blocked: true; retryInMinutes: number }> {
  const clients = getClients();
  if (!clients) return { blocked: false };

  const { success, reset } = await clients.reservation.limit(ip);
  if (success) return { blocked: false };

  return {
    blocked: true,
    retryInMinutes: Math.ceil((reset - Date.now()) / 60_000),
  };
}

export async function checkLoginLimit(
  ip: string
): Promise<{ blocked: false } | { blocked: true; retryInMinutes: number }> {
  const clients = getClients();
  if (!clients) return { blocked: false };

  const { success, reset } = await clients.login.limit(ip);
  if (success) return { blocked: false };

  return {
    blocked: true,
    retryInMinutes: Math.ceil((reset - Date.now()) / 60_000),
  };
}
