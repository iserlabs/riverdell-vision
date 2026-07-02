import Image from "next/image";
import { cn } from "@/lib/utils";

// Renders a real headshot when available, otherwise an on-brand initials tile.
// Lets us feature a doctor before their photo file is in hand.
export function DoctorPhoto({
  photo,
  name,
  sizes,
  className,
}: {
  photo?: string;
  name: string;
  sizes?: string;
  className?: string;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        fill
        sizes={sizes}
        className={cn("object-cover object-top", className)}
      />
    );
  }
  const initials = name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 3)
    .join("");
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-teal-tint font-display text-3xl font-medium text-teal",
        className,
      )}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
