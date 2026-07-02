# Riverdell Vision  -  Site Audit Reviews

_Consolidated reports from the five parallel audit agents run on 2026-07-02 against the live blue-palette build (https://riverdell-vision.vercel.app). Verbatim agent output; internal scratchpad paths left as-is._

## Contents
1. Visual Design & Palette Cohesion
2. Accessibility (WCAG 2.2 AA)
3. Conversion / CRO & Trust
4. Mobile UX
5. Functional QA & Integrity

---

# Visual Design & Palette Cohesion

This is the smoking gun for the leftover-teal findings. Three concrete old-palette leftovers survived the rebase:

1. **`public/icon.svg`** (the site favicon / browser-tab icon, referenced via `icon.png` too): still `fill="#123C46"` (old deep TEAL-GREEN tile) + `#C6934E` (old brass/gold pupil) + `#F4EFE7` (old cream stroke). The favicon in the browser tab is the OLD boutique teal-green mark, not the new Riverdell blue. High-visibility, low-effort brand inconsistency.

2. **`src/app/opengraph-image.tsx`**: the social share image is hardcoded to the OLD palette  -  `bone = "#F4EFE7"` (warm cream) and `tealDeep = "#123C46"` (teal-green). So every link preview on social/search shows the old warm-cream + teal-green identity, clashing with the live blue site.

3. **`.dark` theme block + `--sage`**: the entire `.dark` palette (used by the dashboard) is still on the OLD hue axis (`210`/`208`/`78`/`72` = teal-green + warm cream/brass), and `--sage` is `oklch(... 210)` (cyan-teal-green). These are off-system relative to the new blue/coral. The dashboard isn't in the public audit scope, but `--sage` (chart-3) and dark tokens are leftover teal-green.

I have everything needed. Compiling the final prioritized report.

---

# Riverdell Vision  -  Visual Design + Palette Cohesion Audit

Read-only audit of the live site (https://riverdell-vision.vercel.app) at desktop 1440 and mobile 390 across home, /myopia-management, /about, /oradell, /reviews, /book, /fort-lee, /areas, plus the CareFinder. Overall the blue rebase is strong: the hero, navy bands, coral accents, and CareFinder are genuinely premium. The gaps below are what stand between "competent+" and Awwwards-tier, ordered by leverage.

## Tier 1  -  Leftover old palette (true "didn't recolor" bugs)

**1. Favicon / app icon is still the OLD teal-green + gold mark**  -  H impact / L effort
- WHAT: `public/icon.svg` is hardcoded `fill="#123C46"` (old deep teal-green tile), `#C6934E` (old brass pupil), `#F4EFE7` (old cream stroke). This is the browser-tab icon and PWA icon.
- WHY: Never got rebased to Riverdell blue. It clashes with the entire blue site the moment a tab is open or bookmarked.
- WHERE: `public/icon.svg` (and regenerate `src/app/icon.png`, currently 256×256, likely derived from the old mark).

**2. Social share / OpenGraph image renders in the OLD boutique palette**  -  H impact / L effort
- WHAT: `bone = "#F4EFE7"` (warm cream) and `tealDeep = "#123C46"` (teal-green) hardcoded.
- WHY: Every link preview (Google, iMessage, social) shows the abandoned cream+teal-green identity, so the brand's first impression off-site contradicts the on-site blue.
- WHERE: `src/app/opengraph-image.tsx:8-9`.

**3. `--sage` token and the entire `.dark` theme are still on the teal-green/cream hue axis**  -  M impact / M effort
- WHAT: `--sage: oklch(0.85 0.035 210)` is a cyan-teal-green; it's wired to `--chart-3`. The whole `.dark` block uses hues `208/210` (teal-green) + `72/78/90` (warm brass/cream) for bg, card, foreground, muted, accent.
- WHY: These are off-system vs. the new blue (254) / coral (42). `.dark` powers the team dashboard (out of public scope but visually incoherent with the brand); `--sage` is a latent green that will surface anywhere charts/accents use chart-3.
- WHERE: `src/app/globals.css:86` (`--sage`), `:126-145` (`.dark`).

## Tier 2  -  Palette cohesion inconsistency (the biggest visible one)

**4. Headings are inconsistently blue vs. near-black across pages**  -  H impact / M effort
- WHAT: The global rule `h1..h4 { color: var(--teal) }` makes headings blue, but many hand-written headings override to `text-ink` (near-black navy, computed `lab(15%…)` vs teal `lab(44%…)`). Result: myopia/home *section* headings are brand-blue, but the hero H1s and key H2/H3s on **/about, /oradell, /book, /reviews (the giant "5.0"), /areas/[slug], /privacy, /accessibility**, all **doctor names**, the "More of what we do" H2, and **service-view detail H3s** render near-black.
- WHY: The brand blue barely appears in headings on half the site, so those pages read as a generic black-serif template and the palette feels applied unevenly page-to-page. This is the single most visible cohesion break.
- WHERE: `src/app/(marketing)/about/page.tsx:52,82,139,171`; `oradell/page.tsx:42,159`; `book/page.tsx:27,40`; `reviews/page.tsx:28`; `areas/[slug]/page.tsx:67`; `consult-form.tsx:72`; `privacy/`, `accessibility/`. Decide one convention (recommend: blue for hero H1 + section headings, ink reserved for card/detail sub-heads) and apply it consistently.

## Tier 3  -  Contrast / legibility from the new palette

**5. Mid-blue headings on deep-navy backgrounds (blue-on-blue)**  -  M impact / L effort
- WHAT: `/fort-lee` hero H1 "Riverdell Vision is coming to Fort Lee." is `text-teal` (mid-blue) on a `teal-deep` navy hero; the waitlist card's "Be first in line." is likewise mid-blue on navy. On dark bands, the navy-tinted overlay makes the mid-blue headline noticeably dim.
- WHY: `--teal` on `--teal-deep` is low-contrast; the hero headline should be `--bone` (as the home CareFinder and CTA-band headings correctly are) for the crisp, high-contrast look those bands achieve.
- WHERE: `src/app/(marketing)/fort-lee/page.tsx` hero + waitlist heading (compare the correct treatment in `page.tsx:185` and `cta-band.tsx:14` which use `text-bone`).

**6. `--bone` vs `--bone-deep` are nearly identical (~3% lightness apart)**  -  M impact / M effort
- WHAT: `--bone` `lab(96.8)` and `--bone-deep` `lab(93.6)` differ by ~3%. The intended light/alternate-light section rhythm barely reads; long stretches (Areas hero+cards, Reviews grid, service trust bars) look like one flat near-white.
- WHY: Removes the tonal "breathing" that separates sections; contributes directly to the flat/templated feel on Areas and Reviews.
- WHERE: `src/app/globals.css:77-78`. Push `--bone-deep` a few points darker/cooler, or introduce a faint blue-tint alternate.

## Tier 4  -  Tone-rhythm (adjacent same-tone sections)

**7. Two blue sections stacked with a muddy seam**  -  M impact / L-M effort
- WHAT: On the home page the deep-navy **Fort Lee** band butts directly into the mid-blue **CTA band** (navy → mid-blue, both blue). Site-wide, the mid-blue CTA band (`--teal`) sits directly above the deep-navy footer (`--teal-deep`) on every page  -  mid-blue → navy with only a subtle step, reading as one large blue blob at the page bottom.
- WHY: No light "palate cleanser" between blues; the eye can't parse where one section ends. A premium page alternates tone (light → dark → light).
- WHERE: home `page.tsx:326-360` (Fort Lee then `<CtaBand/>`); `cta-band.tsx` (`bg-teal`) directly above `footer.tsx` (`bg-teal-deep`). Consider a thin light divider, or make one of the two blues light.

**8. Coral is used as a full-row of 4 icons on service trust bars**  -  L impact / L effort
- WHAT: All four service-page trust-bar icons (`Physician-led / No upselling / Insurance checked / Second opinions`) are `text-clay` coral, as is the breadcrumb slash. Four coral icons in a row makes that strip read coral-forward rather than blue-brand.
- WHY: Coral works best as a sparing spark (eyebrows, one accent). A full coral row slightly over-uses the accent and competes with the blue identity.
- WHERE: `src/components/marketing/service-view.tsx:113` (trust icons), `:58` (breadcrumb). Consider blue icons + coral only on hover/one element.

## Tier 5  -  Awwwards-bar polish gaps

**9. Logo mark reads slightly cyan against the pure-blue wordmark/site**  -  L impact / L effort
- WHAT: Pixel-sampling `riverdell-logo.png` shows the eye/ring mark is cyan-tinted (dominant `(216,240,240)`, `(144,192,216)`  -  green≈blue), while `--teal` is a true blue (low green). Side by side there's a subtle two-tone-blue tension. It's also a raster PNG scaled up (640×134 shown at ~40px tall), so edges are slightly soft on retina.
- WHY: Authentic logo, so keep it  -  but the site blue could be nudged a hair toward the logo hue for tighter lockup, and a crisper/SVG or 2× asset would sharpen it.
- WHERE: `public/riverdell-logo.png`, `src/components/site/logo.tsx`; `--teal` at `globals.css:81`.

**10. Sparse, unbalanced hero/whitespace on utility pages**  -  M impact / M effort
- WHAT: `/areas` is a large flat near-white expanse (hero + 8 plain link cards, no imagery/color) directly above the CTA  -  reads as a bare template list. `/reviews` floats a giant "5.0" with big empty padding above and below, then a same-tone review grid; `/book` has a tall empty band above the form. These pages feel under-designed vs. the rich home/service pages.
- WHY: Hierarchy/spacing and lack of tonal or visual variety make them the weakest pages against a top-1% bar.
- WHERE: `areas/page.tsx`, `reviews/page.tsx` (hero block), `book/page.tsx` hero. Add a supporting visual/tonal band, tighten hero padding, give cards real elevation.

**11. Pale-blue low-emphasis buttons look anemic on near-white**  -  L impact / L effort
- WHAT: The `/book` "Book on Zocdoc" button is `teal-tint` fill + blue text on a near-white card  -  very low contrast, reads washed-out and weak for a primary conversion path.
- WHERE: `book/page.tsx` right column; `btn` `secondary` variant in `src/lib/ui.ts:24`.

**12. Same 3 testimonials repeated across home, /oradell, and /reviews**  -  L impact / L effort
- WHAT: Katherine Rodriguez / Hannah Verbrugge / Irene Voce (and the same 6-card set) appear identically on multiple pages.
- WHY: Repetition is a "templated" tell; varying the quotes per page reads more crafted.
- WHERE: `src/components/site/reviews.tsx` + `src/lib/reviews.ts` (feed different slices per route).

## What is working (leave alone)
- Navy bands (`teal-deep`) with white Newsreader text: excellent contrast and the most premium moments (CareFinder, myopia "short answer", CTA on dark).
- Coral (`--clay`) as eyebrow/italic-accent/`0X` numerals: tasteful and on-brand.
- CareFinder qualifier (desktop + mobile), hero booking card, mega-menu featured card, doctor grid: genuinely strong.
- No leftover green in body content  -  service checklists are correctly blue (`whoFor`) / coral (`whenToSee`); the only true green leftovers are the favicon, OG image, `.dark`, and `--sage` (Tier 1).

**Highest-leverage first three:** (1) fix the favicon + (2) OG image (both L-effort, H-visibility brand bugs), then (4) unify heading color so the brand blue appears consistently  -  that trio closes most of the perceived cohesion gap. Screenshots saved under `/private/tmp/claude-501/-Users-macbook-workspace/579fc4ef-a31f-4cc1-b1f0-992854298dbc/scratchpad/shots/`.

---

# Accessibility (WCAG 2.2 AA)

That confirms it: `CtaBand` uses `bg-teal` with `text-bone/80` subtext  -  measured 3.73:1, below AA 4.5. This is a site-wide component (appears on every page's CTA band), so it's high-leverage. The primary body text on the teal band (`text-bone` at 100%) is fine at 4.91:1, but only barely; the `/80` subtext fails.

I have everything needed. Let me write the prioritized report.

## Riverdell Vision  -  WCAG 2.2 AA Accessibility Audit (read-only)

**Method:** axe-core 4.10.2 via cached Playwright/Chromium against LIVE (`/`, `/book`, `/myopia-management`, `/oradell`), plus first-principles OKLCH→sRGB→WCAG contrast math on every new palette token, plus live keyboard/focus/reduced-motion interaction tests. axe ratios matched my hand-computed ratios to two decimals, so the numbers below are trustworthy.

**Headline:** The new blue/gold/navy choices mostly pass. The coral (`--clay`) is the one systemic failure  -  it fails AA as text almost everywhere it is used. Two real interaction defects exist (focus not returned on menu-close; a translucent-white subtext on the site-wide CTA band). No critical axe violations; the one "critical" axe flag is a false positive.

---

### Token hex (computed from OKLCH, for reference)
`bone #f2f6fa` · `bone-deep #e6eef5` · `ink #1d2736` · `ink-soft #586475` · `teal(blue) #1c6cc1` · `teal-deep(navy) #0b3a7a` · `teal-tint #d6ebfe` · `clay(coral) #c85c2e` · `clay-soft #ffdccc` · `brass(gold) #e3ac64` · `card #fbfeff`

---

### P1  -  Systemic, ships on every page (fix first)

**1. Coral (`--clay`) fails AA as body/label text on every light surface.** `#c85c2e` measures **3.84:1 on bone**, **4.12:1 on card**, **3.56:1 on bone-deep**  -  all below the 4.5 required for normal text. axe flagged 17 nodes on `/`, 10 on `/myopia-management`, 4 on `/oradell` (all `serious`, WCAG 1.4.3).
- WCAG: 1.4.3 Contrast (Minimum). IMPACT: H. EFFORT: L. WHERE: token `--clay` in `src/app/globals.css:84`, consumed by `.eyebrow` accent in `src/components/site/primitives.tsx:52` (`Eyebrow`), the CareFinder step labels `src/components/marketing/care-finder.tsx:153,174,195`, service-ladder index numbers and role text in `src/app/(marketing)/page.tsx:157,276`, and `service-view.tsx`.
- Fix: darken `--clay` to roughly `oklch(0.52 0.15 40)` (≈`#a8471f`) to clear 4.5:1 on both bone and card. This one token change fixes all coral-text failures at once. The coral fill on icons/arrows (non-text, e.g. `care-finder.tsx:115`) is exempt but would still benefit.

**2. `CtaBand` subtext fails AA and sits on the conversion path of every page.** `text-bone/80` composited over `bg-teal` = **3.73:1** (need 4.5). axe caught it on `/oradell` (WCAG 1.4.3).
- IMPACT: H. EFFORT: L. WHERE: `src/components/site/cta-band.tsx:17`. Also the header mega-menu card uses `text-bone/75` and `/70` on `bg-teal` (3.94 and 3.74:1)  -  `src/components/site/header.tsx` (the "Book online in real time" and review-count lines).
- Fix: raise these to full `text-bone` (100% on teal = 4.91:1, passes) or lighten to pure white. Note even solid `text-bone` on `bg-teal` is only 4.91:1  -  comfortable but not generous; a slightly deeper blue would add margin.

---

### P2  -  Real interaction defects

**3. Mega-menu closes but does NOT return focus to its trigger.** Live test: opening the "Care/Practice" dropdown, Tab into a panel link, then Escape → `aria-expanded` correctly flips to `false`, but `document.activeElement` stays on the now-hidden panel link (e.g. "Myopia Management"). Keyboard focus is stranded on a `visibility:hidden` element.
- WCAG: 2.4.3 Focus Order (also 2.4.7). IMPACT: M. EFFORT: M. WHERE: `src/components/site/header.tsx`  -  the `onKey`/Escape handler (`useEffect` ~line 36) sets `openMenu` to null but never calls `.focus()` on the trigger button. Fix: on Escape, return focus to the group's trigger.
- Positives verified: menu opens on Enter/click, panel links carry `tabindex={isOpen ? 0 : -1}` so closed panels are correctly out of Tab order, and Escape does dismiss.

**4. Form placeholder text is far below AA (and placeholders are used as low-vision hints).** The dashboard gate uses `placeholder:text-bone/40`; the marketing forms use `placeholder:text-ink-soft/60`. `ink-soft` at 60% on card computes to **~1.99:1**  -  effectively invisible.
- WCAG: 1.4.3 (placeholder text is in scope when it conveys info). IMPACT: M (marketing forms) / L (gated dashboard). EFFORT: L. WHERE: `src/components/marketing/consult-form.tsx:10`, `waitlist-form.tsx:10` (`placeholder:text-ink-soft/60`); `src/components/dashboard/gate.tsx:53,59` (`placeholder:text-bone/40`).
- Mitigating: `/book` inputs have proper visible `<label htmlFor>` (verified in `consult-form.tsx`), so placeholders are supplementary there  -  lower urgency, but still bump to ≥`ink-soft/85`.

---

### P3  -  Lower-impact / near-miss

**5. Blue on `teal-tint` is a hair under AA.** `teal #1c6cc1` on `teal-tint #d6ebfe` = **4.35:1** (need 4.5). Used for the CareFinder icon-tile label and the hero booking calendar's available-day numbers. IMPACT: M. EFFORT: L. WHERE: `care-finder.tsx:107` (icon tile), `hero-booking.tsx` calendar cells. Fix falls out of P1 if `--teal` is nudged ~0.02 darker, or darken just these labels to `teal-deep`.

**6. Hairline borders and CareFinder tile borders miss the 3:1 UI-component minimum.** `line #d6dfe8` on card = **1.33:1**, on bone = **1.24:1** (WCAG 1.4.11 wants 3:1 for meaningful UI boundaries). IMPACT: L (borders are decorative here, content is not conveyed by the border alone, so arguably exempt). EFFORT: L. WHERE: token `--line` `globals.css:88`; `care-finder.tsx` tile `border-line`. Only actionable if these borders are the sole affordance for a control.

**7. CareFinder tile focus indicator is weak.** Tiles are real `<button>`s (good  -  Enter advances to step 2, verified live). On focus they get `focus-visible:border-teal` (a 1px border change) plus the global 2px teal `:focus-visible` outline (`globals.css:175`, teal-on-bone = 4.91:1, passes 3:1). The outline saves it, but the intended `border-teal` cue is barely perceptible. IMPACT: L. EFFORT: L. WHERE: `care-finder.tsx:97` (`OptionTile`).

**8. `<aside>` nested inside another landmark on `/book`.** axe `moderate`: a complementary landmark is not top-level. IMPACT: L. EFFORT: L. WHERE: `/book` layout  -  the booking `<aside class="flex flex-col gap-6">`. Fix: move it out of the parent landmark or drop the implicit `complementary` role.

**9. `fort-lee.jpeg` renders with empty `alt=""`.** Fine if purely decorative; if it depicts the office/location it should carry a description. IMPACT: L. EFFORT: L. WHERE: `/` (via `src/app/(marketing)/fort-lee` imagery).

---

### Verified PASSING (the new palette, confirmed)
- **Gold on navy:** `brass #e3ac64` on `teal-deep #0b3a7a` = **5.42:1**  -  passes AA for text and the gold review stars (3:1 UI). Good choice.
- **Blue headings/links on cream:** `teal #1c6cc1` on bone = **4.91:1** (normal + large text pass); on card **5.25:1**. Passes.
- **Muted body:** `ink-soft #586475` on bone **5.53:1**, on card **5.91:1**. Passes comfortably.
- **Body text:** `ink` on bone = **13.9:1**. Excellent.
- **Coral as large display** ("families trust." italic, `page.tsx:62`; "don't" `page.tsx:136`): **3.88:1**  -  technically passes the 3:1 large-text bar since these render large/bold, so axe did not flag them. Borderline; fixing token #1 makes them safely compliant anyway.
- **Skip link:** present, first in Tab order, becomes visible on focus, `#main` target exists (`layout.tsx:73` + `(marketing)/layout.tsx:15`), teal/bone = 10.2:1. Solid.
- **Logo alt text:** `alt="Riverdell Vision"`  -  descriptive, not a filename (`src/components/site/logo.tsx`). On-dark variant sits in a white chip for legibility. Pass.
- **Reduced motion:** honored. The `Reveal` component (`src/components/site/reveal.tsx`) early-returns under `prefers-reduced-motion` leaving content visible (never stranded at opacity 0); the global CSS block zeroes transition/animation durations (`globals.css:208`). No stranded-content bug (my initial reading of hidden `opacity-0` nodes was the mega-menu panels and inactive slides, which are correctly hidden by design).
- **Mega-menu keyboard operability:** opens on Enter, panel links reachable via Tab with correct `tabindex` gating, Escape dismisses. Only the focus-return (finding #3) is missing.
- **`/book` form:** every field has an associated `<label htmlFor>` with matching `id`, plus `autoComplete`. Pass.
- The axe `aria-valid-attr-value` "critical" incomplete on all pages is a **false positive**: axe can't confirm the `aria-controls` target ID because the dropdown panel is `visibility:hidden` when closed; the element does exist in the DOM. No action needed.

**Note:** the `HeroSlideshow` component (`src/components/marketing/hero-slideshow.tsx`) has a focus-visibility bug (the "Next slide" control lacks `focus-visible:opacity-100` that "Previous slide" has), but the live home renders `HeroBooking` instead (`page.tsx:103`), so it is not a shipping defect  -  worth fixing before that component is ever used.

**Top 3 fixes by leverage:** (1) darken `--clay` token → clears every coral-text failure site-wide in one line; (2) solidify the `CtaBand`/mega-menu `text-bone/*` opacities → fixes the conversion-path subtext on every page; (3) return focus to the trigger on menu-Escape.

---

# Conversion / CRO & Trust

I now have a complete picture. Confirmed absences:
- **No head-to-head "us vs retail optical" comparison** exists anywhere. The "Physician-led, not retail" theme is stated as a principle (home) and in `/areas` prose, but never as a scannable side-by-side comparison artifact.
- **No sitewide risk-reversal/guarantee bar.** "No upselling, ever" + "Second opinions welcome" exist only inside the service-page trust bar (4 items), not sitewide, and not on the home page or book page.
- **No outcome artifact** (e.g., a myopia-progression tracking visual, a before/after, a "what your visit looks like" timeline as a concrete deliverable).
- **No inline booking at page close** - the CtaBand is text + 3 buttons that jump to `/book`; the actual form/Zocdoc widget is never embedded at the close of a service or home page.

I have everything needed for the prioritized report.

---

# Riverdell Vision  -  CRO + Trust Audit (award-tier)

**Method:** Walked the live funnel on `https://riverdell-vision.vercel.app` via cached Playwright at desktop 1440 and mobile 390, plus a full read of the funnel code. The build is genuinely strong: real dual-source proof (5.0/448 Google + 4.9/396 Zocdoc, both clickable out to the real profiles), a well-built two-step CareFinder, deep-linkable `?interest=` prefill, honest no-overclaim copy, service pages with AEO "short answer" blocks and trust bars. The gaps below are about closing conversion leaks, not fixing anything broken.

Findings are ordered by leverage (impact ÷ effort).

---

### 1. No persistent/sticky mobile CTA  -  the single biggest leak
- **WHAT:** There is no sticky booking bar on mobile. The only sticky element sitewide is the header (`sticky top-0`), and on mobile the header's book CTA is `hidden sm:inline-flex` (below 640px it's absent). Live check returned `MOBILE header visible book CTA (outside hamburger): []`. The primary action lives only inside the hamburger sheet.
- **WHY:** The mobile home page is **13,713px tall** (measured live). A phone visitor scrolls thousands of pixels of service cards, doctors, reviews, and Fort Lee content with zero visible way to book. Every scroll past a persuasion beat that doesn't have a tappable CTA in view is a lost conversion. This is the highest-traffic device for a local practice.
- **IMPACT:** H · **EFFORT:** L
- **WHERE:** `src/app/(marketing)/layout.tsx` (add a mobile-only sticky bottom bar: "Request appointment" + a tel: call icon, `lg:hidden`), reusing `BookButton`/`CallButton` from `src/components/site/cta.tsx`.

### 2. Service pages don't carry `?interest=` into the form  -  prefill wasted on the highest-intent path
- **WHAT:** The `?interest=` prefill works (verified live: `/book?interest=Dry Eye` sets the select to "Dry Eye"), but the ONLY place in the entire codebase that emits it is the CareFinder. Grep confirms: `grep -rn "interest="` returns exactly one hit. On the Dry Eye page, all 8 `/book` links are bare `/book`. So a visitor who read the whole Dry Eye page and clicks "Request a consult" lands on a form defaulting to "Myopia Management" (the first option).
- **WHY:** A service-page visitor is your most qualified lead  -  they've self-identified a high-value need. Landing them on a mismatched/generic form adds friction and loses the routing signal your staff would use to prioritize. The plumbing already exists; it's just not wired.
- **IMPACT:** H · **EFFORT:** L
- **WHERE:** `src/components/marketing/service-view.tsx` (lines 81, 261, 313 CtaBand) and `src/components/site/cta.tsx` `BookButton`  -  pass `href={/book?interest=${service.interest}}`. Each `ServiceContent` already has a canonical name; add/reuse an `interest` field in `src/lib/services.ts` mapping to the `INTERESTS` list in `consult-form.tsx`.

### 3. Book page buries the fastest path (Zocdoc) below the whole form on mobile
- **WHAT:** On mobile the `/book` layout stacks the lead form first, then the "Book instantly (Zocdoc)" card, then call, hours, map (confirmed in screenshot). The instant-confirmation path sits under a 6-field form.
- **WHY:** The lead form is a *slower* conversion (staff calls back within a business day) than Zocdoc (books on the spot). High-intent mobile users who want to book now have to scroll past the slow path to find the fast one. Surfacing "Book instantly" first (or as a prominent top toggle) captures the impatient, ready-to-commit segment.
- **IMPACT:** H · **EFFORT:** L–M
- **WHERE:** `src/app/(marketing)/book/page.tsx`  -  on mobile, hoist the Zocdoc "Book instantly" card above the form (or add a top segmented "Book instantly / Request a callback" choice); on desktop the two-column layout is already fine.

### 4. No risk-reversal / guarantee bar sitewide
- **WHAT:** The reassurance elements ("No upselling, ever", "Second opinions welcome", "Insurance checked in advance", "Physician-led care") exist ONLY inside the service-page `TRUST` bar (`service-view.tsx` lines 26–31). They are absent from the home page, and  -  critically  -  from the `/book` page where anxiety peaks at the moment of commitment.
- **WHY:** Booking a medical appointment carries perceived risk (cost, upsell pressure, wasted time). A consistent, sitewide risk-reversal strip ("Insurance verified before you come in · No upselling, ever · Second opinions welcome · New & returning patients") directly lowers the barrier at the decision point. It's already written; it just needs to be promoted to a shared primitive and placed on home + book.
- **IMPACT:** H · **EFFORT:** L
- **WHERE:** Extract the `TRUST` array into a shared `<ReassuranceBar />` (new small component or in `src/components/site/`), render it on `src/app/(marketing)/page.tsx` and directly under the H1 on `src/app/(marketing)/book/page.tsx`.

### 5. No head-to-head "us vs retail optical" comparison artifact
- **WHAT:** The "physician-led, not retail" positioning is the brand's core wedge, but it only appears as prose (home principle card; `/areas` copy). There is no scannable side-by-side comparison table/card.
- **WHY:** The target patient is often deciding between Riverdell and a mall/chain optical (LensCrafters, Costco, Warby, a rushed VSP-mill). A concrete "At a retail optical / At Riverdell Vision" two-column contrast (exam length, who examines you, upsell pressure, specialty programs, follow-up, second opinions) makes the premium price/effort feel justified and is highly shareable/screenshot-able. Keep it honest and category-level (don't name/attack specific competitors) to stay on-brand and defensible.
- **IMPACT:** M–H · **EFFORT:** M
- **WHERE:** New section on `src/app/(marketing)/page.tsx` (between "Specialty care" grid and CareFinder, or in the "Riverdell difference" block at lines 201–248), and optionally reusable on service pages. Content can be drawn from existing honest copy in `src/lib/areas.ts` and the home `PRINCIPLES`.

### 6. CareFinder sits below the service grid  -  reorder for the "not sure" moment
- **WHAT:** The CareFinder ("Not sure where to start?") renders *after* the 6-card specialty grid on the home page (`page.tsx`: grid at line 129, CareFinder at line 178). Its whole value is for the undecided visitor.
- **WHY:** A visitor who already knows they want "Dry Eye" will click the service card; a visitor who is *unsure* should hit the qualifier *before* being asked to self-diagnose against a wall of clinical service names. Placing (or also teasing) the CareFinder above/alongside the grid catches indecision earlier and routes it to a pre-qualified booking  -  its highest-value function. At minimum, add an anchor CTA in the hero ("Not sure what you need? Find your care →") that jumps to it.
- **IMPACT:** M · **EFFORT:** L
- **WHERE:** `src/app/(marketing)/page.tsx`  -  move the CareFinder section above `#care`, or add a hero secondary link to `#care-finder`. The CareFinder framing itself (teal band, 2 questions, honest "a guide, not a diagnosis") is excellent and needs no change.

### 7. Inline booking at the close is missing (CtaBand only jumps away)
- **WHAT:** Every page ends in `CtaBand`  -  a headline + 3 buttons that navigate to `/book` or Zocdoc. The actual booking mechanism (form or a live Zocdoc embed/branded card) is never embedded at the close of home/service pages.
- **WHY:** Each extra navigation between "convinced" and "committed" sheds users. Embedding the branded `HeroBooking` Zocdoc card (already built, `src/components/marketing/hero-booking.tsx`) or a compact 3-field lead form directly in the closing band lets a persuaded reader act in place, on the page they were persuaded on.
- **IMPACT:** M · **EFFORT:** M
- **WHERE:** `src/components/site/cta-band.tsx`  -  add an optional embedded variant that renders `<HeroBooking />` or a mini `<ConsultForm />` beside the copy; use it on service-page and home closes.

### 8. `/book` page shows only Google proof, not the dual proof used elsewhere
- **WHAT:** The book page uses `ReviewStatBadge` (Google-only: "5.0 · 448 Google reviews", `reviews.tsx` line 55). The richer, clickable `DualProof` (Google + Zocdoc, both linked) is used in the hero and every service hero but not on the page where commitment happens.
- **WHY:** The booking page is where proof matters most. Since the page's own "Book instantly" path IS Zocdoc, showing the 4.9/396 Zocdoc rating there reinforces exactly the action being asked for.
- **IMPACT:** M · **EFFORT:** L
- **WHERE:** `src/app/(marketing)/book/page.tsx` line 35  -  swap `ReviewStatBadge` for `DualProof`.

### 9. No outcome artifact (proof of *what the care achieves*)
- **WHAT:** Trust rests on reviews + doctor bios + process descriptions. There's no concrete outcome artifact: e.g., a myopia progression-tracking chart mock ("we measure and show you the trend every visit"), a "what your first visit looks like" timeline, or a specialty-lens fit visual.
- **WHY:** For high-value specialty consults (myopia management, scleral lenses, neuro-rehab), the buyer wants evidence of a *result*, not just a caring vibe. A single honest outcome artifact per flagship service (no invented metrics  -  frame it as "how we track progress") differentiates from every generic optometry site and raises consult quality. The copy already promises "we track measurements over time" (`services.ts`) but never shows it.
- **IMPACT:** M · **EFFORT:** M–H
- **WHERE:** `src/components/marketing/service-view.tsx`  -  add an optional `outcome` block for flagship services (esp. myopia-management), rendered as an illustrative tracking visual with an explicit "illustrative, not a specific patient" note.

---

### Lower-priority / polish
- **Header CTA label vs. hero:** Header says "Request an appointment", hero primary is the same, but `HeroBooking` says "Book an appointment / See available times" (Zocdoc). Intentional (form vs instant), but the two verbs ("Request" vs "Book") could confuse; consider "Request a callback" vs "Book instantly on Zocdoc" to make the two paths explicit everywhere. `cta.tsx`, `hero-booking.tsx`. **IMPACT:** L · **EFFORT:** L
- **Form has no honeypot/spam guard and the lead API is demo-only** (`api/lead/route.ts` returns ok without persisting/notifying). Fine for prototype, but before real traffic the notification workflow must be wired or every real lead is silently dropped. **IMPACT:** H (once live) · **EFFORT:** M · Flagging as a go-live blocker, not a CRO tweak.
- **CareFinder "checkup" branch** returns a rec with no `slug`, so the "Learn about … care" secondary button is hidden and only "Request this consult" shows  -  correct behavior, just noting it's intentional.

### What's already excellent (leave alone)
Dual clickable proof in hero and service heroes; the branded Zocdoc availability card (`HeroBooking`); the CareFinder's honest framing and two-step flow; short low-friction form (3 required fields, zero PHI, sensible autocomplete); AEO "short answer" + "reviewed by / updated" blocks on service pages; consistent NAP + schema. No invented testimonials or metrics anywhere  -  keep that discipline.

**Top 3 to ship first (all H-impact / L-effort):** (1) sticky mobile CTA bar, (2) wire `?interest=` into service-page book buttons, (3) sitewide risk-reversal bar + dual proof on `/book`.

**Key paths:** `src/app/(marketing)/layout.tsx`, `src/components/site/header.tsx`, `src/components/marketing/service-view.tsx`, `src/components/site/cta.tsx`, `src/app/(marketing)/book/page.tsx`, `src/app/(marketing)/page.tsx`, `src/components/marketing/care-finder.tsx`, `src/components/site/cta-band.tsx`, `src/lib/services.ts`.

---

# Mobile UX

Confirmed. The mobile Sheet renders `primaryNav` (Care + Practice groups) plus a Book button and phone link, but there's no top-level "Home" or "Areas we serve" link in the mobile sheet (the desktop nav has a "Contact" top-level link and the footer has "Areas we serve", neither surfaces in the mobile sheet). That's a minor nav-parity gap, not a UX blocker.

I have all measured values and visual confirmations. Compiling the report.

---

# Riverdell Vision: Mobile UX Audit (390x844, iPhone, touch)

Live: https://riverdell-vision.vercel.app · Repo: `/Users/macbook/workspace/riverdell-vision`
Method: cached Playwright, real iPhone viewport/UA, `isMobile:true hasTouch:true`, computed-style + bounding-box measurement plus screenshots of home, hero booking card, CareFinder, a service page (`/dry-eye-treatment`), `/book`, and the open mobile Sheet.

**Good news up front:** Zero horizontal overflow on every page tested (`scrollW === clientW === 390`). Mega-menus are click-toggled, not hover-only, so there's no hover-trap. CareFinder tiles (292x90px) and the hero booking CTA (`See available times`, 48px) are excellent touch targets. The larger logo fits the header cleanly (153x32px in a 65px header, no clipping).

The findings below are ordered by leverage (impact ÷ effort).

---

## P1  -  High impact, low effort

### 1. Form inputs are 15px → iOS auto-zooms on every field tap
- **WHAT:** All 6 booking-form fields compute to `font-size:15px`. Measured: `name/email/phone` inputs 15px, `interest/preferredContact/time` selects 15px.
- **WHY:** iOS Safari zooms the viewport whenever a focused input is `<16px`, then leaves the page zoomed-in and horizontally pannable. This is the single most jarring mobile bug on a lead-gen page, and this form is the primary conversion path.
- **IMPACT: H** (most local traffic is mobile; this is the money form) · **EFFORT: L** (one string)
- **WHERE:** `src/components/marketing/consult-form.tsx:10`  -  the shared `field` class uses `text-[15px]`. Change to `text-base` (16px), or `text-[16px]`. Note the same page's shadcn primitives (`src/components/ui/input.tsx:12`, `textarea.tsx:10`, `select.tsx:44`) use `text-base` then `md:text-sm`, which is the correct pattern; the hand-rolled `field` class is the outlier.

### 2. No thumb-reachable / persistent "Book" CTA in the mobile header
- **WHAT:** The header's `BookButton` is `hidden sm:inline-flex` (Tailwind `sm`=640px), so at 390px it is not rendered (measured `visible:false, w:0`). The only header control on a phone is the hamburger. The primary CTA then lives *only inside the opened Sheet*.
- **WHY:** On mobile the top-of-viewport is the reachable zone during scroll, and the standard boutique-services pattern is an always-visible "Book"/"Call" affordance. Right now a user who scrolls past the hero has to (a) open the menu and scroll to the bottom Book button, or (b) scroll back to a hero CTA. There is also **no sticky bottom CTA bar anywhere** in the codebase (grep for `fixed bottom`/`inset` returns only the Sheet/Dialog overlays).
- **IMPACT: H** · **EFFORT: L–M** (either flip the header button to show on mobile, or add a small sticky bottom Book/Call bar)
- **WHERE:** `src/components/site/header.tsx:191` (`<Magnetic className="hidden sm:inline-flex">`). Cheapest fix: show a compact `BookButton size="sm"` at all widths next to the hamburger (the 390px header has room, logo is 153px + hamburger 40px). Higher-leverage fix: a thumb-zone sticky `Book | Call` bar (there's no component for this yet).

### 3. Hero booking calendar "cells" read as tappable dates but do nothing
- **WHAT:** The 28 calendar tiles (37x51px each) are styled like selectable date buttons (teal-tinted "open" days vs. bordered "closed" days) but are pure `<div>`s marked `aria-hidden`; only the single `See available times` link is interactive.
- **WHY:** Affordance mismatch: on a phone people will tap "Fri 3" expecting to pick that day. Nothing happens, which reads as broken. The visual promise ("Next 4 weeks", specific open days) exceeds the interaction.
- **IMPACT: M** · **EFFORT: L**
- **WHERE:** `src/components/marketing/hero-booking.tsx:33-55`. Cheapest: reduce the button-like affordance (flatter cells) OR make the whole card a single tap surface to Zocdoc so any tap on the calendar routes correctly. (Cells at 37x51 are below 44px, but since they're decorative/aria-hidden the target rule technically doesn't apply, the real issue is the false affordance.)

---

## P2  -  Medium impact

### 4. Mobile nav rows are 41px tall and sit edge-to-edge (mis-tap risk)
- **WHAT:** Every Sheet nav link measures **41px tall** (14 items), just under the 44px minimum, with no separator between adjacent rows. Their width (260px) is fine; only vertical size and inter-row gap are tight.
- **WHY:** 41px stacked rows with `gap-1` (4px) between groups but effectively touching within a group means fat-finger taps can hit the neighbor. WCAG 2.5.5 / Apple HIG both target 44px.
- **IMPACT: M** · **EFFORT: L**
- **WHERE:** `src/components/site/header.tsx:222`  -  items use `py-2.5` (→41px). Bump to `py-3` (→~48px) or add `min-h-11`. The sheet width is 293px (`w-[88vw] max-w-sm`), leaving plenty of room.

### 5. Footer link targets are 16–20px tall
- **WHAT:** Footer legal/utility links measure 16–18px tall: `Privacy` 39x16, `Accessibility` 67x16, `Sitemap` 43x16, `Team portal` 65x16; contact links (`(201) 265-7900` 93x20, email 161x20) are 20px; service links in the footer are 18px.
- **WHY:** Small stacked footer links are a common mis-tap zone on mobile. Phone/email especially matter here (call intent).
- **IMPACT: M** (phone/email) / **L** (legal links) · **EFFORT: L**
- **WHERE:** `src/components/site/footer.tsx`. Add vertical padding (`py-2`) or `min-h-11` to the footer link lists, prioritizing the phone/email/NAP block.

### 6. Social icon buttons are 36x36px
- **WHAT:** Facebook and Instagram links measure 36x36px on every page (header/footer social).
- **WHY:** Below the 44px touch minimum.
- **IMPACT: L–M** · **EFFORT: L**
- **WHERE:** `src/components/site/footer.tsx` (social row). Bump the icon hit-area to `size-11` / add padding.

---

## P3  -  Low impact / polish

### 7. Hero eyebrow wraps to two lines with heavy tracking
- **WHAT:** "FAMILY OPTOMETRY · ORADELL, NEW JERSEY" wraps mid-phrase ("NEW / JERSEY") at 390px due to the `eyebrow` letter-spacing.
- **WHY:** Cosmetic but the wide-tracked uppercase breaking across lines looks slightly unfinished at the top of the highest-traffic page.
- **IMPACT: L** · **EFFORT: L**
- **WHERE:** `src/app/(marketing)/page.tsx` (`<Eyebrow>` in hero) / the `eyebrow` utility in `primitives.tsx`. Shorten to "Family Optometry · Oradell, NJ" for mobile or reduce tracking below `md`.

### 8. Mobile Sheet omits "Home" and "Areas we serve"
- **WHAT:** The mobile Sheet renders only the `primaryNav` groups (Care, Practice) + Book + phone. The desktop nav also has a top-level "Contact" link, and the footer has "Areas we serve" (`/areas`), neither of which appears in the mobile menu. There's no "Home" entry either (logo tap works, but it's not obvious).
- **WHY:** Nav parity + local-SEO surfacing: `/areas` is a local-intent page (Fort Lee, Edgewater, etc.) that mobile users can't reach from the menu.
- **IMPACT: L–M** (findability) · **EFFORT: L**
- **WHERE:** `src/components/site/header.tsx:208-229` (mobile nav) vs `src/lib/site.ts:56` (`areas`) and footer. Add an "Explore" group or standalone links for Contact + Areas in the Sheet.

---

## Summary table

| # | Finding | Impact | Effort | Where |
|---|---------|--------|--------|-------|
| 1 | 15px form inputs → iOS zoom | H | L | `consult-form.tsx:10` |
| 2 | No mobile-visible / sticky Book CTA | H | L–M | `header.tsx:191` |
| 3 | Hero calendar cells look tappable, aren't | M | L | `hero-booking.tsx:33` |
| 4 | Nav rows 41px, edge-to-edge | M | L | `header.tsx:222` |
| 5 | Footer links 16–20px | M/L | L | `footer.tsx` |
| 6 | Social icons 36px | L–M | L | `footer.tsx` |
| 7 | Hero eyebrow wraps | L | L | `page.tsx` / `primitives.tsx` |
| 8 | Sheet omits Home/Areas/Contact | L–M | L | `header.tsx:208` |

**Not problems (verified):** no horizontal overflow anywhere; CareFinder tiles 292x90 (great); hero CTA and form submit button ≥48px; mega-menus click-toggle so no hover-only trap; larger logo fits the mobile header without clipping; form fields are 44–45px tall (touch-height is fine, only their font-size is the issue).

Top three to fix first, in order: **#1 (font-size, one-line fix, biggest conversion bug), #2 (surface Book on mobile), #4 (44px nav rows).**

Screenshots saved under `/private/tmp/claude-501/-Users-macbook-workspace/579fc4ef-a31f-4cc1-b1f0-992854298dbc/scratchpad/` (`01-home`…`07-mobile-nav.png`).

---

# Functional QA & Integrity

All review counts (448 Google / 396 Zocdoc / 4.9) are internally consistent across every hardcoded literal and the `REVIEW_STATS` source. Phone number consistent everywhere. No data drift.

The audit is complete. I have thorough evidence across all requested dimensions. Note: WebKit/Safari was **not** available in the cached Playwright install (only Chromium 1228 is present), so cross-browser Safari testing could not be performed  -  I'll flag that as a coverage gap, not a defect. Here is the final report.

---

# Riverdell Vision  -  Functional QA & Integrity Audit

**Target:** https://riverdell-vision.vercel.app · **Repo:** `/Users/macbook/workspace/riverdell-vision` (commit `2540d80`)
**Method:** Read-only. Playwright 1.61.1 (Chromium 1228) crawl of 20 routes + all discovered links, plus scripted interaction tests and `curl -I` header checks. No code was edited.

## Headline verdict
**The build passes the zero-defect functional bar.** Every high-value flow the brief called out works correctly: CareFinder → `/book` deep-linking, per-interest pre-select, both forms, mega-menus/keyboard, and every CTA to the real Zocdoc profile. **No H or M functional defects found.** Only minor/cosmetic items and one coverage gap below.

## What was verified GREEN (evidence)
- **Internal links / 404s:** All 25 unique internal links discovered across the site return **200**, including the new 4 service pages, footer `/areas` + all 8 area detail slugs, `/oradell`, `/fort-lee`, legal pages, `/dashboard`, `/sitemap.xml`. No broken hrefs.
- **"Contact" nav → `/oradell`:** Confirmed exact-match link `href="/oradell"` and it navigates there. (`src/components/site/header.tsx:182`)
- **Images:** All load. Doctor headshots (`dr-mina-han/team-meyer/team-mundanchira/team-ogoke.png`), Ogoke photo, `fort-lee.jpeg`, `office-oradell.jpeg`, the real logo (`/riverdell-logo.png`) and favicon/`icon.png` all return 200 with non-zero natural dimensions. (An initial crawl "broken image" flag was a lazy-load false positive, disproven by scroll re-check.)
- **CareFinder flow (all 7 branches):** who → concern → recommendation is correct for every path (child+vision→Myopia, adult+vision→Comprehensive/Medical, child+reading→Vision Therapy, adult+reading→Neuro-Optometric Rehab, dry→Dry Eye, contacts→Specialty & Scleral, family+routine→Comprehensive Family Exam). "Request this consult" deep-links to `/book?interest=…` and **every deep-link pre-selects the matching option** in the consult form.
- **/book pre-select:** All 8 interest values pre-select correctly; unknown values fall back cleanly to the first option. (`src/app/(marketing)/book/page.tsx`, `consult-form.tsx`)
- **Forms:** Consult form validates required fields and reaches the success screen; waitlist form enforces the consent checkbox (blocks submit + toast) then succeeds. Both post to `/api/lead` and `/api/waitlist` (zero-PHI, 422 on missing fields).
- **Mega-menus:** Care and Practice dropdowns open, `aria-expanded` toggles, featured booking card renders, **Escape closes** the menu, all item links + the featured "Request an appointment" card navigate correctly. Mobile sheet (390px) opens and shows nav links.
- **Zocdoc CTAs:** Hero booking card, "Book on Zocdoc" buttons, and the Zocdoc review stat all point to the real profile `https://www.zocdoc.com/practice/riverdell-vision-30098` with `target="_blank" rel="noopener noreferrer"`.
- **Security headers (`curl -I`, checked on `/`, `/book`, `/myopia-management`, `/areas`, `/dashboard`):** `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `x-frame-options: SAMEORIGIN`, `permissions-policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`, plus Vercel-added `strict-transport-security` (HSTS preload). AVIF negotiation confirmed (`Accept: image/avif` returns `content-type: image/avif`).
- **Console/hydration:** Clean (zero errors/warnings/pageerrors) on the homepage, all 7 service pages, `/about`, `/reviews`, `/oradell`, `/fort-lee`, `/areas`, an area detail page, and `/dashboard`. No hydration mismatches.
- **Head/SEO:** Canonical, full OG + Twitter card, favicon.ico + icon.png (both 200), dynamic `/opengraph-image`. Data integrity clean: review counts (448 Google / 396 Zocdoc / 4.9) and phone `(201) 265-7900` are consistent across every literal and `REVIEW_STATS`.
- **Dashboard demo gate:** Accepts any credentials (email + password), then renders dashboard content. Console clean.

## Findings (prioritized)

### 1. `/focus` returns a hard 404  -  LOW impact
- **What:** `GET /focus` returns **404** with a console error (`Failed to load resource: 404`). It's the leftover "Into Focus" lens-demo spike (commit `49b48b8`) that was never wired into the router.
- **Why it matters:** Not linked anywhere in the live nav/footer/sitemap, so real users won't hit it. Only reachable if someone has an old direct link/bookmark. It does not affect any live flow.
- **Impact:** L · **Effort:** L (either ship the page or leave it; if a public link to it was ever shared, add a redirect).
- **Where:** route `/focus` (no `src/app/(marketing)/focus/` page exists). Repro: `curl -I https://riverdell-vision.vercel.app/focus`.

### 2. No Content-Security-Policy header  -  LOW (hardening, not a regression)
- **What:** `next.config.ts` sets X-Content-Type-Options, Referrer-Policy, X-Frame-Options, and Permissions-Policy, but no `Content-Security-Policy`.
- **Why it matters:** Not claimed in the brief and not a defect, but CSP is the one common header missing from an otherwise complete security posture. Low priority for a marketing site with no user-generated content.
- **Impact:** L · **Effort:** M (needs a nonce/hash strategy for Next inline scripts to avoid breakage).
- **Where:** `next.config.ts:11-25`.

### 3. Coverage gap: WebKit/Safari not tested  -  informational
- **What:** The brief asked to test WebKit/Safari "if available." The cached Playwright install (`~/Library/Caches/ms-playwright`) contains **only Chromium 1228**  -  no `webkit-*` binary. All results above are Chromium-only.
- **Impact:** L (informational) · **Effort:** L to close (`npx playwright install webkit`, then re-run).
- **Note:** Chromium coverage was exhaustive; nothing observed suggests Safari-specific risk (standard Next.js/Tailwind, no exotic CSS/JS APIs).

## Bottom line
No high- or medium-severity functional or integrity defects. The recent changes (blue palette, real logo/favicon, Contact→/oradell, 4 new service pages, CareFinder qualifier, `/book` pre-select, security headers, AVIF) are all working as intended on the live deployment. The only cleanup worth doing is removing/redirecting the orphaned `/focus` route; CSP and Safari testing are optional hardening/coverage items.

---

