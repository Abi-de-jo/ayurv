"use client";

import React from "react";
import Link from "next/link";
import { Hero3DBottle } from "@/components/three/product-model";
import { ArrowRight, ShieldCheck, Star, Sparkles, CheckCircle2, Zap } from "lucide-react";

export default function HeroSection() {
  const INDIAN_AVATARS = [
    {
      name: "Kavitha R.",
      url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
    {
      name: "Ananya Sharma",
      url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=120&auto=format&fit=crop&q=80",
    },
    {
      name: "Siddharth Nair",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    },
    {
      name: "Priya Sundaram",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#101512] to-[#0A0A0A]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-[#0B3D2E]/40 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-radial from-[#D4AF37]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Key Value Points */}
          <div className="lg:col-span-7 text-left">
            {/* Top Luxury Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101512] border border-[#D4AF37]/40 shadow-[0_0_20px_rgba(212,175,55,0.2)] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#F0D687] uppercase">
                100% Pure Organic Ayurvedic Formulation
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F3EC] leading-[1.08] mb-6">
              Where <span className="text-gold-shine italic">Ayurveda</span> Meets{" "}
              <span className="text-gold-foil">Luxury</span>
            </h1>

            {/* Simple Feature Points Grid (No Paragraphs) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8 max-w-2xl">
              <div className="flex items-start gap-3 bg-[#101512]/80 p-3.5 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3EC]">40+ Bio-Active Herbs</h4>
                  <p className="text-[11px] text-[#8A8F8C]">Shikakai, Reetha, Amla & Bhringraj</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#101512]/80 p-3.5 rounded-2xl border border-[#2FA36B]/20 hover:border-[#2FA36B]/50 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#2FA36B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3EC]">0% Chemicals & Sulphates</h4>
                  <p className="text-[11px] text-[#8A8F8C]">Pure plant extracts, zero synthetics</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#101512]/80 p-3.5 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3EC]">Stops Hair Fall in 14 Days</h4>
                  <p className="text-[11px] text-[#8A8F8C]">Nourishes scalp deep tissue</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#101512]/80 p-3.5 rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all">
                <Zap className="w-4 h-4 text-[#F0D687] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5F3EC]">Free Hair Oil Elixir</h4>
                  <p className="text-[11px] text-[#8A8F8C]">Included with 500g Pack</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/checkout"
                className="btn-gold-foil px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-3 group cursor-pointer shadow-xl hover:scale-105 transition-all"
              >
                <span>Claim Free Oil & Order Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#ingredients"
                className="px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5F3EC] bg-[#101512] border border-[#1F6E4A] hover:border-[#D4AF37] hover:bg-[#0B3D2E]/40 transition-all cursor-pointer"
              >
                Explore 40+ Herbs
              </a>
            </div>

            {/* Indian User Avatars & 5-Star Proof */}
            <div className="pt-6 border-t border-[#1F6E4A]/30 flex items-center gap-4">
              <div className="flex -space-x-3.5">
                {INDIAN_AVATARS.map((avatar, idx) => (
                  <img
                    key={idx}
                    src={avatar.url}
                    alt={avatar.name}
                    className="w-10 h-10 rounded-full border-2 border-[#D4AF37] object-cover shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  />
                ))}
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                  ))}
                  <span className="text-xs font-bold text-[#F5F3EC] ml-1">4.9 / 5</span>
                </div>
                <p className="text-[11px] text-[#8A8F8C]">
                  Trusted by <strong className="text-[#F5F3EC]">10,000+ Indian Families</strong> Across India
                </p>
              </div>
            </div>
          </div>

          {/* Right 3D Bottle Hero Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <Hero3DBottle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



