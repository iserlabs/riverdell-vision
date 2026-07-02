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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none [&_svg]:shrink-0";
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
