import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  LineChart,
  LayoutDashboard,
  CircleCheck,
  Phone,
  Mail,
} from "lucide-react";
import { Container } from "@/components/site/primitives";
import { ExpansionGate } from "@/components/site/expansion-gate";
import { practice, providers, fortLee } from "@/lib/site";
import { REVIEW_STATS } from "@/lib/reviews";

export const metadata: Metadata = {
  title: "Expansion Brief",
  description: "Confidential expansion overview for lenders and partners.",
  robots: { index: false, follow: false },
};

const VERIFIED = [
  { k: "Founded", v: "2016 · a decade in Oradell, NJ" },
  { k: "Reputation", v: `${REVIEW_STATS.rating.toFixed(1)} / ${REVIEW_STATS.count} Google · ${REVIEW_STATS.zocdocRating.toFixed(1)} / ${REVIEW_STATS.zocdocCount} Zocdoc` },
  { k: "Clinical team", v: `${providers.length} credentialed optometrists, incl. an FCOVD fellow` },
  { k: "Specialty programs", v: "Myopia, Ortho-K, dry eye, specialty lenses, vision therapy, neuro-rehab" },
  { k: "Second office", v: `${fortLee.city}, NJ · ${fortLee.status}` },
];

const DILIGENCE = [
  "Trailing profit & loss statements",
  "Business tax returns",
  "Patient volume, retention & payer mix",
  "Inquiry-to-booking pipeline data",
  "Fort Lee lease terms & site plan",
  "Equipment and build-out quotes",
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="eyebrow text-clay">{children}</p>
);

