import "server-only";
import { Redis } from "@upstash/redis";
import type { ReviewAnnotation } from "@/lib/review-types";

// Where Dr. Han's notes are kept.
//
// Upstash is already a dependency here (lib/ratelimit.ts uses it), so this adds
// no infrastructure and no new service. One key holds the list; at the volume of
// one person marking up one website that is the right amount of machinery.
//
// CONFIGURED IS A STATE THE UI CAN SEE. When the Upstash keys are absent this
// says so rather than pretending to save. The widget then keeps notes in the
// browser and tells him they are on this device only. A feedback tool that
// swallows feedback is the same failure as the request form that swallowed
// patient enquiries, and that one shipped for months.

const KEY = "riverdell:review:annotations";

let redis: Redis | null = null;

function client(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!redis) redis = new Redis({ url, token });
  return redis;
}

export function reviewStoreConfigured(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

export async function readAnnotations(): Promise<ReviewAnnotation[]> {
  const r = client();
  if (!r) return [];
  try {
    const rows = await r.lrange<ReviewAnnotation>(KEY, 0, -1);
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

/** True only when the note is actually stored. Callers must not report success otherwise. */
export async function writeAnnotation(a: ReviewAnnotation): Promise<boolean> {
  const r = client();
  if (!r) return false;
  try {
    await r.rpush(KEY, JSON.stringify(a));
    return true;
  } catch {
    return false;
  }
}

export async function deleteAnnotation(id: string): Promise<boolean> {
  const r = client();
  if (!r) return false;
  try {
    const rows = await readAnnotations();
    const kept = rows.filter((x) => x.id !== id);
    if (kept.length === rows.length) return false;
    await r.del(KEY);
    if (kept.length) await r.rpush(KEY, ...kept.map((x) => JSON.stringify(x)));
    return true;
  } catch {
    return false;
  }
}
