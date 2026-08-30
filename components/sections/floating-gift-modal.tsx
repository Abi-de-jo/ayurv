"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, ArrowRight, Tag, Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function FloatingGiftModal({ promotion }: { promotion?: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPromo, setCurrentPromo] = useState<any>(promotion || null);

  const fetchLivePromo = async () => {
    try {
      const res = await fetch("/api/promotion");
      if (res.ok) {
        const data = await res.json();
        if (data.promo) {
          setCurrentPromo(data.promo);
        }
      }
    } catch (e) {
      console.warn("Error polling live promotion:", e);
    }
  };

  useEffect(() => {
    fetchLivePromo();
    // Poll every 5 seconds for admin promotion updates
    const timer = setInterval(fetchLivePromo, 5000);
    return () => clearInterval(timer);
  }, []);

  if (currentPromo && currentPromo.active === "false") return null;

  const headlineText = currentPromo?.headline || "Free 20ml Herbal Hair Oil Elixir";
  const descText =
    currentPromo?.description ||
    "Order any 500g or 250g Shikakai Pack and receive a complimentary 20ml Herbal Hair Oil Elixir + Free Express Delivery Across India.";

  const handleGiftClick = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.85, x: 0.85 },
        colors: ["#D4AF37", "#F0D687", "#2FA36B", "#ffffff"],
      });
    } catch {
      // Fallback safe
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Fixed Floating Gift Button (Bottom Right - Mobile & Desktop Responsive) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleGiftClick}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#101512]/95 border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.35)] backdrop-blur-md cursor-pointer hover:border-[#D4AF37] transition-all"
          >
            <span className="text-xs font-mono font-bold text-[#F0D687] uppercase tracking-widest">
              CLAIM FREE GIFT
            </span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGiftClick}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#0B3D2E] via-[#165B45] to-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.6)] cursor-pointer flex items-center justify-center text-[#F0D687] focus:outline-none"
          aria-label="Claim Exclusive Gift"
        >
          <Gift className="w-7 h-7 sm:w-8 sm:h-8 text-[#F5F3EC] animate-bounce" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#D4AF37]"></span>
          </span>
        </motion.button>
      </div>

      {/* Congratulatory Luxury Modal Popup */}
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
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#101512] via-[#0D1813] to-[#0A0A0A] border-2 border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.45)] text-center z-10 overflow-hidden"
            >
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#D4AF37]/25 rounded-full blur-3xl pointer-events-none" />

              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#8A8F8C] hover:text-[#F5F3EC] hover:bg-[#101512] transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#0B3D2E] to-[#D4AF37]/40 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg">
                <Gift className="w-8 h-8 text-[#F0D687]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[11px] font-mono font-bold tracking-widest text-[#F0D687] uppercase mb-3">
                <Check className="w-3.5 h-3.5 text-[#2FA36B]" />
                <span>EXCLUSIVE OFFER UNLOCKED</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F3EC] mb-2 leading-tight">
                Claim Your <span className="text-gold-shine italic">Free Gift</span>
              </h3>

              <p className="text-xs text-[#8A8F8C] mb-6">
                Special promotion automatically applied to your checkout session today.
              </p>

              <div className="bg-[#0B3D2E]/40 border border-[#D4AF37]/35 rounded-2xl p-4 mb-6 text-left relative overflow-hidden shadow-inner">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F0D687] uppercase tracking-wider">
                      {headlineText}
                    </h4>
                    <p className="text-xs text-[#F5F3EC] mt-1 leading-relaxed">
                      {descText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold-foil w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition-transform"
                >
                  <span>Claim Offer & Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2.5 text-xs text-[#8A8F8C] hover:text-[#F5F3EC] transition-colors cursor-pointer font-medium"
                >
                  Continue Browsing Products
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
