# Riverdell Vision

Growth website + high-value patient ops prototype for Riverdell Vision, a physician-led
family optometry practice in Oradell, NJ preparing to finance a second office in Fort Lee.

Built as a pitch prototype: a premium public marketing site plus a zero-PHI operations and
investor dashboard, all on sample data. See
`docs/superpowers/specs/2026-07-02-riverdell-vision-slice1-design.md` for the design record.

## Making changes to this site yourself (no coding)

You do not need a developer to update the site. It runs on a simple loop: you tell
**Claude Code** what you want in plain English, it edits the site for you, and when you say
the word it publishes automatically. You never write code, and there is no separate "server"
to log into.

**How the pieces fit**

- **GitHub** (this repo) is where the code lives, with a full history so any change can be undone.
- **Vercel** is the host. Whenever a change is saved to GitHub, the live site rebuilds and
  updates on its own, usually within a minute.
- **Claude Code** is the tool on your laptop that makes the edits when you ask.

**One-time setup (about 10 minutes)**

1. Install Claude Code (desktop app or the VS Code extension) and sign in with your Claude account.
2. Download this project to your laptop:
   ```bash
   git clone https://github.com/iserlabs/riverdell-vision.git
   cd riverdell-vision
   ```
3. Open that folder in Claude Code. This project uses `pnpm`; if you ask, Claude can run
   `pnpm install` for you. To preview locally run `pnpm dev`, then open http://localhost:3000.

**Making a change**

1. In Claude Code, just describe what you want, for example:
   - "Change Tuesday hours to 9am to 5pm."
   - "Add Dr. Smith to the team page with this photo."
   - "Make the homepage headline bigger and change the button to navy blue."
   - "Add a banner about our holiday closure."
2. Claude makes the edit and can show you a preview first.
3. When you are happy, say **"push it live."** The site updates automatically in about a minute.
4. Changed your mind? Ask Claude to undo. Every version is saved.

**To publish, your account needs permission on this repo.** It is public, so anyone can read and
download it, but only approved accounts can publish changes. Send us your GitHub username and we
will add you. Until then you can still edit and preview on your own laptop.

**Where common things live** (handy when asking Claude, though it will find them for you)

- Hours, address, phone, email, social links, doctors, insurance: `src/lib/site.ts`
- Services and their descriptions: `src/lib/services.ts`
- Patient reviews: `src/lib/reviews.ts`
- Towns and areas served: `src/lib/areas.ts`
- Individual pages (home, about, book, each service): `src/app/(marketing)/`

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
