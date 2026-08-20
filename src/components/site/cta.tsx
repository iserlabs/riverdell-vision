import Link from "next/link";
import { Phone, CalendarCheck, ArrowUpRight } from "lucide-react";
import { btn } from "@/lib/ui";
import { practice, CONTACT_CTA } from "@/lib/site";

type Size = "sm" | "md" | "lg";

export function BookButton({
  className,
  size = "lg",
  label,
  href,
}: {
  className?: string;
  size?: Size;
  label?: string;
  href?: string;
}) {
  const to = href ?? CONTACT_CTA.book;
  // The label follows the destination, never the default. A caller that passes an
  // internal href wants the request form, and a button reading "Book on Zocdoc"
  // that lands on our own form is the kind of small lie this site has been
  // clearing out all week.
  const internal = to.startsWith("/");
  // The primary action is Zocdoc now, which is somebody else's site. Leaving a
  // patient's tab on a third party mid-booking loses the practice, so external
  // destinations open alongside rather than replace.
  const external = /^https?:\/\//.test(to);

  return (
    <Link
      href={to}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={btn({ variant: "primary", size, className })}
    >
      <CalendarCheck className="size-4" aria-hidden />
      {label ?? (internal ? CONTACT_CTA.requestFormLabel : CONTACT_CTA.bookLabel)}
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
