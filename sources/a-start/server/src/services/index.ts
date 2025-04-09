import { db } from "../db/config";
import { type InsertColor, colorsTable } from "../db/schema";

export const rootService = {
	getHandler: async () => {
		return {
			message: "Hello World!",
		};
	},
};

export const colorService = {
	getHandler: async () => {
		const dataColors = await db.select().from(colorsTable);
		return {
			data: dataColors,
		};
	},
	postHandler: async ({ body }: { body: InsertColor }) => {
		const dataColors = await db
			.insert(colorsTable)
			.values({
				...body,
				year: Number(body.year),
				created_at: new Date(),
				updated_at: new Date(),
			})
			.returning();
		return {
			data: dataColors[0],
		};
	},
};
