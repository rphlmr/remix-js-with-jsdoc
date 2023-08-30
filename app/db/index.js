import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
	throw new Error("Missing DATABASE_URL environment variable");
}

export const client = postgres();
export const db = drizzle(client, {
	schema,
});
