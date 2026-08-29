import React from "react";
import Link from "next/link";
import { getProducts } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { ShoppingBag, ArrowRight, Gift, Sparkles, CheckCircle2 } from "lucide-react";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section id="products" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient BG Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#101512] px-4 py-1 rounded-full border border-[#D4AF37]/30">
            Real Ayurvedic Formulations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC]">
            The <span className="text-gold-foil">Ayurvya</span> Signature Collection
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F8C] leading-relaxed">
            Crafted strictly according to ancient Vedic text recipes. 100% natural, chemical-free, and packaged in black gold-foil containers.
          </p>
        </div>

        <BotanicalDivider className="my-8" />

        {/* 3 SKU Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
          {products.map((product) => {
            const isShikakai = product.slug.includes("shikakai");

            return (
              <div
                key={product.id}
                className="gold-glow-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Free Gift Badge */}
                {isShikakai && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0B3D2E] to-[#1F6E4A] border border-[#D4AF37] px-3 py-1 rounded-full text-[11px] text-[#F0D687] font-semibold flex items-center gap-1.5 shadow-lg z-20">
                    <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Free 20ml Oil Included</span>
                  </div>
                )}

                <div>
                  {/* Product Card Visual Container */}
                  <div className="w-full h-64 bg-gradient-to-b from-[#101512] to-[#0A0A0A] border border-[#1F6E4A]/30 rounded-xl flex items-center justify-center p-6 mb-6 relative group-hover:border-[#D4AF37]/50 transition-colors">
                    {/* Rendered Bottle/Pouch Graphic representation */}
                    {isShikakai ? (
                      <div className="w-36 h-48 bg-[#101512] border-2 border-[#D4AF37] rounded-lg shadow-2xl flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        {/* Pouch Foliage Line Art */}
                        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px] opacity-10" />
                        <div className="w-8 h-8 rounded-full border border-[#D4AF37] flex items-center justify-center mb-2 text-[#D4AF37] font-serif font-bold text-xs">
                          A
                        </div>
                        <span className="font-serif text-xs font-bold text-[#F0D687] leading-tight">
                          PREMIUM SHIKAKAI
                        </span>
                        <span className="text-[9px] font-mono text-[#8A8F8C] mt-1">
                          {product.sizeLabel}
                        </span>
                        <div className="mt-3 px-2 py-0.5 bg-[#0B3D2E] border border-[#2FA36B]/40 rounded text-[8px] text-[#2FA36B] font-mono">
                          40+ HERBS
                        </div>
                      </div>
                    ) : (
                      <div className="w-20 h-48 bg-gradient-to-b from-[#0B3D2E] via-[#101512] to-[#0A0A0A] border-2 border-[#D4AF37] rounded-full shadow-2xl flex flex-col items-center justify-center p-2 text-center relative group-hover:scale-105 transition-transform duration-500">
                        <div className="w-6 h-6 rounded-full bg-[#D4AF37] text-[#0A0A0A] flex items-center justify-center text-[10px] font-bold mb-3">
                          A
                        </div>
                        <span className="font-serif text-[10px] font-bold text-[#F0D687] leading-none uppercase">
                          HAIR OIL
                        </span>
                        <span className="text-[8px] font-mono text-[#8A8F8C] mt-1">
                          {product.sizeLabel}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Size Label & Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider bg-[#0B3D2E]/40 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                      {product.sizeLabel} Pack
                    </span>
                    <span className="text-xs text-[#2FA36B] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif text-xl font-bold text-[#F5F3EC] group-hover:text-[#D4AF37] transition-colors mb-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#8A8F8C] line-clamp-3 leading-relaxed mb-6">
                    {product.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-[#1F6E4A]/30">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#8A8F8C]">Price:</span>
                      <div className="font-serif text-2xl font-bold text-[#F0D687]">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    {isShikakai && (
                      <span className="text-[10px] text-[#2FA36B] font-mono font-semibold">
                        + Free 20ml Oil Elixir
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#F5F3EC] bg-[#101512] border border-[#1F6E4A] hover:border-[#D4AF37] text-center transition-all flex items-center justify-center gap-1"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/checkout"
                      className="btn-gold-foil px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
