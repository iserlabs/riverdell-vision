"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { ServiceIcon, type ServiceIconKey } from "@/components/site/service-icon";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Who = "child" | "adult" | "family";
type Concern = "vision" | "dry" | "contacts" | "reading" | "checkup";

const WHO: { key: Who; label: string; sub: string; icon: ServiceIconKey }[] = [
  { key: "child", label: "A child", sub: "Under 18", icon: "baby" },
  { key: "adult", label: "An adult", sub: "18 or older", icon: "eye" },
  { key: "family", label: "The whole family", sub: "A few of us", icon: "stethoscope" },
];

const CONCERN: { key: Concern; label: string; sub: string; icon: ServiceIconKey }[] = [
  { key: "vision", label: "Eyesight getting worse", sub: "Squinting, or stronger glasses each year", icon: "eye" },
  { key: "dry", label: "Dry, burning, tired eyes", sub: "Drops are not enough anymore", icon: "droplets" },
  { key: "contacts", label: "Contacts that never work", sub: "Keratoconus or hard-to-fit", icon: "lens" },
  { key: "reading", label: "Reading, focus, or a concussion", sub: "Struggles at school or after an injury", icon: "stethoscope" },
  { key: "checkup", label: "A routine exam", sub: "Staying on top of eye health", icon: "baby" },
];

type Rec = { title: string; reason: string; slug?: string; interest: string };

function recommend(who: Who, concern: Concern): Rec {
  switch (concern) {
    case "dry":
      return {
        title: "Dry Eye Treatment",
        slug: "dry-eye-treatment",
        interest: "Dry Eye",
        reason:
          "Chronic dry, burning eyes almost always have a treatable cause. A dedicated dry eye evaluation finds yours, instead of masking it.",
      };
    case "contacts":
      return {
        title: "Specialty & Scleral Lenses",
        slug: "specialty-contact-lenses",
        interest: "Specialty & Scleral Lenses",
        reason:
          "Being told contacts will not work usually just means you need a custom lens, and a clinician who fits them.",
      };
    case "reading":
      return who === "adult"
        ? {
            title: "Neuro-Optometric Rehabilitation",
            slug: "neuro-optometric-rehabilitation",
            interest: "Neuro-Optometric Rehabilitation",
            reason:
              "Lingering visual symptoms after a concussion are real and treatable, even when scans come back normal.",
          }
        : {
            title: "Vision Therapy",
            slug: "vision-therapy",
            interest: "Vision Therapy",
            reason:
              "When reading is a struggle despite clear eyesight, the visual skills behind it can be trained.",
          };
    case "vision":
      return who === "child"
        ? {
            title: "Myopia Management",
            slug: "myopia-management",
            interest: "Myopia Management",
            reason:
              "If a child's prescription keeps climbing, we can help slow it, not just keep correcting it.",
          }
        : {
            title: "Comprehensive & Medical Eye Care",
            slug: "medical-eye-care",
            interest: "Comprehensive Eye Exam",
            reason:
              "Let's make sure changing vision is not a health issue, then get you seeing clearly.",
          };
    default:
      return {
        title: "A Comprehensive Family Exam",
        interest: "Comprehensive Eye Exam",
        reason:
          "A thorough, unhurried exam is the best place to start, for everyone in the family.",
      };
  }
}

function OptionTile({
  icon,
  label,
  sub,
  onClick,
  i,
}: {
  icon: ServiceIconKey;
  label: string;
  sub: string;
  onClick: () => void;
  i: number;
}) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${i * 55}ms` }}
      className="group flex animate-in fade-in slide-in-from-bottom-2 items-center gap-4 rounded-2xl border border-line bg-card p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-clay/50 hover:shadow-[0_18px_40px_-24px_rgba(18,60,70,0.45)] focus-visible:border-teal"
    >
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-teal-tint text-teal transition-colors group-hover:bg-teal group-hover:text-bone">
        <ServiceIcon name={icon} className="size-6" />
      </span>
      <span className="flex-1">
        <span className="block font-display text-lg font-medium text-teal">{label}</span>
        <span className="block text-sm text-ink-soft">{sub}</span>
      </span>
      <ArrowRight className="size-5 text-clay opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
    </button>
  );
}

export function CareFinder() {
  const [who, setWho] = useState<Who | null>(null);
  const [concern, setConcern] = useState<Concern | null>(null);
  const step = who && concern ? 2 : who ? 1 : 0;
  const rec = who && concern ? recommend(who, concern) : null;

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-line bg-card p-6 shadow-[0_40px_90px_-50px_rgba(18,60,70,0.5)] md:p-9">
      {/* progress */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((s) => (
            <span
              key={s}
              className={cn(
                "h-1.5 rounded-full transition-all",
                s <= step ? "w-8 bg-teal" : "w-4 bg-line",
              )}
            />
          ))}
        </div>
        {step > 0 && (
          <button
            onClick={() => (step === 2 ? setConcern(null) : setWho(null))}
            className="inline-flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-teal"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
        )}
      </div>

      {step === 0 && (
        <div key="who">
          <p className="eyebrow text-clay">Step 1</p>
          <h3 className="mt-2 font-display text-2xl font-medium text-teal">
            Who needs care?
          </h3>
          <div className="mt-6 grid gap-3">
            {WHO.map((o, i) => (
              <OptionTile
                key={o.key}
                icon={o.icon}
                label={o.label}
                sub={o.sub}
                i={i}
                onClick={() => setWho(o.key)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div key="concern">
          <p className="eyebrow text-clay">Step 2</p>
          <h3 className="mt-2 font-display text-2xl font-medium text-teal">
            What is going on?
          </h3>
          <div className="mt-6 grid gap-3">
            {CONCERN.map((o, i) => (
              <OptionTile
                key={o.key}
                icon={o.icon}
                label={o.label}
                sub={o.sub}
                i={i}
                onClick={() => setConcern(o.key)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && rec && (
        <div key="result" className="animate-in fade-in slide-in-from-bottom-3 duration-500">
          <p className="inline-flex items-center gap-1.5 text-clay">
            <Sparkles className="size-4" aria-hidden />
            <span className="eyebrow">Our recommendation</span>
          </p>
          <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-teal">
            {rec.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{rec.reason}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/book?interest=${encodeURIComponent(rec.interest)}`}
              className={btn({ size: "md" })}
            >
              Request this consult
            </Link>
            {rec.slug && (
              <Link
                href={`/${rec.slug}`}
                className={btn({ variant: "outline", size: "md" })}
              >
                Learn about {rec.title.split(" ")[0]} care
              </Link>
            )}
          </div>
          <button
            onClick={() => {
              setWho(null);
              setConcern(null);
            }}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-teal"
          >
            <RotateCcw className="size-3.5" /> Start over
          </button>
          <p className="mt-4 text-xs text-ink-soft">
            A guide, not a diagnosis. Our doctors confirm the right care at your visit.
          </p>
        </div>
      )}
    </div>
  );
}
