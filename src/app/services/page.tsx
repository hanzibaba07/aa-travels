import type { Metadata } from "next";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StarDivider } from "@/components/ui/star-divider";

export const metadata: Metadata = {
  title: "Services",
  description: "Hotel bookings, airport transfers, VIP transport, Umrah packages, group and corporate bookings, air tickets and customised packages.",
};

export default function ServicesPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon-500">Our services</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-900 dark:text-white">Everything for your Umrah journey</h1>
        <StarDivider />
      </div>
      <ServicesGrid />
    </div>
  );
}
