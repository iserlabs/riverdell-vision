"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Tag,
  Copy,
  CheckCircle2,
  Circle,
  ClipboardList,
} from "lucide-react";
import { Panel, StageBadge, UrgencyBadge, TaskTypeIcon } from "@/components/dashboard/ui";
import { useLeads, setStage, assignLead, toggleTask } from "@/lib/demo-store";
import { PIPELINES, currency } from "@/lib/leads";

const STAFF = [
  "Unassigned",
  "Maria (Front desk)",
  "Priya (Tech)",
  "Dr. Han",
  "Dan (Owner)",
];

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const leads = useLeads();
  const lead = leads.find((l) => l.id === id);

  if (!lead) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <p className="text-ink-soft">This lead was not found.</p>
        <Link href="/dashboard/leads" className="mt-4 inline-block font-medium text-teal">
          Back to all leads
        </Link>
      </div>
    );
  }

  const stages = PIPELINES[lead.pipeline].stages;
  const openTasks = lead.tasks.filter((t) => !t.done);

  const copy = (text: string) => {
    navigator.clipboard?.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/dashboard/leads"
        className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-teal"
      >
        <ArrowLeft className="size-4" /> All leads
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-3xl font-medium text-ink">{lead.name}</h1>
            <UrgencyBadge urgency={lead.urgency} />
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {lead.serviceInterest} · {PIPELINES[lead.pipeline].label} ·{" "}
            <span className="font-mono text-teal">{currency(lead.estValue)}</span> est. value
          </p>
        </div>
        <StageBadge stage={lead.stage} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: contact + controls */}
        <div className="space-y-6">
          <Panel title="Contact">
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 text-ink-soft" />
                <a href={`mailto:${lead.email}`} className="text-ink hover:text-teal">{lead.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 text-ink-soft" />
                <a href={`tel:${lead.phone}`} className="text-ink hover:text-teal">{lead.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="size-4 text-ink-soft" />
                <span className="text-ink-soft">{lead.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Tag className="size-4 text-ink-soft" />
                <span className="text-ink-soft">
                  {lead.source} · prefers {lead.preferredContact}
                </span>
              </li>
            </ul>
            {lead.note && (
              <p className="mt-4 rounded-lg bg-bone-deep p-3 text-sm text-ink-soft">
                {lead.note}
              </p>
            )}
          </Panel>

          <Panel title="Workflow">
            <label className="text-xs font-medium text-ink-soft">Stage</label>
            <select
              value={lead.stage}
              onChange={(e) => setStage(lead.id, e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-bone-deep px-3 py-2 text-sm text-ink outline-none focus:border-teal"
            >
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <label className="mt-4 block text-xs font-medium text-ink-soft">
              Assigned to
            </label>
            <select
              value={lead.assignedTo}
              onChange={(e) => assignLead(lead.id, e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-bone-deep px-3 py-2 text-sm text-ink outline-none focus:border-teal"
            >
              {STAFF.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Panel>
        </div>

        {/* Right: tasks */}
        <div className="space-y-6 lg:col-span-2">
          <Panel
            title="Follow-up tasks"
            action={
              <span className="text-xs text-ink-soft">
                {openTasks.length} open
              </span>
            }
          >
            <ul className="space-y-3">
              {lead.tasks.map((t) => (
                <li
                  key={t.id}
                  className="rounded-xl border border-line bg-bone-deep/60 p-4"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleTask(lead.id, t.id, !t.done)}
                      className="mt-0.5 text-teal"
                      aria-label={t.done ? "Mark not done" : "Mark done"}
                    >
                      {t.done ? (
                        <CheckCircle2 className="size-5" />
                      ) : (
                        <Circle className="size-5 text-ink-soft" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <TaskTypeIcon type={t.type} className="text-teal" />
                        <span
                          className={
                            t.done
                              ? "text-sm text-ink-soft line-through"
                              : "text-sm font-medium text-ink"
                          }
                        >
                          {t.label}
                        </span>
                        <span className="ml-auto rounded-full bg-card px-2 py-0.5 text-[0.7rem] text-ink-soft">
                          {t.due}
                        </span>
                      </div>
                      {t.script && (
                        <div className="mt-3 rounded-lg border border-line bg-card p-3">
                          <div className="mb-1.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                              <ClipboardList className="size-3.5" /> Suggested script
                            </span>
                            <button
                              onClick={() => copy(t.script!)}
                              className="inline-flex items-center gap-1 text-xs font-medium text-teal hover:underline"
                            >
                              <Copy className="size-3.5" /> Copy
                            </button>
                          </div>
                          <p className="text-sm italic leading-relaxed text-ink-soft">
                            &ldquo;{t.script}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Why this matters">
            <p className="text-sm leading-relaxed text-ink-soft">
              This opportunity is worth an estimated{" "}
              <span className="font-mono font-medium text-teal">
                {currency(lead.estValue)}
              </span>{" "}
              in first-year production. The system created the follow-up tasks
              above automatically the moment the inquiry arrived, so no high-value
              patient waits on someone remembering to call.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}
