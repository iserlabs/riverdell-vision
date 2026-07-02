// Zero-PHI lead intake endpoint. Accepts only routing information (name,
// contact, service interest, source). It intentionally does NOT accept or store
// clinical/symptom data, so no BAA is required for the prototype. In production
// this writes to the HIPAA-ready store and triggers the staff-notification +
// follow-up-task workflow.

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
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

  // Demo: acknowledge receipt. (No persistence, no PHI, no third-party trackers.)
  const id = `L-${Math.floor(1000 + Math.random() * 8999)}`;
  return Response.json({ ok: true, id });
}
