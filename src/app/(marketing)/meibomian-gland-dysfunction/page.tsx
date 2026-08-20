import type { Metadata } from "next";
import { ConditionView } from "@/components/marketing/condition-view";
import { getCondition } from "@/lib/conditions";
import { buildOg } from "@/lib/og";

const condition = getCondition("meibomian-gland-dysfunction")!;

export const metadata: Metadata = {
  title: condition.metaTitle,
  description: condition.metaDescription,
  alternates: { canonical: "/meibomian-gland-dysfunction" },
  /* Its own social card. These are the pages a cornea specialist forwards to a patient,
     and they were posting a generic homepage preview. */
  openGraph: buildOg({
    title: condition.metaTitle,
    description: condition.metaDescription,
    path: "/meibomian-gland-dysfunction",
  }),
};

export default function MgdPage() {
  return <ConditionView condition={condition} />;
}
