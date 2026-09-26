import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import { Workflow } from "@/components/marketing/Workflow";
import { Features } from "@/components/marketing/Features";
import { Showcase } from "@/components/marketing/Showcase";
import { CtaFooter } from "@/components/marketing/CtaFooter";

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Workflow />
      <Features />
      <Showcase />
      <CtaFooter />
    </main>
  );
}
