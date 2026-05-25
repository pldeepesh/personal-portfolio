export function WebGLFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_70%_25%,rgba(55,168,255,0.24),transparent_30%),radial-gradient(circle_at_28%_70%,rgba(83,230,166,0.12),transparent_28%),linear-gradient(135deg,#07101d_0%,#05070d_64%,#0b1020_100%)]"
    >
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35 bg-accent/10 shadow-glow" />
      <div className="absolute left-[18%] top-[22%] h-24 w-40 rounded-lg border border-white/10 bg-white/[0.04]" />
      <div className="absolute right-[12%] top-[36%] h-28 w-48 rounded-lg border border-accent/20 bg-accent/[0.06]" />
      <div className="absolute bottom-[18%] left-[36%] h-20 w-44 rounded-lg border border-success/20 bg-success/[0.05]" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,rgba(5,7,13,0.95),transparent)]" />
    </div>
  );
}
