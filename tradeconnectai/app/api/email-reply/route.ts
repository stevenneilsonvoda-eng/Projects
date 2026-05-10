import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: NextRequest) {
  const { from, subject, body } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You write email replies for a trades business. Be short, clear, and professional. Always propose next steps and ask for confirmation.",
      },
      {
        role: "user",
        content: `Customer email:\nSubject: ${subject}\n\n${body}`,
      },
    ],
  });

  const replyText = completion.choices[0]?.message?.content ?? "Thanks for your email.";

  await resend.emails.send({
    from: "TradeConnect AI <no-reply@yourdomain.com>",
    to: from,
    subject: `Re: ${subject}`,
    text: replyText,
  });

  return NextResponse.json({ status: "sent", reply: replyText });
}
