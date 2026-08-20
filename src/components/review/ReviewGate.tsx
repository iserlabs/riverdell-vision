import dynamic from "next/dynamic";
import { reviewAuthed } from "@/lib/review-auth";

/**
 * The door. A server component, so the auth check happens before any Review Mode
 * code is referenced: an ordinary patient gets nothing, and never downloads the
 * bundle. Ported from PLFA, where the same rule applied.
 */
const ReviewMode = dynamic(() => import("./ReviewMode"));

export default async function ReviewGate() {
  if (!(await reviewAuthed())) return null;
  return <ReviewMode reviewerName="Dr. Han" />;
}
