import Link from "next/link";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { StorageWidget, ProTipCard } from "@/components/dashboard/SideWidgets";

const recentProjects = [
  {
    name: "Summer Collection",
    count: 18,
    updated: "2h ago",
    thumb: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Watch Campaign",
    count: 9,
    updated: "yesterday",
    thumb: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Perfume Launch",
    count: 12,
    updated: "2 days ago",
    thumb: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Sneaker Campaign",
    count: 24,
    updated: "4 days ago",
    thumb: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500&auto=format&fit=crop",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-content">
      <div className="mb-8">
        <h1 className="text-[1.6rem] font-semibold text-ink">Welcome back, Shijo 👋</h1>
        <p className="mt-1 text-[0.95rem] text-muted">Let&apos;s create something amazing today.</p>
      </div>

      <section className="mb-10">
        <h2 className="mb-3 text-[0.87rem] font-semibold text-ink">Quick actions</h2>
        <QuickActions />
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[0.87rem] font-semibold text-ink">Recent projects</h2>
            <Link href="/dashboard/projects" className="text-[0.83rem] font-medium text-teal-strong hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {recentProjects.map((p) => (
              <ProjectCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <StorageWidget />
          <ProTipCard />
        </aside>
      </div>
    </div>
  );
}
