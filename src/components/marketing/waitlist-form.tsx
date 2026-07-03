"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { btn } from "@/lib/ui";
import { addLead } from "@/lib/demo-store";
import { practice } from "@/lib/site";

const field =
  "w-full rounded-lg border border-line bg-card px-3.5 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/85 focus:border-teal focus:ring-2 focus:ring-teal/20";

const INTERESTS = [
  "Myopia Management",
  "Dry Eye",
  "Specialty & Scleral Lenses",
  "Pediatric & Family Care",
  "Comprehensive Eye Exam",
];

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    if (!name || !email) {
      toast.error("Please add your name and email.");
      return;
    }
    if (!fd.get("consent")) {
      toast.error("Please confirm we can contact you about the opening.");
      return;
    }
    setPending(true);
    const interest = String(fd.get("interest") || "Fort Lee Waitlist");
    // Only a genuine delivery failure breaks the promise; a not-yet-configured
    // mailer returns delivery:"skipped" and stays a soft success (see notify.ts).
    let ok = false;
    let serverError = "";
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, interest, company: fd.get("company") }),
      });
      const data = await res.json().catch(() => null);
      ok = res.ok && data?.delivery !== "error";
      if (!ok && data && typeof data.error === "string") serverError = data.error;
    } catch {
      ok = false;
    }
    if (!ok) {
      setPending(false);
      toast.error(
        serverError ||
          `We couldn't add you to the list just now. Please call us at ${practice.phone} and we'll add you.`,
      );
      return;
    }
    addLead({
      name,
      email,
      phone: String(fd.get("phone") || ""),
      preferredContact: "Email",
      location: "Fort Lee area, NJ",
      serviceInterest: "Fort Lee Waitlist",
      source: "Website form",
      note: `Interested in: ${interest}`,
    });
    setPending(false);
    setSubmitted(true);
    toast.success("You are on the Fort Lee list. Thank you!");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-bone/20 bg-bone/10 p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-brass" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-medium text-bone">
          You are on the list.
        </h3>
        <p className="mx-auto mt-2 max-w-md text-bone/75">
          We will be in touch as our Fort Lee office gets closer to opening, with
          early appointment access for you and your family.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-bone/20 bg-bone/5 p-6 backdrop-blur md:p-8"
    >
      <div className="absolute left-[-9999px]" aria-hidden>
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="w-name" className="text-sm font-medium text-bone">
            Full name
          </label>
          <input id="w-name" name="name" required className={field} autoComplete="name" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="w-email" className="text-sm font-medium text-bone">
            Email
          </label>
          <input id="w-email" name="email" type="email" required className={field} autoComplete="email" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="w-phone" className="text-sm font-medium text-bone">
            Phone <span className="text-bone/50">(optional)</span>
          </label>
          <input id="w-phone" name="phone" type="tel" className={field} autoComplete="tel" />
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="w-interest" className="text-sm font-medium text-bone">
            Care you are most interested in
          </label>
          <select id="w-interest" name="interest" className={field} defaultValue={INTERESTS[0]}>
            {INTERESTS.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2.5 text-sm text-bone/80">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 size-4 rounded border-bone/40 accent-brass"
        />
        Yes, Riverdell Vision may contact me about the Fort Lee opening and early
        appointments. I can opt out anytime.
      </label>

      <button
        type="submit"
        disabled={pending}
        className={btn({
          className:
            "mt-6 w-full bg-bone text-teal-deep hover:bg-bone/90",
        })}
      >
        {pending ? "Joining..." : "Join the Fort Lee list"}
      </button>
    </form>
  );
}
