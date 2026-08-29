import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { Droplet, Sparkles, ShowerHead, Compass } from "lucide-react";

export default function HowToUseSection() {
  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Tight Luxury Spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              The 3-Step Ritual
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC] leading-tight">
            How to Use Your <span className="text-gold-foil">Ayurvya Ritual</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8F8C] max-w-xl mx-auto mt-2 leading-relaxed">
            Follow this traditional ritual twice weekly for maximum scalp nourishment and gloss.
          </p>
        </div>

        <BotanicalDivider className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* Step 1 */}
          <div className="gold-glow-card rounded-2xl p-8 text-center relative space-y-4 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm mx-auto flex items-center justify-center font-mono">
              01
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#101512] border border-[#D4AF37]/40 mx-auto flex items-center justify-center text-[#D4AF37]">
              <Droplet className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#F5F3EC]">
              Nourish with Oil Elixir
            </h3>
            <p className="text-xs text-[#8A8F8C] leading-relaxed">
              Apply 5–8 drops of Herbal Hair Oil Elixir directly onto dry scalp. Massage in circular motions for 5 minutes. Leave overnight or for 1 hour.
            </p>
          </div>

          {/* Step 2 */}
          <div className="gold-glow-card rounded-2xl p-8 text-center relative space-y-4 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm mx-auto flex items-center justify-center font-mono">
              02
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#101512] border border-[#2FA36B]/40 mx-auto flex items-center justify-center text-[#2FA36B]">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#F5F3EC]">
              Mix Herbal Shikakai Paste
            </h3>
            <p className="text-xs text-[#8A8F8C] leading-relaxed">
              Take 2–3 tablespoons of Premium Herbal Shikakai Powder. Mix with warm water, buttermilk, or rice water to create a smooth green paste.
            </p>
          </div>

          {/* Step 3 */}
          <div className="gold-glow-card rounded-2xl p-8 text-center relative space-y-4 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm mx-auto flex items-center justify-center font-mono">
              03
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#101512] border border-[#D4AF37]/40 mx-auto flex items-center justify-center text-[#D4AF37]">
              <ShowerHead className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#F5F3EC]">
              Massage & Rinse Gently
            </h3>
            <p className="text-xs text-[#8A8F8C] leading-relaxed">
              Apply paste evenly across wet hair and scalp. Massage gently for 3 minutes to build a subtle botanical lather, then rinse thoroughly with cool water.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
