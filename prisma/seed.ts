import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@aatravelgroup.co.uk" },
    update: {},
    create: {
      name: "Site Admin",
      email: "admin@aatravelgroup.co.uk",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  const amenities = await Promise.all(
    ["Free WiFi", "Haram View", "24hr Reception", "Airport Shuttle", "Elevator", "Prayer Room", "Breakfast Included"].map((name) =>
      prisma.amenity.upsert({ where: { name }, update: {}, create: { name } })
    )
  );

  const hotel = await prisma.hotel.upsert({
    where: { slug: "swissotel-al-maqam-makkah" },
    update: {},
    create: {
      name: "Swissotel Al Maqam Makkah",
      slug: "swissotel-al-maqam-makkah",
      city: "MAKKAH",
      star: "FIVE",
      description:
        "Part of the Abraj Al Bait complex with direct access to the Haram, offering spacious rooms and premium service for pilgrims and families.",
      distanceMeters: 150,
      address: "Abraj Al Bait, Ajyad Street, Makkah, Saudi Arabia",
      latitude: 21.4187,
      longitude: 39.8262,
      featured: true,
      metaTitle: "Swissotel Al Maqam Makkah | AA Travel Group",
      metaDescription: "Book Swissotel Al Maqam Makkah with direct hotel contract rates through AA Travel Group.",
      amenities: { create: amenities.slice(0, 5).map((a) => ({ amenityId: a.id })) },
      images: {
        create: [
          { url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa", publicId: "demo-1", position: 0 },
          { url: "https://images.unsplash.com/photo-1591901206543-6c72b5b6f6b3", publicId: "demo-2", position: 1 },
        ],
      },
      rooms: {
        create: [
          { name: "Deluxe Twin Room", capacity: 2, bedType: "Twin", sizeSqm: 32 },
          { name: "Haram View Suite", capacity: 4, bedType: "King + Sofa", sizeSqm: 55 },
        ],
      },
    },
  });

  await prisma.category.upsert({
    where: { slug: "umrah-guides" },
    update: {},
    create: { name: "Umrah Guides", slug: "umrah-guides" },
  });

  await prisma.package.upsert({
    where: { slug: "7-night-makkah-madinah-economy" },
    update: {},
    create: {
      title: "7 Night Makkah & Madinah — Economy Package",
      slug: "7-night-makkah-madinah-economy",
      summary: "4 nights Makkah + 3 nights Madinah in 3-star hotels, with shared transfers.",
      description: "A budget-friendly Umrah package combining comfortable 3-star hotels close to both Haramain, with group airport and inter-city transfers included.",
      nights: 7,
      city: "MAKKAH,MADINAH",
      priceFrom: 499.0,
      inclusions: "Hotel accommodation, airport transfers, Makkah-Madinah transfer, Ziyarat tour",
      exclusions: "Flights, visa, meals unless stated",
      active: true,
    },
  });

  console.log({ admin: admin.email, hotel: hotel.slug });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
