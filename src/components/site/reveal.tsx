"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement scroll reveal. Content is VISIBLE by default (server
 * render + no-JS + reduced-motion all show it), so nothing can ever be stranded
 * invisible and above-the-fold LCP is never gated on JS. Only elements that are
 * still below the viewport when JS boots get hidden and then animated in on
 * scroll, with a safety timeout as a backstop.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in/near view on load: leave visible, no animation (protects LCP).
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setState("hidden");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setState("shown");
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    const t = window.setTimeout(() => {
      setState("shown");
      io.disconnect();
    }, 1400);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        state === "hidden" && "opacity-0 translate-y-4",
        state === "shown" &&
          "opacity-100 translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
