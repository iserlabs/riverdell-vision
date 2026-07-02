# Security & Privacy + Mobile UX + Accessibility & Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden Riverdell Vision across security/privacy, mobile UX, and accessibility/visibility in one sequential pass (S1 -> S2 -> S3), extending what already exists rather than rebuilding it.

**Architecture:** Additive changes to a Next 16 App Router site. Security via `next.config.ts` response headers (CSP Report-Only, static-friendly) plus a graceful-skip Upstash rate-limiter and zod validation on the lead API. Mobile via targeted ergonomics and a measured tap-target/rhythm pass. A11y/visibility via a reusable breadcrumb + related-links, a custom 404, an axe gate, and schema-coverage verification. A new vitest harness covers pure logic; a new Playwright + axe harness covers a11y/mobile.

**Tech Stack:** Next 16.2.10 (App Router, Turbopack), React 19, Tailwind v4, Base UI, `@upstash/ratelimit` + `@upstash/redis`, `zod`, `@vercel/analytics` + `@vercel/speed-insights`, `vitest`, `@playwright/test` + `@axe-core/playwright`.

## Global Constraints

- **Never output an em dash (U+2014)** anywhere (a PostToolUse hook blocks Write/Edit that contain one). Use periods, commas, colons, parentheses, or hyphens.
- **Zero-PHI**: the lead API must never accept or store clinical/symptom data. Keep the existing routing-only field set.
- **Graceful-skip contract** (mirror `src/lib/notify.ts`): any env-dependent feature must no-op safely and never 500 when its env is unset.
- **No consent banner**: analytics must be cookieless.
- **CSP stays static-friendly**: ship Report-Only, no nonce-middleware, do not convert pages to dynamic rendering.
- **HSTS**: plain `max-age` only while on `*.vercel.app`; no `includeSubDomains`/`preload` until a custom domain is attached.
- **No invented copy**: reuse existing verbatim content; real NAP and ratings only.
- **Next 16 is not the Next you know**: read `node_modules/next/dist/docs/` before using an unfamiliar API (per AGENTS.md).
- **Base UI (not Radix)**: use the `btn()` helper for link-buttons; Accordion uses `multiple={false}`.
- **Deploy verification**: after any deploy, confirm `https://riverdell-vision.vercel.app` stays 200 and public and re-set the alias if it detached (see memory `riverdell-vercel-deploy-recovery.md`). Count hero cells with `grep -o aspect-square | wc -l`, not `grep -c`.
- **Commit frequently**; the branch is `feat/proof-diff-reviews` (a background /sync may move branches; check `git log` before assuming main).

## File Structure

New files:
- `vitest.config.ts` - vitest config (node env).
- `src/lib/ratelimit.ts` - graceful-skip Upstash limiter.
- `src/lib/ratelimit.test.ts` - env-guard + limiter unit tests.
- `src/lib/validate-lead.ts` - zod schema + parse helper for the lead payload.
- `src/lib/validate-lead.test.ts` - validation unit tests.
- `src/lib/schema.test.ts` - schema-builder output tests.
- `src/lib/headers.ts` - exported `securityHeaders` array (so it is unit-testable and reused by `next.config.ts`).
- `src/lib/headers.test.ts` - header presence/value tests.
- `src/app/api/csp-report/route.ts` - Report-Only violation sink.
- `src/app/not-found.tsx` - custom 404 recovery page.
- `src/components/site/breadcrumb.tsx` - reusable visible breadcrumb.
- `src/components/marketing/keep-exploring.tsx` - reusable related-links block.
- `playwright.config.ts` - Playwright config.
- `e2e/a11y.spec.ts` - axe gate across key routes.
- `e2e/mobile.spec.ts` - tap-target + no-horizontal-scroll checks at 390px.

Modified files:
- `next.config.ts` - consume `securityHeaders`.
- `src/app/api/lead/route.ts` - add zod validation + rate-limit.
- `src/app/api/waitlist/route.ts` - add rate-limit (if it accepts writes).
- `src/app/layout.tsx` - mount Analytics + Speed Insights.
- `src/components/marketing/consult-form.tsx` - `inputMode` + submit `aria-live`.
- `src/components/marketing/service-view.tsx` - use shared `Breadcrumb` + `KeepExploring`.
- `src/components/marketing/condition-view.tsx` - use shared `Breadcrumb` + `KeepExploring`.
- `package.json` - add deps + `test` / `test:e2e` scripts.

---

## Task 1: Add the vitest harness

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json` (add `vitest` devDependency + `test` script)
- Test: (this task's deliverable is that `npm test` runs)

**Interfaces:**
- Produces: an `npm test` script that runs `vitest run`; test files matching `src/**/*.test.ts`.

- [ ] **Step 1: Install vitest**

Run: `npm i -D vitest`
Expected: `vitest` appears in `devDependencies`.

- [ ] **Step 2: Create the config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3: Add the test script**

In `package.json` `scripts`, add:

```json
"test": "vitest run"
```

- [ ] **Step 4: Add a smoke test and run it**

Create `src/lib/smoke.test.ts`:

```ts
import { expect, test } from "vitest";

