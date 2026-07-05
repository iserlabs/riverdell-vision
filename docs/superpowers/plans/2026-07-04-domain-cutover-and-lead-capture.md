# Domain Cutover and Lead Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the site onto `riverdellvision.com`, make on-site lead capture deliver, and 301-map every old Roya URL, without disturbing Google Workspace email.

**Architecture:** One code deliverable (a legacy 301 redirect map wired into `next.config.ts`) plus a sequenced operational runbook for Vercel env, Resend, and Namecheap DNS. The site's `SITE_URL` already reads `NEXT_PUBLIC_SITE_URL`, so flipping the domain is an env change, not a code change.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Vitest, Vercel, Namecheap DNS, Resend, Google Workspace.

**Source spec:** `docs/superpowers/specs/2026-07-04-domain-cutover-and-lead-capture-design.md`

## Global Constraints

- Next.js 16: this is not older Next. Read `node_modules/next/dist/docs/` before using any Next API you are unsure of. (Per repo `AGENTS.md`.)
- Package manager: `pnpm` only. Never `npm`/`yarn`.
- `next.config.ts` dynamic relative imports require an explicit `.ts` extension (Node ESM resolver), matching the existing `headers()` pattern.
- Canonical host: apex `https://riverdellvision.com`. `www` 301-redirects to apex.
- Resend sending domain: `send.riverdellvision.com`. All Resend DNS records live only on that subdomain.
- Never edit the root-domain `MX` (Google Workspace), the `google-site-verification` TXT, or the existing root SPF (`v=spf1 include:dc-aa8e722993._spfm.riverdellvision.com ~all`).
- All legacy redirects are permanent (`permanent: true`, HTTP 301).
- Client repo: commit messages are human-voiced with no Claude/AI co-author trailers.
- No em dash (U+2014) in any output or file.
- The DNS flip (Task 5) is outward-facing and waits for explicit owner GO.

## File Structure

- Create: `src/lib/redirects.ts` (the legacy URL map and its assembly into a redirect array; single responsibility).
- Create: `src/lib/redirects.test.ts` (Vitest coverage of the map).
- Modify: `next.config.ts:11-14` (spread the legacy map into `redirects()`).
- Operational (no repo files): Vercel env vars, Namecheap DNS records, Resend domain, Google Search Console.

## Task Executability

- **Task 1** is code and is executable now with no owner credentials.
- **Tasks 2 to 5** are operational and need owner accounts (Resend, Vercel env, Namecheap). Task 5 additionally needs explicit GO.
- **Task 6** is the final verification once the domain is live.

---

### Task 1: Legacy 301 redirect map (code)

**Files:**
- Create: `src/lib/redirects.ts`
- Test: `src/lib/redirects.test.ts`
- Modify: `next.config.ts` (lines 11-14, the `redirects()` method)

**Interfaces:**
- Produces: `export const legacyRedirects: { source: string; destination: string; permanent: true }[]` from `src/lib/redirects.ts`, consumed by `next.config.ts`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/redirects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { legacyRedirects } from "./redirects";

