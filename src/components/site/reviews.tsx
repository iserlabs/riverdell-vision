import { Star, ArrowUpRight } from "lucide-react";
import {
  REVIEWS,
  REVIEW_STATS,
  primaryServiceLabel,
  type Review,
} from "@/lib/reviews";
import { practice } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Stars({ label, className }: { label?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Rated 5 out of 5 stars"}
      className={cn("flex gap-0.5", className)}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-brass text-brass" aria-hidden />
      ))}
    </div>
  );
}

// Source-platform marks, shown in each review card so the origin of every
// review is clear (real Google + Zocdoc, never mixed up).
export function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.87z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.11 0-5.75-2.1-6.69-4.94H1.3v3.09A11.99 11.99 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.31 14.31A7.2 7.2 0 0 1 4.93 12c0-.8.14-1.58.38-2.31V6.6H1.3A11.99 11.99 0 0 0 0 12c0 1.94.46 3.77 1.3 5.4l4.01-3.09z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.79l3.43-3.43C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.3 6.6l4.01 3.09C6.25 6.85 8.89 4.75 12 4.75z" />
    </svg>
  );
}

export function ZocdocMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="5" fill="#1773E6" />
      <text
        x="12"
        y="17.5"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
        fill="#ffffff"
      >
        z
      </text>
    </svg>
  );
}

function SourceLockup({ source }: { source: Review["source"] }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {source === "Google" ? (
        <GoogleG className="size-3.5" />
      ) : (
        <ZocdocMark className="size-3.5" />
      )}
      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft">
        {source}
      </span>
    </span>
  );
}

// Single review card, shared by the static grid and the interactive wall so the
// source mark and specialty tag are consistent everywhere.
export function ReviewCard({
  review,
  className,
}: {
  review: Review;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-line bg-card p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars />
        <span className="font-mono text-[0.6rem] uppercase tracking-wider text-clay">
          {primaryServiceLabel(review)}
        </span>
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
        {review.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm">
        <span className="font-medium text-ink">{review.name}</span>
        <SourceLockup source={review.source} />
      </figcaption>
    </figure>
  );
}

// Static grid, used where a fixed small set is shown (locations, area pages).
export function ReviewsGrid({ limit = 6 }: { limit?: number }) {
  const items = REVIEWS.slice(0, limit);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <ReviewCard
          key={`${r.name}-${i}`}
          review={r}
          className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}
        />
      ))}
    </div>
  );
}

export function ReviewStatBadge({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Stars />
      <span className="text-sm font-medium text-ink">
        {REVIEW_STATS.rating.toFixed(1)}
        <span className="text-ink-soft"> · {REVIEW_STATS.count} Google reviews</span>
      </span>
    </div>
  );
}

// Dual-source social proof for the hero: real Google + Zocdoc ratings, each a
// clear link out to the actual profile.
export function DualProof({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      <a
        href={practice.socials.google}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read our ${REVIEW_STATS.count} Google reviews (opens Google)`}
        className="group -my-3 inline-flex items-center gap-2 py-3 text-sm text-ink transition-colors hover:text-teal md:my-0 md:py-0"
      >
        <Stars label={`${REVIEW_STATS.rating} on Google`} />
        <span>
          <span className="font-semibold">{REVIEW_STATS.rating.toFixed(1)}</span>
          <span className="text-ink-soft group-hover:text-teal"> · </span>
          <span className="underline decoration-line decoration-1 underline-offset-4 group-hover:decoration-teal">
            {REVIEW_STATS.count} Google reviews
          </span>
        </span>
        <ArrowUpRight className="size-3.5 shrink-0 text-clay transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </a>
      <span className="hidden h-4 w-px bg-line sm:block" />
      <a
        href={practice.zocdocUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="See our Zocdoc reviews and book (opens Zocdoc)"
        className="group -my-3 inline-flex items-center gap-2 py-3 text-sm text-ink transition-colors hover:text-teal md:my-0 md:py-0"
      >
        <Star className="size-4 fill-brass text-brass" aria-hidden />
        <span>
          <span className="font-semibold">{REVIEW_STATS.zocdocRating.toFixed(1)}</span>
          <span className="text-ink-soft group-hover:text-teal"> · </span>
          <span className="underline decoration-line decoration-1 underline-offset-4 group-hover:decoration-teal">
            {REVIEW_STATS.zocdocCount} Zocdoc reviews
          </span>
        </span>
        <ArrowUpRight className="size-3.5 shrink-0 text-clay transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  );
}
