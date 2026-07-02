"use client";

import { Download, TrendingUp, MapPin } from "lucide-react";
import { Panel, Kpi } from "@/components/dashboard/ui";
import { useLeads } from "@/lib/demo-store";
import { computeKpis, currency, PIPELINES, type Pipeline } from "@/lib/leads";
import { btn } from "@/lib/ui";

const TREND = [
  { month: "Feb", leads: 19, booked: 11 },
  { month: "Mar", leads: 24, booked: 15 },
  { month: "Apr", leads: 28, booked: 19 },
  { month: "May", leads: 33, booked: 22 },
  { month: "Jun", leads: 39, booked: 27 },
  { month: "Jul", leads: 47, booked: 34 },
];

const PLAN = [
  "Launch the three flagship service pages (myopia, dry eye, specialty lenses) and localized Bergen County landing pages to grow qualified organic demand.",
  "Turn on the automated follow-up sequences so every high-value inquiry is contacted within one business day.",
  "Build the Fort Lee pre-opening waitlist and referral pipeline ahead of the second-office lease.",
  "Stand up monthly owner and lender reporting from this same system.",
];

export default function GrowthPage() {
  const leads = useLeads();
  const kpis = computeKpis(leads);
  const maxLeads = Math.max(...TREND.map((t) => t.leads));

  const demand = (Object.keys(PIPELINES) as Pipeline[])
    .map((key) => {
      const rows = leads.filter((l) => l.pipeline === key);
      return {
        label: PIPELINES[key].label,
        count: rows.length,
        value: rows.reduce((s, l) => s + l.estValue, 0),
      };
    })
    .sort((a, b) => b.value - a.value);
  const maxDemand = Math.max(...demand.map((d) => d.value), 1);

  const ratio = (l: (typeof leads)[number]) => {
    const stages = PIPELINES[l.pipeline].stages;
    return stages.indexOf(l.stage) / Math.max(stages.length - 1, 1);
  };
  const funnel = [
    { label: "Inquiries captured", n: leads.length },
    { label: "Contacted / in progress", n: leads.filter((l) => ratio(l) > 0).length },
    { label: "Booked / evaluated", n: leads.filter((l) => ratio(l) >= 0.4).length },
    { label: "Converted to care", n: leads.filter((l) => ratio(l) >= 0.85).length },
  ];
  const maxFunnel = funnel[0].n || 1;

  const fortLeeCount = leads.filter((l) => l.pipeline === "fort-lee").length;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-line bg-teal-deep p-6 text-bone sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow text-brass">Confidential · for owners & lenders</p>
          <h1 className="mt-2 font-display text-3xl font-medium">
            Riverdell Vision Growth Snapshot
          </h1>
          <p className="mt-1 text-sm text-bone/70">
            Reporting period: February to July 2026 · Oradell office
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className={btn({ className: "bg-bone text-teal-deep hover:bg-bone/90 print:hidden" })}
        >
          <Download className="size-4" /> Export PDF
        </button>
      </div>

      <Panel title="Executive summary">
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Riverdell Vision is converting local and referral demand into booked,
          high-value patient care through a modern website and a follow-up system
          that ensures no opportunity is dropped. Demand is concentrated in
          durable, high-margin specialty lines, myopia management, dry eye, and
          specialty lenses, which supports premium positioning and a strong case
          for a second office in Fort Lee. The metrics below are generated
          directly from the operating system that runs the practice.
        </p>
      </Panel>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Open pipeline value" value={currency(kpis.pipelineValue)} sub="active opportunities" />
        <Kpi label="Inquiry win rate" value={`${kpis.conversion}%`} sub="to booked care" tone="brass" />
        <Kpi label="First-response time" value="0.4d" sub="avg, business days" tone="teal" />
        <Kpi label="Fort Lee waitlist" value={String(fortLeeCount)} sub="pre-opening interest" tone="clay" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Monthly demand trend">
          <div className="flex items-end justify-between gap-2" style={{ height: 180 }}>
            {TREND.map((t) => (
              <div key={t.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full items-end justify-center gap-1" style={{ height: 140 }}>
                  <div
                    className="w-3 rounded-t bg-teal"
                    style={{ height: `${(t.leads / maxLeads) * 100}%` }}
                    title={`${t.leads} inquiries`}
                  />
                  <div
                    className="w-3 rounded-t bg-clay"
                    style={{ height: `${(t.booked / maxLeads) * 100}%` }}
                    title={`${t.booked} booked`}
                  />
                </div>
                <span className="text-xs text-ink-soft">{t.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-ink-soft">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-teal" /> Inquiries
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-clay" /> Booked
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-medium text-teal">
              <TrendingUp className="size-3.5" /> +147% since February
            </span>
          </div>
        </Panel>

        <Panel title="Conversion funnel">
          <div className="space-y-3">
            {funnel.map((f) => (
              <div key={f.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-ink">{f.label}</span>
                  <span className="font-mono text-ink-soft">{f.n}</span>
                </div>
                <div className="h-6 overflow-hidden rounded-md bg-bone-deep">
                  <div
                    className="flex h-full items-center rounded-md bg-teal px-2 text-xs font-medium text-bone"
                    style={{ width: `${Math.max((f.n / maxFunnel) * 100, 8)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel title="High-value demand by service line">
        <div className="space-y-4">
          {demand.map((d) => (
            <div key={d.label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="font-medium text-ink">{d.label}</span>
                <span className="text-ink-soft">
                  {d.count} leads ·{" "}
                  <span className="font-mono text-ink">{currency(d.value)}</span>
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-bone-deep">
                <div
                  className="h-full rounded-full bg-teal"
                  style={{ width: `${Math.max((d.value / maxDemand) * 100, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Fort Lee expansion readiness">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-clay/15 text-clay">
              <MapPin className="size-5" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">
              A pre-opening waitlist is already forming for the second office, with{" "}
              <span className="font-mono font-medium text-clay">{fortLeeCount}</span>{" "}
              interested families captured and consented for opening updates. This
              demonstrates demand in the Palisades market before the lease is
              signed, exactly the signal a lender wants to see.
            </p>
          </div>
        </Panel>

        <Panel title="Next 90 days">
          <ul className="space-y-2.5">
            {PLAN.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                <span className="font-mono text-xs font-semibold text-teal">
                  0{i + 1}
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <p className="text-center text-xs text-ink-soft">
        Figures shown are from a demonstration dataset. In production this report
        draws on live, audit-logged operating data and exports as a branded PDF.
      </p>
    </div>
  );
}
