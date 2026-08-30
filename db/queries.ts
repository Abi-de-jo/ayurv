import { db, schema } from "./index";
import { sql, eq, desc, and } from "drizzle-orm";
import { CheckoutFormValues } from "@/lib/validations/order";

let columnsEnsured = false;
async function ensureDbColumns() {
  if (!db || columnsEnsured) return;
  try {
    await db.execute(sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_code text;`);
    await db.execute(sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS courier_name text;`);
    await db.execute(sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS tracking_number text;`);
    await db.execute(sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS admin_notes text;`);
    await db.execute(sql`ALTER TABLE promotions ADD COLUMN IF NOT EXISTS code text DEFAULT 'AYURV10';`);
    await db.execute(sql`ALTER TABLE promotions ADD COLUMN IF NOT EXISTS discount_percent integer DEFAULT 10;`);
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS promo_redemptions (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
        order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        promo_code text NOT NULL,
        discount_amount numeric(10, 2) NOT NULL DEFAULT '0.00',
        created_at timestamp NOT NULL DEFAULT now()
      );
    `);
    columnsEnsured = true;
  } catch (e) {
    // DDL migration catch
  }
}

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
    image: "/product-shikakai.png",
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
    image: "/product-shikakai.png",
    stock: 200,
  },
  {
    id: "c3d4e5f6-a7b8-49c0-1234-567890abcdef",
    slug: "hair-oil-elixir",
    name: "Herbal Hair Oil Elixir",
    sizeLabel: "250ml",
    price: "499.00",
    description:
      "Restorative oil elixir crafted with 40+ potent bio-active herbs cooked over 21 days in virgin cold-pressed sesame and coconut oils.",
    ingredients:
      "Cold-pressed Virgin Coconut Oil, Sesame Seed Oil, Bhringraj, Amla, Brahmi, Hibiscus Flower Extract, Vetiver Root, Gunja, Lodhra, Jatamansi, Camphor, Rosemary Essential Oil, Vitamin E.",
    usage:
      "Dispense 5-8 drops directly onto scalp using dropper. Massage gently in circular motions before bedtime or 1 hour prior to washing with Ayurvya Shikakai Powder.",
    image: "/product-oil.png",
    stock: 300,
  },
];

export const INITIAL_PROMOTION = {
  id: "d4af3700-0000-4000-8000-000000000001",
  headline: "EXCLUSIVE HERBAL OFFER",
  description:
    "Buy any 500g or 250g Shikakai pack, get a 20ml Herbal Hair Oil Elixir FREE · Buy any 2 products for FREE Shipping!",
  code: "AYURV10",
  discountPercent: 10,
  active: "true",
};

// Global in-memory cache for active dev session
const inMemoryOrders = new Map<string, any>();

function generateTrackingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomStr = "";
  for (let i = 0; i < 6; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AYUR-${randomStr}`;
}

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
          image: p.image || "/product-shikakai.png",
          stock: p.stock ?? 100,
        }));
      }
    } catch (e) {
      // Return static fallback if DB unseeded
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
    await ensureDbColumns();
    try {
      const activePromos = await db
        .select()
        .from(schema.promotions)
        .where(eq(schema.promotions.active, "true"));
      if (activePromos.length > 0) {
        return activePromos[0];
      }
    } catch (e) {
      // Fallback
    }
  }
  return INITIAL_PROMOTION;
}

