import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Auth is already enforced by middleware.ts for every /api/admin/* route.
export async function GET() {
  const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ enquiries });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const enquiry = await prisma.enquiry.update({ where: { id }, data: { status } });
  return NextResponse.json({ enquiry });
}
