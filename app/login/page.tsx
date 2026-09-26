"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Pick up right where you left off."
      subtitle="Sign in to access your projects, generated scenes, and export history."
    >
      <h1 className="text-[1.5rem] font-semibold text-ink">Sign in</h1>
      <p className="mt-1.5 text-[0.9rem] text-muted">
        New to Pixora?{" "}
        <Link href="/signup" className="font-medium text-teal-strong hover:underline">
          Create an account
        </Link>
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <div>
          <label className="label-sm mb-1.5 block">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            required
            className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-teal/50"
          />
        </div>
        <div>
          <label className="label-sm mb-1.5 block">Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Your password"
            required
            className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-teal/50"
          />
        </div>

        {error && <p className="text-[0.85rem] text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
          {loading ? <Loader2 size={15} className="animate-spin" /> : null}
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  );
}
