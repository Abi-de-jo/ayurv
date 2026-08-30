"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WhatsAppIcon } from "@/components/brand/icons";
import { formatPrice } from "@/lib/utils";
import {
  PackageCheck,
  Truck,
  CheckCircle2,
  X,
  ArrowRight,
  Gift,
  MapPin,
  ChevronUp,
} from "lucide-react";

export default function ActiveOrderWidget() {
  const [order, setOrder] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchActiveOrder = async () => {
      const code = localStorage.getItem("ayurvya_last_order_code");
      const id = localStorage.getItem("ayurvya_last_order_id");

      const param = code || id || "";
      try {
        const res = await fetch(`/api/track-order?code=${encodeURIComponent(param)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.order) {
            setOrder(data.order);
          }
        }
      } catch (e) {
        console.warn("Active order widget fetch error:", e);
      }
    };

    fetchActiveOrder();

    // Poll every 10 seconds for live order status updates
    const timer = setInterval(fetchActiveOrder, 10000);
    return () => clearInterval(timer);
  }, []);

  if (!order) return null;

  const trackingCode = order.trackingCode || order.id.slice(0, 8).toUpperCase();
  const whatsappMessage = encodeURIComponent(
    `Hello Ayurvya Team, I want to track my active order #${trackingCode} for ${formatPrice(
      order.totalAmount
    )}. Current status: ${order.status}`
  );

  return (
    <>
      {/* Floating Bottom-Left Pill Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-[#101512]/95 border-2 border-[#D4AF37] text-[#F5F3EC] px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] backdrop-blur-md flex items-center gap-2.5 cursor-pointer text-xs font-sans font-bold"
        >
          <div className="w-6 h-6 rounded-full bg-[#0B3D2E] border border-[#2FA36B] flex items-center justify-center text-[#2FA36B]">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <span>My Order:</span>
          <span className="text-[#F0D687] font-mono">{trackingCode}</span>
          <span className="bg-[#0B3D2E] text-[#2FA36B] text-[10px] uppercase px-2 py-0.5 rounded-full border border-[#2FA36B]/40 font-semibold">
            {order.status.replace(/_/g, " ")}
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-[#D4AF37]" />
        </motion.button>
      </div>

      {/* Slide-Up Drawer / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#101512] border-2 border-[#D4AF37] rounded-3xl p-6 space-y-5 shadow-2xl text-left z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1F6E4A]/30 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase bg-[#0A0A0A] px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                    Order Tracking #{trackingCode}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#F5F3EC] mt-1">
                    Your Active Ayurvya Ritual Pack
                  </h3>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-[#8A8F8C] hover:text-[#F5F3EC] hover:bg-[#0A0A0A] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-[#0B3D2E]/40 border border-[#2FA36B]/50 flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2.5">
                  <PackageCheck className="w-5 h-5 text-[#2FA36B]" />
                  <div>
                    <span className="text-[#8A8F8C] block text-[10px]">Current Status:</span>
                    <strong className="text-[#F0D687] text-sm uppercase">
                      {order.status.replace(/_/g, " ")}
                    </strong>
                  </div>
                </div>

                <span className="text-gold-shine font-bold text-sm">
                  {formatPrice(order.totalAmount)}
                </span>
              </div>

              {/* Order Items Preview */}
              <div className="space-y-2 text-xs font-sans">
                <span className="text-[#8A8F8C] font-semibold block">Order Items:</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {order.items?.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-[#0A0A0A] border border-[#1F6E4A]/30 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        {item.isFreeGift === "true" ? (
                          <Gift className="w-4 h-4 text-[#D4AF37]" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-[#2FA36B]" />
                        )}
                        <span className="text-[#F5F3EC] font-semibold">
                          {item.productName} ({item.sizeLabel}) × {item.quantity}
                        </span>
                      </div>
                      <span className="text-[#F0D687] font-bold">
                        {item.isFreeGift === "true"
                          ? "FREE GIFT"
                          : formatPrice(parseFloat(item.unitPrice) * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Address Preview */}
              <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1F6E4A]/30 text-xs font-sans text-[#8A8F8C] space-y-0.5">
                <p className="font-semibold text-[#F5F3EC]">{order.customer?.name}</p>
                <p>
                  {order.customer?.addressLine1}, {order.customer?.city} ({order.customer?.pincode})
                </p>
                <p className="text-[#D4AF37]">Phone: {order.customer?.phone}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={`https://wa.me/918778359259?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] text-[#0A0A0A] flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg cursor-pointer font-sans"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Track</span>
                </a>

                <Link
                  href="/track"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold-foil py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-lg font-sans"
                >
                  <span>Full Live Map</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
