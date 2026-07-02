import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, CircleDot, ShieldCheck, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { BookButton, CallButton } from "@/components/site/cta";
import { Faq } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceIcon } from "@/components/site/service-icon";
import { getService, type ServiceContent } from "@/lib/services";
import { providers } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";

const drHan = providers[0];

export function ServiceView({ service: s }: { service: ServiceContent }) {
  const related = s.related
    .map((slug) => getService(slug))
    .filter(Boolean) as ServiceContent[];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: s.name, slug: s.slug, description: s.metaDescription }),
          faqSchema(s.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: s.name, path: `/${s.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bone grain">
        <Container wide className="relative">
          <nav
            aria-label="Breadcrumb"
            className="pt-8 text-sm text-ink-soft"
          >
            <Link href="/" className="hover:text-teal">
              Home
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">{s.name}</span>
          </nav>
          <div className="grid items-center gap-12 py-10 md:py-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-tint px-3 py-1.5 text-teal-deep">
                  <ServiceIcon name={s.icon} className="size-4" />
                  <span className="text-sm font-medium">{s.name}</span>
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl text-balance font-display text-[2.5rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink md:text-5xl">
                  {s.headline}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
                  {s.subhead}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BookButton label="Request a consult" />
                  <CallButton />
                </div>
              </Reveal>
            </div>
            <Reveal delay={160}>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.5rem] border border-line shadow-xl shadow-ink/10">
                <Image
                  src={s.image}
                  alt={s.imageAlt}
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

      {/* Direct answer (AEO) */}
      <section className="border-y border-line bg-teal-deep text-bone">
        <Container wide className="py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 size-5 text-brass" aria-hidden />
              <p className="eyebrow whitespace-nowrap text-brass">The short answer</p>
            </div>
            <div>
              <p className="max-w-3xl text-xl leading-relaxed text-bone md:text-2xl">
                {s.directAnswer}
              </p>
              <p className="mt-6 text-sm text-bone/60">
                Reviewed by {s.reviewedBy} · Updated {s.dateReviewed}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why it matters */}
      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow={s.eyebrow}
                title="Why this matters"
              />
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                {s.problem}
              </p>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              <Reveal delay={80}>
                <h3 className="flex items-center gap-2 font-medium text-ink">
                  <Check className="size-4 text-teal" aria-hidden /> Who this is for
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.whoFor.map((w) => (
                    <li key={w} className="flex gap-2.5 text-[15px] text-ink-soft">
                      <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                      {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={160}>
                <h3 className="flex items-center gap-2 font-medium text-ink">
                  <CircleDot className="size-4 text-clay" aria-hidden /> When to see us
                </h3>
                <ul className="mt-4 space-y-3">
                  {s.whenToSee.map((w) => (
                    <li key={w} className="flex gap-2.5 text-[15px] text-ink-soft">
                      <CircleDot className="mt-1 size-4 shrink-0 text-clay" aria-hidden />
                      {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* How we evaluate */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading
                eyebrow="How Riverdell Vision evaluates this"
                title="A careful, measured process."
                lead="No guesswork and no rushing. Here is how an evaluation actually goes."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {s.howWeEvaluate.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-line bg-card p-7">
                    <span className="font-mono text-sm font-medium text-clay">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* What treatment involves */}
      <Section>
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="What treatment may involve"
              title="Options matched to you, not a default."
              lead="Every plan is personalized. These are the approaches we most often use, with no exaggerated promises about outcomes."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {s.whatTreatment.map((t, i) => (
              <Reveal key={t.title} delay={i * 70}>
                <div className="flex h-full gap-4 rounded-2xl border border-line bg-card p-7">
                  <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal text-bone">
                    <ShieldCheck className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-medium text-ink">{t.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                      {t.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Doctor trust strip */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-card p-8 text-center md:flex-row md:p-10 md:text-left">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-line bg-teal-tint">
                <Image
                  src={drHan.photo}
                  alt={drHan.name}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1">
                <p className="eyebrow text-clay">Your doctor</p>
                <h3 className="mt-1 font-display text-2xl font-medium text-ink">
                  {drHan.name}, {drHan.credential}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  {drHan.short}
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 font-medium text-teal hover:gap-2.5"
              >
                Meet Dr. Han <ArrowRight className="size-4" />
              </Link>
            </div>
          </Section>
        </Container>
      </section>

      {/* FAQ */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Common questions" title="Good questions, answered plainly." />
          </Reveal>
          <div className="mt-8">
            <Faq items={s.faqs} />
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-bone-deep">
          <Container wide>
            <Section>
              <Eyebrow>Related care</Eyebrow>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/${r.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-card p-6 transition-colors hover:border-teal/40"
                  >
                    <div className="flex items-center gap-4">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                        <ServiceIcon name={r.icon} className="size-5" />
                      </span>
                      <span className="font-display text-lg font-medium text-ink">
                        {r.name}
                      </span>
                    </div>
                    <ArrowRight className="size-5 text-teal transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </Section>
          </Container>
        </section>
      )}

      <CtaBand
        title={`Considering ${s.shortName.toLowerCase()}?`}
        sub="Request a consult and we will help you understand your options, with clear guidance and no pressure."
      />
    </>
  );
}
