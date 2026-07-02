import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Clock, Car, Glasses } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { BookButton, CallButton } from "@/components/site/cta";
import { ReviewsGrid } from "@/components/site/reviews";
import { ServiceIcon } from "@/components/site/service-icon";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { practice } from "@/lib/site";
import { SERVICE_LADDER } from "@/lib/services";

export const metadata: Metadata = {
  title: "Oradell Office | Optometrist at 297 Kinderkamack Rd | Riverdell Vision",
  description:
    "Visit Riverdell Vision at 297 Kinderkamack Rd, Suite 200, Oradell, NJ 07649. Directions, parking, hours, and appointments for eye exams, myopia management, dry eye, and specialty lenses.",
  alternates: { canonical: "/oradell" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  "Riverdell Vision, " + practice.address.full,
)}&output=embed`;

export default function OradellPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Oradell Office", path: "/oradell" },
        ])}
      />

      {/* Hero */}
      <section className="bg-bone grain">
        <Container wide className="py-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Our Oradell office</Eyebrow>
              <h1 className="mt-4 font-display text-4xl font-medium leading-[1.06] text-teal md:text-5xl">
                Eye care in the heart of Oradell.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Our office on Kinderkamack Road serves Oradell, River Edge,
                Paramus, Emerson, and the surrounding Bergen County towns, with a
                calm, unhurried experience from the moment you walk in.
              </p>
              <div className="mt-7 space-y-3 text-[15px]">
                <a href={practice.maps} className="flex items-center gap-3 text-ink hover:text-teal">
                  <MapPin className="size-5 text-teal" aria-hidden />
                  {practice.address.full}
                </a>
                <a href={practice.phoneHref} className="flex items-center gap-3 text-ink hover:text-teal">
                  <Phone className="size-5 text-teal" aria-hidden />
                  {practice.phone}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookButton />
                <CallButton />
              </div>
            </div>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line shadow-xl shadow-ink/10">
                <Image
                  src="/images/office-oradell.jpeg"
                  alt="The warm, light-filled interior of Riverdell Vision in Oradell"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Map + details */}
      <Section>
        <Container wide>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map to Riverdell Vision in Oradell, NJ"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[360px] w-full md:h-[440px]"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-line bg-card p-6">
                <h2 className="flex items-center gap-2 font-medium text-ink">
                  <Clock className="size-4 text-clay" aria-hidden /> Hours
                </h2>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {practice.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-ink-soft">{h.day}</dt>
                      <dd className="text-ink">{h.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border border-line bg-card p-6">
                <h2 className="flex items-center gap-2 font-medium text-ink">
                  <Car className="size-4 text-clay" aria-hidden /> Getting here
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Suite 200, on Kinderkamack Road with convenient parking on site.
                  Easily reached from River Edge, Paramus, and Emerson, minutes
                  from Route 4 and the Garden State Parkway.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services here */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading
                eyebrow="Available at this office"
                title="Everything your family's eyes need."
              />
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_LADDER.map((s) => (
                <div
                  key={s.title}
                  className="flex items-center gap-3 rounded-xl border border-line bg-card p-4"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-lg bg-teal-tint text-teal">
                    <ServiceIcon name={s.icon} className="size-5" />
                  </span>
                  <span className="font-medium text-ink">{s.title}</span>
                </div>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* Eyewear */}
      <Section id="eyewear">
        <Container wide>
          <div className="grid items-center gap-10 rounded-3xl border border-line bg-card p-8 md:grid-cols-2 md:p-12">
            <div>
              <span className="inline-flex items-center gap-2 text-clay">
                <Glasses className="size-5" aria-hidden />
                <span className="eyebrow">The optical boutique</span>
              </span>
              <h2 className="mt-4 font-display text-3xl font-medium text-teal">
                A curated eyewear boutique, guided by clinicians.
              </h2>
              <p className="mt-4 leading-relaxed text-ink-soft">
                Our boutique pairs a carefully chosen selection of designer frames
                with the precision of a medical practice. No pressure, no upselling,
                just thoughtful guidance to find eyewear that fits your prescription,
                your face, and your life.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
              <Image
                src="/images/office-oradell.jpeg"
                alt="Designer eyewear on warm wood shelving at Riverdell Vision"
                fill
                sizes="(max-width: 768px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading eyebrow="From our Oradell patients" title="Why families choose us." />
            </Reveal>
            <div className="mt-10">
              <ReviewsGrid limit={3} />
            </div>
          </Section>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
