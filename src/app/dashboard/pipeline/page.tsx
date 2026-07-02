"use client";

import { useState } from "react";
import Link from "next/link";
import { PageTitle, UrgencyBadge } from "@/components/dashboard/ui";
import { useLeads, setStage } from "@/lib/demo-store";
import { PIPELINES, currency, type Pipeline } from "@/lib/leads";
import { cn } from "@/lib/utils";

export default function PipelinePage() {
  const leads = useLeads();
  const [active, setActive] = useState<Pipeline>("myopia");

  const stages = PIPELINES[active].stages;
  const rows = leads.filter((l) => l.pipeline === active);

  return (
    <div className="space-y-6">
      <PageTitle
        title="Pipelines"
        sub="Move every opportunity toward done. Change a lead's stage to advance it."
      />

      <div className="flex flex-wrap gap-2">
        {(Object.keys(PIPELINES) as Pipeline[]).map((key) => {
          const count = leads.filter((l) => l.pipeline === key).length;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active === key
                  ? "bg-teal text-bone"
                  : "border border-line bg-card text-ink-soft hover:text-ink",
              )}
            >
              {PIPELINES[key].label}
              <span className="ml-1.5 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const cards = rows.filter((l) => l.stage === stage);
          const value = cards.reduce((s, l) => s + l.estValue, 0);
          return (
            <div key={stage} className="w-72 shrink-0">
              <div className="mb-2 flex items-center justify-between px-1">
                <h2 className="text-sm font-semibold text-ink">{stage}</h2>
                <span className="font-mono text-xs text-ink-soft">
                  {cards.length}
                </span>
              </div>
              <div className="mb-3 px-1 font-mono text-[0.7rem] text-ink-soft">
                {currency(value)}
              </div>
              <div className="flex min-h-24 flex-col gap-3 rounded-2xl border border-dashed border-line bg-bone-deep/50 p-2">
                {cards.map((l) => (
                  <div
                    key={l.id}
                    className="rounded-xl border border-line bg-card p-3.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/dashboard/leads/${l.id}`}
                        className="text-sm font-semibold text-ink hover:text-teal"
                      >
                        {l.name}
                      </Link>
                      <UrgencyBadge urgency={l.urgency} />
                    </div>
                    <p className="mt-1 text-xs text-ink-soft">{l.serviceInterest}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-xs font-medium text-teal">
                        {currency(l.estValue)}
                      </span>
                      <span className="text-[0.7rem] text-ink-soft">{l.source}</span>
                    </div>
                    <select
                      aria-label={`Move ${l.name} to a stage`}
                      value={l.stage}
                      onChange={(e) => setStage(l.id, e.target.value)}
                      className="mt-3 w-full rounded-lg border border-line bg-bone-deep px-2 py-1.5 text-xs text-ink outline-none focus:border-teal"
                    >
                      {stages.map((s) => (
                        <option key={s} value={s}>
                          Move to: {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {cards.length === 0 && (
                  <p className="px-2 py-4 text-center text-xs text-ink-soft/60">
                    Empty
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
