"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  blurb: string;
  href: string;
};

// The high-value ("high-ticket") care lines, led by the whole-family prevention
// story. This is the homepage's signature moving centerpiece.
const SLIDES: Slide[] = [
  {
    img: "/images/hero-care.jpeg",
    alt: "An optometrist gently guiding a young child through an eye exam beside a phoropter",
    eyebrow: "Prevention first",
    title: "Family eye care",
    blurb: "We look for what a routine exam misses, especially in growing eyes.",
    href: "/about",
  },
  {
    img: "/images/myopia.jpeg",
    alt: "A child trying on a trial frame beside a parent during a calm myopia exam",
    eyebrow: "For growing eyes",
    title: "Myopia management",
    blurb: "Slow a child's worsening nearsightedness with a real, personalized plan.",
    href: "/myopia-management",
  },
  {
    img: "/images/dry-eye.jpeg",
    alt: "An adult resting comfortably in warm light, eyes gently closed",
    eyebrow: "Real relief",
    title: "Dry eye treatment",
    blurb: "Find and treat the cause of chronic irritation, not just the symptoms.",
    href: "/dry-eye-treatment",
  },
  {
    img: "/images/specialty-lens.jpeg",
    alt: "A specialty scleral contact lens balanced on a fingertip in soft light",
    eyebrow: "When contacts fail",
    title: "Specialty & scleral lenses",
    blurb: "Custom lenses for eyes told regular contacts will not work.",
    href: "/specialty-contact-lenses",
  },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Explicit user pause (WCAG 2.2.2): a mechanism to stop the auto-advance that
  // does not depend on hovering or focusing, so keyboard and touch users can
  // halt the motion too.
  const [userPaused, setUserPaused] = useState(false);
  const reduced = useRef(false);
  const n = SLIDES.length;

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || userPaused || reduced.current) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 5200);
    return () => clearInterval(id);
  }, [paused, userPaused, n]);

  const go = (i: number) => setActive((i + n) % n);

  return (
    <div
      className="relative mx-auto w-full max-w-md"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Riverdell Vision specialty care"
    >
      <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-ink/10">
        {SLIDES.map((s, i) => (
          <div
            key={s.img}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={s.img}
              alt={i === active ? s.alt : ""}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover"
            />
          </div>
        ))}

        {/* Prev / next controls. Hidden until the carousel is hovered or a
            control is focused; a focused control is always revealed so keyboard
            users can see where they are. */}
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-bone/85 text-teal-deep opacity-0 shadow transition-opacity hover:bg-bone focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 group-hover:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-bone/85 text-teal-deep opacity-0 shadow transition-opacity hover:bg-bone focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 group-hover:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* Pause / play (WCAG 2.2.2): always reachable, not hover-gated. */}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={userPaused}
          className="absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-bone/85 text-teal-deep opacity-70 shadow transition-opacity hover:bg-bone hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
        >
          {userPaused ? <Play className="size-4" /> : <Pause className="size-4" />}
        </button>

        {/* Dots. Each has a ≥44px transparent hit area around the visible pill. */}
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2">
          {SLIDES.map((s, i) => (
            <button
              key={s.img}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${s.title}`}
              aria-current={i === active}
              className="grid h-11 place-items-center rounded-full px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bone"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full bg-bone shadow transition-all",
                  i === active ? "w-6 opacity-100" : "w-1.5 opacity-60 group-hover:opacity-90",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Overhang label card, crossfaded with the active slide (grid-stacked) */}
      <div className="absolute -bottom-5 -left-3 hidden w-[15.5rem] sm:grid">
        {SLIDES.map((s, i) => (
          <div
            key={s.img}
            aria-hidden={i !== active}
            className={cn(
              "col-start-1 row-start-1 rounded-2xl border border-line bg-card/95 p-4 shadow-lg shadow-ink/10 backdrop-blur transition-opacity duration-500",
              i === active ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.2em] text-clay">
              {s.eyebrow}
            </p>
            <p className="mt-1 font-display text-xl font-medium text-teal">
              {s.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-ink-soft">{s.blurb}</p>
            <Link
              href={s.href}
              tabIndex={i === active ? 0 : -1}
              className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal hover:gap-1.5"
            >
              Explore <ArrowRight className="size-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