export async function processOrderCreation(
  formValues: CheckoutFormValues,
  existingCustomerId?: string
) {
  const allProducts = await getProducts();

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

  const hairOilProduct = allProducts.find((p) => p.slug === "hair-oil-elixir");

  if (qualifiesForFreeOil && hairOilProduct) {
    itemDetails.push({
      product: hairOilProduct,
      quantity: 1,
      unitPrice: "0.00",
      isFreeGift: "true",
    });
  }

  const shippingFee = totalPaidItemCount >= 2 ? 0 : 50;

  const itemsTotal = itemDetails.reduce((acc, item) => {
    return acc + parseFloat(item.unitPrice) * item.quantity;
  }, 0);

  const promoDiscount = parseFloat(formValues.discountAmount || "0");
  const grandTotal = Math.max(0, itemsTotal + shippingFee - promoDiscount);

  const orderId = crypto.randomUUID();
  const trackingCode = generateTrackingCode();

  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existingCustomerId || "");
  const customerId = isUuid ? existingCustomerId! : crypto.randomUUID();

  // DB-level enforcement: Check if this unique customer has already claimed this promo code in Neon DB
  if (formValues.appliedPromoCode && customerId) {
    const isAlreadyUsed = await checkPromoUsedByCustomer(customerId, formValues.appliedPromoCode);
    if (isAlreadyUsed) {
      throw new Error(`Promo code '${formValues.appliedPromoCode}' has already been claimed on a previous order by your account.`);
    }
  }

  const newOrderSummary = {
    id: orderId,
    trackingCode: trackingCode,
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
    courierName: null,
    trackingNumber: null,
    adminNotes: formValues.appliedPromoCode
      ? `Promo Code Applied: ${formValues.appliedPromoCode} (-₹${promoDiscount.toFixed(2)})`
      : null,
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

  if (db) {
    await ensureDbColumns();
    try {
      // 1. Ensure products exist in DB
      const dbProds = await db.select().from(schema.products);
      if (dbProds.length === 0) {
        for (const p of INITIAL_PRODUCTS) {
          await db.insert(schema.products).values({
            id: p.id,
            slug: p.slug,
            name: p.name,
            sizeLabel: p.sizeLabel,
            price: p.price,
            description: p.description,
            ingredients: p.ingredients,
            usage: p.usage,
            image: p.image,
            stock: p.stock,
          });
        }
      }

      // 2. Insert customer into Neon DB
      const existingCust = await db.select().from(schema.customers).where(eq(schema.customers.id, customerId));
      if (existingCust.length === 0) {
        await db.insert(schema.customers).values({
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
      }

      // 3. Insert order directly into Neon DB
      await db.insert(schema.orders).values({
        id: orderId,
        trackingCode: trackingCode,
        customerId: customerId,
        totalAmount: grandTotal.toFixed(2),
        shippingFee: shippingFee.toFixed(2),
        paymentMethod: formValues.paymentMethod as any,
        status: "confirmed",
      });

      // 4. Insert order items directly into Neon DB
      for (const item of itemDetails) {
        const existingProd = await db.select().from(schema.products).where(eq(schema.products.id, item.product.id));
        if (existingProd.length === 0) {
          await db.insert(schema.products).values({
            id: item.product.id,
            slug: item.product.slug,
            name: item.product.name,
            sizeLabel: item.product.sizeLabel,
            price: item.product.price,
            description: item.product.description,
            ingredients: item.product.ingredients,
            usage: item.product.usage,
            image: item.product.image,
            stock: item.product.stock,
          });
        }

        await db.insert(schema.orderItems).values({
          id: crypto.randomUUID(),
          orderId: orderId,
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: String(item.unitPrice),
          isFreeGift: String(item.isFreeGift),
        });
      }

      // Record promo redemption in structured promo_redemptions table
      if (formValues.appliedPromoCode) {
        await db.insert(schema.promoRedemptions).values({
          id: crypto.randomUUID(),
          customerId: customerId,
          orderId: orderId,
          promoCode: formValues.appliedPromoCode.trim().toUpperCase(),
          discountAmount: promoDiscount.toFixed(2),
        });
      }
    } catch (e) {
      console.warn("Neon DB Order Creation Error:", e);
    }
  }

  inMemoryOrders.set(orderId, newOrderSummary);
  inMemoryOrders.set(trackingCode, newOrderSummary);

  return newOrderSummary;
}

export async function getOrderById(orderIdOrCode?: string) {
  if (!orderIdOrCode || orderIdOrCode.trim() === "") return null;

  const raw = orderIdOrCode.trim();
  const cleaned = raw.replace(/[\s\-_]/g, "").toUpperCase();

  // Query Neon DB directly
  if (db) {
    await ensureDbColumns();
    try {
      const dbOrders = await db.select().from(schema.orders);
      const matchedOrder = dbOrders.find((o) => {
        const cId = (o.id || "").replace(/[\s\-_]/g, "").toUpperCase();
        const cCode = ((o as any).trackingCode || "").replace(/[\s\-_]/g, "").toUpperCase();
        return o.id === raw || (o as any).trackingCode === raw || cId === cleaned || cCode === cleaned;
      });

      if (matchedOrder) {
        const customerRecord = await db
          .select()
          .from(schema.customers)
          .where(eq(schema.customers.id, matchedOrder.customerId));

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
          .where(eq(schema.orderItems.orderId, matchedOrder.id));

        return {
          id: matchedOrder.id,
          trackingCode: (matchedOrder as any).trackingCode || matchedOrder.id.slice(0, 8).toUpperCase(),
          customer: customerRecord[0] || { name: "Customer", phone: "" },
          totalAmount: matchedOrder.totalAmount,
          shippingFee: matchedOrder.shippingFee,
          paymentMethod: matchedOrder.paymentMethod,
          status: matchedOrder.status,
          courierName: matchedOrder.courierName || null,
          trackingNumber: matchedOrder.trackingNumber || null,
          adminNotes: matchedOrder.adminNotes || null,
          createdAt: matchedOrder.createdAt ? matchedOrder.createdAt.toISOString() : new Date().toISOString(),
          items: itemsRecords,
        };
      }
    } catch (e) {
      console.warn("Neon DB getOrderById Error:", e);
    }
  }

  return null;
}

export async function getOrdersByCustomerId(customerKeyOrId: string) {
  if (!customerKeyOrId || customerKeyOrId.trim() === "") return [];

  if (db) {
    await ensureDbColumns();
    try {
      const raw = customerKeyOrId.trim();

      const dbOrders = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.customerId, raw));

      const result = [];
      for (const order of dbOrders) {
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
          .where(eq(schema.orderItems.orderId, order.id));

        result.push({
          id: order.id,
          trackingCode: (order as any).trackingCode || order.id.slice(0, 8).toUpperCase(),
          customer: customerRecord[0] || { name: "Customer", phone: "" },
          totalAmount: order.totalAmount,
          shippingFee: order.shippingFee,
          paymentMethod: order.paymentMethod,
          status: order.status,
          courierName: order.courierName || null,
          trackingNumber: order.trackingNumber || null,
          adminNotes: order.adminNotes || null,
          createdAt: order.createdAt ? order.createdAt.toISOString() : new Date().toISOString(),
          items: itemsRecords,
        });
      }

      return result;
    } catch (e) {
      console.warn("Neon DB getOrdersByCustomerId Error:", e);
    }
  }

  return [];
}

