"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CalendarDays,
  Activity,
  Glasses,
  MessageSquare,
  CreditCard,
  Users,
  ArrowUpRight,
  Bell,
  Check,
  ChevronRight,
  Clock,
} from "lucide-react";
import { useInView } from "@/lib/use-in-view";
import { cn } from "@/lib/utils";

// Bespoke, hand-built interactive preview of the Riverdell Vision patient portal.
// Every screen is real in-brand UI (not an image). All data is ILLUSTRATIVE and
// labelled as such: the portal itself is a concept preview, launching soon.

type TabKey =
  | "dashboard"
  | "appointments"
  | "records"
  | "prescriptions"
  | "messages"
  | "billing"
  | "family";

const TABS: { key: TabKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "appointments", label: "Appointments", icon: CalendarDays },
  { key: "records", label: "Records & results", icon: Activity },
  { key: "prescriptions", label: "Prescriptions", icon: Glasses },
  { key: "messages", label: "Messages", icon: MessageSquare },
  { key: "billing", label: "Billing", icon: CreditCard },
  { key: "family", label: "Family", icon: Users },
];

const chip =
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[0.62rem] font-medium uppercase tracking-wide";

export function PortalTour() {
  const [tab, setTab] = useState<TabKey>("dashboard");

  return (
    <div className="mx-auto w-full max-w-5xl" role="group" aria-label="Interactive preview of the Riverdell Vision patient portal">
      {/* Window chrome */}
      <div className="overflow-hidden rounded-[1.4rem] border border-line bg-card shadow-[0_50px_120px_-50px_rgba(20,50,95,0.55)]">
        <div className="flex items-center gap-3 border-b border-line bg-bone-deep px-4 py-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2.5 rounded-full bg-clay/60" />
            <span className="size-2.5 rounded-full bg-brass/70" />
            <span className="size-2.5 rounded-full bg-teal/50" />
          </div>
          <div className="mx-auto hidden max-w-xs flex-1 items-center justify-center gap-2 rounded-md bg-card px-3 py-1 text-xs text-ink-soft sm:flex">
            <span className="size-1.5 rounded-full bg-teal" />
            portal.riverdellvision.com
          </div>
          <span className={cn(chip, "bg-clay-soft text-clay")}>Illustrative preview</span>
        </div>

        <div className="grid md:grid-cols-[220px_1fr]">
          {/* Sidebar (desktop) */}
          <nav className="hidden border-r border-line bg-bone/60 p-3 md:block" aria-label="Portal sections">
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-teal text-xs font-semibold text-bone">
                RV
              </span>
              <span className="text-sm font-medium text-ink">The Rivera family</span>
            </div>
            <div className="mt-2 space-y-0.5">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  aria-current={tab === t.key}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    tab === t.key
                      ? "bg-teal text-bone"
                      : "text-ink-soft hover:bg-teal-tint hover:text-teal",
                  )}
                >
                  <t.icon className="size-4 shrink-0" aria-hidden />
                  {t.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Tab strip (mobile) */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-line p-2.5 md:hidden" aria-label="Portal sections" role="group">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                aria-current={tab === t.key}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors",
                  tab === t.key ? "bg-teal text-bone" : "bg-bone-deep text-ink-soft",
                )}
              >
                <t.icon className="size-3.5" aria-hidden />
                {t.label}
              </button>
            ))}
          </div>

          {/* Panel */}
          <div className="min-h-[460px] bg-card p-5 md:p-7">
            {tab === "dashboard" && <Dashboard onGoto={setTab} />}
            {tab === "appointments" && <Appointments />}
            {tab === "records" && <Records />}
            {tab === "prescriptions" && <Prescriptions />}
            {tab === "messages" && <Messages />}
            {tab === "billing" && <Billing />}
            {tab === "family" && <Family />}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Illustrative preview of a portal launching soon. Sample data; not a real
        patient record.
      </p>
    </div>
  );
}

function PanelHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="eyebrow text-clay">{eyebrow}</p>
      <h3 className="mt-1 font-display text-2xl font-medium text-teal">{title}</h3>
    </div>
  );
}

