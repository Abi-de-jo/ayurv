"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { ShoppingBag, ArrowRight, Gift, CheckCircle2, Award, ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  sizeLabel: string;
  description: string;
}

const STATIC_PRODUCTS: Product[] = [
  {
    id: "shikakai-500g",
    name: "Ayurvya Herbal Shikakai Powder (500g)",
    slug: "shikakai-powder-500g",
    price: "699",
    sizeLabel: "500g",
    description: "40+ Bio-Active Botanicals. Stops hair fall, deep cleanses scalp, and seals cuticles for silkiness. Includes FREE 20ml Oil Elixir.",
  },
  {
    id: "shikakai-250g",
    name: "Ayurvya Herbal Shikakai Powder (250g)",
    slug: "shikakai-powder-250g",
    price: "399",
    sizeLabel: "250g",
    description: "Compact 250g trial pack with 40+ authentic Ayurvedic herbs. Promotes scalp health and volume. Includes FREE 20ml Oil Elixir.",
  },
  {
    id: "oil-elixir",
    name: "Ayurvya Herbal Hair Oil Elixir (250ml)",
    slug: "hair-oil-elixir",
    price: "499",
    sizeLabel: "250ml",
    description: "21-Day lunar decoction cooked in virgin oils with Bhringraj, Brahmi & Amla. Revives dormant roots & thickens strands.",
  },
];

export default function ProductGrid({ initialProducts }: { initialProducts?: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const productsToDisplay = initialProducts && initialProducts.length > 0 ? initialProducts : STATIC_PRODUCTS;

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="products" className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Ambient BG Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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

        {/* Horizontal Carousel Container for Mobile & Desktop Grid */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-4 pt-2 scrollbar-none"
        >
          {productsToDisplay.map((product) => {
            const isShikakai = product.slug.includes("shikakai");

            return (
              <div
                key={product.id}
                className="w-[85vw] sm:w-[320px] md:w-full shrink-0 snap-center gold-glow-card rounded-2xl p-5 flex flex-col justify-between relative group overflow-hidden cursor-pointer border border-[#1F6E4A]/30 hover:border-[#D4AF37]/60 transition-all duration-300"
              >
                {/* Free Gift Badge */}
                {isShikakai && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-[#0B3D2E] to-[#1F6E4A] border border-[#D4AF37] px-2.5 py-0.5 rounded-full text-[10px] text-[#F0D687] font-semibold flex items-center gap-1 shadow-lg z-20">
                    <Gift className="w-3 h-3 text-[#D4AF37]" />
                    <span>Free 20ml Oil</span>
                  </div>
                )}

                <div>
                  {/* Realistic Photography Preview Container (Slightly Increased Height) */}
                  <div className="w-full h-56 sm:h-60 bg-[#0A0A0A] border border-[#1F6E4A]/30 rounded-xl overflow-hidden mb-4 relative group-hover:border-[#D4AF37]/60 transition-all duration-500 shadow-md">
                    <img
                      src={isShikakai ? "/product-shikakai.png" : "/product-oil.png"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Size Label & Stock Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-sans font-semibold text-[#D4AF37] uppercase tracking-wider bg-[#0B3D2E]/40 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {product.sizeLabel} Pack
                    </span>
                    <span className="text-[11px] text-[#2FA36B] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-serif text-lg font-bold text-[#F5F3EC] group-hover:text-[#D4AF37] transition-colors mb-1.5 leading-snug">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#8A8F8C] line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                  </p>
                </div>

                {/* Sleek Single-Line Price & Action Buttons */}
                <div className="pt-3 border-t border-[#1F6E4A]/30">
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#F0D687]">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    {isShikakai && (
                      <span className="text-[10px] text-[#2FA36B] font-sans font-semibold bg-[#0B3D2E]/60 px-2 py-0.5 rounded border border-[#2FA36B]/30 flex items-center gap-1 shrink-0">
                        <Gift className="w-3 h-3 text-[#D4AF37]" /> + Free 20ml Oil
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href={`/products/${product.slug}`}
                      className="px-3 py-2 rounded-full text-xs font-semibold text-[#F5F3EC] bg-[#101512] border border-[#1F6E4A] hover:border-[#D4AF37] text-center transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/checkout"
                      className="btn-gold-foil px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 cursor-pointer"
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

        {/* Scroll Navigation Buttons (Visible on Mobile & Tablet) */}
        <div className="flex items-center justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#0B3D2E] flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-95"
            aria-label="Previous Product"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono text-[#8A8F8C]">
            Swipe / Scroll to view all
          </span>

          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-full bg-[#101512] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#0B3D2E] flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-95"
            aria-label="Next Product"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
