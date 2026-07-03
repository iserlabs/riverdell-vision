import { Stethoscope, Layers, Clock, Languages } from "lucide-react";
import { practice, providers } from "@/lib/site";

// Photo-free "credential panel" that replaces the office photograph in the
// homepage Riverdell-difference section. Same framed-card footprint (rounded,
// bordered, soft shadow, ~4:3) so the two-column layout keeps its balance, but
// built from real practice facts instead of a picture. Every line here is
// pulled verbatim from the site's own data (lib/site.ts providers + the
// PRINCIPLES claims already made elsewhere on the page): Dr. Meyer's FCOVD
// fellowship, the five in-house specialty programs, unhurried exam pacing,
// and English/Korean bilingual care via Dr. Han. No new claims are introduced.
const bruceMeyer = providers.find((p) => p.slug === "dr-bruce-meyer");
const minaHan = providers.find((p) => p.slug === "dr-mina-han");

const CREDENTIALS = [
  {
    icon: Stethoscope,
    label: "FCOVD",
    body: `${bruceMeyer?.name ?? "Dr. Meyer"} is a Fellow of the College of Optometrists in Vision Development, leading vision therapy and neuro-rehabilitation on staff.`,
  },
  {
    icon: Layers,
    label: "5 programs, one roof",
    body: "Myopia management, Ortho-K, scleral & specialty lenses, vision therapy, and neuro-optometric rehabilitation, run in-house rather than referred out.",
  },
  {
    icon: Clock,
    label: "Unhurried exams",
    body: "Time to look carefully, explain what we see, and track change year over year. The exam sets the pace, not the schedule.",
  },
  {
    icon: Languages,
    label: "English & Korean",
    body: `${minaHan?.name ?? "Dr. Han"} sees patients in English and Korean, part of a bilingual team families keep for years.`,
  },
] as const;

export function StudioPanel() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-line bg-card p-2 shadow-[0_30px_70px_-40px_rgba(18,60,70,0.4)]">
      <div className="grain relative flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-teal-deep px-7 py-7 text-bone md:px-9 md:py-9">
        {/* hairline motif, a quiet nod to an optical field / lens ring */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-10 -top-10 size-56 text-bone/10"
        >
          <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="relative">
          <p className="eyebrow text-brass">{practice.address.city}, {practice.address.region}</p>
          <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-bone md:text-3xl">
            The Oradell Studio
          </h3>
        </div>

        <ul className="relative mt-6 flex flex-1 flex-col justify-between gap-4">
          {CREDENTIALS.map((c) => (
            <li key={c.label} className="flex items-start gap-3.5 border-t border-bone/15 pt-4 first:border-t-0 first:pt-0">
              <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-bone/10 text-brass">
                <c.icon className="size-4.5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[15px] font-medium leading-snug text-bone">
                  {c.label}
                </p>
                <p className="mt-0.5 text-[13px] leading-relaxed text-bone/70">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
