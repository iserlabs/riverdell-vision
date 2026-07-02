import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { CtaBand } from "@/components/site/cta-band";
import { AREAS } from "@/lib/areas";

export const metadata: Metadata = {
  title: "Areas We Serve | Bergen County Eye Care | Riverdell Vision",
  description:
    "Riverdell Vision serves Oradell, River Edge, Paramus, Emerson, Fort Lee, and Bergen County with eye exams, myopia management, dry eye care, and specialty lenses.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <Section>
        <Container wide>
          <SectionHeading
            eyebrow="Areas we serve"
            title="Eye care across Bergen County."
            lead="From our Oradell office we care for families throughout the area. Find your town or the specialty care you are looking for."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-teal/40"
              >
                <span className="font-medium text-ink">{a.h1}</span>
                <ArrowRight className="size-5 shrink-0 text-teal transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
