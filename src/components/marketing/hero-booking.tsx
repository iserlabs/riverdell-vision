import { Phone } from "lucide-react";
import { practice } from "@/lib/site";
import { ZocdocBooking } from "@/components/marketing/zocdoc-booking";

// The hero's right rail.
//
// It answers the one question a visitor actually has at this moment, which is
// whether they can be seen today, and then gets out of the way. It used to be a
// 28-cell month grid of invented availability under the words "Real-time
// availability on Zocdoc"; that came out on 19 August because none of it was
// true, and the seven real opening lines went in.
//
// Those seven lines then became the heaviest object on the page: 613px of table
// beside a 136px headline, so the loudest thing in the hero was a list of office
// hours. Today's line leads now and the week sits under it, quiet.
//
// This rail is where the slideshow of the practice's own rooms goes once the
// photographs exist. Dr. Han chose that composition on 19 August. Until then it
// holds this, and this is genuinely useful rather than a placeholder.

const ZONE = "America/New_York";

export function HeroBooking() {
  // Naming the zone matters: rendered on a UTC server, "today" flips at 8pm
  // Eastern and every visitor is told the wrong day.
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", timeZone: ZONE });
  const line = practice.hours.find((h) => h.day === today);

  return (
    <div className="lg:pl-4">
      <div className="rounded-3xl border border-line bg-card p-6 shadow-[0_30px_70px_-48px_rgba(18,60,70,0.4)] md:p-7">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft">
          Oradell · today
        </p>
        <p className="mt-2 font-display text-2xl font-medium leading-tight text-teal md:text-[1.75rem]">
          {line?.open ? `Open until ${line.label.split(" - ")[1]}` : "Closed today"}
        </p>

        {/* Booking leads, hours support it. The rail's job is to answer "can I be seen"
            and then let them act on it without leaving the page. */}
        <ZocdocBooking className="mt-5" />

        <dl className="mt-6 border-t border-line pt-4">
          {practice.hours.map((h) => {
            const isToday = h.day === today;
            return (
              <div
                key={h.day}
                className={
                  "flex items-baseline justify-between gap-4 py-[0.3rem] text-[0.86rem] " +
                  (isToday ? "font-medium text-ink" : "text-ink-soft")
                }
              >
                <dt>{h.day}</dt>
                <dd className="tabular-nums">{h.label}</dd>
              </div>
            );
          })}
        </dl>

        <a
          href={practice.phoneHref}
          className="-mx-2 mt-5 flex min-h-11 items-center gap-2 rounded-xl px-2 text-[0.95rem] font-medium text-teal transition-colors hover:bg-teal-tint"
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {practice.phone}
        </a>
      </div>
    </div>
  );
}
