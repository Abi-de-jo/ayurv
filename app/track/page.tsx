"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/brand/icons";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import {
  Search,
  PackageCheck,
  Truck,
  MapPin,
  Clock,
  Phone,
  RefreshCw,
  Gift,
  Building2,
  Bike,
  Home as HomeIcon,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Tag,
} from "lucide-react";

export default function OrderTrackingPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchOrder = async (searchParam?: string) => {
    setLoading(true);
    setErrorMsg(null);

    const savedCode = localStorage.getItem("ayurvya_last_order_code");
    const savedId = localStorage.getItem("ayurvya_last_order_id");
    const customerKey = localStorage.getItem("ayurvya_customer_id") || "";

    const q = (searchParam || query || savedCode || savedId || "").trim();
    const cleanSearch = q.replace(/[\s\-_]/g, "").toUpperCase();

    try {
      const res = await fetch(
        `/api/track-order?code=${encodeURIComponent(cleanSearch)}&customerKey=${encodeURIComponent(
          customerKey
        )}`
      );

      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
        }
        if (data.orders && data.orders.length > 0) {
          setAllOrders(data.orders);
        }
      } else {
        const errData = await res.json();
        setErrorMsg(errData.error || "No order found for this tracking code.");
        setOrder(null);
      }
    } catch (err: any) {
      setErrorMsg("Failed to connect to tracking server.");
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedCode = localStorage.getItem("ayurvya_last_order_code") || "";
    if (savedCode) {
      setQuery(savedCode);
    }
    fetchOrder(savedCode);

    // Auto-poll every 5 seconds for live admin status updates
    const interval = setInterval(() => {
      fetchOrder(savedCode);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(query);
  };

  // Stage info calculation
  const getStageInfo = (status: string) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return {
          progressPercent: 20,
          title: "Order Received & Pending Admin Dispatch",
          subtitle: "Your order details are recorded safely. Admin dispatch in progress.",
          stageIndex: 1,
        };
      case "processing":
        return {
          progressPercent: 40,
          title: "Master Herbalists Packing Your Batch",
          subtitle: "40+ Authentic botanicals are being batch-sealed & packed.",
          stageIndex: 2,
        };
      case "shipped":
        return {
          progressPercent: 65,
          title: "Dispatched! Express Highway Delivery Truck En Route",
          subtitle: `In transit via ${order?.courierName || "Express Courier"} (${order?.trackingNumber || "AWB-IN-TRANSIT"}).`,
          stageIndex: 3,
        };
      case "out_for_delivery":
        return {
          progressPercent: 88,
          title: "Out for Delivery! Courier Bike Rider Nearby",
          subtitle: "Your delivery partner is approaching your doorstep now.",
          stageIndex: 4,
        };
      case "delivered":
        return {
          progressPercent: 100,
          title: "Package Delivered to Your Doorstep!",
          subtitle: "Handed over safely. Enjoy your natural Ayurvya hair care ritual.",
          stageIndex: 5,
        };
      case "rejected":
      case "cancelled":
        return {
          progressPercent: 0,
          title: "Order Notice / Rejected",
          subtitle: order?.adminNotes || "Order could not be processed. Helpline: 8778359259.",
          stageIndex: 0,
        };
      default:
        return {
          progressPercent: 20,
          title: "Order Confirmed",
          subtitle: "Preparing dispatch.",
          stageIndex: 1,
        };
    }
  };

  const stage = order ? getStageInfo(order.status) : null;

  const whatsappMessage = order
    ? encodeURIComponent(
        `Hello Ayurvya Helpline, I need assistance with my order #${
          order.trackingCode || order.id.slice(0, 8).toUpperCase()
        }. Total: ${formatPrice(order.totalAmount)}, Status: ${order.status}`
      )
    : "";

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EC] pt-28 pb-20 relative font-sans">
      {/* Background Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        {/* Navigation Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:text-[#F0D687] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>

          <span className="text-[11px] font-mono text-[#8A8F8C]">
            Direct Helpline: 8778359259
          </span>
        </div>

        {/* Page Title & Search Bar */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-xs font-mono text-[#F0D687] uppercase shadow">
            <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>LIVE PARCEL TRACKING SYSTEM</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5F3EC]">
            Track Your <span className="text-gold-foil">Ayurvya Delivery</span>
          </h1>

          {/* Search Box Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 pt-2 max-w-md mx-auto">
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

        {/* Search Error Notice */}
        {errorMsg && !order && (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-red-950/70 border border-red-500/50 text-center text-xs text-red-200 space-y-2">
            <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
            <p className="font-semibold">{errorMsg}</p>
            <p className="text-[11px] text-red-300/80">
              Please check your tracking code or place an order to get live tracking updates.
            </p>
          </div>
        )}

        {/* Main Clean Tracking Display */}
        {order && stage && (
          <div className="space-y-6">
            {/* Top Status Card */}
            <div className="gold-glow-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37]/50 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1F6E4A]/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#F0D687] bg-[#0B3D2E] px-3 py-1 rounded-full border border-[#D4AF37]/40 tracking-wider">
                      Tracking Code: {order.trackingCode || order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-[11px] text-[#2FA36B] font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#2FA36B] animate-pulse" /> Live Syncing
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
                    {order.paymentMethod === "cod" ? "Direct Order" : "Prepaid"}
                  </span>
                  <span className="text-gold-shine block font-bold text-sm mt-0.5">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>

              {/* CLEAN STATIC 5-STEP TIMELINE BAR (Zero overlapping tooltips) */}
              {order.status !== "rejected" && (
                <div className="py-4 space-y-6">
                  {/* Static Progress Line */}
                  <div className="relative w-full">
                    <div className="w-full h-2.5 bg-[#101512] rounded-full border border-[#1F6E4A]/40 overflow-hidden">
                      <div
                        style={{ width: `${stage.progressPercent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#0B3D2E] via-[#2FA36B] to-[#D4AF37] transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* 5 Milestone Station Nodes */}
                  <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
                    {/* Step 1: Order Placed */}
                    <div className="space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          stage.stageIndex >= 1
                            ? "bg-[#0B3D2E] border-[#2FA36B] text-[#2FA36B] shadow-[0_0_12px_rgba(47,163,107,0.4)]"
                            : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                        }`}
                      >
                        <Building2 className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#F5F3EC]">1. Order Placed</p>
                      <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Quality Verification</p>
                    </div>

                    {/* Step 2: Herbal Packing */}
                    <div className="space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          stage.stageIndex >= 2
                            ? "bg-[#0B3D2E] border-[#2FA36B] text-[#2FA36B] shadow-[0_0_12px_rgba(47,163,107,0.4)]"
                            : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                        }`}
                      >
                        <PackageCheck className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#F5F3EC]">2. Herbal Packing</p>
                      <p className="text-[9px] text-[#8A8F8C] hidden sm:block">40+ Herb Batch Sealed</p>
                    </div>

                    {/* Step 3: Highway Transit */}
                    <div className="space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          stage.stageIndex >= 3
                            ? "bg-[#0B3D2E] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                            : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                        }`}
                      >
                        <Truck className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#F5F3EC]">3. Highway Transit</p>
                      <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Express Courier Truck</p>
                    </div>

                    {/* Step 4: Nearby Bike */}
                    <div className="space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          stage.stageIndex >= 4
                            ? "bg-blue-950 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.4)]"
                            : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                        }`}
                      >
                        <Bike className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#F5F3EC]">4. Nearby Bike</p>
                      <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Delivery Rider En Route</p>
                    </div>

                    {/* Step 5: Delivered */}
                    <div className="space-y-1.5">
                      <div
                        className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border-2 transition-all ${
                          stage.stageIndex >= 5
                            ? "bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.4)]"
                            : "bg-[#101512] border-[#1F6E4A]/40 text-[#8A8F8C]"
                        }`}
                      >
                        <HomeIcon className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-[#F5F3EC]">5. Delivered</p>
                      <p className="text-[9px] text-[#8A8F8C] hidden sm:block">Doorstep Received</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Courier Logistics Info */}
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

              {/* Destination Address & Items Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-[#101512] border border-[#1F6E4A]/40 space-y-2 text-xs font-sans">
                  <span className="text-xs font-serif font-bold text-[#D4AF37] flex items-center gap-1.5 border-b border-[#1F6E4A]/30 pb-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" /> Destination Address
                  </span>
                  <p className="font-bold text-sm text-[#F5F3EC] pt-1">{order.customer?.name}</p>
                  <p className="text-[#8A8F8C]">
                    {order.customer?.addressLine1}{" "}
                    {order.customer?.addressLine2 ? `, ${order.customer?.addressLine2}` : ""}
                  </p>
                  <p className="text-[#8A8F8C]">
                    {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                  </p>
                  <p className="text-[#F0D687] font-semibold pt-1">Phone: {order.customer?.phone}</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#101512] border border-[#1F6E4A]/40 space-y-3 text-xs font-sans">
                  <span className="text-xs font-serif font-bold text-[#D4AF37] flex items-center gap-1.5 border-b border-[#1F6E4A]/30 pb-2">
                    <Tag className="w-4 h-4 text-[#D4AF37]" /> Order Line Items
                  </span>

                  <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-[#F5F3EC]">
                        <span className="flex items-center gap-1.5">
                          {item.isFreeGift === "true" ? (
                            <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
                          )}
                          <span>
                            {item.productName} ({item.sizeLabel}) × {item.quantity}
                          </span>
                        </span>
                        <span className="font-bold text-[#F0D687]">
                          {item.isFreeGift === "true"
                            ? "FREE GIFT"
                            : formatPrice(parseFloat(item.unitPrice) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#1F6E4A]/30 pt-2 flex justify-between items-center text-sm font-bold">
                    <span className="text-[#F5F3EC]">Grand Total Amount:</span>
                    <span className="text-gold-shine text-base">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Direct Support Footer */}
              <div className="text-center pt-2 border-t border-[#1F6E4A]/30">
                <a
                  href={`https://wa.me/918778359259?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp Live Support (8778359259)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
