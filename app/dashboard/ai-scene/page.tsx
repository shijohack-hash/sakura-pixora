"use client";

import { Mountain } from "lucide-react";
import { GenerateWorkspace } from "@/components/dashboard/GenerateWorkspace";

const scenes = [
  { id: "table", name: "Wooden table", prompt: "the product placed on a rustic wooden table with soft natural light" },
  { id: "shelf", name: "Retail shelf", prompt: "the product displayed on a modern retail shelf with clean lighting" },
  { id: "outdoor", name: "Outdoor", prompt: "an elegant natural outdoor setting with soft premium lighting" },
];

export default function AiScenePage() {
  return (
    <GenerateWorkspace
      icon={Mountain}
      title="AI scene"
      subtitle="Place your product in a realistic environment."
      scenes={scenes}
      customPromptPlaceholder="e.g. on a marble kitchen counter next to a coffee cup, morning light"
    />
  );
}
