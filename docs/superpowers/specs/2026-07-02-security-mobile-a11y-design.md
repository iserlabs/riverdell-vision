# Spec: Security & Privacy + Mobile UX + Accessibility & Visibility

**Status:** DRAFT (awaiting user-review gate before writing-plans)
**Date:** 2026-07-02
**Repo:** iserlabs/riverdell-vision · **Branch:** feat/proof-diff-reviews
**Live:** https://riverdell-vision.vercel.app (public, Next 16 App Router / React 19 / Tailwind v4 / Base UI)

## 1. Context and current state (grounded in the codebase)

Riverdell Vision is a zero-PHI marketing site for an Oradell NJ optometry practice. This spec hardens three dimensions in one coordinated pass, built in order S1 -> S2 -> S3.

What already exists (do not rebuild; extend):
- **Security headers**: `next.config.ts` `headers()` already sets `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`. There is NO CSP and NO HSTS yet. No middleware file exists.
- **Lead API** (`src/app/api/lead/route.ts`): zero-PHI intake; has a `company` honeypot, required-field checks (name/email/phone), and Resend delivery via `src/lib/notify.ts`. No rate-limiting; no email-format or length validation.
- **Graceful-skip reference pattern**: `src/lib/notify.ts` returns `"sent" | "skipped" | "error"` based on whether `RESEND_API_KEY` + destination env are set. New env-dependent features MUST follow this exact inert-until-configured contract.
- **Mobile CTA bar** (`src/components/site/mobile-cta-bar.tsx`): already fixed-bottom, `lg:hidden`, safe-area padding, spacer, backdrop blur. Track 2 is refinement, not a rebuild.
- **Structured data**: `src/lib/schema.ts` + `src/components/site/json-ld.tsx` exist; BreadcrumbList schema is already emitted on several pages (oradell, areas/[slug], about, service-view, condition-view).
- **Reduced motion**: `src/app/globals.css:210` already has a `prefers-reduced-motion: reduce` block.
- **Not present**: `middleware.ts`, a custom `not-found.tsx`, `@vercel/analytics`, `@upstash/ratelimit`, `zod`.

Layouts: root `src/app/layout.tsx`; marketing group `src/app/(marketing)/layout.tsx`; dashboard `src/app/dashboard/layout.tsx`.

## 2. Goals / non-goals

**Goals**
- Ship a defensible security + privacy posture without breaking the static-friendly, no-consent-banner nature of the site.
- Make the mobile experience feel deliberately designed, not merely responsive.
- Reach assistive-technology-grade accessibility, strengthen SEO/AEO, and guarantee no page is a dead end.

**Non-goals**
- No PHI handling, no BAA-triggering data, no auth changes. The lead API stays zero-PHI.
- No visual-legibility redesign of type/color (explicitly excluded from the "visibility" scope; that was decided against).
- No new marketing copy invention; reuse existing verbatim content and real NAP/ratings.
- No CRM/portal backend work (that is V2, owner-gated).

## 3. Locked decisions

From the brainstorm plus the 2026-07-02 approval round:
- Packaging: **one spec**, implement **sequentially S1 -> S2 -> S3**.
- CSP: **Report-Only first**, then flip to enforce after observing violations.
- Rate-limit: **Upstash**, **graceful skip** when env unset.
- Analytics: **Vercel Analytics + Speed Insights**, cookieless, **no consent banner**.
- Owner-side deps for S1 (Upstash + Analytics): **keep both, graceful-skip**.
- Mobile: **all 4 tracks** (tap targets, sticky CTA bar, responsive type/rhythm, nav + form ergonomics).
- Never-stranded: **full** (contextual related links + visible breadcrumbs + custom 404 recovery page).

## 4. Slice 1 - Security and Privacy hardening

