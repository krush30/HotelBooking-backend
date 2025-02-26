ALTER TABLE "units" ALTER COLUMN "type" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" SET DATA TYPE json;--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "units" ALTER COLUMN "availability" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "units" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_listing_id_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("id") ON DELETE cascade ON UPDATE no action;