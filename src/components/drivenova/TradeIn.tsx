import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitTradeIn } from "@/lib/api/example.functions";

const BRANDS = ["Maruti", "Hyundai", "Tata", "Honda", "Toyota", "Mahindra", "Kia", "BMW", "Mercedes", "Audi"];

export function TradeIn() {
  const [brand, setBrand] = useState("Maruti");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("2020");
  const [km, setKm] = useState("45000");
  const [condition, setCondition] = useState("good");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const value = useMemo(() => {
    const base: Record<string, number> = { Maruti: 5, Hyundai: 6, Tata: 5.5, Honda: 7, Toyota: 7.5, Mahindra: 8, Kia: 7, BMW: 18, Mercedes: 22, Audi: 20 };
    const ageMul = Math.max(0.3, 1 - (2025 - parseInt(year || "2020")) * 0.08);
    const kmMul = Math.max(0.4, 1 - (parseInt(km || "0") / 200000));
    const condMul = condition === "excellent" ? 1.1 : condition === "good" ? 1 : condition === "fair" ? 0.85 : 0.7;
    return Math.round((base[brand] ?? 5) * 100000 * ageMul * kmMul * condMul);
  }, [brand, year, km, condition]);

  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await submitTradeIn({ data: { brand, model, year, km, condition, email, phone } });
      if (result.success) {
        setSubmitted(true);
        toast.success(result.message || "Valuation submitted! Our team will contact you.");
      } else {
        toast.error(result.message || "Failed to submit valuation");
      }
    } catch (error) {
      console.error("Trade-in error:", error);
      toast.error("Error submitting valuation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="tradein" className="py-24 px-6 bg-secondary/20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Trade-In" title="Instant valuation" subtitle="Get an indicative price for your current vehicle in seconds." />
        <div className="mt-12 grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-2xl bg-gradient-card border border-border p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Brand">
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger className="bg-secondary border-border h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Model">
                <Input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. Swift" className="bg-secondary border-border h-11" />
              </Field>
              <Field label="Year">
                <Input value={year} onChange={(e) => setYear(e.target.value)} type="number" className="bg-secondary border-border h-11" />
              </Field>
              <Field label="Kilometers">
                <Input value={km} onChange={(e) => setKm(e.target.value)} type="number" className="bg-secondary border-border h-11" />
              </Field>
              <Field label="Condition">
                <Select value={condition} onValueChange={setCondition}>
                  <SelectTrigger className="bg-secondary border-border h-11"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Email (Optional)">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" type="email" className="bg-secondary border-border h-11" />
              </Field>
              <Field label="Phone (Optional)">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="bg-secondary border-border h-11" />
              </Field>
            </div>
            <Button onClick={handleSubmit} disabled={loading} className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 gap-2">
              {loading && <Loader2 className="size-4 animate-spin" />}
              <Sparkles className="size-4" /> Get Valuation
            </Button>
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 p-8 flex flex-col justify-center text-center shadow-glow">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{submitted ? "Estimated Value" : "Estimated"}</div>
            <div className="mt-3 text-5xl font-bold text-gradient">{fmt(value)}</div>
            <div className="mt-2 text-sm text-muted-foreground">Indicative trade-in value</div>
            {submitted && (
              <div className="mt-6 text-xs text-muted-foreground">
                Our specialist will contact you within 24 hours to confirm a final quote after inspection.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}