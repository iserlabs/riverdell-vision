"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Interactive "is this you?" self-check. Data-driven from each service's symptom
// list, so every flagship gets a tailored tool with no new copy. Honest: framed
// as a self-check, not a diagnosis; nothing is stored.
export function CandidacyCheck({
  items,
  bookHref,
  shortName,
}: {
  items: string[];
  bookHref: string;
  shortName: string;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  const count = checked.size;

  return (
    <div className="rounded-3xl border border-line bg-card p-6 md:p-8">
      <p className="eyebrow text-clay">Is this you?</p>
      <h3 className="mt-2 font-display text-2xl font-medium text-teal md:text-3xl">
        Check what sounds familiar.
      </h3>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        A quick self-check, not a diagnosis. Tap the ones that apply to you or
        your child. Nothing you select is stored.
      </p>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {items.map((it, i) => {
          const on = checked.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={on}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-[15px] transition-colors",
                  on
                    ? "border-teal bg-teal-tint/50 text-ink"
                    : "border-line bg-bone/40 text-ink-soft hover:border-teal/40",
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                    on ? "border-teal bg-teal text-bone" : "border-line bg-card",
                  )}
                >
                  {on && <Check className="size-3.5" aria-hidden />}
                </span>
                {it}
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="mt-6 rounded-2xl bg-teal-deep p-5 text-bone md:p-6"
      >
        {count > 0 ? (
          <>
            <p className="font-display text-lg font-medium text-bone">
              {count === 1
                ? "That one is worth a closer look."
                : `${count} of these sound like you.`}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-bone/85">
              When these are ongoing, a focused evaluation is the way to get real
              answers. New and returning patients are always welcome.
            </p>
            <div className="mt-4">
              <a
                href={bookHref}
                className={btn({ className: "bg-bone text-teal-deep hover:bg-bone/90" })}
              >
                Request a {shortName.toLowerCase()} consult
              </a>
            </div>
          </>
        ) : (
          <p className="text-sm leading-relaxed text-bone/85">
            Select any that apply and we will suggest a sensible next step.
          </p>
        )}
      </div>
    </div>
  );
}
