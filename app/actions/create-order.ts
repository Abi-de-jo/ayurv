"use server";

import { checkoutFormSchema, CheckoutFormValues } from "@/lib/validations/order";
import { processOrderCreation } from "@/db/queries";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const validatedData = checkoutFormSchema.parse(data);
    const orderSummary = await processOrderCreation(validatedData);
    return { success: true, orderId: orderSummary.id, trackingCode: orderSummary.trackingCode };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return {
      success: false,
      error: error?.message || "Failed to place order. Please try again.",
    };
  }
}
