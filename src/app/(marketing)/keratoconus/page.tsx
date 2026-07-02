import type { Metadata } from "next";
import { ConditionView } from "@/components/marketing/condition-view";
import { getCondition } from "@/lib/conditions";

const condition = getCondition("keratoconus")!;

export const metadata: Metadata = {
  title: condition.metaTitle,
  description: condition.metaDescription,
  alternates: { canonical: "/keratoconus" },
};

export default function KeratoconusPage() {
  return <ConditionView condition={condition} />;
}
