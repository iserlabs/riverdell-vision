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
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        fill="none"
      >
        <circle
          cx="20"
          cy="20"
          r="16.5"
          stroke="currentColor"
          strokeWidth="1.75"
          className="opacity-90"
        />
        <ellipse cx="20" cy="20" r="0" />
        <path
          d="M6.5 20c4-6.5 9-9.75 13.5-9.75S29.5 13.5 33.5 20c-4 6.5-9 9.75-13.5 9.75S10.5 26.5 6.5 20Z"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-55"
        />
        <circle cx="20" cy="20" r="4.75" fill="currentColor" />
        <circle cx="31.5" cy="8.5" r="3" className="fill-clay" />
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
