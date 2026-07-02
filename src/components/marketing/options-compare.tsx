import { Reveal } from "@/components/site/reveal";

// Honest option comparison for services with real choices (e.g. myopia
// approaches, specialty lens types). Row-based so it reads on mobile and stays
// quotable for AI answer engines. No winner is pushed: the point is clarity.
// Renders inline (no section wrapper) so it can nest under "what treatment".
export function OptionsCompare({
  compare,
}: {
  compare: { headers: [string, string, string]; rows: [string, string, string][] };
}) {
  return (
    <Reveal className="mt-16">
      <p className="eyebrow text-clay">The options at a glance</p>
      <div className="mt-6 overflow-hidden rounded-3xl border border-line bg-card">
        <div className="hidden grid-cols-3 border-b border-line bg-bone-deep md:grid">
          {compare.headers.map((h) => (
            <div key={h} className="px-6 py-4">
              <p className="eyebrow text-ink-soft">{h}</p>
            </div>
          ))}
        </div>
        <dl className="divide-y divide-line">
          {compare.rows.map((r, i) => (
            <div
              key={i}
              className={`grid gap-1.5 px-6 py-5 md:grid-cols-3 md:gap-6 md:py-6 ${
                i % 2 ? "bg-bone-deep/40" : ""
              }`}
            >
              <dt className="font-display text-lg font-medium text-teal">{r[0]}</dt>
              <dd className="text-[15px] text-ink">
                <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-wide text-clay md:hidden">
                  {compare.headers[1]}:
                </span>
                {r[1]}
              </dd>
              <dd className="text-[15px] text-ink-soft">
                <span className="mr-1 font-mono text-[0.6rem] uppercase tracking-wide text-clay md:hidden">
                  {compare.headers[2]}:
                </span>
                {r[2]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Reveal>
  );
}
