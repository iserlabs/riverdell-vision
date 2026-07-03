"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/site/service-icon";
import { useInView } from "@/lib/use-in-view";
import type { ServiceContent } from "@/lib/services";
import { cn } from "@/lib/utils";

type Item = {
  title: string;
  blurb?: string;
  href: string;
  icon: ServiceContent["icon"];
  flagship?: boolean;
};

// Editorial index: replaces a card grid with full-width numbered rows separated
// by hairlines. Big ghost numerals, line-art icon, and a lead arrow; rows
// stagger up on scroll. Reads like a magazine contents page, not a template.
export function EditorialIndex({ items }: { items: Item[] }) {
  const { ref, inView } = useInView<HTMLUListElement>({ threshold: 0.1 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    setMounted(true);
  }, [ref]);
  // Visible by default (SSR + no-JS): only hide once JS has mounted AND the
  // element is confirmed still off-screen, mirroring reveal.tsx's contract.
  const hidden = mounted && !inView;

  return (
    <ul ref={ref} className="border-t border-line">
      {items.map((it, i) => (
        <li
          key={it.title}
          className="border-b border-line"
          style={{
            opacity: hidden ? 0 : 1,
            transform: hidden ? "translateY(16px)" : "translateY(0)",
            transition:
              "opacity 640ms ease, transform 640ms cubic-bezier(0.22,1,0.36,1)",
            transitionDelay: `${i * 85}ms`,
          }}
        >
          <Link
            href={it.href}
            className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-6 md:gap-8 md:py-8"
          >
            <span className="w-9 font-display text-3xl font-medium tabular-nums text-teal/80 transition-colors duration-300 group-hover:text-clay md:w-16 md:text-5xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                    it.flagship
                      ? "bg-teal text-bone"
                      : "bg-teal-tint text-teal group-hover:bg-teal group-hover:text-bone",
                  )}
                >
                  <ServiceIcon name={it.icon} className="size-5" />
                </span>
                <h3 className="font-display text-xl font-medium text-teal md:text-2xl">
                  {it.title}
                  {it.flagship && (
                    <span className="ml-2.5 align-middle font-mono text-[0.6rem] font-medium uppercase tracking-wider text-clay">
                      Flagship
                    </span>
                  )}
                </h3>
              </div>
              {it.blurb && (
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  {it.blurb}
                </p>
              )}
            </div>
            <span className="justify-self-end text-teal">
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
