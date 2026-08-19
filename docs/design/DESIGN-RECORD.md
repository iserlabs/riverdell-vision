# Design record

Last updated: 2026-08-19. Authoritative for this repo. Where this and a general rule
disagree, this wins and the difference is stated in one line.

## Direction

**OPEN. Gate 1 has not closed.** Three candidates are rendered and live for Dr. Han to
pick from: A · The Chart, B · The Record, C · The Refinement. Board:
`public/choose/index.html` -> https://riverdell-directions.vercel.app/choose/index.html

Anchored to: the practice's own instruments and paperwork, not to a reference site. The
acuity chart on the exam room wall (A), the Rx written in ruled columns (B), the refraction
itself (C).

Mode: brand and marketing. Register: a settled, well-made base with exactly one deliberate
departure, because trust is the conversion here and this audience does not reward a trend.

## Principles for this project

1) Conventional in structure, distinctive in surface. The three directions differ on
typography, composition, density, imagery and pacing. None of them moves the navigation or
changes how the page is read.
2) Size and rule carry hierarchy. No bordered card is a primary container anywhere. The
current build has 67 of them, 56 differing from the page ground by nothing but a hairline.
3) Boldness is spent once, in the hero, and the page runs quiet and legible below it. The
visitor is a worried parent comparing three practices at ten at night, not a design audience.
4) Every claim on the page is one the practice can evidence, including the schema.
5) Nothing is invented. No figure, credential, testimonial or star average is written that
does not exist in the source.

## Typography

Display: Newsreader, weight 400 to 500, **optical sizing axis ON** (`font-optical-sizing:
auto`). Currently shipped with the axis stripped, so every heading is a 16pt letterform
scaled up. That is a defect, not a style.
Text: Instrument Sans, 15 to 17px, 1.55 line height. Replaces Hanken Grotesk.
Meta/mono: Geist Mono, margin labels and figures only. One size, one tracking, tokenised.
Scale: per direction. A uses five steps at a 1.5 ratio (20/30/45/68/102 desktop, three steps
at 390). B uses four text-led steps (15/17/28/56). C caps display at 100px.
Measure: 68ch in A, column-bound in B.
Eyebrow: Geist Mono, 10 to 11px, 0.18em to 0.2em tracking. **Cap: three per page.** The
audit measured eyebrow saturation as the single most-flagged template tell across the estate.

## Palette

Ground `--bone` oklch(0.945 0.008 244). Ink `--ink` oklch(0.240 0.030 258).
Primary `--teal` oklch(0.500 0.150 254), the practice's own logo blue.
Deep `--teal-deep` oklch(0.330 0.110 258). Line `--line` oklch(0.880 0.015 246).
Warm accents: `--clay` oklch(0.520 0.150 40) on light, `--brass` oklch(0.740 0.105 72)
reserved for dark grounds.

**Ground depth is a decision, not a default.** The current ground sits 1.07:1 under a card,
a 3% lightness step, which is why every card needs a border to exist. The ground drops to
1.16:1 so paper reads as paper without a hairline.

Deliberately absent: no black bars, no gradient meshes, no tinted band used as a substitute
for hierarchy.

## Composition

Layout families in use: full-measure ruled row (A), two-column record (B), labelled pair
(C), full-measure roster, full-bleed image band. **A card is not a layout family here.**

Every hero is `min-height: 100dvh` minus the in-flow header, with a max-height ladder at
620/460. Proven across 13 geometries including landscape phone. The current build fails 26
of 28 geometry checks and overshoots the fold by 531px at 390 wide.

## Imagery

Source: the practice's own photographs. `office-oradell.jpeg` (461KB) and `hero-care.jpeg`
(563KB) are the two hero candidates. **Both are LCP budget items, not free choices**: capped
width, modern format, priority load, measured LCP against a 2.5s "good" threshold.

Crop rules: A uses office-oradell at `object-position: 50% 42%` so the frame wall survives
the 390 crop. C uses hero-care at `52% 38%`, patient left, phoropter right, headline in the
gap between. **The headline never crosses a face at any geometry**, and C's crop is re-checked
at all 13 because its hero is the most fragile in the set.

The four doctor portraits are 340 to 480px real resolution. They never render above 96px.

**Photographs of people are real or they are absent.** No generated person, ever. Generated
rooms and atmosphere are permitted and must never be captioned or positioned so a visitor
would take them for this practice's own work.

## Motion

Character: still, with at most one moment.

Signature: **the refraction snap**, a hairline drawing from the margin out to full measure
over ~900ms once on arrival, on the same beat as a lens dropping into the phoropter. First
visit only, never on back navigation, instant and already drawn under reduced motion.

**Deliberately not animated: the headline.** See rulings.

Deliberately not animated: everything else. The current build ships 83 identical fade-up
reveals, which is the opposite of a signature.

## Rejected directions

Nothing rejected yet at direction level. Rejected *within* the set, 2026-08-16: the mocked
availability calendar in the hero (a calendar panel that looks like it shows appointment
times with none behind it), and the problem-first nav relabel (Jake overruled; the clinical
service names stay).