test("vitest runs", () => {
  expect(1 + 1).toBe(2);
});
```

Run: `npm test`
Expected: 1 passed.

- [ ] **Step 5: Remove the smoke test and commit**

Run: `rm src/lib/smoke.test.ts`

```bash
git add vitest.config.ts package.json package-lock.json
git commit -m "chore: add vitest harness"
```

---

## Task 2: Security headers (CSP Report-Only + HSTS + DNS-prefetch)

**Files:**
- Create: `src/lib/headers.ts`
- Create: `src/lib/headers.test.ts`
- Create: `src/app/api/csp-report/route.ts`
- Modify: `next.config.ts:15-30`

**Interfaces:**
- Produces: `securityHeaders: { key: string; value: string }[]` from `src/lib/headers.ts`, consumed by `next.config.ts`.

- [ ] **Step 1: Write the failing header test**

Create `src/lib/headers.test.ts`:

```ts
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
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm test -- headers`
Expected: FAIL, cannot find module `./headers`.

- [ ] **Step 3: Implement `securityHeaders`**

Create `src/lib/headers.ts`:

```ts
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
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self'",
  "upgrade-insecure-requests",
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
```

- [ ] **Step 4: Run the test to pass**

Run: `npm test -- headers`
Expected: PASS (3 tests).

- [ ] **Step 5: Wire it into next.config.ts**

Replace the `headers()` return in `next.config.ts:15-30` with:

```ts
  async headers() {
    const { securityHeaders } = await import("./src/lib/headers");
    return [{ source: "/:path*", headers: securityHeaders }];
  },
```

- [ ] **Step 6: Add the CSP report sink**

Create `src/app/api/csp-report/route.ts`:

```ts
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
```

- [ ] **Step 7: Verify the build and headers locally**

Run: `npm run build`
Expected: green (ignore the pre-existing `dashboard/gate.tsx` setState-in-effect warning).

- [ ] **Step 8: Commit**

```bash
git add src/lib/headers.ts src/lib/headers.test.ts src/app/api/csp-report/route.ts next.config.ts
git commit -m "feat(security): CSP Report-Only + HSTS + DNS-prefetch headers"
```

---

## Task 3: Graceful-skip rate limiter

**Files:**
- Create: `src/lib/ratelimit.ts`
- Create: `src/lib/ratelimit.test.ts`
- Modify: `package.json` (add `@upstash/ratelimit`, `@upstash/redis`)

**Interfaces:**
- Produces: `checkRateLimit(id: string): Promise<{ ok: boolean; configured: boolean }>` from `src/lib/ratelimit.ts`. When Upstash env is unset, returns `{ ok: true, configured: false }` (never throws).

- [ ] **Step 1: Install deps**

Run: `npm i @upstash/ratelimit @upstash/redis`
Expected: both in `dependencies`.

- [ ] **Step 2: Write the failing env-guard test**

Create `src/lib/ratelimit.test.ts`:

```ts
import { afterEach, beforeEach, expect, test } from "vitest";
import { checkRateLimit } from "./ratelimit";

const saved = { url: process.env.UPSTASH_REDIS_REST_URL, token: process.env.UPSTASH_REDIS_REST_TOKEN };

beforeEach(() => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
});
afterEach(() => {
  process.env.UPSTASH_REDIS_REST_URL = saved.url;
  process.env.UPSTASH_REDIS_REST_TOKEN = saved.token;
});

test("skips gracefully when Upstash env is unset", async () => {
  const r = await checkRateLimit("1.2.3.4");
  expect(r).toEqual({ ok: true, configured: false });
});

test("never throws on an empty id", async () => {
  await expect(checkRateLimit("")).resolves.toBeTruthy();
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test -- ratelimit`
Expected: FAIL, cannot find module `./ratelimit`.

- [ ] **Step 4: Implement the limiter**

Create `src/lib/ratelimit.ts`:

```ts
// Graceful-skip rate limiter. Mirrors lib/notify.ts: if Upstash env is not
// configured, it no-ops (ok:true, configured:false) so the endpoint behaves
// exactly as before and never 500s. When configured, it enforces a sliding
// window keyed by the caller id (client IP).
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let limiter: Ratelimit | null = null;

function getLimiter(): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(5, "60 s"),
      prefix: "rv:lead",
    });
  }
  return limiter;
}

export async function checkRateLimit(
  id: string,
): Promise<{ ok: boolean; configured: boolean }> {
  const l = getLimiter();
  if (!l) return { ok: true, configured: false };
  try {
    const { success } = await l.limit(id || "unknown");
    return { ok: success, configured: true };
  } catch {
    // Redis hiccup must not break the form; fail open.
    return { ok: true, configured: true };
  }
}
```

- [ ] **Step 5: Run the test to pass**

Run: `npm test -- ratelimit`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/lib/ratelimit.ts src/lib/ratelimit.test.ts package.json package-lock.json
git commit -m "feat(security): graceful-skip Upstash rate limiter"
```

---

## Task 4: zod validation + rate-limit on the lead API

**Files:**
- Create: `src/lib/validate-lead.ts`
- Create: `src/lib/validate-lead.test.ts`
- Modify: `src/app/api/lead/route.ts`
- Modify: `src/app/api/waitlist/route.ts` (apply the same rate-limit guard)
- Modify: `package.json` (add `zod`)

**Interfaces:**
- Consumes: `checkRateLimit` (Task 3).
- Produces: `parseLead(body: unknown): { ok: true; data: LeadInput } | { ok: false; error: string }` from `src/lib/validate-lead.ts`, where `LeadInput` includes `name`, `email`, `phone` plus the existing optional routing fields.

- [ ] **Step 1: Install zod**

Run: `npm i zod`
Expected: `zod` in `dependencies`.

- [ ] **Step 2: Write the failing validation test**

Create `src/lib/validate-lead.test.ts`:

