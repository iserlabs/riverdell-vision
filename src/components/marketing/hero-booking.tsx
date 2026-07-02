import { Star } from "lucide-react";
import { practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";
import { cn } from "@/lib/utils";

// Branded, on-brand booking card showing live-style availability that deep-links
// into the practice's real Zocdoc profile. (Locked choice: branded card, not the
// raw Zocdoc widget, so it stays in the boutique palette.) The calendar is
// decorative (aria-hidden); the "See available times" link is the real action.
const DAY_NAMES = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
const OPEN = new Set(["Mon", "Wed", "Thu", "Fri"]);
const CAL = Array.from({ length: 28 }, (_, i) => {
  const d = DAY_NAMES[i % 7];
  return { d, n: i + 2, on: OPEN.has(d) };
});

export function HeroBooking() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_40px_90px_-42px_rgba(18,60,70,0.45)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-5 md:px-7 md:py-6">
          <div>
            <p className="font-display text-xl font-medium text-teal md:text-2xl">Book an appointment</p>
            <p className="mt-1 text-sm text-ink-soft">Real-time availability on Zocdoc</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-3 py-1.5 text-sm font-medium text-clay">
            <Star className="size-3.5 fill-clay" aria-hidden /> 5.0
          </span>
        </div>

        <div className="px-5 py-6 md:px-7">
          <div className="mb-4 flex items-center justify-between text-sm text-ink-soft">
            <span>Riverdell Vision · Oradell</span>
            <span className="font-mono text-xs uppercase tracking-wide">Next 4 weeks</span>
          </div>

          <div className="grid grid-cols-7 gap-2" aria-hidden>
            {DAY_NAMES.map((d) => (
              <div
                key={d}
                className="pb-1 text-center font-mono text-[0.62rem] font-medium uppercase tracking-wide text-ink-soft"
              >
                {d}
              </div>
            ))}
            {CAL.map((c, i) => (
              <div
                key={i}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-xl text-base font-semibold tabular-nums transition-colors",
                  c.on
                    ? "bg-teal-tint text-teal"
                    : "border border-line text-ink-soft/45",
                )}
              >
                {c.n}
              </div>
            ))}
          </div>

          <a
            href={practice.zocdocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-teal text-base font-medium text-bone transition-colors hover:bg-teal-deep"
          >
            See available times →
          </a>
          <p className="mt-4 text-center text-sm text-ink-soft">
            {REVIEW_STATS.count} patients rate us {REVIEW_STATS.rating.toFixed(1)} on Google
          </p>
        </div>
      </div>
    </div>
  );
}
