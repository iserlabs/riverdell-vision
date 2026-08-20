"use client";

import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * /privacy tells patients: "We do not place advertising or analytics trackers on
 * appointment, intake, or patient-facing pages." Both scripts were mounted in the root
 * layout, so they ran on /book and /portal and the promise was not true.
 *
 * Rather than soften the sentence, the code now keeps it. Vercel Analytics is cookieless
 * and aggregate, so this costs almost nothing in insight, and for a medical practice a
 * kept promise about tracking is worth more than the page views.
 *
 * If a route is added where someone shares clinical detail, add it here.
 */
const EXCLUDED = ["/book", "/portal", "/dashboard", "/fort-lee"];

export function AnalyticsGate() {
  const pathname = usePathname() ?? "";
  if (EXCLUDED.some((p) => pathname === p || pathname.startsWith(p + "/"))) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
