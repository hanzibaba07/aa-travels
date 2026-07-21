import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-ink-900/15 bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500 dark:border-white/15 dark:bg-ink-900 dark:text-white",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-lg border border-ink-900/15 bg-white px-4 text-sm text-ink-900 focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500 dark:border-white/15 dark:bg-ink-900 dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-ink-900/15 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-maroon-500 focus:outline-none focus:ring-1 focus:ring-maroon-500 dark:border-white/15 dark:bg-ink-900 dark:text-white",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-400", className)}
      {...props}
    />
  );
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1 text-xs text-maroon-500">{children}</p>;
}
