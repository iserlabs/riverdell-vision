import { expect, test } from "vitest";
import { securityHeaders } from "./headers";

const get = (k: string) => securityHeaders.find((h) => h.key === k)?.value;

test("keeps the existing baseline headers", () => {
  expect(get("X-Content-Type-Options")).toBe("nosniff");
  expect(get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  expect(get("X-Frame-Options")).toBe("SAMEORIGIN");
  expect(get("Permissions-Policy")).toContain("camera=()");
});

test("ships CSP as Report-Only, not enforcing, and stays static-friendly", () => {
  expect(get("Content-Security-Policy")).toBeUndefined();
  const csp = get("Content-Security-Policy-Report-Only");
  expect(csp).toBeTruthy();
  expect(csp).toContain("frame-ancestors 'self'");
  expect(csp).toContain("object-src 'none'");
  expect(csp).toContain("report-uri /api/csp-report");
  // static-friendly: no nonce middleware, so inline scripts are allowed for now
  expect(csp).toContain("script-src 'self' 'unsafe-inline'");
});

test("HSTS is plain max-age only (shared vercel.app host)", () => {
  const hsts = get("Strict-Transport-Security");
  expect(hsts).toBe("max-age=31536000");
});
