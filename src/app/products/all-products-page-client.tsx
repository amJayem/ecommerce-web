"use client";

import { Product } from "@/types/product";
import { QuantityUpdater } from "@/components/quantity-updater";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface AllProductsPageClientProps {
  products: Product[];
  categoryNames: string[];
  metadata: {
    title: string;
    description: string;
  };
}

export default function AllProductsPageClient({
  products,
  categoryNames,
}: //   metadata,
AllProductsPageClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // console.log({ products });
  // console.log("============================================");
  // Get cart items to check current quantities
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header with Navigation */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            All Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Browse our complete collection of {products.length} fresh, organic
            products
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categoryNames.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
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
                      src={product.coverImage || product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info - Clickable for details */}
                <Link href={`/products/${product.id}`}>
                  <div className="cursor-pointer mb-4">
                    <div className="mb-2">
                      <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>

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

                {/* Quantity Updater Component */}
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-gray-600 mb-4">
            No products found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your search terms or category filter
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            variant="outline"
            className="text-green-700 border-green-500"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Back to Home */}
      <div className="text-center mt-12">
        <Link href="/">
          <Button
            variant="outline"
            size="lg"
            className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
