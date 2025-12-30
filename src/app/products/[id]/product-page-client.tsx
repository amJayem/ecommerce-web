"use client";

import { Product } from "@/types/product";
// import { notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Package,
  Scale,
} from "lucide-react";
import { QuantityUpdater } from "@/components/quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

interface ProductPageClientProps {
  product: Product;
  relatedProducts: Product[];
  metadata: {
    title: string;
    description: string;
  };
}

export default function ProductPageClient({
  product,
  relatedProducts,
}: //   metadata,
ProductPageClientProps) {
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Breadcrumb Navigation */}
      <div className="mb-8">
        <Link
          href="/products/categories"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/products/categories" className="hover:text-green-600">
            Categories
          </Link>
          <span>/</span>
          <Link
            href={`/products/categories/${
              product.category && typeof product.category === "object"
                ? product.category.slug
                : product.categoryId
            }`}
            className="hover:text-green-600"
          >
            {product.category && typeof product.category === "object"
              ? product.category.name
              : product.categoryId}
          </Link>
          <span>/</span>
          <span className="text-gray-800">{product.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative">
            {product.discount ? (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full z-10">
                {product.discount}% OFF
              </div>
            ) : (
              ""
            )}
            <div className="w-full h-96 bg-white border rounded-xl overflow-hidden relative">
              <Image
                src={getSafeImageSrc(product.coverImage || product.imageUrl)}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  ({product.ratings || 4.8})
                </span>
              </div>
              <span className="text-green-600 font-medium">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Price and Unit Information */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-green-600">
                ৳{product.price}
              </span>
              {product.unit && (
                <span className="text-lg text-gray-600">
                  per {product.unit}
                </span>
              )}
            </div>

            {product.discount && product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-medium">
                  -{product.discount}% OFF
                </span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through">
                    ৳{product.oldPrice}
                  </span>
                )}
              </div>
            ) : null}
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                Quick Highlights
              </h3>
              <p className="text-green-700">{product.shortDescription}</p>
            </div>
          )}

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600">Category:</span>
              <span className="font-medium">
                {product.category && typeof product.category === "object"
                  ? product.category.name
                  : product.categoryId}
              </span>
            </div>
            {product.weight && (
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">{product.weight}g</span>
              </div>
            )}
          </div>

          {/* Quantity Updater */}
          <div className="pt-4">
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
              className="max-w-md"
            />
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Fast Delivery</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Quality Assured</p>
            </div>
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-xs text-gray-600">Easy Returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      {product.description && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Product Details
          </h2>
          <div className="bg-gray-50 p-6 rounded-xl">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => {
              const relatedCartItem = cartItems.find(
                (item) => item.id === relatedProduct.id
              );
              const relatedCurrentQuantity = relatedCartItem
                ? relatedCartItem.quantity
                : 0;

              return (
                <div
                  key={relatedProduct.id}
                  className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4"
                >
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="w-full h-32 relative mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={getSafeImageSrc(
                          relatedProduct.coverImage || relatedProduct.imageUrl
                        )}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm hover:text-green-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="mb-3">
                      <p className="text-green-600 font-bold">
                        ৳{relatedProduct.price}
                      </p>
                      {relatedProduct.unit && (
                        <p className="text-gray-500 text-xs">
                          per {relatedProduct.unit}
                        </p>
                      )}
                    </div>
                  </Link>

                  <QuantityUpdater
                    product={{
                      id: relatedProduct.id,
                      name: relatedProduct.name,
                      price: relatedProduct.price,
                      imageUrl: relatedProduct.imageUrl,
                      coverImage:
                        relatedProduct.coverImage || relatedProduct.imageUrl,
                      stock: relatedProduct.stock,
                    }}
                    currentQuantity={relatedCurrentQuantity}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
