import { CategorySection } from "@/components/category-section";
import { HeroSection } from "@/components/hero-section";
import { ValueProposition } from "@/components/value-proposition";
import { BestsellersSection } from "@/components/bestsellers-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import AllProductsPage from "./products/page";

// Avoid build-time API calls; always render dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Buy Organic Products Online - GroceryFresh",
  description: "Shop fresh, organic groceries delivered to your door.",
};

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <ValueProposition />
      <AllProductsPage />
      <BestsellersSection />
      <NewsletterSignup />
    </main>
  );
}
