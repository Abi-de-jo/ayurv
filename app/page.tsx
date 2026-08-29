import HeroSection from "@/components/sections/hero-3d";
import PromoBanner from "@/components/sections/promo-banner";
import ProductGrid from "@/components/sections/product-grid";
import BrandStory from "@/components/sections/brand-story";
import IngredientsSection from "@/components/sections/ingredients";
import BenefitsSection from "@/components/sections/benefits";
import HowToUseSection from "@/components/sections/how-to-use";
import TestimonialsSection from "@/components/sections/testimonials";
import StickyBuyBar from "@/components/sections/sticky-buy-bar";

export const revalidate = 60; // Revalidate dynamic promo data every 60 seconds

export default function Home() {
  return (
    <div className="relative bg-[#0A0A0A] overflow-hidden">
      <HeroSection />
      <PromoBanner />
      <ProductGrid />
      <BrandStory />
      <IngredientsSection />
      <BenefitsSection />
      <HowToUseSection />
      <TestimonialsSection />
      <StickyBuyBar />
    </div>
  );
}
