"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Gift, Sparkles } from "lucide-react";

export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 550);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl bg-[#101512]/95 border border-[#D4AF37]/40 backdrop-blur-xl rounded-full p-2.5 sm:px-6 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#0B3D2E] border border-[#2FA36B]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Gift className="w-4 h-4 animate-bounce" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm text-[#F5F3EC] font-bold">
                Ayurvya Luxury Hair Care
              </span>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                40+ Herbs
              </span>
            </div>
            <p className="text-[11px] text-[#8A8F8C] flex items-center gap-1 mt-0.5">
              <span>Buy Shikakai Powder</span>
              <Sparkles className="w-3 h-3 text-[#2FA36B]" />
              <span className="text-[#2FA36B] font-semibold">Get Free 20ml Oil Elixir</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-serif text-sm sm:text-base font-bold text-[#F0D687]">
            From ₹399
          </span>
          <Link
            href="/checkout"
            className="btn-gold-foil px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
