import type { Metadata } from "next";
import Image from "next/image";
import { Baby, Stethoscope, Languages, GraduationCap } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { CtaBand } from "@/components/site/cta-band";
import { DoctorPhoto } from "@/components/site/doctor-photo";
import { JsonLd } from "@/components/site/json-ld";
import { physicianSchema, breadcrumbSchema } from "@/lib/schema";
import { providers } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet Dr. Mina Han & the Riverdell Vision Team | Oradell, NJ",
  description:
    "Meet Dr. Mina Han, OD and the Riverdell Vision team in Oradell, NJ. A physician-led family optometry practice offering myopia management, dry eye care, specialty lenses, pediatric and medical eye care.",
  alternates: { canonical: "/about" },
};

const drHan = providers[0];

const CARE = [
  {
    icon: Baby,
    title: "Pediatric & Family Care",
    body: "From a child's first eye exam through adult and senior care, we look after whole families with a prevention-first approach. Careful, patient, and calm with kids, and a natural feeder into our myopia-management program when it is needed.",
  },
  {
    icon: Stethoscope,
    title: "Medical Eye Care",
    body: "Riverdell Vision is a medical eye-care practice, not a glasses shop. We handle diabetic eye exams, glaucoma monitoring, red eye and infections, flashes and floaters triage, and ocular-surface disease, protecting eye health, not just updating prescriptions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          physicianSchema("dr-mina-han")!,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      {/* Intro */}
      <section className="bg-bone grain">
        <Container wide className="py-14 md:py-20">
          <div className="max-w-3xl">
            <Eyebrow>The practice</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.06] text-teal md:text-5xl">
              A neighborhood practice that takes eye health seriously.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Riverdell Vision was built on a simple idea: family eye care should
              feel personal and be practiced like real medicine. We take the time
              to look carefully, explain clearly, and treat every patient, from a
              child&apos;s first exam to complex specialty care, like family.
            </p>
          </div>
        </Container>
      </section>

      {/* Dr. Han */}
      <Section>
        <Container wide>
          <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <Reveal className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.5rem] border border-line bg-teal-tint shadow-lg shadow-ink/10">
                <Image
                  src={drHan.photo}
                  alt={`${drHan.name}, ${drHan.role}`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>
            <div id={drHan.slug} className="scroll-mt-28">
              <Eyebrow>Meet your doctor</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-medium text-ink md:text-4xl">
                {drHan.name}, {drHan.credential}
              </h2>
              <p className="mt-2 text-lg text-teal">{drHan.role}</p>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>{drHan.short}</p>
                <p>
                  Dr. Han built the practice&apos;s myopia-management and dry eye
                  programs because she saw too many patients told to simply live
                  with worsening vision or chronic discomfort. Her approach is
                  measured and evidence-informed: understand the cause, explain the
                  options honestly, and follow through.
                </p>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-line bg-card p-4">
                  <GraduationCap className="mt-0.5 size-5 text-teal" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-ink">Focus areas</p>
                    <p className="text-sm text-ink-soft">{drHan.focus.join(", ")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-card p-4">
                  <Languages className="mt-0.5 size-5 text-teal" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-ink">Languages</p>
                    <p className="text-sm text-ink-soft">{drHan.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading
                eyebrow="The team"
                title="Caring, credentialed, and here for your family."
              />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {providers.map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <div className="h-full overflow-hidden rounded-2xl border border-line bg-card">
                    <div className="relative aspect-[4/5] bg-teal-tint">
                      <DoctorPhoto
                        photo={p.photo}
                        name={p.name}
                        sizes="(max-width: 768px) 90vw, 24vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-medium text-ink">
                        {p.name}, {p.credential}
                      </h3>
                      <p className="mt-1 text-sm text-teal">{p.role}</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {p.short}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        </Container>
      </section>

      {/* Pediatric + Medical care */}
      <Section id="care">
        <Container wide>
          <Reveal>
            <SectionHeading
              eyebrow="More of what we do"
              title="Family and medical eye care, under one roof."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {CARE.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-card p-8">
                  <span className="inline-flex size-12 items-center justify-center rounded-xl bg-teal-tint text-teal">
                    <c.icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
