import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST() {
  try {
    const trial = await prisma.trial.create({
      data: {
        id: randomUUID(),
        startedAt: new Date()
      }
    });

    return NextResponse.json({ success: true, trial });
  } catch (err) {
    console.error("Trial start error:", err);
    return NextResponse.json({ error: "Failed to start trial" }, { status: 500 });
  }
}
