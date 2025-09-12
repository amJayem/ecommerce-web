// Product detail page with enhanced UX
import { fetchProductByIdSSR, fetchProductsByCategorySSR } from "@/lib/api";

import { notFound } from "next/navigation";
import ProductPageClient from "./product-page-client";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id: productId } = await params;
  const product = await fetchProductByIdSSR(productId);

  if (!product) {
    notFound();
  }

  // Get related products from the same category
  const relatedProducts = await fetchProductsByCategorySSR(product.category);
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
