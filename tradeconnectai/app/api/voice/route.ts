import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    return NextResponse.json({
      success: true,
      message: `Voice API received: ${text}`
    });
  } catch (err) {
    console.error("Voice API error:", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
