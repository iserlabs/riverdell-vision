import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Sparkles,
} from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { BookButton, CallButton } from "@/components/site/cta";
import { ReassuranceBar } from "@/components/site/reassurance-bar";
import { ProcessTimeline } from "@/components/site/process-timeline";
import { EditorialList } from "@/components/site/editorial-list";
import { EditorialIndex } from "@/components/site/editorial-index";
import { CandidacyCheck } from "@/components/marketing/candidacy-check";
import { CostInsurance } from "@/components/marketing/cost-insurance";
import { Glossary } from "@/components/marketing/glossary";
import { OptionsCompare } from "@/components/marketing/options-compare";
import { DualProof } from "@/components/site/reviews";
import { ServiceReviews } from "@/components/site/service-reviews";
import { Faq } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { ServiceIcon } from "@/components/site/service-icon";
import { DoctorPhoto } from "@/components/site/doctor-photo";
import { getService, bookHrefFor, getServiceExtras, type ServiceContent } from "@/lib/services";
import { providers } from "@/lib/site";
import { serviceSchema, faqSchema, breadcrumbSchema, definedTermSetSchema } from "@/lib/schema";

export function ServiceView({ service: s }: { service: ServiceContent }) {
  const related = s.related
    .map((slug) => getService(slug))
    .filter(Boolean) as ServiceContent[];
  const lead =
    providers.find((p) => s.reviewedBy.startsWith(p.name)) ?? providers[0];
  const bookHref = bookHrefFor(s.slug);
  const extras = getServiceExtras(s.slug);

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
          ...(extras?.glossary
            ? [definedTermSetSchema(s.slug, s.name, extras.glossary)]
            : []),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-bone grain">
        <Container wide className="relative">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: s.name }]} />
          <div className="grid items-center gap-14 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 text-clay">
                  <ServiceIcon name={s.icon} className="size-4" />
                  <span className="eyebrow">{s.eyebrow}</span>
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 max-w-xl font-display text-[2.7rem] font-medium leading-[1.04] tracking-[-0.01em] text-teal md:text-[3.5rem]">
                  {s.headline}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">
                  {s.subhead}
                </p>
              </Reveal>
              <Reveal delay={240}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <BookButton href={bookHref} label="Request a consult" />
                  <CallButton />
                </div>
              </Reveal>
              <Reveal delay={300}>
                <DualProof className="mt-8 border-t border-line pt-6" />
              </Reveal>
            </div>
            <Reveal delay={180}>
              <div className="rounded-[1.5rem] border border-line bg-card p-2 shadow-[0_30px_70px_-40px_rgba(18,60,70,0.4)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.1rem]">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Trust bar */}
      <ReassuranceBar />

      {/* Direct answer (AEO) */}
      <section className="bg-teal-deep text-bone">
        <Container wide className="py-14 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 size-5 text-brass" aria-hidden />
              <p className="eyebrow whitespace-nowrap text-brass">The short answer</p>
            </div>
            <div>
              <p className="max-w-3xl font-display text-2xl leading-snug text-bone md:text-[1.7rem]">
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
              <SectionHeading eyebrow={s.eyebrow} title="Why this matters" />
              <p className="mt-6 max-w-[34rem] text-lg leading-[1.55] text-ink-soft">{s.problem}</p>
            </Reveal>
            <Reveal delay={80}>
              <h3 className="flex items-center gap-2 font-display text-lg font-medium text-teal">
                <Check className="size-4 text-clay" aria-hidden /> Who this is for
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.whoFor.map((w) => (
                  <li key={w} className="flex gap-2.5 text-[15px] text-ink-soft">
                    <Check className="mt-1 size-4 shrink-0 text-teal" aria-hidden />
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Interactive self-check (uses the symptom list) */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <div className="mx-auto max-w-3xl">
              <CandidacyCheck
                items={s.whenToSee}
                bookHref={bookHref}
                shortName={s.shortName}
              />
            </div>
          </Section>
        </Container>
      </section>

      {/* How we evaluate */}
      <Section>
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="How Riverdell Vision evaluates this"
              title="A careful, measured process."
              lead="No guesswork and no rushing. Here is how an evaluation actually goes."
            />
          </Reveal>
          <div className="mt-14">
            <ProcessTimeline steps={s.howWeEvaluate} />
          </div>
        </Container>
      </Section>

      {/* What treatment involves (+ option comparison for flagships) */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading
                eyebrow="What treatment may involve"
                title="Options matched to you, not a default."
                lead="Every plan is personalized. These are the approaches we most often use, with no exaggerated promises about outcomes."
              />
            </Reveal>
            <div className="mt-12">
              <EditorialList items={s.whatTreatment} />
            </div>
            {extras?.compare && <OptionsCompare compare={extras.compare} />}
          </Section>
        </Container>
      </section>

      {/* Cost & insurance (AEO answer block) */}
      {extras?.costNote && <CostInsurance note={extras.costNote} />}

      {/* Mid-page conversion + doctor trust */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-card p-8 text-center md:flex-row md:p-10 md:text-left">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-line">
                <DoctorPhoto photo={lead.photo} name={lead.name} sizes="96px" />
              </div>
              <div className="flex-1">
                <p className="eyebrow text-clay">Your doctor</p>
                <h3 className="mt-1 font-display text-2xl font-medium text-teal">
                  {lead.name}, {lead.credential}
                </h3>
                <p className="mt-2 max-w-2xl text-[15px] leading-[1.6] text-ink-soft">
                  {lead.short}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-center gap-2">
                <BookButton href={bookHref} label={`Discuss ${s.shortName.toLowerCase()}`} />
                <Link
                  href="/about"
                  className="-my-3 inline-flex items-center py-3 text-sm font-medium text-teal hover:text-teal-deep md:my-0 md:py-0"
                >
                  Meet the team →
                </Link>
              </div>
            </div>
          </Section>
        </Container>
      </section>

      {/* Social proof, matched to this service by tag */}
      <ServiceReviews slug={s.slug} shortName={s.shortName} />

      {/* Glossary (plain-English, feeds DefinedTerm schema) */}
      {extras?.glossary && (
        <Glossary
          terms={extras.glossary}
          title={`${s.shortName}, in plain English`}
        />
      )}

      {/* FAQ */}
      <section className="bg-bone-deep">
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
      </section>

      {/* Related care + conditions */}
      {(related.length > 0 || extras?.conditions?.length) && (
        <section className="bg-bone">
          <Container wide>
            <Section>
              <Eyebrow>Related care</Eyebrow>
              <div className="mt-6">
                <EditorialIndex
                  items={[
                    ...related.map((r) => ({
                      title: r.name,
                      href: `/${r.slug}`,
                      icon: r.icon,
                      blurb: r.eyebrow,
                    })),
                    ...(extras?.conditions ?? []),
                  ]}
                />
              </div>
            </Section>
          </Container>
        </section>
      )}

      <CtaBand
        title={`Considering ${s.shortName}?`}
        sub="Request a consult and we will help you understand your options, with clear guidance and no pressure."
        bookHref={bookHref}
      />
    </>
  );
}
