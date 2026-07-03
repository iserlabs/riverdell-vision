import Link from "next/link";
import { btn } from "@/lib/ui";
import { CONTACT_CTA } from "@/lib/site";

// Reusable "no dead ends" section for leaf pages that don't already have a
// bespoke related-care block (service-view.tsx has its own "Related care"
// section; this generalizes the same idea for condition and area pages).
export function KeepExploring({
  links,
  heading = "Keep exploring",
}: {
  links: { label: string; href: string }[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="keep-exploring" className="border-t border-line bg-bone">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <h2 id="keep-exploring" className="eyebrow text-clay">{heading}</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal hover:text-teal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href={CONTACT_CTA.book} className={btn()}>{CONTACT_CTA.bookLabel}</Link>
        </div>
      </div>
    </section>
  );
}
