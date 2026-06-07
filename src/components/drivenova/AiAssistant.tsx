import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkles, Send, User } from "lucide-react";
import { recommend, SUGGESTIONS, type AiReply } from "@/lib/drivenova/ai";
import { inr, type Car } from "@/lib/drivenova/cars";

type Msg = { role: "user" | "ai"; text: string; cars?: Car[] };

export function AiAssistant({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hi! I'm your DriveNova assistant. Tell me what you're looking for — your budget, family size, use case — and I'll recommend the perfect vehicle.",
    },
  ]);
  const [input, setInput] = useState("");

  function ask(q: string) {
    if (!q.trim()) return;
    const reply: AiReply = recommend(q);
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      { role: "ai", text: reply.text, cars: reply.cars },
    ]);
    setInput("");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
          <DialogTitle className="flex items-center gap-2 text-base">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow shadow-glow flex items-center justify-center">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            DriveNova AI Assistant
          </DialogTitle>
        </DialogHeader>

        <div className="h-[420px] overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-secondary" : "bg-gradient-to-br from-primary to-primary-glow"}`}>
                {m.role === "user" ? <User className="size-4" /> : <Sparkles className="size-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[80%] ${m.role === "user" ? "text-right" : ""}`}>
                <div className={`inline-block rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  {m.text}
                </div>
                {m.cars && m.cars.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {m.cars.map((c) => (
                      <div key={c.id} className="flex items-center gap-3 rounded-xl bg-secondary/60 border border-border p-2.5">
                        <img src={c.image} alt={c.name} className="size-14 rounded-lg object-cover" />
                        <div className="flex-1 text-left">
                          <div className="font-medium text-sm">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.type} · {c.range} km · {c.seats} seats</div>
                        </div>
                        <div className="text-sm font-semibold text-gradient">{inr(c.price)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {messages.length <= 1 && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground transition"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); ask(input); }}
          className="border-t border-border p-3 flex gap-2 bg-background/50"
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about our cars…" className="bg-secondary border-border h-11" />
          <Button type="submit" size="icon" className="size-11 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground hover:opacity-90 shrink-0">
            <Send className="size-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}