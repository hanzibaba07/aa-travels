import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const agents = await prisma.travelAgent.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ agents });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const agent = await prisma.travelAgent.update({ where: { id }, data: { status } });
  return NextResponse.json({ agent });
}
