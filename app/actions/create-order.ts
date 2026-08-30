"use server";

import { checkoutFormSchema, CheckoutFormValues } from "@/lib/validations/order";
import { processOrderCreation } from "@/db/queries";

export async function createOrder(data: CheckoutFormValues, customerKey?: string) {
  try {
    const validatedData = checkoutFormSchema.parse(data);
    const orderSummary = await processOrderCreation(validatedData, customerKey);
    return {
      success: true,
      orderId: orderSummary.id,
      trackingCode: orderSummary.trackingCode,
      customerId: orderSummary.customer.id,
    };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return {
      success: false,
      error: error?.message || "Failed to place order. Please try again.",
    };
  }
}
