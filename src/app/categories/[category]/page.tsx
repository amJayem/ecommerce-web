// Dynamic category page showing products for a specific category
import { fetchCategoriesSSR, fetchProductsByCategorySSR } from "@/lib/api";
import { Product } from "@/types/product";
import CategoryPageClient from "./category-page-client";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categoryParam } = await params;

  // Fetch categories and products in parallel
  let categoryProducts: Product[] = [];

  try {
    const [categories, products] = await Promise.all([
      fetchCategoriesSSR(),
      fetchProductsByCategorySSR(categoryParam),
    ]);

    // Ensure categoryProducts is always an array
    categoryProducts = Array.isArray(products) ? products : [];

    // Log for debugging in production
    if (process.env.NODE_ENV === "production") {
      console.log(
        `[Category Page] Category: ${categoryParam}, Products found: ${categoryProducts.length}`
      );
      if (categoryProducts.length === 0) {
        console.warn(
          `[Category Page] No products found for category: ${categoryParam}`
        );
      }
    }

    // Find the category
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
      productCount: categoryProducts.length,
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
        categoryProducts={categoryProducts}
        metadata={metadata}
      />
    );
  } catch (error) {
    const fetchError =
      error instanceof Error ? error : new Error(String(error));
    console.error(
      `[Category Page] Error fetching products for category ${categoryParam}:`,
      fetchError
    );

    // Still try to fetch categories to show something
    const categories = await fetchCategoriesSSR().catch(() => []);

    const category =
      categories.find(
        (cat) =>
          cat.id === categoryParam ||
          cat.slug?.toLowerCase() === categoryParam.toLowerCase() ||
          cat.name?.toLowerCase().replace(/\s+/g, "-") ===
            categoryParam.toLowerCase()
      ) || null;

    const displayCategory = category || {
      id: categoryParam,
      name: categoryParam
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      slug: categoryParam,
      icon: "Package",
      productCount: 0,
    };

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
        categoryProducts={categoryProducts}
        metadata={metadata}
      />
    );
  }
}
