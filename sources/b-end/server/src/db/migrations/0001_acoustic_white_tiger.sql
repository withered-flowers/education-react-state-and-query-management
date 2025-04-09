PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_colors` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`year` integer NOT NULL,
	`color` text NOT NULL,
	`pantone_value` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_colors`("id", "name", "year", "color", "pantone_value", "created_at", "updated_at") SELECT "id", "name", "year", "color", "pantone_value", "created_at", "updated_at" FROM `colors`;--> statement-breakpoint
DROP TABLE `colors`;--> statement-breakpoint
ALTER TABLE `__new_colors` RENAME TO `colors`;--> statement-breakpoint
PRAGMA foreign_keys=ON;