"use client";

import React, { useState, useEffect } from "react";
import {
  verifyAdminPinAction,
  getAdminOrdersAction,
  updateOrderStatusAction,
  deleteOrderAction,
  getAdminProductsAction,
  updateProductAction,
  getAdminPromotionAction,
  updatePromotionAction,
} from "@/app/actions/admin";
import { formatPrice } from "@/lib/utils";
import {
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  Edit,
  Tag,
  ShieldCheck,
  Search,
  Lock,
  ChevronRight,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Gift,
  Save,
  Check,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "promotions">("orders");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Courier Shipping Modal State
  const [selectedOrderForShip, setSelectedOrderForShip] = useState<any | null>(null);
  const [courierName, setCourierName] = useState("BlueDart Express");
  const [trackingNum, setTrackingNum] = useState("");

  // Products State
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Promotion State
  const [promotion, setPromotion] = useState({
    headline: "EXCLUSIVE HERBAL OFFER",
    description: "Buy any 500g or 250g Shikakai pack, get a 20ml Herbal Hair Oil Elixir FREE!",
    code: "AYURV10",
    discountPercent: 10,
    active: "true",
  });
  const [promoSaving, setPromoSaving] = useState(false);
  const [promoSaved, setPromoSaved] = useState(false);

  const [authenticating, setAuthenticating] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticating(true);
    const res = await verifyAdminPinAction(pin);
    setAuthenticating(false);
    if (res.success) {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      alert("Invalid Admin Password. Access Denied.");
    }
  };

  const fetchDashboardData = async () => {
    setLoadingOrders(true);
    const ordersRes = await getAdminOrdersAction();
    if (ordersRes.success && ordersRes.orders) {
      const uniqueMap = new Map<string, any>();
      for (const o of ordersRes.orders) {
        if (o && o.id) {
          uniqueMap.set(o.id, o);
        }
      }
      setOrders(Array.from(uniqueMap.values()));
    }

    const prodRes = await getAdminProductsAction();
    if (prodRes.success && prodRes.products) {
      setProducts(prodRes.products);
    }

    const promoRes = await getAdminPromotionAction();
    if (promoRes.success && promoRes.promo) {
      setPromotion({
        headline: promoRes.promo.headline,
        description: promoRes.promo.description,
        code: (promoRes.promo as any).code || "AYURV10",
        discountPercent: (promoRes.promo as any).discountPercent || 10,
        active: promoRes.promo.active,
      });
    }
    setLoadingOrders(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: string,
    courier?: string,
    trackNo?: string
  ) => {
    const res = await updateOrderStatusAction(orderId, newStatus, courier, trackNo);
    if (res.success) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId
            ? {
                ...o,
                status: newStatus,
                courierName: courier !== undefined ? courier : o.courierName,
                trackingNumber: trackNo !== undefined ? trackNo : o.trackingNumber,
              }
            : o
        )
      );
      setSelectedOrderForShip(null);
    }
  };

  const handleDeleteOrder = async (orderId: string, trackingCode: string) => {
    if (
      confirm(
        `Are you sure you want to permanently delete order ${trackingCode || orderId}? This action cannot be undone.`
      )
    ) {
      const res = await deleteOrderAction(orderId);
      if (res.success) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const res = await updateProductAction(editingProduct.id, {
      name: editingProduct.name,
      price: editingProduct.price,
      sizeLabel: editingProduct.sizeLabel,
      description: editingProduct.description,
      stock: parseInt(editingProduct.stock || 100),
    });

    if (res.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      setEditingProduct(null);
      alert("Product updated successfully!");
    }
  };

  const handleSavePromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    setPromoSaving(true);
    const res = await updatePromotionAction(promotion);
    setPromoSaving(false);
    if (res.success) {
      setPromoSaved(true);
      setTimeout(() => setPromoSaved(false), 3000);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const q = searchQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      (o.trackingCode && o.trackingCode.toLowerCase().includes(q)) ||
      o.customer?.name.toLowerCase().includes(q) ||
      o.customer?.phone.includes(q) ||
      o.customer?.city.toLowerCase().includes(q)
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 pt-28">
        <div className="w-full max-w-md bg-[#101512] border-2 border-[#D4AF37]/50 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0B3D2E] border border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#F5F3EC] mb-1">
            Ayurvya Admin Portal
          </h2>
          <p className="text-xs text-[#8A8F8C] mb-6">
            Enter Admin PIN to manage orders, products & live promotions.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-center text-sm text-[#F5F3EC] tracking-widest outline-none font-mono"
            />

            <button
              type="submit"
              className="btn-gold-foil w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer shadow-lg"
            >
              Access Admin Panel
            </button>
          </form>

          <p className="text-[11px] text-[#8A8F8C]/60 mt-4 font-mono">
            Protected Admin Environment • Ayurvya Wellness
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F3EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#1F6E4A]/30">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B3D2E]/60 border border-[#D4AF37]/40 text-xs font-mono text-[#F0D687] uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>LIVE ADMIN CONTROL CENTER</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F3EC]">
              Ayurvya Operations Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="px-4 py-2 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-xs font-semibold text-[#F5F3EC] hover:bg-[#0B3D2E] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? "animate-spin" : ""}`} />
              <span>Refresh Live Data</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 rounded-full bg-red-950/60 border border-red-500/40 text-xs font-semibold text-red-200 hover:bg-red-900 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-3 mb-8 border-b border-[#1F6E4A]/20 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#D4AF37] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#101512] text-[#8A8F8C] hover:text-[#F5F3EC] border border-[#1F6E4A]/40"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Progress ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "products"
                ? "bg-[#D4AF37] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#101512] text-[#8A8F8C] hover:text-[#F5F3EC] border border-[#1F6E4A]/40"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Products Manager ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("promotions")}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "promotions"
                ? "bg-[#D4AF37] text-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-[#101512] text-[#8A8F8C] hover:text-[#F5F3EC] border border-[#1F6E4A]/40"
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promotions & Deals</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Search & Layout View Toggle Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#101512] p-4 rounded-2xl border border-[#1F6E4A]/30">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#8A8F8C] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Tracking Code, Name, Phone, City..."
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/50 focus:border-[#D4AF37] rounded-xl pl-10 pr-4 py-2 text-xs text-[#F5F3EC] outline-none"
                />
              </div>

              <div className="flex items-center gap-4">
                {/* View Layout Switcher (Cards vs Table) */}
                <div className="flex items-center bg-[#0A0A0A] p-1 rounded-xl border border-[#1F6E4A]/40">
                  <button
                    onClick={() => setViewMode("card")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === "card"
                        ? "bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/40"
                        : "text-[#8A8F8C] hover:text-[#F5F3EC]"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Card View</span>
                  </button>

                  <button
                    onClick={() => setViewMode("table")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      viewMode === "table"
                        ? "bg-[#0B3D2E] text-[#D4AF37] border border-[#D4AF37]/40"
                        : "text-[#8A8F8C] hover:text-[#F5F3EC]"
                    }`}
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Table View</span>
                  </button>
                </div>

                <div className="text-xs text-[#8A8F8C] shrink-0">
                  <span>Total Revenue: </span>
                  <span className="font-sans font-bold text-base text-[#F0D687]">
                    {formatPrice(
                      orders.reduce((acc, o) => acc + parseFloat(o.totalAmount || "0"), 0)
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Orders List Content */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-[#101512] rounded-3xl border border-[#1F6E4A]/30 space-y-3">
                <Package className="w-12 h-12 text-[#8A8F8C] mx-auto opacity-50" />
                <h3 className="font-serif text-lg font-bold text-[#F5F3EC]">No Orders Found</h3>
                <p className="text-xs text-[#8A8F8C]">
                  When customers place orders, they will instantly appear here with live tracking progress.
                </p>
              </div>
            ) : viewMode === "card" ? (
              /* CARD VIEW LAYOUT */
              <div className="space-y-4">
                {filteredOrders.map((order, idx) => (
                  <div
                    key={`${order.id}-${idx}`}
                    className="gold-glow-card rounded-2xl p-6 border border-[#1F6E4A]/40 space-y-4 relative"
                  >
                    {/* Top Row: Tracking Code, Status Pill & Delete Button */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F6E4A]/30 pb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#F0D687] bg-[#0B3D2E] px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-md">
                            Tracking Code: {order.trackingCode || order.id.slice(0, 8).toUpperCase()}
                          </span>
                          <span className="text-[11px] text-[#8A8F8C] font-sans">
                            Placed on {new Date(order.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge & Delete Order Icon */}
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${
                            order.status === "delivered"
                              ? "bg-emerald-950 text-emerald-400 border-emerald-500"
                              : order.status === "shipped" || order.status === "out_for_delivery"
                              ? "bg-blue-950 text-blue-300 border-blue-500"
                              : order.status === "rejected" || order.status === "cancelled"
                              ? "bg-red-950 text-red-400 border-red-500"
                              : "bg-[#3D2C0B] text-[#F0D687] border-[#D4AF37]"
                          }`}
                        >
                          Status: {order.status.replace(/_/g, " ")}
                        </span>

                        {/* Trash Delete Icon */}
                        <button
                          onClick={() => handleDeleteOrder(order.id, order.trackingCode)}
                          className="w-8 h-8 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 hover:bg-red-900 transition-colors cursor-pointer shadow"
                          title="Delete Order Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Middle Grid: Customer Details & Order Items */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Customer Address Details */}
                      <div className="md:col-span-5 space-y-2 bg-[#0A0A0A]/60 p-4 rounded-xl border border-[#1F6E4A]/20 text-xs font-sans">
                        <h4 className="font-serif font-bold text-[#F0D687] flex items-center gap-1.5 border-b border-[#1F6E4A]/20 pb-2">
                          <User className="w-3.5 h-3.5 text-[#D4AF37]" /> Customer Address
                        </h4>
                        <p className="font-semibold text-[#F5F3EC]">{order.customer?.name}</p>
                        <p className="flex items-center gap-1.5 text-[#8A8F8C]">
                          <Phone className="w-3 h-3 text-[#D4AF37]" /> {order.customer?.phone}
                        </p>
                        <p className="flex items-start gap-1.5 text-[#8A8F8C]">
                          <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>
                            {order.customer?.addressLine1},{" "}
                            {order.customer?.addressLine2 && `${order.customer.addressLine2}, `}
                            {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
                          </span>
                        </p>
                      </div>

                      {/* Purchased Items List */}
                      <div className="md:col-span-7 space-y-2 bg-[#0A0A0A]/60 p-4 rounded-xl border border-[#1F6E4A]/20 text-xs font-sans">
                        <h4 className="font-serif font-bold text-[#F0D687] flex items-center gap-1.5 border-b border-[#1F6E4A]/20 pb-2">
                          <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> Order Line Items
                        </h4>

                        <div className="space-y-2">
                          {order.items?.map((item: any, idx: number) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-[#F5F3EC] pt-1"
                            >
                              <span className="flex items-center gap-2">
                                {item.isFreeGift === "true" ? (
                                  <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
                                )}
                                <span>
                                  {item.productName || "Ayurvya Product"} ({item.sizeLabel}) × {item.quantity}
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

                        <div className="flex items-center justify-between pt-3 border-t border-[#1F6E4A]/30 font-semibold text-sm">
                          <span>Total Amount:</span>
                          <span className="font-sans font-bold text-lg text-gold-shine">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Status Progress Workflow Actions */}
                    <div className="pt-2 border-t border-[#1F6E4A]/30 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs text-[#8A8F8C]">
                        {order.courierName && (
                          <span>
                            Courier: <strong className="text-[#F5F3EC]">{order.courierName}</strong> (
                            {order.trackingNumber})
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {order.status === "confirmed" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "processing")}
                            className="px-3.5 py-1.5 rounded-full bg-[#0B3D2E] border border-[#2FA36B] text-xs font-semibold text-[#2FA36B] hover:bg-[#2FA36B] hover:text-[#0A0A0A] transition-colors cursor-pointer"
                          >
                            Accept & Start Packing
                          </button>
                        )}

                        {(order.status === "confirmed" || order.status === "processing") && (
                          <button
                            onClick={() => {
                              setSelectedOrderForShip(order);
                              setTrackingNum(`AWB-${Math.floor(100000 + Math.random() * 900000)}`);
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#101512] border border-[#D4AF37] text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" /> Dispatch / Ship Order
                          </button>
                        )}

                        {order.status === "shipped" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "out_for_delivery")}
                            className="px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-400 text-xs font-semibold text-blue-200 hover:bg-blue-900 transition-colors cursor-pointer"
                          >
                            Mark Out for Delivery
                          </button>
                        )}

                        {order.status === "out_for_delivery" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "delivered")}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-400 text-xs font-semibold text-emerald-300 hover:bg-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
                          </button>
                        )}

                        {order.status !== "rejected" && order.status !== "delivered" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "rejected")}
                            className="px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/50 text-xs font-semibold text-red-300 hover:bg-red-900 transition-colors cursor-pointer flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Reject Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* TABLE VIEW LAYOUT */
              <div className="bg-[#101512] rounded-2xl border border-[#1F6E4A]/30 overflow-x-auto shadow-xl">
                <table className="w-full text-left border-collapse text-xs font-sans">
                  <thead>
                    <tr className="bg-[#0A0A0A] border-b border-[#1F6E4A]/40 text-[#D4AF37] uppercase tracking-wider font-semibold">
                      <th className="p-4">Tracking Code</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Destination</th>
                      <th className="p-4">Order Items</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F6E4A]/20">
                    {filteredOrders.map((order, idx) => (
                      <tr key={`${order.id}-${idx}`} className="hover:bg-[#0B3D2E]/20 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#F0D687]">
                          {order.trackingCode || order.id.slice(0, 8).toUpperCase()}
                          <span className="block text-[10px] font-sans text-[#8A8F8C] font-normal">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        <td className="p-4 font-sans">
                          <p className="font-bold text-[#F5F3EC]">{order.customer?.name}</p>
                          <p className="text-[#8A8F8C]">{order.customer?.phone}</p>
                        </td>

                        <td className="p-4 font-sans text-[#8A8F8C]">
                          <p className="text-[#F5F3EC] font-semibold">{order.customer?.city}</p>
                          <p className="text-[10px]">{order.customer?.pincode}</p>
                        </td>

                        <td className="p-4 font-sans text-[#F5F3EC]">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="truncate max-w-[200px]">
                              {item.productName} ({item.sizeLabel}) × {item.quantity}
                            </div>
                          ))}
                        </td>

                        <td className="p-4 font-bold text-[#F0D687]">
                          {formatPrice(order.totalAmount)}
                        </td>

                        <td className="p-4 font-sans">
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                              order.status === "delivered"
                                ? "bg-emerald-950 text-emerald-400 border-emerald-500"
                                : order.status === "shipped" || order.status === "out_for_delivery"
                                ? "bg-blue-950 text-blue-300 border-blue-500"
                                : order.status === "rejected" || order.status === "cancelled"
                                ? "bg-red-950 text-red-400 border-red-500"
                                : "bg-[#3D2C0B] text-[#F0D687] border-[#D4AF37]"
                            }`}
                          >
                            {order.status.replace(/_/g, " ")}
                          </span>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status === "confirmed" && (
                              <button
                                onClick={() => handleStatusChange(order.id, "processing")}
                                className="px-2.5 py-1 rounded bg-[#0B3D2E] text-[#2FA36B] border border-[#2FA36B] font-semibold text-[11px]"
                              >
                                Accept
                              </button>
                            )}
                            {(order.status === "confirmed" || order.status === "processing") && (
                              <button
                                onClick={() => {
                                  setSelectedOrderForShip(order);
                                  setTrackingNum(`AWB-${Math.floor(100000 + Math.random() * 900000)}`);
                                }}
                                className="px-2.5 py-1 rounded bg-[#101512] text-[#D4AF37] border border-[#D4AF37] font-semibold text-[11px]"
                              >
                                Ship
                              </button>
                            )}
                            {order.status === "shipped" && (
                              <button
                                onClick={() => handleStatusChange(order.id, "out_for_delivery")}
                                className="px-2.5 py-1 rounded bg-blue-950 text-blue-200 border border-blue-400 font-semibold text-[11px]"
                              >
                                Nearby
                              </button>
                            )}
                            {order.status === "out_for_delivery" && (
                              <button
                                onClick={() => handleStatusChange(order.id, "delivered")}
                                className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-400 font-semibold text-[11px]"
                              >
                                Delivered
                              </button>
                            )}
                            {order.status !== "rejected" && order.status !== "delivered" && (
                              <button
                                onClick={() => handleStatusChange(order.id, "rejected")}
                                className="px-2.5 py-1 rounded bg-red-950/60 text-red-300 border border-red-500/50 font-semibold text-[11px]"
                              >
                                Reject
                              </button>
                            )}

                            {/* Delete Trash Icon */}
                            <button
                              onClick={() => handleDeleteOrder(order.id, order.trackingCode)}
                              className="p-1.5 rounded-lg bg-red-950/60 text-red-400 border border-red-500/50 hover:bg-red-900 transition-colors"
                              title="Delete Order Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === "products" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="gold-glow-card rounded-2xl p-6 border border-[#1F6E4A]/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-full h-44 bg-[#0A0A0A] border border-[#1F6E4A]/30 rounded-xl overflow-hidden mb-4 relative">
                      <img
                        src={prod.slug.includes("shikakai") ? "/product-shikakai.png" : "/product-oil.png"}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans font-semibold text-[#D4AF37] uppercase bg-[#0B3D2E] px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                        {prod.sizeLabel} Pack
                      </span>
                      <span className="text-xs text-[#2FA36B] font-semibold">
                        Stock: {prod.stock || 100} units
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#F5F3EC] mb-1">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#8A8F8C] line-clamp-2 mb-4">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1F6E4A]/30 flex items-center justify-between">
                    <span className="font-sans text-xl font-bold text-[#F0D687]">
                      {formatPrice(prod.price)}
                    </span>

                    <button
                      onClick={() => setEditingProduct({ ...prod })}
                      className="px-4 py-2 rounded-full bg-[#101512] border border-[#D4AF37] text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Product
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Edit Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="w-full max-w-lg bg-[#101512] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl">
                  <h3 className="font-serif text-xl font-bold text-[#F5F3EC] border-b border-[#1F6E4A]/30 pb-3">
                    Edit Product Details
                  </h3>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="text-xs font-sans text-[#8A8F8C] block mb-1">Product Title</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-sans text-[#8A8F8C] block mb-1">Price (₹)</label>
                        <input
                          type="text"
                          value={editingProduct.price}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, price: e.target.value })
                          }
                          className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-sans text-[#8A8F8C] block mb-1">Size Label</label>
                        <input
                          type="text"
                          value={editingProduct.sizeLabel}
                          onChange={(e) =>
                            setEditingProduct({ ...editingProduct, sizeLabel: e.target.value })
                          }
                          className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-sans text-[#8A8F8C] block mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description: e.target.value })
                        }
                        className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC]"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        className="btn-gold-foil flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="py-3 px-6 rounded-full bg-[#0A0A0A] border border-[#8A8F8C]/40 text-xs text-[#8A8F8C] hover:text-[#F5F3EC] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROMOTIONS MANAGER */}
        {activeTab === "promotions" && (
          <div className="max-w-2xl bg-[#101512] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-[#1F6E4A]/30 pb-4">
              <h3 className="font-serif text-2xl font-bold text-[#F5F3EC]">
                Manage Live Promotions & Offers
              </h3>
              <p className="text-xs text-[#8A8F8C] mt-1">
                Configure global banner headline, deal copy, discount promo codes, and activation status.
              </p>
            </div>

            <form onSubmit={handleSavePromotion} className="space-y-5">
              <div>
                <label className="text-xs font-sans font-semibold text-[#F5F3EC] block mb-1.5">
                  Promotion Headline
                </label>
                <input
                  type="text"
                  value={promotion.headline}
                  onChange={(e) => setPromotion({ ...promotion, headline: e.target.value })}
                  placeholder="e.g. EXCLUSIVE HERBAL OFFER"
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-[#F5F3EC] block mb-1.5">
                  Promotion Description & Terms
                </label>
                <textarea
                  rows={3}
                  value={promotion.description}
                  onChange={(e) => setPromotion({ ...promotion, description: e.target.value })}
                  placeholder="e.g. Buy any 500g or 250g Shikakai pack, get a 20ml Herbal Hair Oil Elixir FREE..."
                  className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-sans font-semibold text-[#F5F3EC] block mb-1.5">
                    Discount Promo Code
                  </label>
                  <input
                    type="text"
                    value={promotion.code}
                    onChange={(e) => setPromotion({ ...promotion, code: e.target.value })}
                    placeholder="e.g. AYURV10"
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] font-mono outline-none uppercase"
                  />
                </div>

                <div>
                  <label className="text-xs font-sans font-semibold text-[#F5F3EC] block mb-1.5">
                    Discount Percent (%)
                  </label>
                  <input
                    type="number"
                    value={promotion.discountPercent}
                    onChange={(e) =>
                      setPromotion({ ...promotion, discountPercent: parseInt(e.target.value) || 0 })
                    }
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-xs text-[#F5F3EC] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0A0A0A] border border-[#1F6E4A]/40">
                <div>
                  <span className="text-xs font-bold text-[#F5F3EC] block">Activate Promotion Banner</span>
                  <span className="text-[11px] text-[#8A8F8C]">
                    Controls visibility on homepage floating modal and checkout
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setPromotion({ ...promotion, active: promotion.active === "true" ? "false" : "true" })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer flex items-center p-1 ${
                    promotion.active === "true" ? "bg-[#2FA36B]" : "bg-neutral-800"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      promotion.active === "true" ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                disabled={promoSaving}
                className="btn-gold-foil w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {promoSaving ? (
                  <span>Saving Promotion...</span>
                ) : promoSaved ? (
                  <>
                    <Check className="w-4 h-4 text-[#0A0A0A]" />
                    <span>Promotion Updated Successfully!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save & Publish Live Promotion</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Courier Shipping Modal */}
        {selectedOrderForShip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md bg-[#101512] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 space-y-4 text-left shadow-2xl">
              <h3 className="font-serif text-xl font-bold text-[#F5F3EC]">
                Dispatch Order: {selectedOrderForShip.trackingCode || selectedOrderForShip.id.slice(0, 8)}
              </h3>
              <p className="text-xs text-[#8A8F8C]">
                Enter shipping courier details to dispatch order & update customer tracking progress.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-sans text-[#8A8F8C] block mb-1">Courier Partner</label>
                  <select
                    value={courierName}
                    onChange={(e) => setCourierName(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC] outline-none"
                  >
                    <option value="BlueDart Express">BlueDart Express</option>
                    <option value="Delhivery Surface">Delhivery Surface</option>
                    <option value="India Post SpeedPost">India Post SpeedPost</option>
                    <option value="DTDC Express">DTDC Express</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-sans text-[#8A8F8C] block mb-1">
                    Courier AWB / Tracking Number
                  </label>
                  <input
                    type="text"
                    value={trackingNum}
                    onChange={(e) => setTrackingNum(e.target.value)}
                    placeholder="e.g. AWB78910245"
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 rounded-xl px-3 py-2 text-xs text-[#F5F3EC] font-mono outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleStatusChange(
                        selectedOrderForShip.id,
                        "shipped",
                        courierName,
                        trackingNum
                      )
                    }
                    className="btn-gold-foil flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Confirm Dispatch
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForShip(null)}
                    className="py-3 px-6 rounded-full bg-[#0A0A0A] border border-[#8A8F8C]/40 text-xs text-[#8A8F8C] hover:text-[#F5F3EC] cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
