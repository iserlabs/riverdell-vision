"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { PageTitle, Panel, Kpi, StageBadge, UrgencyBadge, TaskTypeIcon } from "@/components/dashboard/ui";
import { useLeads, toggleTask } from "@/lib/demo-store";
import { computeKpis, currency, PIPELINES, type Pipeline } from "@/lib/leads";
import { cn } from "@/lib/utils";

const DUE_LABELS = ["Overdue", "Now", "Today", "Tomorrow"];

export default function OverviewPage() {
  const leads = useLeads();
  const kpis = computeKpis(leads);

  const due = leads
    .flatMap((l) => l.tasks.filter((t) => !t.done).map((t) => ({ lead: l, task: t })))
    .sort(
      (a, b) => DUE_LABELS.indexOf(b.task.due) - DUE_LABELS.indexOf(a.task.due),
    )
    .slice(0, 6);

  const attention = leads
    .filter((l) => l.createdAt === "Today" || l.urgency === "high")
    .filter((l) => !["Converted", "Success", "Enrolled"].includes(l.stage))
    .slice(0, 6);

  const demand = (Object.keys(PIPELINES) as Pipeline[]).map((key) => {
    const rows = leads.filter((l) => l.pipeline === key);
    const value = rows.reduce((s, l) => s + l.estValue, 0);
    return { key, label: PIPELINES[key].label, count: rows.length, value };
  });
  const maxValue = Math.max(...demand.map((d) => d.value), 1);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <PageTitle
        title="Practice overview"
        sub="Every high-value opportunity, in one place. Nothing slips."
        action={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-tint px-3 py-1.5 text-xs font-medium text-teal-deep">
            <Sparkles className="size-3.5" /> Demo data, live interactions
          </span>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Kpi label="New today" value={String(kpis.newToday)} sub="website + Zocdoc" />
        <Kpi label="Follow-ups due" value={String(kpis.dueToday)} sub="assigned tasks" tone="clay" />
        <Kpi label="Open high-value" value={String(kpis.highValueOpen)} sub="need attention" tone="clay" />
        <Kpi label="Pipeline value" value={currency(kpis.pipelineValue)} sub="open opportunities" />
        <Kpi label="Win rate" value={`${kpis.conversion}%`} sub="inquiry to care" tone="brass" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel
          title="Follow-ups due"
          action={
            <Link href="/dashboard/leads" className="text-xs font-medium text-teal hover:underline">
              All leads
            </Link>
          }
        >
          <ul className="divide-y divide-line">
            {due.map(({ lead, task }) => (
              <li key={`${lead.id}-${task.id}`} className="flex items-start gap-3 py-3">
                <button
                  onClick={() => toggleTask(lead.id, task.id, true)}
                  className="mt-0.5 text-ink-soft transition-colors hover:text-teal"
                  aria-label="Mark done"
                >
                  <Circle className="size-5" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <TaskTypeIcon type={task.type} className="text-teal" />
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="truncate text-sm font-medium text-ink hover:text-teal"
                    >
                      {lead.name}
                    </Link>
                    <StageBadge stage={lead.serviceInterest} />
                  </div>
                  <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">{task.label}</p>
                </div>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-[0.7rem] font-medium",
                    ["Overdue", "Now"].includes(task.due)
                      ? "bg-clay/15 text-clay"
                      : "bg-bone-deep text-ink-soft",
                  )}
                >
                  {task.due}
                </span>
              </li>
            ))}
            {due.length === 0 && (
              <li className="flex items-center gap-2 py-6 text-sm text-ink-soft">
                <CheckCircle2 className="size-5 text-teal" /> All caught up. No follow-ups due.
              </li>
            )}
          </ul>
        </Panel>

        <Panel
          title="Needs attention"
          action={<span className="text-xs text-ink-soft">new & high-value</span>}
        >
          <ul className="divide-y divide-line">
            {attention.map((l) => (
              <li key={l.id}>
                <Link
                  href={`/dashboard/leads/${l.id}`}
                  className="flex items-center gap-3 py-3 transition-colors hover:bg-bone-deep"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-teal-tint font-mono text-xs font-semibold text-teal-deep">
                    {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium text-ink">{l.name}</span>
                      <UrgencyBadge urgency={l.urgency} />
                    </div>
                    <p className="text-xs text-ink-soft">
                      {l.serviceInterest} · {l.source} · {currency(l.estValue)}
                    </p>
                  </div>
                  <StageBadge stage={l.stage} />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel title="Demand by service line">
        <div className="space-y-4">
          {demand.map((d) => (
            <div key={d.key}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{d.label}</span>
                <span className="text-ink-soft">
                  {d.count} {d.count === 1 ? "lead" : "leads"} ·{" "}
                  <span className="font-mono text-ink">{currency(d.value)}</span>
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-bone-deep">
                <div
                  className="h-full rounded-full bg-teal"
                  style={{ width: `${Math.max((d.value / maxValue) * 100, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/dashboard/growth"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:gap-2.5"
        >
          Open the investor growth snapshot <ArrowRight className="size-4" />
        </Link>
      </Panel>
    </div>
  );
}
