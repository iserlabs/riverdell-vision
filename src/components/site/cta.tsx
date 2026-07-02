import Link from "next/link";
import { Phone, CalendarCheck, ArrowUpRight } from "lucide-react";
import { btn } from "@/lib/ui";
import { practice, CONTACT_CTA } from "@/lib/site";

type Size = "sm" | "md" | "lg";

export function BookButton({
  className,
  size = "lg",
  label,
}: {
  className?: string;
  size?: Size;
  label?: string;
}) {
  return (
    <Link
      href={CONTACT_CTA.book}
      className={btn({ variant: "primary", size, className })}
    >
      <CalendarCheck className="size-4" aria-hidden />
      {label ?? CONTACT_CTA.bookLabel}
    </Link>
  );
}

export function CallButton({
  className,
  size = "lg",
  showNumber = true,
}: {
  className?: string;
  size?: Size;
  showNumber?: boolean;
}) {
  return (
    <a
      href={practice.phoneHref}
      className={btn({ variant: "outline", size, className })}
    >
      <Phone className="size-4" aria-hidden />
      {showNumber ? practice.phone : "Call the office"}
    </a>
  );
}

export function ZocdocButton({
  className,
  size = "lg",
}: {
  className?: string;
  size?: Size;
}) {
  return (
    <a
      href={practice.zocdocUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={btn({ variant: "secondary", size, className })}
    >
      Book on Zocdoc
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}
