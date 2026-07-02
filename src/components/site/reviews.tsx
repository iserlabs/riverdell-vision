import { Star } from "lucide-react";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews";
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

// Dual-source social proof for the hero: real Google + Zocdoc ratings.
export function DualProof({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      <div className="inline-flex items-center gap-2">
        <Stars label={`${REVIEW_STATS.rating} on Google`} />
        <span className="text-sm text-ink">
          <span className="font-semibold">{REVIEW_STATS.rating.toFixed(1)}</span>
          <span className="text-ink-soft"> · {REVIEW_STATS.count} Google reviews</span>
        </span>
      </div>
      <span className="hidden h-4 w-px bg-line sm:block" />
      <div className="inline-flex items-center gap-2">
        <Star className="size-4 fill-brass text-brass" aria-hidden />
        <span className="text-sm text-ink">
          <span className="font-semibold">{REVIEW_STATS.zocdocRating.toFixed(1)}</span>
          <span className="text-ink-soft"> · Zocdoc</span>
        </span>
      </div>
    </div>
  );
}
