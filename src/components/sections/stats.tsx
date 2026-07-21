const stats = [
  { value: "180+", label: "Hotels Partnered" },
  { value: "45,000+", label: "Happy Customers" },
  { value: "600+", label: "Travel Agencies" },
  { value: "22", label: "Countries Served" },
];

export function Stats() {
  return (
    <section className="bg-maroon-500 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-white">
            <p className="font-display text-4xl font-semibold">{s.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-widest text-white/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
