import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { Sparkles, Flower2, Shield, HeartPulse, Sun, Droplets } from "lucide-react";

const HERBS = [
  {
    name: "Shikakai (Acacia Concinna)",
    role: "Natural Purifier & Cleanser",
    benefit: "Gently lifts scalp oil and impuriities without breaking skin barrier. Rich in saponins.",
    icon: Flower2,
    color: "#D4AF37",
  },
  {
    name: "Bhringraj (King of Hair)",
    role: "Follicle Activator",
    benefit: "Revives dormant hair roots, thickens hair shaft, and stops excessive hair shedding.",
    icon: Sparkles,
    color: "#2FA36B",
  },
  {
    name: "Wild Amla (Indian Gooseberry)",
    role: "Anti-Graying & Collagen Boost",
    benefit: "Packed with natural Vitamin C & antioxidants to preserve natural dark hair pigment.",
    icon: Sun,
    color: "#F0D687",
  },
  {
    name: "Brahmi (Memory Herb)",
    role: "Scalp Calming & Root Nourishing",
    benefit: "Cools micro-inflammation, reduces stress-induced hair fall, and strengthens roots.",
    icon: HeartPulse,
    color: "#2FA36B",
  },
  {
    name: "Hibiscus Petals",
    role: "Gloss & Conditioning",
    benefit: "Natural mucilage seals cuticles, adds silkiness, and prevents split end breakage.",
    icon: Droplets,
    color: "#D4AF37",
  },
  {
    name: "Neem & Reetha",
    role: "Anti-Dandruff & Scalp Shield",
    benefit: "Eradicates fungal dandruff flakes, balances sebum production, and relieves itchiness.",
    icon: Shield,
    color: "#2FA36B",
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#0B3D2E]/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#101512] px-4 py-1 rounded-full border border-[#D4AF37]/30">
            40+ Ayurvedic Botanicals
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC]">
            Botanical Alchemy in <span className="text-gold-foil">Every Drop</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F8C] leading-relaxed">
            Our signature formula contains 40+ handpicked wild botanicals. Here are the key powerhouse herbs working together for your hair.
          </p>
        </div>

        <BotanicalDivider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {HERBS.map((herb, idx) => {
            const IconComp = herb.icon;

            return (
              <div
                key={idx}
                className="gold-glow-card rounded-xl p-6 relative group transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl bg-[#101512] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] transition-colors"
                    style={{ color: herb.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
                      {herb.role}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#F5F3EC]">
                      {herb.name}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#8A8F8C] leading-relaxed">
                  {herb.benefit}
                </p>
              </div>
            );
          })}
        </div>

        {/* 40+ Herbs Pill Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#101512] via-[#0B3D2E]/50 to-[#101512] border border-[#D4AF37]/30 text-center">
          <p className="text-xs font-mono text-[#F0D687] uppercase tracking-widest mb-2">
            + 34 Additional Heritage Botanicals
          </p>
          <p className="text-xs text-[#8A8F8C] max-w-4xl mx-auto leading-relaxed">
            Tulsi, Fenugreek (Methi), Nagarmotha, Curry Leaves, Rose Petals, Jatamansi, Aloe Vera, Kapoor Kachli, Vettiver, Gunja, Lodhra, Camphor, Rosemary Essential Oil, and more.
          </p>
        </div>
      </div>
    </section>
  );
}
