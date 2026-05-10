import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { email, userId } = await req.json();

    const customer = await stripe.customers.create({
      email,
      metadata: { userId }
    });

    await db.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id }
    });

    return NextResponse.json({ success: true, customerId: customer.id });
  } catch (err) {
    console.error("Create customer error:", err);
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
