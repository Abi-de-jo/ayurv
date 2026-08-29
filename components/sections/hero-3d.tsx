"use client";

import React from "react";
import Link from "next/link";
import { Hero3DBottle } from "@/components/three/product-model";
import { ArrowRight, ShieldCheck, Star, Leaf, Compass } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#101512] to-[#0A0A0A]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial from-[#0B3D2E]/40 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-radial from-[#D4AF37]/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text & Brand Narrative */}
          <div className="lg:col-span-7 text-left">
            {/* Badge with tight luxury spacing */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.15)] mb-3">
              <Leaf className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-mono tracking-widest text-[#F0D687] uppercase">
                100% Authentic Ayurvedic Formulation
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#F5F3EC] leading-[1.1] mb-4">
              Where <span className="text-gold-shine italic">Ayurveda</span> Meets{" "}
              <span className="text-gold-foil">Luxury</span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-[#8A8F8C] max-w-2xl leading-relaxed mb-6">
              Experience the restorative power of <strong className="text-[#F5F3EC]">40+ potent bio-active herbs</strong>, 
              crafted without sulphates, parabens, or synthetic chemicals. Nourish scalp deep tissue, stop hair thinning, and achieve mirror-gloss shine.
            </p>

            {/* Key Value Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-[#F5F3EC]/90">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>40+ Ancient Herbs</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5F3EC]/90">
                <ShieldCheck className="w-4 h-4 text-[#2FA36B] shrink-0" />
                <span>Zero Sulphates/Parabens</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#F5F3EC]/90">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Handcrafted in India</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link
                href="/checkout"
                className="btn-gold-foil px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest flex items-center gap-3 group cursor-pointer"
              >
                <span>Shop Catalog Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#ingredients"
                className="px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider text-[#F5F3EC] bg-[#101512] border border-[#1F6E4A] hover:border-[#D4AF37] hover:bg-[#0B3D2E]/40 transition-all cursor-pointer"
              >
                Explore 40+ Herbs
              </a>
            </div>

            {/* Social Proof with Real Customer Avatars */}
            <div className="pt-6 border-t border-[#1F6E4A]/30 flex items-center gap-4">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Reviewer Kavitha"
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Reviewer Siddharth"
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Customer Reviewer Ananya"
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] object-cover shadow-md"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#F5F3EC] ml-1">4.9 / 5</span>
                </div>
                <p className="text-[11px] text-[#8A8F8C]">
                  Loved by 2,400+ Ayurvedic Hair Care Enthusiasts
                </p>
              </div>
            </div>
          </div>

          {/* Right 3D Bottle Hero Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative">
              <Hero3DBottle />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#101512]/90 border border-[#D4AF37]/30 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] text-[#D4AF37] font-mono flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#2FA36B]" />
                <span>Drag to rotate 3D Elixir Bottle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
