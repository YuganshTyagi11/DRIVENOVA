import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#fleet", label: "Fleet" },
  { href: "#compare", label: "Compare" },
  { href: "#emi", label: "EMI" },
  { href: "#tradein", label: "Trade-In" },
  { href: "#testdrive", label: "Test Drive" },
];

export function Nav({ onOpenAi }: { onOpenAi: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-glow" />
          <span className="font-semibold tracking-wider text-lg">DRIVE<span className="text-gradient">NOVA</span></span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <Button onClick={onOpenAi} variant="default" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 gap-2">
          <Sparkles className="size-4" />
          AI Assistant
        </Button>
      </div>
    </header>
  );
}