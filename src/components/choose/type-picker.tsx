"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TYPE_OPTIONS, fontHref, type TypeOption } from "@/lib/type-options";

// The picker drives the real homepage in an iframe rather than a specimen.
// A typeface looks different in a headline over a photograph than it does in a
// row of sample words, and the last three renders were rejected on exactly that
// difference. Same origin, so the stylesheet and the variable override go
// straight into the iframe document.

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

export function TypePicker() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const restored = useRef(false);
  const [active, setActive] = useState<TypeOption>(TYPE_OPTIONS[0]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [note, setNote] = useState("");
  const [result, setResult] = useState<
    { state: "idle" } | { state: "sending" } | { state: "sent"; picked: string } | { state: "failed"; picked: string; error: string }
  >({ state: "idle" });

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
    window.localStorage.setItem(STORAGE_KEY, option.id);
  }

  async function lockIn() {
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

  return (
    <div className="fixed inset-0 flex flex-col bg-[#0f1a1e]">
      <iframe
        ref={frameRef}
        src="/"
        title="Riverdell Vision homepage preview"
        className="min-h-0 w-full flex-1 border-0 bg-white"
        onLoad={() => {
          // Restoring here rather than in an effect: the iframe load is the
          // event that makes a restored pick paintable, and setting state from
          // an effect on mount is both a lint error and a wasted render.
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
          className="fixed bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[#0f1a1e] px-5 py-3 text-sm font-medium text-white shadow-lg ring-1 ring-white/20"
        >
          Choose the typeface · {active.family}
        </button>
      ) : (
        <div className="shrink-0 border-t border-white/15 bg-[#0f1a1e] text-white">
          <div className="flex items-center justify-between gap-4 px-4 pt-3 sm:px-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/55">
              Display typeface · {TYPE_OPTIONS.length} to choose from
            </p>
            <button
              onClick={() => setOpen(false)}
              className="min-h-11 rounded-md px-3 text-sm text-white/70 hover:text-white"
            >
              Hide
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            {TYPE_OPTIONS.map((o) => {
              const on = o.id === active.id;
              return (
                <button
                  key={o.id}
                  onClick={() => choose(o)}
                  aria-pressed={on}
                  className={
                    "min-h-11 shrink-0 rounded-xl border px-4 py-2 text-left transition-colors " +
                    (on ? "border-white bg-white text-[#0f1a1e]" : "border-white/25 text-white hover:border-white/60")
                  }
                >
                  <span className="block text-lg leading-tight" style={{ fontFamily: `"${o.family}", Georgia, serif` }}>
                    {o.family}
                  </span>
                  <span className={"block text-[0.68rem] " + (on ? "text-[#0f1a1e]/65" : "text-white/50")}>
                    {o.incumbent ? "Already live" : "Alternative"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
            <p className="min-w-0 flex-1 text-sm text-white/70">{active.note}</p>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything you want to say about it (optional)"
              className="min-h-11 w-full rounded-lg border border-white/25 bg-transparent px-3 text-sm text-white placeholder:text-white/40 sm:w-72"
            />
            <button
              onClick={lockIn}
              disabled={result.state === "sending"}
              className="min-h-11 shrink-0 rounded-lg bg-white px-5 text-sm font-medium text-[#0f1a1e] disabled:opacity-60"
            >
              {result.state === "sending" ? "Sending…" : "Lock this one in"}
            </button>
          </div>

          {result.state === "sent" ? (
            <p className="px-4 pb-4 text-sm text-white sm:px-6">
              Locked in: {result.picked}. Jake has been told.
            </p>
          ) : null}

          {result.state === "failed" ? (
            <div className="px-4 pb-4 sm:px-6">
              <p className="text-sm text-white">{result.error}</p>
              <p className="mt-2 select-all rounded-lg border border-white/25 px-3 py-2 font-mono text-sm text-white">
                {handoff}
              </p>
            </div>
          ) : null}

          {!ready ? <p className="px-4 pb-4 text-sm text-white/50 sm:px-6">Loading the page…</p> : null}
        </div>
      )}
    </div>
  );
}
