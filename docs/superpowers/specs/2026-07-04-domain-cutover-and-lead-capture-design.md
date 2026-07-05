# Domain cutover and lead capture: design and runbook

**Date:** 2026-07-04
**Status:** Approved design, ready for implementation plan
**Workstream:** W0 (config gates). Prerequisite for all findability work.

## Goal

Move the new Riverdell Vision site onto its real domain, `riverdellvision.com`, and
make on-site lead capture actually deliver, so that:

1. Every canonical, Open Graph, sitemap, JSON-LD, and `llms.txt` URL resolves to the
   real domain instead of `riverdell-vision.vercel.app`, letting Google and AI answer
   engines attribute authority to the domain that owns the practice's history, reviews,
   citations, and Google Business Profile.
2. Appointment-request and waitlist form submissions reach the office inbox. Today they
   return success to the visitor but silently drop (no `RESEND_API_KEY` in production, so
   `sendLeadEmail` returns `"skipped"`).
3. Link equity from the old Roya site is preserved via a complete set of 301 redirects.
4. Google Workspace email on the domain keeps working throughout, with zero interruption.

## Current state (discovered 2026-07-04)

- **Live new site:** `https://riverdell-vision.vercel.app` (Vercel project `iser-labs/riverdell-vision`).
- **Old site:** `https://www.riverdellvision.com` still serves the previous Roya/Duda site
  (`generator: roya`), apex and www both resolve to `172.235.51.175`.
- **DNS:** Namecheap BasicDNS (`dns1/dns2.registrar-servers.com`). Owner has registrar access.
- **Email:** Google Workspace (`MX: aspmx.l.google.com` and alts). Root domain also carries a
  Google verification TXT and a custom SPF flattener
  (`v=spf1 include:dc-aa8e722993._spfm.riverdellvision.com ~all`).
- **Production env (Vercel):** only `NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT` is set. Missing:
  `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`,
  `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- **Code touchpoints:** `src/lib/site.ts` (`SITE_URL` falls back to the vercel domain when
  `NEXT_PUBLIC_SITE_URL` is unset); `next.config.ts` already has an `async redirects()` to extend;
  `src/lib/notify.ts` sends via Resend REST and degrades to `"skipped"` when unconfigured;
  `src/lib/ratelimit.ts` "graceful-skip" when Upstash is unset.

## Decisions (locked with owner)

- **Canonical host:** apex `riverdellvision.com`. `www` 301-redirects to apex. Apex is attached to
  Vercel via a Namecheap **ALIAS** record to `cname.vercel-dns.com` (avoids the flaky Vercel apex
  A record `76.76.21.21`).
- **Resend sending domain:** `send.riverdellvision.com` (isolated subdomain, so root Google
  Workspace mail is never touched).
- **Lead fix is step one**, shipped before any DNS change.
- **Migration posture:** staged. Prove `www` on Vercel, then flip the apex, then retire Roya.

## Workstream 1: Stop the lead bleed (do first, no DNS involved)

Purpose: make form submissions deliver today, using the code's existing `onboarding@resend.dev`
sender fallback so nothing depends on the domain yet.

1. Create a Resend account and an API key (owner action, or owner provides the key).
2. In Vercel production env, set:
   - `RESEND_API_KEY` = the Resend key.
   - `LEAD_TO_EMAIL` = the office inbox that should receive requests (e.g. `hello@riverdellvision.com`).
   - Leave `LEAD_FROM_EMAIL` unset for now: `notify.ts` defaults to `onboarding@resend.dev`, which
     Resend allows without domain verification.
3. Also set `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (Upstash free tier) so rate
   limiting is real rather than graceful-skipped. Optional for launch; note if deferred.
4. Redeploy production.
5. Verify: submit a real appointment-request form on the live site and confirm the office inbox
   receives the email with all fields. The route returns `{ ok: true, delivery: "sent" }` on success;
   confirm `delivery` is `"sent"`, not `"skipped"`.

Acceptance: a live form submission lands in the office inbox within a minute.

## Workstream 2: Branded sender (send.riverdellvision.com)

Purpose: send lead emails from the practice's own domain for deliverability and trust, without
disturbing Google Workspace.

