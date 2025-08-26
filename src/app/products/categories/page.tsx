"use client";

// All Categories page showing products organized by category
import {
  getCategoriesWithCounts,
  getProductsByCategory,
} from "@/lib/products-data";
import { QuantityUpdater } from "@/components/quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CategoriesPage() {
  const categoriesWithCounts = getCategoriesWithCounts();

  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Shop by Category
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover our wide range of fresh, organic products organized by
          category
        </p>
      </div>

      <div className="space-y-16">
        {categoriesWithCounts.map((category) => {
          const categoryProducts = getProductsByCategory(category.id);

          if (categoryProducts.length === 0) return null;

          return (
            <section
              key={category.id}
              className="border-b border-gray-200 pb-16 last:border-b-0"
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-600">
                    {categoryProducts.length} product
                    {categoryProducts.length !== 1 ? "s" : ""} available
                  </p>
                </div>
                <Link href={`/products/categories/${category.id}`}>
                  <Button
                    variant="outline"
                    className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white"
                  >
                    View All {category.name}
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryProducts.slice(0, 4).map((product) => {
                  // Get current quantity of this product in cart
                  const cartItem = cartItems.find(
                    (item) => item.id === product.id
                  );
                  const currentQuantity = cartItem ? cartItem.quantity : 0;

                  return (
                    <div
                      key={product.id}
                      className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4 relative group"
                    >
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                          {product.discount}% OFF
                        </div>
                      )}

                      {/* Product Image - Clickable for details */}
                      <Link href={`/products/${product.id}`}>
                        <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>

                      {/* Product Info - Clickable for details */}
                      <Link href={`/products/${product.id}`}>
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
                            <p className="text-gray-500 text-sm">
                              per {product.unit}
                            </p>
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
                          coverImage: product.imageUrl,
                        }}
                        currentQuantity={currentQuantity}
                      />
                    </div>
                  );
                })}
              </div>

              {categoryProducts.length > 4 && (
                <div className="text-center mt-8">
                  <Link href={`/products/categories/${category.id}`}>
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
  );
}
