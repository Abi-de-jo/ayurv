import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { InstagramIcon } from "@/components/brand/icons";
import { Star, CheckCircle, Quote, Phone } from "lucide-react";

const REVIEWS = [
  {
    name: "Kavitha R.",
    city: "Chennai, Tamil Nadu",
    product: "500g Shikakai + Free Oil Elixir",
    comment:
      "My hair fall reduced drastically after just 3 washes! The 40+ herb powder smells so naturally herbal and authentic. The free hair oil elixir is super light and non-sticky.",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    city: "Bengaluru, Karnataka",
    product: "250g Shikakai Powder",
    comment:
      "I was skeptical about stopping commercial shampoo, but Ayurvya made the transition seamless. My scalp feels completely clean without feeling dry. Highly recommended!",
    rating: 5,
  },
  {
    name: "Siddharth Nair",
    city: "Kochi, Kerala",
    product: "Hair Oil Elixir + 500g Pack",
    comment:
      "The oil is pure magic. It cured my persistent dandruff flakes in two weeks. Order delivered promptly via COD. Amazing luxury quality!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#080B0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-semibold tracking-[0.25em] text-[#D4AF37] uppercase bg-[#101512] px-4 py-1 rounded-full border border-[#D4AF37]/30">
            Real Customer Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC]">
            Loved Across <span className="text-gold-foil">India</span>
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F8C] leading-relaxed">
            See what our community says about switching to 100% natural Ayurvedic hair care.
          </p>
        </div>

        <BotanicalDivider className="my-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="gold-glow-card rounded-2xl p-8 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#F5F3EC]/90 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1F6E4A]/30">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-[#F0D687]">
                    {review.name}
                  </span>
                  <CheckCircle className="w-3.5 h-3.5 text-[#2FA36B]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8A8F8C] mt-1 font-mono">
                  <span>{review.city}</span>
                  <span className="text-[#D4AF37]">{review.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Tag Box */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#8A8F8C] font-mono">
          <a
            href="https://instagram.com/ayurvya.official"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Follow us @ayurvya.official</span>
          </a>
          <span className="hidden sm:inline">•</span>
          <a
            href="tel:8778359259"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Order Helpline: 8778359259</span>
          </a>
        </div>
      </div>
    </section>
  );
}
