import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Riverdell Vision lockup. The mark keeps the original "orbit + eye" idea from
 * the practice's existing logo (equity/continuity) but rebuilt cleanly in the
 * new brand: a lens ring, a solid pupil in the current text color, and a warm
 * clay accent dot. The wordmark pairs Fraunces (display) with a tracked label.
 */
export function Logo({
  className,
  markOnly = false,
}: {
  className?: string;
  markOnly?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Riverdell Vision home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 44 44"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <path
          d="M4 22C9.5 13 15.5 9 22 9s12.5 4 18 13c-5.5 9-11.5 13-18 13S9.5 31 4 22Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="22" r="7.6" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="22" cy="22" r="3" className="fill-clay" />
      </svg>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.35rem] font-medium tracking-[-0.02em]">
            Riverdell
          </span>
          <span className="mt-[3px] font-mono text-[0.58rem] font-medium uppercase tracking-[0.34em] opacity-70">
            Vision
          </span>
        </span>
      )}
    </Link>
  );
}
