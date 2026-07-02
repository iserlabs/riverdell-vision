// Sends a lead-notification email to the office via Resend's REST API (no SDK
// dependency, so nothing is added to package.json). Zero-PHI: only routing and
// contact fields are ever emailed. Degrades gracefully: if RESEND_API_KEY or a
// destination address is not configured, it returns "skipped" so the form still
// succeeds for the visitor while the owner finishes setup.
//
// Env the owner sets (in Vercel):
//   RESEND_API_KEY   - from resend.com
//   LEAD_TO_EMAIL    - office inbox that should receive requests
//   LEAD_FROM_EMAIL  - a verified-domain sender, e.g. "Riverdell Vision <hello@riverdellvision.com>"

type LeadEmail = {
  subject: string;
  lines: [string, string][];
  replyTo?: string;
};

function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => {
    if (c === "&") return "&amp;";
    if (c === "<") return "&lt;";
    if (c === ">") return "&gt;";
    return "&quot;";
  });
}

export async function sendLeadEmail({
  subject,
  lines,
  replyTo,
}: LeadEmail): Promise<"sent" | "skipped" | "error"> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Riverdell Vision <onboarding@resend.dev>";
  if (!key || !to) return "skipped";

  const rows = lines
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 18px 4px 0;color:#586475">${escapeHtml(
          k,
        )}</td><td style="padding:4px 0;font-weight:600;color:#1d2736">${escapeHtml(
          v,
        )}</td></tr>`,
    )
    .join("");
  const html = `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#1d2736">
    <h2 style="color:#1c6cc1;margin:0 0 12px">${escapeHtml(subject)}</h2>
    <table style="border-collapse:collapse">${rows}</table>
    <p style="color:#586475;font-size:12px;margin-top:20px">Sent from riverdellvision.com. Contact details only; no medical information is collected in web forms.</p>
  </div>`;
  const text = `${subject}\n\n${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend error", res.status, await res.text().catch(() => ""));
      return "error";
    }
    return "sent";
  } catch (e) {
    console.error("Resend request failed", e);
    return "error";
  }
}
