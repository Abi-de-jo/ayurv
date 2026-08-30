import fs from "fs";
import path from "path";

const STORAGE_FILE = path.join(process.cwd(), ".orders_db.json");
const PROMO_FILE = path.join(process.cwd(), ".promo_db.json");

export interface StoredOrder {
  id: string;
  trackingCode: string;
  customer: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: string;
  shippingFee: string;
  paymentMethod: string;
  status: string;
  courierName?: string | null;
  trackingNumber?: string | null;
  adminNotes?: string | null;
  createdAt: string;
  items: Array<{
    id: string;
    productName: string;
    sizeLabel: string;
    quantity: number;
    unitPrice: string;
    isFreeGift?: string;
  }>;
}

export interface StoredPromotion {
  id: string;
  headline: string;
  description: string;
  code: string;
  discountPercent: number;
  active: string;
}

const DEFAULT_PROMOTION: StoredPromotion = {
  id: "d4af3700-0000-4000-8000-000000000001",
  headline: "EXCLUSIVE HERBAL OFFER",
  description:
    "Buy any 500g or 250g Shikakai pack, get a 20ml Herbal Hair Oil Elixir FREE · Buy any 2 products for FREE Shipping!",
  code: "AYURV10",
  discountPercent: 10,
  active: "true",
};

function loadOrdersFromFile(): Map<string, StoredOrder> {
  const map = new Map<string, StoredOrder>();
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, "utf-8");
      const list: StoredOrder[] = JSON.parse(raw);
      for (const item of list) {
        if (item && item.id) {
          map.set(item.id, item);
          if (item.trackingCode) {
            map.set(item.trackingCode, item);
            map.set(item.trackingCode.replace(/[\s\-_]/g, "").toUpperCase(), item);
          }
        }
      }
    }
  } catch (e) {
    console.warn("Could not read local JSON storage file:", e);
  }
  return map;
}

function saveOrdersToFile(map: Map<string, StoredOrder>) {
  try {
    const uniqueOrders = Array.from(new Set(map.values()));
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(uniqueOrders, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write local JSON storage file:", e);
  }
}

const fileOrders = loadOrdersFromFile();

export function saveOrderPersistent(order: StoredOrder) {
  fileOrders.set(order.id, order);
  if (order.trackingCode) {
    fileOrders.set(order.trackingCode, order);
    fileOrders.set(order.trackingCode.replace(/[\s\-_]/g, "").toUpperCase(), order);
  }
  saveOrdersToFile(fileOrders);
}

export function getOrderPersistent(codeOrId?: string): StoredOrder | null {
  const allList = Array.from(new Set(fileOrders.values()));
  if (allList.length === 0) return null;

  if (!codeOrId || codeOrId.trim() === "" || codeOrId === "latest") {
    return allList[allList.length - 1];
  }

  const raw = codeOrId.trim();
  const cleaned = raw.replace(/[\s\-_]/g, "").toUpperCase();

  for (const order of allList) {
    const cleanId = (order.id || "").replace(/[\s\-_]/g, "").toUpperCase();
    const cleanCode = (order.trackingCode || "").replace(/[\s\-_]/g, "").toUpperCase();

    if (
      order.id === raw ||
      order.trackingCode === raw ||
      cleanId === cleaned ||
      cleanCode === cleaned ||
      cleanId.includes(cleaned) ||
      cleanCode.includes(cleaned)
    ) {
      return order;
    }
  }

  return null;
}

export function getOrdersByCustomerIdPersistent(customerKeyOrId: string): StoredOrder[] {
  const allList = Array.from(new Set(fileOrders.values()));
  if (!customerKeyOrId) return [];

  const target = customerKeyOrId.trim().toUpperCase();

  return allList.filter((order) => {
    const custId = (order.customer?.id || "").toUpperCase();
    const custPhone = (order.customer?.phone || "").replace(/\D/g, "");
    const targetPhone = target.replace(/\D/g, "");

    return (
      custId === target ||
      (targetPhone.length >= 8 && custPhone.includes(targetPhone)) ||
      (order.trackingCode && order.trackingCode.toUpperCase().includes(target))
    );
  });
}

export function getAllOrdersPersistent(): StoredOrder[] {
  return Array.from(new Set(fileOrders.values()));
}

export function updateOrderStatusPersistent(
  orderId: string,
  status: string,
  courierName?: string,
  trackingNumber?: string,
  adminNotes?: string
) {
  for (const [key, val] of fileOrders.entries()) {
    if (val.id === orderId) {
      val.status = status;
      if (courierName !== undefined) val.courierName = courierName;
      if (trackingNumber !== undefined) val.trackingNumber = trackingNumber;
      if (adminNotes !== undefined) val.adminNotes = adminNotes;
    }
  }
  saveOrdersToFile(fileOrders);
}

export function deleteOrderPersistent(orderId: string) {
  for (const [key, val] of fileOrders.entries()) {
    if (val.id === orderId) {
      fileOrders.delete(key);
    }
  }
  saveOrdersToFile(fileOrders);
}

// PERSISTENT PROMOTION STORAGE
export function getPromotionPersistent(): StoredPromotion {
  try {
    if (fs.existsSync(PROMO_FILE)) {
      const raw = fs.readFileSync(PROMO_FILE, "utf-8");
      const promo: StoredPromotion = JSON.parse(raw);
      if (promo && promo.headline) {
        return promo;
      }
    }
  } catch (e) {
    console.warn("Could not read promo storage file:", e);
  }
  return DEFAULT_PROMOTION;
}

export function savePromotionPersistent(promoData: Partial<StoredPromotion>): StoredPromotion {
  const current = getPromotionPersistent();
  const updated: StoredPromotion = {
    ...current,
    ...promoData,
    code: promoData.code || current.code || "AYURV10",
    discountPercent: promoData.discountPercent ?? current.discountPercent ?? 10,
    active: promoData.active !== undefined ? promoData.active : current.active,
  };

  try {
    fs.writeFileSync(PROMO_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not write promo storage file:", e);
  }

  return updated;
}
