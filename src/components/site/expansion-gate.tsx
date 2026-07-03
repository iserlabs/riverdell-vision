"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { btn } from "@/lib/ui";

const KEY = "rv_expansion_auth";
const PASSWORD = "riverdell";

// Soft, client-side gate for the investor data room. It is intentionally NOT
// hardened authentication (the passphrase ships in the bundle); its job is to
// keep the detailed, illustrative expansion material out of the public,
// indexed space and behind a deliberate step. No sensitive data lives here.
export function ExpansionGate({ children }: { children: React.ReactNode }) {
  // { ready } gates the first paint until we've read the browser store, so the
  // server and client agree on markup (no hydration mismatch); a single state
  // object keeps this to one mount-time update.
  const [gate, setGate] = useState({ ready: false, authed: false });
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount read of sessionStorage; deferring to an effect is what keeps SSR markup stable.
    setGate({ ready: true, authed: sessionStorage.getItem(KEY) === "1" });
  }, []);

  if (!gate.ready) return null;
  if (gate.authed) return <>{children}</>;

  return (
    <div className="grain flex min-h-screen items-center justify-center bg-teal-deep px-6 py-16 text-bone">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo onDark />
        </div>
        <div className="mt-8 rounded-2xl border border-bone/15 bg-bone/5 p-7 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-brass">
            <Lock className="size-4" aria-hidden />
            <span className="eyebrow">Expansion brief</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-medium leading-tight">
            Riverdell Vision, Fort Lee expansion
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-bone/70">
            A deeper look for lenders and partners. Enter the passphrase you were
            given to continue.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (value.trim().toLowerCase() === PASSWORD) {
                sessionStorage.setItem(KEY, "1");
                setGate((g) => ({ ...g, authed: true }));
              } else {
                setError(true);
              }
            }}
            className="mt-6 space-y-3"
          >
            <div>
              <label htmlFor="expansion-pass" className="sr-only">
                Passphrase
              </label>
              <input
                id="expansion-pass"
                type="password"
                autoComplete="off"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError(false);
                }}
                aria-invalid={error}
                placeholder="Passphrase"
                className="w-full rounded-lg border border-bone/20 bg-bone/10 px-3.5 py-2.5 text-sm text-bone outline-none placeholder:text-bone/60 focus:border-brass aria-[invalid=true]:border-clay"
              />
              {error && (
                <p role="alert" className="mt-2 text-xs text-clay-soft">
                  That passphrase doesn&apos;t match. Contact the office if you
                  need access.
                </p>
              )}
            </div>
            <button
              type="submit"
              className={btn({ className: "w-full bg-bone text-teal-deep hover:bg-bone/90" })}
            >
              View the brief
            </button>
          </form>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-bone/60">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brass" aria-hidden />
            Figures on the following pages are illustrative unless noted.
            Audited financials are shared privately in diligence.
          </p>
        </div>
        <Link
          href="/growth"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-bone/70 hover:text-bone"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back to the expansion overview
        </Link>
      </div>
    </div>
  );
}
