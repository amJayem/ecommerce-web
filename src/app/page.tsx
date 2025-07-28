import { CategorySection } from "@/components/category-section";
import { HeroSection } from "@/components/hero-section";
import AllProductsPage from "./products/page";

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
