import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.string().uuid("Invalid product selected"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s-]{10,15}$/, "Please enter a valid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  addressLine1: z.string().min(5, "Delivery address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z
    .string()
    .length(6, "PIN Code must be exactly 6 digits")
    .regex(/^[0-9]{6}$/, "Invalid PIN code format"),
  paymentMethod: z.enum(["cod", "prepaid"]),
  items: z.array(orderItemSchema).min(1, "Your order must contain at least 1 item"),
  appliedPromoCode: z.string().optional(),
  discountAmount: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
