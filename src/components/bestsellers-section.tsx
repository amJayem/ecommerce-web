"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { QuantityUpdater } from "./quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import Link from "next/link";

interface BestsellersSectionProps {
  bestsellerProducts: Product[];
}

export function BestsellersSection({
  bestsellerProducts,
}: BestsellersSectionProps) {
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Bestsellers
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our most popular and highly-rated organic products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {bestsellerProducts.map((product) => {
            // Get current quantity of this product in cart
            const cartItem = cartItems.find((item) => item.id === product.id);
            const currentQuantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={product.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Product Image - Clickable for details */}
                <Link href={`/products/${product.id}`}>
                  <div className="w-full h-32 relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={product.coverImage || product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info - Clickable for details */}
                <Link href={`/products/${product.id}`}>
                  <div className="px-4 cursor-pointer">
                    <div className="mb-2">
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm group-hover:text-green-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="mb-3">
                      <p className="text-green-600 text-lg font-bold">
                        ৳{product.price}
                      </p>
                      {product.unit && (
                        <p className="text-gray-500 text-xs">
                          per {product.unit}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Quantity Updater Component - Replaces the old Add to Cart button */}
                <div className="px-4 pb-4">
                  <QuantityUpdater
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      imageUrl: product.imageUrl,
                      coverImage: product.coverImage || product.imageUrl,
                    }}
                    currentQuantity={currentQuantity}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
            >
              Browse More Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
