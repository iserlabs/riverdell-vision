// Merge-safe Open Graph helper. Per Next.js metadata docs, `openGraph` objects
// are shallowly merged across segments: a page-level `openGraph` REPLACES the
// root layout's wholesale rather than merging field-by-field, silently dropping
// og:type, og:url, og:site_name, and (since the page doesn't request its own
// `images`) og:image, which the root `opengraph-image` route otherwise supplies.
// Every page that needs a custom OG title/description must build its full
// openGraph block through this helper instead of writing a bare
// `{ title, description }` object, so those fields keep shipping.

import { practice, SITE_URL } from "@/lib/site";

export function buildOg(input: { title: string; description: string; path: string }) {
  return {
    type: "website" as const,
    siteName: practice.name,
    locale: "en_US",
    url: input.path,
    title: input.title,
    description: input.description,
    images: [`${SITE_URL}/opengraph-image`],
  };
}
