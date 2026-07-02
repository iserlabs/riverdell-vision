"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Star, MapPin } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { BookButton } from "@/components/site/cta";
import { Magnetic } from "@/components/site/magnetic";
import { primaryNav, practice } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Return keyboard focus to the trigger of whichever menu was open,
        // so focus is never stranded on a now-hidden panel link (WCAG 2.4.3).
        setOpenMenu((cur) => {
          if (cur) triggerRefs.current[cur]?.focus();
          return null;
        });
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility strip: NAP + proof, reinforces local SEO and premium tone */}
      <div className="hidden bg-teal-deep text-bone md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-1.5 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {practice.address.street}, {practice.address.city} {practice.address.region}
          </span>
          <span className="inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-brass text-brass" aria-hidden />
              {REVIEW_STATS.rating.toFixed(1)} · {REVIEW_STATS.count} Google reviews
            </span>
            <a href={practice.phoneHref} className="font-medium hover:text-bone">
              {practice.phone}
            </a>
          </span>
        </div>
      </div>

      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-bone/90 backdrop-blur-md"
            : "border-transparent bg-bone/70 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3 md:px-8">
          <Logo className="text-teal-deep" />

          <nav
            ref={navRef}
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {primaryNav.map((group, gi) => {
              const isOpen = openMenu === group.label;
              const id = `nav-${group.label.toLowerCase()}`;
              const wide = group.children.length > 4;
              return (
                <div key={group.label} className="relative">
                  <button
                    ref={(el) => {
                      triggerRefs.current[group.label] = el;
                    }}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpenMenu(isOpen ? null : group.label)}
                    className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-teal aria-expanded:text-teal"
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "size-4 opacity-60 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={id}
                    className={cn(
                      "absolute top-full pt-2 transition-all duration-200",
                      gi === 0 ? "left-0" : "right-0",
                      wide ? "w-[44rem]" : "w-72",
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0",
                    )}
                  >
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl border border-line bg-card p-2 shadow-xl shadow-ink/10",
                        wide && "flex gap-2",
                      )}
                    >
                      <div className={cn(wide && "grid flex-1 grid-cols-2 gap-0.5")}>
                        {group.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            tabIndex={isOpen ? 0 : -1}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-teal-tint"
                          >
                            <span className="block text-sm font-medium text-ink">
                              {c.label}
                            </span>
                            <span className="block text-xs text-ink-soft">
                              {c.note}
                            </span>
                          </Link>
                        ))}
                      </div>
                      {wide && (
                        <div className="flex w-56 shrink-0 flex-col justify-between rounded-xl bg-teal p-5 text-bone">
                          <div>
                            <p className="font-display text-xl leading-tight">
                              Ready when you are.
                            </p>
                            <p className="mt-2 text-[13px] leading-snug text-bone/90">
                              Book online in real time, or call the office. New and
                              returning patients welcome.
                            </p>
                          </div>
                          <div className="mt-6">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="size-3.5 fill-brass text-brass" aria-hidden />
                              ))}
                            </div>
                            <p className="mt-1.5 text-[11px] text-bone/90">
                              {REVIEW_STATS.rating.toFixed(1)} · {REVIEW_STATS.count} Google
                              {"  ·  "}
                              {REVIEW_STATS.zocdocRating.toFixed(1)} · {REVIEW_STATS.zocdocCount} Zocdoc
                            </p>
                            <Link
                              href="/book"
                              tabIndex={isOpen ? 0 : -1}
                              onClick={() => setOpenMenu(null)}
                              className="mt-3 flex h-10 items-center justify-center rounded-lg bg-bone text-sm font-medium text-teal-deep transition-colors hover:bg-bone/90"
                            >
                              Request an appointment
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              href="/oradell"
              className="rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:text-teal"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-teal transition-colors hover:text-teal-deep lg:inline-flex"
            >
              Patient Portal
            </Link>
            <Magnetic className="hidden sm:inline-flex">
              <BookButton size="sm" />
            </Magnetic>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                className="inline-flex size-11 items-center justify-center rounded-md border border-line text-ink lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[88vw] max-w-sm">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <Logo className="text-teal-deep" />
                  </SheetTitle>
                </SheetHeader>
                <nav
                  className="flex flex-col gap-1 px-4"
                  aria-label="Mobile primary"
                >
                  {primaryNav.map((group) => (
                    <div key={group.label} className="py-2">
                      <p className="eyebrow px-2 pb-1 text-ink-soft">
                        {group.label}
                      </p>
                      {group.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex min-h-11 items-center rounded-lg px-2 py-3 text-[15px] font-medium text-ink hover:bg-teal-tint"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </nav>
                <div
                  className="mt-2 flex flex-col gap-2 px-4"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <Link
                      href="/portal"
                      className="flex min-h-11 flex-1 items-center rounded-lg px-2 text-[15px] font-medium text-teal hover:bg-teal-tint"
                    >
                      Patient Portal
                    </Link>
                    <Link
                      href="/oradell"
                      className="flex min-h-11 flex-1 items-center rounded-lg px-2 text-[15px] font-medium text-ink hover:bg-teal-tint"
                    >
                      Contact
                    </Link>
                  </div>
                  <BookButton className="w-full" />
                  <a
                    href={practice.phoneHref}
                    className="text-center text-sm font-medium text-teal"
                  >
                    {practice.phone}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
