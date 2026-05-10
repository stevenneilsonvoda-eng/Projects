export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("List bookings error:", error);
    return NextResponse.json(
      { error: "Failed to load bookings" },
      { status: 500 }
    );
  }
}
