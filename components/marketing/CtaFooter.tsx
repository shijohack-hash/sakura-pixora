import Link from "next/link";
import { Logo } from "@/components/Logo";

export function CtaFooter() {
  return (
    <>
      <section className="mx-auto max-w-content px-6 py-24 text-center">
        <h2 className="mx-auto max-w-[24ch] text-[2.1rem] font-semibold leading-tight">
          Your next product shoot is one upload away.
        </h2>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/signup" className="btn-primary px-7 py-3 text-[1rem]">
            Get started free
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-content flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo size={22} />
          <p className="text-sm text-muted">
            Built for Pixels to Products — Cloudinary AI Hackathon 2026.
          </p>
        </div>
      </footer>
    </>
  );
}
