import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "website" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"home_banner_id" integer NOT NULL,
  	"address" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_telegram" varchar,
  	"socials_whatsapp" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "featured_product_list_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer
  );
  
  CREATE TABLE "featured_product_list" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "website" ADD CONSTRAINT "website_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website" ADD CONSTRAINT "website_home_banner_id_media_id_fk" FOREIGN KEY ("home_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_product_list_products" ADD CONSTRAINT "featured_product_list_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_product_list_products" ADD CONSTRAINT "featured_product_list_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_product_list"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "website_logo_idx" ON "website" USING btree ("logo_id");
  CREATE INDEX "website_home_banner_idx" ON "website" USING btree ("home_banner_id");
  CREATE INDEX "featured_product_list_products_order_idx" ON "featured_product_list_products" USING btree ("_order");
  CREATE INDEX "featured_product_list_products_parent_id_idx" ON "featured_product_list_products" USING btree ("_parent_id");
  CREATE INDEX "featured_product_list_products_product_idx" ON "featured_product_list_products" USING btree ("product_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "website" CASCADE;
  DROP TABLE "featured_product_list_products" CASCADE;
  DROP TABLE "featured_product_list" CASCADE;`)
}
