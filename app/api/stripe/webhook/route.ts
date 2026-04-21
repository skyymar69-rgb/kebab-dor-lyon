import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripeKey = process.env["STRIPE_SECRET_KEY"];
  const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !webhookSecret || !stripeKey) {
    return NextResponse.json({ error: "Missing configuration" }, { status: 400 });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata["orderId"];

    if (orderId) {
      await db
        .update(orders)
        .set({
          status: "paid",
          paymentIntentId: paymentIntent.id,
        })
        .where(eq(orders.id, orderId));
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata["orderId"];

    if (orderId) {
      await db
        .update(orders)
        .set({ status: "cancelled" })
        .where(eq(orders.id, orderId));
    }
  }

  return NextResponse.json({ received: true });
}
