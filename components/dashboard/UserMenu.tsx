"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ChevronDown } from "lucide-react";
import { initials } from "@/lib/userDisplay";

export function UserMenu({ name, email }: { name: string; email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-navy/[0.05]"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-[0.75rem] font-semibold text-white">
          {initials(name)}
        </div>
        <ChevronDown size={14} className="text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-56 rounded-lg border border-border bg-surface py-1.5 shadow-lg">
          <div className="border-b border-border px-3.5 py-2.5">
            <p className="truncate text-[0.85rem] font-medium text-ink">{name}</p>
            <p className="truncate text-[0.75rem] text-muted">{email}</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[0.85rem] text-ink/80 hover:bg-navy/[0.04]"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}
