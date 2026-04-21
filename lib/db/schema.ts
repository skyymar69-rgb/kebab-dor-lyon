import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  shortCode: text("short_code").notNull().unique(),
  status: text("status", {
    enum: ["pending", "paid", "preparing", "ready", "delivering", "completed", "cancelled"],
  })
    .notNull()
    .default("pending"),
  channel: text("channel", { enum: ["pickup", "delivery"] }).notNull(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email").notNull(),
  deliveryAddress: text("delivery_address", { mode: "json" }),
  scheduledFor: text("scheduled_for"),
  items: text("items", { mode: "json" }).notNull(),
  subtotal: real("subtotal").notNull(),
  deliveryFee: real("delivery_fee").notNull().default(0),
  total: real("total").notNull(),
  paymentMethod: text("payment_method", { enum: ["stripe", "on_site"] }).notNull(),
  paymentIntentId: text("payment_intent_id"),
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const menuOverrides = sqliteTable("menu_overrides", {
  itemId: text("item_id").primaryKey(),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  priceOverride: real("price_override"),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))`),
});

export const openingHours = sqliteTable("opening_hours", {
  dayOfWeek: integer("day_of_week").primaryKey(),
  openTime: text("open_time"),
  closeTime: text("close_time"),
  closed: integer("closed", { mode: "boolean" }).notNull().default(false),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type MenuOverride = typeof menuOverrides.$inferSelect;
export type OpeningHour = typeof openingHours.$inferSelect;
