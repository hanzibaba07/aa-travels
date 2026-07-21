import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { StarDivider } from "@/components/ui/star-divider";
import { AgentForm } from "@/components/sections/agent-form";

export const metadata: Metadata = {
  title: "Partner With AA Group Travels | Travel Agents",
  description: "Register as a travel agent partner for direct hotel contracts, wholesale pricing, fast quotations and instant confirmation in Makkah & Madinah.",
};

const benefits = [
  "Direct hotel contracts — no third-party mark-ups",
  "Wholesale pricing across 3, 4 and 5-star properties",
  "Fast quotations, usually within hours",
  "A dedicated account manager for your agency",
  "Group booking allocations for peak seasons",
  "Instant confirmation on available inventory",
];

export default function TravelAgentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon-500">For travel agencies</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink-900 dark:text-white">
            Partner With AA Group Travels
          </h1>
          <StarDivider className="justify-start" />
          <p className="mt-4 max-w-lg text-ink-700 dark:text-white/70">
            We work directly with hotels in Makkah &amp; Madinah, which means your agency gets wholesale pricing,
            faster answers, and inventory you can actually confirm — not just enquire about.
          </p>

          <ul className="mt-8 space-y-4">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-ink-700 dark:text-white/80">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-maroon-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-ink-900/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Partner Registration</h2>
          <p className="mt-1 text-sm text-ink-400 dark:text-white/60">
            Tell us about your agency and we'll be in touch within one business day.
          </p>
          <div className="mt-6">
            <AgentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
