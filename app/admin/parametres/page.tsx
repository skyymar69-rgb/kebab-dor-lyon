import type { Metadata } from "next";
import { db } from "@/lib/db";
import { openingHours } from "@/lib/db/schema";
import { ParametresClient } from "@/components/admin/ParametresClient";

export const metadata: Metadata = { title: "Paramètres — Admin" };
export const dynamic = "force-dynamic";

const DAYS_FR = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

async function getHours() {
  try {
    return await db.select().from(openingHours);
  } catch {
    return [];
  }
}

export default async function ParametresPage() {
  const hours = await getHours();
  const hoursWithLabels = hours.map((h) => ({
    ...h,
    dayLabel: DAYS_FR[h.dayOfWeek] ?? `Jour ${h.dayOfWeek}`,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
        Paramètres
      </h1>
      <ParametresClient hours={hoursWithLabels} />
    </div>
  );
}
