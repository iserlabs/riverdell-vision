import {
  Stethoscope,
  BadgeCheck,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Container } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

// Sitewide risk-reversal strip. Lowers the perceived risk of booking a medical
// visit (cost, upsell pressure, wasted time) at the moments anxiety peaks:
// the home page, every service page, and the booking page.
const REASSURANCES = [
  { icon: Stethoscope, label: "Physician-led care" },
  { icon: BadgeCheck, label: "No upselling, ever" },
  { icon: ShieldCheck, label: "Insurance checked in advance" },
  { icon: HeartHandshake, label: "Second opinions welcome" },
];

export function ReassuranceBar({ className }: { className?: string }) {
  return (
    <section className={cn("border-y border-line bg-bone-deep", className)}>
      <Container wide>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 py-5 md:flex md:items-center md:justify-between">
          {REASSURANCES.map((t) => (
            <li key={t.label} className="flex items-center gap-2 text-sm text-ink">
              <t.icon className="size-4 text-teal" aria-hidden />
              {t.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
