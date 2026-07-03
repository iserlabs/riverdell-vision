import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Check } from "lucide-react";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { Breadcrumb } from "@/components/site/breadcrumb";
import { BookButton, CallButton } from "@/components/site/cta";
import { ReviewsGrid } from "@/components/site/reviews";
import { ServiceIcon } from "@/components/site/service-icon";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { breadcrumbSchema } from "@/lib/schema";
import { AREAS, getArea } from "@/lib/areas";
import { SERVICE_LADDER, getService } from "@/lib/services";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    keywords: area.keywords,
    alternates: { canonical: `/areas/${area.slug}` },
    openGraph: { title: area.metaTitle, description: area.metaDescription },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const service = area.serviceSlug ? getService(area.serviceSlug) : undefined;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Areas", path: "/areas" },
          { name: area.h1, path: `/areas/${area.slug}` },
        ])}
      />

      <section className="bg-bone grain">
        <Container wide className="py-14 md:py-20">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "Areas", href: "/areas" },
              { name: area.h1 },
            ]}
          />
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-clay">
              <MapPin className="size-4" aria-hidden />
              <span className="eyebrow">
                {area.town}, {area.region}
              </span>
            </span>
            <h1 className="mt-4 font-display text-4xl font-medium leading-[1.06] text-ink md:text-5xl">
              {area.h1}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              {area.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton />
              <CallButton />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeading eyebrow="Why patients come to us" title={area.angle} />
              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-line bg-bone-deep p-4 text-sm text-ink-soft">
                <MapPin className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden />
                {area.distance}
              </div>
              {service && (
                <Link
                  href={`/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 font-medium text-teal hover:gap-2.5"
                >
                  Learn about {service.name} <ArrowRight className="size-4" />
                </Link>
              )}
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-2xl border border-line bg-card p-7">
                <h3 className="font-medium text-ink">Care available here</h3>
                <ul className="mt-4 grid gap-3">
                  {SERVICE_LADDER.map((s) => (
                    <li key={s.title}>
                      <Link
                        href={s.href}
                        className="flex items-center gap-3 rounded-lg p-2 text-[15px] text-ink transition-colors hover:bg-teal-tint"
                      >
                        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-teal-tint text-teal">
                          <ServiceIcon name={s.icon} className="size-4" />
                        </span>
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <section className="bg-bone-deep">
        <Container wide>
          <Section>
            <Reveal>
              <SectionHeading eyebrow="Trusted locally" title="A 5.0 rating from Bergen County families." />
            </Reveal>
            <div className="mt-10">
              <ReviewsGrid limit={3} />
            </div>
          </Section>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
