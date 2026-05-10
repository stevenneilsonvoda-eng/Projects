import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET() {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });

  return NextResponse.redirect(session.url);
}
