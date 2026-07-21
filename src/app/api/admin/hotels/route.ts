import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken, requireRole } from "@/lib/auth";

function getAuth(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  return token ? verifyAdminToken(token) : null;
}

// Full CRUD for hotels, gated to authenticated admins.
export async function GET(req: NextRequest) {
  const auth = getAuth(req);
  if (!requireRole(auth, ["SUPER_ADMIN", "ADMIN", "EDITOR"])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const hotels = await prisma.hotel.findMany({
    include: { images: true, rooms: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ hotels });
}

export async function POST(req: NextRequest) {
  const auth = getAuth(req);
  if (!requireRole(auth, ["SUPER_ADMIN", "ADMIN"])) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const hotel = await prisma.hotel.create({ data: body });
  return NextResponse.json({ hotel }, { status: 201 });
}
