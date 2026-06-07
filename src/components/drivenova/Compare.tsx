import { useState } from "react";
import { CARS, inr } from "@/lib/drivenova/cars";
import { SectionHeader } from "./SectionHeader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Compare() {
  const [a, setA] = useState(CARS[0].id);
  const [b, setB] = useState(CARS[2].id);
  const carA = CARS.find((c) => c.id === a)!;
  const carB = CARS.find((c) => c.id === b)!;

  const rows: { label: string; a: string | number; b: string | number; unit?: string }[] = [
    { label: "Price", a: inr(carA.price), b: inr(carB.price) },
    { label: "Type", a: carA.type, b: carB.type },
    { label: "Range", a: `${carA.range} km`, b: `${carB.range} km` },
    { label: "Power", a: `${carA.power} hp`, b: `${carB.power} hp` },
    { label: "0–100 km/h", a: `${carA.acceleration}s`, b: `${carB.acceleration}s` },
    { label: "Top Speed", a: `${carA.topSpeed} km/h`, b: `${carB.topSpeed} km/h` },
    { label: "Seats", a: carA.seats, b: carB.seats },
    { label: "Rating", a: `${carA.rating}★`, b: `${carB.rating}★` },
  ];

  return (
    <section id="compare" className="py-24 px-6 bg-secondary/20">
      <div className="mx-auto max-w-6xl">
        <SectionHeader eyebrow="Compare" title="Side-by-side comparison" subtitle="Pit any two vehicles head-to-head." />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[{ car: carA, set: setA, val: a }, { car: carB, set: setB, val: b }].map((col, i) => (
            <div key={i} className="rounded-2xl bg-gradient-card border border-border overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={col.car.image} alt={col.car.name} className="size-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <Select value={col.val} onValueChange={col.set}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CARS.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-secondary/30" : ""}`}
            >
              <div className="text-muted-foreground uppercase tracking-wider text-xs self-center">{r.label}</div>
              <div className="text-center font-medium">{r.a}</div>
              <div className="text-center font-medium">{r.b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}