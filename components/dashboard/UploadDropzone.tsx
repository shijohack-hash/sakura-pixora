"use client";

import { useRef, useState } from "react";
import { UploadCloud, Loader2, AlertTriangle } from "lucide-react";

export type UploadedAsset = {
  publicId: string;
  secureUrl: string;
  width: number;
  height: number;
  format: string;
};

export function UploadDropzone({
  onUploaded,
  label = "Drop a product photo here, or click to browse",
}: {
  onUploaded: (asset: UploadedAsset) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");
      onUploaded(data.asset as UploadedAsset);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed px-6 py-12 text-center transition-colors ${
          dragOver ? "border-teal bg-teal-tint" : "border-border bg-surface hover:border-teal/40"
        }`}
      >
        {loading ? (
          <Loader2 size={22} className="animate-spin text-teal-strong" />
        ) : (
          <UploadCloud size={22} className="text-muted" strokeWidth={1.7} />
        )}
        <p className="text-[0.87rem] text-ink">{loading ? "Uploading…" : label}</p>
        <p className="text-[0.75rem] text-muted">JPG, PNG, or WebP — up to 10MB</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
            e.target.value = "";
          }}
        />
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-[0.82rem] text-red-600">
          <AlertTriangle size={13} /> {error}
        </div>
      )}
    </div>
  );
}
