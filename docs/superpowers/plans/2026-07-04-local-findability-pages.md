# Local Findability Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Ship 15 curated local landing pages (10 town + 5 service-plus-town) with a real-geo uniqueness engine, honest service-matched reviews, and per-page local schema, gated by an owner geo-facts approval.

**Architecture:** Pure data-driven expansion of the existing `/areas/[slug]` system. Extend the `Area` type, add a `localAreaSchema` builder, render the new fields in the area page component, then add 15 `AREAS` entries. No visual redesign.

**Tech Stack:** Next.js 16, TypeScript, Vitest, existing site primitives.

**Source spec:** `docs/superpowers/specs/2026-07-04-local-findability-pages-design.md`

## Global Constraints

- Next.js 16: read `node_modules/next/dist/docs/` before using unfamiliar Next APIs (per `AGENTS.md`).
- `pnpm` only. No em dash (U+2014) anywhere. Client repo: human-voiced commits, no AI trailers.
- Honesty: no invented patient stories or local claims. Geo facts are drafted, then owner-approved before publish. Reviews are service-matched, never labeled "from <town>".
- One `AREAS` entry equals one statically generated page; `sitemap.ts` and `generateStaticParams` already iterate `AREAS`.

## Per-town assignment table (locked)

Lead service on each town page is chosen to complement, not duplicate, its companion service-plus-town page. `dir`/`route` are draft geo facts pending owner approval (Task 4).

| Slug | Type | Town | leadService | Draft geo (verify) |
|---|---|---|---|---|
| `eye-doctor-hackensack-nj` | town | Hackensack | medical-eye-care | ~10 min SW via Hackensack Ave / River St |
| `eye-doctor-new-milford-nj` | town | New Milford | myopia-management | ~6 min S along Kinderkamack Rd |
| `eye-doctor-maywood-nj` | town | Maywood | medical-eye-care | ~10 min SW via Essex St |
| `eye-doctor-bergenfield-nj` | town | Bergenfield | dry-eye-treatment | ~10 min SE via New Bridge Rd |
| `eye-doctor-dumont-nj` | town | Dumont | medical-eye-care | ~8 min E via New Milford Ave |
| `eye-doctor-westwood-nj` | town | Westwood | myopia-management | ~8 min N along Kinderkamack Rd |
| `optometrist-ridgewood-nj` | town | Ridgewood | medical-eye-care | ~15 min W via Paramus / Century Rd |
| `eye-doctor-englewood-nj` | town | Englewood | dry-eye-treatment | ~15 min SE via Route 4 |
| `eye-doctor-tenafly-nj` | town | Tenafly | specialty-contact-lenses | ~15 min E via County Rd |
| `eye-doctor-closter-nj` | town | Closter | dry-eye-treatment | ~15 min NE via Closter Dock Rd |
| `myopia-management-ridgewood-nj` | service+town | Ridgewood | (serviceSlug: myopia-management) | ~15 min W via Paramus / Century Rd |
| `myopia-management-tenafly-nj` | service+town | Tenafly | (serviceSlug: myopia-management) | ~15 min E via County Rd |
| `myopia-management-closter-nj` | service+town | Closter | (serviceSlug: myopia-management) | ~15 min NE via Closter Dock Rd |
| `scleral-lenses-hackensack-nj` | service+town | Hackensack | (serviceSlug: specialty-contact-lenses) | ~10 min SW via Hackensack Ave |
| `scleral-lenses-englewood-nj` | service+town | Englewood | (serviceSlug: specialty-contact-lenses) | ~15 min SE via Route 4 |

---

### Task 1: Extend the Area type and add the local schema builder

**Files:**
- Modify: `src/lib/areas.ts` (the `Area` type)
- Modify: `src/lib/schema.ts` (add `localAreaSchema`)
- Test: `src/lib/schema.test.ts` (existing file; add cases)

**Interfaces:**
- Produces: `localAreaSchema({ town, slug, serviceName, serviceSlug })` returns a `Service` JSON-LD object scoped to the town, provider `@id` = practice.

- [ ] **Step 1:** Add fields to `Area` in `src/lib/areas.ts`:

```ts
  leadService?: string;   // service slug a town page emphasizes
  route?: string;         // real, owner-approved drive route + time
  landmarks?: string[];   // real cross-streets / landmarks
  ownerNote?: string;     // verbatim owner sentence
  reviewService?: string; // service slug for review filtering (defaults to serviceSlug)
```

- [ ] **Step 2: Write failing test** in `src/lib/schema.test.ts`:

```ts
import { localAreaSchema } from "./schema";

describe("localAreaSchema", () => {
  it("builds a town-scoped Service referencing the practice", () => {
    const s = localAreaSchema({
      town: "Ridgewood",
      slug: "optometrist-ridgewood-nj",
      serviceName: "Medical eye care",
      serviceSlug: "medical-eye-care",
    });
    expect(s["@type"]).toBe("Service");
    expect(s.name).toContain("Ridgewood");
    expect(s.areaServed).toEqual({ "@type": "City", name: "Ridgewood" });
    expect(s.provider).toHaveProperty("@id");
  });
});
```

- [ ] **Step 3: Run test, verify fail:** `pnpm vitest run src/lib/schema.test.ts` (fails: `localAreaSchema` undefined).

- [ ] **Step 4:** Implement in `src/lib/schema.ts`:

