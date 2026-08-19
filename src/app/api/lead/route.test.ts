// Regression guard for the defect this endpoint used to carry: with the mailer
// unset it answered ok:true, so a patient saw a callback promise for a request
// that reached nobody. The rule is now explicit and tested both ways: the
// office receives it, or the visitor is told to phone.

import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { practice } from "@/lib/site";

function post(body: Record<string, unknown>): Request {
  return new Request("https://riverdellvision.com/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const VALID = {
  name: "Jane Rivera",
  phone: "2015550147",
  email: "jane@example.com",
  serviceInterest: "Myopia Management",
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/lead", () => {
  it("refuses to report success when the mailer is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("LEAD_TO_EMAIL", "");
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(post(VALID));
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.delivery).toBe("unconfigured");
    // The visitor must be handed a way through, not a dead end.
    expect(body.error).toContain(practice.phone);
  });

  it("refuses to report success when the mail provider rejects the send", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEAD_TO_EMAIL", "office@example.com");
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("nope", { status: 422 })),
    );

    const res = await POST(post(VALID));
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.ok).toBe(false);
    expect(body.delivery).toBe("error");
    expect(body.error).toContain(practice.phone);
  });

  it("reports success only once the office has actually been emailed", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEAD_TO_EMAIL", "office@example.com");
    const sent = vi.fn(
      async () => new Response(JSON.stringify({ id: "abc" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", sent);

    const res = await POST(post(VALID));
    const body = await res.json();

    expect(sent).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.delivery).toBe("sent");
  });

  it("drops honeypot submissions without emailing anyone", async () => {
    const sent = vi.fn();
    vi.stubGlobal("fetch", sent);

    const res = await POST(post({ ...VALID, company: "spam co" }));
    const body = await res.json();

    expect(sent).not.toHaveBeenCalled();
    expect(res.status).toBe(200);
    expect(body.ok).toBe(true);
  });
});
