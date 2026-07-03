"use client";

import { useMemo, useState } from "react";
import { Eye, Droplet } from "lucide-react";

// Interactive craft-direction board. Renders the real Riverdell hero, service
// ladder, and a card under selectable typography + depth options, so the owner
// can lock an elevated direction and copy the combo back. Uses the real brand
// fonts (font-display = Newsreader, body = Hanken, font-mono = Geist Mono) and
// tokens (teal, clay, brass, bone, card, line, ink). No new fonts or colors:
// the elevation is scale, weight, tracking, case, hierarchy, and surface depth.

const DISPLAY = [
  { id: "A1", label: "Current", note: "measured, warm", size: "clamp(3.1rem,6vw,4.1rem)", leading: "1.04", accent: "1" },
  { id: "A2", label: "Grander + tighter", note: "assured, cinematic", size: "clamp(3.6rem,7vw,4.75rem)", leading: "1.02", accent: "1" },
  { id: "A3", label: "Editorial contrast", note: "expressive italic", size: "clamp(3.3rem,6.5vw,4.35rem)", leading: "1.06", accent: "1.18" },
] as const;

const EYEBROW = [
  { id: "B1", label: "Mono label", note: "current" },
  { id: "B2", label: "Ruled label", note: "editorial rule" },
  { id: "B3", label: "Serif small-caps", note: "warmer, bespoke" },
] as const;

const SURFACE = [
  { id: "C1", label: "Flat card", note: "current" },
  { id: "C2", label: "Layered depth", note: "grain + long shadow" },
  { id: "C3", label: "Editorial paper", note: "inset ruled frame" },
] as const;

const RHYTHM = [
  { id: "D1", label: "Plain band", note: "current" },
  { id: "D2", label: "Hairline + numeral", note: "indexed" },
  { id: "D3", label: "Deep-tone break", note: "dark on light" },
] as const;

const WEIGHT = [450, 500, 550];
const TRACKING = [-0.01, -0.02, -0.03];
const HUE = [
  { k: "clay", v: "var(--clay)" },
  { k: "brass", v: "var(--brass)" },
  { k: "teal", v: "var(--teal)" },
];
const MEASURE = [34, 40, 46];
const LEADING = [1.55, 1.65, 1.75];
const DIVIDER = [1, 1.5, 2];

const LEAD =
  "The warmth of a boutique practice with the rigor of real medicine. Physician-led family eye care for every age, in the heart of Oradell.";

