import Link from "next/link";
import { Scissors, ImageIcon, Mountain, Maximize2, Layers } from "lucide-react";

const actions = [
  { label: "Remove background", href: "/dashboard/background-remover", icon: Scissors },
  { label: "AI background", href: "/dashboard/ai-background", icon: ImageIcon },
  { label: "AI scene", href: "/dashboard/ai-scene", icon: Mountain },
  { label: "Smart resize", href: "/dashboard/smart-resize", icon: Maximize2 },
  { label: "Bulk processing", href: "/dashboard/bulk", icon: Layers },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {actions.map((a) => (
        <Link
          key={a.label}
          href={a.href}
          className="card group flex flex-col items-start gap-4 p-5 hover:border-teal/40 hover:shadow-raised"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
            <a.icon size={18} strokeWidth={1.8} />
          </div>
          <span className="text-[0.87rem] font-medium leading-snug text-ink">
            {a.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
