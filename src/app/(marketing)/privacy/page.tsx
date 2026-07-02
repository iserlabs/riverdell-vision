import type { Metadata } from "next";
import { Container } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Riverdell Vision handles website information and protects patient privacy.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 md:py-24">
      <article className="prose-riverdell max-w-2xl">
        <p className="eyebrow text-clay">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-medium text-ink">Privacy Policy</h1>
        <p className="mt-6 leading-relaxed text-ink-soft">
          Riverdell Vision respects your privacy. This policy explains how we handle
          information collected through this website. It is a summary for the website
          and does not replace the Notice of Privacy Practices you receive as a
          patient.
        </p>

        {[
          {
            h: "Information this website collects",
            p: "Our appointment-request and waitlist forms collect only the details we need to contact you: your name, email, phone, preferred contact method, and the type of care you are interested in. We ask you not to include medical or symptom details in website forms.",
          },
          {
            h: "How we use it",
            p: "We use the information you submit solely to respond to your request, schedule your visit, and follow up about your care or the services you asked about. We do not sell your information.",
          },
          {
            h: "Protected health information",
            p: "Any protected health information you share with us as a patient is handled in accordance with HIPAA and our Notice of Privacy Practices. We do not place advertising or analytics trackers on appointment, intake, or patient-facing pages.",
          },
          {
            h: "Analytics",
            p: "We may use privacy-conscious, aggregate website analytics to understand general traffic and improve the site. These do not include protected health information.",
          },
          {
            h: "Contact",
            p: "Questions about this policy can be directed to hello@riverdellvision.com or (201) 265-7900.",
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