const SERVICES = [
  { icon: Eye, title: "Myopia Management", blurb: "Slow a child's worsening nearsightedness with Ortho-K, multifocal contacts, or atropine." },
  { icon: Droplet, title: "Dry Eye Treatment", blurb: "Find and treat the cause of chronic burning, gritty, watery eyes, not just cover the symptoms." },
];

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function TuningBoard() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);
  const [e1, setE1] = useState(1); // weight index -> 500
  const [e2, setE2] = useState(0); // tracking
  const [e3, setE3] = useState(0); // hue
  const [e4, setE4] = useState(1); // measure
  const [e5, setE5] = useState(1); // leading
  const [e6, setE6] = useState(0); // divider

  const combo = useMemo(
    () =>
      [
        DISPLAY[a].id,
        EYEBROW[b].id,
        SURFACE[c].id,
        RHYTHM[d].id,
        `E1:${WEIGHT[e1]}`,
        `E2:${TRACKING[e2]}`,
        `E3:${HUE[e3].k}`,
        `E4:${MEASURE[e4]}rem`,
        `E5:${LEADING[e5]}`,
        `E6:${DIVIDER[e6]}px`,
      ].join(" · "),
    [a, b, c, d, e1, e2, e3, e4, e5, e6],
  );

  const [copied, setCopied] = useState(false);
  function copy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(combo).catch(() => {});
    }
    setCopied(true);
  }

  const vars = {
    "--disp-size": DISPLAY[a].size,
    "--disp-weight": String(WEIGHT[e1]),
    "--disp-tracking": `${TRACKING[e2]}em`,
    "--disp-leading": DISPLAY[a].leading,
    "--accent-scale": DISPLAY[a].accent,
    "--accent-color": HUE[e3].v,
    "--measure": `${MEASURE[e4]}rem`,
    "--body-leading": String(LEADING[e5]),
    "--divider-w": `${DIVIDER[e6]}px`,
  } as React.CSSProperties;

  // Surface classes per depth option.
  const cardBase = "rounded-2xl p-6 md:p-7";
  const cardSurface =
    c === 0
      ? "border border-line bg-card shadow-[0_18px_50px_-30px_rgba(18,60,70,0.35)]"
      : c === 1
        ? "grain border border-line bg-card shadow-[0_40px_90px_-42px_rgba(18,60,70,0.55)] ring-1 ring-inset ring-white/50"
        : "bg-bone shadow-[0_2px_0_var(--card)] [outline:1px_solid_var(--line)] [outline-offset:6px] border border-line";

  const inverted = d === 2;

  return (
    <div className="min-h-screen bg-bone text-ink">
      {/* Board header */}
      <header className="border-b border-line bg-card/70 px-6 py-5 backdrop-blur-sm">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-clay">
          Riverdell Vision
        </p>
        <h1 className="mt-1 font-display text-2xl font-medium text-teal">
          Craft tuning board
        </h1>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          Tap an option in each group to restyle the real samples on the left.
          Fine-tune with the dial-ins, then copy your combo back to me.
        </p>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LIVE SAMPLES */}
        <div style={vars} className="space-y-10 lg:sticky lg:top-6 lg:self-start">
          {/* Hero sample */}
          <section
            className={cx(
              "overflow-hidden rounded-2xl p-7 md:p-9",
              inverted ? "bg-teal text-bone" : "bg-bone grain",
            )}
          >
            <SectionMarker rhythm={d} label="Hero" numeral="00" inverted={inverted} />
            <Eyebrow variant={b} inverted={inverted} />
            <h2
              className={cx(
                "mt-5 max-w-2xl font-display",
                inverted ? "text-bone" : "text-teal",
              )}
              style={{
                fontSize: "var(--disp-size)",
                fontWeight: "var(--disp-weight)" as unknown as number,
                letterSpacing: "var(--disp-tracking)",
                lineHeight: "var(--disp-leading)",
              }}
            >
              Eye care that&apos;s{" "}
              <em
                className="not-italic"
                style={{
                  fontStyle: "italic",
                  color: inverted ? "var(--brass)" : "var(--accent-color)",
                  fontSize: "calc(1em * var(--accent-scale))",
                }}
              >
                actually medicine.
              </em>{" "}
              Not a frame shop in a lab coat.
            </h2>
            <p
              className={cx("mt-6 text-lg", inverted ? "text-bone/85" : "text-ink-soft")}
              style={{ maxWidth: "var(--measure)", lineHeight: "var(--body-leading)" }}
            >
              {LEAD}
            </p>
          </section>

          {/* Service ladder sample */}
          <section
            className={cx(
              "rounded-2xl p-7 md:p-9",
              inverted ? "bg-teal text-bone" : "bg-card",
            )}
          >
            <SectionMarker rhythm={d} label="Care" numeral="01" inverted={inverted} />
            <div className="mt-2 divide-y divide-line">
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className="grid grid-cols-[auto_auto_1fr] items-center gap-5 py-6">
                    <span
                      className={cx(
                        "w-10 font-display text-3xl tabular-nums md:w-14 md:text-4xl",
                        inverted ? "text-bone/70" : "text-teal/80",
                      )}
                      style={{ fontWeight: "var(--disp-weight)" as unknown as number, letterSpacing: "var(--disp-tracking)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cx(
                        "inline-flex size-9 shrink-0 items-center justify-center rounded-lg",
                        inverted ? "bg-bone/15 text-bone" : "bg-teal-tint text-teal",
                      )}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={cx("font-display text-xl md:text-2xl", inverted ? "text-bone" : "text-teal")}
                        style={{ fontWeight: "var(--disp-weight)" as unknown as number }}
                      >
                        {s.title}
                      </h3>
                      <p
                        className={cx("mt-1.5 text-[15px]", inverted ? "text-bone/80" : "text-ink-soft")}
                        style={{ lineHeight: "var(--body-leading)" }}
                      >
                        {s.blurb}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Card / surface sample */}
          <section>
            <SectionMarker rhythm={d} label="Surface" numeral="02" inverted={false} />
            <div className={cx(cardBase, cardSurface, "mt-2 max-w-md")}>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-clay">
                The Oradell Studio
              </p>
              <h3 className="mt-2 font-display text-2xl font-medium text-teal">
                A calmer kind of eye care
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {["FCOVD-led vision care", "In-house specialty lab", "Unhurried, one-to-one exams", "Seen in English and Korean"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-clay" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* CONTROLS */}
        <div className="space-y-7">
          <Group title="A / Headline" hint="Newsreader display treatment" opts={DISPLAY} active={a} onPick={setA} />
          <Group title="B / Eyebrow" hint="section label style" opts={EYEBROW} active={b} onPick={setB} />
          <Group title="C / Surface depth" hint="cards + panels" opts={SURFACE} active={c} onPick={setC} />
          <Group title="D / Section rhythm" hint="dividers + tone" opts={RHYTHM} active={d} onPick={setD} />

          <div className="rounded-2xl border border-line bg-card p-5">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-clay">Dial-ins</p>
            <div className="mt-4 space-y-4">
              <Dial label="E1 weight" values={WEIGHT} active={e1} onPick={setE1} fmt={(v) => String(v)} />
              <Dial label="E2 tracking" values={TRACKING} active={e2} onPick={setE2} fmt={(v) => `${v}em`} />
              <Dial label="E3 accent" values={HUE.map((h) => h.k)} active={e3} onPick={setE3} fmt={(v) => String(v)} />
              <Dial label="E4 measure" values={MEASURE} active={e4} onPick={setE4} fmt={(v) => `${v}rem`} />
              <Dial label="E5 body leading" values={LEADING} active={e5} onPick={setE5} fmt={(v) => String(v)} />
              <Dial label="E6 divider" values={DIVIDER} active={e6} onPick={setE6} fmt={(v) => `${v}px`} />
            </div>
          </div>

          <div className="rounded-2xl border border-teal/30 bg-teal-tint/60 p-5">
            <p className="font-mono text-[0.72rem] text-teal">{combo}</p>
            <button
              onClick={copy}
              className="mt-4 inline-flex h-11 items-center justify-center rounded-xl bg-teal px-5 text-sm font-medium text-bone transition-colors hover:bg-teal-deep"
            >
              {copied ? "Copied to clipboard" : "Copy my selections"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ variant, inverted }: { variant: number; inverted: boolean }) {
  const tone = inverted ? "text-bone/70" : "text-clay";
  if (variant === 1) {
    return (
      <div className="flex items-center gap-3">
        <span className={cx("font-mono text-[0.62rem] uppercase tracking-[0.18em]", tone)}>
          Family optometry
        </span>
        <span className={cx("h-px flex-1", inverted ? "bg-bone/30" : "bg-line")} />
        <span className={cx("font-mono text-[0.62rem] uppercase tracking-[0.18em]", tone)}>
          Oradell, NJ
        </span>
      </div>
    );
  }
  if (variant === 2) {
    return (
      <span
        className={cx("font-display text-sm uppercase", inverted ? "text-bone/80" : "text-teal")}
        style={{ letterSpacing: "0.16em", fontWeight: 500 }}
      >
        Family optometry, Oradell New Jersey
      </span>
    );
  }
  return (
    <span className={cx("font-mono text-[0.62rem] uppercase tracking-[0.18em]", tone)}>
      Family optometry / Oradell, New Jersey
    </span>
  );
}

function SectionMarker({
  rhythm,
  label,
  numeral,
  inverted,
}: {
  rhythm: number;
  label: string;
  numeral: string;
  inverted: boolean;
}) {
  if (rhythm === 1) {
    return (
      <div className="mb-5 flex items-center gap-4" style={{ borderTop: "var(--divider-w) solid var(--line)", paddingTop: "1rem" }}>
        <span className={cx("font-display text-lg tabular-nums", inverted ? "text-bone/70" : "text-teal/70")}>{numeral}</span>
        <span className={cx("font-mono text-[0.6rem] uppercase tracking-[0.16em]", inverted ? "text-bone/60" : "text-ink-soft")}>{label}</span>
      </div>
    );
  }
  return (
    <span className={cx("font-mono text-[0.58rem] uppercase tracking-[0.16em]", inverted ? "text-bone/55" : "text-ink-soft/70")}>
      {label}
    </span>
  );
}

function Group<T extends { id: string; label: string; note: string }>({
  title,
  hint,
  opts,
  active,
  onPick,
}: {
  title: string;
  hint: string;
  opts: readonly T[];
  active: number;
  onPick: (i: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="font-display text-lg font-medium text-teal">{title}</p>
        <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink-soft">{hint}</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {opts.map((o, i) => {
          const on = i === active;
          return (
            <button
              key={o.id}
              data-choice={o.id}
              onClick={() => onPick(i)}
              className={cx(
                "rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
                on ? "selected border-teal bg-teal-tint" : "border-line bg-card hover:border-teal/40",
              )}
            >
              <span className="flex items-center gap-1.5">
                <span className={cx("font-mono text-[0.6rem]", on ? "text-teal" : "text-clay")}>{o.id}</span>
                {on && <span className="font-mono text-[0.55rem] uppercase tracking-wide text-teal">now</span>}
              </span>
              <span className="mt-1 block text-sm font-medium text-ink">{o.label}</span>
              <span className="block text-[0.72rem] text-ink-soft">{o.note}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Dial({
  label,
  values,
  active,
  onPick,
  fmt,
}: {
  label: string;
  values: (number | string)[];
  active: number;
  onPick: (i: number) => void;
  fmt: (v: number | string) => string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink-soft">{label}</span>
      <div className="flex gap-1.5">
        {values.map((v, i) => {
          const on = i === active;
          return (
            <button
              key={String(v)}
              onClick={() => onPick(i)}
              className={cx(
                "rounded-md border px-2.5 py-1 font-mono text-[0.68rem] transition-colors",
                on ? "border-teal bg-teal text-bone" : "border-line bg-bone text-ink hover:border-teal/40",
              )}
            >
              {fmt(v)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