export async function getAllOrdersAdmin() {
  if (db) {
    await ensureDbColumns();
    try {
      const dbOrders = await db.select().from(schema.orders).orderBy(desc(schema.orders.createdAt));
      const result = [];
      for (const order of dbOrders) {
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
          .where(eq(schema.orderItems.orderId, order.id));

        result.push({
          id: order.id,
          trackingCode: (order as any).trackingCode || order.id.slice(0, 8).toUpperCase(),
          customer: customerRecord[0] || { name: "Customer", phone: "" },
          totalAmount: order.totalAmount,
          shippingFee: order.shippingFee,
          paymentMethod: order.paymentMethod,
          status: order.status,
          courierName: order.courierName || null,
          trackingNumber: order.trackingNumber || null,
          adminNotes: order.adminNotes || null,
          createdAt: order.createdAt ? order.createdAt.toISOString() : new Date().toISOString(),
          items: itemsRecords,
        });
      }

      return result;
    } catch (e) {
      console.warn("Neon DB getAllOrdersAdmin Error:", e);
    }
  }

  return [];
}

export async function updateOrderStatusAdmin(
  orderId: string,
  newStatus: string,
  courierName?: string,
  trackingNumber?: string,
  adminNotes?: string
) {
  if (db) {
    await ensureDbColumns();
    try {
      await db
        .update(schema.orders)
        .set({
          status: newStatus as any,
          courierName: courierName || null,
          trackingNumber: trackingNumber || null,
          adminNotes: adminNotes || null,
        })
        .where(eq(schema.orders.id, orderId));
    } catch (e) {
      console.warn("Neon DB updateOrderStatusAdmin Error:", e);
    }
  }

  for (const [key, val] of inMemoryOrders.entries()) {
    if (val.id === orderId) {
      val.status = newStatus;
      if (courierName !== undefined) val.courierName = courierName;
      if (trackingNumber !== undefined) val.trackingNumber = trackingNumber;
      if (adminNotes !== undefined) val.adminNotes = adminNotes;
    }
  }

  return { success: true };
}

