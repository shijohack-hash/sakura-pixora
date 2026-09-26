"use client";

import { useRef, useState } from "react";
import { Layers, UploadCloud, Loader2, CheckCircle2, XCircle, Download } from "lucide-react";

type Action = "remove-background" | "resize-instagram" | "resize-website";

const ACTIONS: { id: Action; label: string }[] = [
  { id: "remove-background", label: "Remove background" },
  { id: "resize-instagram", label: "Resize to Instagram (1080×1080)" },
  { id: "resize-website", label: "Resize to Website (1600×1200)" },
];

type FileJob = {
  file: File;
  status: "pending" | "uploading" | "processing" | "done" | "error";
  resultUrl?: string;
  errorMsg?: string;
};

export default function BulkPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [jobs, setJobs] = useState<FileJob[]>([]);
  const [action, setAction] = useState<Action>("remove-background");
  const [running, setRunning] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next = Array.from(files)
      .slice(0, 12)
      .map((file) => ({ file, status: "pending" as const }));
    setJobs(next);
  };

  const runOne = async (job: FileJob, index: number): Promise<void> => {
    const update = (patch: Partial<FileJob>) =>
      setJobs((prev) => prev.map((j, i) => (i === index ? { ...j, ...patch } : j)));

    try {
      update({ status: "uploading" });
      const form = new FormData();
      form.append("file", job.file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed.");

      update({ status: "processing" });
      const publicId = uploadData.asset.publicId;

      let resultUrl: string;
      if (action === "remove-background") {
        const res = await fetch("/api/remove-background", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed.");
        resultUrl = data.url;
      } else {
        const preset = action === "resize-instagram" ? "instagram" : "website";
        const res = await fetch("/api/resize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publicId, preset }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed.");
        resultUrl = data.url;
      }

      update({ status: "done", resultUrl });
    } catch (e) {
      update({ status: "error", errorMsg: e instanceof Error ? e.message : "Failed." });
    }
  };

  const runAll = async () => {
    setRunning(true);
    for (let i = 0; i < jobs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await runOne(jobs[i], i);
    }
    setRunning(false);
  };

  const doneCount = jobs.filter((j) => j.status === "done").length;
  const errorCount = jobs.filter((j) => j.status === "error").length;

  return (
    <div className="mx-auto max-w-content">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-tint text-teal-strong">
          <Layers size={18} strokeWidth={1.8} />
        </div>
        <div>
          <h1 className="text-[1.3rem] font-semibold text-ink">Bulk processing</h1>
          <p className="text-[0.87rem] text-muted">Run one action across your whole catalog.</p>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-lg border-2 border-dashed border-border bg-surface px-6 py-14 text-center hover:border-teal/40"
        >
          <UploadCloud size={22} className="text-muted" strokeWidth={1.7} />
          <p className="text-[0.87rem] text-ink">Select up to 12 images to process together</p>
          <p className="text-[0.75rem] text-muted">JPG, PNG, or WebP — up to 10MB each</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />
        </div>
      ) : (
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="label-sm">Action:</span>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value as Action)}
                disabled={running}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-[0.85rem] outline-none"
              >
                {ACTIONS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[0.8rem] text-muted">
                {doneCount}/{jobs.length} done{errorCount ? ` · ${errorCount} failed` : ""}
              </span>
              <button onClick={runAll} disabled={running} className="btn-teal">
                {running ? <Loader2 size={15} className="animate-spin" /> : null}
                {running ? "Processing…" : "Run on all"}
              </button>
              <button onClick={() => setJobs([])} disabled={running} className="btn-ghost">Clear</button>
            </div>
          </div>

          <div className="space-y-2">
            {jobs.map((job, i) => (
              <div key={i} className="card flex items-center gap-3 p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-navy/[0.04]">
                  {job.resultUrl ? (
                    <img src={job.resultUrl} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[0.7rem] text-muted">IMG</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.85rem] text-ink">{job.file.name}</p>
                  <p className="text-[0.75rem] text-muted">{(job.file.size / 1024).toFixed(0)} KB</p>
                </div>
                <StatusBadge status={job.status} errorMsg={job.errorMsg} />
                {job.resultUrl && (
                  <a href={job.resultUrl} download target="_blank" rel="noreferrer" className="btn-ghost !py-1.5 !px-2.5 text-[0.78rem]">
                    <Download size={13} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, errorMsg }: { status: FileJob["status"]; errorMsg?: string }) {
  if (status === "pending") return <span className="text-[0.78rem] text-muted">Waiting</span>;
  if (status === "uploading") return <span className="flex items-center gap-1 text-[0.78rem] text-muted"><Loader2 size={12} className="animate-spin" /> Uploading</span>;
  if (status === "processing") return <span className="flex items-center gap-1 text-[0.78rem] text-muted"><Loader2 size={12} className="animate-spin" /> Processing</span>;
  if (status === "done") return <span className="flex items-center gap-1 text-[0.78rem] text-teal-strong"><CheckCircle2 size={13} /> Done</span>;
  return (
    <span className="flex items-center gap-1 text-[0.78rem] text-red-600" title={errorMsg}>
      <XCircle size={13} /> Failed
    </span>
  );
}
