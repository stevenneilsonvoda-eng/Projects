import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "customer.subscription.updated") {
      const subscription = event.data.object as Stripe.Subscription;

      await db.user.update({
        where: { stripeCustomerId: subscription.customer as string },
        data: {
          subscriptionStatus: subscription.status
        }
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
