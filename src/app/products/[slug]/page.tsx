// Product detail page with slug-based routing
import { fetchProductBySlugSSR, fetchProductsByCategorySSR } from "@/lib/api";

import { notFound } from "next/navigation";
import ProductPageClient from "@/app/products/[slug]/product-page-client";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: productSlug } = await params;
  const product = await fetchProductBySlugSSR(productSlug);

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
