import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { computeTotal } from "@/lib/pricing";
import { nanoid } from "nanoid";

const CartItemSchema = z.object({
  id: z.string(),
  menuItemId: z.string(),
  name: z.string(),
  basePrice: z.number().positive(),
  supplementsTotal: z.number().min(0),
  quantity: z.number().int().positive().max(20),
  options: z.object({
    viande: z.string().optional(),
    accompagnement: z.string().optional(),
    sauces: z.array(z.string()).optional(),
    boisson: z.string().optional(),
    supplements: z.array(z.string()).optional(),
    notes: z.string().max(200).optional(),
  }),
});

const OrderSchema = z.object({
  items: z.array(CartItemSchema).min(1).max(50),
  subtotal: z.number().positive(),
  deliveryFee: z.number().min(0),
  total: z.number().positive(),
  paymentMethod: z.enum(["stripe", "on_site"]),
  customerName: z.string().min(1).max(100),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10).max(20),
  channel: z.enum(["pickup", "delivery"]),
  deliveryAddress: z.record(z.string(), z.unknown()).nullable(),
  scheduledFor: z.string().datetime().nullable(),
  notes: z.string().max(500).optional(),
});

function generateShortCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "KDO-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = OrderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Verify total consistency
    const expectedTotal = computeTotal(data.subtotal, data.deliveryFee);
    if (Math.abs(expectedTotal - data.total) > 0.01) {
      return NextResponse.json({ error: "Montant total incohérent" }, { status: 400 });
    }

    const orderId = nanoid();
    let shortCode: string;
    let attempts = 0;
    do {
      shortCode = generateShortCode();
      attempts++;
    } while (attempts < 10);

    await db.insert(orders).values({
      id: orderId,
      shortCode,
      status: data.paymentMethod === "on_site" ? "preparing" : "pending",
      channel: data.channel,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      deliveryAddress: data.deliveryAddress ?? undefined,
      scheduledFor: data.scheduledFor ?? undefined,
      items: data.items,
      subtotal: data.subtotal,
      deliveryFee: data.deliveryFee,
      total: data.total,
      paymentMethod: data.paymentMethod,
      notes: data.notes,
    });

    // Send notification email (non-blocking)
    void sendOrderNotification(orderId, shortCode, data).catch(console.error);

    return NextResponse.json({ orderId, shortCode }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

async function sendOrderNotification(
  orderId: string,
  shortCode: string,
  data: z.infer<typeof OrderSchema>
) {
  const resendKey = process.env["RESEND_API_KEY"];
  const restaurantEmail = process.env["RESTAURANT_EMAIL"];
  if (!resendKey || resendKey === "re_test_placeholder") return;

  const { Resend } = await import("resend");
  const resend = new Resend(resendKey);

  const itemsSummary = data.items
    .map((i) => `${i.quantity}× ${i.name}`)
    .join(", ");

  await resend.emails.send({
    from: process.env["FROM_EMAIL"] ?? "noreply@kebabdor.fr",
    to: restaurantEmail ?? "admin@kebabdor.fr",
    subject: `🥙 Nouvelle commande ${shortCode} — ${data.channel === "pickup" ? "Click & Collect" : "Livraison"}`,
    html: `
      <h2>Nouvelle commande ${shortCode}</h2>
      <p><strong>Client :</strong> ${data.customerName} — ${data.customerPhone}</p>
      <p><strong>Mode :</strong> ${data.channel === "pickup" ? "Click & Collect" : "Livraison"}</p>
      <p><strong>Articles :</strong> ${itemsSummary}</p>
      <p><strong>Total :</strong> ${data.total.toFixed(2)} €</p>
      <p><strong>Paiement :</strong> ${data.paymentMethod === "stripe" ? "Carte en ligne" : "Sur place"}</p>
      <p><a href="${process.env["NEXT_PUBLIC_APP_URL"]}/admin/commandes">Voir dans l'admin</a></p>
    `,
  });

  // Confirmation client
  await resend.emails.send({
    from: process.env["FROM_EMAIL"] ?? "noreply@kebabdor.fr",
    to: data.customerEmail,
    subject: `✅ Commande ${shortCode} confirmée — Kebab d'Or Lyon`,
    html: `
      <h2>Votre commande est confirmée !</h2>
      <p>Bonjour ${data.customerName},</p>
      <p>Votre commande <strong>${shortCode}</strong> a bien été reçue.</p>
      <p><strong>Articles :</strong> ${itemsSummary}</p>
      <p><strong>Total :</strong> ${data.total.toFixed(2)} €</p>
      <p><strong>Temps estimé :</strong> ${data.channel === "pickup" ? "15 minutes (click & collect)" : "30 minutes (livraison)"}</p>
      <p>Restaurant : 37 rue Marietton, 69009 Lyon — <a href="tel:+33478472426">+33 4 78 47 24 26</a></p>
      <p>Merci de votre confiance !</p>
      <p><em>L'équipe Kebab d'Or – La Mer Égée</em></p>
    `,
  });
}
