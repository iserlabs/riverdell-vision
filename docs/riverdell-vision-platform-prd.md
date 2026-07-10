# Riverdell Vision Platform: PRD and Technical Analysis

**Purpose in one line:** Define the demand-to-booked-care platform IserLabs proposes to build around Riverdell Vision's existing EHR (Eyefinity Encompass), precisely enough that a skeptical technical reviewer can validate the architecture, and honestly enough that the HIPAA analysis survives scrutiny.

| | |
|---|---|
| Status | Draft v1 |
| Date | 2026-07 |
| Author | Jake (IserLabs), product/design lead |
| Primary reviewer | Kevin (IserLabs), technical/infrastructure lead |
| Distribution | Internal (IserLabs) + shared with the client on request. No pricing detail in this document; the commercial model is tracked separately. |

## How to use this document (note to the architecture reviewer)

Kevin: this document exists so you can do two things without needing me in the room:

1. **Architecture review.** Sections 8 (Eyefinity integration), 9 (HIPAA), and 10 (architecture direction) contain every constraint I know of. Section 13 lists the specific questions I want your judgment on. Where I state a fact I could not independently verify, it is marked **VERIFY** inline and repeated in Section 12.
2. **System design.** Sections 6-7 (scope and functional requirements) plus Section 10 give you the workload shape. I have deliberately NOT designed the system; Section 10.5 lists the decisions that are yours. Everything grounded in working code cites a repo path so you can read the prototype directly.

Your skepticism about HIPAA is warranted and this document does not argue against it. Section 9's position is: **we are a HIPAA Business Associate the moment this platform touches patient data, there is no clever exemption, and the design question is footprint minimization, not avoidance.** If any part of Section 9 reads as hand-waving, flag it; that section failing your review is the document failing.

---

## 1. Executive summary

Riverdell Vision is a physician-led family optometry practice in Oradell, NJ (founded 2016, four credentialed optometrists, strong specialty mix: myopia management, dry eye, specialty contact lenses, vision therapy). They are opening a second office in Fort Lee (prototype copy says "Opening 2027"; **VERIFY** timeline with the practice) and plausibly expanding to several clinics over the coming decade. They currently pay Roya roughly $500/month for a templated marketing site with light SEO, and they want out.

Their practice-management/EHR system is **Eyefinity Encompass**. It is the clinical system of record and it stays. It is also, by the owner's own account, dated, and it was never built to do the things that grow a practice: capture and work inbound demand, run follow-up with accountability, reactivate patients who are due for care, or show an owner (or a lender) what is actually happening in the business.

