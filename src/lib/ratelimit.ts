// Graceful-skip rate limiter. Mirrors lib/notify.ts: if Upstash env is not
// configured, it no-ops (ok:true, configured:false) so the endpoint behaves
// exactly as before and never 500s. When configured, it enforces a sliding
// window keyed by the caller id (client IP).
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "rv:lead",
    });
  }
  return limiter;
}

export async function checkRateLimit(
  id: string,
): Promise<{ ok: boolean; configured: boolean }> {
  const l = getLimiter();
  if (!l) return { ok: true, configured: false };
  try {
    const { success } = await l.limit(id || "unknown");
    return { ok: success, configured: true };
  } catch {
    // Redis hiccup must not break the form; fail open.
    return { ok: true, configured: true };
  }
}
