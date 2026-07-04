// JSON-LD structured-data builders. Centralized so entity names, NAP and URLs
// stay identical everywhere (a hard requirement for local SEO + AI answer
// engines that read these graphs to understand the practice).

import { SITE_URL, practice, providers } from "@/lib/site";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews";
import { SERVICES } from "@/lib/services";

const ORG_ID = `${SITE_URL}/#practice`;

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": ORG_ID,
    name: practice.name,
    description: practice.description,
    url: SITE_URL,
    telephone: practice.phone,
    email: practice.email,
    priceRange: "$$",
    image: `${SITE_URL}/images/office-oradell.jpeg`,
    logo: `${SITE_URL}/riverdell-mark.png`,
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
    hasMap: practice.maps,
    areaServed: [
      ...[
        "Oradell",
        "River Edge",
        "Paramus",
        "Emerson",
        "Hackensack",
        "New Milford",
        "Maywood",
        "Bergenfield",
        "Dumont",
        "Westwood",
      ].map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: "Bergen County, NJ" },
    ],
    openingHoursSpecification: practice.hours
      // Saturday is alternating; schema.org cannot express "every other week",
      // so omit it and let the Google Business Profile own the live pattern.
      .filter((h) => h.open && h.close && h.day !== "Saturday")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: Object.values(practice.socials),
    medicalSpecialty: "Optometric",
    employee: providers.map((p) => ({
      "@type": "Physician",
      "@id": `${SITE_URL}/about#${p.slug}`,
      name: `${p.name}, ${p.credential}`,
      jobTitle: p.role,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Eye care services",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "MedicalProcedure",
          name: s.name,
          url: `${SITE_URL}/${s.slug}`,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: REVIEW_STATS.rating.toFixed(1),
      reviewCount: String(REVIEW_STATS.count),
      bestRating: "5",
    },
    review: REVIEWS.slice(0, 6).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
      },
      reviewBody: r.quote,
    })),
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

export function medicalConditionSchema(input: {
  name: string;
  slug: string;
  description: string;
  parentSlug: string;
  parentName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: input.name,
    url: `${SITE_URL}/${input.slug}`,
    description: input.description,
    associatedAnatomy: { "@type": "AnatomicalStructure", name: "Eye" },
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: input.parentName,
      url: `${SITE_URL}/${input.parentSlug}`,
    },
    recognizingAuthority: { "@id": ORG_ID },
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

export function definedTermSetSchema(
  slug: string,
  name: string,
  terms: { term: string; def: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${SITE_URL}/${slug}#glossary`,
    name: `${name} glossary`,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.def,
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

// Per-page local schema for the /areas landing pages: a town-scoped Service
// provided by the practice, so each local page carries an entity that ties the
// service to the town and back to the LocalBusiness graph (closes the gap where
// area pages previously shipped breadcrumb-only markup).
export function localAreaSchema(input: {
  town: string;
  slug: string;
  serviceName: string;
  serviceSlug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${input.serviceName} in ${input.town}, NJ`,
    url: `${SITE_URL}/areas/${input.slug}`,
    serviceType: input.serviceName,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: input.town },
  };
}