1. In Resend, add domain `send.riverdellvision.com`. Resend issues DKIM (CNAME/TXT) and an SPF
   value scoped to that subdomain.
2. In Namecheap, add only the records Resend specifies, all on the `send` subdomain:
   DKIM record(s), the subdomain SPF (`TXT send` `v=spf1 include:...resend... ~all`), and the
   Resend MX for the subdomain if required for return-path. Do not edit any root-level record.
3. Wait for Resend to verify the subdomain.
4. Set `LEAD_FROM_EMAIL` = `"Riverdell Vision <hello@send.riverdellvision.com>"` in Vercel prod,
   redeploy.
5. Verify: submit a form, confirm the email arrives from the branded sender and passes SPF/DKIM
   (check headers).

Acceptance: lead email arrives from `send.riverdellvision.com`, SPF and DKIM pass, and the root
domain's Google Workspace mail is unaffected (send and receive a normal test email on the inbox).

## Workstream 3: Attach domain and fix all absolute URLs

1. In Vercel, add `riverdellvision.com` and `www.riverdellvision.com` to the project. Vercel will
   provide the target records (used in Workstream 5) and provision SSL.
2. Configure the redirect so `www` points to apex as canonical (Vercel domain settings: set
   `riverdellvision.com` as primary, `www` redirects to it).
3. In Vercel production env, set `NEXT_PUBLIC_SITE_URL` = `https://riverdellvision.com`.
4. Redeploy. This flips `SITE_URL` in `src/lib/site.ts`, which cascades to every canonical, OG url,
   sitemap entry, JSON-LD `@id`, and the `metadataBase`.

Acceptance (checked on the Vercel deployment URL before DNS flip): canonical, `og:url`, sitemap
URLs, and JSON-LD `@id`s all read `https://riverdellvision.com`.

## Workstream 4: 301 redirect map

Implement as permanent (`permanent: true`) entries appended to the existing `async redirects()` in
`next.config.ts`. All old URLs are `.html` (Duda convention). Source paths are matched without the
host. Redirect targets are the canonical apex paths.

### Page redirects (explicit)

| Old path | New path |
|---|---|
| `/index.html` | `/` |
| `/about.html` | `/about` |
| `/our-doctor.html` | `/about` |
| `/our-team.html` | `/about` |
| `/contact-us.html` | `/oradell` |
| `/request-an-appointment.html` | `/book` |
| `/reviews.html` | `/reviews` |
| `/financing.html` | `/cost-and-insurance` |
| `/payment-options.html` | `/cost-and-insurance` |
| `/frames.html` | `/` |
| `/services/eyewear.html` | `/` |
| `/blog.html` | `/answers` |
| `/sitemap.html` | `/` |
| `/services.html` | `/` |
| `/comprehensive-eye-exam.html` | `/medical-eye-care` |
| `/accessibility-statement.html` | `/accessibility` |
| `/privacy-policy.html` | `/privacy` |
| `/pediatric-eye-exams.html` | `/about#care` |
| `/services/pediatric-eye-exams.html` | `/about#care` |
| `/services-eye-health-exams.html` | `/medical-eye-care` |
| `/services/eye-health-exams.html` | `/medical-eye-care` |
| `/services-glaucoma-treatment.html` | `/medical-eye-care` |
| `/services/glaucoma-treatment.html` | `/medical-eye-care` |
| `/services/visual-field-exams.html` | `/medical-eye-care` |
| `/services/custom-contact-lens-fitting.html` | `/specialty-contact-lenses` |
| `/services/myopia-control.html` | `/myopia-management` |
| `/services/vision-therapy.html` | `/vision-therapy` |
| `/services/neuro-optometric-rehabilitation.html` | `/neuro-optometric-rehabilitation` |
| `/services/neuro-cognitive-optometry.html` | `/neuro-optometric-rehabilitation` |

### Blog redirects (30 posts, deterministic topical rule)

The new site has no blog. Map each `/blog/<slug>.html` to the most topically relevant destination
by keyword in the slug, with `/answers` as the fallback. Implement as an explicit mapping array
(one entry per post) so it is auditable, derived from this rule:

