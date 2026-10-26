/**
 * Simple in-memory fixed-window rate limiter.
 * NOTE: state is per server instance. On Vercel serverless this is best-effort;
 * swap for Upstash Ratelimit if you need strict global limits.
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > limit) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  // opportunistic cleanup
  if (hits.size > 5000) hits.forEach((v, k) => v.reset < now && hits.delete(k));
  return { ok: true, retryAfter: 0 };
}
