import { CARS } from "@/lib/drivenova/cars";
import { CarCard } from "./CarCard";
import { SectionHeader } from "./SectionHeader";

export function Fleet() {
  return (
    <section id="fleet" className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Vehicle Listings"
          title="The DriveNova fleet"
          subtitle="Six designs. One promise — uncompromising performance and luxury."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {CARS.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
      </div>
    </section>
  );
}