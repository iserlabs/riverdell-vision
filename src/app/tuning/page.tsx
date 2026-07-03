import type { Metadata } from "next";
import { TuningBoard } from "@/components/marketing/tuning-board";

// Internal, unlinked craft-direction board. Kept out of search + the sitemap.
export const metadata: Metadata = {
  title: "Craft tuning board",
  robots: { index: false, follow: false },
  alternates: { canonical: undefined },
};

export default function TuningPage() {
  return <TuningBoard />;
}
