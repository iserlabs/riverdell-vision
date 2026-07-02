import { Phone, Mail, MessageSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Urgency, TaskType } from "@/lib/leads";

export function PageTitle({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-medium text-ink">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  action,
  className,
  children,
}: {
  title?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-card p-5", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              {title}
            </h2>
          )}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Kpi({
  label,
  value,
  sub,
  tone = "teal",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "teal" | "clay" | "brass" | "ink";
}) {
  const toneCls = {
    teal: "text-teal",
    clay: "text-clay",
    brass: "text-brass",
    ink: "text-ink",
  }[tone];
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
        {label}
      </p>
      <p className={cn("mt-2 font-mono text-3xl font-semibold tracking-tight", toneCls)}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-ink-soft">{sub}</p>}
    </div>
  );
}

export function UrgencyBadge({ urgency }: { urgency: Urgency }) {
  const map = {
    high: "bg-clay/15 text-clay",
    medium: "bg-brass/20 text-[oklch(0.5_0.09_78)]",
    low: "bg-teal-tint text-teal-deep",
  } as const;
  return (
    <span className={cn("rounded-full px-2 py-0.5 text-[0.7rem] font-medium capitalize", map[urgency])}>
      {urgency}
    </span>
  );
}

export function StageBadge({ stage }: { stage: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-bone-deep px-2.5 py-0.5 text-xs font-medium text-ink-soft">
      {stage}
    </span>
  );
}

export function TaskTypeIcon({ type, className }: { type: TaskType; className?: string }) {
  const Icon = { call: Phone, email: Mail, text: MessageSquare, review: Star }[type];
  return <Icon className={cn("size-4", className)} aria-hidden />;
}
