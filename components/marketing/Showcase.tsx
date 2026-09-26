const outputs = [
  "Clean product cutout",
  "Luxury studio background",
  "Lifestyle scene",
  "Instagram post",
  "Instagram story",
  "Website banner",
  "YouTube thumbnail",
];

export function Showcase() {
  return (
    <section id="showcase" className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-content px-6">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-[2.1rem] font-semibold leading-tight text-white">
              Upload one perfume bottle. Leave with a campaign.
            </h2>
            <p className="mt-4 max-w-[46ch] text-white/70 leading-relaxed">
              A single source image is enough for Pixora to produce every
              asset a launch actually needs — cut, staged, and sized.
            </p>
            <ul className="mt-8 space-y-3">
              {outputs.map((o) => (
                <li key={o} className="flex items-center gap-3 text-[0.95rem] text-white/85">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M3 8.5L6.2 11.5L13 4.5" stroke="#3FBDB4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              "photo-1523293182086-7651a899d37f",
              "photo-1541643600914-78b084683601",
              "photo-1585386959984-a4155224a1ad",
              "photo-1594035910387-fea47794261f",
            ].map((id, i) => (
              <div
                key={id}
                className={`overflow-hidden rounded-lg border border-white/10 ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}
              >
                <img
                  src={`https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
