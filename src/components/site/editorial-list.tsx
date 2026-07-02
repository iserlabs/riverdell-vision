"use client";

import { useInView } from "@/lib/use-in-view";

// Editorial numbered list for non-link content (e.g. "what treatment involves",
// the practice principles). Hairline-ruled rows with big ghost numerals that
// stagger up on scroll. Same language as the editorial index and timeline.
export function EditorialList({
  items,
}: {
  items: { title: string; body: string; proof?: string }[];
}) {
  const { ref, inView } = useInView<HTMLOListElement>({ threshold: 0.1 });

  return (
    <ol ref={ref} className="border-t border-line">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="border-b border-line"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition:
              "opacity 600ms ease, transform 600ms cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${i * 90}ms`,
          }}
        >
          <div className="grid grid-cols-[auto_1fr] gap-5 py-6 md:gap-8 md:py-7">
            <span className="font-display text-2xl font-medium tabular-nums text-teal/80 md:text-4xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-lg font-medium text-teal md:text-xl">
                  {it.title}
                </h3>
                {it.proof && (
                  <span className="rounded-full bg-brass/12 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-clay">
                    {it.proof}
                  </span>
                )}
              </div>
              <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {it.body}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