### 4.1 Security response headers
Extend the existing `next.config.ts` `headers()` block (keep current four).
- **Content-Security-Policy-Report-Only** first. Author a policy that covers the real runtime: `self` plus what the app genuinely loads (Next inline/hydration needs, Vercel Analytics/Speed Insights endpoints, Google/Zocdoc review deep-links as needed for images/frames, Resend is server-side so not in CSP, fonts, `data:`/`blob:` images). Include `frame-ancestors 'self'`, `base-uri 'self'`, `object-src 'none'`, `upgrade-insecure-requests`, and a `report-uri`/`report-to` sink. Observe report-only violations on the live deployment, tune, THEN add an enforcing `Content-Security-Policy` in a follow-up flip (documented, not auto-flipped).
  - **Nonce vs static tradeoff (implementation decision):** a strict script CSP in the Next App Router normally requires per-request **nonces via middleware**, which forces dynamic rendering and conflicts with the locked "static-friendly" value. To preserve static rendering, the initial policy should lean on `'self'` + Next's needs (script hashes or a pragmatic `'unsafe-inline'` for styles, avoiding nonce-middleware), and stay Report-Only until proven. Adding nonce-middleware is out of scope for the first ship unless Report-Only shows it is unavoidable; call it out rather than silently going dynamic.
- **Strict-Transport-Security**: HSTS is mostly moot on the current shared `*.vercel.app` host (Vercel already serves HTTPS and `vercel.app` is preloaded), and `includeSubDomains`/`preload` must NOT be set on a shared host. Ship a plain `max-age` header now, and treat full HSTS (`max-age=63072000; includeSubDomains; preload`) as a **custom-domain follow-up** for when riverdellvision.com (or similar) is attached. Do not preload `vercel.app`.
- Add `X-DNS-Prefetch-Control: on` and consider `Cross-Origin-Opener-Policy: same-origin` (verify it does not break the Zocdoc popup flow; if it does, scope or drop it).
- Acceptance: `curl -sI` shows the new headers on `/` and a nested route; CSP is Report-Only (not enforcing) on first ship; existing four headers still present; site still renders (no console CSP breakage in enforce dry-run).

### 4.2 Rate-limiting the lead API
- Add `@upstash/ratelimit` + `@upstash/redis`. Wrap `POST /api/lead` (and `/api/waitlist` if it accepts writes) with a sliding-window limiter keyed by client IP (from `x-forwarded-for`).
- **Graceful skip**: if `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` are unset, the limiter is bypassed and the endpoint behaves exactly as today (mirror the `notify.ts` env-guard pattern). Never 500 due to a missing limiter.
- On limit exceeded: return `429` with a friendly JSON error the form can surface, and do NOT send email.
- Honeypot behavior unchanged (still returns fake success).
- Acceptance: with env set, N rapid posts get limited (429) while the first succeeds; with env unset, unlimited posts behave as before; unit-level check of the env-guard branch.

### 4.3 Input validation hardening
- Add `zod` (or an equivalent lightweight guard) to the lead route: validate email shape, cap field lengths (defense against payload abuse), trim/normalize. Keep the zero-PHI field set; reject unexpected oversized bodies.
- Preserve current 400/422 semantics and the honeypot short-circuit.
- Acceptance: malformed email -> 422; oversized field -> 422; valid payload -> unchanged behavior.

### 4.4 Privacy posture / analytics
- Add `@vercel/analytics` and `@vercel/speed-insights`, mounted in `src/app/layout.tsx`. Both are cookieless -> **no consent banner** required; confirm the `/privacy` page copy stays accurate (it already references privacy-respecting analytics).
- Graceful: Analytics no-ops off Vercel / when disabled, so local dev is unaffected.
- Acceptance: components render in prod HTML; no cookies set (verify no `set-cookie` from analytics); `/privacy` copy consistent.

### 4.5 Owner action items (S1)
Document (do not block on): `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` in Vercel for rate-limiting; enable Web Analytics + Speed Insights in the Vercel project. Everything ships inert-safe without them.

## 5. Slice 2 - Mobile UI/UX (all 4 tracks)

