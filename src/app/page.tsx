import { CategorySection } from "@/components/category-section";
import { HeroSection } from "@/components/hero-section";
import { ValueProposition } from "@/components/value-proposition";
import { BestsellersSection } from "@/components/bestsellers-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import ProductGrid from "@/components/product-grid";
import { products } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Avoid build-time API calls; always render dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Buy Organic Products Online - GroceryFresh",
  description: "Shop fresh, organic groceries delivered to your door.",
};

export default function HomePage() {
  // Get first 30 products for store products section
  const storeProducts = products.slice(0, 30);

  // Get next 10 products for featured products section
  const featuredProducts = products.slice(30, 40);

  return (
    <main>
      <HeroSection />
      <CategorySection />

      {/* Store Products Section - First 30 products */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Store Products
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our wide selection of fresh, organic products
            </p>
          </div>

          <ProductGrid
            products={storeProducts.map((product) => ({
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              coverImage: product.imageUrl,
              discount: product.discount,
              unit: product.unit,
              shortDescription: product.shortDescription,
            }))}
          />

          {/* View All Products Button */}
          {products.length > 30 && (
            <div className="text-center mt-12">
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
                >
                  View All {products.length} Products
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section - Next 10 products */}
      {featuredProducts.length > 0 && (
        <section className="w-full py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover our specially curated selection of premium products
              </p>
            </div>

            <ProductGrid
              products={featuredProducts.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                coverImage: product.imageUrl,
                discount: product.discount,
                unit: product.unit,
                shortDescription: product.shortDescription,
              }))}
            />
          </div>
        </section>
      )}

      {/* Why Choose GroceryFresh Section */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ValueProposition />
        </div>
      </section>

      <BestsellersSection />
      <NewsletterSignup />
    </main>
  );
}
