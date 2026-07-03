// Report-Only CSP violation sink. Logs server-side (including in production,
// where the reports actually accumulate) so the owner can tune the policy from
// real traffic before flipping to an enforcing Content-Security-Policy. The log
// can be silenced by setting CSP_REPORT_LOG=off once the policy is settled.
// Always 204.
export async function POST(req: Request) {
  try {
    const body = await req.text();
    if (process.env.CSP_REPORT_LOG !== "off") {
      console.warn("[csp-report]", body.slice(0, 2000));
    }
  } catch {
    // ignore malformed reports
  }
  return new Response(null, { status: 204 });
}
