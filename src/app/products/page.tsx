// All Products page showing complete product catalog with enhanced UX
import { fetchCategoriesSSR } from "@/lib/api";
import AllProductsPageClient from "./all-products-page-client";
import { Suspense } from "react";
import { ProductGridSkeleton } from "@/components/product-skeleton";

export default async function AllProductsPage() {
  // Fetch categories from API for filtering
  const categories = await fetchCategoriesSSR();

  const metadata = {
    title: "All Products - GroceryFresh",
    description: `Browse our complete collection of fresh, organic products. Find everything you need for your healthy lifestyle.`,
  };

  return (
    <Suspense fallback={<ProductGridSkeleton count={12} />}>
      <AllProductsPageClient
        initialProducts={[]}
        categories={categories}
        metadata={metadata}
      />
    </Suspense>
  );
}
