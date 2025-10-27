// All Categories page showing products organized by category
import { fetchCategoriesSSR, fetchProductsSSR } from "@/lib/api";
import CategoriesPageClient from "./categories-page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop by Category - GroceryFresh",
  description:
    "Discover our wide range of fresh, organic products organized by category. Find exactly what you need for your healthy lifestyle.",
  keywords:
    "groceries, fresh produce, organic food, categories, fruits, vegetables, dairy, meat",
  openGraph: {
    title: "Shop by Category - GroceryFresh",
    description:
      "Discover our wide range of fresh, organic products organized by category.",
    type: "website",
  },
};

export default async function CategoriesPage() {
  // Fetch categories and products from API
  const [categories, allProducts] = await Promise.all([
    fetchCategoriesSSR(),
    fetchProductsSSR(),
  ]);

  // Add product counts to categories
  const categoriesWithCounts = categories.map((category) => {
    const matchingProducts = allProducts.filter((p) => {
      // Handle both string and object category formats
      if (typeof p.category === "object") {
        return (
          p.category.id === parseInt(category.id) ||
          p.category.name === category.name
        );
      }
      return (
        p.category === category.name || p.categoryId === parseInt(category.id)
      );
    });

    // console.log(`Category: "${category.name}" (ID: ${category.id})`);
    // console.log(`- Matching products: ${matchingProducts.length}`);
    // if (matchingProducts.length > 0) {
    //   console.log(
    //     `- Product names:`,
    //     matchingProducts.map((p) => p.name)
    //   );
    //   console.log(
    //     `- Product categories:`,
    //     matchingProducts.map((p) => p.category)
    //   );
    // }

    return {
      ...category,
      productCount: matchingProducts.length,
    };
  });

  return (
    <CategoriesPageClient
      categoriesWithCounts={categoriesWithCounts}
      allProducts={allProducts}
    />
  );
}
