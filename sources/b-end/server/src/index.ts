import { cors } from "@elysiajs/cors";

import { Elysia, t } from "elysia";

import { baseSwagger } from "./config/swagger";
import { InsertColorSchema, SelectColorSchema } from "./db/schema";
import { colorService, rootService } from "./services";

const app = new Elysia()
	.use(cors())
	.use(baseSwagger)
	.get("/", () => rootService.getHandler(), {
		detail: {
			description: "Return a greeting message",
		},
		response: {
			200: t.Object(
				{
					message: t.String({
						description: "A greeting message",
						value: "Hello Elysia",
					}),
				},
				{
					description: "Response object for the greeting endpoint",
				},
			),
		},
	})
	.get(
		"/colors",
		async () => {
			return await colorService.getHandler();
		},
		{
			detail: {
				description: "Return a list of colors",
			},
			response: {
				200: t.Object(
					{
						data: t.Array(SelectColorSchema),
					},
					{
						description: "Response object for the colors endpoint",
					},
				),
			},
		},
	)
	.post(
		"/colors",
		async ({ body }) => {
			return await colorService.postHandler({ body });
		},
		{
			body: t.Omit(InsertColorSchema, ["id", "created_at", "updated_at"]),
			detail: {
				description: "Create a new color",
			},
			response: {
				200: t.Object(
					{
						data: InsertColorSchema,
					},
					{
						description: "Response object for the create color endpoint",
					},
				),
			},
		},
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
