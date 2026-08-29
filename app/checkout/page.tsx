import React from "react";
import OrderForm from "@/components/checkout/order-form";
import { getProducts } from "@/db/queries";
import { BotanicalDivider } from "@/components/brand/botanical-divider";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#101512] px-4 py-1 rounded-full border border-[#D4AF37]/30">
            Ayurvya Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC]">
            Complete Your <span className="text-gold-foil">Order</span>
          </h1>
          <p className="text-sm text-[#8A8F8C]">
            Cash on Delivery available Pan-India. Free Express Shipping on orders of 2+ items.
          </p>
        </div>

        <BotanicalDivider className="my-6" />

        <OrderForm products={products} />
      </div>
    </div>
  );
}
