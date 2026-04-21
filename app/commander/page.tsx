import type { Metadata } from "next";
import { CommanderCatalog } from "@/components/commerce/CommanderCatalog";
import menuData from "@/data/menu.json";
import { db } from "@/lib/db";
import { menuOverrides } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "Commander en ligne",
  description: "Composez votre repas kebab halal et commandez en ligne. Click & collect ou livraison à Lyon Vaise.",
  robots: { index: false },
};

async function getMenuOverrides() {
  try {
    return await db.select().from(menuOverrides);
  } catch {
    return [];
  }
}

export default async function CommanderPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const params = await searchParams;
  const overrides = await getMenuOverrides();

  const overrideMap = Object.fromEntries(
    overrides.map((o) => [o.itemId, o])
  );

  const enrichedMenu = menuData.map((item) => ({
    ...item,
    available: overrideMap[item.id]?.available ?? true,
    basePrice: overrideMap[item.id]?.priceOverride ?? item.basePrice,
  }));

  return (
    <CommanderCatalog
      menu={enrichedMenu}
      highlightItemId={params.item}
    />
  );
}
