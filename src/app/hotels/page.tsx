import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HotelCard } from "@/components/sections/hotel-card";
import { StarDivider } from "@/components/ui/star-divider";

export const metadata: Metadata = {
  title: "Hotels in Makkah & Madinah",
  description: "Browse AA Group Travels hotel options in Makkah and Madinah.",
};

const cityDetails = {
  MAKKAH: {
    title: "Makkah Hotels",
    eyebrow: "Stay close to Masjid al-Haram",
    description:
      "Comfortable Makkah hotel options for families, groups and travel partners, with categories from practical stays to luxury suites.",
  },
  MADINAH: {
    title: "Madinah Hotels",
    eyebrow: "Stay close to Al-Masjid an-Nabawi",
    description:
      "Selected Madinah hotels for peaceful visits, group stays and tailored Umrah itineraries.",
  },
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; star?: string }>;
}) {
  const filters = await searchParams;
  let hotels: any[] = [];
  try {
    hotels = await prisma.hotel.findMany({
      where: {
        active: true,
        city: filters.city ? (filters.city as any) : undefined,
        star: filters.star ? (filters.star as any) : undefined,
      },
      include: { images: { orderBy: { position: "asc" }, take: 1 } },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });
  } catch {
    hotels = [];
  }

  const makkahHotels = hotels.filter((hotel) => hotel.city === "MAKKAH");
  const madinahHotels = hotels.filter((hotel) => hotel.city === "MADINAH");
  const citySections = [
    { key: "MAKKAH", hotels: makkahHotels, ...cityDetails.MAKKAH },
    { key: "MADINAH", hotels: madinahHotels, ...cityDetails.MADINAH },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-maroon-500">AA Group Travels hotels</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-900 dark:text-white">Hotels in Makkah &amp; Madinah</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-500 dark:text-white/60">
          Choose your city and browse hotel options for your Umrah journey.
        </p>
        <StarDivider />
      </div>

      <form className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-3" method="get">
        <select name="city" defaultValue={filters.city} className="h-11 rounded-lg border border-ink-900/15 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-900 dark:text-white">
          <option value="">All Cities</option>
          <option value="MAKKAH">Makkah</option>
          <option value="MADINAH">Madinah</option>
        </select>
        <select name="star" defaultValue={filters.star} className="h-11 rounded-lg border border-ink-900/15 bg-white px-4 text-sm dark:border-white/15 dark:bg-ink-900 dark:text-white">
          <option value="">All Categories</option>
          <option value="THREE">3-Star</option>
          <option value="FOUR">4-Star</option>
          <option value="FIVE">5-Star</option>
          <option value="LUXURY_SUITE">Luxury Suite</option>
        </select>
        <button type="submit" className="h-11 rounded-full bg-maroon-500 px-6 text-sm font-medium text-white hover:bg-maroon-600">
          Filter
        </button>
      </form>

      <section className="mt-12">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">Hotel Selection Lists</p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 dark:text-white">Makkah &amp; Madinah Hotel Lists</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white dark:border-white/10 dark:bg-white/5">
            <Image
              src="/images/hotels/makkah-hotels-selection.jpeg"
              alt="Makkah hotels selection list"
              width={1038}
              height={1280}
              className="h-auto w-full"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-ink-900/10 bg-white dark:border-white/10 dark:bg-white/5">
            <Image
              src="/images/hotels/madinah-hotels-selection.jpeg"
              alt="Madinah hotels selection list"
              width={1008}
              height={1280}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {hotels.length > 0 ? (
        <div className="mt-16 space-y-20">
          {citySections.map((section) => (
            <section key={section.key} id={section.key.toLowerCase()}>
              <div className="mb-8 max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">{section.eyebrow}</p>
                <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 dark:text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-500 dark:text-white/60">{section.description}</p>
              </div>
              {section.hotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {section.hotels.map((h) => (
                    <HotelCard
                      key={h.id}
                      hotel={{ slug: h.slug, name: h.name, city: h.city, star: h.star, distanceMeters: h.distanceMeters, imageUrl: h.images?.[0]?.url }}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-ink-900/15 bg-white p-8 text-sm text-ink-400 dark:border-white/15 dark:bg-white/5 dark:text-white/50">
                  No {section.title.toLowerCase()} are available yet.
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-14 text-center text-sm text-ink-400 dark:text-white/50">
          No hotels found. Connect a database and run <code>npm run seed</code> to populate this page.
        </p>
      )}
    </div>
  );
}
