import { Star } from "lucide-react";
import { practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

// Booking card. It shows the practice's real opening hours, read from
// `practice.hours`, and hands off to the real Zocdoc profile for times.
//
// It used to render a 28-cell month grid with invented numbers under the words
// "Real-time availability on Zocdoc". Nothing was behind it: the highlighted
// days came from a hardcoded set that had Tuesday and Saturday closed, when the
// practice is open both. `aria-hidden` kept it out of the accessibility tree but
// did nothing for the sighted patient reading a real-time claim over it.
//
// Do not reintroduce a grid here. Zocdoc's Book Online Button opens a scheduling
// modal; it does not provide an embeddable availability grid, so any grid in this
// card is invented by definition.

export function HeroBooking() {
  // The practice is in Oradell NJ. Naming the zone matters: without it the
  // server renders "today" in UTC, so from 20:00 ET onward it highlights
  // tomorrow's row for every visitor.
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "America/New_York",
  });

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="overflow-hidden rounded-3xl border border-line bg-card shadow-[0_40px_90px_-42px_rgba(18,60,70,0.45)]">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-5 md:px-7 md:py-6">
          <div>
            <p className="font-display text-xl font-medium text-teal md:text-2xl">Book an appointment</p>
            <p className="mt-1 text-sm text-ink-soft">Oradell, and on Zocdoc</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-clay-soft px-3 py-1.5 text-sm font-medium text-clay">
            <Star className="size-3.5 fill-clay" aria-hidden /> {REVIEW_STATS.rating.toFixed(1)}
          </span>
        </div>

        <div className="px-5 py-6 md:px-7">
          <div className="mb-4 flex items-center justify-between text-sm text-ink-soft">
            <span>Riverdell Vision · Oradell</span>
            <span className="font-mono text-xs uppercase tracking-wide">Opening hours</span>
          </div>

          <dl className="divide-y divide-line">
            {practice.hours.map((h) => {
              const isToday = h.day === today;
              return (
                <div
                  key={h.day}
                  className={
                    "flex items-baseline justify-between gap-4 py-2.5 text-[0.95rem] " +
                    (isToday ? "font-medium text-teal" : "text-ink")
                  }
                >
                  <dt>
                    {h.day}
                    {isToday ? <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-wide">Today</span> : null}
                  </dt>
                  <dd className={h.open ? "tabular-nums" : "tabular-nums text-ink-soft"}>{h.label}</dd>
                </div>
              );
            })}
          </dl>

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