- slug contains `vision-therapy`, `vision-in-brain`, `visual-processing`, `attention`, `focus`,
  `classroom`, `learning` → `/vision-therapy`
- slug contains `myopia`, `atropine`, `screen-time`, `nearsighted` → `/myopia-management`
- slug contains `dry-eye`, `allergies`, `irritating`, `winter-dry` → `/dry-eye-treatment`
- slug contains `glaucoma` → `/medical-eye-care`
- slug contains `neuro`, `brain-injury`, `cognitive` → `/neuro-optometric-rehabilitation`
- slug contains `contact-lens`, `custom-contact` → `/specialty-contact-lenses`
- slug contains `retinal`, `ocular-health`, `comprehensive`, `eye-exam`, `screen`, `retina` →
  `/medical-eye-care`
- everything else (`better-vision`, `eye-education`, `protect-your-eyes`, `vision-genetics`,
  `healthy-eyes-during-summer`, `better-vision`) → `/answers`

The implementation plan materializes this into the 30 concrete `{ source, destination, permanent: true }`
entries from the captured post list in this spec's discovery notes.

### Host redirect

`www.riverdellvision.com/*` 301 to `https://riverdellvision.com/*`, handled at the Vercel domain
level (primary domain + redirect), not in `next.config.ts`.

Acceptance: a sample of 10 old URLs across pages and blog each return HTTP 301 to the correct new
path; no old URL 404s.

## Workstream 5: Staged DNS flip (Namecheap)

Preconditions: Workstreams 1 to 4 done and verified on the Vercel deployment URL.

1. **www first.** In Namecheap Advanced DNS, set the `www` host to a CNAME to
   `cname.vercel-dns.com` (replacing the current record to `172.235.51.175`). Wait for propagation.
   Verify on `https://www.riverdellvision.com`: SSL valid, site is the new build, forms deliver,
   redirects work, schema resolves to the real domain. Because apex still points to Roya, the old
   home is still reachable at the bare apex during this window, which is the intended safety net.
2. **Apex flip.** Once www is proven, set the apex `@` host to a Namecheap **ALIAS** record to
   `cname.vercel-dns.com` (replacing the A record to `172.235.51.175`). Verify apex serves the new
   site over SSL and that `www` redirects to apex.
3. **Search Console.** Add/confirm the `riverdellvision.com` property, submit
   `https://riverdellvision.com/sitemap.xml`, and request indexing on the top pages. Keep the old
   property to watch the redirects take.
4. **Retire Roya.** Only after the new site is stable on the apex and redirects verified: cancel or
   archive the Roya subscription. Do not delete the domain or its DNS zone.

Acceptance: apex and www both serve the new site over valid SSL, www 301s to apex, old URLs 301
correctly, Search Console shows the new sitemap accepted.

## Do not touch (email safety)

Throughout all workstreams, never edit these root-domain records:

- `MX` records (Google Workspace: `aspmx.l.google.com` and alts).
- The Google verification `TXT` (`google-site-verification=...`).
- The existing root `SPF` (`v=spf1 include:dc-aa8e722993._spfm.riverdellvision.com ~all`).

All Resend records live only on the `send` subdomain. The only root-level DNS changes in this
project are the `www` CNAME and the apex ALIAS in Workstream 5.

## Verification checklist (final)

- [ ] Live form submission arrives in the office inbox from `send.riverdellvision.com`, SPF+DKIM pass.
- [ ] Google Workspace inbox sends and receives normally after all DNS changes.
- [ ] `curl -sI https://riverdellvision.com` returns 200, valid SSL, security headers present.
- [ ] `https://www.riverdellvision.com` 301s to `https://riverdellvision.com`.
- [ ] Canonical, `og:url`, sitemap URLs, and JSON-LD `@id` all read `https://riverdellvision.com`.
- [ ] 10 sampled old `.html` URLs (pages + blog) each 301 to the correct new path, none 404.
- [ ] `robots.txt` and `sitemap.xml` reference the real domain; Search Console accepts the sitemap.
- [ ] No mixed-content or CSP-report regressions on the real domain.

## Rollback

