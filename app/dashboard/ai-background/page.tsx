"use client";

import { ImageIcon } from "lucide-react";
import { GenerateWorkspace } from "@/components/dashboard/GenerateWorkspace";

const scenes = [
  { id: "studio", name: "Studio", prompt: "a clean premium studio product photography background" },
  { id: "minimal", name: "Minimal", prompt: "a soft minimal neutral backdrop with subtle shadow" },
  { id: "luxury", name: "Luxury", prompt: "an elegant luxury backdrop with warm premium lighting" },
];

export default function AiBackgroundPage() {
  return (
    <GenerateWorkspace
      icon={ImageIcon}
      title="AI background"
      subtitle="Swap in a studio, minimal, or luxury backdrop."
      scenes={scenes}
      customPromptPlaceholder="e.g. a pale pink gradient backdrop with soft light from the left"
    />
  );
}
