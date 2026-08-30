import HeroSection from "@/components/sections/hero-3d";
import ProductGrid from "@/components/sections/product-grid";
import BrandStory from "@/components/sections/brand-story";
import IngredientsSection from "@/components/sections/ingredients";
import BenefitsSection from "@/components/sections/benefits";
import HowToUseSection from "@/components/sections/how-to-use";
import TestimonialsSection from "@/components/sections/testimonials";
import FloatingGiftModal from "@/components/sections/floating-gift-modal";
import { getProducts, getActivePromotion } from "@/db/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const promotion = await getActivePromotion();

  return (
    <div className="relative bg-[#0A0A0A] overflow-hidden">
      <HeroSection />
      <ProductGrid initialProducts={products} />
      <BrandStory />
      <IngredientsSection />
      <BenefitsSection />
      <HowToUseSection />
      <TestimonialsSection />
      <FloatingGiftModal promotion={promotion} />
    </div>
  );
}


