// JSON-LD structured-data builders. Centralized so entity names, NAP and URLs
// stay identical everywhere (a hard requirement for local SEO + AI answer
// engines that read these graphs to understand the practice).

import { SITE_URL, practice, providers } from "@/lib/site";

const ORG_ID = `${SITE_URL}/#practice`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Optometric", "LocalBusiness"],
    "@id": ORG_ID,
    name: practice.name,
    description: practice.description,
    url: SITE_URL,
    telephone: practice.phone,
    email: practice.email,
    priceRange: "$$",
    image: `${SITE_URL}/images/office-oradell.jpeg`,
    logo: `${SITE_URL}/icon.svg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: practice.address.street,
      addressLocality: practice.address.city,
      addressRegion: practice.address.region,
      postalCode: practice.address.postal,
      addressCountry: practice.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: practice.geo.lat,
      longitude: practice.geo.lng,
    },
    areaServed: [
      "Oradell",
      "River Edge",
      "Paramus",
      "Emerson",
      "Fort Lee",
      "Bergen County",
    ].map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: practice.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: Object.values(practice.socials),
    medicalSpecialty: "Optometric",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "146",
      bestRating: "5",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: practice.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

export function physicianSchema(slug: string) {
  const p = providers.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/about#${p.slug}`,
    name: `${p.name}, ${p.credential}`,
    jobTitle: p.role,
    image: `${SITE_URL}${p.photo}`,
    medicalSpecialty: "Optometric",
    knowsLanguage: p.languages,
    worksFor: { "@id": ORG_ID },
    memberOf: { "@id": ORG_ID },
  };
}

export function serviceSchema(input: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: input.name,
    url: `${SITE_URL}/${input.slug}`,
    description: input.description,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Bergen County, NJ" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
