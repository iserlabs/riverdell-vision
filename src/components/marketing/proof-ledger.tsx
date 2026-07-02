"use client";

import { useEffect, useState } from "react";
import { Star, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { useInView } from "@/lib/use-in-view";
import { practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

// Editorial proof ledger: no boxes. Oversized count-up numerals in a hairline-
// ruled row, five-star marks that draw in, and source links out to the real
// profiles. Honest data only. Reduced-motion + no-scroll fall back to the value.
type Stat = {
  value: number;
  rating?: string;
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
    label: "Google reviews",
    note: "A genuine five-star average from real patients.",
    href: practice.socials.google,
    linkText: "Read them on Google",
  },
  {
    value: REVIEW_STATS.zocdocCount,
    rating: REVIEW_STATS.zocdocRating.toFixed(1),
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

function useCountUp(target: number, run: boolean, delay: number, ms = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    let startT = 0;
    const to = window.setTimeout(() => {
      const tick = (t: number) => {
        if (!startT) startT = t;
        const p = Math.min(1, (t - startT) / ms);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(to);
      cancelAnimationFrame(raf);
    };
  }, [run, target, delay, ms]);
  return n;
}

function LedgerCell({ stat, run, i }: { stat: Stat; run: boolean; i: number }) {
  const n = useCountUp(stat.value, run, i * 160);
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
          </>
        ) : (
          <span className="eyebrow text-clay">{stat.kicker}</span>
        )}
      </div>

      {/* Oversized numeral */}
      <p className="mt-5 font-display text-[4.75rem] font-medium leading-[0.85] tracking-tight text-teal tabular-nums md:text-[6.5rem]">
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
          className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
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
    <section ref={ref} className="border-y border-line bg-bone-deep">
      <Container wide className="py-14 md:py-20">
        <div className="flex items-baseline justify-between">
          <p className="eyebrow text-clay">The record</p>
          <p className="hidden text-sm text-ink-soft sm:block">
            Real ratings, verified by patients
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
