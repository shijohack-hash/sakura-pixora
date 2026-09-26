import { redirect } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserMenu } from "@/components/dashboard/UserMenu";
import { getCurrentUser } from "@/lib/auth";
import { Bell, Search } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar user={user} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-3.5 lg:px-8">
          <div className="hidden max-w-sm flex-1 items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 sm:flex">
            <Search size={15} className="text-muted" strokeWidth={1.8} />
            <input
              placeholder="Search projects and assets"
              className="w-full bg-transparent text-[0.85rem] outline-none placeholder:text-muted"
            />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <button
              aria-label="Notifications"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink/70 hover:bg-navy/[0.05]"
            >
              <Bell size={17} strokeWidth={1.8} />
            </button>
            <UserMenu name={user.name} email={user.email} />
          </div>
        </header>
        <main className="flex-1 px-6 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}

