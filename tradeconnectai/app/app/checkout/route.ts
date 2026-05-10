import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const plan = searchParams.get("plan");

  const priceMap: any = {
    starter: "price_1TUuyDCoBGouJuyJ3yVdmYKo",
    pro: "price_1TUuzHCoBGouJuyJWa9PRWli",
    ultimate: "price_1TUv02CoBGouJuyJX50iwuio",
  };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceMap[plan!], quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
  });

  return NextResponse.redirect(session.url!);
}
