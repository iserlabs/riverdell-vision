# Riverdell Vision Platform: HIPAA Risk & Cost Review

| | |
|---|---|
| Status | Findings report v3 |
| Date | 2026-07-11 (research verified 2026-07-10) |
| Author | Kevin (IserLabs), technical/infrastructure lead |
| Responds to | `docs/riverdell-vision-platform-prd.md` (draft v1), esp. §13 |
| Method | PRD + prototype code review, plus five parallel research passes (~120 sources). Prices tagged **[listed]** (vendor's own page), *[reported]* (credible third party), or *[quote]* (contact sales). |
| Caveat | Engineering and market review, **not legal advice**. Prices and regulatory status are date-sensitive — re-verify before contracting. |

---

## BLUF (bottom line up front)

- **Recommendation: IserLabs does not touch PHI at all (Option A, §8).** The practice **buys** the regulated features from its own EHR vendor's ecosystem — recall = Eyefinity EPN at **$99/mo [listed]**, plus scheduler, two-way messaging, and contact-lens reorders (~$4–7k/yr, each vendor carrying HIPAA as the practice's business associate) — and IserLabs stays entirely on the zero-PHI plane it has already built: the site, findability, and the data room. No BAA, no business-associate status, none of the reviews, audits, or regulatory machinery documented below.
- **Infrastructure is cheap; the program is not.** A fully BAA-covered stack runs **$3–8k/yr** (Vercel now sells a $350/mo self-serve HIPAA BAA on Pro — the PRD's "no PHI on Vercel" is outdated). The permanent costs are the compliance programs: **~$8–21k/yr for IserLabs as a Business Associate** + **~$5–15k/yr for the practice**. Building the PRD as written ≈ **$41k/yr** typical system run-rate; the hybrid ≈ **$20–29k/yr** IserLabs-side; buying everything ≈ **$4–7k/yr** practice-side with zero IserLabs liability.
- **What a custom PHI build would demand — documented so the decision is informed, and avoided entirely under Option A:** ~8–12 weeks of compliance runway (§6: practice BAA, SRA + advisor review, insurance, pre-launch pen test), then the recurring program above for as long as the system runs. For the record: no certification (SOC 2/HITRUST) is legally required on any path.
- **The risk evidence is specific, not vibes:** AI-generated code fails security tests ~45% of the time (flat 2021→2026), worst exactly where patient platforms breach (authorization, secrets, telemetry); OCR is settling with small business associates for **$75k–$228k plus 2-year monitored CAPs**, always citing a missing risk analysis; NJ is a second regulator; TCPA is uncapped at **$500–1,500 per text**; a 10k-record breach models at **$100k–$750k**.
- **Whatever the path, do the no-regret moves now (§2)** — ship the zero-PHI phases, fix the analytics/privacy-copy inconsistency on the live site, file the free Eyefinity API request, and price EPN.
- **If custom PHI work is ever reconsidered, Option B is the only defensible shape** — buy the commodity, build only the low-PHI pipeline layer under the §5.4 discipline. It is documented as the fallback, not the plan: the differentiators it would add (pipelines/SLA, attribution, consolidated reporting) do not justify becoming a business associate and carrying its permanent overhead.

### Headline figures

| $99/mo | $350/mo | ~$41k/yr | 45% | $75–228k | $500–1,500 |
|---|---|---|---|---|---|
| Eyefinity recall add-on **[listed]** — the feature the PRD planned to build | Vercel Pro HIPAA BAA add-on **[listed]**, since 2025-09 | Typical all-in cost to operate a custom PHI platform (both parties) | AI-generated code failing security tests, flat 2021→2026 | OCR settlements with small BAs, 2025–26, + 2-yr monitored CAPs | TCPA statutory damages **per text**, no cap |

---

## 1. Context: what's proposed, what exists

The PRD proposes a demand-to-booked-care platform wrapping the practice's EHR (Eyefinity Encompass): marketing site + findability (Phase 1, built), investor data room (Phase 2, built), internal ops/CRM + recall engine (Phase 3, first PHI phase), patient portal via SMART on FHIR (Phase 4), and Eyefinity write-back (Phase 5, gated). Phases 1–2 carry no PHI and run on Vercel; the prototype dashboard is demo-data-only by design.

**The PRD's HIPAA analysis (§9) survives scrutiny.** Its core positions are correct: IserLabs is a Business Associate the moment the platform touches patient data; the conduit exception does not apply; "name + due for an eye exam" is PHI; thin-interface vs PHI-at-rest is a minimization lever, not an exemption. What the PRD does not analyze is the **build-process risk** — what it means for a two-person shop to AI-assist-build the PHI plane (§4) — and it has **no cost model** (asked of the reviewer in §13.2#5; delivered in §3).

---

## 2. No-regret moves (start now, any path)

1. **Ship Phases 1–2.** Zero PHI, mostly built. Replacing Roya frees ~$500/mo (~$6k/yr) of existing spend — roughly the cost of the entire bought-SaaS stack in §4.
2. **Fix the live-site analytics inconsistency.** `<Analytics />` is mounted in the root layout (`src/app/layout.tsx:86`), so Vercel Analytics runs on `/book` and `/portal` — while the privacy page (`/privacy`) promises "no advertising or analytics trackers on appointment, intake, or patient-facing pages." Post-*AHA v. HHS*, unauthenticated pages are reduced federal-HIPAA risk, but a published promise the site itself breaks is FTC §5 / NJ Consumer Fraud Act exposure and plaintiff-bar fodder. Either route-scope analytics off `/book`, `/portal` (and `/dashboard`), or soften the privacy copy to "cookieless, privacy-conscious aggregate analytics; no advertising trackers." One-line fix; do it before launch.
3. **File the Eyefinity third-party FHIR Connection Request** (free; verification ~10 business days per [Eyefinity's published process](https://help.eyefinity.com/regulatory/infoblocking/api/index.htm)) and ask in writing about SMART patient-launch behavior, appointment/axial-length resource coverage, and Certified Partner terms. Optional under Option A — but free, and keeps the portal question answerable if it ever resurfaces (PRD §11.3 already lists these).
4. **Have the practice price Eyefinity's engagement add-ons**: EPN ($99/mo **[listed]**, 2-months-free promo through 2026-12-31), Integrated Online Scheduler, Online Forms, PatientNavigator, EncompassMessage *[quote]*. This is the cheapest possible recall/reminder win and requires no IserLabs involvement.
5. **Only if a PHI path (B/C) were ever chosen:** draft the BAA (~$850 attorney pass on the HHS model, §6) — the long pole, and the document that allocates breach costs. Under the recommended Option A, no BAA is needed.
6. **Only if a PHI path were ever chosen:** get cyber/E&O insurance quotes early — underwriting questionnaires shape the control set, and per *Travelers v. ICS* the answers must match reality or the policy is void.
7. **Keep the lead form zero-PHI** (current posture is correct — constrained fields, Resend relay, no storage) and add an explicit SMS-consent line ("we may text you about your request/appointments; reply STOP to opt out") to strengthen the TCPA consent record.
8. **Upgrade the data room from the shared password to per-recipient access with logging** (PRD P2-2) before real diligence documents load; keep the deployed demo dashboard clearly labeled and noindexed.

---

## 3. The economics of running a HIPAA system

All stacks below are fully BAA-covered, priced at this practice's scale (1 location, ~10–30 staff, low-thousands of patients). Verified 2026-07-10.

### 3.1 Infrastructure

| Stack | $/month | $/year | Notes |
|---|---|---|---|
| **AWS-native DIY** **[listed]** | ~$240–290 | ~$3–3.5k | Fargate + RDS Multi-AZ + Cognito + SES/SMS + WAF/GuardDuty. One free AWS BAA covers everything incl. Bedrock. Hidden cost: **~0.1–0.25 FTE of ops**. |
| **Managed PaaS** **[listed]** | ~$285–355 | ~$3.4–4.3k | Fly.io ($99/mo compliance add-on) + Neon Scale + Cognito/SES/SMS + Sentry Business. Best ops fit for two people. Render Scale variant ~$700–800/mo; Aptible ~$650–800/mo. |
| **Vercel Pro + HIPAA add-on** **[listed]** | ~$570–645 | ~$6.8–7.7k | $350/mo self-serve BAA (click-through, no redlines) + Neon + AWS side-services. Keeps the current DX; long-running FHIR sync may need a small external worker. |
| Vercel Enterprise *[reported]* | ~$2,050–4,000 | ~$25–48k | Only if counsel demands a negotiated, countersigned BAA or enterprise SLAs. |
| Supabase HIPAA *[part reported]* | ~$1,064+ | ~$13k+ | Team $599 + HIPAA add-on (reported ~$350) + required PITR/compute — before app hosting. Disproportionate here. |

Second-office (Fort Lee) delta: **+$50–150/mo** (SMS volume, database compute, a seat or two) — scale is not the cost driver at this size.

### 3.2 Total cost of ownership (recurring, once any PHI phase is live)

| Recurring cost | Low | Typical | High |
|---|---|---|---|
| IserLabs — BAA-covered infrastructure | $3,000 | $5,000 | $8,000 |
| IserLabs — compliance program (own SRA, policies/training platform, annual pen test $4–10k, attorney, tech E&O + cyber insurance) | $8,400 | $20,900 | $52,000 |
| Practice — compliance program (SRA, platform/training, hardening, insurance) | $5,100 | $15,100 | $36,000 |
| **System total, per year** | **~$17k** | **~$41k** | **~$96k** |

**Under the recommended Option A, the IserLabs rows are $0 and nothing new lands on the practice** beyond routine vendor BAAs — its baseline covered-entity obligations (for Eyefinity, Zocdoc, et al.) exist regardless of this project. The table prices paths B/C.

One-time setup (paths B/C only): BAA legal ~$1–3k (§6); Security Risk Analysis before go-live ($0 with the free [HHS SRA tool](https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool) to ~$10k with a consultant); the HIPAA advisor review the PRD already budgets (~$2–10k); pre-launch pen test (inside the annual figure).

**Affordability framing:** the bought stack in §4 (~$350–550/mo) lands roughly inside the ~$500/mo the practice already pays Roya and cancels at Phase 1. IserLabs' ~$15–21k/yr BA compliance cost is a genuine cost of goods for any custom PHI work and must be priced into the engagement (the PRD's commercial model, tracked separately) — this review only sizes it.

### 3.3 Downside modeling

| Cost line | ~1,000 records | ~10,000 records |
|---|---|---|
| Forensics / incident response | $10–50k | $25–100k |
| Breach counsel + notification + credit monitoring | $10–42k | $65–230k |
| OCR investigation, possible settlement + 2-yr CAP overhead | $10–100k | $15–400k |
| NJ AG exposure (if controls were lax or misrepresented) | $0–20k | $0–425k+ |
| **Realistic all-in (excl. class action, downtime, churn)** | **$30–150k** | **$100–750k** |

Cross-check: healthcare is the costliest small-enterprise sector in actual insurance-claims data, averaging ~$570k per incident ([NetDiligence 2025](https://netdiligence.com/cyber-claims-study-2025-report/), 10,402 claims). One mid-size breach exceeds a decade of compliance spend for both parties.

---

## 4. What can be bought instead of built

The highest-leverage discovery of the review: Eyefinity (the practice's own EHR vendor) and its certified partners sell most of Phase 3–4's regulated features, with the **vendor** carrying HIPAA as the practice's business associate. Prices as of 2026-07-10.

| Solution | Cost | Replaces from the custom build | Encompass integration | BAA |
|---|---|---|---|---|
| **Eyefinity Electronic Patient Notifications (EPN)** | $99/mo **[listed]** ($49 addl location; 2-mo promo thru 2026-12-31) | **Recall/reactivation** + reminders + eyewear-ready notices, confirmations written back to the schedule | Native, first-party | via EHR vendor |
| Eyefinity Integrated Online Scheduler + Forms + PatientNavigator | *[quote]* | 24/7 self-booking into the schedule; digital intake; portal-lite (Rx, receipts, order status — no login) | Native | via EHR vendor |
| EncompassMessage | *[quote]* | Two-way secure messaging | Native | via EHR vendor |
| **Weave** | from $199/mo **[listed]**; realistic $249–350 + ~$750 setup *[reported]* | Phones, 2-way SMS, reminders, recall, reviews, forms, payments, missed-call capture | Certified partner | yes ([published BAA](https://www.getweave.com/legal/baa/)) |
| Solutionreach / Demandforce | ~$200–350/mo *[reported]* | Reminders, recall, campaigns, intake, reviews | Certified partners | yes |
| 4PatientCare (WebSystem3) | *[quote]* | Optometry-native scheduling, no-show follow-up, reactivation campaigns | Certified partner | confirm |
| Dr. Contact Lens / Abby (ABB) | *[quote]* / free | Contact-lens reorder + refill reminders | DCL integrated since 2024-09 | confirm |
| Zocdoc (current) | $35–110 per new-patient booking *[reported]* | Marketplace demand (keep) | — | yes (limited-scope BAA) |
| EDGEPro (current) | already paying *[quote]* | Practice KPI analytics (keep; analytics only, no outreach) | Bulk Data API partner | existing |

A realistic bought stack — EPN + Weave (or Solutionreach) + DCL/Abby, alongside existing Zocdoc and EDGEPro — totals **~$350–550/month (~$4–7k/yr)**. Adding vendors under BAA is routine for the practice (Zocdoc, Eyefinity, and EDGEPro already hold them). Ruled out for lack of optometry/Encompass support: NexHealth, Klara, RevenueWell.

### What genuinely is NOT covered — the real build territory

- **Service-line pipelines with SLA accountability** — named-owner lead pipelines per service line (myopia, dry eye, specialty lenses) with stage tracking, first-response SLAs, escalation. Nothing Encompass-integrated exists.
- **Marketing attribution** — source → booked exam → realized revenue across Zocdoc/Google/website/referral. No vendor joins these.
- **Owner/lender consolidated reporting** — demand, conversion, pipeline value in one credible report (can be a light BI layer over EDGEPro exports + engagement-tool reports).
- **The family-proxy patient portal** — no off-the-shelf equivalent exists; also the riskiest, most PHI-laden item on the roadmap, gated on unverified Eyefinity FHIR facts (appointments and axial-length observations are not USCDI-guaranteed).

> **The strategic asymmetry:** the features that are expensive to operate compliantly (recall queues, messaging — PHI at rest from the EHR) are commodities the EHR vendor already sells. The features that are genuinely unbuilt anywhere (pipelines, attribution, reporting) are the lowest-PHI parts of the vision. The market is pointing at where any custom build would belong — and, equally, at how the practice captures most of the value with no custom build at all.

---

## 5. What can go wrong: AI-assisted development risk, and the enforcement that prices it

### 5.1 The evidence on AI-generated code

| Study | Year | Scope | Finding |
|---|---|---|---|
| [NYU, "Asleep at the Keyboard"](https://arxiv.org/abs/2108.09293) | 2021 | 1,689 Copilot programs | ~40% vulnerable in security-relevant scenarios |
| [Stanford (Perry et al.)](https://arxiv.org/abs/2211.03622) | 2023 | 47 devs, controlled | AI-assisted devs wrote less secure code on 4 of 5 tasks — and were **more confident** it was secure |
| [Veracode GenAI report](https://www.veracode.com/blog/genai-code-security-report/) | 2025 | 100+ LLMs × 80 tasks | 45% fail security tests; XSS failed in 86% of relevant samples; rate flat regardless of model size/recency |
| [Veracode Spring update](https://www.veracode.com/blog/spring-2026-genai-code-security/) | 2026 | 150+ LLMs | Still ~45–55% since 2023. XSS 15% pass, log injection 13% pass. Only GPT-5-class reasoning models step up (~70–72% pass) |
| [BaxBench (ETH Zurich)](https://baxbench.com/) | 2025 | 392 backend tasks, real exploits | Of functionally **correct** AI backends, ~half were exploitable end-to-end |
| [Apiiro](https://apiiro.com/blog/faster-code-greater-risks-the-security-trade-off-of-ai-driven-development/) | 2025 | 62,000 repos | AI-assisted repos: privilege-escalation paths **+322%**, architectural flaws +153% — defects shift from syntax to design |
| [GitGuardian](https://blog.gitguardian.com/yes-github-copilot-can-leak-secrets/) | 2025–26 | ~20k repos | Copilot-active repos leak secrets at 6.4% vs 4.6% baseline (+40% relative) |
| [GitClear](https://www.gitclear.com/ai_assistant_code_quality_2025_research) | 2025 | 211M changed lines | 8× rise in duplicated blocks; refactoring collapsed — the unauditable-codebase trend |

Two aggravating results for a small team: LLMs are also poor at **detecting** broken access control (78% false-positive rate on IDOR findings in [Semgrep's evaluation](https://semgrep.dev/blog/2025/can-llms-detect-idors-understanding-the-boundaries-of-ai-reasoning/)) — the model cannot audit itself; and iterative "improve this code" loops **increased** critical vulnerabilities ~38% over five rounds ([arXiv:2506.11022](https://arxiv.org/pdf/2506.11022)).

### 5.2 The incidents — verified root causes

| Incident | Date | Verified root cause | Impact |
|---|---|---|---|
| Lovable apps · [CVE-2025-48757](https://nvd.nist.gov/vuln/detail/CVE-2025-48757) | 2025-03 | Generated Supabase schemas without correct Row-Level Security; public anon key + no RLS = open database | 170+ production apps exposed PII, payment data, API keys |
| Enrichlead ("100% Cursor-built") | 2025-03 | Access control enforced client-side; API keys in the frontend; founder couldn't debug the codebase | Compromised within days; shut down |
| [Replit agent / SaaStr](https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/) | 2025-07 | AI agent held production DB credentials; no dev/prod separation; ran destructive commands during a code freeze | Production database deleted (recovered) |
| [Base44 platform (Wiz)](https://www.wiz.io/blog/critical-vulnerability-base44) | 2025-07 | Undocumented registration endpoint accepted a non-secret app_id — auth bypass on private apps | All private apps exposed; fixed <24h |
| Tea app — **misattributed** | 2025-07 | **Not vibe coding**: a legacy Firebase bucket with no authentication, predating AI tooling | ~72k images incl. IDs; 1.1M+ DMs |

Honest in both directions: no healthcare PHI breach has yet been publicly attributed to an AI-built app, and the loudest cited case wasn't AI-caused. But an October 2025 scan of 5,600 live vibe-coded apps found 2,000+ high-impact vulnerabilities, 400+ exposed secrets, and 175 PII exposures **including medical records** ([Escape.tech](https://escape.tech/blog/methodology-how-we-discovered-vulnerabilities-apps-built-with-vibe-coding/)). Every failure mode above is boring, known, and preventable.

### 5.3 Why HIPAA multiplies exactly these defects

In ordinary SaaS, an authorization bug is an incident. Here, one patient reading another's record is a **reportable breach**: individual notice ≤60 days; **NJ State Police notified before the patients**; HHS reporting (≥500 records: within 60 days + media; <500: annual log by March 1); the BA must notify the CE without unreasonable delay (BAAs usually shorten this to days); a likely OCR investigation (settlement-track matters average ~57 months); possible NJ Consumer Fraud Act action; and per [*Travelers v. ICS*](https://www.insurancejournal.com/news/national/2022/08/30/682564.htm), a cyber policy rescindable if the application's security attestations didn't match reality.

**Condensed risk register — AI-assisted build × HIPAA context**

| # | Risk | Evidence anchor | Consequence here | Primary mitigation |
|---|---|---|---|---|
| 1 | Broken authorization / IDOR (patient A reads patient B) | +322% privesc paths in AI repos; Lovable 170+ apps | Reportable breach; OCR + NJ AG | Server-only data path, deny-by-default, **authz integration tests as a merge gate**, human review of every authz diff |
| 2 | Secrets reaching the client | +40% leak rate with AI assist; Enrichlead | One key = whole-database breach | Secret scanning in CI; no client-side data access; rotation |
| 3 | PHI in logs, telemetry, pixels | Log injection 13% pass; pixel settlements to $12.2M | Breach + class action + FTC | Zero third-party scripts on authenticated pages; BAA'd + scrubbed error tracking; server-side analytics only |
| 4 | XSS via patient-entered content | Worst measured AI class (15% pass) | Session theft with PHI access | Framework auto-escaping, strict CSP, external DAST before launch |
| 5 | AI agent with production access | Replit/SaaStr deletion | Data loss = availability breach | Agents never hold prod credentials; synthetic data outside prod; human-applied migrations |
| 6 | Unauditable codebase (2-person shop) | GitClear 8× duplication; +38% vulns over 5 AI iterations | Cannot evidence security to OCR or insurer | Small reviewed diffs; test discipline; no bulk generation |
| 7 | BAA-chain gap | Contract facts, invisible to code review | Violation with zero code defects | Vendor BAA spreadsheet as a build gate, verified before code exists |
| 8 | Recall engine texts after opt-out | AdaptHealth: 220k texts post-STOP → ~$6M; Walgreens & Walmart: $11M each over Rx-reminder calls/texts | TCPA: $500–1,500/text, uncapped | Global STOP suppression from day one; consent records; quiet hours |
| 9 | Myopia chart computes predictions | Patient-facing CDS is not FDA-exempt | Medical-device territory (~$115–400k if regulated) | Portal displays clinician-generated projections; never computes them |
| 10 | Under-resourced BA operations | DIY infra ≈ 0.1–0.25 FTE ops | Direct BA liability lands on IserLabs | Managed PaaS; minimized PHI scope; insurance; the discipline below |

> **The failure mode code review can't see:** the most dangerous defect class isn't in the code — it's in the **BAA chain**. "The database has a HIPAA add-on" doesn't help if the compute in front of it has no BAA; Neon's BAA excludes Neon Auth and its Data API; Render's excludes service logs; Resend has no BAA at all. These are contract facts, invisible to any code review, and an AI assistant optimizing "it works" will happily route PHI through a non-covered service. Compliance is a property of the vendor graph, not the codebase.

### 5.4 The discipline that makes AI-assisted building defensible

Mitigations with measured effect: security-focused prompting cuts vulnerability density 48–77% in studies (insufficient alone); SAST + autofix in CI triples remediation speed; deny-by-default architecture defeats every incident pattern above; mainstream stacks measurably reduce AI error rates.

**Defensible — "AI writes; humans architect, review, test, deploy":** threat model + SRA before build; server-only data access with RLS as a second layer; authorization test matrix as a merge gate (log in as patient A, request patient B's data); secret scanning + SAST in CI and an external DAST scan before PHI go-live; agents sandboxed from production with synthetic data; MFA/encryption/asset inventory built to the proposed Security Rule spec.

**Indefensible — vibe coding in the literal sense:** unreviewed AI output in PHI paths; client-direct database access; agents holding production credentials; default analytics/error tooling on authenticated pages; trusting the model's own security self-assessment; bulk generation no human on the team can explain to an investigator.

### 5.5 Enforcement reality — who gets fined, for what

**OCR penalty tiers** (inflation-adjusted, effective 2026-01-28): $145–$73,011 per violation depending on culpability, annual cap $2,190,294 per provision (discretionary caps ~$36.5k–$365k for the lower tiers remain in effect but are revocable).

**Recent OCR actions against small providers and business associates:**

| Organization | Type | Amount | Root cause | Year |
|---|---|---|---|---|
| Manasa Health Center (NJ) | Small psychiatric practice | $30,000 | PHI disclosed replying to Google reviews | 2023 |
| Green Ridge Behavioral Health | Small practice | $40,000 | Ransomware; no risk analysis; 3-yr monitoring | 2024 |
| Elgon Information Systems — **BA** | Small EHR/billing vendor | $80,000 | Ransomware; inadequate risk analysis | 2025 |
| Virtual Private Network Solutions — **BA** | Small hosting vendor | $90,000 | Ransomware across 12 CE clients; no risk assessment | 2025 |
| Comstar, LLC — **BA** | Medical-billing vendor | $75,000 | Ransomware, ~585k individuals; no risk analysis | 2025 |
| Health Fitness Corp. — **BA** | Wellness-services vendor | $227,816 | Server misconfiguration exposed ePHI for years | 2025 |
| BST & Co. CPAs — **BA** | CPA firm serving healthcare | $175,000 | Phishing→ransomware; no risk analysis; 2-yr monitored CAP | 2025 |
| Vision Upright MRI | Small imaging provider | $5,000 | Never conducted any risk analysis; missed 60-day notifications | 2025 |

The pattern ([HHS resolution agreements](https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/index.html)): OCR's Risk Analysis Initiative and ransomware push produced 30+ actions through April 2026, and the first document demanded is always the **security risk analysis**. The corrective action plan — 1–3 years of OCR-monitored remediation — is widely regarded as costlier than the settlement check.

**New Jersey layer:** the AG settled with mid-size practices at [$425k (Regional Cancer Care)](https://www.njoag.gov/new-jersey-health-care-providers-will-adopt-new-security-measures-and-pay-425000-to-settle-investigation-into-two-data-breaches/) and [$495k (Diamond Institute — no risk assessment, no encryption)](https://www.njoag.gov/acting-ag-bruck-announces-settlement-with-fertility-clinic-over-cybersecurity-lapses-and-data-breach/), pairing HIPAA with the Consumer Fraud Act ($10k/$20k per violation).

**The tracking-pixel wave** is the best-documented web-specific risk: Advocate Aurora $12.225M and Novant $6.6M class settlements; FTC: GoodRx $1.5M, BetterHelp $7.8M, Cerebral ~$7.1M; NY AG: NewYork-Presbyterian $300k for ad-tech on appointment-booking pages. Post-*AHA v. HHS* (2024), the rule on **authenticated** pages is unambiguous: no tracking technology touching PHI without a BAA — and Google Analytics and Meta do not sign them.

**Rule outlook:** the proposed Security Rule overhaul (mandatory MFA, encryption, asset inventories, annual pen testing) slipped to ~July 2027 on HHS's agenda, but building to its spec now is both the insurance-underwriting baseline and cheap future-proofing.

---

## 6. The compliance runway: process, time, and cost

### 6.1 The practice↔IserLabs BAA

The BAA must contain nine required provisions (45 CFR [164.504(e)](https://www.law.cornell.edu/cfr/text/45/164.504)); HHS publishes [free model language](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html) covering only the regulatory minimum. What actually gets negotiated is business allocation: indemnification scope (narrowed to breaches the BA causes), liability caps (commonly insurance limits or 12 months' fees), breach-cost allocation, audit rights, data return on termination. In a small friendly deal, whoever brings a competent draft sets the terms — IserLabs should present an attorney-reviewed draft with its MSA. **Do not skip the attorney pass on this one document** (~$850 flat is the marketplace average; $500–2,500 range): it decides who pays for a breach.

### 6.2 Subcontractor BAAs, per vendor

| Vendor | How executed | Time | Gate / fee |
|---|---|---|---|
| AWS | Click-through in AWS Artifact, account-wide | <2 minutes | Free — covers RDS, Fargate, Cognito, SES, SMS, S3, Bedrock (eligible-services list applies; App Runner is **not** on it) |
| Google Cloud / Microsoft | Console click-through / automatic in Product Terms | Minutes / instant | Free on paid plans |
| Neon | Self-serve, org-level + per-project HIPAA flag | Minutes | Scale plan (usage-based, no minimum); future +15% surcharge pre-announced; **Neon Auth + Data API excluded** |
| Sentry | Self-serve in org settings | Minutes | Business plan (~$89/mo); configure PII scrubbing |
| Vercel | Self-serve add-on from billing (Pro) or negotiated (Enterprise) | Same day / weeks | $350/mo add-on, click-through, no redlines |
| Supabase | Sales-assisted HIPAA add-on | Days–weeks | Team $599/mo + add-on *[quote]* |
| Twilio — **avoid** | Sales-gated Security/Enterprise Edition | Weeks | Unpublished; 1–3-yr commitments, credibly five figures/yr — use AWS End User Messaging (~$40/mo at ~3k texts) under the free AWS BAA |
| Resend / SendGrid — **no BAA** | — | — | Neither signs BAAs (SendGrid per Twilio's own docs). Never send PHI through them; use SES or Paubox |

### 6.3 Every other gate (with cost and time)

Threshold truth: **HIPAA has no certification.** No auditor, platform, or seal is required by law or recognized by OCR. The requirement is a documented program you can produce on demand.

| Gate | Required? | Cost | Time | Bottom line |
|---|---|---|---|---|
| Security Risk Analysis + risk-management plan | **Yes, pre-go-live** | $0 (HHS tool) – $10k | Days–weeks | The #1 OCR enforcement hook |
| HIPAA advisor review (PRD already budgets it) | Strongly advised | ~$2–10k once | 2–4 weeks | Validates gray zones (form relay, proxy model) before they calcify |
| Penetration test of PHI surfaces | Effectively yes (insurers + proposed rule) | $4–10k/yr | 1–3 weeks | Pre-launch, then annual |
| OCR audit program | Selection ≈ negligible | — | ~10 business days to produce documents if selected | 50 desk audits nationwide (CEs **and** BAs). Real vectors: patient complaints and breach reports |
| SOC 2 (Type I / II) | No | $5–20k / $25–50k yr 1 | 3–6 / 6–12 months | Skip; revisit only if productized and an enterprise buyer demands it |
| HITRUST (e1→r2) / ISO 27001 | No | $20–70k → $150–300k+ / $25–50k | 3–24 months | Enterprise artifacts; inherit AWS/Neon attestations free via trust portals |
| TCPA (SMS recall) | **Yes** | Process + tooling | Build-time | Prior express consent via the number the patient provided; **$500–1,500/text, uncapped**; STOP honored ≤10 business days (honor immediately); quiet hours 8am–9pm; consent logs ≥4 yrs; "revoke-all" rule effective 2027-01-31 — build one global opt-out flag now |
| WCAG 2.1 AA — HHS §504 rule | **Yes** | Built-in if done from day one | — | Deadline **May 11, 2026** for Medicare/Medicaid recipients with 15+ employees (May 2027 below that) — **confirm the practice's headcount**; likely already in force. Plus 3,117 ADA web suits in 2025 ($5–25k typical settlements) |
| FDA (portal / myopia chart) | Design constraint | $0 if display-only | — | A portal displaying EHR data is statutorily not a device (Cures Act §3060). The patient-facing CDS carve-out does **not** exist: an app-computed "untreated trajectory" projection is device-risk territory (~$115–400k if a 510(k) were needed). **Display clinician-generated projections with provenance; never compute predictions in-app** |
| ONC certification / info-blocking | Not for the app | $0 | Eyefinity verification ~10 business days | Certification binds EHR developers. Info-blocking duties fall on the practice and Eyefinity — the practice cannot direct the app to delay patients' access to their own data |
| PCI DSS (future payments) | Deferred | ~$0 if full-redirect | — | Hosted checkout via full redirect keeps SAQ-A; **redirect, don't iframe** (PCI FAQ 1588) |
| New Jersey specifics | Yes | Design-time | — | Records ≥7 years from last entry (N.J.A.C. 13:38-2.1; keep minors' to ~age 20); guardian proxy **auto-terminates at 18** with re-grant; State-Police-first breach notice; NJ Data Privacy Act thresholds (100k consumers) almost certainly not met |

### 6.4 Consolidated timeline to a lawful PHI go-live

Roughly **8–12 weeks of compliance runway, mostly parallel with build.** Long poles: practice BAA signature, pen-test scheduling, and any sales-gated vendor.

| Weeks | Workstream |
|---|---|
| 0 | Pick the path (§8). Practice requests EPN/scheduler quotes. File the Eyefinity Connection Request. Engage the attorney (BAA draft). Start insurance quotes. |
| 1–2 | BAA draft ↔ practice. Same-day click-through BAAs (AWS, Neon, Sentry, Vercel). SRA started (HHS tool) + threat model. Build begins on synthetic data only. |
| 2–4 | Advisor review of the SRA, form-relay posture, and proxy/minor-consent design. Policies/training live on the compliance platform. |
| 4–6 | Practice BAA signed. Insurance bound (answers must match implemented controls). Eyefinity API docs in hand; FHIR resource coverage verified. |
| 6–8 | Authorization test matrix green. External DAST. WCAG 2.1 AA check. Pen test runs. |
| 8–12 | Pen-test remediation. Go-live gate: BAA ✓ SRA ✓ advisor ✓ insurance ✓ pen test ✓ audit logging ✓ TCPA opt-out ✓. First PHI flows. |

---

## 7. PRD scorecard: what holds, what changes, and answers to §13

### 7.1 Six material corrections

1. **§9.7 is outdated on Vercel.** A self-serve HIPAA BAA exists on Pro at $350/mo (since 2025-09). Enterprise is only needed for a negotiated, countersigned BAA.
2. **P3-4 (recall engine) should be bought, not built.** Eyefinity EPN does it for $99/mo with schedule write-back — which also partially obsoletes Phase 5's write-back rationale.
3. **The Clerk/Xenia auth reuse dies at BAA verification** (Enterprise-only). AWS Cognito is $0 at this scale under the free AWS BAA. Next.js + Drizzle + Neon + the Playwright discipline survive.
4. **Resend is confirmed no-BAA.** The current zero-PHI form relay is the only lawful version of Phase 1; intake must move inside the BAA boundary the day a CRM stores leads.
5. **Eyefinity's patient-authorized SMART-on-FHIR access is confirmed to exist** (Connection Request verified ~10 business days; read-only USCDI; OAuth 2.0 + PKCE; no staff action for patient-authorized reads). §8.2's open questions stand: appointments and axial-length observations are not USCDI-guaranteed and remain the portal's gating facts.
6. **Two hard requirements the PRD lacks:** WCAG 2.1 AA under the HHS §504 rule (deadline likely already in force — confirm headcount), and the FDA display-only constraint on the myopia projection chart.

### 7.2 Direct answers to the §13.1 review questions

Flagged as reviewer direction — final shapes belong to a design phase, if one happens.

| # | PRD question | Answer |
|---|---|---|
| 1 | Two-plane split sound? Where's the seam? | **Sound, and cheaper than the PRD feared.** Marketing/data room stay on non-PHI Vercel. From Phase 3, the public form POSTs across the boundary to a PHI-plane intake endpoint; the portal lives on its own subdomain/project under BAA. |
| 2 | Thin-interface (render-live) viable for the portal? | **Undetermined until Eyefinity latency/token facts are in hand** — that's why the Connection Request is a no-regret move. Default posture: plan a bounded, encrypted, TTL'd cache; the myopia series likely needs persistence or staff entry regardless (axial length is not USCDI-guaranteed). |
| 3 | Find the flaw in §9 | §9 survives. The six corrections above; the largest omission was build-process risk (§5) and the analytics/privacy-copy inconsistency on the live site (§2.2). |
| 4 | What survives of the Xenia stack? | Next.js, Drizzle, Neon (BAA on Scale), Playwright discipline: **yes**. Clerk: **no** → Cognito. Vercel: **yes** via the Pro BAA add-on (long-running FHIR sync needs a small external worker). |
| 5 | Two-person ops reality: raw cloud vs PaaS? | **Managed PaaS or the Vercel-hybrid.** Raw AWS is ~$50/mo cheaper and ~0.1–0.25 FTE more expensive — the wrong trade at this team size. |
| 6 | One identity system or two? | **Two.** Staff auth (Cognito pool, MFA, role-based) separate from patient identity (own pool + family/proxy model). SMART-on-FHIR tokens are held server-side in the FHIR integration service, never in the browser. |
| 7 | Audit and logging design? | Append-only audit table inside the PHI datastore with a restricted write path; 6-year retention. Application logs PHI-clean by design (IDs only); error tracking under BAA (Sentry Business) with scrubbing, or self-hosted GlitchTip inside the boundary. |

---

## 8. Strategic options and recommendation

**Option A — Buy everything regulated; IserLabs stays zero-PHI. ★ Recommendation.** Ship Phases 1–2 (built). The practice adopts EPN + Integrated Scheduler + PatientNavigator (+ Weave or Solutionreach, + DCL/Abby) at ~$4–7k/yr, every vendor holding its own BAA — patients get recall, online booking, two-way messaging, and reorders within weeks. Leads keep relaying to the office inbox under the existing zero-PHI form discipline; no custom CRM. IserLabs never signs a BAA, never becomes a business associate, and carries none of §5's risk register or §6's runway. The engagement continues where it is already strong and unregulated: the site, findability/AEO, the data room, Google Business Profile — and, if the owner wants a snapshot, an aggregates-only reporting page fed by practice-prepared, de-identified rollups (never patient-level exports, which would silently recreate BA status). *Honest cost:* the PRD's service-line pipelines with SLAs, marketing attribution, consolidated lender reporting, and the family portal don't happen — the platform thesis narrows to the non-PHI layer.

**Option B — Hybrid: buy the commodity, build the low-PHI layer. The documented fallback, not the plan.** If the practice's demand ever makes custom work compelling, this is the only defensible shape: the bought stack stays; IserLabs builds just the pipelines/SLA/attribution/reporting layer (website and phone leads treated as PHI-equivalent, **no EHR sync, no clinical data**) under the full §5.4 discipline and §6 runway — ~$4–8k/yr infra + ~$15–21k/yr IserLabs compliance, small blast radius. **Not recommended now:** those differentiators do not justify business-associate status and its permanent overhead.

**Option C — Build the PRD as written. Not recommended.** Custom recall engine + portal on HIPAA rails from the start. ~$41k/yr typical system run-rate, the full risk register, duplicates a $99/mo product with an inferior (manual) booking loop, and stakes the portal on unverified FHIR facts.

---

## Appendix

### A. Vendor BAA verdicts (PRD open question #7, answered)

| Vendor | BAA | Gate | Cost of the BAA path |
|---|---|---|---|
| Vercel | yes | Pro add-on (click-through) or Enterprise (negotiated) | $350/mo **[listed]**; Enterprise ~$20–45k/yr *[reported]* |
| AWS (RDS, Fargate, Cognito, SES, End User Messaging, S3, Bedrock…) | yes | Free click-through in AWS Artifact; eligible-services list applies (App Runner is **not** on it) | $0 |
| Neon Postgres | yes | Scale plan, self-serve; Neon Auth + Data API excluded | Usage ~$40–95/mo; future +15% surcharge pre-announced |
| Supabase | yes | Team/Enterprise + HIPAA add-on; High-Compliance config required | ~$1,064/mo floor *[part reported]* |
| Clerk | enterprise only | Custom annual contract | *[quote]* |
| Auth0 | enterprise only | HIPAA add-on to enterprise agreement | Reported $30k+/yr *[reported]* |
| AWS Cognito | yes | Under the free AWS BAA | $0 ≤10k MAU |
| Twilio (SMS) | gated | Security/Enterprise Edition, 1–3-yr contracts | Unpublished; credibly five figures/yr *[reported]* |
| AWS End User Messaging (SMS) | yes | Under the free AWS BAA | ~$40/mo at ~3k texts |
| SendGrid | **no** | Twilio's own docs: not HIPAA-eligible, no BAA | — |
| Resend | **no** | No HIPAA/BAA offering found on vendor pages | — |
| Paubox (email) | yes | All tiers, BAA included | API free ≤300/mo; paid from ~$99/mo |
| Sentry | yes | Business plan or higher; configure PII scrubbing | ~$89/mo |
| Datadog | gated | Effectively enterprise-contract | *[quote]* |
| LLM APIs: AWS Bedrock / Anthropic / OpenAI / Azure OpenAI | yes | Bedrock rides the free AWS BAA; Anthropic via sales; OpenAI by request (ZDR endpoints only); Azure automatic in Product Terms | Token usage only |

### B. Mini-glossary

- **PHI** — individually identifiable health information; "name + due for an eye exam" qualifies.
- **CE / BA** — Covered Entity (the practice) / Business Associate (a vendor handling PHI on its behalf; directly liable under HIPAA since 2013).
- **BAA** — the required contract between a CE and BA (and between a BA and its subcontractors).
- **SRA** — Security Risk Analysis, the documented risk assessment the Security Rule requires; the first document OCR demands.
- **CAP** — Corrective Action Plan; 1–3 years of OCR-monitored remediation attached to most settlements.
- **FHIR / USCDI / SMART on FHIR** — the standardized EHR API, the federally required core data classes it must expose, and the OAuth flow letting a patient authorize a third-party app.
- **OCR** — the HHS Office for Civil Rights, HIPAA's enforcer.

### C. Method & sourcing

Prepared in response to PRD draft v1 §13 using five parallel AI-assisted research passes on 2026-07-10 (~120 sources; primary sources preferred: vendor pricing/legal pages, HHS.gov, FDA.gov, Federal Register, NJ AG releases, court records). Load-bearing claims link to sources inline. Figures will drift — re-verify before contracting. The HIPAA advisor engagement the PRD budgets (§9.7) should validate the BAA terms, the Phase 1 form-relay posture, and the proxy/minor-consent design.
