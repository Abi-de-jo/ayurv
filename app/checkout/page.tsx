kimport React from "react";
import OrderForm from "@/components/checkout/order-form";
import { getProducts } from "@/db/queries";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { ShieldCheck, Truck, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-xs font-sans font-bold text-[#F0D687] uppercase tracking-wider shadow">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>SECURE CHECKOUT</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F3EC]">
            Complete Your <span className="text-gold-foil">Order</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#8A8F8C] font-sans">
            Free shipping on orders above 1000/- • Express Pan-India Delivery
          </p>

          {/* Quick Value Pillars */}
          <div className="grid grid-cols-3 gap-2 pt-2 max-w-lg mx-auto text-[11px] font-sans text-[#D4AF37]">
            <div className="p-2 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 flex items-center justify-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#2FA36B]" />
              <span>Fast Shipping</span>
            </div>
            <div className="p-2 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 flex items-center justify-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#2FA36B]" />
              <span>Free Delivery &gt; 1000/-</span>
            </div>
            <div className="p-2 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2FA36B]" />
              <span>24h Dispatch</span>
            </div>
          </div>
        </div>

        <BotanicalDivider className="my-6" />

        <OrderForm products={products} />
      </div>
    </div>
  );
}