**The product is the layer Eyefinity was never built to be:** a demand-to-booked-care platform that wraps around Eyefinity. It captures leads, runs service-line pipelines with first-response accountability, reactivates due patients (recall), attributes marketing spend, reports to the owner and to lenders, and eventually gives patients a modern portal. Eyefinity keeps custody of the clinical record; we are the growth and operations layer on top, connected through the federally mandated FHIR read API that Eyefinity already exposes (and that the practice's existing reporting tool, EDGEPro, already consumes, proving the pipe works in this specific practice).

**The build is sequenced by risk.** Phases 1-2 (marketing site + findability, investor/lender data room) carry zero PHI, are mostly built as working prototypes today, replace Roya immediately, and serve the Fort Lee financing now. Phase 3 (internal ops/CRM) is the first phase that stands up HIPAA-compliant infrastructure and is the revenue engine. Phase 4 (patient portal) is the heaviest lift: real FHIR integration plus a family/proxy account model. Phase 5 (Eyefinity write-back) is gated on Eyefinity's Certified Partner program and is priced and decided separately. We ship value and get paid on the safe phases while doing the HIPAA homework properly for the regulated ones.

**What this document is not:** a system design. That is the output we are asking for (Section 13).

## 2. Client and business context

### 2.1 The practice

- **Riverdell Vision**, 297 Kinderkamack Rd, Suite 200, Oradell, NJ 07649. Founded 2016.
- Physician-led family optometry. Four optometrists: Dr. Mina Han, OD (myopia management, dry eye, specialty lenses; sees patients in Korean); Dr. Bruce Meyer, FCOVD (vision therapy, neuro-optometric rehabilitation); Dr. Amy Mundanchira, OD (pediatric/comprehensive); Dr. Chizoba Heather Ogoke, OD (comprehensive). (Source: `src/lib/site.ts`, confirmed against the practice's public materials during the site build.)
- The Han family runs the practice and they are close family friends of Jake's. Primary contact to date has been Dr. Dan Han. **OPEN QUESTION:** confirm the exact principals and decision-makers (Dan Han vs Mina Han vs both; who signs the engagement and the BAA). The prototype's public-facing content names Dr. Mina Han as the clinical lead, which matches their public materials.
- Reputation is genuinely strong: prototype code carries a 5.0 rating across 448 Google reviews plus a Zocdoc rating (source: `src/lib/reviews.ts`; **VERIFY** counts at launch, they move).
- Booking today runs through **Zocdoc** (practice ID in `src/lib/site.ts`); scheduling of record lives in Eyefinity.
- Reporting today: **EDGEPro (GPN)**, a third-party analytics product that already ingests their Eyefinity data.

### 2.2 Why they are motivated (in the owner's words, paraphrased)

Concerns:

1. **HIPAA.** Feels "trapped in HIPAA hell"; believes every compliant tool is ancient and clunky. He is not wrong about the market; he is wrong that it has to be that way.
2. **Lock-in.** Felt trapped by Roya and by Eyefinity's dated interface. Wants to OWN his stack, not rent it.
3. **Control.** Asked whether he can make site changes himself, whether there is version control, and how much the AI "hallucinates." He wants to feel safe touching his own website. (Addressed in Section 7.7.)
4. **The Eyefinity integration.** Asked whether we can read AND write to Eyefinity, what it costs, and whether the "certified partner" list gates API access. (Answered precisely in Section 8: read is open by federal law; write is gated and priced separately.)
5. **Worth it, for both sides.** He wants the switch to make economic sense and he genuinely wants IserLabs paid fairly. (Commercial model tracked separately; high level in Section 11.4.)

Hopes:

1. Modern tools his team actually wants to open.
2. Real findability: first on Google and in AI answers for "eye doctor near Oradell."
3. Streamlined, automated day-to-day operations.
4. Something that supports the Fort Lee expansion and looks credible to lenders and investors.
5. Working with close friends he trusts.

### 2.3 The expansion thesis (why this matters strategically)

Fort Lee is not a second copy of the website; it is the reason the ops layer exists. A practice going from one office to two (and possibly several over a decade) crosses the line where the owner can no longer hold the business in his head. Every module in Phase 3 is multi-location by design (per-office pipelines, a Fort Lee pre-opening waitlist pipeline that exists in the prototype today, owner reporting that a lender can read). If the expansion happens, the platform is the operating system it runs on. If IserLabs builds this well, it is also a repeatable product shape for other private medical practices, which is why we are willing to invest beyond what a single-practice engagement would normally justify.

## 3. Users and personas

| Persona | Who | What they need from the platform | Phases |
|---|---|---|---|
| **Prospective patient / parent** | Bergen County families, notably parents researching myopia care for children; significant Korean-speaking community in Fort Lee/Palisades Park | Find the practice in Google and AI answers, understand specialty services, book without friction (Zocdoc), get a fast human response to an inquiry | 1, 3 |
| **Patient / guardian** | Existing patients; the guardian archetype is a parent managing children's care and possibly a grandparent's | See appointments, records, Rx, myopia progress; message the team; pay bills; one login for the household | 4 |
| **Front desk / staff** | Small team (prototype personas: "Maria (Front desk)", "Priya (Tech)") | A queue that tells them exactly who to contact today, with scripts; nothing slips; no new-system dread | 3 |
| **Doctors** | The four ODs | See their pipeline (e.g. myopia consults awaiting a decision), minimal admin, no double data entry into a second system | 3, 4 |
| **Owner** | Dan/Mina Han | The business at a glance: demand by service line, conversion, pipeline value, marketing attribution; confidence the team followed up; ability to safely change the site | 1-5 |
| **Lenders / investors** | Fort Lee financing counterparties | A credible, honest expansion brief; verified operating record vs clearly labeled illustrative figures; diligence docs under NDA | 2 |
| **IserLabs (operator)** | Jake + Kevin | Maintainable stack, bounded liability, reuse of existing IserLabs infrastructure patterns | all |

## 4. Product scope

### 4.1 The thesis: demand to booked care

Every dollar of practice growth follows one path: someone searches or is referred, they inquire, someone follows up, they book, they show up, they convert to a care program, and later they come due again. Today that path runs through a templated Roya site, a Zocdoc listing, a phone, and human memory. Eyefinity records the outcome but does nothing to cause it. The platform owns the entire path up to the exam chair and the reactivation loop after it:

```
Search / AI answer / referral
  -> Marketing site (Phase 1: findability, honest content, Zocdoc booking)
    -> Lead capture (Phase 3: pipelines by service line, SLA on first response)
      -> Booked in Eyefinity (link/manual now, write-back in Phase 5)
        -> Care delivered (Eyefinity, unchanged, system of record)
          -> Recall/reactivation (Phase 3, fed by Eyefinity FHIR read)
            -> Portal relationship (Phase 4)
Owner + lender reporting reads across all of it (Phases 2-3)
```

### 4.2 What "wraps around Eyefinity" means

Eyefinity Encompass remains the clinical system of record: charts, exams, scheduling of record, billing of record. We do not replicate it, migrate it, or compete with it. We read from it (Section 8) to know who is due and what happened, and we handle everything it ignores: demand capture, follow-up discipline, reactivation, attribution, reporting, and patient experience. This is also the honest answer to the owner's lock-in fear: his clinical data never becomes hostage to us because we never become its custodian.

### 4.3 In scope

- Marketing website, SEO/AEO/GEO engineering, Google Business Profile alignment, Zocdoc booking entry points (Phase 1).
- Password-gated investor/lender expansion brief with a verified-vs-illustrative content discipline (Phase 2).
- Internal ops platform: lead capture, service-line pipelines, tasks with SLAs and scripts, recall/reactivation engine, marketing attribution, owner/lender reporting (Phase 3).
- Patient portal: appointments and reminders, records including retinal images and myopia progress, prescriptions and reorders, secure messaging, billing visibility, family/proxy accounts (Phase 4).
- Eyefinity FHIR read integration (Phase 3-4) and, later and separately, write-back (Phase 5).

### 4.4 Out of scope (explicitly)

- Replacing Eyefinity, or any EHR/PM functionality: charting, coding, claims, eligibility, e-prescribing.
- Clinical decision support or anything diagnostic. The platform never interprets clinical data; it displays and routes it.
- Payment processing in early phases (billing is display + link out; a payments integration is a later decision).
- Marketing automation to purchased lists, review gating, or any growth tactic that misrepresents. The site's content discipline (real reviews, no invented claims, honest schema) is a hard rule, already enforced in the prototype (`src/lib/answers.ts` header comment states the grounding policy).
- Multi-tenant productization. Build for Riverdell first; keep the door open, do not pay the abstraction tax now.

## 5. Current state: what actually exists

All three product surfaces exist as working prototypes in this repo, deployed on Vercel. **They are visual/interactive renderings, not functional systems**: the ops dashboard runs on seeded demo data plus localStorage (deliberately, so the demo needs no backend and no BAA), and the portal is an explicitly labeled concept tour.

| Surface | Deployed | Code | State |
|---|---|---|---|
| Marketing site | riverdell-vision.vercel.app | `src/app/(marketing)/**` | Near-shippable. Full service/condition/area pages, answers hub, JSON-LD, sitemap, security headers, rate limiting, tested libs |
| Ops dashboard | /dashboard | `src/app/dashboard/**`, `src/lib/leads.ts`, `src/lib/demo-store.ts` | Interactive demo. Real UX, demo persistence only |
| Data room | /growth/data-room (password: riverdell) | `src/app/(marketing)/growth/**` | Working gate + content structure; NDA docs not yet loaded |
| Patient portal | /portal | `src/app/(marketing)/portal/page.tsx`, `src/components/marketing/portal-tour.tsx` | Concept tour only, labeled "launching soon", noindex |

The prototype quality matters for one strategic reason: the owner's stated fear is that HIPAA-compliant software must be ancient and clunky. The prototypes are the counterexample he can click.

## 6. Functional requirements by phase

Requirement IDs: `P<phase>-<n>`. Priority: M (must), S (should), L (later).

### 6.1 Phase 1: Marketing website + findability (no PHI)

Grounded in the built site. Key engineering already in place: centralized practice config as single source of truth for NAP consistency (`src/lib/site.ts`), JSON-LD builders emitting a `MedicalClinic`/`LocalBusiness` graph with providers, service offer catalog, areas served, languages, and hours (`src/lib/schema.ts`), a curated AEO answers hub where every answer is grounded in facts established elsewhere on the site (`src/lib/answers.ts`), per-service and per-condition deep pages (myopia management, ortho-k, dry eye, MGD, keratoconus, specialty contact lenses, vision therapy, neuro-optometric rehabilitation, medical eye care), local area pages (Oradell, Fort Lee, surrounding towns), reviews, cost-and-insurance, accessibility page, sitemap, security headers and rate limiting with unit tests (`src/lib/headers.ts`, `src/lib/ratelimit.ts`, `*.test.ts`).

| ID | Requirement | Pri |
|---|---|---|
| P1-1 | Replace the Roya site at riverdellvision.com: full content parity or better, 301 map from old URLs, zero broken inbound links | M |
| P1-2 | Local findability: consistent NAP everywhere, JSON-LD graph as built, Google Business Profile reconciled to the same data, per-area pages | M |
| P1-3 | AEO/GEO: the /answers hub and question-shaped content maintained as the quotable surface for AI answer engines; content grounded only in verifiable practice facts | M |
| P1-4 | Booking: Zocdoc as the booking path. Prefer link-out/new-tab over iframe embed so no scheduling data transits our origin (see 9.4); booking CTAs on every service page | M |
| P1-5 | Appointment-request form: contact + routing fields only (name, email, phone, service interest, insurance, preferences), zod-validated (`src/lib/validate-lead.ts`), rate-limited, relayed to the office inbox via Resend with no server-side storage (`src/lib/notify.ts`). No free-text symptom fields. See 9.4 for the compliance treatment of this form | M |
| P1-6 | Fort Lee pre-opening page + waitlist interest capture (same form discipline) | M |
| P1-7 | Owner-visible content workflow: repo on GitHub, preview deploy per change, human review before production (Section 7.7) | M |
| P1-8 | Analytics without a consent-hostile stack: privacy-respecting, cookieless-first analytics; no ad pixels on health pages without explicit compliance review (health-site ad tracking is an active regulatory hazard; see 9.4) | S |

### 6.2 Phase 2: Investor/lender data room (no PHI)

Grounded in the built `/growth` + `/growth/data-room` pages: a password gate (`ExpansionGate`), a "Verified" vs "Illustrative" labeling discipline enforced in the UI (verified operating record: founded 2016, review counts, clinical team, specialty programs, Fort Lee status; illustrative unit economics explicitly marked "Directional, for structure only. Not Riverdell actuals."), a market narrative (Palisades communities, Korean-American community fit with Dr. Han's bilingual care), a diligence checklist (trailing P&L, business tax returns, patient volume/retention/payer mix, inquiry-to-booking pipeline data, Fort Lee lease terms and site plan, equipment and build-out quotes), and contact paths. Noindexed.

| ID | Requirement | Pri |
|---|---|---|
| P2-1 | Keep the verified-vs-illustrative discipline as a hard content rule: nothing unverified ever carries a "Verified" badge | M |
| P2-2 | Upgrade access control from the shared demo password to per-recipient access (unique links or credentials) with access logging, so the owner knows who viewed what | S |
| P2-3 | Diligence document delivery under NDA: decision needed on hosting actual financial docs (business confidential, NOT PHI) vs continuing to share them out-of-band; if hosted, private storage + signed URLs + audit trail | S |
| P2-4 | Owner-facing snapshot (`/dashboard/growth` in the prototype: demand by service line, funnel, trend, plan) becomes the lender-reporting surface once Phase 3 produces real data | S |

Business financials are confidential but are not PHI; Phase 2 stays on the non-PHI infrastructure. Aggregate business metrics derived from patient data (counts, no identifiers) are de-identified only if they meet the HIPAA de-identification standard; small-cell counts can re-identify. Phase 3 reporting must aggregate with that in mind (Section 9.5).

### 6.3 Phase 3: Internal ops platform / practice CRM (first PHI phase)

The revenue engine, and the first phase on HIPAA-eligible infrastructure. Grounded in the working dashboard prototype:

- **Overview** (`src/app/dashboard/page.tsx`): KPIs (new today, follow-ups due, open high-value, pipeline value, win rate), a "follow-ups due" queue with one-tap completion, a "needs attention" list (new + high-urgency, initials avatar, service/source/value), demand by service line.
- **Pipelines** (`src/app/dashboard/pipeline/page.tsx`): kanban per service line with stage advancement. Five pipelines defined with real stage models (`src/lib/leads.ts`): high-value inquiries (7 stages, new inquiry through converted), myopia management (parent inquiry through enrolled), dry eye (symptom inquiry through maintenance), specialty lenses (inquiry through success, including records-requested and diagnostic-fitting stages), Fort Lee waitlist.
- **Leads** (`src/app/dashboard/leads/**`): list + detail, assignment, tasks with due dates and typed actions (call/email/text/review), and pre-written call scripts on tasks (the prototype ships real scripts, e.g. the myopia parent callback script).
- **Growth snapshot** (`src/app/dashboard/growth/page.tsx`): trend, funnel (inquiries -> contacted -> booked -> converted), demand by service line, marked "Confidential, for owners & lenders."
- **Live capture loop** (`src/lib/demo-store.ts`): a public-site form submission appears instantly in the dashboard with an auto-created first-contact task ("assign an owner and make first contact within 1 business day"), auto-routed to a pipeline by service interest.

Production requirements:

| ID | Requirement | Pri |
|---|---|---|
| P3-1 | Real multi-user backend replacing the demo store: leads, pipelines, stages, tasks, assignments, activity history, with per-user authentication and roles (owner, staff; least privilege) | M |
| P3-2 | First-response SLA engine: every new lead gets an owner and a first-contact task; overdue tasks escalate visibly (the accountability layer is the point, not the kanban) | M |
| P3-3 | Service-line pipelines as prototyped, editable stage models, per-office segmentation (Oradell, Fort Lee) | M |
| P3-4 | **Recall/reactivation engine:** ingest "due for care" from Eyefinity (FHIR read; exact data path is a Kevin design question, Section 13), generate work queues of named due patients, track contact attempts and outcomes. This is unambiguously PHI at rest (Section 9.3) | M |
| P3-5 | Marketing attribution: source on every lead (website form, Zocdoc, phone, Google, referral, as modeled in the prototype), simple channel reporting; no ad-platform pixel backhaul of PHI | M |
| P3-6 | Owner/lender reporting: the growth snapshot backed by real data; exportable monthly summary; aggregates built to the de-identification standard when leaving the PHI boundary | M |
| P3-7 | Communications from the platform (email/SMS to leads and patients): every channel provider must sign a BAA or the message content must be constrained to no-PHI (Section 9.6); TCPA-compliant consent for SMS | M |
| P3-8 | Audit logging on all access to patient-identifying records (who viewed/changed what, when); immutable, reviewable | M |
| P3-9 | Estimated-value and win-rate math as prototyped (`computeKpis` in `src/lib/leads.ts`), recomputed from live data, clearly labeled as estimates | S |
| P3-10 | Shape and stack mirror Xenia Ops Hub (an existing IserLabs production app: Next.js + Drizzle + Neon Postgres + Clerk, 600+ Playwright tests) for maximum reuse of patterns, auth flows, and test discipline, SUBJECT TO the HIPAA eligibility of each component (Section 9.7, and Kevin's call) | S |

### 6.4 Phase 4: Patient portal (heaviest phase)

Grounded in the concept tour (`src/components/marketing/portal-tour.tsx`), which promises seven modules; the marketing page (`/portal`) is already live, noindexed, and labeled "launching soon":

| Module (as prototyped) | Production behavior |
|---|---|
| Dashboard | Family-level summary, quick actions (reorder, message, pay) |
| Appointments & reminders | Upcoming/past visits for the household, rebook path, recall reminders |
| Records & results | Exam results, retinal images, and the signature feature: a child's myopia progression charted visit over visit (the tour renders an axial-length-vs-untreated-projection chart) |
| Prescriptions & reorders | Current glasses/CL Rx, reorder flow, refill status |
| Secure messaging | Patient-to-care-team threads |
| Billing & insurance | Statements, balances, plans on file (display + link out; no payment processing initially) |
| Family | One login for the household: guardian manages children and elders |

| ID | Requirement | Pri |
|---|---|---|
| P4-1 | Patient identity + auth on BAA-covered infrastructure; MFA available; session handling to healthcare norms | M |
| P4-2 | Eyefinity data via SMART on FHIR patient-authorized read (Section 8.3); render live, persist minimally (the thin-interface principle, Section 9.3) | M |
| P4-3 | Family/proxy model: guardian accounts managing minors and dependent adults; **minor consent + revocation at 18** (and note NJ minor-consent nuances for specific service types are a compliance-review item); proxy access is auditable and revocable | M |
| P4-4 | Myopia progress module: requires longitudinal storage or repeatable retrieval of measurements over time; the persist-vs-refetch decision is an explicit design question (Section 13) | M |
| P4-5 | Secure messaging: PHI at rest by definition; encrypted, audited, retention policy defined with the practice | M |
| P4-6 | Reorders and booking requests flow into Phase 3 queues (staff execute in Eyefinity until Phase 5 write-back) | M |
| P4-7 | Reuses the infra, auth, audit, and BAA chain stood up in Phase 3 | M |

### 6.5 Phase 5: Eyefinity write-back (later, gated, separately priced)

Auto-create appointments and push selected data into Eyefinity via the Certified Partner program (Section 8.4). Requires an approved partnership and a negotiated business agreement with unpublished cost. Not scoped further here; treated as a distinct line item with its own go/no-go decision once Phases 3-4 prove value.

## 7. Non-functional requirements

### 7.1 Security (all phases)

- TLS everywhere; HSTS and the hardened header set already implemented and tested in the prototype (`src/lib/headers.ts`, `headers.test.ts`); CSP maintained.
- Rate limiting on all public write endpoints (exists: `src/lib/ratelimit.ts` + tests).
- Input validation at every boundary (exists for leads: zod schema, `validate-lead.ts`).
- Secrets in managed stores only, never in the repo; least-privilege API keys; documented rotation.
- Dependency and framework patching cadence; Vercel/hosting platform advisories tracked.

### 7.2 HIPAA / compliance

Section 9 is the normative spec. Summary NFRs: signed BAA with the practice before any PHI phase ships; every subcontractor in the PHI path under BAA; encryption at rest and in transit; unique user identification, RBAC, and MFA on PHI surfaces; audit logging with retention; documented Security Risk Analysis before Phase 3 go-live; breach-notification procedure documented; annual review.

### 7.3 Performance / Core Web Vitals

- Marketing site: green Core Web Vitals on mobile (LCP < 2.5s, INP < 200ms, CLS < 0.1) as a launch gate; findability is the product and CWV is a ranking input.
- Ops dashboard: interactions (task complete, stage move) under 200ms perceived; the prototype's optimistic-update feel is the bar.
- Portal: first meaningful render under 3s on mid-tier mobile; FHIR-backed views show skeletons, never blank waits; graceful degradation when Eyefinity is slow or down (cached-with-timestamp vs live indicator).

### 7.4 SEO / AEO / GEO

- Preserve the built architecture: single-source NAP, JSON-LD graph, answers hub, per-service and per-area pages, sitemap, honest schema only (no fake aggregateRating; the prototype's schema discipline is documented in code comments and is a hard rule).
- Migration to riverdellvision.com with 301 integrity and Search Console verification at cutover.
- AI-answer-engine surface (AEO/GEO): question-shaped, quotable, grounded answers; keep `/answers` canonical and current.

### 7.5 Accessibility

- WCAG 2.2 AA on all patient-facing surfaces (marketing + portal). The prototype already carries decent a11y hygiene (aria labels on the tour and gates, semantic structure); portal must be screen-reader-usable end to end. A practice serving seniors and children treats this as a functional requirement, not a checkbox.

### 7.6 Availability / operability

- Marketing site: effectively static, CDN-served; target 99.9%+.
- Ops platform: business-hours-critical; target 99.9% with graceful read-only degradation; RPO <= 24h and RTO <= 4h initially (Kevin to validate against infra choice); tested backups.
- Portal: patient-facing but not emergency infrastructure; explicit "call the office" fallback everywhere.
- Eyefinity/FHIR outage never takes down our surfaces; degraded modes defined per view.

### 7.7 The owner's control requirement ("can I touch it without breaking it?")

This is a first-class NFR because it is a stated adoption blocker. The answer we ship:

- **Version control as safety net:** the site lives on GitHub; every change is a commit; anything is revertible in minutes. Nothing the owner does can destroy work.
- **Preview-first workflow:** every change (his, ours, or AI-assisted) deploys to a preview URL before production. He sees exactly what will ship, on his phone, before it ships.
- **Human review gate:** production deploys only from reviewed pull requests. AI-generated changes go through the same gate; nothing an AI writes reaches the live site unreviewed. That is the honest answer to "how much does it hallucinate": the workflow assumes fallibility (human and AI alike) and catches it before production, rather than promising it away.
- **Structured content where it counts:** practice facts (hours, insurers, providers, services) live in typed config (`src/lib/site.ts` et al.), so routine edits are data edits with validation, not layout surgery.
- **Escape hatch (anti-lock-in):** standard Next.js + React on his own GitHub org, deployable on any commodity host. If IserLabs disappears, any competent developer can take over. This is the structural opposite of the Roya arrangement, and we should put it in the contract.

### 7.8 Maintainability

- TypeScript strict; tested libraries for anything with correctness weight (the prototype already unit-tests headers, schema builders, redirects, rate limiting, lead validation).
- Phase 3 inherits the Xenia Ops Hub test discipline (Playwright end-to-end suites) where the stack survives Kevin's HIPAA review.
- Two-person bus factor: no bespoke infrastructure that only one of us can operate; boring technology wherever the requirement allows.

## 8. Eyefinity integration specification

The single most misunderstood part of this project, and the owner asked about it directly. There are **two lanes with completely different rules**, and conflating them is how vendors scare practices into paralysis.

### 8.1 Lane 1: READ (open by federal law)

- The 21st Century Cures Act and the ONC certification program require certified EHRs to expose a standardized **FHIR R4 API** for patient and population data access, and the information-blocking rules prohibit vendors from obstructing access, including by imposing prohibitive fees for patient-data access.
- Eyefinity shipped this in **Encompass EHR 7.0 (December 2022)**, on by default. The published vendor process: a third-party developer requests access, Eyefinity verifies the requester (roughly **10 business days**), and provides API documentation. **No fee** for this lane. (**VERIFY** on engagement: current process, any registration portal changes since our research, and the exact FHIR resource coverage in their published capability statement.)
- **Proof it works in this exact practice:** EDGEPro (GPN) already ingests Riverdell's Eyefinity data continuously for reporting. The read/bulk pipe is not theoretical; it is running in their building today. (**VERIFY** which mechanism EDGEPro actually uses, FHIR bulk vs a proprietary extract, because it shapes what we can assume about data freshness and completeness.)

### 8.2 What READ gives us (and its limits)

Expected via the Cures Act API surface (at minimum, the USCDI data classes): patient demographics, appointments/encounters, problems, medications, results, and clinical notes classes as certified. What we need per feature:

| Feature | Data needed | Read-lane sufficient? |
|---|---|---|
| Recall/reactivation | Patient roster, last-exam/encounter dates, contact info | Yes (**VERIFY** recall-date semantics: derive from encounters vs an exposed recall field) |
| Owner reporting | Encounter volumes, patient counts | Yes |
| Portal: appointments view | Appointment resources | Yes for read (**VERIFY** appointment resource availability in their FHIR surface; scheduling data is not a USCDI-guaranteed class) |
| Portal: records/results/Rx | Clinical resources, DocumentReference | Yes (**VERIFY** retinal-image availability; imaging may not be exposed via FHIR) |
| Portal: myopia progression | Longitudinal refraction/axial-length observations | Partially (**VERIFY** whether axial length/refraction land as FHIR Observations or only inside notes/PDFs; this determines whether the chart is parsed, structured, or staff-entered) |
| Booking write-back | Appointment create | **No: write lane** |

**The strategic conclusion the owner should hear plainly: everything in Phases 3 and 4 that creates value runs on read access alone. Eyefinity's partner-program gatekeeping cannot block the core build.**

### 8.3 Patient-facing read: SMART on FHIR

For the portal, the patient (or guardian) authorizes our app against Eyefinity's patient-access API using the standard **SMART on FHIR** authorization flow (OAuth 2.0 profiled for health data). Cures Act certification (the (g)(10) criterion) mandates SMART on FHIR support for patient access in certified EHRs, so Eyefinity should support it. **VERIFY early, in writing:** that Encompass supports the standalone patient-launch SMART flow for third-party apps, its token lifetimes/refresh behavior (this materially affects portal UX), and how proxy/guardian authorization is represented. This is a Phase 4 gating fact and one of the first discovery items.

### 8.4 Lane 2: WRITE (gated, negotiated, later)

Writing into Eyefinity (auto-creating appointments, pushing documents or outcomes to the chart) goes through **Eyefinity's Certified Partner program**: an application, approval, and a negotiated business agreement with **unpublished cost**. The Cures Act mandates read access; it does not mandate third-party write. Treatment:

- Write-back is **Phase 5**, a separately priced, separately decided line item.
- Until then, the portal and CRM generate structured work items (booking requests, reorders) that staff execute in Eyefinity, which is exactly what the front desk does today with phone requests, minus the lost sticky notes.
- **VERIFY** (low-cost, early): request the Certified Partner program terms and typical timeline now, so the Phase 5 decision is made with real numbers instead of assumptions.

### 8.5 EDGEPro coexistence

EDGEPro stays; it is the practice's financial/operational analytics on Eyefinity data and we should not rebuild it. Our reporting is demand-side (inquiries, conversion, attribution, recall yield), which EDGEPro does not see at all. Where both report the same number (e.g. completed exams), EDGEPro/Eyefinity is authoritative and our dashboards should reconcile to it.

## 9. HIPAA and compliance analysis (the centerpiece)

Written to be attacked. Kevin: if you find the load-bearing flaw, that is this section working as intended.

### 9.1 The honest headline: we are a HIPAA system

The moment this platform **receives, stores, or transmits** protected health information on the practice's behalf, IserLabs is a **HIPAA Business Associate** (45 CFR 160.103). PHI is individually identifiable health information held or transmitted by a covered entity or its business associate. The bar is low and the combination is what matters: **a patient's name plus the fact that they are due for an eye exam is PHI.** A recall queue is PHI. A secure-messaging thread is PHI. A myopia chart is PHI.

Consequences, none optional:

1. A signed **BAA between IserLabs and the practice** before any PHI phase goes live.
2. The **Security Rule** applies to all ePHI we handle, including transiently: administrative, physical, and technical safeguards, a documented Security Risk Analysis, workforce policies (yes, for a two-person shop), and breach-notification obligations with direct liability for BAs.
3. Every downstream vendor that touches PHI for us signs a **subcontractor BAA** (9.6).

**What we will not claim:** the "conduit exception." It covers entities that merely transport data without accessing it (ISPs, the postal service). An application that reads, renders, routes, or stores patient data is categorically not a conduit. Any architecture pitch resting on conduit status should be treated as a red flag, including from us.

### 9.2 The design lever: PHI at rest vs PHI in transit/display

Both of the following are HIPAA-regulated. They differ enormously in surface area, cost, and liability:

| | Thin interface (transit/display) | Data store (PHI at rest) |
|---|---|---|
| Pattern | Patient/staff authorizes read from Eyefinity (SMART on FHIR); we fetch, render live, persist as little as possible; actions push work items rather than keeping clinical copies | We hold our own durable copy of patient data in our database |
| Custody | Stays with Eyefinity | Ours |
| Breach surface | Sessions, caches, logs, tokens | The entire database, forever, plus backups |
| Obligations | Still full BA: BAA, Security Rule, risk analysis, audit of access | All of that plus at-rest encryption/key management on a growing corpus, per-record audit, retention/disposal policy, DR for PHI, amendment/accounting duties in practice |
| Cost/liability | Materially lower | The expensive tier |

Neither escapes HIPAA. The thin-interface posture is a **minimization strategy, not an exemption**, and this document must never be quoted as claiming otherwise.

### 9.3 Where we unavoidably hold PHI at rest (and accept it)

Anything that must **remember patient-specific state between sessions** is PHI at rest on our side:

- The **recall/reactivation pipeline**: named patients due for care, contact attempts, outcomes. (The highest-ROI feature in the product.)
- **Secure messaging** threads.
- **Myopia progression** charted over time, if measurements are persisted rather than refetched (open design question, Section 13).
- **Follow-up tasks and notes tied to a named patient.**

These are exactly the high-value ops features, so the honest strategy is **minimize and contain**, not avoid:

- Store the minimum fields the feature needs (minimum-necessary as a schema-design principle, not a policy afterthought).
- Keep clinical detail in Eyefinity and reference it; store workflow state, not charts. The prototype already models this instinct: `src/lib/leads.ts` captures routing and workflow fields, never symptoms or clinical detail, by design.
- One PHI datastore, one boundary, full audit logging inside it, rather than PHI leaking across many services.
- Defined retention and disposal from day one.

### 9.4 The gray zones, stated plainly (Kevin should pressure-test these)

- **Phase 1 lead form.** A prospective patient submitting their own contact info plus a service interest ("myopia consult for my daughter") through the practice's website sits in a genuinely gray zone: pre-patient, self-submitted marketing inquiries are arguably not PHI held for a covered entity, but "arguably" is not a compliance posture, and the service-interest field is health-adjacent on its face. Current prototype behavior is the defensible minimal version: constrained fields, an explicit no-free-text-symptoms rule, no server-side storage, transient email relay to the office inbox (`src/lib/notify.ts` even prints "no medical information is collected in web forms" in the email footer). **Our recommendation, and the position this PRD takes: treat lead data as PHI-equivalent from Phase 3 onward** (it lands in the CRM on HIPAA infrastructure anyway) and put the Phase 1-interim form flow (Resend relay, office inbox) in front of the compliance reviewer as an explicit question rather than deciding it ourselves. If the reviewer says the relay needs to be inside the BAA boundary sooner, the fix is small and known.
- **Zocdoc booking.** Zocdoc handles PHI as the practice's own vendor under the practice's existing arrangement with Zocdoc. Our job is to keep it that way: link out (or embed such that scheduling data flows browser-to-Zocdoc, never through our origin). **VERIFY** the embed mechanics before using anything beyond a plain link.
- **Analytics and pixels.** Regulators have been explicit that ad-tech trackers on health pages can transmit regulated data. No ad pixels or session-recording tools on any page where a user expresses a health interest, without named compliance review. Privacy-respecting aggregate analytics only.
- **Aggregate reporting leaving the PHI boundary** (owner/lender reports): must meet the de-identification standard; beware small cells ("1 keratoconus patient in Leonia converted" is identifiable in a town that size).

### 9.5 PHI exposure by phase

| Phase | Surface | PHI received? | PHI at rest (ours)? | Infra class | Gate before go-live |
|---|---|---|---|---|---|
| 1 | Marketing site + form relay | Gray zone (lead contact + service interest, transient relay) | No | Vercel (non-PHI) | Compliance reviewer signs off on the form-relay posture |
| 2 | Data room | No (business financials only) | No | Vercel (non-PHI) | NDA process; access control upgrade (P2-2) |
| 3 | Ops platform / CRM + recall | **Yes** (leads treated as PHI-equivalent; recall data is unambiguous PHI from the EHR) | **Yes** (workflow state, recall queue, contact history) | HIPAA-eligible, BAA-covered | Signed practice BAA; SRA done; subcontractor BAAs in hand; audit logging live |
| 4 | Patient portal | **Yes** (clinical data rendered; messaging) | **Yes, minimized** (messages, proxy model, possibly myopia series; clinical bulk stays in Eyefinity) | Same boundary as Phase 3 | SMART-on-FHIR verification (8.3); proxy/minor-consent design reviewed |
| 5 | Write-back | Yes (transit into Eyefinity) | No new classes expected | Same boundary | Certified Partner agreement |

### 9.6 The BAA chain

Every arrow that carries PHI needs paper:

```
Riverdell Vision (Covered Entity)
  └─ BAA ─> IserLabs (Business Associate)
       ├─ subcontractor BAA ─> cloud/host for PHI workloads (AWS/GCP HIPAA-eligible, or a healthcare PaaS)
       ├─ subcontractor BAA ─> database provider (if managed)
       ├─ subcontractor BAA ─> auth provider (if it sees PHI or identifies patients; a patient IdP does)
       ├─ subcontractor BAA ─> email/SMS provider for any patient-content messaging
       └─ subcontractor BAA ─> error tracking / logging / backups if PHI can reach them (or scrub by design)
```

Notes: Eyefinity needs no BAA **with us** (it is the practice's own BA; our API access rides the practice's relationship, **VERIFY** how Eyefinity papers third-party API access on their side). Vendors that never touch PHI (the marketing site's hosting, Resend for no-PHI notifications if the reviewer approves that posture) stay outside the chain, and keeping them outside is the point of the split architecture.

### 9.7 Infrastructure reality (affirming the skepticism)

- **You cannot run PHI workloads on vanilla Vercel.** Vercel does not sign BAAs on standard plans (**VERIFY** current enterprise posture, but plan on "no"). The marketing site and the data room (no PHI) stay on Vercel, where the DX is excellent and appropriate. Everything PHI moves to HIPAA-eligible infrastructure under BAA: AWS or GCP HIPAA-eligible services, or a healthcare PaaS (Aptible; Render's healthcare tier; **VERIFY** current offerings) if we decide the compliance ergonomics beat raw cloud.
- Component candidates from the Xenia stack need individual HIPAA verification before reuse: **Neon** (managed Postgres: HIPAA availability and BAA terms, **VERIFY** plan tier), **Clerk** (auth: BAA availability, **VERIFY**; separately, whether a patient-facing IdP should be the same system as staff auth at all), Drizzle/Next.js themselves are fine (libraries, not services).
- Required regardless of vendor: encryption at rest and in transit, access controls and MFA, unique user IDs, audit logging, tested backups/DR, documented risk analysis, logging pipelines that cannot leak PHI into non-covered tools.
- **Engage a HIPAA-savvy advisor before building Phase 3.** A short specialist review of the SRA, the BAA chain, the gray-zone calls in 9.4, and the proxy/minor-consent design is cheap insurance against re-architecture. We do not stumble through this. Budget line exists in the commercial model (tracked separately).
- **Cyber-liability insurance** for IserLabs with breach coverage before Phase 3 go-live (open item, Section 12).

### 9.8 The pitch to the owner, honestly stated

What we tell Dan, and can defend: "You are right that most HIPAA-compliant tooling is dated, but HIPAA doesn't make software ugly; underinvestment does. The compliant version of this platform looks exactly like the demo you clicked. What HIPAA actually costs is discipline underneath: a contract (BAA), compliant hosting for the parts that touch patient data, audit trails, and a design that keeps your clinical records in Eyefinity where they already live. We are not going to tell you we found a loophole. We are going to tell you we minimized the regulated surface and built the regulated part properly."

## 10. Architecture direction (not a design; that is the review's output)

### 10.1 Current stack (as built)

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4, deployed on Vercel. Zocdoc booking, Resend for form-relay email. Unit tests on the correctness-bearing libs. Prototype dashboard state is client-side only (`src/lib/demo-store.ts`, localStorage) by design.

### 10.2 Proposed macro split: two planes

- **Non-PHI plane (stays on Vercel):** marketing site, answers hub, data room, portal marketing shell. Static/edge-friendly, SEO-critical, no BAA needed. This plane is essentially done.
- **PHI plane (HIPAA-eligible infra under BAA):** ops platform, recall engine, portal application, FHIR integration layer, PHI datastore, audit log. One boundary, one datastore, one place where the Security Rule bites.
- The seam: the public form posts across the boundary into the PHI plane's intake endpoint (from Phase 3 on); the portal lives on its own subdomain on the PHI plane; nothing on the Vercel plane ever holds patient data.

### 10.3 Candidate components (candidates, not decisions)

| Concern | Candidates | Note |
|---|---|---|
| PHI compute/host | AWS (ECS/Fargate or similar), GCP equivalents, Aptible, Render healthcare tier | Trade compliance ergonomics vs cost vs our ops load; Kevin's call |
| PHI database | Postgres: RDS/Cloud SQL, Neon if HIPAA-eligible (**VERIFY**), Supabase HIPAA add-on (**VERIFY**; the prototype's code comment names "Supabase + BAA" as the V2 sketch, treat as a candidate only) | Single PHI store; Drizzle ORM reusable across all candidates |
| Staff auth | Clerk if BAA available (**VERIFY**), else Auth0 HIPAA tier, AWS Cognito, or self-hosted | Staff auth reuse from Xenia is the hope, not the requirement |
| Patient auth | Same shortlist, harsher lens (patient IdP = PHI by existence of the account), plus the SMART-on-FHIR authorization flow for EHR data | Possibly distinct from staff auth |
| FHIR integration | Thin internal service wrapping Eyefinity FHIR: token handling, caching policy, normalization | The custody boundary lives here; deserves isolation |
| Messaging (email/SMS) | Providers with BAAs (e.g. Twilio with BAA, **VERIFY** current terms) vs constraining content to no-PHI ("you have a new message" + login) | Content-constraint pattern is proven and cheap |
| Audit log | Append-only table with restricted write path vs dedicated store | In-datastore is likely fine at this scale |
| Secrets | Platform-native (SSM/Secrets Manager or PaaS equivalent) | Documented rotation |
| Error tracking/logs | Scrub-by-design, or a provider that signs a BAA | Easy to get wrong; design it, don't hope |

### 10.4 Data flows in words

1. **Lead capture (Phase 3):** visitor submits the site form -> POST to PHI-plane intake -> validated, stored as lead, auto-routed to a pipeline, first-contact task created with SLA timer -> staff notified (no-PHI notification) -> all subsequent workflow inside the PHI plane. (Exactly the prototype loop in `demo-store.ts`, with the real backend behind it.)
2. **Recall (Phase 3):** scheduled job reads encounters/rosters from Eyefinity FHIR -> computes due-for-care -> writes minimal recall records (patient ref, due basis, contact state) -> staff work the queue; attempts and outcomes logged -> booked patients booked in Eyefinity by staff; our record closes.
3. **Portal read (Phase 4):** patient authenticates -> SMART-on-FHIR authorization against Eyefinity -> our FHIR service fetches with the patient-scoped token -> rendered live; caching policy (if any) is a Kevin decision with compliance stakes -> messaging and reorder actions persist on our side (PHI at rest, minimized); everything auditable.
4. **Reporting (Phases 2-3):** aggregation runs inside the PHI plane -> outputs de-identified aggregates only -> non-PHI plane renders owner/lender views.

### 10.5 Decisions explicitly deferred to Kevin

1. PHI hosting choice (raw cloud vs healthcare PaaS) and the resulting ops model for a two-person team.
2. Database and auth vendor selection after BAA verification (including whether patient and staff identity share a system).
3. The FHIR integration layer's shape: sync cadence vs on-demand, caching and token custody, failure modes when Eyefinity is down.
4. **The thin-interface feasibility check:** is render-live-persist-nothing actually viable for the portal given Eyefinity's real FHIR latency, token lifetimes, and resource coverage, or do we accept a bounded at-rest cache? (The myopia chart is the forcing case.)
5. Persist-vs-refetch for recall computation: do we store derived due-dates only, or a rolling minimal roster mirror?
6. Audit-log implementation and retention mechanics.
7. Network topology, environments (the PHI plane needs a real staging story), IaC, and backup/DR design to meet 7.6.
8. Cost model for the PHI plane at this practice's scale (thousands of patients, tens of staff users), and how it scales to 2+ offices.

## 11. Roadmap and phasing

### 11.1 The risk-sequencing logic

Non-PHI phases ship first, deliberately: they deliver visible value (Roya replaced, financing supported) and revenue while the HIPAA groundwork (BAA, SRA, advisor review, infra selection, Eyefinity API verification) proceeds in parallel, so the regulated phases start on verified facts instead of assumptions. Each phase de-risks the next: Phase 1 proves delivery and findability; Phase 2 proves credibility to lenders; Phase 3 stands up the compliance boundary and proves operational value with staff; Phase 4 rides on infrastructure and trust already in production; Phase 5 is optional automation on a proven system.

### 11.2 Phase table

| Phase | Deliverable | PHI | Depends on | Definition of done |
|---|---|---|---|---|
| 1 | Marketing site + findability, live on riverdellvision.com | None (form gray zone reviewed) | Domain/DNS access, GBP access, content sign-off | Roya cancelled; CWV green; 301s verified; GBP reconciled |
| 2 | Data room serving Fort Lee financing | None | P2 access-control decision, NDA process | Lender-ready brief with real diligence flow |
| 3 | Ops platform + recall engine on HIPAA infra | Yes | Practice BAA; SRA; advisor review; Eyefinity read access verified; infra chosen (Kevin) | Staff live on it daily; recall queue producing booked appointments; audit logging on |
| 4 | Patient portal | Yes | Phase 3 infra; SMART-on-FHIR verification (8.3); proxy/consent design review | Family accounts live; portal reads real Eyefinity data; messaging operational |
| 5 | Eyefinity write-back | Yes (transit) | Certified Partner agreement (cost/timeline unknown) | Portal booking creates Eyefinity appointments |

Dates intentionally omitted: Phase 1 is near-term (mostly built); Phases 3-4 are gated on verification work, not calendar ambition.

### 11.3 Parallel track (starts now, costs little)

1. Request Eyefinity third-party FHIR API access (the ~10-business-day verification) and their docs.
2. Ask Eyefinity in writing about SMART-on-FHIR patient-launch support (8.3) and Certified Partner terms (8.4).
3. Confirm principals; get the BAA template and NDA process drafted.
4. Shortlist and price the HIPAA advisor review.
5. BAA-availability check on every candidate vendor in 10.3 (a spreadsheet, one afternoon).

### 11.4 Commercial model (high level only, by design)

Website at a family rate that still beats Roya on value by a wide margin; PHI phases priced as real regulated-software work reflecting the liability IserLabs carries as a Business Associate; write-back priced only when Eyefinity's numbers are known. Detailed pricing is tracked separately and is not part of this document.

## 12. Risks, assumptions, and open questions

### 12.1 Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Eyefinity FHIR surface is thinner than certified-on-paper (missing appointments, no imaging, myopia data unstructured) | Medium | High (portal scope) | Verify resource coverage in week one of API access; scope portal modules to verified resources; staff-entered fallback for myopia series |
| SMART-on-FHIR patient flow unsupported or broken in practice | Medium | High (Phase 4 pattern) | Early written verification; fallback = practice-authorized system access with our own patient identity layer (larger at-rest footprint; re-review) |
| HIPAA compliance cost exceeds two-person capacity | Low-Medium | High | Healthcare PaaS option; advisor review before build; minimized at-rest footprint; insurance |
| Vendor BAA gaps force stack divergence from Xenia (less reuse than hoped) | Medium | Medium | Treat reuse as upside, not plan-of-record; Drizzle/Next patterns port regardless |
| Write-back cost/terms unattractive | Medium | Low (Phase 5 optional) | Staff-executed booking is the designed default, not a stopgap |
| Roya offboarding friction (domain, redirects, content ownership) | Low | Medium | Confirm domain registrar control before cutover date |
| Scope creep from enthusiasm (close-friends dynamic) | Medium | Medium | This PRD is the scope contract; changes get written down |
| Small-cell re-identification in lender reporting | Low | High (it is a breach) | Aggregation thresholds; de-identification standard applied at the boundary |

### 12.2 Assumptions

- The practice will sign a BAA with IserLabs and sees IserLabs as a long-term operating partner, not a one-off vendor.
- Eyefinity Encompass stays as the EHR for the planning horizon.
- Staff will adopt a tool that demonstrably saves them time (the prototype's task-queue UX is designed for exactly this and should be validated with Maria-equivalents early in Phase 3).
- Zocdoc remains the booking front door until write-back exists.
- Fort Lee proceeds on roughly the prototype's stated timeline ("Opening 2027", **VERIFY**).

### 12.3 Open questions (the working checklist)

| # | Question | Blocks | Owner |
|---|---|---|---|
| 1 | Confirm principals and signatories (Dan Han? Mina Han? both?) and who owns domain/GBP/Zocdoc/Eyefinity admin credentials | Phases 1, 3 (BAA) | Jake |
| 2 | Eyefinity: current third-party FHIR access process, docs, and actual resource coverage (appointments? imaging? refraction/axial-length observations?) | 3, 4 | Jake -> Eyefinity |
| 3 | Eyefinity: SMART-on-FHIR standalone patient launch supported for third-party apps? Token lifetimes? Proxy representation? | 4 | Jake -> Eyefinity |
| 4 | Eyefinity: Certified Partner terms, cost, timeline for write-back | 5 | Jake -> Eyefinity |
| 5 | How does EDGEPro technically ingest their data (FHIR bulk vs proprietary extract), and what does that teach us about freshness/completeness? | 3 | Jake -> practice/GPN |
| 6 | How much recall data must persist on our side vs be recomputed from live FHIR reads (roster mirror vs derived-dates-only)? | 3 | Kevin (design) |
| 7 | Vendor BAA availability and terms: Vercel (assume no), Neon, Clerk, Supabase, Twilio, Resend, error-tracking | 3 | Kevin |
| 8 | Phase 1 form-relay posture (Resend to office inbox, constrained fields): acceptable pre-Phase-3, or move inside the boundary sooner? | 1 | HIPAA advisor |
| 9 | HIPAA advisor selection and scope of engagement (SRA review, BAA chain, gray-zone calls, proxy/minor-consent design) | 3 | Jake + Kevin |
| 10 | Cyber-liability/E&O insurance for IserLabs as a BA: carrier, coverage, cost | 3 | Jake |
| 11 | NJ-specific minor-consent nuances affecting the guardian/proxy model, and the revocation-at-18 workflow | 4 | HIPAA advisor |
| 12 | Zocdoc embed mechanics (keep scheduling data off our origin) | 1 | Kevin |
| 13 | Review counts and Fort Lee timeline currently hard-coded in prototype content: verify at launch | 1, 2 | Jake |
| 14 | Data room: host diligence docs (with per-recipient access + logging) or keep out-of-band? | 2 | Jake + practice |
| 15 | Messaging retention policy and who at the practice answers portal messages (staffing reality check) | 4 | Practice |

## 13. What we are asking Kevin to review

### 13.1 Architecture-review questions (answer these directly)

1. **The two-plane split (10.2):** is the Vercel/HIPAA-plane seam sound, and where exactly should the boundary sit for the public form intake and the portal shell?
2. **The thin-interface feasibility check (10.5 #4):** given real-world FHIR latency and token behavior, is render-live viable for the portal, or should we plan a bounded, encrypted, TTL'd cache from the start? What evidence do we need from the Eyefinity docs to decide?
3. **Section 9 stress test:** find the flaw. Is any claim in the HIPAA analysis wrong, optimistic, or missing (especially 9.4's gray-zone calls and the BAA chain in 9.6)?
4. **Stack reuse verdict:** which parts of the Xenia Ops Hub stack (Next.js + Drizzle + Neon + Clerk + Playwright discipline) survive HIPAA vendor verification, and what replaces the rest?
5. **Two-person ops reality:** which hosting option (raw AWS/GCP vs healthcare PaaS) do we actually keep patched, monitored, and restorable at 2am with our team size?
6. **Auth topology:** one identity system for staff and patients, or two? Where does SMART-on-FHIR authorization state live?
7. **Audit and logging design:** where do audit events go, how are ordinary logs kept PHI-clean, and what is the retention story?

### 13.2 System-design deliverables requested

1. **Compliant infrastructure topology** for the PHI plane (environments, network boundaries, IaC approach, backup/DR meeting 7.6).
2. **PHI data-flow diagram** covering the four flows in 10.4, marking every point where PHI is at rest, in transit, or displayed, and every BAA-covered vendor on the path.
3. **Auth model** for staff, patients, and guardians/proxies, including the SMART-on-FHIR flow and the revocation-at-18 mechanics.
4. **The thin-interface determination** (13.1 #2) as a written decision with its evidence.
5. **Cost model for the PHI phases**: monthly infrastructure + vendor cost at current scale and at 2-office scale, so the commercial model (tracked separately) is grounded in real numbers.
6. **A verification plan** for the Eyefinity unknowns (Section 8's VERIFY items) sequenced so the cheapest facts are learned first.

## 14. Appendix

### 14.1 Deployed prototypes (visual renderings, not functional systems)

- Ops dashboard demo: https://riverdell-vision.vercel.app/dashboard (demo data + localStorage interactions)
- Data room: https://riverdell-vision.vercel.app/growth/data-room (password: riverdell)
- Portal concept tour: https://riverdell-vision.vercel.app/portal
- Marketing site: https://riverdell-vision.vercel.app

### 14.2 Key repo files (repo root: `riverdell-vision`)

| Path | What it is |
|---|---|
| `src/lib/site.ts` | Single source of truth: NAP, hours, providers, insurers, Fort Lee config |
| `src/lib/schema.ts` (+ tests) | JSON-LD builders (MedicalClinic/LocalBusiness graph, providers, offer catalog) |
| `src/lib/answers.ts` | AEO answers hub content, grounded-facts policy in header comment |
| `src/lib/leads.ts` | Lead/pipeline domain model, five service-line pipelines with stage models, KPI math; header comment documents the zero-PHI demo discipline and the HIPAA-backed V2 intent |
| `src/lib/demo-store.ts` | localStorage demo store; production replaces it behind the same component API |
| `src/lib/validate-lead.ts`, `src/lib/notify.ts`, `src/lib/ratelimit.ts`, `src/lib/headers.ts` | Form validation (routing fields only), Resend relay (no storage), rate limiting, security headers; all except notify unit-tested |
| `src/app/dashboard/**` | Ops prototype: overview, pipelines (kanban), leads (list/detail), growth snapshot |
| `src/app/(marketing)/growth/**` | Expansion overview + gated data room (verified-vs-illustrative discipline) |
| `src/app/(marketing)/portal/page.tsx`, `src/components/marketing/portal-tour.tsx` | Portal marketing page + interactive 7-module concept tour |
| `src/app/(marketing)/**` | Service/condition/area pages, answers, reviews, cost-and-insurance, accessibility |

### 14.3 Glossary

- **PHI (Protected Health Information):** individually identifiable health information held or transmitted by a covered entity or its business associate, in any form. Name + "due for an eye exam" qualifies.
- **Covered Entity / Business Associate (BA):** the provider (Riverdell) is the covered entity; a vendor that creates, receives, maintains, or transmits PHI on its behalf (IserLabs, from Phase 3) is a BA, directly liable under the Security Rule.
- **BAA (Business Associate Agreement):** the required contract between a covered entity and a BA (and between a BA and its subcontractors) establishing permitted uses and safeguard obligations.
- **Conduit exception:** the narrow carve-out for pure data-transport entities (ISPs, postal service) that never access the data. Does not apply to applications that read, render, or store PHI.
- **FHIR (Fast Healthcare Interoperability Resources):** the HL7 standard REST API and resource model for health data; R4 is the version mandated for certified EHRs by the Cures Act rules.
- **SMART on FHIR:** the OAuth 2.0-based authorization framework letting a patient (or user) grant a third-party app scoped access to their EHR data; mandated for patient access in certified EHRs.
- **21st Century Cures Act / information blocking:** the federal law and rules requiring certified EHRs to expose standardized APIs and prohibiting practices (including prohibitive fees) that interfere with access to electronic health information.
- **Certified Partner (Eyefinity):** Eyefinity's commercial program governing deeper integrations, notably write access; negotiated terms, unpublished cost.
- **EDGEPro (GPN):** third-party practice-analytics product already ingesting Riverdell's Eyefinity data; proof of the read pipe, and the incumbent for financial analytics (we do not rebuild it).
- **Recall / recare:** the reactivation workflow for patients due (or overdue) for periodic care; in this product, the named-patient due queue plus contact tracking.
- **AEO / GEO (Answer/Generative Engine Optimization):** structuring honest, quotable, question-shaped content and machine-readable data (JSON-LD) so AI answer engines cite the practice; the successor discipline to classic SEO, built into Phase 1.
- **SRA (Security Risk Analysis):** the documented risk assessment the Security Rule requires; ours precedes Phase 3 go-live.
- **USCDI:** the federally defined core data classes certified EHR APIs must expose; the floor for what we can expect from the Eyefinity read lane.
