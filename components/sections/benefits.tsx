import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { Sparkles, ShieldAlert, Zap, Layers, RefreshCw, Feather, CheckCircle2 } from "lucide-react";

const BENEFITS = [
  {
    title: "Stops Excessive Hair Fall",
    desc: "Strengthens root anchorage in hair follicles within 14 days of regular ritual application.",
    icon: Zap,
  },
  {
    title: "Deep Scalp Purification",
    desc: "Flushes out residual hair spray buildup, dust, pollution particles, and hard water minerals.",
    icon: RefreshCw,
  },
  {
    title: "Mirror-Gloss Shine & Silkiness",
    desc: "Smoothes damaged cuticles, making strands soft to touch without synthetic silicones.",
    icon: Sparkles,
  },
  {
    title: "Prevents Premature Graying",
    desc: "Amla and Bhringraj bio-flavonoids stimulate melanin production to maintain natural pigment.",
    icon: ShieldAlert,
  },
  {
    title: "Restores Scalp Sebum Balance",
    desc: "Controls excessive scalp grease while hydrating dry ends for uniform moisture.",
    icon: Layers,
  },
  {
    title: "Featherlight Volume & Thickness",
    desc: "Adds natural bounce and body to fine, limp hair without weighing down roots.",
    icon: Feather,
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-[#080B0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Tight Luxury Spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FA36B]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Visible Transformations
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC] leading-tight">
            Why Your Hair Will <span className="text-gold-foil">Love Ayurvya</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8F8C] max-w-xl mx-auto mt-2 leading-relaxed">
            Formulated for men and women seeking authentic scalp health without synthetic side effects.
          </p>
        </div>

        <BotanicalDivider className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
          {BENEFITS.map((item, i) => {
            const IconComp = item.icon;
            return (
              <div
                key={i}
                className="gold-glow-card rounded-2xl p-8 space-y-4 border border-[#1F6E4A]/30 hover:border-[#D4AF37]/50 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B3D2E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#F5F3EC]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8A8F8C] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
