"use client";

import { Product } from "@/types/product";
import { Category } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { QuantityUpdater } from "@/components/quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

interface CategoryPageClientProps {
  category: Category;
  categoryProducts: Product[];
  metadata: {
    title: string;
    description: string;
  };
}

export default function CategoryPageClient({
  category,
  categoryProducts,
}: //   metadata,
CategoryPageClientProps) {
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Link
          href="/products/categories"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Categories
        </Link>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {category.name}
        </h1>
        <p className="text-gray-600 text-lg">
          {categoryProducts.length === 0
            ? "No products available"
            : `${categoryProducts.length} product${
                categoryProducts.length !== 1 ? "s" : ""
              } available`}
        </p>
      </div>

      {/* Products Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => {
            // Get current quantity of this product in cart
            const cartItem = cartItems.find((item) => item.id === product.id);
            const currentQuantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={product.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4 relative group"
              >
                {product.discount ? (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                    {product.discount}% OFF
                  </div>
                ) : (
                  ""
                )}

                {/* Product Image - Clickable for details */}
                <Link href={`/products/${product.id}`}>
                  <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={getSafeImageSrc(
                        product.coverImage || product.imageUrl
                      )}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info - Clickable for details */}
                <Link href={`/products/${product.id}`}>
                  <div className="cursor-pointer">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Display short description if available */}
                    {product.shortDescription && (
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}

                    {/* Display price with unit */}
                    <div className="mb-4">
                      <p className="text-green-600 text-xl font-bold">
                        ৳{product.price}
                      </p>
                      {product.unit && (
                        <p className="text-gray-500 text-sm">
                          per {product.unit}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Quantity Updater Component - Replaces the old Add to Cart button */}
                <QuantityUpdater
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    coverImage: product.coverImage || product.imageUrl,
                    stock: product.stock,
                  }}
                  currentQuantity={currentQuantity}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <svg
                className="mx-auto h-24 w-24 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No products available
            </h3>
            <p className="text-gray-600 mb-8">
              {`We're sorry, but there are currently no products in the `}
              <span className="font-semibold text-green-600">
                {category.name}
              </span>{" "}
              category. Check back soon or browse other categories!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products/categories">
                <Button
                  variant="outline"
                  className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white"
                >
                  Browse All Categories
                </Button>
              </Link>
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Back to Categories */}
      <div className="text-center mt-12">
        <Link href="/products/categories">
          <Button
            variant="outline"
            size="lg"
            className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
          >
            View All Categories
          </Button>
        </Link>
      </div>
    </div>
  );
}
