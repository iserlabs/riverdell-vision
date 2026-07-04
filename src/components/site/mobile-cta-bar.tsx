"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { practice, CONTACT_CTA } from "@/lib/site";
import { cn } from "@/lib/utils";

// Persistent mobile conversion bar. The marketing pages run thousands of pixels
// tall on a phone; without this, the primary action lives only inside the
// hamburger. Fixed to the bottom on small screens, with a spacer so it never
// covers the last of the footer, and safe-area padding for notched devices.
//
// It stays hidden on the hero fold (where the hero already carries the primary
// CTA + phone) and slides up once the visitor scrolls past it, so it reads as a
// deliberate follow-along bar rather than a duplicate stuck over the hero.
export function MobileCtaBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="h-[4.75rem] lg:hidden" />
      <div
        aria-hidden={!shown}
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 backdrop-blur-md lg:hidden pb-[env(safe-area-inset-bottom)]",
          "transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
          shown
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        <div className="mx-auto flex max-w-lg items-center gap-2.5 px-4 py-3">
          <Link
            href={CONTACT_CTA.book}
            tabIndex={shown ? 0 : -1}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-teal font-medium text-bone shadow-sm shadow-ink/10 transition-colors hover:bg-teal-deep"
          >
            <CalendarCheck className="size-4" aria-hidden />
            {CONTACT_CTA.bookLabel}
          </Link>
          <a
            href={practice.phoneHref}
            tabIndex={shown ? 0 : -1}
            aria-label={`Call the office at ${practice.phone}`}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-teal/30 text-teal transition-colors hover:bg-teal-tint"
          >
            <Phone className="size-5" aria-hidden />
          </a>
        </div>
      </div>
    </>
  );
}
