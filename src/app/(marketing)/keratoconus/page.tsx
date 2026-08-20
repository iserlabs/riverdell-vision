import type { Metadata } from "next";
import { ConditionView } from "@/components/marketing/condition-view";
import { getCondition } from "@/lib/conditions";
import { buildOg } from "@/lib/og";

const condition = getCondition("keratoconus")!;

export const metadata: Metadata = {
  title: condition.metaTitle,
  description: condition.metaDescription,
  alternates: { canonical: "/keratoconus" },
  /* Its own social card. These are the pages a cornea specialist forwards to a patient,
     and they were posting a generic homepage preview. */
  openGraph: buildOg({
    title: condition.metaTitle,
    description: condition.metaDescription,
    path: "/keratoconus",
  }),
};

export default function KeratoconusPage() {
  return <ConditionView condition={condition} />;
}
