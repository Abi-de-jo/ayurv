"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/lib/validations/order";
import { createOrder } from "@/app/actions/create-order";
import { StaticProduct } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Gift,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Phone,
  User,
  MapPin,
  Mail,
  Loader2,
  AlertCircle,
  Lock,
} from "lucide-react";

export default function OrderForm({ products }: { products: StaticProduct[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Default selection: 1x 500g Shikakai Powder
  const defaultShikakai = products.find((p) => p.slug === "shikakai-powder-500g") || products[0];

  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    [defaultShikakai.id]: 1,
  });

  const updateQuantity = (productId: string, delta: number) => {
    setCartQuantities((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev, [productId]: next };
      if (next === 0) {
        delete updated[productId];
      }
      return updated;
    });
  };

  // Convert quantity map into array for Zod & calculation
  const selectedItems = Object.entries(cartQuantities).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const totalPaidItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

  // Check if any Shikakai pack is selected to trigger free oil offer
  const hasShikakaiSelected = selectedItems.some((item) => {
    const prod = products.find((p) => p.id === item.productId);
    return prod && (prod.slug === "shikakai-powder-500g" || prod.slug === "shikakai-powder-250g");
  });

  const qualifiesForFreeShipping = totalPaidItems >= 2;
  const shippingFee = qualifiesForFreeShipping ? 0 : 50;

  const subtotal = selectedItems.reduce((acc, item) => {
    const prod = products.find((p) => p.id === item.productId);
    return acc + (prod ? parseFloat(prod.price) * item.quantity : 0);
  }, 0);

  const grandTotal = subtotal + shippingFee;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      pincode: "",
      paymentMethod: "cod",
      items: selectedItems,
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (selectedItems.length === 0) {
      setErrorMsg("Please select at least 1 product to place an order.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    const submissionPayload: CheckoutFormValues = {
      ...values,
      items: selectedItems,
    };

    try {
      const res = await createOrder(submissionPayload);
      if (res.success && res.orderId) {
        if (res.trackingCode) {
          localStorage.setItem("ayurvya_last_order_code", res.trackingCode);
          localStorage.setItem("ayurvya_last_order_id", res.orderId);
        }
        // Trigger celebration confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#2FA36B", "#F0D687"],
        });
        router.push(`/order/${res.orderId}/success`);
      } else {
        setErrorMsg(res.error || "Failed to submit order.");
        setSubmitting(false);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Column: Product Selector & Address Form */}
      <div className="lg:col-span-7 space-y-8">
        {/* Step 1: SKU Selection */}
        <div className="gold-glow-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1F6E4A]/40 pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#F5F3EC]">
                1. Select Products
              </h2>
              <p className="text-xs text-[#8A8F8C] mt-0.5">
                Combine 2 or more items for FREE Shipping!
              </p>
            </div>
            <span className="text-xs font-mono text-[#D4AF37] bg-[#0B3D2E] px-3 py-1 rounded border border-[#D4AF37]/30">
              {totalPaidItems} Items Selected
            </span>
          </div>

          {/* SKU Cards */}
          <div className="space-y-4">
            {products.map((product) => {
              const qty = cartQuantities[product.id] || 0;
              const isShikakai = product.slug.includes("shikakai");

              return (
                <div
                  key={product.id}
                  className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                    qty > 0
                      ? "bg-[#101512] border-[#D4AF37]"
                      : "bg-[#0A0A0A]/60 border-[#1F6E4A]/30 hover:border-[#D4AF37]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#0B3D2E] border border-[#D4AF37]/30 flex items-center justify-center font-sans text-[#D4AF37] font-bold text-xs shrink-0">
                      {product.sizeLabel}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#F5F3EC]">
                          {product.name}
                        </h4>
                        {isShikakai && (
                          <span className="text-[9px] font-sans font-semibold text-[#2FA36B] bg-[#0B3D2E] px-1.5 py-0.5 rounded border border-[#2FA36B]/30 flex items-center gap-1">
                            <Gift className="w-2.5 h-2.5 text-[#D4AF37]" /> + Free Oil
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-xs font-bold text-[#F0D687]">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 rounded-full bg-[#101512] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-sm font-bold text-[#F5F3EC] w-5 text-center">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 rounded-full bg-[#101512] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Shipping Address Form */}
        <div className="gold-glow-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#1F6E4A]/40 pb-4">
            <h2 className="font-serif text-xl font-bold text-[#F5F3EC]">
              2. Delivery Address & Contact
            </h2>
            <p className="text-xs text-[#8A8F8C] mt-0.5">
              Enter your shipping details for Cash on Delivery dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-[#F5F3EC]/80 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Full Name *
              </label>
              <input
                {...register("name")}
                placeholder="e.g. Ananya R. Sharma"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.name && (
                <p className="text-[11px] text-red-400 font-mono">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F5F3EC]/80 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> Phone Number *
              </label>
              <input
                {...register("phone")}
                placeholder="10-digit mobile number"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.phone && (
                <p className="text-[11px] text-red-400 font-mono">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Address (Optional) */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F5F3EC]/80 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" /> Email (Optional)
              </label>
              <input
                {...register("email")}
                placeholder="For order tracking updates"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.email && (
                <p className="text-[11px] text-red-400 font-mono">{errors.email.message}</p>
              )}
            </div>

            {/* Address Line 1 */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-[#F5F3EC]/80 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> House No. / Street Address *
              </label>
              <input
                {...register("addressLine1")}
                placeholder="Flat / Building name, street name"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.addressLine1 && (
                <p className="text-[11px] text-red-400 font-mono">
                  {errors.addressLine1.message}
                </p>
              )}
            </div>

            {/* Address Line 2 */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-[#F5F3EC]/80">
                Landmark / Area (Optional)
              </label>
              <input
                {...register("addressLine2")}
                placeholder="Near landmark or locality"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F5F3EC]/80">City *</label>
              <input
                {...register("city")}
                placeholder="e.g. Chennai"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.city && (
                <p className="text-[11px] text-red-400 font-mono">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#F5F3EC]/80">State *</label>
              <input
                {...register("state")}
                placeholder="e.g. Tamil Nadu"
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.state && (
                <p className="text-[11px] text-red-400 font-mono">{errors.state.message}</p>
              )}
            </div>

            {/* PIN Code */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-mono text-[#F5F3EC]/80">PIN Code (6 Digits) *</label>
              <input
                {...register("pincode")}
                placeholder="e.g. 600001"
                maxLength={6}
                className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-[#F5F3EC] outline-none transition-colors"
              />
              {errors.pincode && (
                <p className="text-[11px] text-red-400 font-mono">{errors.pincode.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Order Summary & Checkout Action */}
      <div className="lg:col-span-5 space-y-6">
        <div className="gold-glow-card rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
          <h3 className="font-serif text-xl font-bold text-[#F5F3EC] border-b border-[#1F6E4A]/40 pb-4">
            Order Summary
          </h3>

          {/* Active Promo Badges */}
          <div className="space-y-3">
            {hasShikakaiSelected ? (
              <div className="p-3.5 rounded-xl bg-[#0B3D2E]/80 border border-[#D4AF37]/50 flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <div className="text-xs">
                  <span className="font-mono font-bold text-[#F0D687] block uppercase">
                    PROMO GIFT APPLIED
                  </span>
                  <span className="text-[#F5F3EC]/90">
                    Free 20ml Herbal Hair Oil Elixir added!
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 text-xs text-[#8A8F8C] flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>Add any Shikakai pack to get a FREE 20ml Oil Elixir!</span>
              </div>
            )}

            {qualifiesForFreeShipping ? (
              <div className="p-3 rounded-xl bg-[#0B3D2E]/50 border border-[#2FA36B]/40 flex items-center gap-2 text-xs text-[#2FA36B]">
                <Truck className="w-4 h-4" />
                <span className="font-semibold">UNLOCKED: FREE Pan-India Shipping</span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 text-xs text-[#8A8F8C] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Add {2 - totalPaidItems} more item(s) for FREE shipping!</span>
              </div>
            )}
          </div>

          {/* Line Items List */}
          <div className="space-y-3 pt-2 text-xs font-mono border-t border-[#1F6E4A]/30">
            {selectedItems.map((item) => {
              const prod = products.find((p) => p.id === item.productId);
              if (!prod) return null;
              return (
                <div key={item.productId} className="flex justify-between items-center text-[#F5F3EC]">
                  <span>
                    {prod.name} ({prod.sizeLabel}) × {item.quantity}
                  </span>
                  <span className="font-bold text-[#F0D687]">
                    {formatPrice(parseFloat(prod.price) * item.quantity)}
                  </span>
                </div>
              );
            })}

            {/* Free Gift Line Item */}
            {hasShikakaiSelected && (
              <div className="flex justify-between items-center text-[#2FA36B] pt-1">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Herbal Hair Oil Elixir (20ml) [GIFT]</span>
                </span>
                <span className="font-bold">FREE (₹0)</span>
              </div>
            )}

            <div className="flex justify-between items-center text-[#8A8F8C] pt-2 border-t border-[#1F6E4A]/20">
              <span>Shipping Fee:</span>
              <span>{qualifiesForFreeShipping ? "FREE" : "₹50"}</span>
            </div>

            <div className="flex justify-between items-baseline pt-4 border-t border-[#D4AF37]/30 text-sm">
              <span className="font-sans font-semibold text-[#F5F3EC]">Total Amount:</span>
              <span className="font-sans text-2xl font-bold text-[#F0D687]">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-mono text-[#F5F3EC]/80 block">Payment Method:</label>
            <div className="p-4 rounded-xl bg-[#0B3D2E]/40 border border-[#D4AF37] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <span className="text-xs font-bold text-[#F5F3EC] block">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[10px] text-[#8A8F8C]">
                    Pay cash upon delivery to your doorstep
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center gap-2 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || selectedItems.length === 0}
            className="w-full btn-gold-foil py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Place Order Now ({formatPrice(grandTotal)})</span>
              </>
            )}
          </button>

          <div className="text-center text-[10px] text-[#8A8F8C] space-y-1 font-mono">
            <p className="flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#D4AF37]" /> 256-bit Encrypted Checkout • COD Pan-India
            </p>
            <p>Direct Support: 8778359259 | @ayurvya.official</p>
          </div>
        </div>
      </div>
    </form>
  );
}
