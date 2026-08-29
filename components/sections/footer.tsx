import React from "react";
import Link from "next/link";
import { AyurvyaLogo } from "@/components/brand/logo";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { InstagramIcon } from "@/components/brand/icons";
import { Phone, ShieldCheck, Truck, Sparkles, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#070908] text-[#8A8F8C] border-t border-[#D4AF37]/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#0B3D2E]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <AyurvyaLogo className="h-12" />
            <p className="text-xs leading-relaxed text-[#8A8F8C] pt-2">
              Ayurvya Wellness combines ancient Vedic herbal formulations with modern luxury.
              100% natural, chemical-free hair elixirs crafted for dense, lustrous hair.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://instagram.com/ayurvya.official"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#101512] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:8778359259"
                className="w-9 h-9 rounded-full bg-[#101512] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all"
                aria-label="Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Ayurvedic Catalog
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <Link
                  href="/products/shikakai-powder-500g"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>•</span> Premium Shikakai Powder (500g)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/shikakai-powder-250g"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>•</span> Premium Shikakai Powder (250g)
                </Link>
              </li>
              <li>
                <Link
                  href="/products/hair-oil-elixir"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <span>•</span> Herbal Hair Oil Elixir (~20ml)
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Our Purity Promise
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>40+ Authentic Ayurvedic Herbs (No Sulphates / Parabens)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Free Express Shipping on Orders of 2+ Items</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Cash on Delivery (COD) Available Pan-India</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Order Helpline: 8778359259</span>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>@ayurvya.official</span>
              </p>
              <p className="flex items-start gap-2 pt-1 text-[11px] text-[#8A8F8C]/80">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Handcrafted & Bottled in India</span>
              </p>
            </div>
          </div>
        </div>

        <BotanicalDivider className="py-4" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A8F8C]/60 pt-4">
          <p>© {new Date().getFullYear()} Ayurvya Wellness. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#D4AF37] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#D4AF37] cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
