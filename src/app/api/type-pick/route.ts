// Records the display typeface Dr. Han locks in and tells Jake.
//
// Same rule as the lead route: no silent success. If the mail path is not
// configured, this says so and returns the pick back to the caller so the UI
// can put it on screen for him to send by hand. Answering ok on a message
// nobody received is how a decision gets lost.
import { sendLeadEmail, leadDeliveryConfigured } from "@/lib/notify";
import { findTypeOption, TYPE_OPTIONS } from "@/lib/type-options";

export async function POST(req: Request) {
  let raw: Record<string, unknown> = {};
  try {
    raw = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const option = findTypeOption(String(raw.id || ""));
  if (!option) {
    return Response.json({ ok: false, error: "Unknown typeface" }, { status: 400 });
  }

  const note = String(raw.note || "").slice(0, 500);
  const picked = `${option.family}${option.incumbent ? " (the one already live)" : ""}`;

  if (!leadDeliveryConfigured()) {
    // Deliberately not a 200. The pick is real, the delivery is not.
    return Response.json(
      {
        ok: false,
        delivery: "unconfigured",
        picked,
        error:
          "Your choice is saved on this page but could not be sent automatically. Copy the line below and send it to Jake.",
      },
      { status: 503 },
    );
  }

  const lines: [string, string][] = [
    ["Typeface locked in", picked],
    ["Chosen from", `${TYPE_OPTIONS.length} options at /choose/type`],
  ];
  if (note) lines.push(["His note", note]);

  const delivery = await sendLeadEmail({
    subject: `Riverdell: display typeface locked in, ${option.family}`,
    lines,
  });

  if (delivery !== "sent") {
    return Response.json(
      {
        ok: false,
        delivery,
        picked,
        error:
          "Your choice is saved on this page but the message did not go through. Copy the line below and send it to Jake.",
      },
      { status: 503 },
    );
  }

  return Response.json({ ok: true, picked });
}
