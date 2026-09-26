import { Sparkles } from "lucide-react";

export function StorageWidget() {
  const used = 2.4;
  const total = 5;
  const pct = Math.round((used / total) * 100);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[0.87rem] font-semibold text-ink">Storage</h3>
        <span className="text-[0.8rem] text-muted">{used} GB / {total} GB</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy/[0.07]">
        <div
          className="h-full rounded-full bg-teal"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-[0.8rem] text-muted">
        You have {(total - used).toFixed(1)} GB left on the Free plan.
      </p>
    </div>
  );
}

export function ProTipCard() {
  return (
    <div className="card border-teal/25 bg-teal-tint p-5">
      <div className="flex items-center gap-2 text-teal-strong">
        <Sparkles size={16} strokeWidth={1.8} />
        <h3 className="text-[0.87rem] font-semibold">Pro tip</h3>
      </div>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-ink/80">
        Run background removal before AI scene generation — cleaner cutouts
        place more naturally into a generated environment.
      </p>
    </div>
  );
}
