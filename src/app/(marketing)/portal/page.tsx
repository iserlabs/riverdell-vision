import type { Metadata } from "next";
import {
  CalendarDays,
  Activity,
  Glasses,
  MessageSquare,
  CreditCard,
  Users,
} from "lucide-react";
import { Container, Section } from "@/components/site/primitives";
import { PortalTour } from "@/components/marketing/portal-tour";
import { BookButton } from "@/components/site/cta";

export const metadata: Metadata = {
  title: "Patient Portal (Launching Soon)",
  description:
    "A preview of the Riverdell Vision patient portal: appointments, records and myopia progress, prescriptions and reorders, secure messaging, billing, and one login for the whole family. Launching soon.",
  alternates: { canonical: "/portal" },
  robots: { index: false, follow: true },
};

const FEATURES = [
  { icon: CalendarDays, title: "Appointments & reminders", body: "See upcoming and past visits for everyone, rebook in a tap, never miss a recall." },
  { icon: Activity, title: "Records & myopia progress", body: "Exam results, retinal images, and your child's myopia tracked visit over visit." },
  { icon: Glasses, title: "Prescriptions & reorders", body: "Current glasses and contact-lens Rx, with one-tap reordering and refill status." },
  { icon: MessageSquare, title: "Secure messaging", body: "Reach the care team directly, and get answers without the phone tag." },
  { icon: CreditCard, title: "Billing & insurance", body: "Statements, balances, and the plans you have on file, all in one place." },
  { icon: Users, title: "One login for the family", body: "Children, parents, and grandparents, managed from a single account." },
];

export default function PortalPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bone grain">
        <Container wide className="pt-14 pb-8 text-center md:pt-20">
          <span className="eyebrow text-clay">The Riverdell portal · Launching soon</span>
          <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.05] text-teal md:text-6xl">
            Your family&apos;s whole eye-care story, in one calm place.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            We&apos;re building a secure patient portal so appointments, records,
            prescriptions, and your children&apos;s myopia progress live together,
            for the whole family. Here is a preview of the experience.
          </p>
        </Container>
      </section>

      {/* Interactive tour */}
      <section className="bg-bone-deep">
        <Container wide className="py-12 md:py-16">
          <PortalTour />
        </Container>
      </section>

      {/* What it will do */}
      <Section>
        <Container wide>
          <p className="eyebrow text-clay">What it brings together</p>
          <div className="mt-8 grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-3.5">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-teal-tint text-teal">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-lg font-medium text-teal">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Close */}
      <section className="bg-teal text-bone">
        <Container className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-medium leading-tight text-bone md:text-[2.5rem]">
            Care that already feels this personal.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-bone/90">
            The portal is on its way. In the meantime, booking, records, and your
            care team are only a call or a visit away. Ask us about early access at
            your next appointment.
          </p>
          <BookButton className="bg-bone text-teal-deep hover:bg-bone/90" />
        </Container>
      </section>
    </>
  );
}