export default function DataRoomPage() {
  return (
    <ExpansionGate>
      <div className="bg-bone">
        {/* Brief header */}
        <section className="border-b border-line bg-teal-deep text-bone grain">
          <Container wide className="py-12 md:py-16">
            <Link
              href="/growth"
              className="inline-flex items-center gap-1.5 text-sm text-bone/70 transition-colors hover:text-bone"
            >
              <ArrowLeft className="size-4" aria-hidden /> Expansion overview
            </Link>
            <p className="eyebrow mt-8 text-brass">Expansion brief</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-bone md:text-5xl">
              The Fort Lee expansion, in detail.
            </h1>
            <p className="mt-5 flex max-w-2xl items-start gap-2.5 text-sm leading-relaxed text-bone/75">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
              Figures below are illustrative and benchmark-based unless marked{" "}
              <span className="font-medium text-bone">Verified</span>. Audited
              financials and diligence documents are shared privately under NDA.
            </p>
          </Container>
        </section>

        {/* Verified operating record */}
        <section className="border-b border-line">
          <Container wide className="py-14 md:py-16">
            <div className="flex items-center gap-2">
              <SectionLabel>Operating record</SectionLabel>
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-tint px-2.5 py-0.5 text-xs font-medium text-teal-deep">
                <CircleCheck className="size-3.5" aria-hidden /> Verified
              </span>
            </div>
            <dl className="mt-8 divide-y divide-line">
              {VERIFIED.map((r) => (
                <div
                  key={r.k}
                  className="grid gap-1 py-4 md:grid-cols-[0.28fr_0.72fr] md:gap-8"
                >
                  <dt className="font-display text-base font-medium text-ink">{r.k}</dt>
                  <dd className="text-ink-soft">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        {/* Market */}
        <section className="border-b border-line bg-bone-deep">
          <Container wide className="py-14 md:py-16">
            <SectionLabel>The market</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
              A shorter drive for families the practice already serves.
            </h2>
            <div className="mt-8 grid gap-x-12 gap-y-6 md:grid-cols-2">
              <p className="leading-relaxed text-ink-soft">
                Fort Lee and the surrounding Palisades communities, Palisades
                Park, Leonia, Edgewater, Cliffside Park, and Englewood Cliffs, are
                dense, established Bergen County neighborhoods within a short
                drive of Oradell. Patients from these towns already travel to the
                Oradell office for specialty care that most local practices refer
                out.
              </p>
              <p className="leading-relaxed text-ink-soft">
                Fort Lee and Palisades Park also have a large Korean-American
                community. Riverdell already delivers bilingual English and Korean
                care under Dr. Mina Han, so the second office opens with a
                cultural and clinical fit already in place, not one it has to
                build. Detailed demographic and catchment analysis is included in
                the diligence packet.
              </p>
            </div>
          </Container>
        </section>

        {/* Illustrative unit economics */}
        <section className="border-b border-line">
          <Container wide className="py-14 md:py-16">
            <div className="flex items-center gap-2">
              <SectionLabel>Unit economics</SectionLabel>
              <span className="inline-flex items-center gap-1 rounded-full bg-clay-soft px-2.5 py-0.5 text-xs font-medium text-clay">
                <LineChart className="size-3.5" aria-hidden /> Illustrative
              </span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
              Specialty care changes the math.
            </h2>
            <div className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-[0.55fr_0.45fr]">
              <div className="space-y-4 leading-relaxed text-ink-soft">
                <p>
                  A routine, glasses-first visit is a single transaction. A
                  specialty patient, myopia management, Ortho-K, or scleral
                  lenses, is a multi-year, multi-visit clinical relationship with
                  materially higher retention and lifetime value.
                </p>
                <p>
                  That specialty mix is the engine of the Oradell practice, and it
                  is what Fort Lee replicates, rather than competing on price for
                  routine exams. Actual per-patient value, payer mix, and margins
                  are provided in diligence.
                </p>
              </div>
              <div className="rounded-2xl border border-line bg-card p-6">
                <p className="text-sm font-medium text-ink">
                  Illustrative value drivers
                </p>
                <ul className="mt-4 space-y-3 text-sm text-ink-soft">
                  {[
                    ["Routine exam", "Single visit, vision-plan reimbursed"],
                    ["Myopia program", "Multi-year, recurring, private-pay share"],
                    ["Specialty lenses", "High-value fit + annual renewals"],
                    ["Medical eye care", "Medically billed, recurring monitoring"],
                  ].map(([a, b]) => (
                    <li key={a} className="flex items-start justify-between gap-3 border-t border-line pt-3 first:border-t-0 first:pt-0">
                      <span className="font-medium text-ink">{a}</span>
                      <span className="text-right text-ink-soft">{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                  Directional, for structure only. Not Riverdell actuals.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Operations system */}
        <section className="border-b border-line bg-bone-deep">
          <Container wide className="py-14 md:py-16">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <SectionLabel>The operating system</SectionLabel>
                <h2 className="mt-4 font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
                  Reporting runs on a real platform.
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  Inquiries, pipeline, and owner-and-lender reporting run from a
                  purpose-built operations dashboard, so performance is visible
                  and auditable, not anecdotal. Explore the working demo (sample
                  data).
                </p>
              </div>
              <Link
                href="/dashboard"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-teal px-6 py-3 font-medium text-teal transition-colors hover:bg-teal hover:text-bone"
              >
                <LayoutDashboard className="size-4" aria-hidden />
                Open the ops demo
              </Link>
            </div>
          </Container>
        </section>

        {/* Diligence + contact */}
        <section>
          <Container wide className="py-14 md:py-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionLabel>Available in diligence</SectionLabel>
                <h2 className="mt-4 font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
                  The documents, on request.
                </h2>
                <ul className="mt-6 space-y-3">
                  {DILIGENCE.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-ink-soft">
                      <FileText className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">
                  Shared under NDA with qualified lenders and partners.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-card p-8">
                <h3 className="font-display text-xl font-medium text-ink">
                  Talk to the practice
                </h3>
                <p className="mt-2 text-ink-soft">
                  Dr. Mina Han and the Riverdell team are glad to walk through the
                  plan and the numbers directly.
                </p>
                <div className="mt-6 space-y-3">
                  <a
                    href={practice.phoneHref}
                    className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal/40"
                  >
                    <Phone className="size-4 text-teal" aria-hidden />
                    <span className="font-medium">{practice.phone}</span>
                  </a>
                  <a
                    href={`mailto:${practice.email}?subject=Riverdell%20Vision%20%E2%80%94%20Fort%20Lee%20expansion`}
                    className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal/40"
                  >
                    <Mail className="size-4 text-teal" aria-hidden />
                    <span className="font-medium">{practice.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </ExpansionGate>
  );
}
