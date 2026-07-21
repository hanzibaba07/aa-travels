import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  const payload = token ? verifyAdminToken(token) : null;
  if (!payload) return NextResponse.json({ admin: null }, { status: 401 });
  return NextResponse.json({ admin: payload });
}
