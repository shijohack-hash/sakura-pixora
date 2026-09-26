export function ProjectCard({
  name,
  count,
  updated,
  thumb,
}: {
  name: string;
  count: number;
  updated: string;
  thumb: string;
}) {
  return (
    <button className="card group overflow-hidden text-left transition-shadow hover:shadow-raised">
      <div className="aspect-[4/3] overflow-hidden bg-navy/5">
        <img
          src={thumb}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-4">
        <h3 className="truncate text-[0.92rem] font-semibold text-ink">{name}</h3>
        <p className="mt-0.5 text-[0.8rem] text-muted">
          {count} assets · updated {updated}
        </p>
      </div>
    </button>
  );
}
