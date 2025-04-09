import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";

export const colorsTable = sqliteTable("colors", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
	year: integer("year").notNull(),
	color: text("color").notNull(),
	pantone_value: text("pantone_value").notNull(),
	created_at: integer("created_at", { mode: "timestamp" })
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updated_at: integer("updated_at", { mode: "timestamp" })
		.default(sql`CURRENT_TIMESTAMP`)
		.$onUpdate(() => new Date())
		.notNull(),
});

export type InsertColor = typeof colorsTable.$inferInsert;
export type SelectColor = typeof colorsTable.$inferSelect;

export const InsertColorSchema = createInsertSchema(colorsTable);
export const SelectColorSchema = createSelectSchema(colorsTable);
