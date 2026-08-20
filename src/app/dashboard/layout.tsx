import type { Metadata } from "next";
import { DemoGate } from "@/components/dashboard/gate";
import { DashboardShell } from "@/components/dashboard/shell";

/* A server component purely so it can carry metadata. robots.txt already disallows
   /dashboard, but the page meta said index,follow, and the tag is what Google reads
   if it reaches the URL another way. The gate and shell below stay client. */
export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoGate>
      <DashboardShell>{children}</DashboardShell>
    </DemoGate>
  );
}
