import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.aatravelgroup.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "/hotels", "/transport", "/umrah-packages", "/services",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  try {
    const [hotels, packages] = await Promise.all([
      prisma.hotel.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
      prisma.package.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } }),
    ]);

    return [
      ...staticRoutes,
      ...hotels.map((h: any) => ({ url: `${siteUrl}/hotels/${h.slug}`, lastModified: h.updatedAt })),
      ...packages.map((p: any) => ({ url: `${siteUrl}/umrah-packages/${p.slug}`, lastModified: p.updatedAt })),
    ];
  } catch {
    return staticRoutes;
  }
}
