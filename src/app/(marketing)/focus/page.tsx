import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/site/primitives";
import { FocusLens } from "@/components/marketing/focus-lens";
import { BookButton, CallButton } from "@/components/site/cta";
import { DualProof } from "@/components/site/reviews";

export const metadata: Metadata = {
  title: "Into Focus",
  description: "A demonstration of the Riverdell Vision signature interaction.",
  robots: { index: false, follow: false },
};

export default function FocusPage() {
  return (
    <Section className="bg-bone grain">
      <Container wide>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>The Riverdell promise</Eyebrow>
          <h1 className="mt-5 font-display text-[2.8rem] font-medium leading-[1.05] text-teal md:text-6xl">
            We bring your family&apos;s world{" "}
            <span className="italic text-clay">into focus.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            This is what uncorrected vision can feel like. Move across the image
            below, and clarity follows you. It is the one thing we do for every
            patient, brought to life.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <FocusLens
            src="/images/hero-care.jpeg"
            alt="A Riverdell Vision optometrist guiding a young child through an eye exam"
          />
        </div>

        <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="text-ink-soft">
            A clearer world is closer than you think. Bring your family in and see
            the difference for yourself.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <BookButton />
            <CallButton />
          </div>
          <DualProof className="justify-center" />
        </div>
      </Container>
    </Section>
  );
}
