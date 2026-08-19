import type { Metadata } from "next";
import { TypePicker } from "@/components/choose/type-picker";

export const metadata: Metadata = {
  title: "Choose the display typeface",
  robots: { index: false, follow: false },
};

export default function ChooseTypePage() {
  return <TypePicker />;
}
