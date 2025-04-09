import { swagger } from "@elysiajs/swagger";

export const baseSwagger = swagger({
	documentation: {
		info: {
			title: "Backend - Belajar Beruang & Query Management",
			version: "1.0.0",
		},
	},
	path: "/docs",
	provider: "scalar",
});