```ts
export function localAreaSchema(input: {
  town: string;
  slug: string;
  serviceName: string;
  serviceSlug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${input.serviceName} in ${input.town}, NJ`,
    url: `${SITE_URL}/areas/${input.slug}`,
    serviceType: input.serviceName,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: input.town },
  };
}
```

- [ ] **Step 5: Run test, verify pass.** `pnpm vitest run src/lib/schema.test.ts`
- [ ] **Step 6: Commit.** `git add src/lib/areas.ts src/lib/schema.ts src/lib/schema.test.ts && git commit -m "feat(seo): Area geo fields + localAreaSchema builder"`

---

### Task 2: Render the new fields in the area page

**Files:**
- Modify: `src/app/(marketing)/areas/[slug]/page.tsx`

**Interfaces:**
- Consumes: `localAreaSchema` (Task 1), `getService` from `@/lib/services`, `reviewsForSlug` from `@/lib/reviews`.

- [ ] **Step 1:** In the page component, resolve the primary service (`area.serviceSlug ?? area.leadService`), get its name via `getService`, and add `localAreaSchema` to the `JsonLd` data array alongside the breadcrumb.
- [ ] **Step 2:** Render a route/landmarks block when `area.route` is present (reuse the existing `MapPin` + bordered card pattern already in the file for `area.distance`).
- [ ] **Step 3:** Render `area.ownerNote` verbatim in a quote block when present.
- [ ] **Step 4:** For service-plus-town pages (`area.serviceSlug`), replace the generic `ReviewsGrid limit={3}` with service-matched reviews via `reviewsForSlug(area.reviewService ?? area.serviceSlug)` (cap at 3). Town pages keep the generic grid.
- [ ] **Step 5:** `pnpm build` and confirm the existing `/areas/optometrist-oradell-nj` still renders (no regression on entries without the new fields).
- [ ] **Step 6: Commit.** `git commit -am "feat(seo): render geo facts, owner note, service-matched reviews, local schema on area pages"`

---

### Task 3: Add the 15 AREAS entries

**Files:**
- Modify: `src/lib/areas.ts` (append 15 entries to `AREAS`)

- [ ] **Step 1:** Add all 15 entries per the assignment table, each with a unique `h1`, `metaTitle`, `metaDescription`, `intro`, `angle`, `keywords`, `leadService` (or `serviceSlug` for service-plus-town), `route`, and `landmarks`. Copy follows the existing entries' voice; every claim is truthful; no two entries share verbatim body copy.
- [ ] **Step 2: Uniqueness check.** Run a script asserting no duplicate `intro` or `angle` strings across `AREAS`:

```bash
node -e "const {AREAS}=require('./src/lib/areas.ts'); const i=AREAS.map(a=>a.intro); const g=AREAS.map(a=>a.angle); const dup=a=>a.length!==new Set(a).size; if(dup(i)||dup(g)){console.error('DUP');process.exit(1)} console.log('unique:',AREAS.length)"
```

(If `require` of a `.ts` fails in the runtime, use the equivalent vitest assertion in `src/lib/areas.test.ts` instead.)

- [ ] **Step 3:** `pnpm build` and confirm all 15 new `/areas/<slug>` routes are generated (grep the build output).
- [ ] **Step 4: Commit.** `git commit -am "feat(seo): 10 town + 5 service-plus-town local landing pages"`

---

### Task 4: Owner geo-facts review doc

**Files:**
- Create: `docs/geo-facts-review.md`

- [ ] **Step 1:** Generate a review doc listing, per town: the `route`, drive time, and `landmarks` used, with a checkbox for the owner to approve or correct each. State clearly that these are drafts and no page is considered published until approved and the domain is live.
- [ ] **Step 2: Commit.** `git commit -am "docs: geo-facts review sheet for owner approval"`

---

### Task 5: Verify and finalize

- [ ] **Step 1:** `pnpm test && pnpm lint && pnpm build` all green.
- [ ] **Step 2:** Start the prod server on a free port and verify a sample: each new slug returns 200, has a unique title, and its HTML contains a `"@type":"Service"` block with the town name.

```bash
PORT=3211 pnpm start & sleep 4
for u in optometrist-ridgewood-nj eye-doctor-hackensack-nj myopia-management-tenafly-nj scleral-lenses-englewood-nj; do
  echo "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3211/areas/$u)  $u"
done
curl -s http://localhost:3211/areas/optometrist-ridgewood-nj | grep -o '"areaServed":{"@type":"City","name":"Ridgewood"}'
lsof -nP -iTCP:3211 -sTCP:LISTEN -t | xargs -r kill
```

Expected: all 200, the Ridgewood Service schema present.

- [ ] **Step 3:** Confirm `curl .../sitemap.xml` includes the 15 new slugs.

## Self-Review

**Spec coverage:** taxonomy + data-driven (Task 1/2/3); priority build list (Task 3 table); uniqueness engine geo/emphasis/reviews/schema (Task 1/2/3); local schema (Task 1); anti-doorway uniqueness check (Task 3 Step 2); owner approval gate (Task 4); verification (Task 5). All covered.

**Placeholder scan:** No TBD. Copy prose is generated at build time following the locked table and honesty rules; the table fixes every structural decision.

**Type consistency:** `localAreaSchema` signature `{ town, slug, serviceName, serviceSlug }` is defined in Task 1 and consumed in Task 2. `Area` fields defined in Task 1 are consumed in Task 2 and populated in Task 3.
