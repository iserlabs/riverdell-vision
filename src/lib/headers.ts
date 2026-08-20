// Centralized security response headers, imported by next.config.ts and unit
// tested here. CSP ships as Report-Only and stays static-friendly: we allow
// inline scripts (Next injects hydration inline) instead of adding nonce
// middleware, which would force dynamic rendering. Flip to an enforcing
// Content-Security-Policy only after observing /api/csp-report output.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://offsiteschedule.zocdoc.com https://static.zocdoc.com",
  "connect-src 'self' https://api.zocdoc.com https://api2.zocdoc.com https://bob.zocdoc.com",
  /* The /oradell map is a Google Maps iframe and was firing three violations on every
     load. It renders today only because the policy is Report-Only; the day anyone
     enforces it the contact page loses its map silently. Named explicitly rather than
     widening frame-src to https:, so a future embed cannot slip in behind it. */
  "frame-src 'self' https://www.google.com https://bob.zocdoc.com https://www.zocdoc.com",
  "report-uri /api/csp-report",
].join("; ");

export const securityHeaders: { key: string; value: string }[] = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];
