# Riverdell Vision: Proof, Differentiators & Reviews Upgrade

Date: 2026-07-02
Branch (planned): `feat/proof-diff-reviews`
Trigger: `/upgrade` on the homepage proof + differentiator + reviews stretch ("looks so basic"; "spell out UNIQUE competitive differentiators"; reviews feature requests).

## Why
Three homepage moments underperform:
- **Proof band ("THE RECORD")** looks generic.
- **"The Riverdell Difference"** lists virtues almost any practice claims (physician-led, unhurried, updated tech, family care) instead of hard-to-copy facts.
- **Reviews ("Trusted by Bergen County families")** are static, Google-only, and don't feed the high-ticket service pages.

Goal: make proof premium, differentiators genuinely unique (specific and warm), and reviews a real, source-attributed, filterable system that also supplies each service page.

## Decisions (from interrogation)
- **Scope:** redesign the proof band and the differentiator section together as one connected proof to why-us moment, plus the reviews system and per-service reviews.
- **Differentiator edges (all true, to spell out):** specialty services retail/quick-optometry cannot offer (myopia management, Ortho-K, scleral/specialty lenses, vision therapy, neuro-optometric rehab); a credentialed vision-development Fellow (Dr. Meyer, FCOVD) plus a physician-led medical model; elite reputation (5.0 across 448 Google, 4.9 across ~391 Zocdoc); bilingual care (English/Korean) and four doctors each with a focus.
- **Framing:** specific and warm. Positioned against retail/chains, rushed high-volume optometry, and being referred out for specialty needs. No competitor names.
- **Reviews:** Google/Zocdoc mix; source-platform logo in each card's lower-right (replacing the plain "GOOGLE" text); 6 visible, then "Show more" opens to 12 per page and allows all reviews; once expanded, sort/filter by specialty service; service pages auto-pull 3-6 matching reviews by canonical service tag.

## Data model change (`src/lib/reviews.ts`)
Extend the `Review` type:
- `source: "Google" | "Zocdoc"` (real, correctly attributed only)
- `services: ServiceId[]` where `ServiceId` is a canonical union matching the service-page slugs: `myopia | ortho-k | dry-eye | specialty-lenses | vision-therapy | neuro-rehab | medical | pediatric-family | comprehensive`
- keep `name`, `rating`, `quote`; the display `tag` is derived from `services[0]`.

A service page pulls its reviews with `REVIEWS.filter(r => r.services.includes(slug))`, so tagging stays the single source of truth and new reviews flow to the right pages automatically.

## Data dependency (honesty gate: never invent or misattribute)
- Current corpus: 12 real reviews, all Google, freeform tags, 0 Zocdoc.
- Verified live: Zocdoc practice profile `riverdell-vision-30098` is real, ~4.91/391; Dr. Han page 4.95/233. Repo stat 4.9/396 is accurate; pin to the current live figure.
- Pulled 6 more real verbatim reviews from `riverdellvision.com/reviews.html` (Mykia F., Grace N., Christine R., Jinnie Y., Stanley S. [vision therapy / convergence insufficiency], Jennifer S. [pediatric]). Source platform is not labeled on that page, so these cannot be badged Google vs Zocdoc without confirmation.
- Zocdoc blocks scraping (HTTP 403), so verbatim Zocdoc reviews must come from Dan (owner access) or be individually confirmed.
- Target corpus for good filtering and 3-6 per service: roughly 24-40 real reviews spread across services and both sources.
- Requested collection format per review: reviewer name (as posted), source (Google or Zocdoc), service(s) it relates to, and verbatim text.
- Until the corpus grows, the UI degrades gracefully: "Show more" appears only when more than 6 exist; filters list only populated services; service pages show whatever truly matches.

## Staged plan
Gates every stage: `pnpm lint`, typecheck (via `pnpm build`), tests, build. Show rendered preview (public Vercel URL) for approval before merge.

- **Stage 0 (no visual change):** branch; add canonical `ServiceId` taxonomy; extend `Review` model; migrate the existing 12 reviews to `services[]`; keep content-invariant tests green.
- **Stage 1:** Proof band redesign (premium, brand tokens). Preview, approve.
- **Stage 2:** Differentiator section rewrite + redesign (real edges, specific and warm; optional compact "us vs the alternatives" contrast). Preview, approve.
- **Stage 3:** Reviews section overhaul (source-platform logos, 6 to 12 to all, specialty filter/sort on expand). Needs corpus. Preview, approve.
- **Stage 4:** Service-page review blocks (auto by tag, 3-6 each). Preview, approve.
- **Stage 5:** all gates green, open PR, CI passes, merge, verify live, share public URL.

## Constraints
Reuse brand tokens (Newsreader/Fraunces display, teal/clay/brass on bone). Keep content-invariant tests green. Ask before editing config (`package.json`, `next.config`, CI, env). Honest data only. No em dashes.
