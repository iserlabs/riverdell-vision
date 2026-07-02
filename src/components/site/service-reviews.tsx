import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { ReviewCard } from "@/components/site/reviews";
import { REVIEWS, reviewsForSlug, type Review } from "@/lib/reviews";

// Reviews for a single service page. Auto-matched by the review's service tag.
// When a service has at least three tagged reviews we show those (up to six)
// under a service-specific heading. When it has fewer, we honestly fall back to
// general practice reviews under a neutral heading, never claiming a general
// review is about that specific service.
export function ServiceReviews({
  slug,
  shortName,
}: {
  slug: string;
  shortName: string;
}) {
  const matched = reviewsForSlug(slug);
  const enough = matched.length >= 3;

  let items: Review[];
  let title: string;
  if (enough) {
    items = matched.slice(0, 6);
    title = `What patients say about ${shortName}`;
  } else {
    const general = REVIEWS.filter(
      (r) => r.services.includes("comprehensive") && !matched.includes(r),
    );
    items = [...matched, ...general].slice(0, 4);
    title = "What our patients say";
  }

  if (items.length === 0) return null;

  return (
    <section className="bg-bone">
      <Container wide>
        <Section>
          <Reveal>
            <SectionHeading eyebrow="In patients' words" title={title} />
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} review={r} />
            ))}
          </div>
        </Section>
      </Container>
    </section>
  );
}
