import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { WaitlistForm } from "@/components/marketing/waitlist-form";
import { ServiceIcon } from "@/components/site/service-icon";
import { SERVICE_LADDER } from "@/lib/services";
import { fortLee } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coming Soon to Fort Lee, NJ | Riverdell Vision",
  description:
    "Riverdell Vision is opening a second office in Fort Lee, NJ, bringing myopia management, dry eye care, and specialty lenses to the Palisades communities. Join the waitlist.",
  alternates: { canonical: "/fort-lee" },
};

const flagship = SERVICE_LADDER.filter((s) => s.flagship);

export default function FortLeePage() {
  return (
    <>
      {/* Hero over Fort Lee imagery */}
      <section className="relative overflow-hidden bg-teal-deep text-bone">
        <Image
          src="/images/fort-lee.jpeg"
          alt="The George Washington Bridge and Palisades cliffs near Fort Lee, New Jersey at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/70 via-teal-deep/80 to-teal-deep" />
        <Container wide className="relative">
          <div className="max-w-2xl py-24 md:py-32">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-deep/70 px-3.5 py-1.5 text-sm font-medium text-brass ring-1 ring-bone/20">
                <Sparkles className="size-4" aria-hidden /> {fortLee.status}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] text-bone md:text-6xl">
                Riverdell Vision is coming to Fort Lee.
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-bone/80">
                {fortLee.blurb} The same physician-led, prevention-first care our
                Oradell families trust, closer to the Palisades.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Two column: what's coming + waitlist */}
      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="What's coming to Fort Lee"
                  title="Specialty eye care for the Palisades."
                  lead="Our second location will offer the full Riverdell Vision program from day one."
                />
              </Reveal>
              <div className="mt-8 space-y-3">
                {flagship.map((s, i) => (
                  <Reveal key={s.title} delay={i * 70}>
                    <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal text-bone">
                        <ServiceIcon name={s.icon} className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-medium text-ink">{s.title}</h3>
                        <p className="text-sm text-ink-soft">{s.blurb}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={240}>
                <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-line bg-bone-deep p-4 text-sm text-ink-soft">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
                  <span>
                    Serving {fortLee.areas.join(", ")} and the surrounding
                    Bergen County communities.
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="rounded-3xl bg-teal-deep p-2">
              <div className="rounded-[1.35rem] bg-teal-deep p-6 text-bone md:p-8">
                <h2 className="font-display text-2xl font-medium text-bone">
                  Be first in line.
                </h2>
                <p className="mt-2 text-bone/75">
                  Join the interest list for opening news and early appointment
                  access for your family.
                </p>
                <div className="mt-6">
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