export async function deleteOrderAdmin(orderId: string) {
  if (db) {
    try {
      await db.delete(schema.orderItems).where(eq(schema.orderItems.orderId, orderId));
      await db.delete(schema.orders).where(eq(schema.orders.id, orderId));
    } catch (e) {
      console.warn("Neon DB deleteOrderAdmin Error:", e);
    }
  }

  for (const [key, val] of inMemoryOrders.entries()) {
    if (val.id === orderId) {
      inMemoryOrders.delete(key);
    }
  }

  return { success: true };
}

export async function updateProductAdmin(productId: string, updatedData: Partial<StaticProduct>) {
  if (db) {
    try {
      await db
        .update(schema.products)
        .set({
          name: updatedData.name,
          price: updatedData.price,
          sizeLabel: updatedData.sizeLabel,
          description: updatedData.description,
          stock: updatedData.stock,
        })
        .where(eq(schema.products.id, productId));
    } catch (e) {
      console.warn("Neon DB updateProductAdmin Error:", e);
    }
  }
  return { success: true };
}

export async function updatePromotionAdmin(promoData: {
  headline: string;
  description: string;
  code?: string;
  discountPercent?: number;
  active: string;
}) {
  if (db) {
    await ensureDbColumns();
    try {
      const existing = await db.select().from(schema.promotions);
      if (existing.length > 0) {
        await db
          .update(schema.promotions)
          .set({
            headline: promoData.headline,
            description: promoData.description,
            code: promoData.code || "AYURV10",
            discountPercent: promoData.discountPercent ?? 10,
            active: promoData.active,
          })
          .where(eq(schema.promotions.id, existing[0].id));
      } else {
        await db.insert(schema.promotions).values({
          id: crypto.randomUUID(),
          headline: promoData.headline,
          description: promoData.description,
          code: promoData.code || "AYURV10",
          discountPercent: promoData.discountPercent ?? 10,
          active: promoData.active,
        });
      }
    } catch (e) {
      console.warn("Neon DB updatePromotionAdmin Error:", e);
    }
  }
  return { success: true };
}

export async function checkPromoUsedByCustomer(customerKey: string, promoCode: string): Promise<boolean> {
  if (!customerKey || !promoCode) return false;

  if (db) {
    await ensureDbColumns();
    try {
      const codeUpper = promoCode.trim().toUpperCase();

      // 1. Query dedicated promo_redemptions table directly in Neon DB
      const redemptions = await db
        .select()
        .from(schema.promoRedemptions)
        .where(
          and(
            eq(schema.promoRedemptions.customerId, customerKey),
            eq(schema.promoRedemptions.promoCode, codeUpper)
          )
        );

      if (redemptions.length > 0) return true;

      // 2. Secondary check on orders adminNotes column
      const custOrders = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.customerId, customerKey));

      const usedInDb = custOrders.some((order) => {
        const notes = order.adminNotes ? order.adminNotes.toUpperCase() : "";
        return notes.includes(codeUpper);
      });

      if (usedInDb) return true;
    } catch (e) {
      console.warn("Neon DB checkPromoUsedByCustomer Error:", e);
    }
  }

  const codeUpper = promoCode.trim().toUpperCase();
  for (const ord of inMemoryOrders.values()) {
    if (ord.customer?.id === customerKey) {
      const notes = ord.adminNotes ? ord.adminNotes.toUpperCase() : "";
      if (notes.includes(codeUpper)) return true;
    }
  }

  return false;
}
