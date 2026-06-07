import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/drivenova/Nav";
import { Hero } from "@/components/drivenova/Hero";
import { Fleet } from "@/components/drivenova/Fleet";
import { Compare } from "@/components/drivenova/Compare";
import { EMI } from "@/components/drivenova/EMI";
import { TradeIn } from "@/components/drivenova/TradeIn";
import { TestDrive } from "@/components/drivenova/TestDrive";
import { AiAssistant } from "@/components/drivenova/AiAssistant";
import { Footer } from "@/components/drivenova/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DriveNova — Luxury Electric Vehicles" },
      { name: "description", content: "Discover, compare, and finance premium electric vehicles with AI-powered recommendations, EMI calculator, trade-in valuation, and test drive booking." },
      { property: "og:title", content: "DriveNova — Luxury Electric Vehicles" },
      { property: "og:description", content: "Drive the extraordinary. Premium EVs with AI guidance." },
    ],
  }),
  component: Index,
});

function Index() {
  const [aiOpen, setAiOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav onOpenAi={() => setAiOpen(true)} />
      <main>
        <Hero onOpenAi={() => setAiOpen(true)} />
        <Fleet />
        <Compare />
        <EMI />
        <TradeIn />
        <TestDrive />
      </main>
      <Footer />
      <AiAssistant open={aiOpen} onOpenChange={setAiOpen} />
      <Toaster theme="dark" />
    </div>
  );
}
