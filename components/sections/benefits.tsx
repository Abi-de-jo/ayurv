import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { CheckCircle2, ShieldCheck, Flame, Zap, Droplets, Sparkles, TrendingUp, LucideIcon } from "lucide-react";

interface BenefitWidget {
  title: string;
  desc: string;
  badge: string;
  metric: string;
  subText: string;
  progress: number;
  accentColor: string;
  icon: LucideIcon;
}

const BENEFIT_WIDGETS: BenefitWidget[] = [
  {
    title: "Stops Excessive Hair Fall",
    desc: "Strengthens root anchorage deep inside hair follicles within 14 days of regular ritual application.",
    badge: "14-DAY ANCHORING INDEX",
    metric: "94% Root Strength",
    subText: "Follicle Shedding Reduced",
    progress: 94,
    accentColor: "#2FA36B",
    icon: Zap,
  },
  {
    title: "Deep Scalp Purification",
    desc: "Flushes out residual hair spray buildup, dust, pollution particles, and hard water minerals.",
    badge: "SCALP PURITY LEVEL",
    metric: "0% Chemical Residue",
    subText: "pH 5.5 Balanced • 100% Cleansed",
    progress: 100,
    accentColor: "#D4AF37",
    icon: ShieldCheck,
  },
  {
    title: "Mirror-Gloss Shine & Silkiness",
    desc: "Smoothes damaged cuticles, making strands soft to touch without synthetic silicones.",
    badge: "CUTICLE REFLECTION INDEX",
    metric: "+300% Natural Gloss",
    subText: "Silicone-Free Cuticle Seal",
    progress: 88,
    accentColor: "#F0D687",
    icon: Sparkles,
  },
  {
    title: "Prevents Premature Graying",
    badge: "MELANIN RETENTION",
    metric: "100% Pigment Shield",
    subText: "Wild Amla & Bhringraj Bio-flavonoids",
    progress: 96,
    accentColor: "#2FA36B",
    desc: "Amla and Bhringraj bio-flavonoids stimulate melanin production to maintain natural dark hair pigment.",
    icon: Flame,
  },
  {
    title: "Restores Scalp Sebum Balance",
    badge: "MOISTURE : SEBUM EQUILIBRIUM",
    metric: "50 / 50 Perfect Ratio",
    subText: "Controls Grease • Hydrates Ends",
    progress: 90,
    accentColor: "#D4AF37",
    desc: "Controls excessive scalp grease while hydrating dry ends for uniform moisture across hair shaft.",
    icon: Droplets,
  },
  {
    title: "Featherlight Volume & Body",
    badge: "FOLLICLE LIFT & DENSITY",
    metric: "+85% Root Volume",
    subText: "Non-Greasy Weightless Bounce",
    progress: 85,
    accentColor: "#2FA36B",
    desc: "Adds natural bounce and body to fine, limp hair without weighing down roots or leaving sticky buildup.",
    icon: TrendingUp,
  },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 bg-[#080B0A] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Tight Luxury Spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2FA36B]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Clinical Transformation Metrics
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

        {/* Benefits Visual Widget Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {BENEFIT_WIDGETS.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <div
                key={idx}
                className="gold-glow-card rounded-2xl p-6 flex flex-col justify-between border border-[#1F6E4A]/30 hover:border-[#D4AF37]/60 transition-all cursor-pointer group"
              >
                <div>
                  {/* Widget Visual Header Box */}
                  <div className="bg-[#101512] border border-[#D4AF37]/30 rounded-xl p-4 mb-5 space-y-2.5 shadow-inner group-hover:border-[#D4AF37]/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#D4AF37] uppercase bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                        {item.badge}
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg bg-[#0B3D2E] flex items-center justify-center text-[#D4AF37] border border-[#2FA36B]/30"
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="font-sans text-xl font-bold text-[#F5F3EC]">
                        {item.metric}
                      </span>
                      <span className="text-[10px] text-[#8A8F8C] font-sans">
                        {item.subText}
                      </span>
                    </div>

                    {/* Visual Metric Progress Bar */}
                    <div className="w-full h-2 bg-[#0A0A0A] rounded-full overflow-hidden border border-[#1F6E4A]/40 relative">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${item.progress}%`,
                          backgroundImage: `linear-gradient(90deg, #0B3D2E 0%, ${item.accentColor} 100%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Benefit Title & Description */}
                  <h3 className="font-serif text-xl font-bold text-[#F5F3EC] group-hover:text-[#D4AF37] transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8A8F8C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


