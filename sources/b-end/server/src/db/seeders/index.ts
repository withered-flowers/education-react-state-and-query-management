import { db } from "../config";
import { type SelectColor, colorsTable } from "../schema";

type FetchedColors = {
	data: SelectColor[];
};

const fnFetcher = async () => {
	const responseColors = await fetch("https://reqres.in/api/colors");
	const dataColors: FetchedColors = await responseColors.json();
	const colors = dataColors.data;

	return colors;
};

const modifyColors = async (colors: SelectColor[]) => {
	for (const color of colors) {
		// Create a new object without the id property and assign it back to color
		const { id, ...colorWithoutId } = color;
		Object.assign(color, colorWithoutId);

		color.created_at = new Date();
		color.updated_at = new Date();
	}
};

const main = async () => {
	console.log("Starting database seeding...");

	const colors = await fnFetcher();
	await modifyColors(colors);
	await db.insert(colorsTable).values(colors);

	console.log("Database seeded successfully");
};

main();
