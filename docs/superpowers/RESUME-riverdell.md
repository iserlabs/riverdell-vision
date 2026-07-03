# RESUME: Riverdell Vision (webdev + upgrade in flight)

**Repo:** /Users/macbook/workspace/riverdell-vision · branch **main** (all work merged here)
**GitHub:** iserlabs/riverdell-vision (public) · **Vercel:** Iser Labs team, canonical **https://riverdell-vision.vercel.app** (auto-deploy on push; if a git auto-deploy 404s, run `vercel --prod --scope iser-labs --yes` then `vercel alias set <dep> riverdell-vision.vercel.app --scope iser-labs`). Deployment protection is OFF (ssoProtection null).

## Done and LIVE on main
- **/upgrade work:** premium proof band (source logos + verified header), real differentiators (FCOVD, specialty-in-house, physician-led, bilingual, unhurried), dual-source Google+Zocdoc reviews wall (6 to 12 to all + specialty filter), per-service reviews (auto by tag), concierge intake form (new/existing, insurance, optional details, live "what to expect" preview).
- **Favicon:** real RV mark site-wide.
- **/webdev 13-agent audit COMPLETE.** Findings summarized in the chat that produced this file.
- **Wave 1 shipped:** SERP title double-brand fix; per-page twitter cards; /portal noindex; real H1 on /reviews + /areas (SectionHeading gained `titleAs`); Fort Lee out of Oradell areaServed + Bergen County as AdministrativeArea + nearby towns; alternating Saturday omitted from openingHoursSpecification; header NAP + review count from single source; "Areas We Serve" in nav; logo `sizes=200px`; Geist Mono `preload:false`; viewport export (themeColor + viewportFit); mobile menu `overflow-y-auto`.
- **Wave 2 shipped:** footer /sitemap.xml as plain `<a>`; consult-form `?interest=` deep-link guard.
- **Security/Mobile/A11y program SHIPPED (2026-07-02, main @ c141bb3, 17 commits, LIVE + verified):** 15-task subagent-driven build that also ABSORBED webdev waves 3-7 below. Delivered: CSP Report-Only + HSTS + DNS-prefetch headers (src/lib/headers.ts, CSP sink /api/csp-report logs in prod, silence via CSP_REPORT_LOG=off); graceful-skip Upstash rate-limit (src/lib/ratelimit.ts) + zod validation (src/lib/validate-lead.ts) on /api/lead + /api/waitlist; cookieless Vercel Analytics + Speed Insights; consult-form a11y (native-radio New/Returning toggle, aria-invalid + focus-first-invalid, inputMode, scoped aria-live); axe gate (0 serious/critical, 6 routes) + 44px mobile tap-target gate + no-JS content-stranding guard (e2e/, Playwright+axe, `npm run test:e2e`); custom src/app/not-found.tsx; reusable src/components/site/breadcrumb.tsx; src/components/marketing/keep-exploring.tsx (no dead ends); merge-safe OG helper src/lib/og.ts (restores og:image/type/url on 8 pages) + all-4-doctor Physician schema + refreshed public/llms.txt; content-stranding fix (reveal components visible-by-default). vitest harness (14 unit tests) + 17 e2e. **Repo now standardizes on pnpm** (packageManager pinned, package-lock.json removed) - see deploy-recovery memory Failure 4.

## OWNER ACTION (highest severity, cannot self-fix)
Set **RESEND_API_KEY + LEAD_TO_EMAIL (+ verified LEAD_FROM_EMAIL)** in Vercel and send one real test. Without them the form shows success but leads go NOWHERE (src/lib/notify.ts returns "skipped"). Flagged by both functional-QA and conversion agents.
Other owner env (all inert-safe if unset, from the security/a11y program): **UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN** (enables lead-form rate-limiting; skips safely without them); enable **Web Analytics + Speed Insights** in the Vercel project; set **NEXT_PUBLIC_SITE_URL** to the real domain before a custom-domain launch (canonicals/OG/schema @ids). Later: after watching /api/csp-report logs, flip CSP from Report-Only to enforcing + migrate report-uri->report-to; add full HSTS (includeSubDomains; preload) only once on a real custom domain (not *.vercel.app).

## Remaining webdev waves
- Waves 1, 3, 4, 5, 6, 7 (content-stranding, AEO/llms + Physician schema, form a11y, CSP+HSTS privacy, QA leftovers, SEO og:image) are all **DONE** - shipped by the Security/Mobile/A11y program above (main @ c141bb3). Note: llms-full.txt + FCOVD `EducationalOccupationalCredential` + richer sameAs + dateModified were NOT part of that program (llms.txt refreshed to 4 doctors/7 services/2 conditions only) - small AEO follow-ups if wanted.
- **Wave 2 (Conversion focus) STILL NOT DONE (out of the security/a11y program's scope):** make owned form dominant; demote Zocdoc/phone to links in cta-band.tsx + homepage hero; embed `<ConsultForm />` on /oradell (Contact dead-ends). This is the main remaining webdev item.

## Design decisions awaiting a TUNING BOARD (user asked to "send all tuning boards")
Build ONE consolidated artifact covering: Hero direction; Homepage H1 value-prop copy (H1 is generic "families trust", buries the wedge); Heading-color hierarchy (all headings hard-locked to teal in globals.css ~162); Section rhythm (monotone 3-tone bands); CTA hierarchy; Card surface hierarchy; plus the proof band. Proof-band-only board already published: https://claude.ai/code/artifact/6eccf87b-15e0-4436-9c68-2301098e7675 (picks not yet submitted). Use the visual-tuning-board format (2-4 rendered options per dimension + 6 dial-ins + "Copy my selections" button).

## Notes / gotchas
- A linter reformats files on save and often races Edit ("File modified since read") - re-read then re-apply.
- No em dashes anywhere (a hook blocks writes containing U+2014).
- Body font is Hanken Grotesk (not Schibsted as some docs say) - leave unless user decides.
