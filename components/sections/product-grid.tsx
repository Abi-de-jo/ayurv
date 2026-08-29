import React from "react";
import Link from "next/link";
import { getProducts } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { ShikakaiPouchIcon, HairOilBottleIcon } from "@/components/brand/icons";
import { ShoppingBag, ArrowRight, Gift, CheckCircle2, Award } from "lucide-react";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <section id="products" className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient BG Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Tight Luxury Spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Real Ayurvedic Formulations
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC] leading-tight">
            The <span className="text-gold-foil">Ayurvya</span> Signature Collection
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8F8C] max-w-xl mx-auto mt-2 leading-relaxed">
            Crafted strictly according to ancient Vedic text recipes. 100% natural, chemical-free, packaged in gold-foil luxury packaging.
          </p>
        </div>

        <BotanicalDivider className="my-6" />

        {/* 3 SKU Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {products.map((product) => {
            const isShikakai = product.slug.includes("shikakai");

            return (
              <div
                key={product.id}
                className="gold-glow-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden cursor-pointer"
              >
                {/* Free Gift Badge */}
                {isShikakai && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0B3D2E] to-[#1F6E4A] border border-[#D4AF37] px-3 py-1 rounded-full text-[11px] text-[#F0D687] font-semibold flex items-center gap-1.5 shadow-lg z-20">
                    <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Free 20ml Oil Included</span>
                  </div>
                )}

                <div>
                  {/* Vector Graphic Product Preview Container */}
                  <div className="w-full h-64 bg-gradient-to-b from-[#101512] to-[#0A0A0A] border border-[#1F6E4A]/30 rounded-xl flex items-center justify-center p-6 mb-6 relative group-hover:border-[#D4AF37]/60 transition-all duration-500 shadow-inner">
                    {isShikakai ? (
                      <div className="transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                        <ShikakaiPouchIcon className="w-28 h-44" />
                      </div>
                    ) : (
                      <div className="transform group-hover:scale-110 transition-transform duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                        <HairOilBottleIcon className="w-20 h-44" />
                      </div>
                    )}
                  </div>

                  {/* Size Label & Stock Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider bg-[#0B3D2E]/40 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                      {product.sizeLabel} Pack
                    </span>
                    <span className="text-xs text-[#2FA36B] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
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

                {/* Price & Action Buttons */}
                <div className="pt-4 border-t border-[#1F6E4A]/30">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-[#8A8F8C] block">Price:</span>
                      <div className="font-serif text-2xl font-bold text-[#F0D687]">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                    {isShikakai && (
                      <span className="text-[10px] text-[#2FA36B] font-mono font-semibold bg-[#0B3D2E]/60 px-2 py-0.5 rounded border border-[#2FA36B]/30 flex items-center gap-1">
                        <Gift className="w-3 h-3 text-[#D4AF37]" /> + Free 20ml Oil
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#F5F3EC] bg-[#101512] border border-[#1F6E4A] hover:border-[#D4AF37] text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/checkout"
                      className="btn-gold-foil px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 cursor-pointer"
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
