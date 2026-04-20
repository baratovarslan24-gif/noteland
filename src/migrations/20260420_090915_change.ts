import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "products" DROP CONSTRAINT "products_brand_id_brands_id_fk";
  
  DROP INDEX "products_brand_idx";
  ALTER TABLE "categories" ADD COLUMN "icon_id" integer;
  ALTER TABLE "products" ADD COLUMN "main_photo_id" integer;
  ALTER TABLE "products" ADD COLUMN "sale_price" numeric;
  ALTER TABLE "products" ADD COLUMN "is_published" boolean DEFAULT false;
  ALTER TABLE "products_rels" ADD COLUMN "brands_id" integer;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_main_photo_id_media_id_fk" FOREIGN KEY ("main_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_brands_fk" FOREIGN KEY ("brands_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "categories_icon_idx" ON "categories" USING btree ("icon_id");
  CREATE INDEX "products_main_photo_idx" ON "products" USING btree ("main_photo_id");
  CREATE INDEX "products_rels_brands_id_idx" ON "products_rels" USING btree ("brands_id");
  ALTER TABLE "products" DROP COLUMN "brand_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_icon_id_media_id_fk";
  
  ALTER TABLE "products" DROP CONSTRAINT "products_main_photo_id_media_id_fk";
  
  ALTER TABLE "products_rels" DROP CONSTRAINT "products_rels_brands_fk";
  
  DROP INDEX "categories_icon_idx";
  DROP INDEX "products_main_photo_idx";
  DROP INDEX "products_rels_brands_id_idx";
  ALTER TABLE "products" ADD COLUMN "brand_id" integer;
  ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "products_brand_idx" ON "products" USING btree ("brand_id");
  ALTER TABLE "categories" DROP COLUMN "icon_id";
  ALTER TABLE "products" DROP COLUMN "main_photo_id";
  ALTER TABLE "products" DROP COLUMN "sale_price";
  ALTER TABLE "products" DROP COLUMN "is_published";
  ALTER TABLE "products_rels" DROP COLUMN "brands_id";`)
}
