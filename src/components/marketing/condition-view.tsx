import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { BookButton, CallButton } from "@/components/site/cta";
import { ReassuranceBar } from "@/components/site/reassurance-bar";
import { CandidacyCheck } from "@/components/marketing/candidacy-check";
import { DualProof } from "@/components/site/reviews";
import { Faq } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { KeepExploring } from "@/components/marketing/keep-exploring";
import { getService } from "@/lib/services";
import {
  medicalConditionSchema,
  medicalWebPageSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import type { Condition } from "@/lib/conditions";

export function ConditionView({ condition: c }: { condition: Condition }) {
  const parent = getService(c.parentSlug);
  const bookHref = `/book?interest=${encodeURIComponent(c.bookInterest)}`;

  // Keep-exploring links: the parent service (the care that treats this
  // condition) plus that service's own related services, so a visitor always
  // has a real next step. Pulled entirely from existing services data.
  const keepExploringLinks = [
    ...(parent ? [{ label: parent.name, href: `/${parent.slug}` }] : []),
    ...(parent?.related ?? [])
      .map((slug) => getService(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s))
      .map((s) => ({ label: s.name, href: `/${s.slug}` })),
  ];

  return (
    <>
      <JsonLd
        data={[
          medicalConditionSchema({
            name: c.name,
            slug: c.slug,
            description: c.metaDescription,
            parentSlug: c.parentSlug,
            parentName: c.parentLabel,
          }),
          medicalWebPageSchema({
            slug: c.slug,
            name: c.metaTitle,
            description: c.metaDescription,
            reviewedBy: c.reviewedBy,
            dateReviewed: c.dateReviewed,
            aboutType: "MedicalCondition",
            aboutName: c.name,
          }),
          faqSchema(c.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: c.parentLabel, path: `/${c.parentSlug}` },
            { name: c.name, path: `/${c.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-bone grain">
        <Container wide>
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: c.parentLabel, href: `/${c.parentSlug}` },
              { name: c.name },
            ]}
          />
          <div className="max-w-3xl py-10 md:py-14">
            <Reveal>
              <span className="eyebrow text-clay">{c.eyebrow}</span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 font-display text-[2.7rem] font-medium leading-[1.05] tracking-[-0.01em] text-teal md:text-[3.5rem]">
                {c.name}
              </h1>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-3 font-display text-xl italic text-clay">{c.aka}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">
                {c.intro}
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookButton href={bookHref} label="Request an evaluation" />
                <CallButton />
              </div>
            </Reveal>
            <Reveal delay={320}>
              <DualProof className="mt-8 border-t border-line pt-6" />
            </Reveal>
          </div>
        </Container>
      </section>

      <ReassuranceBar />

      {/* Short answer (AEO) */}
      <section className="bg-teal-deep text-bone">
        <Container wide className="py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 size-5 text-brass" aria-hidden />
              <p className="eyebrow whitespace-nowrap text-brass">The short answer</p>
            </div>
            <div>
              <p className="max-w-3xl font-display text-2xl leading-snug text-bone md:text-[1.7rem]">
                {c.shortAnswer}
              </p>
              <p className="mt-6 text-sm text-bone/60">
                Reviewed by {c.reviewedBy} · Updated {c.dateReviewed}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What it is */}
      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="What it is" title={`Understanding ${c.name.toLowerCase()}`} />
              <p className="mt-6 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">{c.whatItIs}</p>
            </Reveal>
            {parent && (
              <Reveal delay={100}>
                <Link
                  href={`/${parent.slug}`}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-card p-7 transition-colors hover:border-clay/40"
                >
                  <div>
                    <p className="eyebrow text-clay">The care that helps</p>
                    <h3 className="mt-2 font-display text-2xl font-medium text-teal">
                      {c.parentLabel}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
                      {parent.subhead}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal">
                    Explore {c.parentLabel.toLowerCase()}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* Symptom self-check */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <div className="mx-auto max-w-3xl">
              <CandidacyCheck items={c.symptoms} bookHref={bookHref} shortName={c.name} />
            </div>
          </Section>
        </Container>
      </section>

      {/* How we help */}
      <Section>
        <Container wide>
          <div className="max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow="How Riverdell Vision helps" title="A clear path to sharper, more comfortable vision." />
              <p className="mt-6 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">{c.howWeHelp}</p>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <BookButton href={bookHref} label="Request an evaluation" />
                {parent && (
                  <Link
                    href={`/${parent.slug}`}
                    className="-my-3 inline-flex items-center py-3 text-sm font-medium text-teal hover:text-teal-deep md:my-0 md:py-0"
                  >
                    Explore {c.parentLabel} →
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <section className="bg-bone-deep">
        <Section>
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Common questions" title="Good questions, answered plainly." />
            </Reveal>
            <div className="mt-8">
              <Faq items={c.faqs} />
            </div>
          </Container>
        </Section>
      </section>

      {keepExploringLinks.length > 0 && <KeepExploring links={keepExploringLinks} />}

      <CtaBand
        title={`Concerned about ${c.name.toLowerCase()}?`}
        sub="Request an evaluation and we will explain what we see, and the options, with clear guidance and no pressure."
        bookHref={bookHref}
      />
    </>
  );
}
