import React from "react";
import { BotanicalDivider } from "@/components/brand/botanical-divider";
import { InstagramIcon } from "@/components/brand/icons";
import { Star, CheckCircle, Quote, Phone, MessageSquareQuote } from "lucide-react";

const REVIEWS = [
  {
    name: "Kavitha R.",
    city: "Chennai, Tamil Nadu",
    product: "500g Shikakai + Free Oil Elixir",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    comment:
      "My hair fall reduced drastically after just 3 washes! The 40+ herb powder smells so naturally herbal and authentic. The free hair oil elixir is super light and non-sticky.",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    city: "Bengaluru, Karnataka",
    product: "250g Shikakai Powder",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    comment:
      "I was skeptical about stopping commercial shampoo, but Ayurvya made the transition seamless. My scalp feels completely clean without feeling dry. Highly recommended!",
    rating: 5,
  },
  {
    name: "Siddharth Nair",
    city: "Kochi, Kerala",
    product: "Hair Oil Elixir + 500g Pack",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    comment:
      "The oil is pure magic. It cured my persistent dandruff flakes in two weeks. Order delivered promptly with Free Shipping. Amazing luxury quality!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#080B0A] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Tight Luxury Spacing */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101512] border border-[#D4AF37]/30 mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)]">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-mono font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              Real Customer Reviews
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#F5F3EC] leading-tight">
            Loved Across <span className="text-gold-foil">India</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8F8C] max-w-xl mx-auto mt-2 leading-relaxed">
            See what our community says about switching to 100% natural Ayurvedic hair care.
          </p>
        </div>

        <BotanicalDivider className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="gold-glow-card rounded-2xl p-8 flex flex-col justify-between relative cursor-pointer"
            >
              <Quote className="w-10 h-10 text-[#D4AF37]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* User Header with Avatar Photo */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-11 h-11 rounded-full border-2 border-[#D4AF37] object-cover shadow-md shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-sm font-bold text-[#F5F3EC]">
                        {review.name}
                      </span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#2FA36B]" />
                    </div>
                    <span className="text-[11px] text-[#8A8F8C] font-mono block">
                      {review.city}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-[#F5F3EC]/90 leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#1F6E4A]/30 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#8A8F8C]">Verified Buyer</span>
                <span className="text-[#D4AF37] font-semibold">{review.product}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Social Tag Box */}
        <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-6 text-xs text-[#8A8F8C] font-mono">
          <a
            href="https://instagram.com/ayurvya.official"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Follow us @ayurvya.official</span>
          </a>
          <span className="hidden sm:inline text-[#1F6E4A]">•</span>
          <a
            href="tel:8778359259"
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Order Helpline: 8778359259</span>
          </a>
        </div>
      </div>
    </section>
  );
}
