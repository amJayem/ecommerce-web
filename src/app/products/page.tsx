// All Products page showing complete product catalog with enhanced UX
import { fetchProductsSSR, fetchCategoriesSSR } from "@/lib/api";
import AllProductsPageClient from "./all-products-page-client";
// import AllProductsPageClient from "./all-products-page-client";

export default async function AllProductsPage() {
  // Fetch products and categories from API
  const [
    products,
    // ,categories
  ] = await Promise.all([fetchProductsSSR(), fetchCategoriesSSR()]);

  // Get unique categories for filtering
  const categoryNames = [...new Set(products.map((p) => p.category))];

  const metadata = {
    title: "All Products - GroceryFresh",
    description: `Browse our complete collection of ${products.length} fresh, organic products. Find everything you need for your healthy lifestyle.`,
  };

  return (
    <AllProductsPageClient
      products={products}
      categoryNames={categoryNames}
      metadata={metadata}
    />
  );
}