```ts
import { expect, test } from "vitest";
import { parseLead } from "./validate-lead";

const valid = { name: "Ada", email: "ada@example.com", phone: "201-555-0100" };

test("accepts a valid payload", () => {
  const r = parseLead(valid);
  expect(r.ok).toBe(true);
});

test("rejects a malformed email", () => {
  const r = parseLead({ ...valid, email: "not-an-email" });
  expect(r.ok).toBe(false);
});

test("rejects missing required fields", () => {
  const r = parseLead({ name: "Ada" });
  expect(r.ok).toBe(false);
});

test("rejects an over-long field", () => {
  const r = parseLead({ ...valid, name: "x".repeat(5000) });
  expect(r.ok).toBe(false);
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npm test -- validate-lead`
Expected: FAIL, cannot find module `./validate-lead`.

- [ ] **Step 4: Implement the validator**

Create `src/lib/validate-lead.ts`:

```ts
// Zero-PHI lead validation. Only routing fields are allowed; no clinical data.
import { z } from "zod";

const str = (max: number) => z.string().trim().max(max);
const opt = (max: number) => str(max).optional();

const schema = z.object({
  name: str(120).min(1),
  email: str(200).email(),
  phone: str(40).min(1),
  patientType: opt(80),
  serviceInterest: opt(120),
  insurance: opt(120),
  whoFor: opt(80),
  office: opt(80),
  preferredDoctor: opt(120),
  language: opt(80),
  preferredContact: opt(40),
  preferredTime: opt(80),
  heardVia: opt(120),
  source: opt(120),
});

export type LeadInput = z.infer<typeof schema>;

export function parseLead(
  body: unknown,
): { ok: true; data: LeadInput } | { ok: false; error: string } {
  const r = schema.safeParse(body);
  if (!r.success) {
    return { ok: false, error: r.error.issues[0]?.message ?? "Invalid payload" };
  }
  return { ok: true, data: r.data };
}
```

- [ ] **Step 5: Run the test to pass**

Run: `npm test -- validate-lead`
Expected: PASS (4 tests).

- [ ] **Step 6: Rewrite the lead route to use both guards**

Replace `src/app/api/lead/route.ts` with:

```ts
// Zero-PHI lead intake. Accepts only routing information. Honeypot + zod
// validation + graceful-skip rate limit, then emails the office via Resend.
import { sendLeadEmail } from "@/lib/notify";
import { parseLead } from "@/lib/validate-lead";
import { checkRateLimit } from "@/lib/ratelimit";

function clientId(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") || "";
  return fwd.split(",")[0].trim() || "unknown";
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

  const id = `L-${Math.floor(1000 + Math.random() * 8999)}`;
  return Response.json({ ok: true, id, delivery });
}
```

- [ ] **Step 7: Add the rate-limit guard to the waitlist route**

Read `src/app/api/waitlist/route.ts`. If it has a `POST` handler that accepts writes, add the same two lines after body parse:

```ts
import { checkRateLimit } from "@/lib/ratelimit";
// ... inside POST, after parsing the body:
const limit = await checkRateLimit(
  (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown",
);
if (!limit.ok) {
  return Response.json({ ok: false, error: "Too many requests." }, { status: 429 });
}
```

If it has no write handler, skip this step and note it in the commit body.

- [ ] **Step 8: Build and verify**

Run: `npm run build && npm test`
Expected: build green; all tests pass.

- [ ] **Step 9: Commit**

```bash
git add src/lib/validate-lead.ts src/lib/validate-lead.test.ts src/app/api/lead/route.ts src/app/api/waitlist/route.ts package.json package-lock.json
git commit -m "feat(security): zod validation + rate limit on lead intake"
```

---

## Task 5: Cookieless analytics (Vercel Analytics + Speed Insights)

**Files:**
- Modify: `src/app/layout.tsx:69-78`
- Modify: `package.json` (add `@vercel/analytics`, `@vercel/speed-insights`)

**Interfaces:**
- Consumes: nothing.
- Produces: `<Analytics/>` and `<SpeedInsights/>` mounted in the root `body`.

- [ ] **Step 1: Install deps**

Run: `npm i @vercel/analytics @vercel/speed-insights`
Expected: both in `dependencies`.

- [ ] **Step 2: Mount in the root layout**

In `src/app/layout.tsx`, add imports:

```tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
```

Then inside `<body>`, after `<Toaster ... />`, add:

```tsx
        <Analytics />
        <SpeedInsights />
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: green.

- [ ] **Step 4: Verify cookieless in a preview deploy**

After the next deploy (Task 13 gate, or a preview), run:
`curl -sI https://<deploy-url>/ | grep -i set-cookie` should show no analytics cookies.
Expected: no `set-cookie` from analytics (empty or unrelated only).

- [ ] **Step 5: Confirm the /privacy copy is still accurate**

Read `src/app/(marketing)/privacy/page.tsx`. Confirm it describes privacy-respecting, cookieless analytics; adjust wording only if it now contradicts reality (no invented claims).

- [ ] **Step 6: Commit**

```bash
git add src/app/layout.tsx package.json package-lock.json src/app/\(marketing\)/privacy/page.tsx
git commit -m "feat(privacy): cookieless Vercel Analytics + Speed Insights"
```

---

## Task 6: Mobile form ergonomics + form accessibility

**Files:**
- Modify: `src/components/marketing/consult-form.tsx` (inputs ~188-196, the New/Returning segmented toggle ~170-176, the submit-status region, and the error path)

**Interfaces:**
- Consumes: nothing.
- Produces: correct mobile keyboards; an accessible, scoped submit-status announcement; a keyboard-operable patient-type control; and error handling that marks and focuses the first invalid field.

This task folds in the /webdev a11y findings (wave 4): the segmented toggle uses `role="radio"` with no keyboard model, form errors are toast-only, and the `aria-live` region (if any) should be scoped, not global.

- [ ] **Step 1: Add inputMode to the contact inputs**

