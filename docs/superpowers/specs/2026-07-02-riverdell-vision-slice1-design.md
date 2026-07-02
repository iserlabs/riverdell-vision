# Riverdell Vision - Slice 1 Design (Pitch Prototype)

**Date:** 2026-07-02
**Source of truth:** `riverdell_vision_prd.md` (V1/V2/V3 platform PRD)
**This document:** the first buildable slice, scoped and shipped as a pitch demo.

## Decision record

Driven by an interrogation round, then a "use your best judgment, ship it" directive:

| Decision | Choice |
|---|---|
| Commercial mode | Pitch demo to win the full engagement (sample data OK) |
| First slice | PRD section 36 prototype cut |
| PHI/HIPAA line | Zero-PHI V1 (routing data only, no BAA needed) |
| Optimize for | Investor/owner buy-in AND demonstrable conversion |
| Rank/bar | Best-in-class local-service site, 2026 |

## Product thesis (unchanged from PRD)

This is an expansion-financing play wearing a website. Everything ladders to making
the Fort Lee second office credibly financeable: the site surfaces the high-margin
specialty moat (myopia management, dry eye, specialty/scleral lenses), the ops layer
proves demand is not leaked, and the growth snapshot turns that into a lender story.

## Brand / art direction

Deliberately not the stock optometry template (bright blue + Montserrat/Poppins).

- **Palette:** warm bone canvas, deep petrol-teal primary, warm clay accent, slate ink.
- **Type:** Fraunces (optical display serif), Schibsted Grotesk (text/UI), Geist Mono (ops data).
- **Feel:** calm, editorial, clinically credible. Generous whitespace, subtle scroll reveals.
- **Imagery:** bespoke, on-brand generated photography; Dr. Han's real photo used authentically.

## Scope built

**Public site (Next.js 16, App Router, Tailwind v4, shadcn/Base UI):**

- Home (moat-forward), Book (zero-PHI consult + Zocdoc + call), About (Dr. Han + team +
  pediatric/medical care), Oradell location (map, hours, boutique), Fort Lee coming-soon
  (waitlist), Reviews, Privacy, Accessibility.
- 3 flagship AEO service pages (Myopia, Dry Eye, Specialty/Scleral) with direct-answer
  blocks, who-it-is-for, how-we-evaluate, treatment options, reviewed-by byline, FAQs.
- Data-driven local-SEO pages under `/areas/[slug]` (8 towns/service combos), plus index.
- Full SEO/AEO infra: per-page metadata, JSON-LD (LocalBusiness/MedicalBusiness,
  Physician, Service, FAQPage, BreadcrumbList, WebSite), sitemap, robots, OG image.

**Ops + investor dashboard (`/dashboard`, demo-gated):**

- Overview (KPIs, follow-ups due, needs-attention, demand by service line).
- Pipelines board (5 pipelines, move leads through stages).
- Leads list (search + filter) and lead detail (contact, stage/assign controls,
  auto-generated follow-up tasks with call scripts).
- Growth Snapshot: investor/lender report (exec summary, KPIs, monthly trend,
  conversion funnel, service-line demand, Fort Lee readiness, 90-day plan, print/export).

## Zero-PHI architecture

Lead capture collects only name, contact, service interest, and source. No symptoms or
clinical detail are collected or stored, so no BAA is triggered for the prototype. The
demo store is `localStorage`-backed so a public-site submission appears live in the
dashboard. In V2 the same component API is backed by a HIPAA-ready store (Supabase + BAA,
RBAC, MFA, audit logging). No third-party trackers on intake pages.

## Not in this slice (future V2/V3)

Real auth/RBAC/MFA, HIPAA backend + BAAs, Zocdoc/Eyefinity integration, automated
email/SMS sequences, multi-location reporting, Korean-language Fort Lee pages, blog.
