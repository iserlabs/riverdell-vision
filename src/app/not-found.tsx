import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { btn } from "@/lib/ui";
import { practice, CONTACT_CTA } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export default function NotFound() {
  const top = SERVICES.slice(0, 6);
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="eyebrow text-clay">Page not found</p>
          <h1 className="mt-3 font-display text-3xl text-teal md:text-4xl">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 text-ink-soft">
            The link may be old or mistyped. Here are good places to pick back up.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={btn()}>
              Back to home
            </Link>
            <Link href={CONTACT_CTA.book} className={btn({ variant: "outline" })}>
              {CONTACT_CTA.bookLabel}
            </Link>
            <a href={practice.phoneHref} className={btn({ variant: "ghost" })}>
              Call {practice.phone}
            </a>
          </div>
          <nav aria-label="Popular services" className="mt-12 grid gap-2 text-left sm:grid-cols-2">
            {top.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal hover:text-teal"
              >
                {s.name}
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
