"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TYPE_OPTIONS, fontHref, type TypeOption } from "@/lib/type-options";

// The picker drives the real homepage in an iframe rather than a specimen row.
// A face behaves differently in a real headline over real spacing than it does
// in a row of sample words, and that difference is what the last three renders
// were rejected on. Same origin, so the stylesheet and the variable override go
// straight into the iframe document.
//
// Chrome follows the PLFA FlowSwitcher: one thin row, small pills, tiny tracked
// label, translucent over the work. It is an instrument sitting on the page, not
// a second panel competing with it. Everything secondary (the note, the
// confirmation) stays out of the bar until it is asked for.

const STORAGE_KEY = "riverdell.type.pick";

function applyFace(doc: Document, option: TypeOption) {
  const id = `type-pick-font-${option.id}`;
  if (!doc.getElementById(id)) {
    const link = doc.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = fontHref(option);
    doc.head.appendChild(link);
  }
  let style = doc.getElementById("type-pick-override") as HTMLStyleElement | null;
  if (!style) {
    style = doc.createElement("style");
    style.id = "type-pick-override";
    doc.head.appendChild(style);
  }
  // Newsreader is the incumbent and is already the built value, so it resets
  // rather than overriding, which also proves the override is doing the work.
  style.textContent = option.incumbent
    ? ""
    : `:root{--font-display:"${option.family}",Georgia,serif}`;
}

type Result =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; picked: string }
  | { state: "failed"; picked: string; error: string };

export function TypePicker() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const restored = useRef(false);
  const [active, setActive] = useState<TypeOption>(TYPE_OPTIONS[0]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const paint = useCallback((option: TypeOption) => {
    const doc = frameRef.current?.contentDocument;
    if (doc) applyFace(doc, option);
  }, []);

  useEffect(() => {
    if (ready) paint(active);
  }, [ready, active, paint]);

  function choose(option: TypeOption) {
    setActive(option);
    setResult({ state: "idle" });
    setConfirming(false);
    window.localStorage.setItem(STORAGE_KEY, option.id);
  }

  async function send() {
    setResult({ state: "sending" });
    try {
      const res = await fetch("/api/type-pick", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: active.id, note }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setResult({ state: "sent", picked: data.picked });
      else
        setResult({
          state: "failed",
          picked: data.picked ?? active.family,
          error: data.error ?? "That did not go through.",
        });
    } catch {
      setResult({
        state: "failed",
        picked: active.family,
        error: "That did not go through. Copy the line below and send it to Jake.",
      });
    }
  }

  const handoff = `Riverdell display typeface: ${active.family}${note ? `. Note: ${note}` : ""}`;
  const pill =
    "flex min-h-11 shrink-0 items-center rounded-full px-3 text-[0.82rem] transition-colors";

  return (
    <div className="fixed inset-0 bg-[#0d1417]">
      <iframe
        ref={frameRef}
        src="/"
        title="Riverdell Vision homepage preview"
        className="h-full w-full border-0 bg-white"
        onLoad={() => {
          let next = active;
          if (!restored.current) {
            restored.current = true;
            const saved = window.localStorage.getItem(STORAGE_KEY);
            const found = saved ? TYPE_OPTIONS.find((o) => o.id === saved) : undefined;
            if (found) {
              next = found;
              setActive(found);
            }
          }
          setReady(true);
          paint(next);
        }}
      />

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-3 left-1/2 flex min-h-11 -translate-x-1/2 items-center rounded-full border border-white/15 bg-[#0d1417]/70 px-4 text-[0.78rem] text-white/85 backdrop-blur-xl"
        >
          Typeface · {active.family}
        </button>
      ) : (
        <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0d1417]/70 text-white backdrop-blur-xl">
          <div className="flex items-center gap-3 px-3 py-2 sm:px-5">
            <p className="hidden shrink-0 text-[0.62rem] uppercase tracking-[0.2em] text-white/45 lg:block">
              Display type
            </p>

            <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
              {TYPE_OPTIONS.map((o) => {
                const on = o.id === active.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => choose(o)}
                    aria-pressed={on}
                    title={o.note}
                    className={
                      pill +
                      (on
                        ? " bg-white text-[#0d1417]"
                        : " text-white/65 hover:bg-white/10 hover:text-white")
                    }
                    style={{ fontFamily: `"${o.family}", Georgia, serif` }}
                  >
                    {o.family}
                    {o.incumbent ? (
                      <span className={"ml-1.5 text-[0.6rem] " + (on ? "text-[#0d1417]/50" : "text-white/35")}>
                        live
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setConfirming((v) => !v)}
              className={pill + " border border-white/20 text-white/85 hover:bg-white/10"}
            >
              Lock in
            </button>
            <button
              onClick={() => setOpen(false)}
              aria-label="Hide the typeface bar"
              className="flex min-h-11 shrink-0 items-center px-1.5 text-white/40 hover:text-white"
            >
              ✕
            </button>
          </div>

          {confirming && result.state !== "sent" ? (
            <div className="flex flex-col gap-2 border-t border-white/10 px-3 py-2 sm:flex-row sm:items-center sm:px-5">
              <p className="shrink-0 text-[0.8rem] text-white/60">{active.family}</p>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Anything to add (optional)"
                className="min-h-11 w-full flex-1 rounded-full border border-white/15 bg-transparent px-3 text-[0.82rem] text-white placeholder:text-white/35"
              />
              <button
                onClick={send}
                disabled={result.state === "sending"}
                className={pill + " bg-white text-[#0d1417] disabled:opacity-60"}
              >
                {result.state === "sending" ? "Sending" : "Send to Jake"}
              </button>
            </div>
          ) : null}

          {result.state === "sent" ? (
            <p className="border-t border-white/10 px-3 py-2 text-[0.8rem] text-white/75 sm:px-5">
              Locked in: {result.picked}. Jake has been told.
            </p>
          ) : null}

          {result.state === "failed" ? (
            <div className="border-t border-white/10 px-3 py-2 sm:px-5">
              <p className="text-[0.8rem] text-white/75">{result.error}</p>
              <p className="mt-1.5 select-all font-mono text-[0.78rem] text-white">{handoff}</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
