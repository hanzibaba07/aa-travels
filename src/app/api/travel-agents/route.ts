import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { travelAgentSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = travelAgentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });
  }
  try {
    const agent = await prisma.travelAgent.create({ data: parsed.data });
    return NextResponse.json({ success: true, id: agent.id }, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "An application with this email already exists" }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
