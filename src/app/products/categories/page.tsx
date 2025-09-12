// All Categories page showing products organized by category
import { fetchCategoriesSSR, fetchProductsSSR } from "@/lib/api";
import CategoriesPageClient from "./categories-page-client";

export default async function CategoriesPage() {
  // Fetch categories and products from API
  const [categories, allProducts] = await Promise.all([
    fetchCategoriesSSR(),
    fetchProductsSSR(),
  ]);

  // Add product counts to categories
  const categoriesWithCounts = categories.map((category) => ({
    ...category,
    productCount: allProducts.filter((p) => p.category === category.name)
      .length,
  }));

  const metadata = {
    title: "Shop by Category - GroceryFresh",
    description:
      "Discover our wide range of fresh, organic products organized by category. Find exactly what you need for your healthy lifestyle.",
  };

  return (
    <CategoriesPageClient
      categoriesWithCounts={categoriesWithCounts}
      allProducts={allProducts}
      metadata={metadata}
    />
  );
}
