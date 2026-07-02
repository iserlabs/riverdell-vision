"use client";

import { useEffect, useRef, useState } from "react";

// Shared scroll-trigger for the section system. Returns a ref + a boolean that
// flips true when the element scrolls into view. Reduced-motion users get true
// immediately (no animation), and a backstop timer guarantees content is never
// stranded if the observer never fires (short pages / no scroll).
export function useInView<T extends Element>(opts?: {
  threshold?: number;
  backstop?: number;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: opts?.threshold ?? 0.2 },
    );
    io.observe(el);
    const t = window.setTimeout(() => setInView(true), opts?.backstop ?? 2600);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return { ref, inView };
}
