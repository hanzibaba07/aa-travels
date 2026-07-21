import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getCounts() {
  try {
    const [hotels, enquiries, agents, packages, testimonials] = await Promise.all([
      prisma.hotel.count(),
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.travelAgent.count({ where: { status: "PENDING" } }),
      prisma.package.count(),
      prisma.testimonial.count({ where: { approved: false } }),
    ]);
    return { hotels, enquiries, agents, packages, testimonials };
  } catch {
    return { hotels: 0, enquiries: 0, agents: 0, packages: 0, testimonials: 0 };
  }
}

async function getRecentEnquiries() {
  try {
    return await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 8 });
  } catch {
    return [];
  }
}

const cards = [
  { key: "hotels", label: "Hotels", href: "/admin/dashboard/hotels" },
  { key: "enquiries", label: "New Enquiries", href: "/admin/dashboard/enquiries" },
  { key: "agents", label: "Pending Agent Applications", href: "/admin/dashboard/agents" },
  { key: "packages", label: "Umrah Packages", href: "/admin/dashboard/packages" },
  { key: "testimonials", label: "Testimonials to Approve", href: "/admin/dashboard/testimonials" },
] as const;

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const recent = await getRecentEnquiries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">Dashboard</h1>
        <form action="/api/auth/logout" method="post">
          <button
            formAction="/api/auth/logout"
            className="rounded-full border border-ink-900/15 px-4 py-2 text-sm hover:bg-ink-900/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            Log out
          </button>
        </form>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {cards.map((c) => (
          <Link
            key={c.key}
            href={c.href}
            className="rounded-2xl border border-ink-900/10 bg-white p-5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
          >
            <p className="font-display text-3xl font-semibold text-maroon-500">{counts[c.key as keyof typeof counts]}</p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-400 dark:text-white/50">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Recent Enquiries</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-ink-900/10 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink-900/5 text-xs uppercase tracking-wide text-ink-400 dark:bg-white/5 dark:text-white/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Destination</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-ink-400 dark:text-white/50">
                    No enquiries yet.
                  </td>
                </tr>
              ) : (
                recent.map((e: any) => (
                  <tr key={e.id} className="border-t border-ink-900/10 dark:border-white/10">
                    <td className="px-4 py-3">{e.fullName}</td>
                    <td className="px-4 py-3">{e.email}</td>
                    <td className="px-4 py-3">{e.destination ?? "-"}</td>
                    <td className="px-4 py-3">{e.status}</td>
                    <td className="px-4 py-3">{new Date(e.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-8 text-xs text-ink-400 dark:text-white/40">
        This overview reads live from the database. Full CRUD screens for hotels, packages,
        testimonials and travel agents follow the same pattern as <code>/api/admin/hotels</code> — see the README
        for how to extend each section.
      </p>
    </div>
  );
}
