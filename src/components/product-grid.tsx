"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { QuantityUpdater } from "./quantity-updater";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  coverImage: string;
  discount?: number;
  unit?: string;
  shortDescription?: string;
  stock: number;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products?.map((product) => {
        // Get current quantity of this product in cart
        const cartItem = cartItems.find((item) => item.id === product.id);
        const currentQuantity = cartItem ? cartItem.quantity : 0;

        return (
          <div
            key={product?.id}
            className="border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white"
          >
            {/* Product Image */}
            <Link href={`/products/${product?.id}`}>
              <div className="w-full h-48 relative mb-4 overflow-hidden rounded-lg cursor-pointer">
                <Image
                  src={product?.coverImage || product?.imageUrl}
                  alt={product?.name}
                  fill
                  className="object-cover rounded-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Product Info - Clickable for details */}
            <Link href={`/products/${product?.id}`}>
              <div className="cursor-pointer mb-4">
                <h3 className="mt-2 text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                  {product?.name}
                </h3>

                {/* Display short description if available */}
                {product.shortDescription && (
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                <p className="text-green-600 font-bold text-lg">
                  ৳{product?.price}
                </p>

                {/* Display unit if available */}
                {product.unit && (
                  <p className="text-gray-500 text-sm">per {product.unit}</p>
                )}
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
    </section>
  );
}
