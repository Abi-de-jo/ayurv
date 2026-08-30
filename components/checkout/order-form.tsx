"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutFormSchema, CheckoutFormValues } from "@/lib/validations/order";
import { createOrder } from "@/app/actions/create-order";
import { StaticProduct } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import { getOrCreateCustomerKey } from "@/lib/customer";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Gift,
  Truck,
  Plus,
  Minus,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  Mail,
  Loader2,
  AlertCircle,
  Lock,
  Tag,
  Check,
} from "lucide-react";

export default function OrderForm({ products }: { products: StaticProduct[] }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live Promotion State
  const [activePromo, setActivePromo] = useState<any>(null);
  const [inputPromoCode, setInputPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState<string | null>(null);

  const [isPromoAlreadyClaimed, setIsPromoAlreadyClaimed] = useState(false);

  useEffect(() => {
    const customerKey = getOrCreateCustomerKey();
    fetch(`/api/promotion?customerKey=${encodeURIComponent(customerKey)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.promo && data.promo.active === "true") {
          setActivePromo(data.promo);
          if (data.alreadyUsed) {
            setIsPromoAlreadyClaimed(true);
            setAppliedPromo(null);
            setPromoError(null);
          }
        }
      })
      .catch((err) => console.warn("Failed to fetch promo in checkout:", err));
  }, []);

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

  const selectedItems = Object.entries(cartQuantities).map(([productId, quantity]) => ({
    productId,
    quantity,
  }));

  const totalPaidItems = selectedItems.reduce((acc, item) => acc + item.quantity, 0);

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

  // Discount calculation if promo applied
  const discountAmount = appliedPromo
    ? (subtotal * (appliedPromo.discountPercent || 10)) / 100
    : 0;

  const grandTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyPromoCode = (codeToApply: string) => {
    setPromoError(null);
    setPromoSuccessMsg(null);

    const cleanCode = codeToApply.trim().toUpperCase();
    if (!cleanCode) {
      setPromoError("Please enter a valid promo code.");
      return;
    }

    // Check if user has already used this promo code on a previous order
    const usedPromos: string[] = JSON.parse(localStorage.getItem("ayurvya_used_promos") || "[]");
    if (usedPromos.includes(cleanCode)) {
      setPromoError(`You have already claimed promo code '${cleanCode}'. Each offer is limited to 1 use per customer.`);
      return;
    }

    const expectedCode = (activePromo?.code || "AYURV10").toUpperCase();

    if (cleanCode === expectedCode) {
      const promoObj = activePromo || {
        code: "AYURV10",
        discountPercent: 10,
        headline: "EXCLUSIVE HERBAL OFFER",
      };
      setAppliedPromo(promoObj);
      setPromoSuccessMsg(
        `Code '${promoObj.code}' Applied successfully! ${promoObj.discountPercent}% Discount Unlocked.`
      );

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#D4AF37", "#2FA36B", "#F0D687"],
        });
      } catch {
        // Safe
      }
    } else {
      setPromoError(`Invalid promo code '${cleanCode}'. Available code: ${expectedCode}`);
    }
  };

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
      appliedPromoCode: appliedPromo?.code,
      discountAmount: discountAmount.toFixed(2),
    };

    try {
      const customerKey = getOrCreateCustomerKey();
      const res = await createOrder(submissionPayload, customerKey);
      if (res.success && res.orderId) {
        if (res.trackingCode) {
          localStorage.setItem("ayurvya_last_order_code", res.trackingCode);
          localStorage.setItem("ayurvya_last_order_id", res.orderId);
        }
        if (res.customerId) {
          localStorage.setItem("ayurvya_customer_id", res.customerId);
        }

        confetti({
          particleCount: 100,
          spread: 80,
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
          </div>

          <div className="space-y-4">
            {products.map((prod) => {
              const qty = cartQuantities[prod.id] || 0;
              const isSelected = qty > 0;
              const isShikakai = prod.slug.includes("shikakai");

              return (
                <div
                  key={prod.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#0B3D2E]/40 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                      : "bg-[#101512] border-[#1F6E4A]/30 opacity-80"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#0A0A0A] border border-[#1F6E4A]/40 overflow-hidden shrink-0">
                      <img
                        src={isShikakai ? "/product-shikakai.png" : "/product-oil.png"}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                          {prod.sizeLabel}
                        </span>
                        <h3 className="font-serif text-base font-bold text-[#F5F3EC]">
                          {prod.name}
                        </h3>
                      </div>
                      <p className="text-xs text-[#8A8F8C] mt-1 line-clamp-1">
                        {prod.description}
                      </p>
                      <span className="font-sans text-sm font-bold text-[#F0D687] block mt-1">
                        {formatPrice(prod.price)}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => updateQuantity(prod.id, 1)}
                        className="btn-gold-foil px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow"
                      >
                        + Add Pack
                      </button>
                    ) : (
                      <div className="flex items-center bg-[#0A0A0A] border border-[#D4AF37] rounded-full p-1 shadow">
                        <button
                          type="button"
                          onClick={() => updateQuantity(prod.id, -1)}
                          className="w-7 h-7 rounded-full bg-[#101512] text-[#F5F3EC] flex items-center justify-center hover:bg-[#0B3D2E] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm font-bold text-[#F0D687]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(prod.id, 1)}
                          className="w-7 h-7 rounded-full bg-[#0B3D2E] text-[#D4AF37] flex items-center justify-center hover:bg-[#2FA36B] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
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
              2. Delivery Address
            </h2>
            <p className="text-xs text-[#8A8F8C] mt-0.5">
              Enter your exact contact & shipping details for Cash on Delivery dispatch.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EC] outline-none"
                  />
                </div>
                {errors.name && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">
                  Mobile Number (for COD Delivery) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="e.g. 9876543210"
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EC] outline-none"
                  />
                </div>
                {errors.phone && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.phone.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">
                Email Address (Optional)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="e.g. ananya@example.com"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">
                House No, Street, Landmark *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  {...register("addressLine1")}
                  type="text"
                  placeholder="Flat No 4B, Lotus Apartments, MG Road"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
              </div>
              {errors.addressLine1 && (
                <span className="text-[11px] text-red-400 mt-1 block">
                  {errors.addressLine1.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">City *</label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="e.g. Chennai"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
                {errors.city && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">State *</label>
                <input
                  {...register("state")}
                  type="text"
                  placeholder="e.g. Tamil Nadu"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
                {errors.state && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.state.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-xs font-mono text-[#F5F3EC]/80 block mb-1.5">PIN Code *</label>
                <input
                  {...register("pincode")}
                  type="text"
                  placeholder="e.g. 600001"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
                {errors.pincode && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    {errors.pincode.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Promo Code & Order Summary */}
      <div className="lg:col-span-5 space-y-6">
        <div className="gold-glow-card rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
          <h2 className="font-serif text-xl font-bold text-[#F5F3EC] border-b border-[#1F6E4A]/40 pb-4">
            Order Summary & Offer
          </h2>

          {/* Shipping Badge Callout */}
          <div>
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

          {/* INTERACTIVE PROMO CODE SECTION (Hidden if already claimed in DB) */}
          {!isPromoAlreadyClaimed && (
            <div className="space-y-3 pt-2 border-t border-[#1F6E4A]/30">
              <label className="text-xs font-serif font-bold text-[#F0D687] flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#D4AF37]" /> Have a Promo Code?
              </label>

              {/* Admin Suggested Promotion Offer Card */}
              {activePromo && activePromo.active === "true" && !appliedPromo && (
                <div className="p-3.5 rounded-2xl bg-[#0B3D2E]/40 border border-[#D4AF37]/40 space-y-2 text-xs font-sans">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#F0D687]">{activePromo.headline}</span>
                    <span className="text-[10px] font-mono font-bold text-[#2FA36B] bg-[#0B3D2E] px-2 py-0.5 rounded border border-[#2FA36B]/40">
                      {activePromo.discountPercent}% DISCOUNT
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8A8F8C]">{activePromo.description}</p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono text-[#F5F3EC]">
                      Use Code: <strong className="text-[#D4AF37]">{activePromo.code}</strong>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleApplyPromoCode(activePromo.code)}
                      className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0A0A0A] font-bold text-[11px] uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md transition-all"
                    >
                      APPLY CODE
                    </button>
                  </div>
                </div>
              )}

              {/* Manual Code Input Form */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputPromoCode}
                  onChange={(e) => setInputPromoCode(e.target.value)}
                  placeholder="Enter Promo Code e.g. AYURV10"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl px-3 py-2.5 text-xs text-[#F5F3EC] font-mono outline-none uppercase tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => handleApplyPromoCode(inputPromoCode)}
                  className="px-4 py-2.5 rounded-xl bg-[#101512] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors text-xs font-bold uppercase shrink-0 cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Error or Success Alerts */}
              {promoError && (
                <p className="text-[11px] text-red-400 font-sans flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {promoError}
                </p>
              )}

              {promoSuccessMsg && (
                <p className="text-[11px] text-[#2FA36B] font-sans font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> {promoSuccessMsg}
                </p>
              )}
            </div>
          )}

          {/* Line Items List */}
          <div className="space-y-3 pt-2 text-xs font-sans border-t border-[#1F6E4A]/30">
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

            {/* Promo Discount Deduction Line */}
            {appliedPromo && (
              <div className="flex justify-between items-center text-[#2FA36B] pt-1 font-bold">
                <span>Promo Discount ({appliedPromo.code} - {appliedPromo.discountPercent}% OFF):</span>
                <span>- {formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between items-baseline pt-4 border-t border-[#D4AF37]/30 text-sm">
              <span className="font-serif font-bold text-[#F5F3EC]">Grand Total (COD):</span>
              <span className="font-sans text-2xl font-bold text-gold-shine">
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
            className="w-full btn-gold-foil py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50 cursor-pointer font-sans"
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

          <div className="text-center text-[10px] text-[#8A8F8C] space-y-1 font-sans">
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
