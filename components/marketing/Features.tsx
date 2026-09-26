const features = [
  {
    title: "Background remover",
    body: "Precise, edge-aware cutouts with a before/after preview before you commit.",
  },
  {
    title: "AI backgrounds",
    body: "Studio, minimal, nature, and luxury settings, or generate a custom one.",
  },
  {
    title: "AI scenes",
    body: "Place your product in a realistic environment — a table, a shelf, an outdoor shot.",
  },
  {
    title: "Smart resize",
    body: "Instagram, YouTube thumbnails, LinkedIn, Pinterest — sized correctly, every time.",
  },
  {
    title: "Bulk processing",
    body: "Run one action across an entire product catalog and track progress live.",
  },
  {
    title: "Asset library",
    body: "Every export lives in one searchable library, organized by project.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-content px-6 py-24">
      <h2 className="text-[2.1rem] font-semibold leading-tight">
        Everything a product shoot would take a week to do.
      </h2>

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="bg-surface p-7">
            <h3 className="text-[1.02rem] font-semibold text-ink">{f.title}</h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