- **DNS:** revert the changed `www`/apex records to `172.235.51.175`. Namecheap TTL governs recovery
  time, so set a low TTL (e.g. 5 min) on those two records before the flip.
- **Env/redirects:** redeploy the prior deployment (Vercel instant rollback) to drop
  `NEXT_PUBLIC_SITE_URL` and the redirect changes.
- Email records are never changed, so mail has no rollback surface.

## Out of scope (later workstreams)

- W1 findability content system: keyword and page architecture, local/town pages, AEO deepening,
  reviews and E-E-A-T. Depends on this cutover.
- W2 craft: Core Web Vitals, accessibility contrast, conversion-path polish.

## Owner inputs still needed

1. Resend API key (or confirmation to create the Resend account).
2. The exact office inbox address for `LEAD_TO_EMAIL`.
3. Namecheap access (owner performs the DNS edits following this runbook, or grants access).
4. Confirmation of when to retire the Roya subscription.

## Appendix A: authoritative blog redirect table (30 posts)

This table is authoritative and resolves any keyword conflicts. All sources are
`/blog/<slug>.html`, all are `permanent: true` 301s.

| Old blog slug | New path |
|---|---|
| `5-common-signs-your-child-may-benefit-from-vision-therapy` | `/vision-therapy` |
| `allergies` | `/dry-eye-treatment` |
| `atropine-eye-drops-how-they-help-slow-myopia-progression-in-kids` | `/myopia-management` |
| `better-vision` | `/answers` |
| `does-vision-therapy-require-ongoing-treatment-or-maintenance` | `/vision-therapy` |
| `dry-eye-or-allergies-how-to-tell-whats-really-irritating-your-eyes` | `/dry-eye-treatment` |
| `eye-education` | `/answers` |
| `glaucoma-and-family-history-are-you-at-higher-risk` | `/medical-eye-care` |
| `healthy-eyes-during-summer` | `/answers` |
| `how-a-custom-contact-lens-fitting-improves-comfort-and-vision` | `/specialty-contact-lenses` |
| `how-aging-environment-and-lifestyle-contribute-to-dry-eye` | `/dry-eye-treatment` |
| `how-can-specific-lifestyle-adjustments-help-prevent-myopia-from-worsening` | `/myopia-management` |
| `how-does-pediatric-vision-therapy-work` | `/vision-therapy` |
| `how-early-vision-care-prevents-long-term-problems-in-children` | `/about#care` |
| `how-glaucoma-treatment-has-evolved-protecting-your-peripheral-vision` | `/medical-eye-care` |
| `how-much-screen-time-is-too-much-protecting-your-childs-eyes` | `/myopia-management` |
| `how-neuro-cognitive-optometry-can-help-improve-learning-and-focus-boosting-mental-skills` | `/neuro-optometric-rehabilitation` |
| `how-to-maintain-strong-retinal-health-as-you-age` | `/medical-eye-care` |
| `how-vision-therapy-can-help-with-attention-and-focus-in-the-classroom` | `/vision-therapy` |
| `mapping-ocular-health-what-new-jersey-high-tech-retinal-imaging-reveals-about-your-wellness` | `/medical-eye-care` |
| `myopia-in-adults-causes-symptoms-and-treatment-options` | `/myopia-management` |
| `protect-your-eyes` | `/answers` |
| `the-importance-of-comprehensive-eye-exams-protect-your-vision-for-life` | `/medical-eye-care` |
| `the-role-of-vision-in-brain-injury-recovery-why-neuro-optometric-rehabilitation-matters` | `/neuro-optometric-rehabilitation` |
| `tips-for-managing-winter-dry-eye` | `/dry-eye-treatment` |
| `treating-visual-processing-issues-with-neuro-optometric-techniques` | `/neuro-optometric-rehabilitation` |
| `understanding-visual-field-testing-and-its-role-in-eye-health` | `/medical-eye-care` |
| `vision-genetics` | `/answers` |
| `what-is-neuro-cognitive-optometry-understanding-the-role-of-vision-in-learning-and-behavior` | `/neuro-optometric-rehabilitation` |
| `when-we-see-a-young-patient-with-rapid-vision-changes-this-is-what-we-recommend` | `/medical-eye-care` |
