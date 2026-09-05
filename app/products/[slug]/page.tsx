import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/db/queries";
import { formatPrice } from "@/lib/utils";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { ShikakaiPouchIcon, HairOilBottleIcon } from "@/components/brand/icons";
import { ShoppingBag, ArrowLeft, Gift, ShieldCheck, CheckCircle2, Leaf, Clock, Award, Truck } from "lucide-react";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const isShikakai = product.slug.includes("shikakai");

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-28 pb-20 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Link */}
        <Link
          href="/#products"
          className="inline-flex items-center gap-2 text-xs font-mono text-[#8A8F8C] hover:text-[#D4AF37] transition-colors mb-8 group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Ayurvedic Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Product Photography Container */}
          <div className="lg:col-span-6">
            <div className="gold-glow-card rounded-2xl p-3 sm:p-4 relative flex items-center justify-center min-h-[460px] overflow-hidden cursor-pointer">
              <img
                src={isShikakai ? "/product-shikakai.png" : "/product-oil.png"}
                alt={product.name}
                className="w-full h-[460px] object-cover rounded-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Product Buying Info */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-sans font-semibold text-[#D4AF37] uppercase tracking-wider bg-[#0B3D2E]/50 px-3 py-1 rounded border border-[#D4AF37]/30">
                  {product.sizeLabel} Pack
                </span>
                <span className="text-xs text-[#2FA36B] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5F3EC]">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mt-3">
                <span className="font-sans text-3xl font-bold text-[#F0D687]">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#8A8F8C] font-sans font-normal">
                  Inclusive of all taxes • Free shipping on orders above 1000/-
                </span>
              </div>
            </div>

            {/* Special Promo Callout */}
            {isShikakai && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0B3D2E]/90 via-[#101512] to-[#0B3D2E]/90 border border-[#D4AF37]/50 flex items-start gap-3">
                <Gift className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F0D687] uppercase tracking-wider">
                    SPECIAL LIVE PROMO APPLIED
                  </h4>
                  <p className="text-xs text-[#F5F3EC]/90 mt-0.5">
                    Order this pack and get a <strong>20ml Hair Oil Elixir FREE</strong> automatically added to your order. Free shipping on orders above <strong>1000/-</strong>!
                  </p>
                </div>
              </div>
            )}

            <p className="text-xs sm:text-sm text-[#8A8F8C] leading-relaxed">
              {product.description}
            </p>

            <BotanicalDivider className="py-2" />

            {/* Active Botanicals & Ritual Instructions */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#101512] border border-[#1F6E4A]/40">
                <h4 className="font-serif text-sm font-bold text-[#F5F3EC] mb-1 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#2FA36B]" />
                  Active Botanical Formulation
                </h4>
                <p className="text-xs text-[#8A8F8C] leading-relaxed">
                  {product.ingredients}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#101512] border border-[#1F6E4A]/40">
                <h4 className="font-serif text-sm font-bold text-[#F5F3EC] mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  Recommended Ritual Application
                </h4>
                <p className="text-xs text-[#8A8F8C] leading-relaxed">
                  {product.usage}
                </p>
              </div>
            </div>

            {/* Direct Order CTA Button */}
            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full btn-gold-foil py-4 rounded-full text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.3)]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Proceed to Order ({formatPrice(product.price)})</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs text-[#8A8F8C] pt-2 border-t border-[#1F6E4A]/20">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Free shipping on orders above 1000/-</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#2FA36B]" />
                <span>100% Herbal Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
