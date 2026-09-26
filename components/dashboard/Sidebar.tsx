import Link from "next/link";
import {
  LayoutGrid,
  FolderKanban,
  Scissors,
  Image as ImageIcon,
  Mountain,
  Maximize2,
  Layers,
  Library,
  BarChart3,
  Settings,
  CreditCard,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { initials } from "@/lib/auth";
import type { PublicUser } from "@/lib/auth";

const transformLinks = [
  { label: "Background remover", href: "/dashboard/background-remover", icon: Scissors },
  { label: "AI background", href: "/dashboard/ai-background", icon: ImageIcon },
  { label: "AI scene", href: "/dashboard/ai-scene", icon: Mountain },
  { label: "Smart resize", href: "/dashboard/smart-resize", icon: Maximize2 },
];

export function Sidebar({ user }: { user: PublicUser }) {
  return (
    <aside className="hidden w-[248px] shrink-0 flex-col border-r border-border bg-surface lg:flex">
      <div className="px-5 py-6">
        <Link href="/">
          <Logo size={24} />
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        <div className="space-y-0.5">
          <SidebarLink href="/dashboard" label="Dashboard" icon={LayoutGrid} active />
          <SidebarLink href="/dashboard/projects" label="My projects" icon={FolderKanban} />
        </div>

        <div>
          <p className="px-3 pb-2 text-[0.7rem] font-medium uppercase tracking-wide text-muted/70">
            Transform
          </p>
          <div className="space-y-0.5">
            {transformLinks.map((l) => (
              <SidebarLink key={l.href} {...l} />
            ))}
          </div>
        </div>

        <div className="space-y-0.5">
          <SidebarLink href="/dashboard/bulk" label="Bulk editor" icon={Layers} />
          <SidebarLink href="/dashboard/assets" label="Assets" icon={Library} />
          <SidebarLink href="/dashboard/analytics" label="Analytics" icon={BarChart3} />
        </div>

        <div className="space-y-0.5 border-t border-border pt-4">
          <SidebarLink href="/dashboard/settings" label="Settings" icon={Settings} />
          <SidebarLink href="/dashboard/billing" label="Billing" icon={CreditCard} />
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-teal-tint">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[0.8rem] font-semibold text-white">
            {initials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.87rem] font-medium text-ink">{user.name}</p>
            <p className="truncate text-[0.75rem] text-muted">{user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active = false,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-[0.87rem] transition-colors ${
        active
          ? "bg-teal-tint font-medium text-teal-strong"
          : "text-ink/75 hover:bg-navy/[0.04] hover:text-ink"
      }`}
    >
      <Icon size={17} strokeWidth={1.8} />
      {label}
    </Link>
  );
}
