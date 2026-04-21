import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { openingHours } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const HoursSchema = z.array(z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  openTime: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
  closed: z.boolean(),
}));

export async function PUT(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = HoursSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    for (const row of parsed.data) {
      await db
        .insert(openingHours)
        .values(row)
        .onConflictDoUpdate({
          target: openingHours.dayOfWeek,
          set: { openTime: row.openTime, closeTime: row.closeTime, closed: row.closed },
        });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
