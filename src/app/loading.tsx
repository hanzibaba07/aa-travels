export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-6 px-4 py-24 sm:px-6 lg:px-8">
      <div className="h-8 w-1/3 rounded bg-ink-900/10 dark:bg-white/10" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 rounded-2xl bg-ink-900/10 dark:bg-white/10" />
        ))}
      </div>
    </div>
  );
}