In `src/components/marketing/consult-form.tsx`, update the three inputs (note `field` already uses `text-base`, so iOS zoom-on-focus is already prevented; only `inputMode` is missing):

```tsx
<input id="name" name="name" required className={field} autoComplete="name" inputMode="text" />
```

```tsx
<input id="email" name="email" type="email" required className={field} autoComplete="email" inputMode="email" />
```

```tsx
<input id="phone" name="phone" type="tel" required className={field} autoComplete="tel" inputMode="tel" />
```

- [ ] **Step 2: Make the New/Returning patient toggle keyboard-operable**

The current toggle (around line 170) maps over `["New patient", "Returning patient"]` rendering buttons with `role="radio"` but no arrow-key handling or roving tabindex. Convert it to a native radiogroup so keyboard and screen-reader semantics come for free. Replace the button group with:

```tsx
<fieldset className="...existing wrapper classes...">
  <legend className="sr-only">Patient type</legend>
  {(["New patient", "Returning patient"] as const).map((t) => (
    <label key={t} className="...existing per-option classes, plus a has-[:checked] active style...">
      <input
        type="radio"
        name="patientType"
        value={t}
        checked={patientType === t}
        onChange={() => setPatientType(t)}
        className="sr-only"
      />
      {t}
    </label>
  ))}
</fieldset>
```

Preserve the existing visual styling by moving the active/inactive classes onto the `<label>` (use `has-[:checked]:` or derive from `patientType === t`). Native radios give arrow-key navigation automatically. Verify the visual result is unchanged.

- [ ] **Step 3: Mark and focus the first invalid field on error**

Today, validation failure is toast-only. Add `aria-invalid` to required inputs when empty on submit, and move focus to the first invalid field. In the submit handler, before firing the error toast:

```tsx
const firstInvalid = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true'], :invalid");
firstInvalid?.focus();
```

Wire an `errors` state (or read native validity) so each input gets `aria-invalid={!!errors.<field>}`. Keep the existing toast.

- [ ] **Step 4: Add a scoped aria-live submit status**

Add a live region near the submit button so assistive tech announces submit outcome. Scope it (polite, sr-only) so it announces the result only, not every keystroke:

```tsx
<p role="status" aria-live="polite" className="sr-only">
  {statusMessage}
</p>
```

Wire `statusMessage` to the submit result (short success or error string), set in the same place the toast fires. Do not remove the toast.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: green.

- [ ] **Step 6: Commit**

```bash
git add src/components/marketing/consult-form.tsx
git commit -m "feat(mobile+a11y): inputMode, native-radio toggle, aria-invalid focus, scoped aria-live"
```

---

## Task 7: Playwright + axe harness and the a11y gate

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/a11y.spec.ts`
- Modify: `package.json` (add `@playwright/test`, `@axe-core/playwright`, `test:e2e` script)

**Interfaces:**
- Produces: `npm run test:e2e` running axe against key routes; asserts 0 serious/critical.

- [ ] **Step 1: Install deps and the browser**

Run: `npm i -D @playwright/test @axe-core/playwright && npx playwright install chromium`
Expected: deps added; chromium downloaded.

- [ ] **Step 2: Create the Playwright config**

Create `playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  use: { baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000" },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : { command: "npm run build && npm run start", url: "http://localhost:3000", timeout: 180_000, reuseExistingServer: true },
});
```

Note (from memory `playwright-port3000-contamination`): if a dev server is already on :3000 it will be scanned; set `PLAYWRIGHT_BASE_URL` to target a specific deploy, or free :3000.

- [ ] **Step 3: Add the test:e2e script**

In `package.json` `scripts`, add:

```json
"test:e2e": "playwright test"
```

- [ ] **Step 4: Write the axe gate (expected to surface real violations first)**

Create `e2e/a11y.spec.ts`:

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/dry-eye", "/keratoconus", "/portal", "/oradell", "/does-not-exist"];

for (const path of routes) {
  test(`no serious/critical a11y violations on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const bad = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(bad, JSON.stringify(bad.map((v) => ({ id: v.id, nodes: v.nodes.length })), null, 2)).toEqual([]);
  });
}
```

Adjust the `routes` list if a slug differs (verify against `src/lib/services.ts` / `src/lib/conditions.ts`).

- [ ] **Step 5: Run the gate**

Run: `npm run test:e2e`
Expected: initially may FAIL on specific routes; the assertion message lists the violating rule ids.

- [ ] **Step 6: Fix each serious/critical violation**

For each reported rule id, apply the minimal fix at the offending component (common ones: missing label, insufficient name on an icon-only control, ARIA on the Base UI Accordion, focus-visible). Re-run until green. Respect the existing `prefers-reduced-motion` block for any motion. Do NOT weaken to pass; fix the root cause.

- [ ] **Step 7: Re-run to confirm green**

Run: `npm run test:e2e`
Expected: PASS on all routes.

- [ ] **Step 8: Commit**

```bash
git add playwright.config.ts e2e/a11y.spec.ts package.json package-lock.json src/
git commit -m "test(a11y): axe gate across key routes + fixes"
```

---

## Task 8: Mobile tap targets + no-horizontal-scroll

**Files:**
- Create: `e2e/mobile.spec.ts`
- Modify: components/`globals.css` as flagged by the measurement

**Interfaces:**
- Consumes: the Playwright harness (Task 7).
- Produces: a 390px viewport gate asserting no horizontal overflow and >=44px interactive targets.

- [ ] **Step 1: Write the measurement gate (expected to surface real issues)**

Create `e2e/mobile.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

const routes = ["/", "/dry-eye", "/keratoconus", "/oradell"];

test.use({ viewport: { width: 390, height: 844 } });

