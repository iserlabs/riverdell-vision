"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, BadgeCheck, PhoneCall, CalendarCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { btn } from "@/lib/ui";
import { addLead } from "@/lib/demo-store";
import { providers, insurers } from "@/lib/site";

const field =
  "w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/85 focus:border-teal focus:ring-2 focus:ring-teal/20";
const labelCls = "text-sm font-medium text-ink";
const optCls = "text-[0.7rem] font-normal text-ink-soft";

const INTERESTS = [
  "Myopia Management",
  "Orthokeratology (Ortho-K)",
  "Dry Eye",
  "Specialty & Scleral Lenses",
  "Vision Therapy",
  "Neuro-Optometric Rehabilitation",
  "Medical Eye Care",
  "Pediatric & Family Care",
  "Comprehensive Eye Exam",
  "Not sure yet",
];

const INSURANCE_OPTIONS = [...insurers, "Other or self-pay"];
const WHO_FOR = ["Myself", "My child", "My family", "Someone I care for"];
const OFFICES = ["Oradell", "Fort Lee (join the 2027 list)"];
const LANGUAGES = ["English", "Korean", "Either is fine"];
const HOW_HEARD = [
  "Google search",
  "Referred by friend or family",
  "Referred by my doctor",
  "Instagram",
  "Facebook",
  "Zocdoc",
  "Insurance directory",
  "Other",
];
const TIMES = ["Weekday morning", "Weekday afternoon", "Evening", "Saturday", "No preference"];

// Which doctor leads each interest, so the preview can pair the patient live.
const LEAD_DOCTOR: Record<string, string> = {
  "Myopia Management": "dr-mina-han",
  "Orthokeratology (Ortho-K)": "dr-mina-han",
  "Dry Eye": "dr-mina-han",
  "Specialty & Scleral Lenses": "dr-mina-han",
  "Vision Therapy": "dr-bruce-meyer",
  "Neuro-Optometric Rehabilitation": "dr-bruce-meyer",
  "Medical Eye Care": "dr-mina-han",
  "Pediatric & Family Care": "dr-amy-mundanchira",
  "Comprehensive Eye Exam": "dr-amy-mundanchira",
};

function initials(name: string) {
  return name.replace(/^Dr\.\s*/, "").split(" ").map((w) => w[0]).slice(0, 2).join("");
}