function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border border-line bg-bone/50 p-4", className)}>
      {children}
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard({ onGoto }: { onGoto: (t: TabKey) => void }) {
  return (
    <div>
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-sm text-ink-soft">Wednesday, September 9</p>
          <h3 className="mt-0.5 font-display text-2xl font-medium text-teal">
            Good morning, Sarah.
          </h3>
        </div>
        <span className="relative inline-flex size-9 items-center justify-center rounded-full bg-bone-deep text-ink-soft">
          <Bell className="size-4" aria-hidden />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-clay" />
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Tile className="sm:col-span-2 border-teal/20 bg-teal-tint/40">
          <div className="flex items-center justify-between">
            <span className={cn(chip, "bg-teal text-bone")}>Next visit</span>
            <span className="text-xs text-ink-soft">in 6 days</span>
          </div>
          <p className="mt-3 font-display text-xl font-medium text-teal">
            Comprehensive exam · Ethan
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Tue, Sep 15 · 4:00 PM · with Dr. Mina Han
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-lg bg-teal px-3.5 py-1.5 text-sm font-medium text-bone">
              Add to calendar
            </button>
            <button className="rounded-lg border border-teal/30 px-3.5 py-1.5 text-sm font-medium text-teal">
              Reschedule
            </button>
          </div>
        </Tile>

        <Tile>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Ethan&apos;s myopia</span>
            <span className={cn(chip, "bg-teal-tint text-teal")}>On track</span>
          </div>
          <MiniSpark />
          <p className="mt-2 text-xs text-ink-soft">
            Progression slowing since starting Ortho-K.
          </p>
          <button
            onClick={() => onGoto("records")}
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-teal"
          >
            View full chart <ChevronRight className="size-4" aria-hidden />
          </button>
        </Tile>

        <Tile>
          <span className="text-sm font-medium text-ink">Quick actions</span>
          <div className="mt-3 space-y-2">
            {[
              { label: "Reorder contact lenses", to: "prescriptions" as TabKey },
              { label: "Message the care team", to: "messages" as TabKey },
              { label: "Pay a statement", to: "billing" as TabKey },
            ].map((a) => (
              <button
                key={a.label}
                onClick={() => onGoto(a.to)}
                className="flex w-full items-center justify-between rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink transition-colors hover:border-teal/40"
              >
                {a.label}
                <ArrowUpRight className="size-4 text-teal" aria-hidden />
              </button>
            ))}
          </div>
        </Tile>
      </div>
    </div>
  );
}