for (const path of routes) {
  test(`no horizontal scroll on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, "page should not scroll horizontally at 390px").toBeLessThanOrEqual(1);
  });

  test(`interactive targets are >=44px on ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const small = await page.$$eval("a, button, [role=button]", (els) =>
      els
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { tag: el.tagName, w: Math.round(r.width), h: Math.round(r.height), text: (el.textContent || "").trim().slice(0, 30) };
        })
        .filter((b) => b.w > 0 && b.h > 0 && (b.w < 44 || b.h < 44)),
    );
    expect(small, JSON.stringify(small, null, 2)).toEqual([]);
  });
}
```

- [ ] **Step 2: Run it**

Run: `npm run test:e2e -- mobile`
Expected: may FAIL, listing undersized targets and any overflowing route.

- [ ] **Step 3: Fix flagged targets**

For each reported element, raise the hit area to >=44px (add padding or `min-h-11 min-w-11` on the interactive element) WITHOUT changing desktop (scope with responsive prefixes). For overflow, find the offending wide element (table, image, pre) and constrain it (`max-w-full`, `overflow-x-auto` on its container). Inline footer/legal micro-links that are intentionally small may be excluded by tightening the selector, but prefer enlarging the hit area.

- [ ] **Step 4: Responsive rhythm + sticky-CTA pass**

While at 390px, review heading/hero scale and section spacing on the fixed routes; tune Tailwind responsive classes for readability. Confirm the existing `MobileCtaBar` does not overlap the footer (the spacer at `mobile-cta-bar.tsx:12` handles this) and respects safe-area. Keep changes minimal and desktop-neutral.

- [ ] **Step 5: Re-run to confirm green**

Run: `npm run test:e2e -- mobile`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add e2e/mobile.spec.ts src/
git commit -m "feat(mobile): 44px tap targets + no horizontal scroll + rhythm"
```

---

## Task 9: Custom 404 recovery page

**Files:**
- Create: `src/app/not-found.tsx`

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter`, `practice`, `CONTACT_CTA`, `btn`, `SERVICES` (verify exact export names before use).
- Produces: a branded recovery page rendered on unknown routes.

- [ ] **Step 1: Write the failing e2e check**

Add to `e2e/a11y.spec.ts` a focused assertion (or a new `e2e/not-found.spec.ts`):

```ts
import { test, expect } from "@playwright/test";

test("custom 404 offers recovery links", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("link", { name: /home/i })).toBeVisible();
  await expect(page.getByText(/can.?t find|not found|went looking/i)).toBeVisible();
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npm run test:e2e -- not-found`
Expected: FAIL (default Next 404, no recovery copy).

- [ ] **Step 3: Implement the recovery page**

Create `src/app/not-found.tsx` (verify `SERVICES` shape in `src/lib/services.ts` and `CONTACT_CTA` in `src/lib/site.ts`; adjust field names if they differ):

```tsx
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { btn } from "@/lib/ui";
import { practice, CONTACT_CTA } from "@/lib/site";
import { SERVICES } from "@/lib/services";

export default function NotFound() {
  const top = SERVICES.slice(0, 6);
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="eyebrow text-clay">Page not found</p>
          <h1 className="mt-3 font-display text-3xl text-teal md:text-4xl">
            We could not find that page
          </h1>
          <p className="mt-4 text-ink-soft">
            The link may be old or mistyped. Here are good places to pick back up.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className={btn()}>Back to home</Link>
            <Link href={CONTACT_CTA.book} className={btn("outline")}>{CONTACT_CTA.bookLabel}</Link>
            <a href={practice.phoneHref} className={btn("ghost")}>Call {practice.phone}</a>
          </div>
          <nav aria-label="Popular services" className="mt-12 grid gap-2 text-left sm:grid-cols-2">
            {top.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal hover:text-teal"
              >
                {s.name}
              </Link>
            ))}
          </nav>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 4: Run the e2e check to pass**

Run: `npm run test:e2e -- not-found`
Expected: PASS.

- [ ] **Step 5: Build + commit**

Run: `npm run build`

```bash
git add src/app/not-found.tsx e2e/
git commit -m "feat(visibility): branded 404 recovery page"
```

---

## Task 10: Reusable visible breadcrumb

**Files:**
- Create: `src/components/site/breadcrumb.tsx`
- Modify: `src/components/marketing/service-view.tsx:57-61` (replace inline breadcrumb)
- Modify: `src/components/marketing/condition-view.tsx` (replace inline breadcrumb)
- Modify: deep pages lacking a visible breadcrumb: `src/app/(marketing)/oradell/page.tsx`, `src/app/(marketing)/about/page.tsx`, `src/app/(marketing)/areas/[slug]/page.tsx`

**Interfaces:**
- Produces: `<Breadcrumb items={{ name: string; href?: string }[]} />` rendering `<nav aria-label="Breadcrumb">` and mirroring the current markup at `service-view.tsx:57`.

- [ ] **Step 1: Create the component**

Create `src/components/site/breadcrumb.tsx`:

