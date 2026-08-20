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

export async function reviewAuthed(): Promise<boolean> {
  if (!reviewConfigured()) return false;
  const jar = await cookies();
  return jar.get(REVIEW_COOKIE)?.value === reviewToken();
}
