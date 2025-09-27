// Dynamic category page showing products for a specific category
import { fetchCategoriesSSR, fetchProductsByCategorySSR } from "@/lib/api";
import { notFound } from "next/navigation";
import CategoryPageClient from "./category-page-client";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;

  // Fetch categories and products in parallel
  const [categories, categoryProducts] = await Promise.all([
    fetchCategoriesSSR(),
    fetchProductsByCategorySSR(categoryParam),
  ]);

  // Try to find category by ID first, then by slug
  const category = categories.find(
    (cat) => cat.id === categoryParam || cat.slug === categoryParam
  );

  if (!category) {
    notFound();
  }

  // Generate metadata for SEO
  const metadata = {
    title: category.metaTitle || `${category.name} Products - GroceryFresh`,
    description:
      category.metaDescription ||
      `Browse our selection of ${category.name.toLowerCase()} products. Fresh, organic, and delivered to your door.`,
  };

  return (
    <CategoryPageClient
      category={category}
      categoryProducts={categoryProducts}
      metadata={metadata}
    />
  );
}