```tsx
import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="pt-8 text-sm text-ink-soft">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={it.name}>
            {it.href && !last ? (
              <Link href={it.href} className="hover:text-teal">
                {it.name}
              </Link>
            ) : (
              <span className="text-ink" aria-current={last ? "page" : undefined}>
                {it.name}
              </span>
            )}
            {!last && <span className="px-2 text-clay">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Replace the inline breadcrumb in service-view**

In `src/components/marketing/service-view.tsx`, import `Breadcrumb` and replace the `<nav aria-label="Breadcrumb">...</nav>` at lines 57-61 with:

```tsx
<Breadcrumb items={[{ name: "Home", href: "/" }, { name: s.name }]} />
```

Keep the existing `breadcrumbSchema([...])` in the JsonLd block unchanged.

- [ ] **Step 3: Replace the inline breadcrumb in condition-view**

Do the same in `src/components/marketing/condition-view.tsx` (match its existing crumb labels; keep its `breadcrumbSchema`).

- [ ] **Step 4: Add visible breadcrumbs to the remaining deep pages**

On `oradell`, `about`, and `areas/[slug]` pages, add `<Breadcrumb items={[{ name: "Home", href: "/" }, { name: <page title> }]} />` near the top of the hero, matching each page's existing `breadcrumbSchema` labels so the visible and structured layers agree.

- [ ] **Step 5: Verify a11y still green**

Run: `npm run test:e2e -- a11y`
Expected: PASS (breadcrumb adds a labeled nav landmark).

- [ ] **Step 6: Build + commit**

Run: `npm run build`

```bash
git add src/components/site/breadcrumb.tsx src/components/marketing/service-view.tsx src/components/marketing/condition-view.tsx "src/app/(marketing)/oradell/page.tsx" "src/app/(marketing)/about/page.tsx" "src/app/(marketing)/areas/[slug]/page.tsx"
git commit -m "feat(visibility): reusable visible breadcrumb across deep pages"
```

---

## Task 11: Related-links (Keep exploring) on all leaf pages

**Files:**
- Create: `src/components/marketing/keep-exploring.tsx`
- Modify: `src/components/marketing/condition-view.tsx` (add related-links)
- Modify: `src/app/(marketing)/areas/[slug]/page.tsx` (add related-links)

**Interfaces:**
- Produces: `<KeepExploring links={{ label: string; href: string }[]} />`, a labeled section with a primary CTA so no page is a dead end. `service-view.tsx` already has an equivalent "Related care" block (lines ~262); this generalizes it for the pages that lack one.

- [ ] **Step 1: Create the component**

Create `src/components/marketing/keep-exploring.tsx`:

```tsx
import Link from "next/link";
import { btn } from "@/lib/ui";
import { CONTACT_CTA } from "@/lib/site";

