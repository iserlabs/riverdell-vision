import type { Metadata } from "next";
import { Star, ArrowUpRight } from "lucide-react";
import { Container, Section, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { ReviewsGrid } from "@/components/site/reviews";
import { CtaBand } from "@/components/site/cta-band";
import { REVIEW_STATS } from "@/lib/reviews";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Patient Reviews | Riverdell Vision, Oradell NJ",
  description:
    "Read why families across Bergen County rate Riverdell Vision 5.0. Thorough exams, honest guidance, and a caring team for myopia, dry eye, specialty lenses, and family eye care.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-bone grain">
        <Container wide className="py-16 text-center md:py-20">
          <Eyebrow>Patient reviews</Eyebrow>
          <div className="mt-5 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-7 fill-brass text-brass" aria-hidden />
            ))}
          </div>
          <p className="mt-4 font-display text-5xl font-medium text-ink">
            {REVIEW_STATS.rating.toFixed(1)}
          </p>
          <p className="mt-2 text-lg text-ink-soft">
            across {REVIEW_STATS.count}+ verified reviews on Google and Zocdoc
          </p>
          <a
            href={practice.socials.google}
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-teal hover:gap-2.5"
          >
            Read and leave a review on Google
            <ArrowUpRight className="size-4" />
          </a>
        </Container>
      </section>

      <Section>
        <Container wide>
          <Reveal>
            <ReviewsGrid limit={6} />
          </Reveal>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-ink-soft">
            Representative reviews reflecting themes patients share on our public
            profiles. In keeping with patient privacy, we never confirm patient
            status or treatment details in public replies.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
