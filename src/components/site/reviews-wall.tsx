"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { REVIEWS, populatedServices, type ServiceId } from "@/lib/reviews";
import { ReviewCard } from "@/components/site/reviews";
import { cn } from "@/lib/utils";

const INITIAL = 6; // visible before expanding
const PAGE = 12; // batch size once expanded

type Filter = ServiceId | "all";

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active
          ? "border-teal bg-teal text-bone"
          : "border-line bg-card text-ink-soft hover:border-teal/40 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

// Interactive reviews wall: 6 visible, then Show more opens to 12 and beyond up
// to every review, with a specialty filter that appears once expanded.
export function ReviewsWall() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(INITIAL);
  const expanded = visible > INITIAL;

  const chips = useMemo(() => populatedServices(1), []);
  const list = useMemo(
    () =>
      filter === "all"
        ? REVIEWS
        : REVIEWS.filter((r) => r.services.includes(filter)),
    [filter],
  );

  const shown = list.slice(0, visible);
  const remaining = list.length - shown.length;

  function selectFilter(f: Filter) {
    setFilter(f);
    setVisible(PAGE); // stay expanded, show a full page of the filtered set
  }

  function showMore() {
    setVisible((v) => (v === INITIAL ? PAGE : v + PAGE));
  }

  function collapse() {
    setFilter("all");
    setVisible(INITIAL);
  }

  return (
    <div>
      {expanded && (
        <div
          role="group"
          aria-label="Filter reviews by service"
          className="mb-8 flex flex-wrap gap-2"
        >
          <Chip active={filter === "all"} onClick={() => selectFilter("all")}>
            All ({REVIEWS.length})
          </Chip>
          {chips.map((c) => (
            <Chip
              key={c.id}
              active={filter === c.id}
              onClick={() => selectFilter(c.id)}
            >
              {c.label} ({c.count})
            </Chip>
          ))}
        </div>
      )}

      {shown.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-ink-soft">
          No reviews tagged for this service yet.
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-3">
        {remaining > 0 && (
          <button
            type="button"
            onClick={showMore}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-teal px-6 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-teal hover:text-bone md:min-h-0"
          >
            Show more reviews
            <span className="font-normal">({remaining} more)</span>
            <ChevronDown className="size-4" aria-hidden />
          </button>
        )}
        {expanded && remaining <= 0 && (
          <p className="text-sm text-ink-soft">
            Showing all {list.length}
            {filter === "all" ? " featured" : " matching"} reviews
          </p>
        )}
        {expanded && (
          <button
            type="button"
            onClick={collapse}
            className="text-sm text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
}
