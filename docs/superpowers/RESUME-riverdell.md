# Resume: Riverdell Vision, growth/trust suite shipped + hero elevations + polish, all live on prod

**Working dir:** /Users/macbook/Claude/riverdell-vision · **branch** main (tracks origin/main; main does NOT auto-deploy, deploy is manual, see Constraints)
**Stack / org:** Next 16 (App Router, Turbopack) · React 19 · Tailwind v4 · pnpm · Vitest + Playwright · deploy org = iser-labs Vercel
**Saved:** 2026-07-03T15:39:52Z

## Status
Everything from this session is committed, pushed to origin/main, and LIVE on https://riverdell-vision.vercel.app. Working tree is clean; nothing in-flight.
- Hero elevations (About + Reviews): DONE, live. Commits 46e9bbb + PRODUCT.md dd42205.
- Full-site polish pass: DONE, live. Commit 4d1af9b (footer dup "Areas we serve" removed; service-CTA `.toLowerCase()` dropped so "Considering Ortho-K?" is correct across all 7 service pages).
- Growth/trust suite (impeccable craft, 4 surfaces): DONE, live. Commit 919fcb2.

## Changes this session
- `src/app/(marketing)/about/page.tsx`: bare hero → asymmetric split with framed real office photo (office-oradell.jpeg) + DualProof; breadcrumb lifted above the centered grid.
- `src/app/(marketing)/reviews/page.tsx`: floating "5.0" → composed rating badge + source-branded DualProof; wall section top-pad tightened.
- `src/components/site/reviews-wall.tsx`: fixed "Show more (N more)" hover-contrast (dead group-hover → `opacity-70` tracking button color).
- `src/components/site/footer.tsx`: removed duplicate hard-coded "Areas we serve" link; ADDED discreet "Expansion" link in bottom bar → /growth.
- `src/components/marketing/service-view.tsx`: closing CtaBand title now `Considering ${s.shortName}?` (no lowercasing).
- `src/lib/answers.ts` (NEW): 7 topic clusters of honest, grounded Q&A + ANSWER_TERMS for DefinedTermSet.
- `src/app/(marketing)/answers/page.tsx` (NEW): AEO hub, VISIBLE answers, FAQPage + DefinedTermSet + breadcrumb schema.
- `src/app/(marketing)/cost-and-insurance/page.tsx` (NEW): real insurer list, vision-vs-medical explainer, Cherry financing, honest cost stance (no invented prices), FAQPage schema.
- `src/app/(marketing)/growth/page.tsx` (NEW): public expansion story; verifiable operating record, honest Fort Lee rationale, plan timeline, use-of-funds categories.
- `src/app/(marketing)/growth/data-room/page.tsx` (NEW): soft-gated deep dive, `robots: noindex,nofollow`, Verified vs Illustrative badges, diligence-doc list, /dashboard link.
- `src/components/site/expansion-gate.tsx` (NEW): soft client passphrase gate (pw `riverdell`, sessionStorage, single-state to stay lint-clean).
- `src/app/sitemap.ts`: added /answers, /cost-and-insurance, /growth (data-room deliberately NOT added).
- `public/llms.txt`: added /answers, /cost-and-insurance + "Insurance accepted" section.
- `PRODUCT.md` (NEW, dd42205): register=brand project doc (unblocks impeccable tooling).

## NEXT ACTION
Nothing is mid-build. If continuing, pick one: (a) strengthen /growth/data-room by wiring OWNER-PROVIDED REAL figures (trailing P&L, patient volume, unit economics) in place of the "Illustrative" model, keeping Verified/Illustrative badges honest, then redeploy; or (b) run the next impeccable surface (e.g. `/impeccable document` for DESIGN.md, or `/impeccable live` for in-browser variants). Do not invent financials.

## Verify / then
- Run (in /Users/macbook/Claude/riverdell-vision): `pnpm test` (expect 14 pass) · `pnpm lint` (3 PRE-EXISTING set-state-in-effect errors in use-in-view/proof-ledger/dashboard-gate/areas are expected and do NOT block build; new files are clean) · `pnpm build` (expect green).
- Smoke: /answers /cost-and-insurance /growth /growth/data-room (pw `riverdell`), plus /about /reviews.
- Deploy (manual, main does NOT auto-deploy): `vercel --prod --yes --scope iser-labs`, then `vercel alias set <new-deploy-url> riverdell-vision.vercel.app --scope iser-labs`. Verify canonical after edge-cache clears (`age: 0`).

## Uncommitted (on disk, git untouched)
- None. Clean tree; all work committed + pushed.

## Constraints
- NEVER em dashes (U+2014) anywhere; PostToolUse hook blocks writes containing them. Use commas/colons/middots.
- iserlabs client repo: NO "Co-Authored-By: Claude" / "Generated with Claude Code" / AI-process wording on commits or PRs (local commit-msg hook backstops). KEEP AEO content. Human co-authors OK.
- HONESTY IS A HARD CONSTRAINT: only real, attributable proof. No invented revenue, patient counts, or projections. Data-room numbers stay badged Verified (real) or Illustrative (benchmark/structure). Register = brand; identity-preserve the Boutique-D3 design system (Newsreader/Hanken/Geist Mono, bone+teal+clay+brass); no new fonts/colors.
- main does NOT auto-deploy (verified this session: push created no deployment). Deploy manually + re-alias; the bare canonical `riverdell-vision.vercel.app` is a detaching alias. See memory riverdell-vercel-deploy-recovery.
- Repo MOVED this session to ~/Claude/riverdell-vision (was ~/workspace); shell cwd resets to ~/workspace between some Bash calls, so prefix commands with the repo path.
- Package manager = pnpm. Share only public client-facing deploy links.
- Data-room gate is SOFT (client-side, pw in bundle, content in RSC payload but noindex); fine only because nothing there is sensitive/fabricated. Real financials would require server-side auth first.

## Read first on resume
- `docs/superpowers/RESUME-riverdell.md` (this file).
- `src/lib/answers.ts` + `src/app/(marketing)/growth/data-room/page.tsx`: the two content-heavy new surfaces most likely to change next.
- `src/app/globals.css` + `PRODUCT.md`: design tokens + brand/register context.
