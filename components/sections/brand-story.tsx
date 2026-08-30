import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { Leaf, Award, Compass } from "lucide-react";

export default function BrandStory() {
  return (
    <section id="story" className="py-20 bg-[#080B0A] relative overflow-hidden">
      {/* Background Foil Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1F6E4A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-5 relative">
            <div className="gold-glow-card rounded-2xl p-8 text-center relative z-10 overflow-hidden cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-[#0B3D2E] border-2 border-[#D4AF37] mx-auto flex items-center justify-center text-[#D4AF37] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <Leaf className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#F0D687] mb-2">
                40+ Heritage Herbs
              </h3>
              <p className="text-xs text-[#8A8F8C] leading-relaxed mb-6">
                Sun-dried, copper-pestle crushed, and formulated over 21 continuous lunar cycles for maximum bio-potency.
              </p>
              <div className="grid grid-cols-2 gap-4 text-left border-t border-[#1F6E4A]/30 pt-4">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Method</span>
                  <p className="text-xs text-[#F5F3EC] font-semibold">Slow Ayurvedic Kashayam</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#2FA36B] uppercase">Purity</span>
                  <p className="text-xs text-[#F5F3EC] font-semibold">0% Chemicals & Sulphates</p>
                </div>
              </div>
            </div>

            {/* Accent Gold Frame */}
            <div className="absolute -inset-4 border border-[#D4AF37]/20 rounded-3xl -z-10 transform -rotate-2" />
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
                The Ayurvya Heritage
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC] leading-tight mb-4">
              Ancient Vedic Wisdom Bottled for <span className="text-gold-foil">Modern Royalty</span>
            </h2>
            <p className="text-sm sm:text-base text-[#8A8F8C] leading-relaxed mb-4">
              For generations, true Ayurvedic hair remedies depended on wild-harvested herbs crushed by mortar and pestle and cooked gently over slow firewood flames. Commercial shampoos replaced these sacred remedies with harsh detergent sulphates, synthetic fragrances, and watery diluents.
            </p>
            <p className="text-sm sm:text-base text-[#8A8F8C] leading-relaxed mb-6">
              At <strong className="text-[#F5F3EC]">Ayurvya Wellness</strong>, we rejected synthetic short-cuts. We source 40+ authentic herbs—including organic Shikakai, wild Amla, Bhringraj, Brahmi, and fresh Hibiscus—and formulate them in small batches to preserve every drop of essential oil and root vitality.
            </p>

            <BotanicalDivider className="py-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#101512] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#F5F3EC]">
                    No Sulphates or Parabens
                  </h4>
                  <p className="text-xs text-[#8A8F8C] mt-1">
                    Gently cleanses without stripping natural scalp moisture or sebum reserves.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#101512] border border-[#2FA36B]/40 flex items-center justify-center text-[#2FA36B] shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#F5F3EC]">
                    21-Day Oil Decoction
                  </h4>
                  <p className="text-xs text-[#8A8F8C] mt-1">
                    Herbal Hair Oil Elixir cooked slowly in cold-pressed virgin oils to extract bio-nutrients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

