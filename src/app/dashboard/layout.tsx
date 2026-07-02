"use client";

import { DemoGate } from "@/components/dashboard/gate";
import { DashboardShell } from "@/components/dashboard/shell";

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
