"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { btn } from "@/lib/ui";
import { addLead } from "@/lib/demo-store";

const field =
  "w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/85 focus:border-teal focus:ring-2 focus:ring-teal/20";
const labelCls = "text-sm font-medium text-ink";

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

export function ConsultForm({ defaultInterest }: { defaultInterest?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

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
    const payload = {
      name,
      email,
      phone,
      preferredContact: String(fd.get("preferredContact") || "Phone") as
        | "Phone"
        | "Email"
        | "Text",
      serviceInterest: String(fd.get("interest") || "Not sure yet"),
      source: "Website form" as const,
    };
    // Fire-and-forget notify endpoint (zero-PHI). Never blocks the UX.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          preferredTime: fd.get("time"),
          company: fd.get("company"),
        }),
      });
    } catch {
      /* demo: ignore network errors */
    }
    addLead(payload);
    setPending(false);
    setSubmitted(true);
    toast.success("Request received. Our team will reach out shortly.");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-teal" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">
          Thank you, we have your request.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-ink-soft">
          A member of our team will reach out within one business day to find a
          time that works. If it is urgent, please call{" "}
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
      className="rounded-2xl border border-line bg-card p-6 md:p-8"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="name" className={labelCls}>
            Full name
          </label>
          <input id="name" name="name" required className={field} autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={field} autoComplete="tel" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className={labelCls}>
            I am interested in
          </label>
          <select
            id="interest"
            name="interest"
            defaultValue={defaultInterest ?? INTERESTS[0]}
            className={field}
          >
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="preferredContact" className={labelCls}>
            Preferred contact
          </label>
          <select id="preferredContact" name="preferredContact" className={field}>
            <option>Phone</option>
            <option>Email</option>
            <option>Text</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="time" className={labelCls}>
            Best time for us to reach you
          </label>
          <select id="time" name="time" className={field}>
            <option>Weekday morning</option>
            <option>Weekday afternoon</option>
            <option>Evening</option>
            <option>Saturday</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className={btn({ className: "mt-6 w-full" })}
      >
        {pending ? "Sending..." : "Request my appointment"}
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
        We only ask for what we need to reach you. Please do not share medical or
        symptom details in this form; we will discuss your care privately by phone
        or in the office.
      </p>
    </form>
  );
}
