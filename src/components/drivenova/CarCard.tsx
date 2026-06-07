import type { Car } from "@/lib/drivenova/cars";
import { inr } from "@/lib/drivenova/cars";
import { Badge } from "@/components/ui/badge";
import { Gauge, Battery, Users, Zap } from "lucide-react";

export function CarCard({ car, onSelect }: { car: Car; onSelect?: (c: Car) => void }) {
  return (
    <div
      onClick={() => onSelect?.(car)}
      className="group relative overflow-hidden rounded-2xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-500 cursor-pointer hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          width={1024}
          height={640}
          className="size-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{car.type}</div>
            <h3 className="text-2xl font-semibold mt-1">{car.name}</h3>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Starting</div>
            <div className="text-xl font-semibold text-gradient">{inr(car.price)}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3 text-xs">
          <Spec icon={<Battery className="size-4" />} v={`${car.range} km`} l="Range" />
          <Spec icon={<Zap className="size-4" />} v={`${car.power} hp`} l="Power" />
          <Spec icon={<Gauge className="size-4" />} v={`${car.acceleration}s`} l="0-100" />
          <Spec icon={<Users className="size-4" />} v={`${car.seats}`} l="Seats" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {car.tags.map((t) => (
            <Badge key={t} variant="secondary" className="bg-secondary/60 text-muted-foreground border-border font-normal">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, v, l }: { icon: React.ReactNode; v: string; l: string }) {
  return (
    <div className="rounded-lg bg-secondary/40 border border-border/50 p-2 text-center">
      <div className="flex items-center justify-center text-primary mb-1">{icon}</div>
      <div className="font-medium text-foreground">{v}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
}