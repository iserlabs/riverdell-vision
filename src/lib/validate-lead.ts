// Zero-PHI lead validation. Only routing fields are allowed; no clinical data.
import { z } from "zod";

const str = (max: number) => z.string().trim().max(max);
const opt = (max: number) => str(max).optional();

const schema = z.object({
  name: str(120).min(1),
  email: str(200).email(),
  phone: str(40).min(1),
  patientType: opt(80),
  serviceInterest: opt(120),
  insurance: opt(120),
  whoFor: opt(80),
  office: opt(80),
  preferredDoctor: opt(120),
  language: opt(80),
  preferredContact: opt(40),
  preferredTime: opt(80),
  heardVia: opt(120),
  source: opt(120),
});

export type LeadInput = z.infer<typeof schema>;

export function parseLead(
  body: unknown,
): { ok: true; data: LeadInput } | { ok: false; error: string } {
  const r = schema.safeParse(body);
  if (!r.success) {
    return { ok: false, error: r.error.issues[0]?.message ?? "Invalid payload" };
  }
  return { ok: true, data: r.data };
}

/**
 * The waitlist ran on `String(body.name || "").trim()` and a non-empty check, so a
 * 5,000-character name and "not-an-email" both passed, and that unvalidated string went
 * straight into an email header. Same discipline as the lead route, smaller shape.
 */
const waitlistSchema = z.object({
  name: str(120).min(1),
  email: str(200).email(),
  serviceInterest: opt(120),
  interest: opt(120),
  company: opt(120),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export function parseWaitlist(
  body: unknown,
): { ok: true; data: WaitlistInput } | { ok: false; error: string } {
  const r = waitlistSchema.safeParse(body);
  if (!r.success) {
    return { ok: false, error: r.error.issues[0]?.message ?? "Invalid payload" };
  }
  return { ok: true, data: r.data };
}
