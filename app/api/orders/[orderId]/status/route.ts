import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const StatusSchema = z.object({
  status: z.enum(["pending", "paid", "preparing", "ready", "delivering", "completed", "cancelled"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  try {
    const body: unknown = await req.json();
    const parsed = StatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }

    await db
      .update(orders)
      .set({ status: parsed.data.status })
      .where(eq(orders.id, orderId));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
