import heroCar from "@/assets/hero-car.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero({ onOpenAi }: { onOpenAi: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <img
        src={heroCar}
        alt="DriveNova luxury electric SUV"
        width={1920}
        height={1080}
        className="absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground mb-8">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          The future of driving has arrived
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
          Drive the <span className="text-gradient">extraordinary.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Premium electric vehicles, AI-guided recommendations, and a buying experience built for the road ahead.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 shadow-glow text-base h-12 px-8">
            <a href="#fleet">
              Explore Fleet <ArrowRight className="size-4 ml-2" />
            </a>
          </Button>
          <Button onClick={onOpenAi} size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur hover:bg-card text-base h-12 px-8 gap-2">
            <Sparkles className="size-4" />
            Ask AI Assistant
          </Button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {[
            { v: "0-100 in 2.4s", l: "Performance" },
            { v: "610 km", l: "Max Range" },
            { v: "4.9★", l: "Owner Rating" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold">{s.v}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}