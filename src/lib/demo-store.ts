"use client";

// Browser-only demo store. Lets a consult/waitlist submission on the public site
// appear instantly in the ops dashboard, and lets staff move stages / complete
// tasks during a demo, all persisted to localStorage. In production this is
// replaced by the HIPAA-ready backend; the component API stays the same.

import { useSyncExternalStore } from "react";
import { SEED_LEADS, PIPELINES, type Lead, type Pipeline } from "@/lib/leads";

const KEY = "rv_demo_v1";

type Patch = {
  added: Lead[];
  overrides: Record<string, Partial<Lead>>;
  tasks: Record<string, boolean>; // key `${leadId}:${taskId}` -> done
};

const EMPTY: Patch = { added: [], overrides: {}, tasks: {} };

let cache: Patch | null = null;
let computed: Lead[] | null = null;
const listeners = new Set<() => void>();

function read(): Patch {
  if (cache) return cache;
  if (typeof window === "undefined") return EMPTY;
  try {
    cache = { ...EMPTY, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    cache = { ...EMPTY };
  }
  return cache!;
}

function write(next: Patch) {
  cache = next;
  computed = null;
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

function applyPatch(lead: Lead, p: Patch): Lead {
  const ov = p.overrides[lead.id];
  const merged = ov ? { ...lead, ...ov } : lead;
  const tasks = merged.tasks.map((t) => {
    const k = `${lead.id}:${t.id}`;
    return k in p.tasks ? { ...t, done: p.tasks[k] } : t;
  });
  return { ...merged, tasks };
}

function recompute(): Lead[] {
  const p = read();
  const added = p.added.map((l) => applyPatch(l, p));
  const base = SEED_LEADS.map((l) => applyPatch(l, p));
  computed = [...added, ...base];
  return computed;
}

const store = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot(): Lead[] {
    return computed ?? recompute();
  },
  getServerSnapshot(): Lead[] {
    return SEED_LEADS;
  },
};

export function pipelineForInterest(interest: string): Pipeline {
  const i = interest.toLowerCase();
  if (i.includes("myopia")) return "myopia";
  if (i.includes("dry")) return "dry-eye";
  if (i.includes("specialty") || i.includes("scleral") || i.includes("lens"))
    return "specialty";
  if (i.includes("fort lee") || i.includes("waitlist")) return "fort-lee";
  return "high-ticket";
}

export function addLead(input: {
  name: string;
  email: string;
  phone: string;
  preferredContact: Lead["preferredContact"];
  location?: string;
  serviceInterest: string;
  source: Lead["source"];
  note?: string;
}): Lead {
  const p = read();
  const pipeline = pipelineForInterest(input.serviceInterest);
  const stage = PIPELINES[pipeline].stages[0];
  const seq = 2042 + p.added.length;
  const lead: Lead = {
    id: `L-${seq}`,
    name: input.name,
    email: input.email,
    phone: input.phone,
    preferredContact: input.preferredContact,
    location: input.location || "Bergen County, NJ",
    serviceInterest: input.serviceInterest,
    pipeline,
    stage,
    source: input.source,
    urgency: pipeline === "high-ticket" ? "medium" : "high",
    estValue:
      pipeline === "specialty"
        ? 4800
        : pipeline === "myopia"
          ? 3200
          : pipeline === "dry-eye"
            ? 2200
            : pipeline === "fort-lee"
              ? 3000
              : 650,
    assignedTo: "Unassigned",
    createdAt: "Today",
    lastActivity: "Today",
    note: input.note,
    tasks: [
      {
        id: "auto1",
        label: "New inquiry: assign an owner and make first contact within 1 business day",
        type: input.preferredContact === "Email" ? "email" : "call",
        due: "Today",
        done: false,
        script:
          "Thanks for reaching out to Riverdell Vision. I would love to help you find a time that works and answer any questions before your visit.",
      },
    ],
  };
  write({ ...p, added: [lead, ...p.added] });
  return lead;
}

export function setStage(id: string, stage: string) {
  const p = read();
  write({
    ...p,
    overrides: {
      ...p.overrides,
      [id]: { ...p.overrides[id], stage, lastActivity: "Just now" },
    },
  });
}

export function assignLead(id: string, assignedTo: string) {
  const p = read();
  write({
    ...p,
    overrides: {
      ...p.overrides,
      [id]: { ...p.overrides[id], assignedTo, lastActivity: "Just now" },
    },
  });
}

export function toggleTask(leadId: string, taskId: string, done: boolean) {
  const p = read();
  write({ ...p, tasks: { ...p.tasks, [`${leadId}:${taskId}`]: done } });
}

export function resetDemo() {
  write({ ...EMPTY });
}

export function useLeads(): Lead[] {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
