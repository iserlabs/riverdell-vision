import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// The practice's real Riverdell Vision logo (trimmed, transparent). On dark
// surfaces it sits in a white chip so it stays legible everywhere.
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Riverdell Vision home"
      className={cn("inline-flex items-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center",
          onDark && "rounded-md bg-white px-3 py-2",
        )}
      >
        <Image
          src="/riverdell-logo.png"
          alt="Riverdell Vision"
          width={160}
          height={33}
          priority
          className="h-7 w-auto md:h-8"
        />
      </span>
    </Link>
  );
}