describe("legacyRedirects", () => {
  it("covers all 59 legacy URLs (29 pages + 30 blog posts)", () => {
    expect(legacyRedirects).toHaveLength(59);
  });

  it("has no duplicate source paths", () => {
    const sources = legacyRedirects.map((r) => r.source);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("every destination is an absolute path and every redirect is a permanent 301", () => {
    for (const r of legacyRedirects) {
      expect(r.source.startsWith("/")).toBe(true);
      expect(r.destination.startsWith("/")).toBe(true);
      expect(r.permanent).toBe(true);
    }
  });

  it("maps representative page and blog URLs to the correct new routes", () => {
    const map = Object.fromEntries(legacyRedirects.map((r) => [r.source, r.destination]));
    expect(map["/services/myopia-control.html"]).toBe("/myopia-management");
    expect(map["/request-an-appointment.html"]).toBe("/book");
    expect(map["/our-team.html"]).toBe("/about");
    expect(map["/financing.html"]).toBe("/cost-and-insurance");
    expect(map["/blog/tips-for-managing-winter-dry-eye.html"]).toBe("/dry-eye-treatment");
    expect(map["/blog/atropine-eye-drops-how-they-help-slow-myopia-progression-in-kids.html"]).toBe("/myopia-management");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm vitest run src/lib/redirects.test.ts`
Expected: FAIL, cannot resolve `./redirects`.

- [ ] **Step 3: Write the implementation**

Create `src/lib/redirects.ts`:

```ts
// Legacy Roya URL redirects (301). Maps every old .html URL to its closest
// equivalent on the new site so link equity and bookmarks survive the cutover.
// Consumed by next.config.ts redirects(). Source of truth for the mapping is
// docs/superpowers/specs/2026-07-04-domain-cutover-and-lead-capture-design.md.

type LegacyRedirect = { source: string; destination: string; permanent: true };

// Old top-level and /services pages.
const pages: [string, string][] = [
  ["/index.html", "/"],
  ["/about.html", "/about"],
  ["/our-doctor.html", "/about"],
  ["/our-team.html", "/about"],
  ["/contact-us.html", "/oradell"],
  ["/request-an-appointment.html", "/book"],
  ["/reviews.html", "/reviews"],
  ["/financing.html", "/cost-and-insurance"],
  ["/payment-options.html", "/cost-and-insurance"],
  ["/frames.html", "/"],
  ["/services/eyewear.html", "/"],
  ["/blog.html", "/answers"],
  ["/sitemap.html", "/"],
  ["/services.html", "/"],
  ["/comprehensive-eye-exam.html", "/medical-eye-care"],
  ["/accessibility-statement.html", "/accessibility"],
  ["/privacy-policy.html", "/privacy"],
  ["/pediatric-eye-exams.html", "/about#care"],
  ["/services/pediatric-eye-exams.html", "/about#care"],
  ["/services-eye-health-exams.html", "/medical-eye-care"],
  ["/services/eye-health-exams.html", "/medical-eye-care"],
  ["/services-glaucoma-treatment.html", "/medical-eye-care"],
  ["/services/glaucoma-treatment.html", "/medical-eye-care"],
  ["/services/visual-field-exams.html", "/medical-eye-care"],
  ["/services/custom-contact-lens-fitting.html", "/specialty-contact-lenses"],
  ["/services/myopia-control.html", "/myopia-management"],
  ["/services/vision-therapy.html", "/vision-therapy"],
  ["/services/neuro-optometric-rehabilitation.html", "/neuro-optometric-rehabilitation"],
  ["/services/neuro-cognitive-optometry.html", "/neuro-optometric-rehabilitation"],
];

// Old blog posts, mapped topically. Authoritative table (Appendix A of the spec).
const blog: [string, string][] = [
  ["5-common-signs-your-child-may-benefit-from-vision-therapy", "/vision-therapy"],
  ["allergies", "/dry-eye-treatment"],
  ["atropine-eye-drops-how-they-help-slow-myopia-progression-in-kids", "/myopia-management"],
  ["better-vision", "/answers"],
  ["does-vision-therapy-require-ongoing-treatment-or-maintenance", "/vision-therapy"],
  ["dry-eye-or-allergies-how-to-tell-whats-really-irritating-your-eyes", "/dry-eye-treatment"],
  ["eye-education", "/answers"],
  ["glaucoma-and-family-history-are-you-at-higher-risk", "/medical-eye-care"],
  ["healthy-eyes-during-summer", "/answers"],
  ["how-a-custom-contact-lens-fitting-improves-comfort-and-vision", "/specialty-contact-lenses"],
  ["how-aging-environment-and-lifestyle-contribute-to-dry-eye", "/dry-eye-treatment"],
  ["how-can-specific-lifestyle-adjustments-help-prevent-myopia-from-worsening", "/myopia-management"],
  ["how-does-pediatric-vision-therapy-work", "/vision-therapy"],
  ["how-early-vision-care-prevents-long-term-problems-in-children", "/about#care"],
  ["how-glaucoma-treatment-has-evolved-protecting-your-peripheral-vision", "/medical-eye-care"],
  ["how-much-screen-time-is-too-much-protecting-your-childs-eyes", "/myopia-management"],
  ["how-neuro-cognitive-optometry-can-help-improve-learning-and-focus-boosting-mental-skills", "/neuro-optometric-rehabilitation"],
  ["how-to-maintain-strong-retinal-health-as-you-age", "/medical-eye-care"],
  ["how-vision-therapy-can-help-with-attention-and-focus-in-the-classroom", "/vision-therapy"],
  ["mapping-ocular-health-what-new-jersey-high-tech-retinal-imaging-reveals-about-your-wellness", "/medical-eye-care"],
  ["myopia-in-adults-causes-symptoms-and-treatment-options", "/myopia-management"],
  ["protect-your-eyes", "/answers"],
  ["the-importance-of-comprehensive-eye-exams-protect-your-vision-for-life", "/medical-eye-care"],
  ["the-role-of-vision-in-brain-injury-recovery-why-neuro-optometric-rehabilitation-matters", "/neuro-optometric-rehabilitation"],
  ["tips-for-managing-winter-dry-eye", "/dry-eye-treatment"],
  ["treating-visual-processing-issues-with-neuro-optometric-techniques", "/neuro-optometric-rehabilitation"],
  ["understanding-visual-field-testing-and-its-role-in-eye-health", "/medical-eye-care"],
  ["vision-genetics", "/answers"],
  ["what-is-neuro-cognitive-optometry-understanding-the-role-of-vision-in-learning-and-behavior", "/neuro-optometric-rehabilitation"],
  ["when-we-see-a-young-patient-with-rapid-vision-changes-this-is-what-we-recommend", "/medical-eye-care"],
];

export const legacyRedirects: LegacyRedirect[] = [
  ...pages.map(([source, destination]) => ({ source, destination, permanent: true as const })),
  ...blog.map(([slug, destination]) => ({
    source: `/blog/${slug}.html`,
    destination,
    permanent: true as const,
  })),
];
```

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm vitest run src/lib/redirects.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Wire the map into `next.config.ts`**

Replace the `redirects()` method (lines 11-14) with:

```ts
  async redirects() {
    // /focus was a removed demo spike; redirect any old links instead of 404ing.
    // legacyRedirects: the old Roya .html URLs. Explicit .ts extension is required
    // by Next 16's Node ESM resolver, same as the headers() import below.
    const { legacyRedirects } = await import("./src/lib/redirects.ts");
    return [
      { source: "/focus", destination: "/", permanent: true },
      ...legacyRedirects,
    ];
  },
```

- [ ] **Step 6: Verify the build and redirects locally**

Run: `pnpm build`
Expected: build succeeds; the build log's route/redirect count reflects the added redirects with no errors.

- [ ] **Step 7: Run the full unit suite and lint**

Run: `pnpm test && pnpm lint`
Expected: all unit tests pass (existing 14 plus the new file), lint clean.

- [ ] **Step 8: Commit**

```bash
git add src/lib/redirects.ts src/lib/redirects.test.ts next.config.ts
git commit -m "feat(seo): 301-redirect legacy Roya URLs to their new equivalents"
```

---

### Task 2: Stop the lead bleed (operational, owner-gated)

No repo changes. Makes forms deliver today via the `onboarding@resend.dev` sender fallback.

**Preconditions:** a Resend API key and the office inbox address.

- [ ] **Step 1:** In Resend, create an API key (or obtain the owner's key).
- [ ] **Step 2:** Set production env vars (from the repo directory):

```bash
cd ~/Claude/riverdell-vision
vercel env add RESEND_API_KEY production   # paste the key
vercel env add LEAD_TO_EMAIL production     # e.g. hello@riverdellvision.com
```

- [ ] **Step 3 (optional but recommended):** add Upstash so rate limiting is real:

```bash
vercel env add UPSTASH_REDIS_REST_URL production
vercel env add UPSTASH_REDIS_REST_TOKEN production
```

- [ ] **Step 4:** Redeploy production: `vercel deploy --prod --yes`
- [ ] **Step 5: Verify.** Submit a real appointment-request form on the live site. Confirm the office inbox receives the email with all fields, and that the API response `delivery` is `"sent"` (not `"skipped"`). Check the network response in the browser dev tools or:

```bash
curl -s -X POST https://riverdell-vision.vercel.app/api/lead \
  -H 'content-type: application/json' \
  -d '{"name":"Test Patient","phone":"2015551234","email":"you@example.com"}' | grep -o '"delivery":"[a-z]*"'
```

Expected: `"delivery":"sent"`.

---

### Task 3: Branded sender on send.riverdellvision.com (operational, owner-gated)

**Preconditions:** Task 2 done. Namecheap access.

- [ ] **Step 1:** In Resend, add domain `send.riverdellvision.com`. Copy the DKIM and SPF records Resend generates.
- [ ] **Step 2:** In Namecheap Advanced DNS, add only those records, all on the `send` host. Do not edit any root record.
- [ ] **Step 3:** Wait for Resend to report the subdomain verified.
- [ ] **Step 4:** Set the branded sender and redeploy:

```bash
cd ~/Claude/riverdell-vision
vercel env add LEAD_FROM_EMAIL production   # Riverdell Vision <hello@send.riverdellvision.com>
vercel deploy --prod --yes
```

- [ ] **Step 5: Verify.** Submit a form. Confirm the email arrives from the branded sender and that SPF and DKIM pass (inspect the received email headers). Send and receive a normal test email on the Google Workspace inbox to confirm root mail is unaffected.

---

### Task 4: Attach domain and flip all absolute URLs (operational, owner-gated)

**Preconditions:** Task 1 merged.

- [ ] **Step 1:** In Vercel, add `riverdellvision.com` and `www.riverdellvision.com` to the project. Set `riverdellvision.com` as the primary domain so `www` redirects to it. Note the DNS targets Vercel shows (used in Task 5).
- [ ] **Step 2:** Set the canonical site URL and redeploy:

```bash
cd ~/Claude/riverdell-vision
vercel env add NEXT_PUBLIC_SITE_URL production   # https://riverdellvision.com
vercel deploy --prod --yes
```

- [ ] **Step 3: Verify (on the Vercel deployment URL, before any DNS change).** Confirm every absolute URL now reads the real domain:

```bash
V=https://riverdell-vision.vercel.app
curl -s "$V" | grep -oE '<link rel="canonical"[^>]*>|<meta property="og:url"[^>]*>'
curl -s "$V/sitemap.xml" | grep -oE "<loc>[^<]+</loc>" | head -3
curl -s "$V" | grep -o '"@id":"[^"]*#practice"'
```

Expected: all read `https://riverdellvision.com...`.

---

### Task 5: Staged DNS flip on Namecheap (operational, GO-gated)

**Preconditions:** Tasks 1 to 4 done and verified. Explicit owner GO. Before starting, lower the TTL on the `www` and apex records to 5 minutes so rollback is fast.

- [ ] **Step 1: www first.** In Namecheap Advanced DNS, change the `www` host from the A record `172.235.51.175` to a CNAME to `cname.vercel-dns.com`. Wait for propagation (`dig +short www.riverdellvision.com`).
- [ ] **Step 2: Verify www.** Confirm the new site over valid SSL, forms deliver, redirects work, schema resolves to the real domain:

```bash
curl -sI https://www.riverdellvision.com | grep -iE "^(HTTP|strict-transport|location)"
curl -s -o /dev/null -w "%{http_code}\n" https://www.riverdellvision.com/services/myopia-control.html   # expect 301
```

The bare apex still serves Roya during this window (intended safety net).

- [ ] **Step 3: Apex flip.** Once www is proven, change the apex `@` host from the A record `172.235.51.175` to a Namecheap ALIAS record to `cname.vercel-dns.com`. Wait for propagation.
- [ ] **Step 4: Verify apex.** `curl -sI https://riverdellvision.com` returns 200 with valid SSL; `www` 301s to apex; a sample of 10 old `.html` URLs each 301 to the correct new path.
- [ ] **Step 5: Search Console.** Confirm the `riverdellvision.com` property, submit `https://riverdellvision.com/sitemap.xml`, request indexing on the top pages.
- [ ] **Step 6: Retire Roya.** Only after the apex is stable and redirects verified, cancel or archive the Roya subscription. Do not delete the domain or its DNS zone.

---

### Task 6: Final acceptance verification

- [ ] **Step 1:** Run every item in the spec's "Verification checklist (final)" section and confirm each passes. In particular:

```bash
curl -sI https://riverdellvision.com | grep -iE "^(HTTP|strict-transport-security|content-security-policy)"
for u in /index.html /our-team.html /services/vision-therapy.html /request-an-appointment.html /blog/tips-for-managing-winter-dry-eye.html; do
  echo "$(curl -s -o /dev/null -w '%{http_code} -> %{redirect_url}' https://riverdellvision.com$u)  ($u)"
done
```

Expected: apex 200 with security headers; each old URL returns 301 to the mapped new path.

- [ ] **Step 2:** Confirm a real form submission arrives from `send.riverdellvision.com` and Google Workspace mail still sends and receives.

---

## Self-Review

**Spec coverage:** W1 lead bleed = Task 2; W2 branded sender = Task 3; W3 domain + URLs = Task 4; W4 301 map = Task 1; W5 staged flip = Task 5; email-safety constraints = Global Constraints + Task 3/5 notes; verification checklist = Task 6. All spec sections are covered.

**Placeholder scan:** No TBD/TODO. All 59 redirects and both code files are written out in full. Operational steps use exact commands.

**Type consistency:** `legacyRedirects` is defined in Task 1 with type `{ source: string; destination: string; permanent: true }[]` and consumed with the same name and shape in `next.config.ts`. Test references match the exported symbol.
