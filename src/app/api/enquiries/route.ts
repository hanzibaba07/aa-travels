import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/validations";
import { sendEnquiryEmails } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const enquiry = await prisma.enquiry.create({
      data: {
        fullName: data.fullName,
        country: data.country,
        agencyName: data.agencyName,
        whatsapp: data.whatsapp,
        email: data.email,
        checkIn: data.checkIn ? new Date(data.checkIn) : undefined,
        checkOut: data.checkOut ? new Date(data.checkOut) : undefined,
        destination: data.destination,
        hotelCategory: data.hotelCategory,
        budget: data.budget,
        adults: data.adults,
        children: data.children,
        rooms: data.rooms,
        message: data.message,
      },
    });

    // Fire-and-forget email notifications; do not block the response on SMTP.
    sendEnquiryEmails({
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      destination: data.destination,
      hotelCategory: data.hotelCategory,
      checkIn: data.checkIn ? new Date(data.checkIn) : null,
      checkOut: data.checkOut ? new Date(data.checkOut) : null,
      message: data.message,
    }).catch((err) => console.error("Email send failed:", err));

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Admin-only listing; real auth check happens in middleware.ts for /api/admin/*.
  // Kept here read-only and unauthenticated-safe: returns nothing sensitive by default.
  return NextResponse.json({ error: "Use /api/admin/enquiries with an admin session" }, { status: 403 });
}
