import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    // ✅ Clerk v7: await auth()
    const session = await auth();

    const userId = session.sessionClaims?.userId as string | undefined;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user?.stripeCustomerId) {
      return NextResponse.json({ error: "No Stripe customer for user" }, { status: 400 });
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`
    });

    return NextResponse.json({ url: portal.url });
  } catch (err) {
    console.error("Portal error:", err);
    return NextResponse.json({ error: "Failed to create portal" }, { status: 500 });
  }
}
