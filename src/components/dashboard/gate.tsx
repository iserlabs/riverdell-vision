"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { btn } from "@/lib/ui";

const KEY = "rv_demo_auth";

// Lightweight demo gate. It is intentionally NOT real authentication: it exists
// so the ops portal feels like a private system in a walkthrough. Production
// uses role-based access control + MFA (owner, doctor, office manager, front
// desk, marketing, read-only lender).
export function DemoGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem(KEY) === "1");
    setReady(true);
  }, []);

  if (!ready) return null;
  if (authed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-deep px-6 text-bone">
      <div className="w-full max-w-sm">
        <div className="flex justify-center">
          <Logo onDark />
        </div>
        <div className="mt-8 rounded-2xl border border-bone/15 bg-bone/5 p-7 backdrop-blur">
          <div className="flex items-center gap-2 text-brass">
            <Lock className="size-4" aria-hidden />
            <span className="eyebrow">Team portal</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-medium">
            Riverdell Vision Operations
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              localStorage.setItem(KEY, "1");
              setAuthed(true);
            }}
            className="mt-6 space-y-3"
          >
            <input
              type="email"
              placeholder="you@riverdellvision.com"
              defaultValue="demo@riverdellvision.com"
              className="w-full rounded-lg border border-bone/20 bg-bone/10 px-3.5 py-2.5 text-sm text-bone outline-none placeholder:text-bone/40 focus:border-brass"
            />
            <input
              type="password"
              placeholder="Password"
              defaultValue="demo"
              className="w-full rounded-lg border border-bone/20 bg-bone/10 px-3.5 py-2.5 text-sm text-bone outline-none placeholder:text-bone/40 focus:border-brass"
            />
            <button
              type="submit"
              className={btn({ className: "w-full bg-bone text-teal-deep hover:bg-bone/90" })}
            >
              Enter dashboard
            </button>
          </form>
          <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-bone/60">
            <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-brass" aria-hidden />
            Demo environment with sample data. Production uses role-based access,
            MFA, audit logging, and a HIPAA-ready backend.
          </p>
        </div>
        <Link
          href="/"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm text-bone/70 hover:text-bone"
        >
          <ArrowLeft className="size-4" /> Back to riverdellvision.com
        </Link>
      </div>
    </div>
  );
}
