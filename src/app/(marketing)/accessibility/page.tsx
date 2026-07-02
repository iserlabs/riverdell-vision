import type { Metadata } from "next";
import { Container } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Riverdell Vision is committed to an accessible website that meets WCAG 2.2 AA.",
  alternates: { canonical: "/accessibility" },
  robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
  return (
    <Container className="py-16 md:py-24">
      <article className="max-w-2xl">
        <p className="eyebrow text-clay">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink">
          Accessibility Statement
        </h1>
        <p className="mt-6 leading-relaxed text-ink-soft">
          Riverdell Vision is committed to making this website usable for everyone,
          including people who rely on assistive technology. Rather than a bolt-on
          overlay, accessibility is built into the site itself.
        </p>

        {[
          {
            h: "Our standard",
            p: "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. This includes semantic structure, meaningful text alternatives for images, sufficient color contrast, visible keyboard focus, full keyboard operability, and support for reduced-motion preferences.",
          },
          {
            h: "Ongoing work",
            p: "Accessibility is not a one-time task. We review new pages and features against these standards and correct issues as we find them.",
          },
          {
            h: "Need help or found a problem?",
            p: "If you have trouble accessing any part of this site, or need information in another format, please call us at (201) 265-7900 or email hello@riverdellvision.com and we will help promptly.",
          },
        ].map((s) => (
          <section key={s.h} className="mt-8">
            <h2 className="font-display text-xl font-medium text-ink">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{s.p}</p>
          </section>
        ))}
      </article>
    </Container>
  );
}
