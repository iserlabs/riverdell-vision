import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Stethoscope, ShieldCheck, CreditCard, CircleCheck } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { Faq } from "@/components/site/faq";
import { CtaBand } from "@/components/site/cta-band";
import { BookButton, CallButton } from "@/components/site/cta";
import { DualProof } from "@/components/site/reviews";
import { JsonLd } from "@/components/site/json-ld";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { insurers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cost, Insurance & Financing | Oradell, NJ",
  description:
    "The insurance plans Riverdell Vision accepts, how vision and medical benefits differ, and how we keep cost clear, with financing through Cherry. Physician-led eye care in Oradell, NJ.",
  alternates: { canonical: "/cost-and-insurance" },
};

const CLARITY = [
  {
    icon: ShieldCheck,
    title: "We verify your benefits first",
    body: "Before your visit, our team checks what your plan covers, so you walk in knowing what to expect instead of guessing.",
  },
  {
    icon: CircleCheck,
    title: "Clear pricing before specialty care",
    body: "For Ortho-K, scleral lenses, or a myopia-management plan, you get itemized pricing before anything begins. No commitment until it is clear.",
  },
  {
    icon: CreditCard,
    title: "No surprise bills",
    body: "We explain up front whether a visit is billed to your vision plan or your medical insurance, and why, so the bill matches the conversation.",
  },
];

const FAQS = [
  {
    q: "Do you take my insurance?",
    a: "Riverdell Vision accepts most major vision and medical plans, including VSP, EyeMed, Spectera, Aetna, Blue Cross Blue Shield, Cigna, Medicare, Meritain Health, and Nippon Life Benefits. If you are not sure about your coverage, our team verifies your benefits before your visit.",
  },
  {
    q: "What's the difference between a vision plan and medical insurance for my eyes?",
    a: "A vision plan (like VSP or EyeMed) covers a routine exam, glasses, and contact-lens fittings. Medical insurance covers medical eye problems, such as diabetic eye exams, dry eye disease, glaucoma, or a red eye, and is billed like any other doctor visit. Many appointments use one or the other; our front desk sorts out which applies.",
  },
  {
    q: "What if I don't have vision insurance?",
    a: "You are welcome without a vision plan. We offer flexible financing through Cherry and give clear pricing before any specialty treatment begins, so there are no surprises.",
  },
  {
    q: "Are specialty lenses and myopia programs covered?",
    a: "Coverage varies, and specialty lens materials are often not fully covered. We verify your specific benefits and give you clear pricing before you commit to a plan.",
  },
  {
    q: "How much does an eye exam cost here?",
    a: "It depends on your plan and what the visit involves, so we do not quote a flat price sight unseen. What we promise is process: we check your coverage in advance and give clear pricing for anything not covered, before it happens.",
  },
];

export default function CostPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cost & Insurance", path: "/cost-and-insurance" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-bone grain">
        <Container wide className="pb-14 pt-2 md:pb-16">
          <Breadcrumb
            items={[{ name: "Home", href: "/" }, { name: "Cost & Insurance" }]}
          />
          <div className="mt-8 max-w-3xl">
            <Eyebrow>Cost & insurance</Eyebrow>
            <h1 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-teal md:text-[3.4rem]">
              Clear about cost, before you come in.
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-ink-soft">
              Good eye care should not come with a mystery bill. We accept most
              major plans, verify your coverage before the visit, and explain
              exactly what is billed where. Here is how it works.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BookButton />
              <CallButton />
            </div>
            <DualProof className="mt-8 border-t border-line pt-7" />
          </div>
        </Container>
      </section>

      {/* Plans accepted */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section className="py-16 md:py-20">
            <Reveal>
              <SectionHeading
                eyebrow="Plans accepted"
                title="Most major vision and medical plans."
                lead="If your plan is not listed, call us anyway, coverage networks change and we will check before you book."
              />
            </Reveal>
            <Reveal delay={80} className="mt-10">
              <ul className="flex flex-wrap gap-2.5">
                {insurers.map((name) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-medium text-ink"
                  >
                    <CircleCheck className="size-4 text-teal" aria-hidden />
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-soft">
                No vision insurance? You are still welcome. We offer flexible
                financing through{" "}
                <span className="font-medium text-ink">Cherry</span> and give
                clear pricing up front.
              </p>
            </Reveal>
          </Section>
        </Container>
      </section>

      {/* Vision vs medical explainer */}
      <Section>
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="Vision plan vs. medical insurance"
              title="Two kinds of coverage, and which one your visit uses."
              lead="Eye care is billed one of two ways. Knowing the difference is often the difference between a covered visit and a surprise."
            />
          </Reveal>
          <div className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
            <Reveal>
              <div className="flex flex-col">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-tint text-teal">
                  <Eye className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                  Your vision plan
                </h3>
                <p className="mt-1 text-sm font-medium text-clay">
                  VSP · EyeMed · Spectera and similar
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Covers the routine, healthy-eyes side of care: a comprehensive
                  eye exam, glasses, and contact-lens fittings. This is the plan
                  most people use to update a prescription.
                </p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-ink-soft">
                  {[
                    "Routine comprehensive exam",
                    "Glasses and lens allowances",
                    "Contact-lens fitting and materials",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-col md:border-l md:border-line md:pl-16">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-clay-soft text-clay">
                  <Stethoscope className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                  Your medical insurance
                </h3>
                <p className="mt-1 text-sm font-medium text-clay">
                  Aetna · BCBS · Cigna · Medicare and similar
                </p>
                <p className="mt-4 leading-relaxed text-ink-soft">
                  Covers eye health as medicine, billed like any other doctor
                  visit. If there is a diagnosis or a symptom to work up, this is
                  usually the coverage that applies.
                </p>
                <ul className="mt-5 space-y-2.5 text-[15px] text-ink-soft">
                  {[
                    "Diabetic eye exams and monitoring",
                    "Dry eye disease and MGD treatment",
                    "Glaucoma, red eye, flashes and floaters",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="mt-10 max-w-3xl text-ink-soft">
              Many visits use one or the other, and some use both. You do not
              have to figure it out alone, our front desk checks your benefits
              and tells you which applies before you come in.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* How we keep cost clear */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section className="py-16 md:py-20">
            <Reveal>
              <SectionHeading
                eyebrow="No surprises"
                title="How we keep the cost clear."
              />
            </Reveal>
            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
              {CLARITY.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-teal-tint text-teal">
                      <c.icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-xl font-medium text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* FAQ */}
      <Section>
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Common questions"
                  title="Cost & insurance, answered."
                  lead="Still unsure how your coverage works? Call the office and we will walk through it with you."
                />
                <Link
                  href="/answers"
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-teal transition-colors hover:text-teal-deep"
                >
                  See all eye care answers
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <Faq items={FAQS} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand title="Ready to book, coverage and all?" />
    </>
  );
}
