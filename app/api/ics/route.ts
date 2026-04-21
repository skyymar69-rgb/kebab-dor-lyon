import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId))
    .limit(1);

  const order = result[0];
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const now = new Date();
  const dtStamp = formatICSDate(now);
  const prepTime = order.channel === "pickup" ? 15 : 30;
  const eta = new Date(now.getTime() + prepTime * 60000);
  const dtStart = formatICSDate(eta);
  const dtEnd = formatICSDate(new Date(eta.getTime() + 15 * 60000));

  const location = order.channel === "pickup"
    ? "37 rue Marietton\\, 69009 Lyon (Kebab d'Or)"
    : "Livraison à domicile — Kebab d'Or";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kebab d'Or//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${order.id}@kebabdor-lyon.fr`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:Commande ${order.shortCode} — Kebab d'Or`,
    `DESCRIPTION:Votre commande ${order.shortCode} est prête. Kebab d'Or\\, 37 rue Marietton\\, Lyon.`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="commande-${order.shortCode}.ics"`,
    },
  });
}

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(".000", "").slice(0, 15) + "Z";
}
