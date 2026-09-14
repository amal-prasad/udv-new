// Placeholder figures — swap for real numbers once the client confirms them.
const STATS = [
  { value: "40+", label: "trips run" },
  { value: "600+", label: "travellers" },
  { value: "5 years", label: "on the road" },
  { value: "4.9★", label: "average rating" },
] as const;

export function TrustBar() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-mist border border-mist md:grid-cols-4 md:divide-y-0">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center">
            <span className="font-display text-3xl font-semibold text-ink md:text-4xl">{stat.value}</span>
            <span className="text-sm text-ink/70">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
