import React from "react";
import Link from "next/link";
import { getActivePromotion } from "@/db/queries";
import { Sparkles, ArrowRight, Gift } from "lucide-react";

export default async function PromoBanner() {
  const promo = await getActivePromotion();

  if (!promo || promo.active !== "true") return null;

  return (
    <section className="relative bg-gradient-to-r from-[#0B3D2E] via-[#101512] to-[#0B3D2E] border-y border-[#D4AF37]/30 py-5 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.15)]">
      {/* Background Foil Sparkle Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 animate-pulse">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-mono font-semibold text-[#D4AF37] tracking-[0.2em] uppercase bg-[#0A0A0A]/60 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                  {promo.headline}
                </span>
                <span className="hidden sm:inline text-xs text-[#2FA36B] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.0 h-3.0 inline" /> Live Deal
                </span>
              </div>
              <p className="font-serif text-sm sm:text-base text-[#F5F3EC] mt-1 font-medium tracking-wide">
                {promo.description}
              </p>
            </div>
          </div>

          <Link
            href="/checkout"
            className="btn-gold-foil text-xs uppercase tracking-widest px-6 py-2.5 rounded-full flex items-center gap-2 shrink-0 group"
          >
            <span>Claim Offer Now</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