export function ConsultForm({ defaultInterest }: { defaultInterest?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  // Controlled fields that drive the live "what to expect" preview.
  const [patientType, setPatientType] = useState<"New patient" | "Returning patient">("New patient");
  const [interest, setInterest] = useState(defaultInterest ?? INTERESTS[0]);
  const [insurance, setInsurance] = useState("");
  const [done, setDone] = useState({ name: "", phone: "", service: "", office: "Oradell" });

  const doctor = providers.find((p) => p.slug === LEAD_DOCTOR[interest]);
  const insured = insurance !== "" && insurance !== "Other or self-pay";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!name || !email || !phone) {
      toast.error("Please add your name, email, and phone.");
      return;
    }
    setPending(true);
    const office = String(fd.get("office") || "Oradell");
    const payload = {
      name,
      email,
      phone,
      preferredContact: String(fd.get("preferredContact") || "Phone") as
        | "Phone"
        | "Email"
        | "Text",
      serviceInterest: interest,
      source: "Website form" as const,
    };
    // Zero-PHI notify. Sends the full routing/triage picture to the office.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          patientType,
          insurance: insurance || "Not specified",
          whoFor: fd.get("whoFor"),
          office,
          preferredDoctor: fd.get("preferredDoctor"),
          language: fd.get("language"),
          heardVia: fd.get("heardVia"),
          preferredTime: fd.get("time"),
          company: fd.get("company"),
        }),
      });
    } catch {
      /* demo: ignore network errors */
    }
    addLead(payload);
    setDone({ name, phone, service: interest, office });
    setPending(false);
    setSubmitted(true);
    toast.success("Request received. Our team will reach out shortly.");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-teal" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">
          Thank you, {done.name.split(" ")[0] || "we have your request"}.
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          A real person from our {done.office.replace(/ \(.*\)/, "")} office will call{" "}
          <span className="font-medium text-ink">{done.phone}</span> within one
          business day, already prepared with your interest in{" "}
          <span className="font-medium text-ink">{done.service}</span>. No phone
          tree, no waiting on hold.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft">
          Prefer to talk now? Call{" "}
          <a href="tel:+12012657900" className="font-medium text-teal">
            (201) 265-7900
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 rounded-2xl border border-line bg-card p-6 md:p-8 lg:grid-cols-[1.15fr_0.85fr]"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {/* ---- Fields ---- */}
      <div>
        {/* New vs returning: routes the front desk instantly */}
        <fieldset>
          <legend className={labelCls}>Are you a new or returning patient?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Patient type">
            {(["New patient", "Returning patient"] as const).map((t) => (
              <button
                type="button"
                key={t}
                role="radio"
                aria-checked={patientType === t}
                onClick={() => setPatientType(t)}
                className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  patientType === t
                    ? "border-teal bg-teal text-bone"
                    : "border-line bg-card text-ink-soft hover:border-teal/40 hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label htmlFor="name" className={labelCls}>Full name</label>
            <input id="name" name="name" required className={field} autoComplete="name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className={labelCls}>Email</label>
            <input id="email" name="email" type="email" required className={field} autoComplete="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className={labelCls}>Phone</label>
            <input id="phone" name="phone" type="tel" required className={field} autoComplete="tel" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="interest" className={labelCls}>I am interested in</label>
            <select
              id="interest"
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className={field}
            >
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="insurance" className={labelCls}>
              Insurance <span className={optCls}>optional</span>
            </label>
            <select
              id="insurance"
              name="insurance"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
              className={field}
            >
              <option value="">Select your plan</option>
              {INSURANCE_OPTIONS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Optional triage details: comprehensive, never required */}
        <details className="group mt-4 rounded-lg border border-line bg-bone-deep/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-teal">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="size-4 text-clay" aria-hidden />
              A few optional details (helps us prepare)
            </span>
            <span className="text-ink-soft transition-transform group-open:rotate-180" aria-hidden>⌄</span>
          </summary>
          <div className="grid gap-4 px-4 pb-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="whoFor" className={labelCls}>Who is this for?</label>
              <select id="whoFor" name="whoFor" className={field} defaultValue="Myself">
                {WHO_FOR.map((w) => <option key={w}>{w}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="office" className={labelCls}>Preferred office</label>
              <select id="office" name="office" className={field}>
                {OFFICES.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="preferredDoctor" className={labelCls}>Preferred doctor</label>
              <select id="preferredDoctor" name="preferredDoctor" className={field} defaultValue="No preference">
                <option>No preference</option>
                {providers.map((p) => <option key={p.slug}>{p.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="language" className={labelCls}>Preferred language</label>
              <select id="language" name="language" className={field}>
                {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="preferredContact" className={labelCls}>Preferred contact</label>
              <select id="preferredContact" name="preferredContact" className={field}>
                <option>Phone</option>
                <option>Email</option>
                <option>Text</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="time" className={labelCls}>Best time to reach you</label>
              <select id="time" name="time" className={field}>
                {TIMES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="heardVia" className={labelCls}>How did you hear about us?</label>
              <select id="heardVia" name="heardVia" className={field} defaultValue="Google search">
                {HOW_HEARD.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
          </div>
        </details>

        <button type="submit" disabled={pending} className={btn({ className: "mt-6 w-full" })}>
          {pending ? "Sending..." : "Request my appointment"}
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
          We only ask for what we need to reach you. Please do not share medical or
          symptom details here; we will discuss your care privately by phone or in
          the office.
        </p>
      </div>

      {/* ---- Live "what to expect" preview (updates as they fill) ---- */}
      <aside
        aria-live="polite"
        className="flex flex-col gap-4 self-start rounded-xl border border-line bg-bone-deep/60 p-5 lg:sticky lg:top-24"
      >
        <p className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider text-clay">
          <BadgeCheck className="size-4" aria-hidden /> What to expect
        </p>

        <p className="text-sm leading-relaxed text-ink">
          {patientType === "New patient"
            ? "First visit with us? We make it calm and easy from the very first call."
            : "Welcome back. We will have your chart open before we pick up the phone."}
        </p>

        {/* Doctor pairing */}
        <div className="flex items-center gap-3 rounded-lg border border-line bg-card p-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal-tint font-display text-sm font-medium text-teal">
            {doctor ? initials(doctor.name) : "RV"}
          </span>
          <div className="min-w-0">
            {doctor ? (
              <>
                <p className="truncate text-sm font-medium text-ink">{doctor.name}</p>
                <p className="truncate text-xs text-ink-soft">Leads our {interest.replace(/ \(.*\)/, "").toLowerCase()} care</p>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-ink">We will match you</p>
                <p className="text-xs text-ink-soft">The right doctor for what you need</p>
              </>
            )}
          </div>
        </div>

        {/* Insurance reassurance */}
        {insurance !== "" && (
          <div
            className={`flex items-start gap-2 rounded-lg border p-3 text-sm ${
              insured
                ? "border-teal/30 bg-teal-tint/60 text-teal"
                : "border-clay/30 bg-clay-soft/50 text-clay"
            }`}
          >
            <BadgeCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            {insured ? (
              <span>
                In-network. We accept <span className="font-semibold">{insurance}</span>, and we will confirm your benefits before you come in.
              </span>
            ) : (
              <span>No problem. We will walk you through simple self-pay options with clear pricing.</span>
            )}
          </div>
        )}

        {/* Concierge follow-through */}
        <div className="border-t border-line pt-4">
          <ol className="grid gap-3">
            {[
              { icon: PhoneCall, t: "A real person calls you", d: "Within one business day, never a phone tree." },
              { icon: BadgeCheck, t: "We confirm your coverage", d: "And answer every question, no rush." },
              { icon: CalendarCheck, t: "We hold a time that fits", d: "Around your schedule, including alternating Saturdays." },
            ].map((s) => (
              <li key={s.t} className="flex gap-3">
                <s.icon className="mt-0.5 size-4 shrink-0 text-brass" aria-hidden />
                <div>
                  <p className="text-sm font-medium text-ink">{s.t}</p>
                  <p className="text-xs leading-relaxed text-ink-soft">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </form>
  );
}
