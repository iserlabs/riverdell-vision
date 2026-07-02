# RESUME: Riverdell Vision (webdev + upgrade in flight)

**Repo:** /Users/macbook/workspace/riverdell-vision · branch **main** (all work merged here)
**GitHub:** iserlabs/riverdell-vision (public) · **Vercel:** Iser Labs team, canonical **https://riverdell-vision.vercel.app** (auto-deploy on push; if a git auto-deploy 404s, run `vercel --prod --scope iser-labs --yes` then `vercel alias set <dep> riverdell-vision.vercel.app --scope iser-labs`). Deployment protection is OFF (ssoProtection null).

## Done and LIVE on main
- **/upgrade work:** premium proof band (source logos + verified header), real differentiators (FCOVD, specialty-in-house, physician-led, bilingual, unhurried), dual-source Google+Zocdoc reviews wall (6 to 12 to all + specialty filter), per-service reviews (auto by tag), concierge intake form (new/existing, insurance, optional details, live "what to expect" preview).
- **Favicon:** real RV mark site-wide.
- **/webdev 13-agent audit COMPLETE.** Findings summarized in the chat that produced this file.
- **Wave 1 shipped:** SERP title double-brand fix; per-page twitter cards; /portal noindex; real H1 on /reviews + /areas (SectionHeading gained `titleAs`); Fort Lee out of Oradell areaServed + Bergen County as AdministrativeArea + nearby towns; alternating Saturday omitted from openingHoursSpecification; header NAP + review count from single source; "Areas We Serve" in nav; logo `sizes=200px`; Geist Mono `preload:false`; viewport export (themeColor + viewportFit); mobile menu `overflow-y-auto`.
- **Wave 2 shipped:** footer /sitemap.xml as plain `<a>`; consult-form `?interest=` deep-link guard.

## OWNER ACTION (highest severity, cannot self-fix)
Set **RESEND_API_KEY + LEAD_TO_EMAIL (+ verified LEAD_FROM_EMAIL)** in Vercel and send one real test. Without them the form shows success but leads go NOWHERE (src/lib/notify.ts returns "skipped"). Flagged by both functional-QA and conversion agents.

## Remaining webdev waves (prioritized, NOT yet done)
1. **Content-stranding (Animation F1, HIGH):** EditorialIndex / EditorialList / ProcessTimeline / portal-tour ship `opacity:0` inline in SSR via `useInView` (starts false) so the homepage service ladder (primary conversion nav) can vanish if JS/observer fails. Fix: adopt reveal.tsx's visible-by-default contract (hidden only when `mounted && !inView`); watch the proof-ledger useCountUp interaction.
2. **Conversion focus (A1/C2/A3):** make owned form dominant; demote Zocdoc/phone to links in cta-band.tsx + homepage hero; embed `<ConsultForm />` on /oradell (Contact dead-ends).
3. **AEO content:** refresh public/llms.txt (currently lists 3 doctors not 4, 3 services not 7; add /keratoconus + /meibomian-gland-dysfunction, dateModified); add llms-full.txt; add FCOVD `EducationalOccupationalCredential` + per-doctor Physician schema + richer sameAs (schema.ts / about page emits only Dr. Han).
4. **A11y:** segmented New/Returning toggle uses role=radio without keyboard model (use native radios); form errors are toast-only (add aria-invalid + focus first invalid); scope the consult-form `aria-live` to just doctor-pairing + insurance chip.
5. **Privacy:** add CSP (report-only first; site is self-contained, only Google Maps iframe on /oradell) + assert HSTS in next.config.ts.
6. **QA leftovers:** Safari `summary::-webkit-details-marker{display:none}` on the optional-details expander; dashboard StageBadge fed serviceInterest instead of stage (src/app/dashboard/page.tsx ~83).
7. **SEO leftover:** service + area pages set page-level `openGraph:{title,description}` which STRIPS og:image/url/type (SEO F3) - add a buildOg helper or delete the overrides; also NEXT_PUBLIC_SITE_URL must be set to the real domain before launch.

## Design decisions awaiting a TUNING BOARD (user asked to "send all tuning boards")
Build ONE consolidated artifact covering: Hero direction; Homepage H1 value-prop copy (H1 is generic "families trust", buries the wedge); Heading-color hierarchy (all headings hard-locked to teal in globals.css ~162); Section rhythm (monotone 3-tone bands); CTA hierarchy; Card surface hierarchy; plus the proof band. Proof-band-only board already published: https://claude.ai/code/artifact/6eccf87b-15e0-4436-9c68-2301098e7675 (picks not yet submitted). Use the visual-tuning-board format (2-4 rendered options per dimension + 6 dial-ins + "Copy my selections" button).

## Notes / gotchas
- A linter reformats files on save and often races Edit ("File modified since read") - re-read then re-apply.
- No em dashes anywhere (a hook blocks writes containing U+2014).
- Body font is Hanken Grotesk (not Schibsted as some docs say) - leave unless user decides.
