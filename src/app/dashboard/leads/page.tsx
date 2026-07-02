"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { PageTitle, UrgencyBadge, StageBadge } from "@/components/dashboard/ui";
import { useLeads } from "@/lib/demo-store";
import { PIPELINES, currency, type Pipeline } from "@/lib/leads";

export default function LeadsPage() {
  const leads = useLeads();
  const [q, setQ] = useState("");
  const [pipeline, setPipeline] = useState<Pipeline | "all">("all");

  const filtered = leads.filter((l) => {
    const matchesQ =
      !q ||
      `${l.name} ${l.serviceInterest} ${l.location} ${l.source}`
        .toLowerCase()
        .includes(q.toLowerCase());
    const matchesP = pipeline === "all" || l.pipeline === pipeline;
    return matchesQ && matchesP;
  });

  return (
    <div className="space-y-6">
      <PageTitle
        title="Leads"
        sub={`${leads.length} opportunities captured. Every one has an owner and a next step.`}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, service, town, source..."
            className="w-full rounded-lg border border-line bg-card py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </div>
        <select
          value={pipeline}
          onChange={(e) => setPipeline(e.target.value as Pipeline | "all")}
          className="rounded-lg border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-teal"
        >
          <option value="all">All pipelines</option>
          {(Object.keys(PIPELINES) as Pipeline[]).map((k) => (
            <option key={k} value={k}>
              {PIPELINES[k].label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Owner</th>
              <th className="px-4 py-3 font-medium">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((l) => (
              <tr key={l.id} className="transition-colors hover:bg-bone-deep">
                <td className="px-4 py-3">
                  <Link href={`/dashboard/leads/${l.id}`} className="font-medium text-ink hover:text-teal">
                    {l.name}
                  </Link>
                  <p className="text-xs text-ink-soft">{l.location} · {l.createdAt}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{l.serviceInterest}</td>
                <td className="px-4 py-3"><StageBadge stage={l.stage} /></td>
                <td className="px-4 py-3 text-ink-soft">{l.source}</td>
                <td className="px-4 py-3 font-mono text-teal">{currency(l.estValue)}</td>
                <td className="px-4 py-3 text-ink-soft">{l.assignedTo}</td>
                <td className="px-4 py-3"><UrgencyBadge urgency={l.urgency} /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-soft">
                  No leads match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
