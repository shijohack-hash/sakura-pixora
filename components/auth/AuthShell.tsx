import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Scissors, ImageIcon, Maximize2 } from "lucide-react";

const points = [
  { icon: Scissors, text: "Remove backgrounds with a single click" },
  { icon: ImageIcon, text: "Generate studio and lifestyle scenes with AI" },
  { icon: Maximize2, text: "Export perfectly sized assets for every platform" },
];

export function AuthShell({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy px-12 py-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 400px at 15% 10%, rgba(14,122,115,0.35), transparent), radial-gradient(500px 500px at 85% 90%, rgba(127,169,142,0.25), transparent)",
          }}
        />
        <Link href="/" className="relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
              <div className="h-3 w-3 rounded-sm bg-teal" />
            </div>
            <span className="font-display text-[1.15rem] font-semibold tracking-tight">Pixora</span>
          </div>
        </Link>

        <div className="relative z-10 max-w-md">
          <p className="text-[0.8rem] font-medium uppercase tracking-wide text-white/50">{eyebrow}</p>
          <h2 className="mt-3 text-[2rem] font-semibold leading-tight">{title}</h2>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-white/70">{subtitle}</p>

          <div className="mt-10 space-y-4">
            {points.map((p) => (
              <div key={p.text} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <p.icon size={15} strokeWidth={1.8} />
                </div>
                <span className="text-[0.9rem] text-white/85">{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[0.78rem] text-white/40">
          © {new Date().getFullYear()} Pixora. Built on Cloudinary&apos;s media pipeline.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <Logo size={24} />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
