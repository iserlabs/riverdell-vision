import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { CtaBand } from "@/components/site/cta-band";
import { DualProof } from "@/components/site/reviews";
import { JsonLd } from "@/components/site/json-ld";
import {
  faqSchema,
  definedTermSetSchema,
  breadcrumbSchema,
} from "@/lib/schema";
import { ANSWER_TOPICS, ANSWER_TERMS, ALL_ANSWERS } from "@/lib/answers";

export const metadata: Metadata = {
  title: "Eye Care Answers | Oradell & Bergen County, NJ",
  description:
    "Straight answers about myopia management, dry eye, specialty and scleral lenses, Ortho-K, vision therapy, and cost and insurance, from Riverdell Vision, a physician-led family eye-care practice in Oradell, NJ.",
  alternates: { canonical: "/answers" },
};

export default function AnswersPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(ALL_ANSWERS),
          definedTermSetSchema("answers", "Eye care", ANSWER_TERMS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Answers", path: "/answers" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-bone grain">
        <Container wide className="pb-14 pt-2 md:pb-16">
          <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Answers" }]} />
          <div className="mt-8 max-w-3xl">
            <Eyebrow>Answers</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-teal md:text-[3.4rem]">
              Eye care questions, answered plainly.
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-ink-soft">
              Straight answers about myopia, dry eye, specialty lenses, cost, and
              choosing a practice, from a physician-led office in Oradell. For
              anything specific to your own eyes, the honest answer is an exam,
              but this is a good place to start.
            </p>
            <DualProof className="mt-8 border-t border-line pt-7" />
          </div>

          {/* On this page */}
          <nav aria-label="Topics on this page" className="mt-12">
            <p className="eyebrow text-clay">On this page</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {ANSWER_TOPICS.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 text-sm font-medium text-ink-soft transition-colors hover:border-teal/40 hover:text-teal md:min-h-0 md:py-2"
                  >
                    {t.eyebrow}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>

      {/* Topic clusters, alternating tone for rhythm */}
      {ANSWER_TOPICS.map((topic, ti) => (
        <section
          key={topic.id}
          id={topic.id}
          className={ti % 2 === 1 ? "scroll-mt-24 bg-bone-deep" : "scroll-mt-24"}
        >
          <Container wide>
            <Section className="py-16 md:py-20">
              <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
                <Reveal>
                  <div className="lg:sticky lg:top-28">
                    <Eyebrow>{topic.eyebrow}</Eyebrow>
                    <h2 className="mt-4 font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
                      {topic.title}
                    </h2>
                    <p className="mt-3 text-ink-soft">{topic.lead}</p>
                    <Link
                      href={topic.deepHref}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
                    >
                      {topic.deepLabel}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  </div>
                </Reveal>

                <Reveal delay={80}>
                  <dl className="divide-y divide-line">
                    {topic.answers.map((a) => (
                      <div key={a.q} className="py-6 first:pt-0 last:pb-0">
                        <dt className="font-display text-lg font-medium leading-snug text-ink">
                          {a.q}
                        </dt>
                        <dd className="mt-2.5 max-w-[46rem] leading-relaxed text-ink-soft">
                          {a.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </div>
            </Section>
          </Container>
        </section>
      ))}

      {/* Still have a question */}
      <section className="border-t border-line bg-bone">
        <Container wide>
          <div className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-medium text-teal">
                Still have a question?
              </h2>
              <p className="mt-2 text-ink-soft">
                Call the office and a real person will help, usually the same day.
                No phone tree, no pressure.
              </p>
            </div>
            <a
              href="tel:+12012657900"
              className="group inline-flex items-center gap-2 rounded-xl border border-teal px-6 py-3 font-medium text-teal transition-colors hover:bg-teal hover:text-bone"
            >
              (201) 265-7900
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
