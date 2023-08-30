import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
});
