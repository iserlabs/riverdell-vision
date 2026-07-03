"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/use-in-view";

// Connected-journey timeline for numbered step/process sections. Replaces the
// flat card grid: nodes sit on a hairline track that DRAWS itself in on scroll
// (horizontal on desktop, vertical on mobile), with each step staggering in.
export function ProcessTimeline({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.22 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    setMounted(true);
  }, [ref]);
  // Visible by default (SSR + no-JS): only hide once JS has mounted AND the
  // element is confirmed still off-screen, mirroring reveal.tsx's contract.
  const hidden = mounted && !inView;
  const n = steps.length;

  return (
    <div ref={ref}>
      {/* Desktop: horizontal track */}
      <ol
        className="relative hidden gap-8 md:grid"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[26px] h-px bg-line"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[26px] h-px origin-left bg-teal transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: hidden ? "scaleX(0)" : "scaleX(1)" }}
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative">
            <span
              className="relative z-10 flex size-[52px] items-center justify-center rounded-full border border-teal/15 bg-teal font-mono text-sm font-medium text-bone shadow-sm transition-all duration-500 ease-out"
              style={{
                transitionDelay: `${i * 160}ms`,
                opacity: hidden ? 0 : 1,
                transform: hidden ? "scale(0.55)" : "scale(1)",
              }}
            >
              0{i + 1}
            </span>
            <h3
              className="mt-6 font-display text-xl font-medium text-teal transition-all duration-500"
              style={{
                transitionDelay: `${i * 160 + 110}ms`,
                opacity: hidden ? 0 : 1,
                transform: hidden ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {s.title}
            </h3>
            <p
              className="mt-2 text-[15px] leading-relaxed text-ink-soft transition-all duration-500"
              style={{
                transitionDelay: `${i * 160 + 190}ms`,
                opacity: hidden ? 0 : 1,
                transform: hidden ? "translateY(10px)" : "translateY(0)",
              }}
            >
              {s.body}
            </p>
          </li>
        ))}
      </ol>

      {/* Mobile: vertical track */}
      <ol className="relative md:hidden">
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-[26px] top-3 w-px bg-line"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-[26px] top-3 w-px origin-top bg-teal transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: hidden ? "scaleY(0)" : "scaleY(1)" }}
        />
        {steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-9 last:pb-0">
            <span
              className="relative z-10 flex size-[52px] shrink-0 items-center justify-center rounded-full border border-teal/15 bg-teal font-mono text-sm font-medium text-bone shadow-sm transition-all duration-500 ease-out"
              style={{
                transitionDelay: `${i * 160}ms`,
                opacity: hidden ? 0 : 1,
                transform: hidden ? "scale(0.55)" : "scale(1)",
              }}
            >
              0{i + 1}
            </span>
            <div
              className="pt-2 transition-all duration-500"
              style={{
                transitionDelay: `${i * 160 + 110}ms`,
                opacity: hidden ? 0 : 1,
                transform: hidden ? "translateY(10px)" : "translateY(0)",
              }}
            >
              <h3 className="font-display text-xl font-medium text-teal">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
