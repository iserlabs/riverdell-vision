"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  TrendingUp,
  RotateCcw,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/site/logo";
import { resetDemo } from "@/lib/demo-store";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/pipeline", label: "Pipelines", icon: KanbanSquare },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/growth", label: "Growth snapshot", icon: TrendingUp },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-bone-deep text-ink">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col justify-between bg-teal-deep px-4 py-6 text-bone md:flex print:hidden">
        <div>
          <div className="px-2">
            <Logo onDark />
          </div>
          <p className="mt-1 px-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-brass">
            Operations
          </p>
          <nav className="mt-8 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-bone/12 text-bone"
                    : "text-bone/65 hover:bg-bone/8 hover:text-bone",
                )}
              >
                <item.icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-bone/15 pt-4 text-sm">
          <button
            onClick={() => {
              if (confirm("Reset demo data to the seeded sample set?")) resetDemo();
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-bone/65 transition-colors hover:bg-bone/8 hover:text-bone"
          >
            <RotateCcw className="size-4" aria-hidden /> Reset demo data
          </button>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-bone/65 transition-colors hover:bg-bone/8 hover:text-bone"
          >
            <ExternalLink className="size-4" aria-hidden /> View website
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("rv_demo_auth");
              location.reload();
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-bone/65 transition-colors hover:bg-bone/8 hover:text-bone"
          >
            <LogOut className="size-4" aria-hidden /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className="flex w-full flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-bone/90 backdrop-blur md:hidden print:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Logo className="text-teal-deep" />
            <span className="rounded-full bg-teal-tint px-2.5 py-1 text-xs font-medium text-teal-deep">
              Demo
            </span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium",
                  isActive(item.href, item.exact)
                    ? "bg-teal text-bone"
                    : "text-ink-soft",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
