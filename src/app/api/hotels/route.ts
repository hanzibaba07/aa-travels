import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || undefined;
  const star = searchParams.get("star") || undefined;

  const hotels = await prisma.hotel.findMany({
    where: {
      active: true,
      city: city ? (city as any) : undefined,
      star: star ? (star as any) : undefined,
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ hotels });
}
