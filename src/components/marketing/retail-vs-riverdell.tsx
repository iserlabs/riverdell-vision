import { Check, Minus } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

// Head-to-head contrast: the practice's core wedge is "physician-led, not
// retail." Kept honest and category-level (no named competitors), drawn from
// the same claims already made in copy, so it justifies the premium without
// attacking anyone.
const ROWS: { label: string; retail: string; riverdell: string }[] = [
  {
    label: "Who examines you",
    retail: "Often a different provider each visit",
    riverdell: "A doctor who knows your history",
  },
  {
    label: "Time per exam",
    retail: "Booked back-to-back",
    riverdell: "Unhurried, with time to explain",
  },
  {
    label: "What the visit is really for",
    retail: "Moving you toward frames",
    riverdell: "Protecting and understanding your eye health",
  },
  {
    label: "Specialty care",
    retail: "Usually referred elsewhere",
    riverdell: "Myopia, dry eye, scleral lenses & therapy in-house",
  },
  {
    label: "Follow-up",
    retail: "Rare or ad hoc",
    riverdell: "Measured over time, with a written plan",
  },
  {
    label: "Second opinions",
    retail: "Discouraged",
    riverdell: "Always welcome",
  },
];

export function RetailVsRiverdell() {
  return (
    <section className="bg-bone">
      <Container wide>
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="Why physician-led matters"
              title="The same visit, two very different experiences."
              lead="A routine eye check and real, ongoing eye care are not the same thing. Here is the difference you can feel."
            />
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-line bg-card">
              {/* Column headers */}
              <div className="grid grid-cols-1 border-b border-line md:grid-cols-[1.1fr_1fr_1fr]">
                <div className="hidden px-6 py-5 md:block" />
                <div className="px-6 py-5 text-center">
                  <p className="eyebrow text-ink-soft">A typical retail optical</p>
                </div>
                <div className="rounded-t-2xl bg-teal px-6 py-5 text-center md:mx-3">
                  <p className="eyebrow text-bone">Riverdell Vision</p>
                </div>
              </div>

              {/* Rows */}
              <dl>
                {ROWS.map((r, i) => (
                  <div
                    key={r.label}
                    className={`grid grid-cols-1 items-stretch md:grid-cols-[1.1fr_1fr_1fr] ${
                      i % 2 ? "bg-bone-deep/40" : ""
                    }`}
                  >
                    <dt className="px-6 pt-5 pb-2 font-display text-lg font-medium text-teal md:py-5 md:text-base">
                      {r.label}
                    </dt>
                    <dd className="flex items-start gap-2.5 px-6 pb-3 text-[15px] text-ink-soft md:py-5">
                      <Minus className="mt-1 size-4 shrink-0 text-ink-soft/50" aria-hidden />
                      {r.retail}
                    </dd>
                    <dd className="flex items-start gap-2.5 bg-teal-tint/50 px-6 pb-5 text-[15px] font-medium text-ink md:my-0 md:mx-3 md:py-5">
                      <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                      {r.riverdell}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </Section>
      </Container>
    </section>
  );
}
