import { drizzle } from "drizzle-orm/libsql/node";

export const db = drizzle({
	connection: {
		url: process.env.VALID_DATABASE_URL,
	},
});
