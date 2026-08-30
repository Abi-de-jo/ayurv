"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AyurvyaLogo } from "@/components/brand/logo";
import { InstagramIcon } from "@/components/brand/icons";
import { ShoppingBag, Phone, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["products", "story", "ingredients", "benefits"];
      const scrollPos = window.scrollY + 200;

      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPos) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "Products", href: "/#products", id: "products" },
    { name: "Heritage", href: "/#story", id: "story" },
    { name: "Benefits", href: "/#benefits", id: "benefits" },
    { name: "Track Order", href: "/track", id: "track" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Borderless Expanded Floating Notch Container */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className={`pointer-events-auto w-full max-w-7xl relative bg-[#0A0A0A]/85 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.85)] transition-all duration-300 ${
          mobileMenuOpen
            ? "rounded-[28px] p-4 sm:p-5"
            : scrolled
            ? "rounded-full px-6 sm:px-8 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.9)]"
            : "rounded-full px-6 sm:px-8 py-3.5"
        }`}
      >
        {/* iPhone Dynamic Island Camera Pill Accent */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#101512] rounded-full opacity-40 hidden md:block" />

        {/* Bar Content */}
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="group cursor-pointer shrink-0 flex items-center gap-2"
          >
            <AyurvyaLogo className="h-8 sm:h-9 transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Clean Navigation List - No separate backgrounds */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={`text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#D4AF37]"
                        : "text-[#F5F3EC]/80 hover:text-[#D4AF37]"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right Helpline & CTA Button */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <a
              href="tel:8778359259"
              className="flex items-center gap-2 text-xs text-[#8A8F8C] hover:text-[#D4AF37] transition-colors font-mono cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>8778359259</span>
            </a>

            <a
              href="https://instagram.com/ayurvya.official"
              target="_blank"
              rel="noreferrer"
              className="text-[#8A8F8C] hover:text-[#D4AF37] transition-colors cursor-pointer"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            <Link
              href="/checkout"
              className="btn-gold-foil px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order Now</span>
            </Link>
          </div>

          {/* Mobile Actions & Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/checkout"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-gold-foil p-2 rounded-full text-xs flex items-center cursor-pointer shadow-md active:scale-95 transition-transform"
              aria-label="Order Now"
            >
              <ShoppingBag className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#F5F3EC]/80 hover:text-[#D4AF37] focus:outline-none cursor-pointer active:scale-95 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Dynamic Island Expanded Menu (Mobile) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden pt-4 mt-3 flex flex-col gap-3"
            >
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-sm uppercase font-medium tracking-wider text-[#F5F3EC] hover:text-[#D4AF37] px-4 py-2.5 transition-colors cursor-pointer"
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-3 flex flex-col gap-3">
                <div className="flex items-center justify-between px-2">
                  <a
                    href="tel:8778359259"
                    className="flex items-center gap-2 text-xs text-[#8A8F8C] hover:text-[#D4AF37] font-mono cursor-pointer transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>8778359259</span>
                  </a>

                  <a
                    href="https://instagram.com/ayurvya.official"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#8A8F8C] hover:text-[#D4AF37] cursor-pointer transition-colors"
                  >
                    <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>Instagram</span>
                  </a>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full btn-gold-foil py-3 rounded-full text-xs font-bold uppercase tracking-widest text-center flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Now</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}



