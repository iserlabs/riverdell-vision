import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Building2,
  Microscope,
  Users,
  Rocket,
} from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { practice, providers } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Growth & Expansion | Riverdell Vision, Oradell to Fort Lee",
  description:
    "How Riverdell Vision, a physician-led family optometry practice in Oradell, NJ, is extending its specialty-care model to a second office in Fort Lee. Operating record, market, and plan.",
  alternates: { canonical: "/growth" },
};

// Real, verifiable operating record. Nothing here is projected.
const RECORD = [
  { value: "Since 2016", label: "Serving Bergen County", note: "A decade of continuous, physician-led family eye care in Oradell." },
  { value: `${REVIEW_STATS.rating.toFixed(1)} / ${REVIEW_STATS.count}`, label: "Google rating & reviews", note: `A genuine ${REVIEW_STATS.rating.toFixed(1)}-star average, plus ${REVIEW_STATS.zocdocRating.toFixed(1)} across ${REVIEW_STATS.zocdocCount} Zocdoc reviews.` },
  { value: `${providers.length} doctors`, label: "Credentialed optometrists", note: "Including a Fellow of the College of Optometrists in Vision Development." },
  { value: "6 programs", label: "Specialty programs in-house", note: "Myopia, Ortho-K, dry eye, specialty lenses, vision therapy, neuro-rehab." },
];

const WHY_FORT_LEE = [
  {
    icon: MapPin,
    title: "The demand already travels",
    body: "Patients across the Palisades already drive to Oradell for specialty care that most local offices refer out. A Fort Lee office meets those families closer to home.",
  },
  {
    icon: Users,
    title: "A community we already serve",
    body: "Fort Lee and Palisades Park have a large Korean-American community, and Riverdell already delivers bilingual English and Korean care under Dr. Mina Han. The fit is real, not aspirational.",
  },
  {
    icon: Building2,
    title: "A regional gateway",
    body: "Fort Lee sits at the George Washington Bridge, one of the busiest commercial corridors in the region, with dense, established residential neighborhoods around it.",
  },
];

const PLAN = [
  {
    phase: "Now",
    title: "Compound demand from Oradell",
    body: "Grow qualified organic demand through the specialty service pages, localized Bergen County pages, and an answer hub built to be found, then convert it with same-day, one-business-day follow-up.",
  },
  {
    phase: "Pre-opening",
    title: "Build the Fort Lee waitlist",
    body: "Stand up the Fort Lee interest list and referral pipeline ahead of the lease, so the second office opens into demand rather than cold.",
  },
  {
    phase: "2027",
    title: "Open the second office",
    body: "Extend the same physician-led model and specialty programs to Fort Lee, staffed to carry the standard of care that earned the Oradell reviews.",
  },
  {
    phase: "Ongoing",
    title: "Report from one system",
    body: "Owner and lender reporting runs from the same operations platform that manages inquiries and pipeline, so performance is visible, not anecdotal.",
  },
];

const USE_OF_FUNDS = [
  { icon: Building2, title: "Clinical build-out", body: "A second office in Fort Lee, fitted for exams and specialty-lens work." },
  { icon: Microscope, title: "Diagnostic equipment", body: "The imaging and fitting technology the specialty programs depend on." },
  { icon: Users, title: "Clinical team", body: "Optometrists and staff who carry the same standard of care." },
  { icon: Rocket, title: "Pre-opening & working capital", body: "Waitlist marketing and runway to a steady patient base." },
];

export default function GrowthPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Growth & Expansion", path: "/growth" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-teal-deep text-bone grain">
        <Image
          src="/images/fort-lee.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/90 to-teal-deep/50" />
        <Container wide className="relative">
          <div className="max-w-2xl pb-16 pt-6 md:pb-24 md:pt-10">
            <Breadcrumb
              items={[{ name: "Home", href: "/" }, { name: "Growth & Expansion" }]}
            />
            <p className="eyebrow mt-8 text-brass">Growth &amp; expansion</p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-bone md:text-[3.6rem]">
              A decade in Oradell.{" "}
              <span className="italic text-brass">Next, Fort Lee.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone/85">
              Riverdell Vision built a trusted, physician-led practice one
              careful exam at a time. A second office in Fort Lee extends that
              same specialty-care model to the Palisades, where the demand
              already is.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/fort-lee"
                className="inline-flex h-12 items-center gap-2 rounded-md bg-bone px-6 text-[15px] font-medium text-teal-deep shadow-sm shadow-ink/20 transition-colors hover:bg-bone/90"
              >
                Join the Fort Lee list
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/growth/data-room"
                className="inline-flex h-12 items-center gap-2 rounded-md border border-bone/35 px-6 text-[15px] font-medium text-bone transition-colors hover:bg-bone/10"
              >
                For lenders &amp; partners
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Operating record */}
      <Section>
        <Container wide>
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="eyebrow text-clay">The operating record</p>
              <p className="text-sm text-ink-soft">
                Every figure here is public and verifiable.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {RECORD.map((r, i) => (
              <Reveal key={r.label} delay={i * 70}>
                <div className="flex h-full flex-col border-t border-line pt-5">
                  <p className="font-display text-[2.4rem] font-medium leading-none text-teal">
                    {r.value}
                  </p>
                  <p className="mt-4 font-display text-lg font-medium text-ink">
                    {r.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {r.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Fort Lee */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section className="py-16 md:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Why Fort Lee, why now"
                title="A second location the map already argues for."
                lead="This is not a bet on a new market. It is a shorter drive for families the practice already serves."
              />
            </Reveal>
            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {WHY_FORT_LEE.map((w, i) => (
                <Reveal key={w.title} delay={i * 80}>
                  <div>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                      <w.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-medium text-ink">
                      {w.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{w.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* The plan */}
      <Section>
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="The plan"
              title="Grown deliberately, not overnight."
              lead="The same discipline that built the Oradell practice governs the expansion."
            />
          </Reveal>
          <ol className="mt-12 space-y-0">
            {PLAN.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <li className="grid gap-x-8 gap-y-2 border-t border-line py-7 md:grid-cols-[0.25fr_0.75fr]">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm tabular-nums text-clay">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow text-ink-soft">{p.phase}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-medium text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Use of funds */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section className="py-16 md:py-24">
            <Reveal>
              <SectionHeading
                eyebrow="Where the capital goes"
                title="Four places, all in service of the same standard."
                lead="Specific amounts are shared privately in diligence. The categories are simple."
              />
            </Reveal>
            <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {USE_OF_FUNDS.map((u, i) => (
                <Reveal key={u.title} delay={i * 70}>
                  <div className="border-t border-line pt-5">
                    <u.icon className="size-6 text-teal" aria-hidden />
                    <h3 className="mt-4 font-display text-lg font-medium text-ink">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {u.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* Closing: lender / partner CTA */}
      <section className="bg-teal text-bone">
        <Container wide>
          <div className="flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
            <div className="max-w-xl">
              <p className="eyebrow text-brass">For lenders &amp; partners</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.5rem]">
                Reviewing Riverdell for the Fort Lee raise?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-bone/85">
                The expansion brief goes deeper: the operating detail, market,
                an illustrative model, and the documents available in diligence.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/growth/data-room"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-bone px-6 text-[15px] font-medium text-teal-deep transition-colors hover:bg-bone/90"
              >
                View the expansion brief
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={practice.phoneHref}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-bone/35 px-6 text-[15px] font-medium text-bone transition-colors hover:bg-bone/10"
              >
                Or call {practice.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
