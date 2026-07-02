# Riverdell Vision

Growth website + high-value patient ops prototype for Riverdell Vision, a physician-led
family optometry practice in Oradell, NJ preparing to finance a second office in Fort Lee.

Built as a pitch prototype: a premium public marketing site plus a zero-PHI operations and
investor dashboard, all on sample data. See
`docs/superpowers/specs/2026-07-02-riverdell-vision-slice1-design.md` for the design record.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn (Base UI) components
- Fonts: Fraunces (display), Schibsted Grotesk (text), Geist Mono (data)
- Deployed on Vercel

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
```

## Structure

- `src/app/(marketing)/` public site (home, services, locations, book, reviews, areas)
- `src/app/dashboard/` demo-gated ops + investor dashboard
- `src/app/api/` zero-PHI lead + waitlist intake endpoints
- `src/lib/` site config, services, areas, reviews, schema (JSON-LD), demo lead store
- `src/components/site|marketing|dashboard/` UI

## Demo notes

- Dashboard is at `/dashboard` (any credentials; it is a demo gate, not real auth).
- Lead capture is zero-PHI by design. Production adds a HIPAA-ready backend, RBAC, MFA,
  audit logging, and real integrations (Zocdoc, EHR, messaging).
- Set `NEXT_PUBLIC_SITE_URL` in the environment for correct canonical/sitemap/OG URLs.
