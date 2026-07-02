// Zero-PHI lead intake endpoint. Accepts only routing information (name,
// contact, service interest, source). It intentionally does NOT accept or store
// clinical/symptom data, so no BAA is required. On submit it emails the office
// via Resend (see lib/notify). No PHI, no third-party trackers.

import { sendLeadEmail } from "@/lib/notify";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success and drop it.
  if (String(body.company || "").trim()) {
    return Response.json({ ok: true, id: "L-0" });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();

  if (!name || !email || !phone) {
    return Response.json(
      { ok: false, error: "Missing required contact fields" },
      { status: 422 },
    );
  }

  const delivery = await sendLeadEmail({
    subject: "New appointment request from riverdellvision.com",
    replyTo: email,
    lines: [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Interested in", String(body.serviceInterest || "Not specified")],
      ["Preferred contact", String(body.preferredContact || "Phone")],
      ["Best time", String(body.preferredTime || "Not specified")],
      ["Source", String(body.source || "Website form")],
    ],
  });

  const id = `L-${Math.floor(1000 + Math.random() * 8999)}`;
  return Response.json({ ok: true, id, delivery });
}
