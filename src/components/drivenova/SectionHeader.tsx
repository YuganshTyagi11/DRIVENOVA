export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : ""}>
      <div className="text-xs uppercase tracking-[0.25em] text-primary font-medium">{eyebrow}</div>
      <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}