"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * "Into focus" signature interaction. The scene sits gently out of focus
 * (uncorrected vision); a circular lens following the pointer (or drifting on
 * its own at rest, or draggable on touch) brings crisp clarity wherever it
 * passes. Progressive enhancement: with no JS or reduced motion it settles to a
 * sharp-center poster. GPU-composited CSS mask, no heavy runtime.
 */
export function FocusLens({
  src,
  alt,
  radius = 135,
}: {
  src: string;
  alt: string;
  radius?: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const pos = { x: 0.5, y: 0.46 };
    const target = { x: 0.5, y: 0.46 };
    let idle = true;
    let t = 0;
    let raf = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    const apply = () => {
      el.style.setProperty("--lx", `${pos.x * 100}%`);
      el.style.setProperty("--ly", `${pos.y * 100}%`);
    };
    const loop = () => {
      t += 0.01;
      if (idle && !reduce) {
        target.x = 0.5 + Math.sin(t) * 0.24;
        target.y = 0.46 + Math.cos(t * 0.82) * 0.17;
      }
      pos.x += (target.x - pos.x) * 0.09;
      pos.y += (target.y - pos.y) * 0.09;
      apply();
      raf = requestAnimationFrame(loop);
    };
    apply();
    raf = requestAnimationFrame(loop);

    const move = (cx: number, cy: number) => {
      const r = el.getBoundingClientRect();
      target.x = Math.min(Math.max((cx - r.left) / r.width, 0), 1);
      target.y = Math.min(Math.max((cy - r.top) / r.height, 0), 1);
      idle = false;
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => (idle = true), 2400);
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
    };
    el.addEventListener("pointermove", onPointer);
    el.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointer);
      el.removeEventListener("touchmove", onTouch);
      clearTimeout(idleTimer);
    };
  }, []);

  const mask = `radial-gradient(circle ${radius}px at var(--lx) var(--ly), transparent 52%, #000 74%)`;

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[16/10] w-full touch-none overflow-hidden rounded-[1.75rem] border border-line shadow-[0_40px_90px_-50px_rgba(18,60,70,0.5)]"
      style={{ ["--lx" as string]: "50%", ["--ly" as string]: "46%" }}
    >
      {/* Sharp base (also the no-JS / LCP element) */}
      <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {/* Blurred overlay, punched through by the lens mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${src})`,
          filter: "blur(12px) saturate(0.9) brightness(0.97)",
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />
      {/* Lens ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-bone/70"
        style={{
          left: "var(--lx)",
          top: "var(--ly)",
          width: radius * 2,
          height: radius * 2,
          boxShadow:
            "0 0 0 1px rgba(18,60,70,0.35), 0 14px 40px -10px rgba(0,0,0,0.45)",
        }}
      />
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-deep/70 px-4 py-1.5 text-xs font-medium text-bone backdrop-blur">
        Move to bring the world into focus
      </div>
    </div>
  );
}
