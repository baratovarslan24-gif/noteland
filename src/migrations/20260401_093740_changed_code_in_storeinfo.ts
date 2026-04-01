import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website" DROP CONSTRAINT "website_home_banner_id_media_id_fk";
  
  DROP INDEX "website_home_banner_idx";
  ALTER TABLE "website" ADD COLUMN "hero_image_id" integer NOT NULL;
  ALTER TABLE "website" ADD CONSTRAINT "website_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "website_hero_image_idx" ON "website" USING btree ("hero_image_id");
  ALTER TABLE "website" DROP COLUMN "home_banner_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "website" DROP CONSTRAINT "website_hero_image_id_media_id_fk";
  
  DROP INDEX "website_hero_image_idx";
  ALTER TABLE "website" ADD COLUMN "home_banner_id" integer NOT NULL;
  ALTER TABLE "website" ADD CONSTRAINT "website_home_banner_id_media_id_fk" FOREIGN KEY ("home_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "website_home_banner_idx" ON "website" USING btree ("home_banner_id");
  ALTER TABLE "website" DROP COLUMN "hero_image_id";`)
}
