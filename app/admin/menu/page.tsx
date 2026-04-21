import { db } from "@/lib/db";
import { menuOverrides } from "@/lib/db/schema";
import menuData from "@/data/menu.json";
import { AdminMenuClient } from "@/components/admin/AdminMenuClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Menu — Admin" };
export const dynamic = "force-dynamic";

async function getOverrides() {
  try {
    return await db.select().from(menuOverrides);
  } catch {
    return [];
  }
}

export default async function AdminMenuPage() {
  const overrides = await getOverrides();
  const overrideMap = Object.fromEntries(overrides.map((o) => [o.itemId, o]));

  const enriched = menuData.map((item) => ({
    ...item,
    available: overrideMap[item.id]?.available ?? true,
    priceOverride: overrideMap[item.id]?.priceOverride ?? null,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-[var(--color-ink)] mb-6">
        Gestion du menu
      </h1>
      <AdminMenuClient items={enriched} />
    </div>
  );
}
