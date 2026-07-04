# Local findability page architecture: design

**Date:** 2026-07-04
**Status:** Approved design, ready for implementation plan
**Workstream:** W1a (local pages). First of the findability content system. Depends on the W0 domain cutover to actually rank.

## Goal

Expand and harden the data-driven local landing-page system so Riverdell Vision ranks for
town-level and service-plus-town queries across Bergen County, without thin or doorway pages,
using only honest, verifiable content.

## Current state

- 8 pages under `/areas/[slug]` from `AREAS` in `src/lib/areas.ts`: 4 town pages (Oradell, River
  Edge, Paramus, Emerson) and 4 service-in-Bergen-County pages (myopia management, dry eye, scleral
  and specialty lenses, pediatric).
- Page: `src/app/(marketing)/areas/[slug]/page.tsx` with `generateStaticParams` + `generateMetadata`.
- Area pages currently carry only `BreadcrumbList` schema. The reviews shown are generic
  (`ReviewsGrid limit={3}`) and the service ladder is identical across towns, which is the
  audit's thin-content / doorway risk.
- `localBusinessSchema` lists 10 cities in `areaServed`; 6 of them have no page (Hackensack, New
  Milford, Maywood, Bergenfield, Dumont, Westwood).
- Reviews (`src/lib/reviews.ts`) are tagged by service (`ServiceId`), not by location. Totals:
  448 Google (5.0), 396 Zocdoc (4.91).

## Decisions (locked with owner)

- **Curated, intent-led** page matrix, never programmatic service-by-every-town.
- **Town set:** the 6 schema-gap towns plus 4 premium towns (Ridgewood, Englewood, Tenafly,
  Closter). Fort Lee stays on the existing `/fort-lee` office page.
- **Uniqueness engine:** real geo facts (owner-approved) + distinct lead service per town + honest
  service-matched reviews + optional owner note + per-page local schema.
- **Reviews correction:** town-tagged reviews are not supported by the data and will not be faked.
  Service-plus-town pages show real reviews matched to that service, never labeled as being from
  the town.
- **Anti-doorway governance bar** gates every page.

## Page taxonomy

- **Town pages:** `/areas/<slug>`, slug `eye-doctor-<town>-nj` or `optometrist-<town>-nj` (matches
  the existing pattern).
- **Service-plus-town pages:** `/areas/<service>-<town>-nj`.
- Both remain single entries in `AREAS`; one entry equals one statically generated, schema-marked
  page. `sitemap.ts` and `generateStaticParams` already iterate `AREAS`, so new entries ship in the
  sitemap automatically.

## Priority build list

### New town pages (10)

Schema-gap towns:
- `eye-doctor-hackensack-nj`
- `eye-doctor-new-milford-nj`
- `eye-doctor-maywood-nj`
- `eye-doctor-bergenfield-nj`
- `eye-doctor-dumont-nj`
- `eye-doctor-westwood-nj`

Premium towns:
- `optometrist-ridgewood-nj`
- `eye-doctor-englewood-nj`
- `eye-doctor-tenafly-nj`
- `eye-doctor-closter-nj`

### New service-plus-town pages (first batch, 5)

- `myopia-management-ridgewood-nj`
- `myopia-management-tenafly-nj`
- `myopia-management-closter-nj`
- `scleral-lenses-hackensack-nj`
- `scleral-lenses-englewood-nj`

Governance: expand this batch only after Search Console shows real impressions and demand for the
pattern. No speculative mass generation.

## Uniqueness engine (per-page requirements, all honest)

Every page must include:

1. **Real geo context.** True distance and drive route from the town to 297 Kinderkamack Rd,
   Oradell, an approximate drive time, and one or two real cross-streets or landmarks. Drafted by
   the implementer from map data, then owner-approved before publish. Stored in `Area.route` and
   `Area.landmarks`.
2. **Distinct lead service.** `Area.leadService` (a service slug) sets the page's primary emphasis,
   H1 framing, and which service block leads, chosen from that town's real local search intent.
3. **Honest reviews.** Town pages keep the curated `ReviewsGrid`. Service-plus-town pages show
   reviews matched to the page's service via `reviewsForSlug(serviceSlug)`. Reviews are never
   labeled as coming from the town.
4. **Optional owner note.** `Area.ownerNote` (verbatim) rendered when present.
5. **Local schema.** Each page renders a new `localAreaSchema(area)` block that references the
   practice `@id` with `areaServed` set to the town (a `Service` or `MedicalProcedure` for
   service-plus-town pages, a `LocalBusiness` reference for town pages), in addition to the existing
   breadcrumb.

**Anti-doorway bar.** A page does not ship unless it has (1) unique geo context, (2) a distinct lead
service or service focus, (3) at least 3 relevant real reviews available, and (4) local schema.
Boilerplate-only pages are prohibited.

## Data model changes

Extend the `Area` type in `src/lib/areas.ts`:

- `leadService?: string` (service slug a town page emphasizes)
- `route?: string` (real, owner-approved drive route and time)
- `landmarks?: string[]` (real cross-streets or landmarks)
- `ownerNote?: string` (verbatim owner sentence)
- `reviewService?: string` (service slug for review filtering on service-plus-town pages; defaults
  to `serviceSlug`)

`serviceSlug` stays for service-plus-town pages. `AREAS` remains the single source of truth.

## Component changes

- `src/app/(marketing)/areas/[slug]/page.tsx`: render the lead-service emphasis, the route and
  landmarks block, the owner note when present, service-matched reviews on service-plus-town pages,
  and `localAreaSchema`. Reuse the existing `Container`, `Section`, `Reveal`, `CtaBand`,
  `KeepExploring` primitives. This is content architecture, not a visual redesign.
- `src/lib/schema.ts`: add a `localAreaSchema(area)` builder.

## Content sourcing and honesty

- Geo facts are drafted by the implementer from map data, then batched into a single review doc
  (one row per town: route, drive time, landmarks) for the owner to approve or correct before any
  page publishes.
- No invented patient stories and no invented local claims. Copy uses real practice facts plus the
  owner's approved specifics.
- The lead-service choice per town is a documented search-intent judgment, recorded per `AREAS`
  entry, and the owner may override it.

## Verification

- Each new `/areas/<slug>` returns 200 with a unique H1, title, and meta description.
- Valid JSON-LD on each page (`localAreaSchema` + breadcrumb), checked in the served HTML.
- e2e a11y and mobile gates pass on a sample of the new pages.
- `sitemap.xml` includes every new slug.
- Uniqueness spot-check: no two pages share intro or body copy verbatim; each has distinct geo facts
  and lead service.
- Owner approves the geo-facts review doc before publish.

## Out of scope (later workstreams)

- W1b AEO deepening (per-page FAQ schema, `llms-full.txt`, entity clarity).
- W1c reviews and E-E-A-T (doctor authority, medical-reviewer bylines, review amplification).
- W0 domain cutover, a prerequisite for these pages to rank, has its own spec.

## Owner inputs needed

1. Approve the per-town geo-facts review doc (route, drive time, landmarks).
2. Optional: a true one-line note per town.
3. Confirm or override the lead-service choice per town.
