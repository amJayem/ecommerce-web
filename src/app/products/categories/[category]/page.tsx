// Dynamic category page showing products for a specific category
import { fetchCategoriesSSR, fetchProductsByCategorySSR } from "@/lib/api";
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
    fetchProductsByCategorySSR(categoryParam).catch(() => []), // Ensure we always get an array
  ]);

  // Ensure categoryProducts is always an array
  const safeCategoryProducts = Array.isArray(categoryProducts)
    ? categoryProducts
    : [];

  // Try to find category by ID first, then by slug (case-insensitive)
  const category =
    categories.find(
      (cat) =>
        cat.id === categoryParam ||
        cat.slug?.toLowerCase() === categoryParam.toLowerCase() ||
        cat.name?.toLowerCase().replace(/\s+/g, "-") ===
          categoryParam.toLowerCase()
    ) || null;

  // If category not found, create a temporary category object to still show the page
  // This handles cases where the category exists in backend but slug doesn't match exactly
  const displayCategory = category || {
    id: categoryParam,
    name: categoryParam
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    slug: categoryParam,
    icon: "Package",
    productCount: safeCategoryProducts.length,
  };

  // Generate metadata for SEO
  const metadata = {
    title:
      displayCategory.metaTitle ||
      `${displayCategory.name} Products - GroceryFresh`,
    description:
      displayCategory.metaDescription ||
      `Browse our selection of ${displayCategory.name.toLowerCase()} products. Fresh, organic, and delivered to your door.`,
  };

  return (
    <CategoryPageClient
      category={displayCategory}
      categoryProducts={safeCategoryProducts}
      metadata={metadata}
    />
  );
}