/* ---------- Appointments ---------- */
function Appointments() {
  const upcoming = [
    { who: "Ethan", type: "Comprehensive exam", when: "Tue, Sep 15 · 4:00 PM", dr: "Dr. Mina Han" },
    { who: "Sarah", type: "Dry eye follow-up", when: "Thu, Oct 2 · 9:30 AM", dr: "Dr. Mina Han" },
  ];
  const past = [
    { who: "Ethan", type: "Ortho-K check", when: "Aug 12", dr: "Dr. Mina Han" },
    { who: "Grandpa Lou", type: "Diabetic eye exam", when: "Jul 28", dr: "Dr. Amy Mundanchira" },
  ];
  return (
    <div>
      <PanelHead eyebrow="Appointments" title="Upcoming & past visits" />
      <div className="space-y-3">
        {upcoming.map((a) => (
          <div key={a.type} className="flex items-center justify-between rounded-xl border border-line bg-bone/50 p-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 flex-col items-center justify-center rounded-lg bg-teal text-bone">
                <span className="font-mono text-[0.6rem] leading-none">{a.when.split(" ")[0]}</span>
                <span className="font-display text-base leading-none">{a.when.match(/\d+/)?.[0]}</span>
              </span>
              <div>
                <p className="font-medium text-ink">{a.type} · {a.who}</p>
                <p className="text-sm text-ink-soft">{a.when} · {a.dr}</p>
              </div>
            </div>
            <button className="hidden rounded-lg border border-teal/30 px-3 py-1.5 text-sm font-medium text-teal sm:block">
              Manage
            </button>
          </div>
        ))}
      </div>
      <p className="mb-2 mt-6 text-sm font-medium text-ink-soft">Earlier</p>
      <div className="divide-y divide-line rounded-xl border border-line">
        {past.map((a) => (
          <div key={a.type} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">{a.type} · {a.who}</p>
              <p className="text-xs text-ink-soft">{a.when} · {a.dr}</p>
            </div>
            <button className="inline-flex items-center gap-1 text-sm font-medium text-teal">
              Visit summary <ChevronRight className="size-4" aria-hidden />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Records (myopia chart is the centerpiece) ---------- */
function Records() {
  return (
    <div>
      <PanelHead eyebrow="Records & results" title="Ethan's myopia, tracked over time" />
      <div className="rounded-xl border border-line bg-bone/50 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink">Axial length (mm)</span>
          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-teal">
              <span className="h-0.5 w-4 rounded bg-teal" /> Measured
            </span>
            <span className="inline-flex items-center gap-1.5 text-ink-soft">
              <span className="h-0.5 w-4 rounded bg-ink-soft/40" style={{ borderTop: "1px dashed" }} /> Projected without care
            </span>
          </div>
        </div>
        <MyopiaChart />
        <p className="mt-2 text-xs text-ink-soft">
          Illustrative. Since starting Ortho-K, measured progression tracks well
          below the untreated projection.
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {[
          { k: "Latest Rx", v: "-2.25 D" },
          { k: "12-mo change", v: "+0.03 mm" },
          { k: "Retinal images", v: "3 on file" },
        ].map((s) => (
          <Tile key={s.k}>
            <p className="text-xs text-ink-soft">{s.k}</p>
            <p className="mt-1 font-display text-xl font-medium text-teal">{s.v}</p>
          </Tile>
        ))}
      </div>
    </div>
  );
}

/* ---------- Prescriptions ---------- */
function Prescriptions() {
  return (
    <div>
      <PanelHead eyebrow="Prescriptions" title="Current Rx & reorders" />
      <div className="grid gap-3 sm:grid-cols-2">
        <Tile>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Glasses · Sarah</span>
            <span className={cn(chip, "bg-teal-tint text-teal")}>Current</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs text-ink-soft">
            <span></span><span className="text-ink">Sphere</span><span className="text-ink">Cyl</span>
            <span className="text-ink">OD</span><span>-1.75</span><span>-0.50</span>
            <span className="text-ink">OS</span><span>-2.00</span><span>-0.25</span>
          </div>
        </Tile>
        <Tile>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Contacts · Ethan</span>
            <span className={cn(chip, "bg-clay-soft text-clay")}>Reorder soon</span>
          </div>
          <p className="mt-3 text-sm text-ink-soft">Ortho-K lenses · last ordered Jun 2</p>
          <button className="mt-3 w-full rounded-lg bg-teal px-3.5 py-2 text-sm font-medium text-bone">
            Reorder lenses
          </button>
        </Tile>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-bone/50 p-4 text-sm text-ink-soft">
        <Check className="size-4 text-teal" aria-hidden />
        Your glasses order shipped Sep 4, arriving Sep 9.
      </div>
    </div>
  );
}

/* ---------- Messages ---------- */
function Messages() {
  return (
    <div>
      <PanelHead eyebrow="Messages" title="Your care team" />
      <div className="space-y-3">
        <Bubble side="them" who="Riverdell care team">
          Hi Sarah, Ethan&apos;s Ortho-K lenses are ready for pickup. We&apos;re open
          until 6 today.
        </Bubble>
        <Bubble side="me" who="You">
          Wonderful, we&apos;ll come by after school. Should he wear them tonight?
        </Bubble>
        <Bubble side="them" who="Riverdell care team">
          Yes, first night tonight. We&apos;ll call tomorrow to see how it went.
        </Bubble>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-full border border-line bg-bone/50 px-4 py-2.5">
        <span className="flex-1 text-sm text-ink-soft">Write a message…</span>
        <span className="rounded-full bg-teal px-3 py-1 text-xs font-medium text-bone">Send</span>
      </div>
    </div>
  );
}

function Bubble({ side, who, children }: { side: "me" | "them"; who: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col", side === "me" ? "items-end" : "items-start")}>
      <span className="mb-1 px-1 text-[0.65rem] text-ink-soft">{who}</span>
      <p
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          side === "me" ? "bg-teal text-bone" : "bg-bone-deep text-ink",
        )}
      >
        {children}
      </p>
    </div>
  );
}

/* ---------- Billing ---------- */
function Billing() {
  return (
    <div>
      <PanelHead eyebrow="Billing & insurance" title="Statements & coverage" />
      <div className="rounded-xl border border-teal/20 bg-teal-tint/40 p-4">
        <p className="text-sm text-ink-soft">Current balance</p>
        <p className="font-display text-3xl font-medium text-teal">$0.00</p>
        <p className="mt-1 text-xs text-ink-soft">You&apos;re all caught up.</p>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-bone/50 p-4">
        <div className="flex items-center gap-2 text-sm text-ink">
          <Check className="size-4 text-teal" aria-hidden /> Insurance on file · VSP + Aetna
        </div>
        <button className="text-sm font-medium text-teal">Update</button>
      </div>
      <p className="mb-2 mt-6 text-sm font-medium text-ink-soft">Recent statements</p>
      <div className="divide-y divide-line rounded-xl border border-line">
        {[
          { d: "Aug 12", who: "Ethan · Ortho-K check", amt: "$0.00", s: "Covered" },
          { d: "Jul 28", who: "Grandpa Lou · Diabetic exam", amt: "$25.00", s: "Paid" },
        ].map((r) => (
          <div key={r.d} className="flex items-center justify-between px-4 py-3 text-sm">
            <div>
              <p className="font-medium text-ink">{r.who}</p>
              <p className="text-xs text-ink-soft">{r.d}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(chip, "bg-teal-tint text-teal")}>{r.s}</span>
              <span className="font-mono text-sm text-ink">{r.amt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Family ---------- */
function Family() {
  const people = [
    { n: "Sarah Rivera", r: "You · Dry eye care", tag: "Adult", active: true },
    { n: "Ethan Rivera", r: "Myopia management · Ortho-K", tag: "Age 10" },
    { n: "Grandpa Lou", r: "Diabetic eye care", tag: "Senior" },
  ];
  return (
    <div>
      <PanelHead eyebrow="Family" title="One account, the whole household" />
      <div className="grid gap-3 sm:grid-cols-3">
        {people.map((p) => (
          <div
            key={p.n}
            className={cn(
              "rounded-xl border p-4 text-center",
              p.active ? "border-teal/40 bg-teal-tint/40" : "border-line bg-bone/50",
            )}
          >
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal font-display text-lg text-bone">
              {p.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}
            </span>
            <p className="mt-3 font-medium text-ink">{p.n}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{p.r}</p>
            <span className={cn(chip, "mt-3 bg-bone-deep text-ink-soft")}>{p.tag}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-line bg-bone/40 p-4 text-sm text-ink-soft">
        <Clock className="size-4 text-teal" aria-hidden />
        Manage reminders, records, and reorders for everyone from one login.
      </div>
    </div>
  );
}

/* ---------- Charts ---------- */
function MyopiaChart() {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.3 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    setMounted(true);
  }, [ref]);
  // Visible by default (SSR + no-JS): only hide once JS has mounted AND the
  // element is confirmed still off-screen, mirroring reveal.tsx's contract.
  const hidden = mounted && !inView;
  const measured = [24.1, 24.28, 24.4, 24.49, 24.55, 24.58];
  const projected = [24.1, 24.4, 24.72, 25.04, 25.36, 25.66];
  const labels = ["Age 8", "", "Age 9", "", "Age 10", ""];
  const min = 24.0;
  const max = 25.8;
  const x = (i: number) => 34 + (i * (300 - 34)) / (measured.length - 1);
  const y = (v: number) => 130 - ((v - min) / (max - min)) * (130 - 18);
  const toPts = (arr: number[]) => arr.map((v, i) => `${x(i)},${y(v)}`).join(" ");

  return (
    <svg ref={ref} viewBox="0 0 320 150" className="mt-3 h-auto w-full" role="img" aria-label="Ethan's axial length over time, tracking below the untreated projection">
      {/* gridlines */}
      {[24.5, 25.0, 25.5].map((g) => (
        <g key={g}>
          <line x1="34" x2="308" y1={y(g)} y2={y(g)} stroke="currentColor" className="text-line" strokeWidth="1" />
          <text x="4" y={y(g) + 3} className="fill-ink-soft" style={{ fontSize: 8, fontFamily: "monospace" }}>{g.toFixed(1)}</text>
        </g>
      ))}
      {/* projected (dashed) */}
      <polyline
        points={toPts(projected)}
        fill="none"
        stroke="currentColor"
        className="text-ink-soft/40"
        strokeWidth="1.6"
        strokeDasharray="4 3"
        style={{ opacity: hidden ? 0 : 1, transition: "opacity 700ms ease 600ms" }}
      />
      {/* measured */}
      <polyline
        points={toPts(measured)}
        fill="none"
        stroke="currentColor"
        className="text-teal"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 640,
          strokeDashoffset: hidden ? 640 : 0,
          transition: "stroke-dashoffset 1500ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      {measured.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="3" className="fill-teal"
          style={{ opacity: hidden ? 0 : 1, transition: `opacity 300ms ease ${700 + i * 130}ms` }} />
      ))}
      {labels.map((l, i) => l && (
        <text key={i} x={x(i)} y="146" textAnchor="middle" className="fill-ink-soft" style={{ fontSize: 8, fontFamily: "monospace" }}>{l}</text>
      ))}
    </svg>
  );
}

function MiniSpark() {
  const { ref, inView } = useInView<SVGSVGElement>({ threshold: 0.4 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    setMounted(true);
  }, [ref]);
  // Visible by default (SSR + no-JS): only hide once JS has mounted AND the
  // element is confirmed still off-screen, mirroring reveal.tsx's contract.
  const hidden = mounted && !inView;
  const pts = "0,26 20,20 40,15 60,12 80,10 100,9";
  return (
    <svg ref={ref} viewBox="0 0 100 32" className="mt-3 h-10 w-full" aria-hidden>
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        className="text-teal"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ strokeDasharray: 160, strokeDashoffset: hidden ? 160 : 0, transition: "stroke-dashoffset 1200ms ease" }}
      />
    </svg>
  );
}
