// All Products page showing complete product catalog with enhanced UX
import { fetchCategoriesSSR } from "@/lib/api";
import AllProductsPageClientV2 from "./all-products-page-client-v2";

export default async function AllProductsPage() {
  // Fetch categories from API for filtering
  const categories = await fetchCategoriesSSR();

  const metadata = {
    title: "All Products - GroceryFresh",
    description: `Browse our complete collection of fresh, organic products. Find everything you need for your healthy lifestyle.`,
  };

  return (
    <AllProductsPageClientV2
      initialProducts={[]}
      categories={categories}
      metadata={metadata}
    />
  );
}
