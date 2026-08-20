import "server-only";
import { cookies } from "next/headers";

// The door to Review Mode.
//
// FAILS CLOSED. With REVIEW_PASSPHRASE unset there is no way in at all, rather
// than a way in for everyone. This runs on a live patient site, so an unset
// secret becoming an unlocked door would put a drawing tool in front of people
// looking for an eye doctor.
//
// The check is a server concern on purpose: the gate is a server component, so
// an ordinary visitor never receives the Review Mode bundle, never sees a
// disabled control, and has nothing to guess at.

export const REVIEW_COOKIE = "rv_review";

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function reviewToken(): string {
  return normalise(process.env.REVIEW_PASSPHRASE || "");
}

export function reviewConfigured(): boolean {
  return reviewToken().length > 0;
}

/**
 * The cookie carries a derived token, not the passphrase. Storing the secret verbatim
 * meant it travelled on every request to every route and sat in the browser in plain
 * text. The comparison is length-safe and constant-time so a wrong guess leaks nothing
 * about how much of it was right.
 */
export function sessionToken(): string {
  const seed = reviewToken();
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < seed.length; i++) {
    h1 = Math.imul(h1 ^ seed.charCodeAt(i), 0x01000193) >>> 0;
    h2 = Math.imul(h2 + seed.charCodeAt(i) + i, 0x85ebca6b) >>> 0;
  }
  return `${h1.toString(36)}${h2.toString(36)}`;
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function reviewAuthed(): Promise<boolean> {
  if (!reviewConfigured()) return false;
  const jar = await cookies();
  const got = jar.get(REVIEW_COOKIE)?.value ?? "";
  return safeEqual(got, sessionToken());
}
