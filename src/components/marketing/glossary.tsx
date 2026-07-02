import { Container, Section } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

// Plain-English glossary. Feeds DefinedTerm structured data and gives AI answer
// engines clean, quotable definitions (entity clarity for AEO).
export function Glossary({
  terms,
  title,
}: {
  terms: { term: string; def: string }[];
  title: string;
}) {
  return (
    <Section>
      <Container>
        <Reveal>
          <p className="eyebrow text-clay">In plain English</p>
          <h2 className="mt-2 font-display text-2xl font-medium text-teal md:text-3xl">
            {title}
          </h2>
        </Reveal>
        <dl className="mt-8 border-t border-line">
          {terms.map((t) => (
            <div
              key={t.term}
              className="grid gap-1.5 border-b border-line py-5 md:grid-cols-[240px_1fr] md:gap-8"
            >
              <dt className="font-display text-lg font-medium text-teal">
                {t.term}
              </dt>
              <dd className="text-[15px] leading-relaxed text-ink-soft">
                {t.def}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
