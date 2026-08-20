import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

// Button-as-link class helper. Used on <Link>/<a> so we get full control of the
// premium CTA sizing without fighting a component library's polymorphism API.
export function btn(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { variant = "primary", size = "lg", className } = opts ?? {};
/* The focus ring is a box-shadow, and Windows High Contrast strips box-shadows,
     so `outline-none` left the primary CTA with no focus indicator at all in forced
     colors while every other control kept its system outline. The ring stays for the
     normal case; the outline is restored when forced colors are active. Also enumerated
     off `transition-all`, which was animating layout properties on every state change. */
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background forced-colors:focus-visible:outline forced-colors:focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0";
  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-[15px]",
    lg: "h-12 px-6 text-[15px]",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-teal text-bone hover:bg-teal-deep shadow-sm shadow-ink/10",
    outline: "border border-ink/20 text-ink hover:bg-ink/5",
    secondary: "bg-teal-tint text-teal-deep hover:bg-teal-tint/70",
    ghost: "text-ink hover:bg-ink/5",
  };
  return cn(base, sizes[size], variants[variant], className);
}
