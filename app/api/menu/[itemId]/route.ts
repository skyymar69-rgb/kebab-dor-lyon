import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { menuOverrides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const PatchSchema = z.object({
  available: z.boolean().optional(),
  priceOverride: z.number().positive().nullable().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  const { itemId } = await params;

  try {
    const body: unknown = await req.json();
    const parsed = PatchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    const updates: Partial<typeof menuOverrides.$inferInsert> = {};
    if (parsed.data.available !== undefined) updates.available = parsed.data.available;
    if ("priceOverride" in parsed.data) updates.priceOverride = parsed.data.priceOverride ?? undefined;

    await db
      .insert(menuOverrides)
      .values({ itemId, available: true, ...updates })
      .onConflictDoUpdate({ target: menuOverrides.itemId, set: updates });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
