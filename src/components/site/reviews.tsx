import { Star } from "lucide-react";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews";
import { cn } from "@/lib/utils";

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
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
          <Stars />
          <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
            “{r.quote}”
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
            <span>
              <span className="font-medium text-ink">{r.name}</span>
              <span className="block text-xs text-ink-soft">{r.location}</span>
            </span>
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
        <span className="text-ink-soft">
          {" "}
          across {REVIEW_STATS.count}+ reviews
        </span>
      </span>
    </div>
  );
}
