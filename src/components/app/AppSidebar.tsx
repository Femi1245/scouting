"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  Calendar,
  Inbox,
  LayoutDashboard,
  Mail,
  Megaphone,
  Radar,
  Settings,
  Sparkles,
  Target,
  Users,
  Plug,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/agent", label: "AI Agent", icon: Bot },
  { href: "/app/opportunities", label: "Opportunities", icon: Sparkles },
  { href: "/app/scouts", label: "Scouts", icon: Radar },
  { href: "/app/companies", label: "Companies", icon: Building2 },
  { href: "/app/contacts", label: "Contacts", icon: Users },
  { href: "/app/outreach", label: "Outreach", icon: Mail },
  { href: "/app/inbox", label: "Inbox", icon: Inbox },
  { href: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/app/meetings", label: "Meetings", icon: Calendar },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/integrations", label: "Integrations", icon: Plug },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      <div className="flex h-14 items-center gap-2 border-b border-[var(--border)] px-4">
        <Target className="h-5 w-5 text-[var(--accent)]" />
        <span className="font-semibold tracking-tight">Zumelia Scout</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {nav.map((item) => {
          const active =
            item.href === "/app"
              ? pathname === "/app"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-[var(--surface-2)] font-medium text-[var(--ink)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-2)]/70 hover:text-[var(--ink)]",
              )}
            >
              <Icon className="h-4 w-4 shrink-0 opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[var(--border)] p-3 text-xs text-[var(--muted)]">
        <div className="flex items-center gap-1.5">
          <Activity className="h-3.5 w-3.5" />
          Agent activity logged
        </div>
      </div>
    </aside>
  );
}
