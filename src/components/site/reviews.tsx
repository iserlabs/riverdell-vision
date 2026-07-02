import { Star, ArrowUpRight } from "lucide-react";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews";
import { practice } from "@/lib/site";
import { cn } from "@/lib/utils";

function Stars({ label }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Rated 5 out of 5 stars"}
      className="flex gap-0.5"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-brass text-brass" aria-hidden />
      ))}
    </div>
  );
}

export function ReviewsGrid({ limit = 6 }: { limit?: number }) {
  const items = REVIEWS.slice(0, limit);
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((r, i) => (
        <figure
          key={i}
          className={cn(
            "flex h-full flex-col rounded-2xl border border-line bg-card p-6",
            i === 0 && "sm:col-span-2 lg:col-span-1",
          )}
        >
          <div className="flex items-center justify-between">
            <Stars />
            {r.tag && (
              <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink-soft">
                {r.tag}
              </span>
            )}
          </div>
          <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
            {r.quote}
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span className="font-medium text-ink">{r.name}</span>
            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-soft">
              {r.source}
            </span>
          </figcaption>
        </figure>
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
        className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-teal"
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
        className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-teal"
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
