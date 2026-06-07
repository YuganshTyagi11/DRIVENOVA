export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-gradient-to-br from-primary to-primary-glow shadow-glow" />
          <span className="font-semibold tracking-wider text-foreground">DRIVE<span className="text-gradient">NOVA</span></span>
        </div>
        <div>© 2026 DriveNova. The future, delivered.</div>
      </div>
    </footer>
  );
}