import { Container } from "@/components/site/primitives";
import { BookButton, CallButton, ZocdocButton } from "@/components/site/cta";

export function CtaBand({
  title = "Ready when you are.",
  sub = "Request an appointment online, book instantly on Zocdoc, or call the office. New and returning patients are always welcome.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="bg-teal text-bone">
      <Container className="flex flex-col items-center gap-7 py-16 text-center md:py-20">
        <h2 className="max-w-2xl text-balance text-3xl font-medium leading-tight text-bone md:text-[2.5rem]">
          {title}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-bone/80">{sub}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <BookButton className="bg-bone text-teal-deep hover:bg-bone/90" />
          <ZocdocButton className="border border-bone/30 bg-transparent text-bone hover:bg-bone/10" />
          <CallButton className="border-bone/40 bg-transparent text-bone hover:bg-bone/10" />
        </div>
      </Container>
    </section>
  );
}
