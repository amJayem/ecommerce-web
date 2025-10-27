// All Products page showing complete product catalog with enhanced UX
import { fetchCategoriesSSR } from "@/lib/api";
import AllProductsPageClient from "./all-products-page-client";

export default async function AllProductsPage() {
  // Fetch categories from API for filtering
  const categories = await fetchCategoriesSSR();

  const metadata = {
    title: "All Products - GroceryFresh",
    description: `Browse our complete collection of fresh, organic products. Find everything you need for your healthy lifestyle.`,
  };

  return (
    <AllProductsPageClient
      initialProducts={[]}
      categories={categories}
      metadata={metadata}
    />
  );
}
