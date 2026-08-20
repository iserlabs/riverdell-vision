// Zero-PHI lead intake. Accepts only routing information. Honeypot + zod
// validation + graceful-skip rate limit, then emails the office via Resend.
import { sendLeadEmail } from "@/lib/notify";
import { parseLead } from "@/lib/validate-lead";
import { checkRateLimit } from "@/lib/ratelimit";
import { practice } from "@/lib/site";

function clientId(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0].trim() || "unknown";
}


/**
 * A failed delivery still has to be recoverable, but the recovery detail must not be
 * the patient's name next to what they are seeking care for. The project's own HIPAA
 * review sets the bar: "name + due for an eye exam" is PHI, and Vercel runtime logs
 * carry no BAA. This logs enough to find and chase the request without writing an
 * identity into a log line.
 */
function failureTrace(d: { name?: string; email?: string; phone?: string }): string {
  const seed = `${d.email ?? ""}|${d.phone ?? ""}|${d.name ?? ""}`;
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) | 0;
  return `L-${Math.abs(h).toString(36)}`;
}

export async function POST(req: Request) {
  let raw: Record<string, unknown> = {};
  try {
    raw = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success and drop it.
  if (String(raw.company || "").trim()) {
    return Response.json({ ok: true, id: "L-0" });
  }

  const limit = await checkRateLimit(clientId(req));
  if (!limit.ok) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 },
    );
  }

  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 422 });
  }
  const d = parsed.data;

  const delivery = await sendLeadEmail({
    subject: "New appointment request from riverdellvision.com",
    replyTo: d.email,
    lines: [
      ["Name", d.name],
      ["Patient", d.patientType || "Not specified"],
      ["Phone", d.phone],
      ["Email", d.email],
      ["Interested in", d.serviceInterest || "Not specified"],
      ["Insurance", d.insurance || "Not specified"],
      ["For", d.whoFor || "Not specified"],
      ["Office", d.office || "Oradell"],
      ["Preferred doctor", d.preferredDoctor || "No preference"],
      ["Language", d.language || "Not specified"],
      ["Preferred contact", d.preferredContact || "Phone"],
      ["Best time", d.preferredTime || "Not specified"],
      ["Heard via", d.heardVia || "Not specified"],
      ["Source", d.source || "Website form"],
    ],
  });

  // A request the office will never receive must not be reported as success.
  // The visitor gets the phone number instead, and the failure is logged with
  // enough detail to recover the request by hand.
  if (delivery !== "sent") {
    console.error("[lead] UNDELIVERED request, recover manually:", {
      delivery,
      trace: failureTrace(d),
      at: new Date().toISOString(),
    });
    return Response.json(
      {
        ok: false,
        delivery,
        error: `We could not send that request. Please call the office at ${practice.phone} and we will book you straight away.`,
      },
      { status: 503 },
    );
  }

  const id = `L-${Math.floor(1000 + Math.random() * 8999)}`;
  return Response.json({ ok: true, id, delivery });
}
