import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json(); // [{ role: "user", content: "..." }, ...]

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are TradeConnect AI, an assistant for trades (plumbers, electricians, etc). Be clear, concise, and friendly.",
      },
      ...messages,
    ],
  });

  const reply = completion.choices[0]?.message?.content ?? "Sorry, I had an issue replying.";

  return NextResponse.json({ reply });
}
