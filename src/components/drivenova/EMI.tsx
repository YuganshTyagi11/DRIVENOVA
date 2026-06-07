import { useMemo, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Slider } from "@/components/ui/slider";
import { CARS } from "@/lib/drivenova/cars";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EMI() {
  const [carId, setCarId] = useState(CARS[0].id);
  const car = CARS.find((c) => c.id === carId)!;
  const onRoad = car.price * 100000; // INR

  const [downPct, setDownPct] = useState([20]);
  const [rate, setRate] = useState([8.5]);
  const [months, setMonths] = useState([60]);

  const { emi, principal, totalInterest, totalPayable } = useMemo(() => {
    const principal = onRoad * (1 - downPct[0] / 100);
    const r = rate[0] / 12 / 100;
    const n = months[0];
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    return {
      emi,
      principal,
      totalInterest: totalPayable - principal,
      totalPayable,
    };
  }, [onRoad, downPct, rate, months]);

  const fmt = (n: number) =>
    "₹" + Math.round(n).toLocaleString("en-IN");

  return (
    <section id="emi" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Finance" title="EMI Calculator" subtitle="Plan your purchase with precision." />
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-gradient-card border border-border p-8 space-y-8">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Vehicle</label>
              <Select value={carId} onValueChange={setCarId}>
                <SelectTrigger className="mt-2 bg-secondary border-border h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CARS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name} — ₹{c.price}L
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <SliderField label="Down Payment" value={downPct[0]} suffix="%" onChange={(v) => setDownPct([v])} min={5} max={60} step={1} />
            <SliderField label="Interest Rate" value={rate[0]} suffix="% p.a." onChange={(v) => setRate([v])} min={6} max={15} step={0.1} />
            <SliderField label="Tenure" value={months[0]} suffix=" months" onChange={(v) => setMonths([v])} min={12} max={84} step={6} />
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/30 p-8 flex flex-col justify-between shadow-glow">
            <div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground">Monthly EMI</div>
              <div className="mt-2 text-6xl md:text-7xl font-bold text-gradient leading-none">{fmt(emi)}</div>
              <div className="mt-2 text-sm text-muted-foreground">for {months[0]} months</div>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <Stat label="Principal" value={fmt(principal)} />
              <Stat label="Interest" value={fmt(totalInterest)} />
              <Stat label="Total" value={fmt(totalPayable)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderField({ label, value, suffix, onChange, min, max, step }: { label: string; value: number; suffix: string; onChange: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
        <span className="text-sm font-medium">{value}{suffix}</span>
      </div>
      <Slider value={[value]} onValueChange={(v) => onChange(v[0])} min={min} max={max} step={step} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-1 font-semibold text-sm">{value}</div>
    </div>
  );
}