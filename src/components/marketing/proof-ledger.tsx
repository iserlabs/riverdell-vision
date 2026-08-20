"use client";

import { Star, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { GoogleG, ZocdocMark } from "@/components/site/reviews";
import { useInView } from "@/lib/use-in-view";
import { practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

// Editorial proof ledger: no boxes. Oversized count-up numerals in a hairline-
// ruled row, five-star marks that draw in, and source links out to the real
// profiles. Honest data only. Reduced-motion + no-scroll fall back to the value.
type Stat = {
  value: number;
  rating?: string;
  source?: "Google" | "Zocdoc";
  kicker?: string;
  label: string;
  note: string;
  href?: string;
  linkText?: string;
};

const STATS: Stat[] = [
  {
    value: REVIEW_STATS.count,
    rating: REVIEW_STATS.rating.toFixed(1),
    source: "Google",
    label: "Google reviews",
    note: "A genuine five-star average from real patients.",
    href: practice.socials.google,
    linkText: "Read them on Google",
  },
  {
    value: REVIEW_STATS.zocdocCount,
    rating: REVIEW_STATS.zocdocRating.toFixed(1),
    source: "Zocdoc",
    label: "Zocdoc reviews",
    note: "Verified by patients who booked through Zocdoc.",
    href: practice.zocdocUrl,
    linkText: "See our Zocdoc",
  },
  {
    value: 10,
    kicker: "Since 2016",
    label: "Years of family eye care",
    note: "Caring for Bergen County families in Oradell, NJ.",
  },
];

// Counts up to `target` when the ledger scrolls into view. The initial state is
// the REAL target (so the server-rendered HTML shows 448/396/10, not 0, which
// matters for crawlers and AI answer engines that read raw HTML). The reset to

function LedgerCell({ stat, run, i }: { stat: Stat; run: boolean; i: number }) {
  /* The count-up rendered 6, 0 and 0 for the first second of every visit, which are
     the exact figures a visitor arrived to check. R1 already moved the signature onto
     the hairline, so the numbers are simply true from the first frame and the sweep
     below carries the motion. */
  const n = stat.value;
  const base = i * 160;
  return (
    <div className="relative md:px-10 md:first:pl-0 md:last:pr-0">
      {/* Eyebrow row: drawn stars for reviews, kicker for the years stat */}
      <div className="flex min-h-6 items-center gap-2.5">
        {stat.rating ? (
          <>
            <span className="flex gap-1" aria-hidden>
              {Array.from({ length: 5 }).map((_, s) => (
                <Star
                  key={s}
                  className="size-[1.15rem] fill-brass text-brass transition-all duration-300 ease-out"
                  style={{
                    opacity: run ? 1 : 0,
                    transform: run
                      ? "scale(1) translateY(0)"
                      : "scale(0.4) translateY(5px)",
                    transitionDelay: `${base + s * 90}ms`,
                  }}
                />
              ))}
            </span>
            <span className="font-mono text-xs font-medium text-ink-soft">
              {stat.rating}
            </span>
            {stat.source && (
              <span className="ml-2" role="img" aria-label={`on ${stat.source}`}>
                {stat.source === "Google" ? (
                  <GoogleG className="size-4" />
                ) : (
                  <ZocdocMark className="size-4" />
                )}
              </span>
            )}
          </>
        ) : (
          <span className="eyebrow text-clay">{stat.kicker}</span>
        )}
      </div>

      {/* Oversized numeral */}
      <p className="mt-5 font-display text-[2.125rem] font-medium leading-[0.95] tracking-tight text-teal tabular-nums md:text-[3.5rem]">
        {n.toLocaleString()}
      </p>

      {/* Hairline rule that sweeps in */}
      <span
        aria-hidden
        className="mt-6 block h-px w-20 origin-left bg-clay transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: run ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${base + 260}ms` }}
      />

      <p className="mt-5 font-display text-xl font-medium text-ink">{stat.label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{stat.note}</p>

      {stat.href && (
        <a
          href={stat.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-1 -mb-3 inline-flex items-center gap-1.5 py-3 text-sm font-medium text-teal transition-colors hover:text-teal-deep md:mt-4 md:mb-0 md:py-0"
        >
          {stat.linkText}
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      )}
    </div>
  );
}

export function ProofLedger() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.25 });

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-bone-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-20%,rgba(255,255,255,0.55),transparent_60%)]"
      />
      <Container wide className="relative py-14 md:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="eyebrow text-clay">The record</p>
          <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
            <ShieldCheck className="size-4 text-brass" aria-hidden />
            Every rating is real and patient-verified
          </p>
        </div>
        <div className="mt-10 grid gap-y-12 md:mt-14 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
          {STATS.map((s, i) => (
            <LedgerCell key={s.label} stat={s} run={inView} i={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
