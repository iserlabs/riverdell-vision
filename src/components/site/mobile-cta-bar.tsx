import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { practice, CONTACT_CTA } from "@/lib/site";

// Persistent mobile conversion bar. The marketing pages run thousands of pixels
// tall on a phone; without this, the primary action lives only inside the
// hamburger. Fixed to the bottom on small screens, with a spacer so it never
// covers the last of the footer, and safe-area padding for notched devices.
export function MobileCtaBar() {
  return (
    <>
      <div aria-hidden className="h-[4.75rem] lg:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bone/95 backdrop-blur-md lg:hidden pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-lg items-center gap-2.5 px-4 py-3">
          <Link
            href={CONTACT_CTA.book}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-teal font-medium text-bone shadow-sm shadow-ink/10 transition-colors hover:bg-teal-deep"
          >
            <CalendarCheck className="size-4" aria-hidden />
            {CONTACT_CTA.bookLabel}
          </Link>
          <a
            href={practice.phoneHref}
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
