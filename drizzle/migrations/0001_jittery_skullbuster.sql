ALTER TABLE "units" DROP CONSTRAINT "units_listing_id_listings_id_fk";
--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "type" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "price" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "units" DROP COLUMN "created_at";