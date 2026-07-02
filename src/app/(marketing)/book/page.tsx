import type { Metadata } from "next";
import { Phone, Clock, MapPin, CalendarCheck } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { ConsultForm } from "@/components/marketing/consult-form";
import { ZocdocButton } from "@/components/site/cta";
import { ReviewStatBadge } from "@/components/site/reviews";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request an Appointment | Riverdell Vision, Oradell NJ",
  description:
    "Request an appointment at Riverdell Vision in Oradell, NJ. Book online, reserve instantly on Zocdoc, or call (201) 265-7900. New and returning patients welcome.",
  alternates: { canonical: "/book" },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>;
}) {
  const { interest } = await searchParams;
  return (
    <section className="bg-bone grain">
      <Container wide className="py-14 md:py-20">
        <div className="max-w-2xl">
          <span className="eyebrow text-clay">Appointments</span>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
            Let&apos;s find the right time for you.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Request an appointment below and our team will reach out within one
            business day. Prefer to book instantly, or talk to a person? Those
            options are here too.
          </p>
          <ReviewStatBadge className="mt-6" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-medium text-ink">
              <CalendarCheck className="size-5 text-teal" aria-hidden />
              Request an appointment
            </h2>
            <ConsultForm defaultInterest={interest} />
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-card p-6">
              <h3 className="font-medium text-ink">Book instantly</h3>
              <p className="mt-1.5 text-sm text-ink-soft">
                See real-time availability and confirm on the spot through our
                Zocdoc profile.
              </p>
              <ZocdocButton className="mt-4 w-full" />
            </div>

            <div className="rounded-2xl border border-line bg-card p-6">
              <h3 className="font-medium text-ink">Prefer to call?</h3>
              <a
                href={practice.phoneHref}
                className="mt-2 inline-flex items-center gap-2 font-display text-2xl font-medium text-teal"
              >
                <Phone className="size-5" aria-hidden />
                {practice.phone}
              </a>
            </div>

            <div className="rounded-2xl border border-line bg-card p-6">
              <h3 className="flex items-center gap-2 font-medium text-ink">
                <Clock className="size-4 text-clay" aria-hidden /> Office hours
              </h3>
              <dl className="mt-3 space-y-1.5 text-sm">
                {practice.hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <dt className="text-ink-soft">{h.day}</dt>
                    <dd className="text-ink">{h.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="rounded-2xl border border-line bg-card p-6">
              <h3 className="flex items-center gap-2 font-medium text-ink">
                <MapPin className="size-4 text-clay" aria-hidden /> Visit us
              </h3>
              <a
                href={practice.maps}
                className="mt-2 block text-sm text-ink-soft hover:text-teal"
              >
                {practice.address.full}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
