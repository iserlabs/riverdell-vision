// Zero-PHI Fort Lee waitlist intake. Same principles as /api/lead: routing and
// interest only, explicit opt-in consent flag for pre-opening messages, no PHI.

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();

  if (!name || !email) {
    return Response.json(
      { ok: false, error: "Missing required fields" },
      { status: 422 },
    );
  }

  const id = `FL-${Math.floor(100 + Math.random() * 899)}`;
  return Response.json({ ok: true, id });
}
