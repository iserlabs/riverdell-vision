import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { BookButton, CallButton } from "@/components/site/cta";
import { Magnetic } from "@/components/site/magnetic";
import { DualProof, ReviewsGrid } from "@/components/site/reviews";
import { InsuranceRow } from "@/components/site/insurance";
import { DoctorPhoto } from "@/components/site/doctor-photo";
import { HeroBooking } from "@/components/marketing/hero-booking";
import { CareFinder } from "@/components/marketing/care-finder";
import { RetailVsRiverdell } from "@/components/marketing/retail-vs-riverdell";
import { ProofLedger } from "@/components/marketing/proof-ledger";
import { EditorialIndex } from "@/components/site/editorial-index";
import { EditorialList } from "@/components/site/editorial-list";
import { ReassuranceBar } from "@/components/site/reassurance-bar";
import { CtaBand } from "@/components/site/cta-band";
import { SERVICE_LADDER } from "@/lib/services";
import { providers, fortLee } from "@/lib/site";

const PRINCIPLES = [
  {
    title: "Physician-led, not retail",
    body: "Eye health is medicine here. Every visit is a real clinical exam, not a lead-in to selling frames.",
  },
  {
    title: "Unhurried by design",
    body: "We schedule time to look carefully, explain what we see, and answer every question you have.",
  },
  {
    title: "Updated technology",
    body: "Modern diagnostics let us catch more, measure precisely, and track change over time with confidence.",
  },
  {
    title: "Care that grows with you",
    body: "One trusted practice for children, parents, and grandparents, from first exam through specialty care.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bone grain">
        <Container wide className="relative z-10">
          <div className="grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Family optometry · Oradell, New Jersey</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 max-w-xl font-display text-[3.1rem] font-medium leading-[1.04] tracking-[-0.01em] text-teal md:text-[4.1rem]">
                  The eye doctor Bergen County{" "}
                  <span className="italic text-clay">families trust.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
                  The warmth of a boutique practice with the rigor of real
                  medicine. Physician-led family eye care for every age, in a calm,
                  modern space in the heart of Oradell.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Magnetic>
                    <BookButton />
                  </Magnetic>
                  <CallButton />
                </div>
              </Reveal>
              <Reveal delay={300}>
                <DualProof className="mt-8 border-t border-line pt-6" />
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex">
                    {providers.map((p) => (
                      <div
                        key={p.slug}
                        className="relative -ml-2.5 size-11 overflow-hidden rounded-full border-[3px] border-bone first:ml-0"
                      >
                        <DoctorPhoto photo={p.photo} name={p.name} sizes="44px" />
                      </div>
                    ))}
                  </div>
                  <Link href="/about" className="text-sm font-medium text-teal hover:text-teal-deep">
                    Meet our 4 optometrists →
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <HeroBooking />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Living proof ledger */}
      <ProofLedger />

      {/* The moat: featured services */}
      <Section id="care">
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="What we are known for"
              title={
                <>
                  Specialty care most eye doctors <span className="italic text-clay">don&apos;t</span> offer.
                </>
              }
              lead="Beyond the routine exam, dedicated programs for the eye problems that need real expertise, explanation, and follow-up."
            />
          </Reveal>
          <div className="mt-12">
            <EditorialIndex items={SERVICE_LADDER} />
          </div>
        </Container>
      </Section>

      {/* Risk-reversal strip, at the point of decision */}
      <ReassuranceBar />

      {/* Care finder (signature qualifier) */}
      <section className="bg-teal-deep text-bone">
        <Container wide>
          <Section>
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <p className="eyebrow text-brass">Not sure where to start?</p>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.6rem]">
                  Find your family&apos;s care in under a minute.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-bone/75">
                  Answer two quick questions and we will point you to the right
                  starting place, and the doctor who leads it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <CareFinder />
            </Reveal>
          </Section>
        </Container>
      </section>

      {/* Head-to-head: physician-led vs retail */}
      <RetailVsRiverdell />

      {/* Approach */}
      <section className="bg-bone-deep">
        <Container wide>
          <div className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative order-last lg:order-first">
              <div className="rounded-[1.5rem] border border-line bg-card p-2 shadow-[0_30px_70px_-40px_rgba(18,60,70,0.4)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src="/images/office-oradell.jpeg"
                    alt="The warm, light-filled interior of the Riverdell Vision studio in Oradell"
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="The Riverdell difference"
                  title="A calmer, more careful kind of eye care."
                  lead="Many practices move patients through quickly. We built the opposite: a place that feels personal and takes eye health seriously."
                />
              </Reveal>
              <div className="mt-8">
                <EditorialList items={PRINCIPLES} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Meet the doctors */}
      <Section>
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="Our doctors"
              title="Caring, credentialed, and here for your family."
              align="center"
              className="mx-auto items-center text-center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {providers.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <div className="h-full overflow-hidden rounded-2xl border border-line bg-card">
                  <div className="relative aspect-[4/5]">
                    <DoctorPhoto
                      photo={p.photo}
                      name={p.name}
                      sizes="(max-width: 768px) 90vw, 24vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-medium text-teal">
                      {p.name}, {p.credential}
                    </h3>
                    <p className="mt-1 text-sm text-clay">{p.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading
                eyebrow="In patients' words"
                title="Trusted by Bergen County families."
                lead="A genuine 5.0 across 448 Google reviews, and 4.9 on Zocdoc."
              />
            </Reveal>
            <Reveal delay={120} className="mt-12">
              <ReviewsGrid limit={6} />
            </Reveal>
          </Section>
        </Container>
      </section>

      {/* Insurance */}
      <Section>
        <Container wide>
          <div className="rounded-3xl border border-line bg-card p-8 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-md">
                <Eyebrow>Insurance & payment</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-medium text-teal">
                  Most major plans accepted.
                </h2>
                <p className="mt-3 text-ink-soft">
                  We accept vision and medical plans and offer flexible financing
                  through Cherry. Not sure about your coverage? Our team will check
                  before your visit.
                </p>
              </div>
              <InsuranceRow className="lg:max-w-md lg:justify-end" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Fort Lee expansion */}
      <section className="relative overflow-hidden bg-teal-deep text-bone">
        <Image
          src="/images/fort-lee.jpeg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/85 to-teal-deep/40" />
        <Container wide className="relative">
          <div className="max-w-xl py-20 md:py-28">
            <Reveal>
              <p className="eyebrow text-brass">{fortLee.status}</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.6rem]">
                Riverdell Vision is coming to Fort Lee.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-bone/80">
                {fortLee.blurb} Join the interest list to be first to know when we
                open, and to reserve early appointments for your family.
              </p>
              <div className="mt-8">
                <Link
                  href="/fort-lee"
                  className="inline-flex items-center gap-2 rounded-xl bg-bone px-6 py-3 font-medium text-teal-deep transition-colors hover:bg-bone/90"
                >
                  Join the Fort Lee list
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
