import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { WhatsAppIcon } from "@/components/brand/icons";
import { CheckCircle2, Gift, Phone, MapPin, PackageCheck, ArrowRight } from "lucide-react";

export default async function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const order = await getOrderById(resolvedParams.id);

  if (!order) {
    notFound();
  }

  const whatsappMessage = encodeURIComponent(
    `Hello Ayurvya Team, I just placed order #${order.id.slice(0, 8)} for ${formatPrice(
      order.totalAmount
    )}. Please confirm delivery!`
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0B3D2E]/30 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="gold-glow-card rounded-2xl p-8 sm:p-12 text-center space-y-8 cursor-pointer">
          {/* Checkmark Icon */}
          <div className="w-20 h-20 rounded-full bg-[#0B3D2E] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.4)] animate-in zoom-in-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#101512] px-4 py-1 rounded-full border border-[#D4AF37]/30">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F3EC]">
              Thank You for Your <span className="text-gold-foil">Order!</span>
            </h1>
            <p className="text-sm text-[#8A8F8C] max-w-lg mx-auto">
              Your Ayurvedic hair care ritual pack is being prepared for dispatch. We will contact you shortly.
            </p>
          </div>

          {/* Order Meta Box */}
          <div className="p-4 rounded-xl bg-[#101512] border border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-[#8A8F8C] block">Order ID:</span>
              <span className="text-[#F0D687] font-bold text-sm">#{order.id}</span>
            </div>
            <div>
              <span className="text-[#8A8F8C] block">Payment Method:</span>
              <span className="text-[#2FA36B] font-semibold uppercase">
                {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Prepaid"}
              </span>
            </div>
            <div>
              <span className="text-[#8A8F8C] block">Total Amount:</span>
              <span className="text-gold-shine font-bold text-base">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

          <BotanicalDivider className="py-2" />

          {/* Itemized Breakdown */}
          <div className="text-left space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F5F3EC] flex items-center gap-2 border-b border-[#1F6E4A]/30 pb-3">
              <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
              Items in Order
            </h3>

            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => {
                const isGift = item.isFreeGift === "true";

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      isGift
                        ? "bg-[#0B3D2E]/40 border-[#2FA36B]"
                        : "bg-[#101512] border-[#1F6E4A]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0A0A0A] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] font-bold text-xs">
                        {item.sizeLabel || "Item"}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-sm font-bold text-[#F5F3EC]">
                            {item.productName}
                          </span>
                          {isGift && (
                            <span className="text-[9px] font-mono text-[#2FA36B] bg-[#0B3D2E] px-1.5 py-0.5 rounded border border-[#2FA36B]/40 flex items-center gap-1">
                              <Gift className="w-3 h-3 text-[#D4AF37]" /> FREE GIFT
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#8A8F8C] font-mono">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-sm font-bold text-[#F0D687]">
                      {isGift ? "FREE (₹0)" : formatPrice(parseFloat(item.unitPrice) * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Address Details */}
          <div className="text-left space-y-3 pt-2">
            <h3 className="font-serif text-lg font-bold text-[#F5F3EC] flex items-center gap-2 border-b border-[#1F6E4A]/30 pb-3">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              Shipping Destination
            </h3>
            <div className="p-4 rounded-xl bg-[#101512] border border-[#1F6E4A]/30 text-xs text-[#8A8F8C] space-y-1">
              <p className="font-semibold text-[#F5F3EC] text-sm">{order.customer.name}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
              <p>
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <p className="text-[#D4AF37] font-mono pt-1">Phone: {order.customer.phone}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <a
              href={`https://wa.me/918778359259?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-1/2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] text-[#0A0A0A] flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Confirm on WhatsApp</span>
            </a>

            <Link
              href="/"
              className="w-full sm:w-1/2 btn-gold-foil py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Return to Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="text-xs text-[#8A8F8C] font-mono pt-2 flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Questions about your order? Call helpline: <strong className="text-[#D4AF37]">8778359259</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
