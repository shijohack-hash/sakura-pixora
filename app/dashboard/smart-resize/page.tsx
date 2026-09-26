"use client";

import { useState } from "react";
import { Maximize2, Download, RotateCcw, Loader2 } from "lucide-react";
import { UploadDropzone, UploadedAsset } from "@/components/dashboard/UploadDropzone";

const PRESETS = [
  { id: "instagram", label: "Instagram post", dims: "1080 × 1080" },
  { id: "instagramStory", label: "Instagram story", dims: "1080 × 1920" },
  { id: "website", label: "Website", dims: "1600 × 1200" },
  { id: "marketplace", label: "Marketplace", dims: "1200 × 1200" },
] as const;

type Result = { preset: string; url: string; width: number; height: number };

export default function SmartResizePage() {
  const [asset, setAsset] = useState<UploadedAsset | null>(null);
  const [results, setResults] = useState<Record<string, Result>>({});
  const [loadingPreset, setLoadingPreset] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (presetId: string) => {
    if (!asset) return;
    setLoadingPreset(presetId);
    setError(null);
    try {
      const res = await fetch("/api/resize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: asset.publicId, preset: presetId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Resize failed.");
      setResults((prev) => ({ ...prev, [presetId]: data }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Resize failed.");
    } finally {
      setLoadingPreset(null);
    }
  };

  const generateAll = async () => {
    for (const p of PRESETS) {
      // eslint-disable-next-line no-await-in-loop
      await generate(p.id);
    }
  };

  const reset = () => { setAsset(null); setResults({}); setError(null); };

  return (
    <div className="mx-auto max-w-content">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
          <Maximize2 size={18} strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-[1.3rem] font-semibold text-ink">Smart resize</h1>
          <p className="text-[0.87rem] text-muted">One image, every platform size.</p>
        </div>
      </div>

      {!asset && <UploadDropzone onUploaded={setAsset} />}
      {error && <p className="mt-4 text-[0.85rem] text-red-600">{error}</p>}

      {asset && (
        <div className="mt-2">
          <div className="mb-5 flex items-center justify-between">
            <button onClick={generateAll} className="btn-teal">Generate all sizes</button>
            <button onClick={reset} className="btn-ghost"><RotateCcw size={14} /> Start over</button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRESETS.map((p) => {
              const result = results[p.id];
              const busy = loadingPreset === p.id;
              return (
                <div key={p.id} className="card overflow-hidden">
                  <div className="flex aspect-square items-center justify-center bg-navy/[0.03]">
                    {busy ? (
                      <Loader2 size={20} className="animate-spin text-teal-strong" />
                    ) : result ? (
                      <img src={result.url} alt={p.label} className="h-full w-full object-cover" />
                    ) : (
                      <img src={asset.secureUrl} alt="preview" className="h-full w-full object-cover opacity-40" />
                    )}
                  </div>
                  <div className="p-3.5">
                    <p className="text-[0.85rem] font-medium text-ink">{p.label}</p>
                    <p className="text-[0.75rem] text-muted">{p.dims}</p>
                    {result ? (
                      <a href={result.url} download target="_blank" rel="noreferrer" className="btn-ghost mt-3 w-full !py-1.5 text-[0.8rem]">
                        <Download size={13} /> Download
                      </a>
                    ) : (
                      <button onClick={() => generate(p.id)} disabled={busy} className="btn-ghost mt-3 w-full !py-1.5 text-[0.8rem]">
                        {busy ? "Generating…" : "Generate"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
