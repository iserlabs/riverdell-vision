import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { primaryNav, practice, fortLee } from "@/lib/site";

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.3-.04-1.3-.13-2.46-.13-2.43 0-4.1 1.48-4.1 4.2v2.34H7.7V13h2.74v8h3.06Z" />
    </svg>
  );
}

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-teal-deep text-bone">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-4">
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/70">
            {practice.tagline} Physician-led eye care for children, adults, and
            seniors across Bergen County, New Jersey.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={practice.socials.facebook}
              aria-label="Facebook"
              className="inline-flex size-11 items-center justify-center rounded-full border border-bone/25 transition-colors hover:bg-bone/10 md:size-9"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={practice.socials.instagram}
              aria-label="Instagram"
              className="inline-flex size-11 items-center justify-center rounded-full border border-bone/25 transition-colors hover:bg-bone/10 md:size-9"
            >
              <Instagram className="size-4" />
            </a>
          </div>
        </div>

        <nav className="md:col-span-2" aria-label="Care">
          <p className="eyebrow text-brass">Care</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {primaryNav[0].children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-bone/75 hover:text-bone">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2" aria-label="Practice">
          <p className="eyebrow text-brass">Practice</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/portal" className="font-medium text-bone hover:text-brass">
                Patient Portal
              </Link>
            </li>
            {primaryNav[1].children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="text-bone/75 hover:text-bone">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="text-bone/75 hover:text-bone">
                Areas we serve
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="eyebrow text-brass">Visit</p>
          <ul className="mt-4 space-y-3 text-sm text-bone/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <a href={practice.maps} className="hover:text-bone">
                {practice.address.full}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <a href={practice.phoneHref} className="hover:text-bone">
                {practice.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              <a href={`mailto:${practice.email}`} className="hover:text-bone">
                {practice.email}
              </a>
            </li>
          </ul>
          <div className="mt-6 rounded-xl border border-bone/15 bg-bone/5 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-brass">
              {fortLee.status}
            </p>
            <p className="mt-1 text-sm text-bone/80">
              A second office is coming to Fort Lee.{" "}
              <Link
                href="/fort-lee"
                className="inline-flex items-center gap-0.5 font-medium text-bone underline-offset-2 hover:underline"
              >
                Join the list <ArrowUpRight className="size-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-bone/60 md:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Riverdell Vision. All rights reserved.</p>
          <div className="-mx-2 flex items-center gap-3 md:mx-0 md:gap-5">
            <Link
              href="/privacy"
              className="-my-3.5 flex items-center px-2 py-3.5 hover:text-bone md:mx-0 md:my-0 md:px-0 md:py-0"
            >
              Privacy
            </Link>
            <Link
              href="/accessibility"
              className="-my-3.5 flex items-center px-2 py-3.5 hover:text-bone md:mx-0 md:my-0 md:px-0 md:py-0"
            >
              Accessibility
            </Link>
            <a
              href="/sitemap.xml"
              className="-my-3.5 flex items-center px-2 py-3.5 hover:text-bone md:mx-0 md:my-0 md:px-0 md:py-0"
            >
              Sitemap
            </a>
            <Link
              href="/dashboard"
              className="-my-3.5 flex items-center px-2 py-3.5 hover:text-bone md:mx-0 md:my-0 md:px-0 md:py-0"
            >
              Team portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
