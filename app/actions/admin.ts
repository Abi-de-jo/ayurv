"use server";

import { revalidatePath } from "next/cache";
import {
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  deleteOrderAdmin,
  updateProductAdmin,
  updatePromotionAdmin,
  getProducts,
  getActivePromotion,
  StaticProduct,
} from "@/db/queries";

export async function verifyAdminPinAction(enteredPin: string) {
  const targetPin = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || "priya123";
  if (enteredPin && enteredPin.trim() === targetPin.trim()) {
    return { success: true };
  }
  return { success: false, error: "Invalid Admin Password." };
}

export async function getAdminOrdersAction() {
  try {
    const orders = await getAllOrdersAdmin();
    return { success: true, orders };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch orders." };
  }
}

export async function updateOrderStatusAction(
  orderId: string,
  newStatus: string,
  courierName?: string,
  trackingNumber?: string,
  adminNotes?: string
) {
  try {
    const res = await updateOrderStatusAdmin(orderId, newStatus, courierName, trackingNumber, adminNotes);
    revalidatePath("/track");
    revalidatePath("/admin");
    return { success: true, res };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update order status." };
  }
}

export async function deleteOrderAction(orderId: string) {
  try {
    const res = await deleteOrderAdmin(orderId);
    revalidatePath("/track");
    revalidatePath("/admin");
    return { success: true, res };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete order." };
  }
}

export async function getAdminProductsAction() {
  try {
    const products = await getProducts();
    return { success: true, products };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch products." };
  }
}

export async function updateProductAction(productId: string, data: Partial<StaticProduct>) {
  try {
    const res = await updateProductAdmin(productId, data);
    revalidatePath("/", "layout");
    revalidatePath("/checkout");
    revalidatePath("/products/[slug]", "page");
    return { success: true, res };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update product." };
  }
}

export async function getAdminPromotionAction() {
  try {
    const promo = await getActivePromotion();
    return { success: true, promo };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch promotion." };
  }
}

export async function updatePromotionAction(promoData: {
  headline: string;
  description: string;
  code?: string;
  discountPercent?: number;
  active: string;
}) {
  try {
    const res = await updatePromotionAdmin(promoData);
    revalidatePath("/", "layout");
    revalidatePath("/checkout");
    return { success: true, res };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update promotion." };
  }
}
