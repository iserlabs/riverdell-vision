import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { JsonLd } from "@/components/site/json-ld";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  );
}
