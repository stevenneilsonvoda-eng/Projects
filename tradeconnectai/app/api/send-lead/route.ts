import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const lead = await req.json();

  await resend.emails.send({
    from: "TradeConnectAI <noreply@yourdomain.com>",
    to: "youremail@example.com",
    subject: "New TradeConnectAI Lead",
    html: `
      <h2>New Lead Captured</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Job Details:</strong> ${lead.jobDetails}</p>
    `,
  });

  return NextResponse.json({ success: true });
}
