import { Eye, Droplets, CircleDot, Baby, Stethoscope, Glasses } from "lucide-react";
import { cn } from "@/lib/utils";

const MAP = {
  eye: Eye,
  droplets: Droplets,
  lens: CircleDot,
  baby: Baby,
  stethoscope: Stethoscope,
  glasses: Glasses,
} as const;

export type ServiceIconKey = keyof typeof MAP;

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  const Icon = MAP[name];
  return <Icon className={cn("size-5", className)} aria-hidden />;
}