## Approvals

- 2026-08-16, Jake: scope patient-facing only, hero is a real full-bleed photo, palette
  commits to the logo blue, Newsreader stays with `opsz` on, body sans moves to Instrument
  Sans, signature is the refraction snap, nav keeps clinical service names and adds "Common
  questions" and "What it costs", Zocdoc leads as the single primary, three new pages
  (children's eye exams, Korean-language care, your first visit).
- 2026-08-19, Jake: revise the existing board in place at the same URL rather than start the
  option set over; test the real response time rather than ask for it; publish a real
  starting price; render both hero subjects, one per direction, instead of arguing it.
- **Gate 1 (Dr. Han picks A, B or C): OPEN.**

## Exceptions and rulings

**R1. The snap comes off the headline.** The approved signature originally resolved the
headline from soft to sharp. First impressions are formed in roughly 50ms and prototypicality
is judged inside 17ms, so a headline that is unreadable at paint spends the only moment that
matters. The snap now lives on the hairline and the figures. Applies to all three directions,
including C, where it was the whole motion vocabulary.

**R2. The hero photograph stays the practice's own room in A, and becomes a patient moment
in C.** The general rule says a hero shows the customer's world rather than the company's.
For a practice being chosen against a retail optical, the room is part of what is being
bought, so the rule is not applied blindly. Jake ruled 2026-08-19 to render both and decide
from the rendering.

**R3. Zocdoc's 4.9 leads the proof block, not Google's 5.0.** Purchase likelihood peaks
between 4.2 and 4.5 stars and declines toward 5.0, and 82% of shoppers actively look for
negative reviews, so a flawless average reads as curated. Both scores stay, both are real,
and the more credible one is set first. Never round a star average up.

**R4. Reviews carry dates and the component degrades honestly.** 74% of consumers weight
reviews from the last three months and 32% want them from the last two weeks. The 95 stored
reviews in `src/lib/reviews.ts` currently have no date field. Recency now outranks volume,
so the component must hold a date, show the true average, and still work on the day the
newest item is six months old. **Review cadence is a deliverable, not the client's problem.**

**R5. A real link goes out to the Google and Zocdoc profiles, beside the scores.** Visitors
trust an external source more than company-sponsored content regardless of design quality. A
logo in the footer does not count: anything in the footer scores zero on prominence.

**R6. Address and phone survive on a phone.** The utility strip carrying the address, the
rating and the phone number is `hidden ... md:block`, so all three vanish below 768px. On the
Stanford credibility scale a physical address scores +1.67 and a phone number +1.56, the two
highest controllables after prior usefulness, and they are currently invisible to the exact
visitor in the brief. The mobile CTA bar already carries a `tel:` link once the visitor
scrolls past 60% of the viewport; the hero must carry the address and the number too.

**R7. A real starting price appears without a click.** `cost-and-insurance` currently states
outright that no price is quoted sight unseen, and there is not one dollar figure anywhere in
the repo. Transparent pricing has been the top unmet buyer request four years running, and
NN/g finds that hiding it reads as evasive. Jake ruled 2026-08-19: publish one honest
starting figure for the most common case. **The figure itself is still open and must come
from Dr. Han. It is rendered on the board as a visible blank so he fills it in.**

**R8. The request form is fixed by field type, not field count.** It carries 10 dropdowns
against 5 text inputs. Dropdowns and textareas are what actually depress completion; single
line text fields cost almost nothing, and the famous "fewer fields wins" rule rests on a
study of 10 conversions against 26. Convert dropdowns to text or radio where the answer is
short, explain any ask that looks intrusive, and never require an account.

**R9. No AI chat widget, no AI video presenter, no countdown, no hero carousel.** Each is
refused on evidence, not taste. Disclosing a bot before a sales conversation cut purchase
rate by over 79.7% in a 6,255-subject field study, and *Moffatt v. Air Canada* settled that a
bot's statements are the business's statements. `hero-slideshow.tsx` exists in the repo and
auto-advances on a 5.2s interval; it is not on the homepage and must not reach one.

**R10. Direction C got weaker under the evidence, and the board says so.** Visual complexity
and prototypicality are separate judgments and prototypicality carries the larger effect
(partial η² .81 against .58). They interact, so an unfamiliar layout cannot buy itself back
with restraint. Appeal falls off a cliff at high complexity, more so for audiences over 45.
C is not removed, because it is genuinely the most memorable and Dr. Han may want it, but its
"worth knowing" note now states the cost plainly rather than selling it evenly.

## The one thing this design cannot fix

Between a five-minute and a thirty-minute reply the odds of qualifying a lead fall about 21x,
the average company takes 42 hours, and 23% never reply at all. Operators overstate their own
speed by roughly 15x, so the number has to be measured rather than asked for. **Until the
response path is timed, every conversion claim about this site is capped by an unknown.**
The test is written up at `docs/design/RESPONSE-TEST.md` and needs Dr. Han's or Jake's hands.

Never print a response promise the practice has not agreed to keep. An unkept "we reply
within the hour" is worse than silence.
