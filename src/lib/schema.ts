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
    alternateName: practice.alternateNames,
    description: practice.description,
    url: SITE_URL,
    telephone: practice.phoneHref.replace(/^tel:/, ""),
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
      /* Saturday used to be filtered out, because schema.org cannot express "every
         other week". The effect was that Google and every answer engine were told the
         practice is CLOSED on Saturday, when it is open roughly 26 of them a year, and
         "eye doctor open Saturday Bergen County" is exactly the query a working parent
         types. Between two imperfect statements, the opening pattern is true on the
         weeks it runs and "closed" is never true. The visible page keeps the
         "(alternating)" wording so a human sees the caveat.
         TODO: replace with dated OpeningHoursSpecification entries once Dr. Han
         supplies the actual open Saturday dates, and mirror them into GBP special
         hours. That is the only fully correct answer and it needs his calendar. */
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${h.day}`,
        opens: h.open,
        closes: h.close,
      })),
    sameAs: Object.values(practice.socials),
    medicalSpecialty: "Optometric",
    // Languages spoken across the care team (Dr. Han sees patients in Korean),
    // a real local signal for Bergen County's Korean community.
    knowsLanguage: [...new Set(providers.flatMap((p) => p.languages))],
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
    /* No aggregateRating and no review nodes. Google treats a rating a business places
       on its own site, and one aggregated from another platform, as self-serving: it is
       ineligible for review rich results and at worst draws a manual action. The 5.0 and
       the 4.9 stay in visible page copy, where they convert and where both link out to
       the unfiltered originals. */
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
    knowsAbout: p.focus,
    description: p.short,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: p.credential,
    },
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

const MONTHS: Record<string, string> = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
};

// "June 2026" -> "2026-06". Year-month is valid ISO 8601, so we never fabricate
// a day the owner did not state. Returns undefined if the string is not a
// recognizable "Month YYYY".
export function lastReviewedISO(dateReviewed: string): string | undefined {
  const m = dateReviewed.trim().toLowerCase().match(/^([a-z]+)\s+(\d{4})$/);
  const mm = m ? MONTHS[m[1]] : undefined;
  return mm ? `${m![2]}-${mm}` : undefined;
}

// Resolves a "Dr. Name, CRED" byline to the credentialed physician entity behind
// it, matching the @id the /about page publishes so linked data merges.
function reviewerNode(reviewedBy: string) {
  const p = providers.find((x) => reviewedBy.startsWith(x.name));
  if (!p) return undefined;
  return {
    "@type": "Physician",
    "@id": `${SITE_URL}/about#${p.slug}`,
    name: `${p.name}, ${p.credential}`,
    jobTitle: p.role,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: p.credential,
    },
  };
}

// MedicalWebPage wrapper for a clinician-reviewed service or condition page. Ties
// the visible "Reviewed by ..." byline to a structured, credentialed reviewer and
// a last-reviewed date: the E-E-A-T signal Google weights for medical (YMYL)
// pages and that AI answer engines use to trust a source.
export function medicalWebPageSchema(input: {
  slug: string;
  name: string;
  description: string;
  reviewedBy: string;
  dateReviewed: string;
  aboutType: "MedicalProcedure" | "MedicalCondition";
  aboutName: string;
}) {
  const reviewer = reviewerNode(input.reviewedBy);
  const iso = lastReviewedISO(input.dateReviewed);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}/${input.slug}#webpage`,
    url: `${SITE_URL}/${input.slug}`,
    name: input.name,
    description: input.description,
    about: { "@type": input.aboutType, name: input.aboutName },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": ORG_ID },
    ...(iso ? { lastReviewed: iso } : {}),
    ...(reviewer ? { reviewedBy: reviewer } : {}),
  };
}