export function KeepExploring({
  links,
  heading = "Keep exploring",
}: {
  links: { label: string; href: string }[];
  heading?: string;
}) {
  return (
    <section aria-labelledby="keep-exploring" className="border-t border-line bg-bone">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <h2 id="keep-exploring" className="eyebrow text-clay">{heading}</h2>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-xl border border-line px-4 py-3 text-ink transition-colors hover:border-teal hover:text-teal"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link href={CONTACT_CTA.book} className={btn()}>{CONTACT_CTA.bookLabel}</Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add it to condition-view**

In `src/components/marketing/condition-view.tsx`, before the closing fragment/footer area, add `<KeepExploring links={[...]} />` populated with the condition's related services/conditions (reuse the page's existing `related`/parent data; do not invent links).

- [ ] **Step 3: Add it to the areas page**

In `src/app/(marketing)/areas/[slug]/page.tsx`, add `<KeepExploring links={[...]} />` linking to top services and `/oradell` so a visitor from a town page always has a next step.

- [ ] **Step 4: Build + verify no dead ends**

Run: `npm run build`
Manually: load a condition page and an areas page; confirm each ends with related links + a CTA.

- [ ] **Step 5: Commit**

```bash
git add src/components/marketing/keep-exploring.tsx src/components/marketing/condition-view.tsx "src/app/(marketing)/areas/[slug]/page.tsx"
git commit -m "feat(visibility): related-links so no leaf page is a dead end"
```

---

## Task 12: SEO/schema coverage verification

**Files:**
- Create: `src/lib/schema.test.ts`
- Modify: any page found missing canonical/OG or FAQ/breadcrumb schema

**Interfaces:**
- Consumes: `faqSchema`, `breadcrumbSchema`, `localBusinessSchema` (all exist in `src/lib/schema.ts`).
- Produces: unit tests asserting schema builders emit valid shapes; a documented coverage check.

- [ ] **Step 1: Write schema-builder tests**

Create `src/lib/schema.test.ts`:

```ts
import { expect, test } from "vitest";
import { faqSchema, breadcrumbSchema, localBusinessSchema } from "./schema";

test("faqSchema builds a FAQPage with questions", () => {
  const s = faqSchema([{ q: "Q1", a: "A1" }]);
  expect(s["@type"]).toBe("FAQPage");
  expect(s.mainEntity[0]["@type"]).toBe("Question");
  expect(s.mainEntity[0].acceptedAnswer.text).toBe("A1");
});

test("breadcrumbSchema numbers positions from 1 and builds absolute URLs", () => {
  const s = breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Dry Eye", path: "/dry-eye" }]);
  expect(s.itemListElement[0].position).toBe(1);
  expect(s.itemListElement[1].item).toMatch(/^https?:\/\/.+\/dry-eye$/);
});

test("localBusiness carries real aggregate rating", () => {
  const s = localBusinessSchema();
  expect(Number(s.aggregateRating.ratingValue)).toBeGreaterThan(0);
  expect(Number(s.aggregateRating.reviewCount)).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run to pass**

Run: `npm test -- schema`
Expected: PASS (3 tests).

- [ ] **Step 3: Coverage audit**

Run these greps and confirm every indexable route type has what it needs:
`grep -rl "export const metadata\|generateMetadata" "src/app/(marketing)"` (every page has metadata),
`grep -rl "faqSchema" src` (FAQ pages emit FAQPage),
`grep -rl "breadcrumbSchema\|<Breadcrumb" src` (deep pages emit breadcrumbs).
For any deep page missing metadata `alternates.canonical` or OpenGraph, add it using the root-layout pattern (`src/app/layout.tsx:43-56`). Do not invent copy; derive titles/descriptions from existing page content.

- [ ] **Step 4: Fix the openGraph override that strips og:image (webdev SEO F3)**

Several service/area pages (`medical-eye-care`, `vision-therapy`, `neuro-optometric-rehabilitation`, `specialty-contact-lenses`, `dry-eye-treatment`, `ortho-k`, `myopia-management`, `areas/[slug]`) set a page-level `openGraph: { title, description }`, which REPLACES (not merges) the root layout's `openGraph`, dropping `og:type`, `og:url`, `og:image`, `og:siteName`. Add a helper and use it so per-page OG merges with the base:

Create `src/lib/og.ts`:

```ts
import { practice } from "@/lib/site";

export function buildOg(input: { title: string; description: string; path: string }) {
  return {
    type: "website" as const,
    siteName: practice.name,
    locale: "en_US",
    url: input.path,
    title: input.title,
    description: input.description,
  };
}
```

In each listed page's metadata, replace `openGraph: { title, description }` with `openGraph: buildOg({ title, description, path: "/<slug>" })`. Verify with `curl` (Step 8) that these pages emit `og:type`/`og:url` again. Do not invent copy; reuse each page's existing title/description strings.

- [ ] **Step 5: Emit Physician schema for all providers (webdev AEO)**

`src/app/(marketing)/about/page.tsx` currently emits `physicianSchema("dr-mina-han")` only. Emit one for every provider so AI engines see all four doctors. In `about/page.tsx`, replace the single call with:

```tsx
...providers.map((p) => physicianSchema(p.slug)).filter(Boolean),
```

(`providers` is already imported there; `physicianSchema` returns `null` for unknown slugs, hence `.filter(Boolean)`.) Confirm each provider has a `slug`, `photo`, and `languages` field in `src/lib/site.ts`; if a field is missing the builder still returns a valid object.

- [ ] **Step 6: Refresh llms.txt (webdev AEO)**

`public/llms.txt` is stale (lists 3 doctors and 3 services). Update it from the source of truth: all 4 providers (`providers` in `src/lib/site.ts`) and all 7 services (`SERVICES` in `src/lib/services.ts`), and add the condition pages `/keratoconus` and `/meibomian-gland-dysfunction`. Use exact names/URLs from those modules; do not invent descriptions. Keep it a concise plaintext index.

- [ ] **Step 7: Verify sitemap completeness**

Run: `npm run build && npm run start` then `curl -s http://localhost:3000/sitemap.xml | grep -c "<loc>"` and confirm it includes services, conditions, areas, /portal, /oradell, /about.
Expected: count matches the known route set.

- [ ] **Step 8: Verify OG on a fixed page**

With the server running: `curl -s http://localhost:3000/dry-eye-treatment | grep -oE 'og:(type|url|image|title)'` should now include `og:type` and `og:url` again.
Expected: og:type and og:url present (not stripped).

- [ ] **Step 9: Commit**

```bash
git add src/lib/schema.test.ts src/lib/og.ts src/ public/llms.txt
git commit -m "fix(seo): merge-safe OG helper, all-provider Physician schema, refreshed llms.txt + schema tests"
```

---

## Task 13: Content-stranding robustness (never-stranded, HIGH)

**Files:**
- Modify: `src/components/site/editorial-index.tsx`, `src/components/site/editorial-list.tsx`, `src/components/site/process-timeline.tsx`, `src/components/marketing/portal-tour.tsx`
- Reference (do not change): `src/components/site/reveal.tsx` (the correct contract), `src/components/marketing/proof-ledger.tsx` (watch its `useCountUp`)

**Interfaces:**
- Consumes: the existing in-view hook (`src/lib/use-in-view.ts`).
- Produces: reveal components that render VISIBLE content in SSR and when JS/the IntersectionObserver never runs.

The /webdev wave-1 HIGH finding: `EditorialIndex` / `EditorialList` / `ProcessTimeline` / `portal-tour` gate content with `useInView` (initial state `false`) and apply `opacity: 0` inline during SSR. If JS fails, is blocked, or the observer never fires, the homepage service ladder (a primary conversion path) stays invisible. `reveal.tsx` already solves this with a visible-by-default contract.

- [ ] **Step 1: Read the correct contract**

Read `src/components/site/reveal.tsx`. Note how it stays visible unless `mounted && !inView` (it only hides AFTER mount confirms JS is running), so no-JS and pre-hydration render fully visible.

- [ ] **Step 2: Add a Playwright no-JS guard (expected to fail first)**

Add to `e2e/mobile.spec.ts` (or a new `e2e/no-js.spec.ts`) a test with JavaScript disabled:

```ts
import { test, expect } from "@playwright/test";

test.use({ javaScriptEnabled: false });

test("homepage service ladder is visible without JS", async ({ page }) => {
  await page.goto("/");
  // the editorial service index must be visible (opacity not 0) with JS off
  const items = page.locator("[data-reveal], .editorial-index, section:has(h2)");
  await expect(items.first()).toBeVisible();
  const opacity = await items.first().evaluate((el) => getComputedStyle(el).opacity);
  expect(Number(opacity)).toBeGreaterThan(0);
});
```

Adjust the selector to the real container once you read the components.

- [ ] **Step 3: Run it and watch it fail**

Run: `npm run test:e2e -- no-js` (or the file you added it to)
Expected: FAIL (content is `opacity:0` with JS off).

- [ ] **Step 4: Convert each component to visible-by-default**

In each of the four components, change the in-view gating so the element is hidden ONLY when `mounted && !inView` (add a `mounted` state set to `true` in a `useEffect`, mirroring `reveal.tsx`). The inline style should compute to full opacity during SSR and with JS off. Do not change the animated-in behavior when JS is present. Re-check the `proof-ledger` `useCountUp` still starts/finishes correctly (it shares the in-view trigger).

- [ ] **Step 5: Run the guard to pass**

Run: `npm run test:e2e -- no-js`
Expected: PASS. Also re-run `npm run test:e2e -- a11y` to confirm no regressions.

- [ ] **Step 6: Build + commit**

Run: `npm run build`

```bash
git add src/components/site/editorial-index.tsx src/components/site/editorial-list.tsx src/components/site/process-timeline.tsx src/components/marketing/portal-tour.tsx e2e/
git commit -m "fix(never-stranded): reveal components visible-by-default (no-JS safe)"
```

---

## Task 14: QA leftovers (Safari marker + dashboard StageBadge)

**Files:**
- Modify: `src/components/marketing/consult-form.tsx` (Safari `summary` marker) or `src/app/globals.css`
- Modify: `src/app/dashboard/page.tsx` (~line 83, StageBadge input)

**Interfaces:**
- Consumes: nothing.
- Produces: a clean Safari expander and a correctly-fed dashboard StageBadge.

These are two small correctness/polish fixes from the /webdev QA pass (wave 6 leftovers).

- [ ] **Step 1: Hide the default Safari details marker**

The optional-details `<details>/<summary>` expander shows a duplicate disclosure triangle in Safari. Add to `src/app/globals.css` (global, so it applies wherever the pattern is used):

```css
summary::-webkit-details-marker {
  display: none;
}
```

- [ ] **Step 2: Fix the dashboard StageBadge input**

Read `src/app/dashboard/page.tsx` around line 83. `StageBadge` is being fed `serviceInterest` where it expects the lead's `stage`. Pass the correct `stage` field (inspect the lead/demo-store shape in `src/lib/demo-store.ts` / `src/lib/leads.ts` for the right property). If a lead has no stage, pass a sensible default (e.g. the first stage), not the service string.

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: green (note the pre-existing `dashboard/gate.tsx` setState-in-effect warning is unrelated).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/dashboard/page.tsx
git commit -m "fix(qa): hide Safari details marker + correct dashboard StageBadge input"
```

---

## Task 15: Full verification + deploy gate

**Files:**
- None (verification + deploy)

- [ ] **Step 1: Full local gate**

Run: `npm run build && npm test && npm run test:e2e`
Expected: build green; all unit tests pass; a11y + mobile gates pass.

- [ ] **Step 2: Deploy to production**

Run: `vercel --prod --yes`
If it fails with "Project not found," run the recovery playbook (memory `riverdell-vercel-deploy-recovery.md`): confirm framework=nextjs and ssoProtection=null on the iser-labs project, deploy with `--scope iser-labs`, and re-set the alias.

- [ ] **Step 3: Verify production is public and correct**

```bash
curl -sI https://riverdell-vision.vercel.app/ | grep -iE "^HTTP|content-security-policy-report-only|strict-transport|x-frame"
curl -s https://riverdell-vision.vercel.app/ | grep -o aspect-square | wc -l   # expect 56
curl -s -o /dev/null -w "%{http_code}\n" https://riverdell-vision.vercel.app/this-does-not-exist  # expect 404 (custom page)
```
Expected: HTTP 200 on `/`, CSP-Report-Only + HSTS + X-Frame headers present, 56 hero cells, custom 404 on an unknown route.

- [ ] **Step 4: Update the resume + memory**

Update `docs/superpowers/RESUME-riverdell.md` (mark this program shipped) and note in memory `riverdell-vision-growth-platform.md` that S1/S2/S3 landed, plus the owner action items below.

- [ ] **Step 5: Final commit**

```bash
git add docs/superpowers/RESUME-riverdell.md
git commit -m "docs: security/mobile/a11y program shipped"
```

---

## Owner action items (post-merge, all inert-safe if unset)

- **HIGHEST (leads go nowhere without it):** set `RESEND_API_KEY` + `LEAD_TO_EMAIL` + verified `LEAD_FROM_EMAIL` in Vercel and send one real test. Until then the form shows success but `src/lib/notify.ts` returns "skipped".
- Vercel env: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (enables rate-limiting; without them the limiter safely skips).
- Vercel project: enable Web Analytics + Speed Insights.
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before launch (affects canonicals, OG urls, schema `@id`s).
- Follow-up (separate change): after observing `/api/csp-report`, flip CSP from Report-Only to enforcing.
- Future custom domain: add full HSTS (`includeSubDomains; preload`) only once a real domain (not `*.vercel.app`) is attached.

## Self-Review notes

- **Spec coverage:** S1 headers (Task 2), rate-limit (Task 3), zod (Task 4), analytics/privacy (Task 5); S2 all four tracks (Task 6 form ergonomics, Task 7 a11y overlaps focus, Task 8 tap targets + rhythm + sticky CTA); S3 AT-a11y (Task 7 + Task 6 aria-live), SEO/AEO (Task 12), never-stranded (Task 9 404 + Task 10 breadcrumbs + Task 11 related-links). All covered.
- **Pre-existing, do not rebuild:** skip link + `#main` (already in layouts), schema builders (already in `lib/schema.ts`), `field` 16px font (already prevents iOS zoom), sticky CTA safe-area/spacer (already done). Tasks verify/extend these rather than recreate them.
- **Type consistency:** `checkRateLimit` returns `{ ok, configured }` used identically in Tasks 3/4; `parseLead` returns a discriminated union used in Task 4; `Breadcrumb` takes `{ name, href? }[]` in Task 10; `KeepExploring` takes `{ label, href }[]` in Task 11.
