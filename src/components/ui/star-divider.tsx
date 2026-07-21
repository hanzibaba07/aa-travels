import { cn } from "@/lib/utils";

// Signature element: an 8-point khatam star used as a section divider —
// a direct, restrained nod to the "Islamic inspired luxury" brief.
export function StarDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4 py-2", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-400/60" />
      <svg width="22" height="22" viewBox="0 0 80 80" className="text-gold-400">
        <path
          fill="currentColor"
          d="M40 4 L48 24 L68 16 L56 34 L76 40 L56 46 L68 64 L48 56 L40 76 L32 56 L12 64 L24 46 L4 40 L24 34 L12 16 L32 24 Z"
        />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-400/60" />
    </div>
  );
}
