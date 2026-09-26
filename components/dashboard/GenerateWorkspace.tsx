"use client";

import { useState } from "react";
import { Wand2, Download, RotateCcw, Loader2 } from "lucide-react";
import { UploadDropzone, UploadedAsset } from "@/components/dashboard/UploadDropzone";

type SceneOption = { id: string; name: string; prompt: string };
type GeneratedAsset = { id: string; format: string; width: number; height: number; url: string };

export function GenerateWorkspace({
  icon: Icon,
  title,
  subtitle,
  scenes,
  customPromptPlaceholder,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  scenes: SceneOption[];
  customPromptPlaceholder: string;
}) {
  const [asset, setAsset] = useState<UploadedAsset | null>(null);
  const [sceneId, setSceneId] = useState(scenes[0].id);
  const [customPrompt, setCustomPrompt] = useState("");
  const [assets, setAssets] = useState<GeneratedAsset[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeScene = customPrompt.trim()
    ? { id: "custom", name: "Custom", prompt: customPrompt.trim() }
    : scenes.find((s) => s.id === sceneId)!;

  const generate = async () => {
    if (!asset) return;
    setLoading(true);
    setError(null);
    setAssets(null);
    try {
      const res = await fetch("/api/generate-assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: asset.publicId, scenes: [activeScene] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed.");
      setAssets(data.assets as GeneratedAsset[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setAsset(null); setAssets(null); setError(null); setCustomPrompt(""); };

  return (
    <div className="mx-auto max-w-content">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-[1.3rem] font-semibold text-ink">{title}</h1>
          <p className="text-[0.87rem] text-muted">{subtitle}</p>
        </div>
      </div>

      {!asset && <UploadDropzone onUploaded={setAsset} />}
      {error && <p className="mt-4 text-[0.85rem] text-red-600">{error}</p>}

      {asset && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-4">
            <div className="card p-4">
              <img src={asset.secureUrl} alt="Uploaded product" className="w-full rounded-md" />
            </div>

            <div className="card p-4">
              <p className="label-sm mb-2">Choose a scene</p>
              <div className="space-y-1.5">
                {scenes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSceneId(s.id); setCustomPrompt(""); }}
                    className={`w-full rounded-md px-3 py-2 text-left text-[0.85rem] transition-colors ${
                      sceneId === s.id && !customPrompt.trim()
                        ? "bg-teal-tint font-medium text-teal-strong"
                        : "text-ink/75 hover:bg-navy/[0.04]"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <p className="label-sm mb-1.5 mt-4">Or describe your own</p>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={customPromptPlaceholder}
                rows={3}
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-[0.85rem] outline-none focus:border-teal/50"
              />
            </div>

            <button onClick={generate} disabled={loading} className="btn-teal w-full">
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Wand2 size={15} />}
              {loading ? "Generating…" : "Generate"}
            </button>
            <button onClick={reset} className="btn-ghost w-full"><RotateCcw size={14} /> Start over</button>
          </div>

          <div>
            {!assets && !loading && (
              <div className="flex h-full min-h-[240px] items-center justify-center rounded-lg border border-dashed border-border text-[0.85rem] text-muted">
                Your generated variants will appear here.
              </div>
            )}
            {loading && (
              <div className="flex h-full min-h-[240px] items-center justify-center gap-2 text-[0.9rem] text-muted">
                <Loader2 size={16} className="animate-spin" /> Rendering scene…
              </div>
            )}
            {assets && (
              <div className="grid gap-4 sm:grid-cols-2">
                {assets.map((a) => (
                  <div key={a.id} className="card overflow-hidden">
                    <img src={a.url} alt={a.format} className="aspect-square w-full object-cover" />
                    <div className="flex items-center justify-between p-3">
                      <div>
                        <p className="text-[0.83rem] font-medium text-ink">{a.format}</p>
                        <p className="text-[0.72rem] text-muted">{a.width}×{a.height}</p>
                      </div>
                      <a href={a.url} download target="_blank" rel="noreferrer" className="btn-ghost !py-1.5 !px-2.5 text-[0.78rem]">
                        <Download size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
