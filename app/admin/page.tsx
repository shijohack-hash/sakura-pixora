"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo size={26} />
          <div className="flex items-center gap-1.5 text-[0.8rem] text-muted">
            <ShieldCheck size={14} /> Admin access
          </div>
        </div>

        <form onSubmit={submit} className="card p-7">
          <label className="label-sm mb-1.5 block">Admin password</label>
          <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-3 py-2.5 focus-within:border-teal/50">
            <Lock size={15} className="text-muted" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoFocus
              className="w-full bg-transparent text-[0.9rem] outline-none"
            />
          </div>
          {error && <p className="mt-2 text-[0.82rem] text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary mt-5 w-full">
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-[0.78rem] text-muted">
          Restricted area. Access is logged.
        </p>
      </div>
    </div>
  );
}
