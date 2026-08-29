import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { INITIAL_PRODUCTS, INITIAL_PROMOTION } from "./queries";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.log("No DATABASE_URL found in environment. Skipping Neon DB seed.");
    process.exit(0);
  }

  console.log("Connecting to Neon Database for seeding...");
  const sql = neon(url);
  const db = drizzle(sql, { schema });

  console.log("Seeding products...");
  for (const prod of INITIAL_PRODUCTS) {
    await db
      .insert(schema.products)
      .values({
        id: prod.id,
        slug: prod.slug,
        name: prod.name,
        sizeLabel: prod.sizeLabel,
        price: prod.price,
        description: prod.description,
        ingredients: prod.ingredients,
        usage: prod.usage,
        image: prod.image,
        stock: prod.stock,
      })
      .onConflictDoUpdate({
        target: schema.products.slug,
        set: {
          name: prod.name,
          sizeLabel: prod.sizeLabel,
          price: prod.price,
          description: prod.description,
          ingredients: prod.ingredients,
          usage: prod.usage,
          image: prod.image,
          stock: prod.stock,
        },
      });
  }

  console.log("Seeding active promotion...");
  await db.insert(schema.promotions).values({
    id: INITIAL_PROMOTION.id,
    headline: INITIAL_PROMOTION.headline,
    description: INITIAL_PROMOTION.description,
    active: INITIAL_PROMOTION.active,
  }).onConflictDoNothing();

  console.log("Seeding completed successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
