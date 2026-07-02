import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, HeartHandshake, Microscope } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { BookButton, CallButton } from "@/components/site/cta";
import { ReviewStatBadge, ReviewsGrid } from "@/components/site/reviews";
import { InsuranceRow } from "@/components/site/insurance";
import { ServiceIcon } from "@/components/site/service-icon";
import { CtaBand } from "@/components/site/cta-band";
import { SERVICE_LADDER } from "@/lib/services";
import { providers, fortLee } from "@/lib/site";

const STATS = [
  { figure: "5.0", label: "Google rating, 140+ reviews" },
  { figure: "4", label: "myopia-control treatment paths" },
  { figure: "9", label: "insurance plans accepted" },
  { figure: "2", label: "Bergen County offices by 2027" },
];

const PRINCIPLES = [
  {
    icon: Microscope,
    title: "Physician-led, not retail",
    body: "Eye health is medicine here. Every visit is a real clinical exam, not a lead-in to selling frames.",
  },
  {
    icon: Clock,
    title: "Unhurried by design",
    body: "We schedule time to look carefully, explain what we see, and answer every question you have.",
  },
  {
    icon: ShieldCheck,
    title: "Updated technology",
    body: "Modern diagnostics let us catch more, measure precisely, and track change over time with confidence.",
  },
  {
    icon: HeartHandshake,
    title: "Care that grows with you",
    body: "One trusted practice for children, parents, and grandparents, from first exam through specialty care.",
  },
];

const drHan = providers[0];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bone grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-24 -z-0 hidden size-96 rounded-full bg-clay-soft/50 blur-3xl md:block"
        />
        <Container wide className="relative z-10">
          <div className="grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <Eyebrow>Optometry in Oradell, New Jersey</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl text-balance font-display text-[2.7rem] font-medium leading-[1.02] tracking-[-0.02em] text-ink md:text-6xl">
                  Family eye care, practiced like medicine.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
                  Riverdell Vision is a physician-led practice known across Bergen
                  County for myopia management, dry eye, and specialty lenses.
                  Thorough exams, updated technology, and an unhurried chair, for
                  every age.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <BookButton />
                  <CallButton />
                </div>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-6">
                  <ReviewStatBadge />
                  <span className="hidden h-4 w-px bg-line sm:block" />
                  <span className="text-sm text-ink-soft">
                    Most major insurance accepted
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.75rem] border border-line shadow-xl shadow-ink/10">
                <Image
                  src="/images/hero-care.jpeg"
                  alt="An optometrist gently guiding a young child through an eye exam beside a phoropter"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-3 hidden max-w-[15rem] rounded-2xl border border-line bg-card/95 p-4 shadow-lg shadow-ink/10 backdrop-blur sm:block">
                <p className="font-display text-2xl font-medium text-teal">
                  Prevention first
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  We look for what a routine exam misses, especially in growing
                  eyes.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stat strip */}
      <section className="border-y border-line bg-bone-deep">
        <Container wide>
          <dl className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
            {STATS.map((s) => (
              <div key={s.label} className="px-2 py-8 text-center md:px-6">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-4xl font-medium text-teal md:text-5xl">
                    {s.figure}
                  </span>
                  <span className="mt-2 block text-sm text-ink-soft">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* The moat: featured services */}
      <Section id="care">
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="What we are known for"
              title="Specialty care most eye doctors don't offer."
              lead="Beyond the routine exam, Riverdell Vision runs dedicated programs for the eye problems that need real expertise, explanation, and follow-up."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_LADDER.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <Link
                  href={s.href}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-ink/5"
                >
                  <span
                    className={`inline-flex size-12 items-center justify-center rounded-xl ${
                      s.flagship
                        ? "bg-teal text-bone"
                        : "bg-teal-tint text-teal"
                    }`}
                  >
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
                    {s.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                    {s.flagship ? "Explore this care" : "Learn more"}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Approach */}
      <section className="bg-bone-deep">
        <Container wide>
          <div className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative order-last lg:order-first">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line shadow-lg shadow-ink/10">
                <Image
                  src="/images/office-oradell.jpeg"
                  alt="The warm, light-filled interior of the Riverdell Vision optical boutique in Oradell"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
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
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {PRINCIPLES.map((p, i) => (
                  <Reveal key={p.title} delay={i * 70}>
                    <div className="flex gap-4">
                      <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-tint text-teal">
                        <p.icon className="size-5" aria-hidden />
                      </span>
                      <div>
                        <h3 className="font-medium text-ink">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Meet Dr. Han */}
      <Section>
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="relative">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-line bg-teal-tint shadow-lg shadow-ink/10">
                <Image
                  src={drHan.photo}
                  alt={`${drHan.name}, ${drHan.role} at Riverdell Vision`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <Eyebrow>Meet your doctor</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-ink md:text-[2.5rem]">
                  {drHan.name}, {drHan.credential}
                </h2>
                <p className="mt-2 text-lg text-teal">{drHan.role}</p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {drHan.short} She leads the practice&apos;s myopia-management and
                  medical eye-care programs and speaks both English and Korean.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {drHan.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm text-ink-soft"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={200}>
                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-1.5 font-medium text-teal hover:gap-2.5"
                >
                  More about the practice and team
                  <ArrowRight className="size-4" />
                </Link>
              </Reveal>
            </div>
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
                title="Trusted by families across Bergen County."
                lead="A 5.0 rating built on thorough exams, honest guidance, and a team that treats patients like people."
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
                <h2 className="mt-4 font-display text-2xl font-medium text-ink md:text-3xl">
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
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep via-teal-deep/85 to-teal-deep/40" />
        <Container wide className="relative">
          <div className="max-w-xl py-20 md:py-28">
            <Reveal>
              <p className="eyebrow text-brass">{fortLee.status}</p>
              <h2 className="mt-4 font-display text-3xl font-medium leading-tight md:text-[2.6rem]">
                Riverdell Vision is coming to Fort Lee.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-bone/80">
                {fortLee.blurb} Join the interest list to be first to know when we
                open, and to reserve early appointments for your family.
              </p>
              <div className="mt-8">
                <Link
                  href="/fort-lee"
                  className="inline-flex items-center gap-2 rounded-md bg-bone px-6 py-3 font-medium text-teal-deep transition-colors hover:bg-bone/90"
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
