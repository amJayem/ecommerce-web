"use client";

import { Product } from "@/types/product";
import { Category } from "@/lib/api";
import { QuantityUpdater } from "@/components/quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Package } from "lucide-react";
import { getSafeImageSrc } from "@/lib/utils";

interface CategoriesPageClientProps {
  categoriesWithCounts: (Category & { productCount: number })[];
  allProducts: Product[];
}

export default function CategoriesPageClient({
  categoriesWithCounts,
  allProducts,
}: CategoriesPageClientProps) {
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Shop by Category
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Discover our wide range of fresh, organic products organized by
            category. From farm-fresh vegetables to premium dairy products, find
            everything you need for a healthy lifestyle.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm px-4">
            <span className="bg-green-500 px-2 sm:px-3 py-1 rounded-full">
              Fresh & Organic
            </span>
            <span className="bg-green-500 px-2 sm:px-3 py-1 rounded-full">
              Farm to Table
            </span>
            <span className="bg-green-500 px-2 sm:px-3 py-1 rounded-full">
              Quality Assured
            </span>
          </div>
        </div>
      </div>

      {/* Categories Content */}
      <div className="max-w-7xl mx-auto py-8 md:py-16 px-4 sm:px-6">
        <div className="space-y-16">
          {categoriesWithCounts.map((category) => {
            const categoryProducts = allProducts.filter((p) => {
              // Handle both string and object category formats
              if (p.category && typeof p.category === "object") {
                return (
                  p.category.id === parseInt(category.id) ||
                  p.category.name === category.name
                );
              }
              return (
                p.category === category.name ||
                p.categoryId === parseInt(category.id)
              );
            });

            // console.log(
            //   `Client - Category: "${category.name}" (ID: ${category.id})`
            // );
            // console.log(`Client - Product count: ${categoryProducts.length}`);

            // if (categoryProducts.length === 0) {
            //   console.log(
            //     `Client - Skipping category "${category.name}" (no products)`
            //   );
            //   return null;
            // }

            return (
              <section
                key={category.id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 md:mb-8 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-green-100 rounded-full flex-shrink-0">
                      {category.icon && /[^\x00-\x7F]/.test(category.icon) ? (
                        <span className="text-2xl sm:text-3xl">
                          {category.icon}
                        </span>
                      ) : (
                        <Package
                          size={24}
                          className="sm:w-8 sm:h-8 text-green-600"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 break-words">
                        {category.name}
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        {categoryProducts.length} product
                        {categoryProducts.length !== 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/products/categories/${
                      category.slug || category.id
                    }`}
                    className="flex-shrink-0"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto text-green-700 border-green-500 hover:bg-green-600 hover:text-white text-xs sm:text-sm"
                    >
                      View All
                    </Button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {categoryProducts.slice(0, 4).map((product) => {
                    // Get current quantity of this product in cart
                    const cartItem = cartItems.find(
                      (item) => item.id === product.id,
                    );
                    const currentQuantity = cartItem ? cartItem.quantity : 0;

                    return (
                      <div
                        key={product.id}
                        className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4 relative group"
                      >
                        <div
                          hidden={!product.discount}
                          className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10"
                        >
                          {product.discount}% OFF
                        </div>

                        {/* Product Image - Clickable for details */}
                        <Link href={`/products/${product.slug || product.id}`}>
                          <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                            <Image
                              src={getSafeImageSrc(
                                product.coverImage || product.imageUrl,
                              )}
                              alt={product.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>

                        {/* Product Info - Clickable for details */}
                        <Link href={`/products/${product.slug || product.id}`}>
                          <div className="cursor-pointer mb-4">
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

                {categoryProducts.length > 4 && (
                  <div className="text-center mt-8">
                    <Link
                      href={`/products/categories/${
                        category.slug || category.id
                      }`}
                    >
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
                      >
                        View All {categoryProducts.length} {category.name}{" "}
                        Products
                      </Button>
                    </Link>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
