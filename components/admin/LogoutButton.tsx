"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };
  return (
    <button onClick={logout} className="btn-ghost">
      <LogOut size={14} /> Log out
    </button>
  );
}
