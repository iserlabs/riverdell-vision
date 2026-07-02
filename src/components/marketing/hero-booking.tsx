import { Star } from "lucide-react";
import { practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

// Branded, on-brand booking card showing live-style availability that deep-links
// into the practice's real Zocdoc profile. (Locked choice: branded card, not the
// raw Zocdoc widget, so it stays in the boutique palette.)
const DAY_NAMES = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
const OPEN = new Set(["Mon", "Wed", "Thu", "Fri"]);
const CAL = Array.from({ length: 28 }, (_, i) => {
  const d = DAY_NAMES[i % 7];
  return { d, n: i + 2, on: OPEN.has(d) };
});

export function HeroBooking() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_36px_80px_-40px_rgba(18,60,70,0.45)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <p className="font-display text-xl text-teal">Book an appointment</p>
            <p className="mt-0.5 text-xs text-ink-soft">Real-time availability on Zocdoc</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-clay-soft px-2.5 py-1 text-[0.7rem] font-medium text-clay">
            <Star className="size-3 fill-clay" aria-hidden /> 5.0
          </span>
        </div>
        <div className="px-6 py-5">
          <div className="mb-3 flex items-center justify-between text-xs text-ink-soft">
            <span>Riverdell Vision · Oradell</span>
            <span className="font-mono">Next 4 weeks</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5" aria-hidden>
            {CAL.map((c, i) => (
              <div
                key={i}
                className={
                  c.on
                    ? "rounded-lg bg-teal-tint py-1.5 text-center text-[0.62rem] font-medium text-teal"
                    : "rounded-lg border border-line py-1.5 text-center text-[0.62rem] text-ink-soft/60"
                }
              >
                {c.d}
                <span
                  className={
                    c.on
                      ? "mt-0.5 block text-sm font-semibold text-teal"
                      : "mt-0.5 block text-sm font-semibold text-ink/50"
                  }
                >
                  {c.n}
                </span>
              </div>
            ))}
          </div>
          <a
            href={practice.zocdocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal font-medium text-bone transition-colors hover:bg-teal-deep"
          >
            See available times →
          </a>
          <p className="mt-3 text-center text-xs text-ink-soft">
            {REVIEW_STATS.count} patients rate us {REVIEW_STATS.rating.toFixed(1)} on Google
          </p>
        </div>
      </div>
    </div>
  );
}
