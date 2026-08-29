import { db, schema } from "./index";
import { eq } from "drizzle-orm";
import { CheckoutFormValues } from "@/lib/validations/order";

export interface StaticProduct {
  id: string;
  slug: string;
  name: string;
  sizeLabel: string;
  price: string;
  description: string;
  ingredients: string;
  usage: string;
  image: string;
  stock: number;
}

export const INITIAL_PRODUCTS: StaticProduct[] = [
  {
    id: "a1b2c3d4-e5f6-47a8-9012-34567890abcd",
    slug: "shikakai-powder-500g",
    name: "Premium Herbal Shikakai Powder",
    sizeLabel: "500g",
    price: "699.00",
    description:
      "100% natural authentic Ayurvedic hair cleanser infused with 40+ powerful herbs. Free of sulphates, parabens, and synthetic chemicals. Gently purifies the scalp, strengthens root follicles, and promotes lush, thick hair growth.",
    ingredients:
      "Shikakai, Amla, Reetha, Bhringraj, Brahmi, Hibiscus Petals, Neem Leaf, Tulsi, Fenugreek, Nagarmotha, Curry Leaves, Rose Petals, Jatamansi, Aloe Vera, Kapoor Kachli, Vettiver, and 25+ secret heritage herbs.",
    usage:
      "Mix 2–3 tablespoons with warm water or buttermilk to form a paste. Apply thoroughly to wet scalp & hair. Massage gently for 3-5 minutes, then rinse completely. Use 2-3 times weekly.",
    image: "/images/shikakai-500g.png",
    stock: 150,
  },
  {
    id: "b2c3d4e5-f6a7-48b9-0123-4567890abcde",
    slug: "shikakai-powder-250g",
    name: "Premium Herbal Shikakai Powder",
    sizeLabel: "250g",
    price: "399.00",
    description:
      "Compact size of our signature 40+ herb hair cleansing elixir. Perfect for travel, trial, or daily natural hair rituals. 100% pure botanical formulation without preservatives.",
    ingredients:
      "Shikakai, Amla, Reetha, Bhringraj, Brahmi, Hibiscus Petals, Neem Leaf, Tulsi, Fenugreek, Nagarmotha, Curry Leaves, Rose Petals, Jatamansi, Aloe Vera, Kapoor Kachli, Vettiver, and 25+ secret heritage herbs.",
    usage:
      "Mix 1–2 tablespoons with warm water. Apply onto damp hair and scalp, massage gently, and rinse thoroughly.",
    image: "/images/shikakai-250g.png",
    stock: 200,
  },
  {
    id: "c3d4e5f6-a7b8-49c0-1234-567890abcdef",
    slug: "hair-oil-elixir",
    name: "Herbal Hair Oil Elixir",
    sizeLabel: "~20ml",
    price: "499.00",
    description:
      "Concentrated restorative oil elixir crafted with 40+ potent bio-active herbs cooked over 21 days in virgin cold-pressed sesame and coconut oils. Nourishes deep scalp layers, prevents premature graying, adds mirror shine, and tames frizz.",
    ingredients:
      "Cold-pressed Virgin Coconut Oil, Sesame Seed Oil, Bhringraj, Amla, Brahmi, Hibiscus Flower Extract, Vetiver Root, Gunja, Lodhra, Jatamansi, Camphor, Rosemary Essential Oil, Vitamin E.",
    usage:
      "Dispense 5-8 drops directly onto scalp using dropper. Massage gently in circular motions before bedtime or 1 hour prior to washing with Ayurvya Shikakai Powder.",
    image: "/images/hair-oil-elixir.png",
    stock: 300,
  },
];

export const INITIAL_PROMOTION = {
  id: "d4af3700-0000-4000-8000-000000000001",
  headline: "EXCLUSIVE HERBAL OFFER",
  description:
    "Buy any 500g or 250g Shikakai pack, get a 20ml Herbal Hair Oil Elixir FREE · Buy any 2 products for FREE Shipping!",
  active: "true",
};

// In-memory fallback order storage for dev environment without Neon connection
const inMemoryOrders = new Map<string, any>();

export async function getProducts(): Promise<StaticProduct[]> {
  if (db) {
    try {
      const dbProducts = await db.select().from(schema.products);
      if (dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          sizeLabel: p.sizeLabel || "",
          price: p.price,
          description: p.description || "",
          ingredients: p.ingredients || "",
          usage: p.usage || "",
          image: p.image || "/images/placeholder.png",
          stock: p.stock ?? 100,
        }));
      }
    } catch (e) {
      console.warn("Neon DB query failed, using static product fallback:", e);
    }
  }
  return INITIAL_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<StaticProduct | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getActivePromotion() {
  if (db) {
    try {
      const activePromos = await db
        .select()
        .from(schema.promotions)
        .where(eq(schema.promotions.active, "true"));
      if (activePromos.length > 0) {
        return activePromos[0];
      }
    } catch (e) {
      console.warn("Neon DB query failed, using static promo fallback:", e);
    }
  }
  return INITIAL_PROMOTION;
}

