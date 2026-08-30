"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AyurvyaLogo } from "@/components/brand/logo";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { InstagramIcon } from "@/components/brand/icons";
import { Phone, ShieldCheck, Truck, MapPin, CheckCircle2, ArrowRight, Lock, Award, Heart } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#070908] text-[#8A8F8C] border-t-2 border-[#D4AF37]/40 pt-16 pb-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-[#0B3D2E]/25 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* VIP Newsletter Subscription Banner */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#101512] via-[#0B3D2E]/60 to-[#101512] border border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 text-left space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#0A0A0A] border border-[#D4AF37]/30 text-[10px] font-sans font-bold text-[#F0D687] uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>JOIN THE AYURVYA VIP CLUB</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F3EC]">
                Unlock 10% Off Your First Order
              </h3>
              <p className="text-xs text-[#8A8F8C] max-w-lg leading-relaxed">
                Subscribe for secret Ayurvedic ritual guides, seasonal harvest discount drops, and VIP offer codes.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-3.5 rounded-2xl bg-[#0B3D2E]/80 border border-[#2FA36B]/50 text-center text-xs text-[#2FA36B] font-semibold flex items-center justify-center gap-2 shadow-inner">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the VIP Club! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#0A0A0A] border border-[#1F6E4A]/60 focus:border-[#D4AF37] rounded-full px-4 py-3 text-xs text-[#F5F3EC] outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="btn-gold-foil px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition-transform"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <AyurvyaLogo className="h-12" />
            <p className="text-xs leading-relaxed text-[#8A8F8C] pt-2">
              Ayurvya Wellness combines ancient Vedic herbal formulations with modern luxury.
              100% natural, chemical-free hair elixirs crafted for dense, lustrous hair.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/ayurvya.official"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#101512] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:8778359259"
                className="w-9 h-9 rounded-full bg-[#101512] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all cursor-pointer"
                aria-label="Phone Helpline"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Ayurvedic Catalog
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <Link
                  href="/products/shikakai-powder-500g"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Premium Shikakai Powder (500g)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products/shikakai-powder-250g"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span>Premium Shikakai Powder (250g)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products/hair-oil-elixir"
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2FA36B]" />
                  <span>Herbal Hair Oil Elixir (250ml)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Our Purity Promise
            </h4>
            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>40+ Authentic Ayurvedic Herbs (0% Sulphates & Parabens)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#2FA36B] shrink-0 mt-0.5" />
                <span>Free Express Shipping on Orders of 2+ Items</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Cash on Delivery (COD) Available Pan-India</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm text-[#F5F3EC] uppercase tracking-widest border-b border-[#1F6E4A]/40 pb-2">
              Direct Support
            </h4>
            <div className="space-y-2.5 text-xs font-sans">
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

        {/* E-Commerce Guarantee Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#101512] border border-[#1F6E4A]/30 mb-8 text-center text-xs font-sans">
          <div className="flex items-center justify-center gap-2 text-[#F5F3EC]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>AYUSH Quality Standard</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#F5F3EC]">
            <Truck className="w-4 h-4 text-[#2FA36B]" />
            <span>Express Pan-India Delivery</span>
          </div>
 
          <div className="flex items-center justify-center gap-2 text-[#F5F3EC]">
            <Heart className="w-4 h-4 text-[#2FA36B]" />
            <span>100% Herbal Guarantee</span>
          </div>
        </div>

        <BotanicalDivider className="py-2" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A8F8C]/60 pt-4 font-sans">
          <p>© {new Date().getFullYear()} Ayurvya Wellness. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

