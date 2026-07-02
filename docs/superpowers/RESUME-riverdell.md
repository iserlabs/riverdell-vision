# Resume: Riverdell Vision site  -  hero card shipped; security/mobile/a11y brainstorm paused at approval gate

**Working dir:** /Users/macbook/workspace/riverdell-vision · **branch** feat/proof-diff-reviews (upstream origin/feat/proof-diff-reviews; a PARALLEL agent's "proof band + reviews" initiative that also carries my hero-booking commit 587aab0. A background /sync auto-commits the working tree and sometimes moves branches. Do NOT force-merge; check `git log` before assuming main.)
**Stack / org:** Next 16 (App Router, Turbopack) / React 19 / Tailwind v4 / shadcn=Base-UI / Vercel · GitHub iserlabs/riverdell-vision · LIVE https://riverdell-vision.vercel.app
**Saved:** 2026-07-02T17:50:35Z

## Status
- **Hero booking card enlarge/tidy** (user's last concrete request)  -  DONE + committed (587aab0). Redeploy was in-flight (bg task bwwo7bkr9); the earlier `vercel --prod` TIMED OUT before aliasing, so the canonical alias may still show the OLD card. MUST VERIFY (see NEXT ACTION).
- **/superpowers:brainstorming (security+privacy, mobile UI/UX, a11y+visibility)**  -  PAUSED at the design-approval gate. Design presented as 3 slices; user has NOT approved yet. No implementation started (HARD-GATE). Decisions locked: full hardening + privacy posture; CSP **Report-Only first** (static-friendly, then enforce); rate-limit **Upstash, graceful skip**; analytics **Vercel Analytics + Speed Insights** (no cookies, no consent banner); mobile = all 4 tracks; visibility = AT-a11y + SEO/AEO + never-stranded (NOT visual-legibility).
- Everything else this session already LIVE: section system (editorial index/list, timeline, editorial no-box count-up proof ledger), /portal patient-portal preview, nav streamline, mobile+a11y pass (axe 0 serious/critical), service-page SEO/AEO depth (candidacy self-check, cost&insurance, option-compares, glossary+DefinedTerm/MedicalProcedure schema), Resend lead delivery + honeypot, SEO fixes (ledger SSR real numbers, /portal in sitemap, apple-icon), condition pages /keratoconus + /meibomian-gland-dysfunction, ortho-k/vision-therapy compares, /focus->/ redirect.

## Changes this session (high-signal only)
- `src/components/marketing/hero-booking.tsx`  -  rebuilt: larger card (max-w-xl), single weekday header row + uniform `aspect-square` number-only day cells (symmetrical grid), responsive title (text-xl md:text-2xl). `src/app/(marketing)/page.tsx` hero grid -> `lg:grid-cols-2` (balanced).
- NOTE: a parallel agent (branch feat/proof-diff-reviews, commit 0382cba) added `ReviewsWall`, `service-reviews.tsx`, `GoogleG`/`ZocdocMark` brand marks in reviews.tsx, and reworked the proof ledger/differentiators. NOT my work; leave it unless it conflicts.
- `docs/AUDIT-REVIEWS-2026-07-02.md`  -  the five verbatim audit reports (design/a11y/CRO/mobile/functional-QA), em dashes stripped.

## NEXT ACTION
1. **Confirm the new hero card is live:** `curl -s https://riverdell-vision.vercel.app/ | grep -c aspect-square`  -  expect many (28+). If **0**, redeploy: `cd /Users/macbook/workspace/riverdell-vision && vercel --prod --yes` and re-check (the canonical alias tracks latest prod but a timed-out deploy can leave it stale).
2. **Then the brainstorm:** it awaits USER APPROVAL of the presented 3-slice design. On approval -> write spec to `docs/superpowers/specs/2026-07-02-security-mobile-a11y-design.md`, self-review, user-review gate, then invoke writing-plans. Do NOT implement before approval.

## Verify / then
- Build/gates: `cd <repo> && npm run build` (green expected; note pre-existing `dashboard/gate.tsx` setState-in-effect lint warning is non-blocking).
- a11y: axe via `/private/tmp/claude-501/-Users-macbook-workspace/579fc4ef-a31f-4cc1-b1f0-992854298dbc/scratchpad/axe*.mjs` pattern (axe-core at `~/.npm/_npx/ffe2131771d88588/node_modules/axe-core/axe.min.js`; playwright at `~/.npm/_npx/705bc6b22212b352/node_modules/playwright/index.js`, CJS `import pkg from ...; const {chromium}=pkg`).
- Deploy: `vercel --prod --yes` from the repo; then VERIFY `riverdell-vision.vercel.app` serves the new build (deploys can time out before aliasing).

## Uncommitted (on disk, git untouched)
- None  -  working tree is CLEAN (`git status --porcelain` empty). All this session's edits are committed (background /sync).

## Constraints
- **Never output an em dash (U+2014)** anywhere (PostToolUse hook blocks Write/Edit; it does NOT fire on Bash-written files, so sanitize those manually).
- **Interrogate before delivering** via clickable `AskUserQuestion` (opinionated, recommended-first), per global CLAUDE.md; brainstorming runs in that same clickable style.
- Images -> `mcp__gemini-nano-banana__generate_image`; video -> `mcp__gemini-veo__generate_video`. No other providers.
- **Never invent** testimonials/prices/metrics; mark illustrative UI (portal, hero calendar) as such. Reviews/doctors/NAP/ratings (5.0·448 Google, 4.9·396 Zocdoc) are real.
- **Owner must set in Vercel** for real lead delivery: `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` (else `/api/lead` returns delivery:"skipped"). Brainstorm-planned rate-limit will add `UPSTASH_REDIS_REST_URL/TOKEN`.
- Next 16 has breaking changes  -  read `node_modules/next/dist/docs/` before coding (AGENTS.md). shadcn=Base UI (not Radix): use `btn()` helper for link-buttons, Accordion `multiple={false}`.
- Open links in Safari (`open -a Safari`), never VSCode Simple Browser.

## Read first on resume
- `docs/superpowers/RESUME-riverdell.md` (this file).
- `src/components/marketing/hero-booking.tsx`, `src/app/(marketing)/page.tsx`  -  the last edit.
- For the brainstorm: the 3-slice design is in the conversation only (not yet a spec file)  -  re-derive from the Status "decisions locked" line above, then write the spec.
