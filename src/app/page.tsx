import { CategorySection } from "@/components/category-section";
import { HeroSection } from "@/components/hero-section";
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
    <main className="p-4">
      <HeroSection />
      <CategorySection />
      <AllProductsPage />
    </main>
  );
}
