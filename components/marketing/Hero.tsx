import Link from "next/link";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-content items-center gap-12 px-6 pb-20 pt-14 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-20">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          <span className="text-[0.8rem] font-medium text-muted">Built with Cloudinary</span>
        </div>

        <h1 className="text-[2.75rem] leading-[1.05] font-semibold text-ink sm:text-[3.4rem]">
          Transform one image into endless possibilities.
        </h1>

        <p className="mt-6 max-w-[46ch] text-[1.1rem] leading-relaxed text-muted">
          Remove backgrounds, generate scenes, and resize for every platform.
          Pixora turns a single product photo into a complete marketing asset
          kit in seconds.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/signup" className="btn-primary px-6 py-3 text-[1rem]">
            Get started free
          </Link>
          <a href="#workflow" className="btn-ghost px-6 py-3 text-[1rem]">
            See how it works
          </a>
        </div>

        <dl className="mt-14 grid max-w-[420px] grid-cols-3 gap-6 border-t border-border pt-8">
          <div>
            <dt className="label-sm">Assets per upload</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-ink">7+</dd>
          </div>
          <div>
            <dt className="label-sm">Avg. processing</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-ink">&lt;30s</dd>
          </div>
          <div>
            <dt className="label-sm">Export formats</dt>
            <dd className="mt-1 font-display text-2xl font-semibold text-ink">12</dd>
          </div>
        </dl>
      </div>

      <div className="relative">
        <BeforeAfterSlider
          beforeSrc="https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=900&auto=format&fit=crop"
          afterSrc="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=900&auto=format&fit=crop"
          beforeLabel="Uploaded"
          afterLabel="Pixora scene"
        />
        <p className="mt-3 text-center text-sm text-muted">
          Drag the handle — one upload, studio result.
        </p>
      </div>
    </section>
  );
}
