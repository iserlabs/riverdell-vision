import type { Metadata } from "next";
import { ConditionView } from "@/components/marketing/condition-view";
import { getCondition } from "@/lib/conditions";

const condition = getCondition("meibomian-gland-dysfunction")!;

export const metadata: Metadata = {
  title: condition.metaTitle,
  description: condition.metaDescription,
  alternates: { canonical: "/meibomian-gland-dysfunction" },
};

export default function MgdPage() {
  return <ConditionView condition={condition} />;
}
