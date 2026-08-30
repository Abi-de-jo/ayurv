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
          <div className="p-5 rounded-2xl bg-[#101512] border-2 border-[#D4AF37]/40 flex flex-wrap items-center justify-between gap-4 text-xs font-sans shadow-lg">
            <div>
              <span className="text-[#8A8F8C] block text-[11px]">Unique Tracking Code:</span>
              <span className="text-[#F0D687] font-bold font-mono text-base tracking-wider bg-[#0B3D2E] px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                {order.trackingCode || order.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-[#8A8F8C] block text-[11px]">Payment Method:</span>
              <span className="text-[#2FA36B] font-bold uppercase text-xs">
                {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Prepaid"}
              </span>
            </div>
            <div>
              <span className="text-[#8A8F8C] block text-[11px]">Total Amount:</span>
              <span className="text-gold-shine font-bold text-lg">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>

            <BotanicalDivider className="py-2" />

          {/* Live Order Dispatch Progress Tracker Bar */}
          <div className="p-6 rounded-2xl bg-[#101512] border border-[#1F6E4A]/40 text-left space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#1F6E4A]/30 pb-3">
              <h3 className="font-serif text-base font-bold text-[#F5F3EC] flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>Live Parcel Dispatch Status</span>
              </h3>
              <span className="text-xs font-sans font-bold text-[#2FA36B] bg-[#0B3D2E] px-3 py-0.5 rounded-full border border-[#2FA36B]/40 uppercase tracking-wider">
                {order.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 relative pt-2">
              <div className="text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-[#0B3D2E] border-2 border-[#2FA36B] text-[#2FA36B] mx-auto flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-sans font-bold text-[#F5F3EC]">Confirmed</p>
                <p className="text-[9px] font-sans text-[#8A8F8C] hidden sm:block">Order Received</p>
              </div>

              <div className="text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] mx-auto flex items-center justify-center">
                  <PackageCheck className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-sans font-bold text-[#8A8F8C]">Packing</p>
                <p className="text-[9px] font-sans text-[#8A8F8C]/60 hidden sm:block">Herbal Preparation</p>
              </div>

              <div className="text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-[#1F6E4A]/30 text-[#8A8F8C] mx-auto flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-sans font-bold text-[#8A8F8C]">Dispatched</p>
                <p className="text-[9px] font-sans text-[#8A8F8C]/60 hidden sm:block">With Courier</p>
              </div>

              <div className="text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-[#1F6E4A]/30 text-[#8A8F8C] mx-auto flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-sans font-bold text-[#8A8F8C]">Nearby</p>
                <p className="text-[9px] font-sans text-[#8A8F8C]/60 hidden sm:block">Out for Delivery</p>
              </div>

              <div className="text-center space-y-1.5">
                <div className="w-9 h-9 rounded-full bg-[#0A0A0A] border border-[#1F6E4A]/30 text-[#8A8F8C] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p className="text-[11px] font-sans font-bold text-[#8A8F8C]">Delivered</p>
                <p className="text-[9px] font-sans text-[#8A8F8C]/60 hidden sm:block">Package Delivered</p>
              </div>
            </div>
          </div>

          {/* Itemized Breakdown with Real Product Photography Avatars */}
          <div className="text-left space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#F5F3EC] flex items-center gap-2 border-b border-[#1F6E4A]/30 pb-3">
              <PackageCheck className="w-5 h-5 text-[#D4AF37]" />
              Items in Order
            </h3>

            <div className="space-y-3">
              {order.items.map((item: any, idx: number) => {
                const isGift = item.isFreeGift === "true";
                const isShikakai = item.productName.toLowerCase().includes("shikakai");

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                      isGift
                        ? "bg-[#0B3D2E]/30 border-[#2FA36B]/60 shadow-md"
                        : "bg-[#101512] border-[#1F6E4A]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Realistic Product Image Avatar */}
                      <div className="w-14 h-14 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/40 overflow-hidden shrink-0 shadow-md relative">
                        <img
                          src={isShikakai ? "/product-shikakai.png" : "/product-oil.png"}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans text-sm font-bold text-[#F5F3EC]">
                            {item.productName}
                          </span>
                          {isGift && (
                            <span className="text-[10px] font-sans font-bold text-[#2FA36B] bg-[#0B3D2E] px-2 py-0.5 rounded-full border border-[#2FA36B]/40 flex items-center gap-1">
                              <Gift className="w-3 h-3 text-[#D4AF37]" /> FREE GIFT
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-xs font-sans text-[#8A8F8C]">
                          <span className="bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#1F6E4A]/30 text-[#D4AF37] font-semibold text-[11px]">
                            {item.sizeLabel || "Standard Pack"}
                          </span>
                          <span>Qty: {item.quantity}</span>
                        </div>
                      </div>
                    </div>

                    <span className="font-sans text-sm sm:text-base font-bold text-[#F0D687] shrink-0">
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
            <div className="p-4 rounded-2xl bg-[#101512] border border-[#1F6E4A]/30 text-xs text-[#8A8F8C] space-y-1 font-sans">
              <p className="font-semibold text-[#F5F3EC] text-sm">{order.customer.name}</p>
              <p>{order.customer.addressLine1}</p>
              {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
              <p>
                {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </p>
              <p className="text-[#D4AF37] font-semibold pt-1">Phone: {order.customer.phone}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/track"
              className="w-full btn-gold-foil py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Track Live Parcel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`https://wa.me/918778359259?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] text-[#0A0A0A] flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg cursor-pointer font-sans"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current" />
              <span>Confirm WhatsApp</span>
            </a>

            <Link
              href="/"
              className="w-full bg-[#101512] border border-[#D4AF37]/50 py-3.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#F5F3EC] hover:bg-[#0B3D2E] transition-colors flex items-center justify-center gap-2 cursor-pointer font-sans"
            >
              <span>Return to Store</span>
            </Link>
          </div>

          <div className="text-xs text-[#8A8F8C] font-sans pt-2 flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Questions about your order? Call helpline: <strong className="text-[#D4AF37]">8778359259</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