export async function processOrderCreation(formValues: CheckoutFormValues) {
  const allProducts = await getProducts();

  // Map requested items to exact DB product records
  const itemDetails: Array<{
    product: StaticProduct;
    quantity: number;
    unitPrice: string;
    isFreeGift: string;
  }> = [];

  let qualifiesForFreeOil = false;
  let totalPaidItemCount = 0;

  for (const item of formValues.items) {
    const matchedProduct = allProducts.find((p) => p.id === item.productId);
    if (!matchedProduct) {
      throw new Error(`Product not found for ID: ${item.productId}`);
    }

    if (
      matchedProduct.slug === "shikakai-powder-500g" ||
      matchedProduct.slug === "shikakai-powder-250g"
    ) {
      qualifiesForFreeOil = true;
    }

    totalPaidItemCount += item.quantity;

    itemDetails.push({
      product: matchedProduct,
      quantity: item.quantity,
      unitPrice: matchedProduct.price,
      isFreeGift: "false",
    });
  }

  // Server-Side Promo Logic: Automatically add free 20ml Herbal Hair Oil Elixir if eligible
  const hairOilProduct = allProducts.find((p) => p.slug === "hair-oil-elixir");

  // Check if free oil is already included in the paid items list or needs gift addition
  if (qualifiesForFreeOil && hairOilProduct) {
    itemDetails.push({
      product: hairOilProduct,
      quantity: 1,
      unitPrice: "0.00",
      isFreeGift: "true",
    });
  }

  // Free shipping if 2 or more paid items purchased
  const shippingFee = totalPaidItemCount >= 2 ? 0 : 50;

  // Calculate strict server-side total
  const itemsTotal = itemDetails.reduce((acc, item) => {
    return acc + parseFloat(item.unitPrice) * item.quantity;
  }, 0);

  const grandTotal = itemsTotal + shippingFee;

  const orderId = crypto.randomUUID();
  const customerId = crypto.randomUUID();

  const newOrderSummary = {
    id: orderId,
    customer: {
      id: customerId,
      name: formValues.name,
      phone: formValues.phone,
      email: formValues.email || null,
      addressLine1: formValues.addressLine1,
      addressLine2: formValues.addressLine2 || null,
      city: formValues.city,
      state: formValues.state,
      pincode: formValues.pincode,
    },
    totalAmount: grandTotal.toFixed(2),
    shippingFee: shippingFee.toFixed(2),
    paymentMethod: formValues.paymentMethod,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    items: itemDetails.map((item) => ({
      id: crypto.randomUUID(),
      productName: item.product.name,
      sizeLabel: item.product.sizeLabel,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      isFreeGift: item.isFreeGift,
    })),
  };

  // Attempt Neon database transaction if connection exists
  if (db) {
    try {
      await db.transaction(async (tx) => {
        await tx.insert(schema.customers).values({
          id: customerId,
          name: formValues.name,
          phone: formValues.phone,
          email: formValues.email || null,
          addressLine1: formValues.addressLine1,
          addressLine2: formValues.addressLine2 || null,
          city: formValues.city,
          state: formValues.state,
          pincode: formValues.pincode,
        });

        await tx.insert(schema.orders).values({
          id: orderId,
          customerId: customerId,
          totalAmount: grandTotal.toFixed(2),
          shippingFee: shippingFee.toFixed(2),
          paymentMethod: formValues.paymentMethod as any,
          status: "confirmed",
        });

        for (const item of itemDetails) {
          await tx.insert(schema.orderItems).values({
            orderId: orderId,
            productId: item.product.id,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            isFreeGift: item.isFreeGift,
          });
        }
      });
    } catch (e) {
      console.warn("Neon DB order write error, storing in memory fallback:", e);
    }
  }

  // Save to memory store for instant retrieval on order success screen
  inMemoryOrders.set(orderId, newOrderSummary);

  return newOrderSummary;
}

export async function getOrderById(orderId: string) {
  if (inMemoryOrders.has(orderId)) {
    return inMemoryOrders.get(orderId);
  }

  if (db) {
    try {
      const orderRecord = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.id, orderId));
      if (orderRecord.length > 0) {
        const order = orderRecord[0];
        const customerRecord = await db
          .select()
          .from(schema.customers)
          .where(eq(schema.customers.id, order.customerId));
        const itemsRecords = await db
          .select({
            id: schema.orderItems.id,
            quantity: schema.orderItems.quantity,
            unitPrice: schema.orderItems.unitPrice,
            isFreeGift: schema.orderItems.isFreeGift,
            productName: schema.products.name,
            sizeLabel: schema.products.sizeLabel,
          })
          .from(schema.orderItems)
          .innerJoin(
            schema.products,
            eq(schema.orderItems.productId, schema.products.id)
          )
          .where(eq(schema.orderItems.orderId, orderId));

        return {
          id: order.id,
          customer: customerRecord[0],
          totalAmount: order.totalAmount,
          shippingFee: order.shippingFee,
          paymentMethod: order.paymentMethod,
          status: order.status,
          createdAt: order.createdAt.toISOString(),
          items: itemsRecords,
        };
      }
    } catch (e) {
      console.warn("Neon DB getOrderById query failed:", e);
    }
  }

  return null;
}
