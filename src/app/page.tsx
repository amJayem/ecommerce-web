import { CategorySection } from "@/components/category-section";
import { HeroSection } from "@/components/hero-section";
import { ValueProposition } from "@/components/value-proposition";
import { BestsellersSection } from "@/components/bestsellers-section";
import { NewsletterSignup } from "@/components/newsletter-signup";
import ProductGrid from "@/components/product-grid";
import {
  fetchProductsSSR,
  fetchFeaturedProductsSSR,
  fetchCategoriesSSR,
  fetchBestsellerProductsSSR,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

// Avoid build-time API calls; always render dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Buy Organic Products Online - GroceryFresh",
  description: "Shop fresh, organic groceries delivered to your door.",
};

export default async function HomePage() {
  // Fetch all data from API in parallel
  const [allProducts, featuredProducts, categories, bestsellerProducts] =
    await Promise.all([
      fetchProductsSSR(),
      fetchFeaturedProductsSSR(),
      fetchCategoriesSSR(),
      fetchBestsellerProductsSSR(),
    ]);
  // console.log({ allProducts });
  // Ensure allProducts is an array
  const safeProducts = Array.isArray(allProducts) ? allProducts : [];
  const safeFeaturedProducts = Array.isArray(featuredProducts)
    ? featuredProducts
    : [];
  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeBestsellerProducts = Array.isArray(bestsellerProducts)
    ? bestsellerProducts
    : [];
  // console.log({ safeCategories });
  // Get first 30 products for store products section
  const storeProducts = safeProducts.slice(0, 30);

  // Use featured products from API, or fallback to next 10 products if no featured products
  const displayFeaturedProducts =
    safeFeaturedProducts.length > 0
      ? safeFeaturedProducts.slice(0, 10)
      : safeProducts.slice(30, 40);
  // console.log({ displayFeaturedProducts });
  return (
    <main>
      <HeroSection />
      <CategorySection categories={safeCategories} />

      {/* Store Products Section - First 30 products */}
      <section className="w-full py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              All Products
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
              coverImage:
                product.coverImage ||
                "https://cdn.shopify.com/s/files/1/0850/9797/2012/files/placeholder_image.webp?v=1757652031",
              discount: product.discount,
              unit: product.unit,
              shortDescription: product.shortDescription,
              stock: product.stock,
            }))}
          />

          {/* View All Products Button */}
          {safeProducts.length > 30 && (
            <div className="text-center mt-12">
              <Link href="/products">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
                >
                  View All {safeProducts.length} Products
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </section>

      {/* Featured Products Section */}
      {displayFeaturedProducts.length > 0 && (
        <section className="w-full py-16 bg-gray-50">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Discover our specially curated selection of premium products
              </p>
            </div>

            <ProductGrid
              products={displayFeaturedProducts.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                coverImage:
                  product.coverImage ||
                  product.imageUrl ||
                  "https://cdn.shopify.com/s/files/1/0850/9797/2012/files/placeholder_image.webp?v=1757652031",
                discount: product.discount,
                unit: product.unit,
                shortDescription: product.shortDescription,
                stock: product.stock,
              }))}
            />
          </Container>
        </section>
      )}

      {/* Why Choose GroceryFresh Section */}
      <ValueProposition />
      {safeBestsellerProducts?.length > 0 && (
        <BestsellersSection bestsellerProducts={safeBestsellerProducts} />
      )}
      <NewsletterSignup />
    </main>
  );
}
