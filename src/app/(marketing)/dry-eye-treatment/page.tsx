import type { Metadata } from "next";
import { ServiceView } from "@/components/marketing/service-view";
import { getService } from "@/lib/services";

const service = getService("dry-eye-treatment")!;

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  keywords: service.keywords,
  alternates: { canonical: `/${service.slug}` },
  openGraph: { title: service.metaTitle, description: service.metaDescription },
};

export default function Page() {
  return <ServiceView service={service} />;
}
