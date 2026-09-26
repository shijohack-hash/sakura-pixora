import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/adminAuth";
import { LogoutButton } from "@/components/admin/LogoutButton";
import {
  Users, ImageIcon, Scissors, Wand2, HardDrive, CheckCircle2, XCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!isValidAdminToken(token)) {
    redirect("/admin");
  }

  const cloudinaryReady = Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );

  const stats = [
    { label: "Registered users", value: "1", icon: Users, note: "single-admin demo" },
    { label: "Uploads processed", value: "—", icon: ImageIcon, note: "no database yet" },
    { label: "Backgrounds removed", value: "—", icon: Scissors, note: "no database yet" },
    { label: "AI generations", value: "—", icon: Wand2, note: "no database yet" },
  ];

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4 lg:px-8">
        <div>
          <h1 className="text-[1.15rem] font-semibold text-ink">Admin dashboard</h1>
          <p className="text-[0.8rem] text-muted">Signed in as admin</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost">Back to app</Link>
          <LogoutButton />
        </div>
      </header>

      <main className="mx-auto max-w-content px-6 py-8 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
                <s.icon size={16} strokeWidth={1.8} />
              </div>
              <div className="mt-3 text-[1.4rem] font-semibold text-ink">{s.value}</div>
              <div className="text-[0.83rem] text-muted">{s.label}</div>
              <div className="mt-1 text-[0.72rem] text-muted/70">{s.note}</div>
            </div>
          ))}
        </section>

        <section className="card mt-6 p-6">
          <h2 className="mb-4 text-[0.95rem] font-semibold text-ink">System status</h2>
          <div className="flex flex-col gap-3 text-[0.88rem]">
            <StatusRow
              label="Cloudinary connection"
              ok={cloudinaryReady}
              detail={cloudinaryReady ? "Credentials loaded from .env.local" : "Missing CLOUDINARY_* environment variables"}
            />
            <StatusRow
              label="Admin authentication"
              ok
              detail="Password-protected, session cookie is httpOnly"
            />
            <StatusRow
              label="Persistent database"
              ok={false}
              detail="Not connected — usage stats above are placeholders, not real counts"
            />
          </div>
        </section>

        <section className="card mt-6 p-6">
          <div className="flex items-center gap-2 text-[0.85rem] text-muted">
            <HardDrive size={15} />
            <span>
              To track real uploads, users, and usage, connect a database (e.g. Postgres) and log each
              API call in <code className="rounded bg-teal-tint px-1.5 py-0.5 text-teal-strong">/api/upload</code>,{" "}
              <code className="rounded bg-teal-tint px-1.5 py-0.5 text-teal-strong">/api/resize</code>,{" "}
              <code className="rounded bg-teal-tint px-1.5 py-0.5 text-teal-strong">/api/remove-background</code>, and{" "}
              <code className="rounded bg-teal-tint px-1.5 py-0.5 text-teal-strong">/api/generate-assets</code>.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

function StatusRow({ label, ok, detail }: { label: string; ok: boolean; detail: string }) {
  return (
    <div className="flex items-start gap-2.5">
      {ok ? (
        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-teal-strong" />
      ) : (
        <XCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
      )}
      <div>
        <div className="font-medium text-ink">{label}</div>
        <div className="text-[0.8rem] text-muted">{detail}</div>
      </div>
    </div>
  );
}
