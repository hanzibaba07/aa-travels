import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarDivider } from "@/components/ui/star-divider";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-semibold text-maroon-500">404</p>
      <StarDivider />
      <h1 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white">Page not found</h1>
      <p className="mt-2 text-sm text-ink-400 dark:text-white/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
