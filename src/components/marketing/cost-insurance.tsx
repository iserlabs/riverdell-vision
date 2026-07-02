import { ShieldCheck, BadgeCheck, HeartHandshake } from "lucide-react";
import { Container } from "@/components/site/primitives";

// Honest cost & insurance answer block. No invented prices: it explains how the
// service is typically billed and what to expect. Structured as a direct
// question + answer so AI answer engines and featured snippets can quote it.
const ASSURANCES: [string, typeof ShieldCheck][] = [
  ["Insurance verified in advance", ShieldCheck],
  ["Clear pricing before you commit", BadgeCheck],
  ["No upselling, ever", HeartHandshake],
];

export function CostInsurance({ note }: { note: string }) {
  return (
    <section className="border-y border-line bg-bone">
      <Container wide className="py-14 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
          <div>
            <p className="eyebrow text-clay">Cost &amp; insurance</p>
            <h2 className="mt-2 font-display text-2xl font-medium leading-tight text-teal md:text-3xl">
              What will this cost, and is it covered?
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-relaxed text-ink">{note}</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {ASSURANCES.map(([label, Icon]) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-sm text-ink-soft"
                >
                  <Icon className="size-4 text-teal" aria-hidden /> {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
