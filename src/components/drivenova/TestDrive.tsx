import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CARS } from "@/lib/drivenova/cars";
import { Check, Calendar, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { bookTestDrive } from "@/lib/api/example.functions";

export function TestDrive() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", carId: CARS[0].id, date: "", city: "Mumbai" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) {
      toast.error("Please complete all fields");
      return;
    }
    
    setLoading(true);
    try {
      const result = await bookTestDrive({ data: form });
      if (result.success) {
        setDone(true);
        toast.success(result.message || "Test drive booked! We'll be in touch.");
      } else {
        toast.error("Failed to book test drive");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Error booking test drive. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="testdrive" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeader eyebrow="Test Drive" title="Feel it for yourself" subtitle="Book a personalized test drive at your nearest experience center." />
        <form onSubmit={submit} className="mt-12 rounded-2xl bg-gradient-card border border-border p-8 grid md:grid-cols-2 gap-5">
          <Field label="Full Name">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border h-11" placeholder="John Doe" />
          </Field>
          <Field label="Phone">
            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-secondary border-border h-11" placeholder="+91 98765 43210" />
          </Field>
          <Field label="Vehicle">
            <Select value={form.carId} onValueChange={(v) => setForm({ ...form, carId: v })}>
              <SelectTrigger className="bg-secondary border-border h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CARS.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="City">
            <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v })}>
              <SelectTrigger className="bg-secondary border-border h-11"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Pune"].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Preferred Date">
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="bg-secondary border-border h-11" />
          </Field>
          <div className="flex items-end">
            <Button type="submit" disabled={loading || done} className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 gap-2">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {done ? <><Check className="size-4" /> Booked</> : <><Calendar className="size-4" /> Book Test Drive</>}
            </Button>
          </div>
        </form>
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