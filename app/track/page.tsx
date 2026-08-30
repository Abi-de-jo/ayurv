"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import {
  Search,
  PackageCheck,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Gift,
  ArrowRight,
  ShieldCheck,
  Bike,
  Building2,
  Home as HomeIcon,
  Sparkles,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";

interface OrderData {
  id: string;
  trackingCode: string;
  customer: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  totalAmount: string;
  paymentMethod: string;
  status: string;
  courierName?: string;
  trackingNumber?: string;
  adminNotes?: string;
  createdAt: string;
  items: Array<{
    productName: string;
    sizeLabel: string;
    quantity: number;
    unitPrice: string;
    isFreeGift?: string;
  }>;
}

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async (searchCode?: string) => {
    setLoading(true);
    try {
      const param = searchCode !== undefined ? searchCode : query;
      const url = param.trim()
        ? `/api/track-order?code=${encodeURIComponent(param)}`
        : `/api/track-order`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        if (data.order) {
          setOrder(data.order);
        }
      }
    } catch (e) {
      console.warn("Tracking fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem("ayurvya_last_order_code");
    const savedId = localStorage.getItem("ayurvya_last_order_id");
    const initialQuery = savedCode || savedId || "";
    setQuery(initialQuery);

    fetchOrder(initialQuery);

    // Auto-poll live order status every 5 seconds so admin updates reflect instantly on customer screen
    const interval = setInterval(() => {
      fetchOrder(initialQuery);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(query);
  };

  // Determine stage progress percentage (0% to 100%)
  const getStageInfo = (status: string) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return {
          progressPercent: 15,
          title: "Order Received & Pending Admin Dispatch",
          subtitle: "Your order is recorded safely. Vehicle transit (Truck / Bike Rider) will activate live as soon as Admin approves & ships your parcel.",
          stageName: "Order Received",
          vehicle: "clock",
        };
      case "processing":
        return {
          progressPercent: 40,
          title: "Master Herbalists Packing Your Batch",
          subtitle: "40+ Authentic botanicals are being batch-sealed & packed.",
          stageName: "Botanical Hub",
          vehicle: "package",
        };
      case "shipped":
        return {
          progressPercent: 65,
          title: "Dispatched! Courier Express Truck En Route",
          subtitle: `In transit via ${order?.courierName || "Express Courier"} (${order?.trackingNumber || "AWB-IN-TRANSIT"}).`,
          stageName: "Highway Transit",
          vehicle: "truck",
        };
      case "out_for_delivery":
        return {
          progressPercent: 88,
          title: "Out for Delivery! Courier Bike Rider Nearby",
          subtitle: "Your delivery partner is riding towards your doorstep now.",
          stageName: "Nearby Hub",
          vehicle: "bike",
        };
      case "delivered":
        return {
          progressPercent: 100,
          title: "Package Delivered to Your Doorstep!",
          subtitle: "Handed over safely. Enjoy your natural Ayurvya hair care ritual.",
          stageName: "Home Doorstep",
          vehicle: "home",
        };
      case "rejected":
      case "cancelled":
        return {
          progressPercent: 0,
          title: "Order Notice / Rejected",
          subtitle: order?.adminNotes || "Order could not be processed. Helpline: 8778359259.",
          stageName: "Notice",
          vehicle: "alert",
        };
      default:
        return {
          progressPercent: 20,
          title: "Order Confirmed",
          subtitle: "Preparing dispatch.",
          stageName: "Verification",
          vehicle: "clock",
        };
    }
  };

  const stage = order ? getStageInfo(order.status) : null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EC] pt-28 pb-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0B3D2E]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Title & Search Bar */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-xs font-sans font-bold text-[#F0D687] uppercase tracking-wider shadow-md">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <span>LIVE PARCEL TRACKING GRAPH</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F3EC]">
            Track Your <span className="text-gold-foil">Ayurvya Delivery</span>
          </h1>

          {/* Search Box Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 pt-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Tracking Code e.g. AYUR-789012"
                className="w-full bg-[#101512] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-full pl-10 pr-4 py-3 text-xs font-mono text-[#F5F3EC] outline-none tracking-wider uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold-foil px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 cursor-pointer shadow-lg"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Track"}
            </button>
          </form>
        </div>

        {/* Main Live Tracking Box */}
        {order && stage && (
          <div className="space-y-6">
            {/* Top Status Card */}
            <div className="gold-glow-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Status Header Pill */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F6E4A]/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#F0D687] bg-[#0B3D2E] px-3 py-1 rounded-full border border-[#D4AF37]/40 tracking-wider">
                      Tracking Code: {order.trackingCode || order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-[11px] text-[#2FA36B] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2FA36B] animate-ping" /> Live Syncing
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F3EC] mt-2">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#8A8F8C] mt-0.5">{stage.subtitle}</p>
                </div>

                <div className="text-left sm:text-right text-xs font-sans">
                  <span className="text-[#8A8F8C] block">Payment Mode:</span>
                  <span className="text-[#2FA36B] font-bold uppercase">
                    {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Prepaid"}
                  </span>
                  <span className="text-gold-shine block font-bold text-sm mt-0.5">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>

              {/* ANIMATED GRAPH TRACK (Truck / Bike Moving Vehicle Road Line) */}
              {order.status !== "rejected" && (
                <div className="py-6 space-y-6">
                  <div className="relative w-full pt-8 pb-4">
                    {/* Animated Road Track Bar */}
                    <div className="w-full h-3 bg-[#101512] rounded-full border border-[#1F6E4A]/40 relative overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${stage.progressPercent}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#0B3D2E] via-[#2FA36B] to-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                      />
                    </div>

                    {/* Dynamic Moving Vehicle (Truck / Bike / Box) */}
                    <motion.div
                      initial={{ left: "0%" }}
                      animate={{ left: `${Math.min(stage.progressPercent, 92)}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute -top-3 -translate-x-1/2 z-20 flex flex-col items-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0B3D2E] to-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center text-[#F0D687] shadow-[0_0_25px_rgba(212,175,55,0.6)] animate-bounce">
                        {stage.vehicle === "bike" && <Bike className="w-6 h-6 text-[#F5F3EC]" />}
                        {stage.vehicle === "truck" && <Truck className="w-6 h-6 text-[#F5F3EC]" />}
                        {stage.vehicle === "package" && <PackageCheck className="w-6 h-6 text-[#F5F3EC]" />}
                        {stage.vehicle === "clock" && <Clock className="w-6 h-6 text-[#F5F3EC]" />}
                        {stage.vehicle === "home" && <HomeIcon className="w-6 h-6 text-[#F5F3EC]" />}
                      </div>
                      <span className="text-[10px] font-sans font-bold text-[#F0D687] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#D4AF37]/40 shadow mt-1 whitespace-nowrap">
                        {stage.stageName}
                      </span>
                    </motion.div>

                    {/* 5 Milestone Station Nodes on the Graph */}
                    <div className="grid grid-cols-5 gap-2 relative z-10 pt-6 text-center text-xs">
                      {/* Station 1: Verification */}
                      <div className="space-y-1">
                        <div className="w-6 h-6 rounded-full bg-[#0B3D2E] border-2 border-[#2FA36B] mx-auto flex items-center justify-center text-[#2FA36B]">
                          <Building2 className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-bold text-[#F5F3EC]">1. Order Placed</p>
                        <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Quality Verification</p>
                      </div>

                      {/* Station 2: Packing Hub */}
                      <div className="space-y-1">
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border-2 ${
                            stage.progressPercent >= 40
                              ? "bg-[#0B3D2E] border-[#2FA36B] text-[#2FA36B]"
                              : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                          }`}
                        >
                          <PackageCheck className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-bold text-[#F5F3EC]">2. Herbal Packing</p>
                        <p className="text-[9px] text-[#8A8F8C] hidden sm:block">40+ Herb Batch Sealed</p>
                      </div>

                      {/* Station 3: Express Truck */}
                      <div className="space-y-1">
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border-2 ${
                            stage.progressPercent >= 65
                              ? "bg-[#0B3D2E] border-[#D4AF37] text-[#D4AF37]"
                              : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                          }`}
                        >
                          <Truck className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-bold text-[#F5F3EC]">3. Highway Transit</p>
                        <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Express Courier Truck</p>
                      </div>

                      {/* Station 4: Bike Courier */}
                      <div className="space-y-1">
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border-2 ${
                            stage.progressPercent >= 88
                              ? "bg-blue-950 border-blue-400 text-blue-300"
                              : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                          }`}
                        >
                          <Bike className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-bold text-[#F5F3EC]">4. Nearby Bike</p>
                        <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Delivery Rider En Route</p>
                      </div>

                      {/* Station 5: Doorstep */}
                      <div className="space-y-1">
                        <div
                          className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center border-2 ${
                            stage.progressPercent >= 100
                              ? "bg-emerald-950 border-emerald-400 text-emerald-300"
                              : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                          }`}
                        >
                          <HomeIcon className="w-3 h-3" />
                        </div>
                        <p className="text-[11px] font-bold text-[#F5F3EC]">5. Delivered</p>
                        <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Doorstep Received</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Courier Tracking Info Bar if Shipped */}
              {order.courierName && (
                <div className="p-4 rounded-2xl bg-[#101512] border border-[#D4AF37]/40 flex items-center justify-between text-xs font-sans">
                  <div>
                    <span className="text-[#8A8F8C] block text-[11px]">Courier Logistics Partner:</span>
                    <strong className="text-[#F0D687] text-sm">{order.courierName}</strong>
                  </div>
                  {order.trackingNumber && (
                    <div className="text-right">
                      <span className="text-[#8A8F8C] block text-[11px]">Courier AWB Waybill No:</span>
                      <strong className="text-[#F5F3EC] font-mono text-sm">{order.trackingNumber}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Line Items & Customer Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left text-xs font-sans">
                <div className="space-y-2 bg-[#0A0A0A] p-4 rounded-2xl border border-[#1F6E4A]/20">
                  <h5 className="font-serif font-bold text-[#F0D687] flex items-center gap-1.5 border-b border-[#1F6E4A]/20 pb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Destination Address
                  </h5>
                  <p className="font-semibold text-[#F5F3EC] text-sm">{order.customer.name}</p>
                  <p className="text-[#8A8F8C]">{order.customer.addressLine1}</p>
                  {order.customer.addressLine2 && <p className="text-[#8A8F8C]">{order.customer.addressLine2}</p>}
                  <p className="text-[#8A8F8C]">
                    {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                  </p>
                  <p className="text-[#D4AF37] font-semibold pt-1">Phone: {order.customer.phone}</p>
                </div>

                <div className="space-y-2 bg-[#0A0A0A] p-4 rounded-2xl border border-[#1F6E4A]/20">
                  <h5 className="font-serif font-bold text-[#F0D687] flex items-center gap-1.5 border-b border-[#1F6E4A]/20 pb-2">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> Order Line Items
                  </h5>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => {
                      const isGift = item.isFreeGift === "true";
                      return (
                        <div key={idx} className="flex justify-between items-center text-[#F5F3EC]">
                          <span className="flex items-center gap-2">
                            {isGift ? (
                              <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
                            )}
                            <span>
                              {item.productName} ({item.sizeLabel}) × {item.quantity}
                            </span>
                          </span>
                          <span className="font-bold text-[#F0D687]">
                            {isGift ? "FREE GIFT" : formatPrice(parseFloat(item.unitPrice) * item.quantity)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-2 border-t border-[#1F6E4A]/30 flex justify-between font-bold text-sm">
                    <span>Grand Total Amount (COD):</span>
                    <span className="text-gold-shine">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Support Callout */}
              <div className="pt-2 text-center text-xs text-[#8A8F8C] flex items-center justify-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Need delivery help? Direct Helpline: <strong className="text-[#D4AF37]">8778359259</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
