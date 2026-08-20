// The one link Dr. Han opens to turn Review Mode on for himself.
//
//   /api/review/enter?word=<the passphrase>
//
// It sets the cookie and drops him on the homepage with the layer live. Wrong
// word or unset passphrase both 404, so the endpoint gives nothing away about
// whether review mode exists on this deployment.
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/ratelimit";
import { REVIEW_COOKIE, reviewToken, reviewConfigured, sessionToken } from "@/lib/review-auth";

function normalise(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export async function GET(req: Request) {
  /* The passphrase normalises to [a-z0-9], so the keyspace is smaller than it looks and
     it was guessable without limit. */
  const limit = await checkRateLimit(
    "review-enter:" + ((req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown"),
  );
  if (!limit.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!reviewConfigured()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const word = normalise(new URL(req.url).searchParams.get("word") ?? "");
  if (!word || word !== reviewToken()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(REVIEW_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 60,
  });
  return res;
}
