// Zero-PHI Fort Lee waitlist intake. Same principles as /api/lead: routing and
// interest only, explicit opt-in consent flag for pre-opening messages, no PHI.
// Emails the office via Resend on submit.

import { parseWaitlist } from "@/lib/validate-lead";
import { sendLeadEmail } from "@/lib/notify";
import { checkRateLimit } from "@/lib/ratelimit";
import { practice } from "@/lib/site";

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

  const parsed = parseWaitlist(body);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 422 });
  }
  const { name, email } = parsed.data;

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

  // Same rule as /api/lead: a signup nobody receives is not a signup.
  if (delivery !== "sent") {
    /* Same rule as /api/lead: a trace, not an identity. Vercel logs carry no BAA. */
    console.error("[waitlist] UNDELIVERED signup, recover manually:", {
      delivery,
      trace: `W-${Buffer.from(email).toString("base64url").slice(0, 10)}`,
      at: new Date().toISOString(),
    });
    return Response.json(
      {
        ok: false,
        delivery,
        error: `We could not add you to the list. Please call the office at ${practice.phone} and we will add you by hand.`,
      },
      { status: 503 },
    );
  }

  const id = `FL-${Math.floor(100 + Math.random() * 899)}`;
  return Response.json({ ok: true, id, delivery });
}
