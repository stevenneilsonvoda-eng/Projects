import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    // Clerk v7: auth() MUST be awaited
    const session = await auth();

    // userId now lives inside sessionClaims
    const userId = session.sessionClaims?.userId as string | undefined;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.stripeCustomerId) {
      return NextResponse.json(
        { error: "User or Stripe customer not found" },
        { status: 404 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: user.stripeCustomerId,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1
        }
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?canceled=1`
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
