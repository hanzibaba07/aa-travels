import { StarDivider } from "@/components/ui/star-divider";

export const metadata = { title: "FAQ" };

const faqs = [
  { q: "How quickly will I receive a quotation?", a: "Most quote requests are answered within a few working hours during UK office hours." },
  { q: "Do you offer wholesale rates for agencies?", a: "Yes — register on the Travel Agents page for direct contract pricing." },
  { q: "Can I request a custom Umrah package?", a: "Yes, use the quote form and describe your dates, group size and budget." },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-center font-display text-3xl font-semibold text-ink-900 dark:text-white">Frequently Asked Questions</h1>
      <StarDivider />
      <div className="mt-10 space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-xl border border-ink-900/10 p-5 dark:border-white/10">
            <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">{f.q}</h2>
            <p className="mt-2 text-sm text-ink-700 dark:text-white/70">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
