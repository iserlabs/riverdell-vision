import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { BookButton, CallButton } from "@/components/site/cta";
import { Magnetic } from "@/components/site/magnetic";
import { DualProof } from "@/components/site/reviews";
import { ReviewsWall } from "@/components/site/reviews-wall";
import { InsuranceRow } from "@/components/site/insurance";
import { DoctorPhoto } from "@/components/site/doctor-photo";
import { HeroBooking } from "@/components/marketing/hero-booking";
import { CareFinder } from "@/components/marketing/care-finder";
import { StudioPanel } from "@/components/marketing/studio-panel";
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
    title: "A vision-development Fellow on staff",
    proof: "FCOVD",
    body: "Dr. Meyer is a Fellow of the College of Optometrists in Vision Development, a credential only a small fraction of optometrists hold. It means learning-related vision problems, concussion recovery, and complex binocular cases are treated here, not referred out.",
  },
  {
    title: "The specialty care others send you away for",
    proof: "5 programs, one roof",
    body: "Myopia management, Ortho-K, scleral and specialty lenses, vision therapy, and neuro-optometric rehabilitation. The programs most practices refer out, we run in-house, so your care stays with a team that knows you.",
  },
  {
    title: "Physician-led, never retail-led",
    proof: "Medicine first",
    body: "Eye health is treated as medicine, not a lead-in to selling frames. Patients say it plainly in their reviews: a thorough exam, honest options, and never a push to buy.",
  },
  {
    title: "A bilingual team your family keeps",
    proof: "English & Korean",
    body: "Care in English and Korean, four doctors who each lead a focus, and patients who have stayed fifteen, twenty, even thirty years. You see people who already know your history.",
  },
  {
    title: "Unhurried exams, current diagnostics",
    proof: "Never a conveyor belt",
    body: "Time to look carefully, explain what we see, and track change over the years with up-to-date imaging. The exam sets the pace, not the schedule.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bone grain">
        <Container wide className="relative z-10">
          <div className="grid items-center gap-14 py-14 md:py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Family optometry · Oradell, New Jersey</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 max-w-xl font-display text-[3.1rem] font-medium leading-[1.04] tracking-[-0.01em] text-teal md:text-[4.1rem]">
                  Eye care that&apos;s{" "}
                  <span className="italic text-clay">actually medicine.</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">
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
                  <Link
                    href="/about"
                    className="-my-3 inline-flex items-center py-3 text-sm font-medium text-teal hover:text-teal-deep md:my-0 md:py-0"
                  >
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
              <StudioPanel />
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
              <ReviewsWall />
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
