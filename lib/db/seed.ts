import { db } from "./index";
import { openingHours, menuOverrides } from "./schema";
import menuData from "../../data/menu.json";

async function seed() {
  console.log("🌱 Seeding database...");

  const defaultHours = [
    { dayOfWeek: 0, closed: true, openTime: null, closeTime: null },
    { dayOfWeek: 1, closed: false, openTime: "11:00", closeTime: "22:30" },
    { dayOfWeek: 2, closed: false, openTime: "11:00", closeTime: "22:30" },
    { dayOfWeek: 3, closed: false, openTime: "11:00", closeTime: "22:30" },
    { dayOfWeek: 4, closed: false, openTime: "11:00", closeTime: "22:30" },
    { dayOfWeek: 5, closed: false, openTime: "15:00", closeTime: "23:30" },
    { dayOfWeek: 6, closed: false, openTime: "11:00", closeTime: "23:30" },
  ];

  for (const hour of defaultHours) {
    await db
      .insert(openingHours)
      .values(hour)
      .onConflictDoNothing();
  }
  console.log("✅ Opening hours seeded");

  for (const item of menuData) {
    await db
      .insert(menuOverrides)
      .values({ itemId: item.id, available: true })
      .onConflictDoNothing();
  }
  console.log(`✅ Menu overrides seeded (${menuData.length} items)`);

  console.log("🎉 Database seeded successfully!");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