1. **Tap targets and spacing**: audit interactive elements for a 44x44px minimum hit area and comfortable inter-target spacing on phones (nav items, chips, filter toggles, footer links, accordion triggers). Fix undersized targets without changing desktop.
2. **Sticky mobile CTA bar** (refinement of existing `mobile-cta-bar.tsx`): verify it never overlaps other fixed UI, respects safe-area on notched devices (already partly done), and consider hide-on-scroll-up / reveal behavior only if it does not harm conversion. Keep it lightweight.
3. **Responsive type and rhythm**: tune heading/body scale, hero sizing, and section/table spacing specifically at small breakpoints so long pages read well on a phone. No new type families (respect the no-AI-typography rule and existing brand faces).
4. **Nav + form ergonomics**: correct `inputmode`/`type`/`autocomplete` on the consult form inputs (tel, email), prevent iOS zoom-on-focus (>=16px inputs), ensure the mobile menu is thumb-reachable and closes correctly, and validate keyboard/overlay behavior.

Acceptance: manual mobile viewport pass (e.g. 390px) shows no horizontal scroll, all targets >=44px, form inputs trigger correct keyboards, no zoom-on-focus; desktop unchanged; build green.

## 6. Slice 3 - Accessibility and Visibility

### 6.1 Assistive-technology accessibility (AT-a11y)
- Landmarks (`header`/`nav`/`main`/`footer`), a visible-on-focus **skip link** in `src/app/layout.tsx`, correct heading order, and `main` id target.
- Focus management + visible focus rings on all interactive elements; ARIA correctness on the Base UI Accordion and the reviews wall; ensure decorative UI (hero calendar already `aria-hidden`) stays hidden from AT.
- Form semantics: programmatic labels, `aria-describedby` error wiring, `aria-live` for submit status on the consult form.
- Respect the existing `prefers-reduced-motion` block for any motion added in S2.
- Acceptance: axe (Playwright + axe-core) reports **0 serious/critical** across key routes (home, a service, a condition, /portal, an /areas page, 404); keyboard-only walkthrough reaches all actions.

### 6.2 SEO / AEO
- Audit metadata completeness (title/description/canonical/Open Graph) across route types; fill gaps.
- Extend structured data via `src/lib/schema.ts` + `json-ld.tsx`: add **FAQPage / Q&A** schema where FAQ content exists, ensure **BreadcrumbList** is emitted on all deep pages, confirm MedicalProcedure/DefinedTerm/LocalBusiness remain valid.
- Verify `sitemap.xml` and `robots` are correct and include all indexable routes (portal already added per prior work).
- Acceptance: Rich Results-valid JSON-LD (no schema errors) on sampled pages; every deep page has canonical + OG; sitemap 200 and complete.

### 6.3 Never-stranded (full)
- **Contextual related links**: every leaf page (services, conditions, areas) ends with relevant next-step links (related services/conditions + a primary CTA) so no page is a terminus.
- **Visible breadcrumbs**: a consistent breadcrumb UI component on deep pages, matched by BreadcrumbList schema (schema partly exists; unify the visible + structured layers).
- **Custom 404**: build `src/app/not-found.tsx` (currently missing) as a real recovery page: on-brand, with search-or-navigate paths to top services/conditions, contact, and home. Keep the `/focus -> /` redirect.
- Acceptance: `not-found.tsx` renders on an unknown route with working recovery links; each leaf page has related links + breadcrumb; no dead-end pages found in a crawl of the nav.

## 7. Cross-cutting verification
- `npm run build` green (note the pre-existing non-blocking `dashboard/gate.tsx` setState-in-effect lint warning).
- axe: 0 serious/critical on the route set above.
- `curl -sI` header checks for S1.
- Deploy verification per the recovery playbook (memory `riverdell-vercel-deploy-recovery.md`): confirm `riverdell-vision.vercel.app` stays 200 and public after deploy, and re-set the alias if it detaches.

## 8. Sequencing and out-of-scope
- Build strictly S1 -> S2 -> S3; each slice independently buildable and shippable.
- CSP ships Report-Only; the enforce flip is a documented follow-up after observing reports, not part of the initial merge.
- Out of scope: visual/type/color redesign, CRM/portal backend, new copy, auth.

## 9. Open questions
- None blocking. CSP allowlist specifics (exact Zocdoc/Google/Vercel origins) will be finalized during implementation against real Report-Only output.
