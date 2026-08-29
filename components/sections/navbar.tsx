"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AyurvyaLogo } from "@/components/brand/logo";
import { InstagramIcon } from "@/components/brand/icons";
import { ShoppingBag as BagIcon, Phone as PhoneIcon, Menu as MenuIcon, X as XIcon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <AyurvyaLogo className="h-10 sm:h-12" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-[#F5F3EC]/80">
            <Link
              href="/"
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            <Link
              href="#products"
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Products
            </Link>
            <Link
              href="#story"
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Heritage
            </Link>
            <Link
              href="#ingredients"
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              40+ Herbs
            </Link>
            <Link
              href="#benefits"
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Benefits
            </Link>
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="tel:8778359259"
              className="flex items-center gap-2 text-xs text-[#8A8F8C] hover:text-[#D4AF37] transition-colors font-mono"
            >
              <PhoneIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>8778359259</span>
            </a>
            <a
              href="https://instagram.com/ayurvya.official"
              target="_blank"
              rel="noreferrer"
              className="text-[#8A8F8C] hover:text-[#D4AF37] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <Link
              href="/checkout"
              className="btn-gold-foil px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest flex items-center gap-2"
            >
              <BagIcon className="w-4 h-4" />
              <span>Order Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/checkout"
              className="btn-gold-foil p-2 rounded-full text-xs flex items-center"
            >
              <BagIcon className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A]/95 border-b border-[#D4AF37]/20 px-6 py-6 space-y-4 text-center">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#F5F3EC] hover:text-[#D4AF37]"
          >
            Home
          </Link>
          <Link
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#F5F3EC] hover:text-[#D4AF37]"
          >
            Products
          </Link>
          <Link
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#F5F3EC] hover:text-[#D4AF37]"
          >
            Heritage
          </Link>
          <Link
            href="#ingredients"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider text-[#F5F3EC] hover:text-[#D4AF37]"
          >
            40+ Herbs
          </Link>
          <div className="pt-4 border-t border-[#1F6E4A]/30 flex flex-col items-center gap-3">
            <a
              href="tel:8778359259"
              className="flex items-center gap-2 text-xs text-[#8A8F8C] font-mono"
            >
              <PhoneIcon className="w-4 h-4 text-[#D4AF37]" />
              Call: 8778359259
            </a>
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full btn-gold-foil py-3 rounded-full text-xs uppercase tracking-widest text-center"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
