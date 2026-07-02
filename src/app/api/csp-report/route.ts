// Report-Only CSP violation sink. Logs server-side so we can tune the policy
// before flipping to an enforcing Content-Security-Policy. Always 204.
export async function POST(req: Request) {
  try {
    const body = await req.text();
    if (process.env.NODE_ENV !== "production") {
      console.warn("[csp-report]", body.slice(0, 2000));
    }
  } catch {
    // ignore malformed reports
  }
  return new Response(null, { status: 204 });
}
