// Zero-PHI Fort Lee waitlist intake. Same principles as /api/lead: routing and
// interest only, explicit opt-in consent flag for pre-opening messages, no PHI.
// Emails the office via Resend on submit.

import { sendLeadEmail } from "@/lib/notify";
import { checkRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  if (String(body.company || "").trim()) {
    return Response.json({ ok: true, id: "FL-0" });
  }

  const limit = await checkRateLimit(
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown",
  );
  if (!limit.ok) {
    return Response.json({ ok: false, error: "Too many requests." }, { status: 429 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  const delivery = await sendLeadEmail({
    subject: "New Fort Lee waitlist signup from riverdellvision.com",
    replyTo: email,
    lines: [
      ["Name", name],
      ["Email", email],
      ["Interested in", String(body.serviceInterest || body.interest || "Fort Lee opening")],
      ["Source", "Fort Lee waitlist"],
    ],
  });

  const id = `FL-${Math.floor(100 + Math.random() * 899)}`;
  return Response.json({ ok: true, id, delivery });
}
