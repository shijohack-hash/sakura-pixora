"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create account.");
        return;
      }
      if (data.requiresEmailConfirmation) {
        // No session yet — Supabase is waiting on email confirmation.
        setNotice(data.message || "Check your inbox to confirm your email before signing in.");
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
      eyebrow="Get started"
      title="Every product photo, studio-ready."
      subtitle="Create a free account to start removing backgrounds, generating scenes, and resizing for every platform."
    >
      <h1 className="text-[1.5rem] font-semibold text-ink">Create your account</h1>
      <p className="mt-1.5 text-[0.9rem] text-muted">
        Already have one?{" "}
        <Link href="/login" className="font-medium text-teal-strong hover:underline">
          Sign in
        </Link>
      </p>

      <form onSubmit={submit} className="mt-7 space-y-4">
        <div>
          <label className="label-sm mb-1.5 block">Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Jordan Lee"
            required
            className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-teal/50"
          />
        </div>
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
            placeholder="At least 8 characters"
            required
            minLength={8}
            className="w-full rounded-md border border-border bg-surface px-3.5 py-2.5 text-[0.9rem] outline-none focus:border-teal/50"
          />
        </div>

        {error && <p className="text-[0.85rem] text-red-600">{error}</p>}
        {notice && <p className="text-[0.85rem] text-teal-strong">{notice}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
          {loading ? <Loader2 size={15} className="animate-spin" /> : null}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-[0.78rem] text-muted">
        By continuing you agree to Pixora&apos;s Terms and Privacy Policy.
      </p>
    </AuthShell>
  );
}
