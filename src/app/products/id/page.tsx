// Product detail page with enhanced UX - handles both slug and ID
import {
  fetchProductByIdSSR,
  fetchProductBySlugSSR,
  fetchProductsByCategorySSR,
} from "@/lib/api";

import { notFound } from "next/navigation";
import ProductPageClient from "./product-page-client";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productParam } = await params;

  // Try to fetch by slug first (if it's a slug), then fall back to ID
  let product = null;

  // Check if the param looks like a slug (contains hyphens or letters)
  const isLikelySlug = /[a-z-]/.test(productParam);

  if (isLikelySlug) {
    // Try fetching by slug first
    product = await fetchProductBySlugSSR(productParam);
  }

  // If slug fetch failed or param looks like an ID, try fetching by ID
  if (!product) {
    product = await fetchProductByIdSSR(productParam);
  }

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = await fetchProductsByCategorySSR(
    product.categoryId.toString(),
  );
  const filteredRelatedProducts = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Generate metadata for SEO
  const metadata = {
    title: product.metaTitle || `${product.name} - GroceryFresh`,
    description:
      product.metaDescription ||
      product.shortDescription ||
      product.description,
  };

  return (
    <ProductPageClient
      product={product}
      relatedProducts={filteredRelatedProducts}
      metadata={metadata}
    />
  );
}
