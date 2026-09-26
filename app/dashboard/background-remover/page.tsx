"use client";

import { useState } from "react";
import { Scissors, Download, RotateCcw, Loader2 } from "lucide-react";
import { UploadDropzone, UploadedAsset } from "@/components/dashboard/UploadDropzone";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

export default function BackgroundRemoverPage() {
  const [asset, setAsset] = useState<UploadedAsset | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploaded = async (a: UploadedAsset) => {
    setAsset(a);
    setResultUrl(null);
    setError(null);
    setProcessing(true);
    try {
      const res = await fetch("/api/remove-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: a.publicId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Background removal failed.");
      setResultUrl(data.url as string);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Background removal failed.");
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => { setAsset(null); setResultUrl(null); setError(null); };

  return (
    <div className="mx-auto max-w-content">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
          <Scissors size={18} strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-[1.3rem] font-semibold text-ink">Background remover</h1>
          <p className="text-[0.87rem] text-muted">Clean, edge-aware cutouts in seconds.</p>
        </div>
      </div>

      {!asset && <UploadDropzone onUploaded={handleUploaded} />}

      {error && <p className="mt-4 text-[0.85rem] text-red-600">{error}</p>}

      {asset && (
        <div className="mt-2">
          {processing && (
            <div className="flex items-center gap-2 py-10 text-[0.9rem] text-muted">
              <Loader2 size={16} className="animate-spin" /> Removing background…
            </div>
          )}

          {!processing && resultUrl && (
            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <BeforeAfterSlider beforeSrc={asset.secureUrl} afterSrc={resultUrl} />
              <div className="space-y-4">
                <div className="card p-4">
                  <p className="label-sm mb-2">Result</p>
                  <p className="text-[0.85rem] text-ink">
                    {asset.width}×{asset.height} · {asset.format.toUpperCase()}
                  </p>
                </div>
                <a href={resultUrl} download target="_blank" rel="noreferrer" className="btn-teal w-full">
                  <Download size={15} /> Download PNG
                </a>
                <button onClick={reset} className="btn-ghost w-full">
                  <RotateCcw size={14} /> Start over
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
