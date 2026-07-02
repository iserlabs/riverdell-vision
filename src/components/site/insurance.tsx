import { insurers } from "@/lib/site";
import { cn } from "@/lib/utils";

export function InsuranceRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5", className)}>
      {insurers.map((name) => (
        <span
          key={name}
          className="rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink-soft"
        >
          {name}
        </span>
      ))}
    </div>
  );
}
