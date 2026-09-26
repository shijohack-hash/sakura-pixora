const steps = [
  {
    n: "01",
    title: "Upload your product",
    body: "Drop in one photo, from your phone or a proper studio shoot — Pixora works with either.",
  },
  {
    n: "02",
    title: "Background is lifted automatically",
    body: "A clean, transparent cutout is ready in seconds, no manual masking.",
  },
  {
    n: "03",
    title: "Choose a scene or backdrop",
    body: "Pick a studio, lifestyle, or custom setting. The product stays the visual focus.",
  },
  {
    n: "04",
    title: "Resize for every platform",
    body: "Generate Instagram, Pinterest, LinkedIn, and web-ready variants from the same asset.",
  },
];

export function Workflow() {
  return (
    <section id="workflow" className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="max-w-[52ch]">
          <h2 className="text-[2.1rem] font-semibold leading-tight">
            One photo in. A full campaign out.
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            The whole workflow runs on Cloudinary&apos;s media pipeline, so
            what you preview is what gets delivered.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-5">
              <span className="font-display text-[1.5rem] font-semibold text-teal/70">
                {s.n}
              </span>
              <div>
                <h3 className="text-[1.05rem] font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
