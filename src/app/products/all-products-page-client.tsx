"use client";

import { ProductSearchFilters } from "@/components/product-search-filters";
import { ProductGridSkeleton } from "@/components/product-skeleton";
import { QuantityUpdater } from "@/components/quantity-updater";
import { Button } from "@/components/ui/button";
import { SearchFilters, useProductSearch } from "@/hooks/useProductSearch";
import { Category } from "@/lib/api";
import { getSafeImageSrc } from "@/lib/utils";
import { RootState } from "@/store";
import { Product } from "@/types/product";
import { Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

interface AllProductsPageClientProps {
  initialProducts: Product[];
  categories: Category[];
  metadata: {
    title: string;
    description: string;
  };
}

export default function AllProductsPageClient({
  categories,
}: AllProductsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [minPrice, setMinPrice] = useState(
    parseInt(searchParams.get("minPrice") || "0")
  );
  const [maxPrice, setMaxPrice] = useState(
    parseInt(searchParams.get("maxPrice") || "10000")
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Get cart items
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (debouncedSearchQuery) params.set("q", debouncedSearchQuery);
    if (selectedCategory) params.set("category", selectedCategory);
    if (minPrice > 0) params.set("minPrice", minPrice.toString());
    if (maxPrice < 10000) params.set("maxPrice", maxPrice.toString());
    if (sort) params.set("sort", sort);

    const newUrl = params.toString()
      ? `/products?${params.toString()}`
      : "/products";

    router.replace(newUrl, { scroll: false });
  }, [
    debouncedSearchQuery,
    selectedCategory,
    minPrice,
    maxPrice,
    sort,
    router,
  ]);

  // Build filters object
  const filters = useMemo(() => {
    const filterObj: SearchFilters = {
      page: 1,
      limit: 12,
    };

    if (debouncedSearchQuery) filterObj.q = debouncedSearchQuery;
    if (selectedCategory) filterObj.category = selectedCategory;
    if (minPrice > 0) filterObj.minPrice = minPrice;
    if (maxPrice < 10000) filterObj.maxPrice = maxPrice;
    if (sort) filterObj.sort = sort;

    return filterObj;
  }, [debouncedSearchQuery, selectedCategory, minPrice, maxPrice, sort]);

  const { products, meta, isLoading, error, hasMore, loadMore } =
    useProductSearch(filters);

  const isFiltered = useMemo(() => {
    return (
      debouncedSearchQuery !== "" ||
      selectedCategory !== "" ||
      minPrice > 0 ||
      maxPrice < 10000 ||
      sort !== ""
    );
  }, [debouncedSearchQuery, selectedCategory, minPrice, maxPrice, sort]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(10000);
    setSort("");
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            All Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-100 max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Browse our complete collection of fresh, organic products. Find
            everything you need for your healthy lifestyle.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 sm:px-6">
        {/* Search and Filters */}
        <ProductSearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={handlePriceChange}
          sort={sort}
          onSortChange={setSort}
          categories={categories}
          resultCount={meta.total}
          onClear={handleClearFilters}
          isFiltered={isFiltered}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && products.length === 0 && <ProductGridSkeleton />}

        {/* Products Grid */}
        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.map((product) => {
                const cartItem = cartItems.find(
                  (item) => item.id === product.id
                );
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
                      <></>
                    )}

                    {/* Product Image */}
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

                    {/* Product Info */}
                    <Link href={`/products/${product.id}`}>
                      <div className="cursor-pointer mb-4">
                        {/* Category Badge */}
                        {product.category &&
                          typeof product.category === "object" && (
                            <div className="mb-2">
                              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                                {product.category.name}
                              </span>
                            </div>
                          )}

                        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>

                        {product.shortDescription && (
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {product.shortDescription}
                          </p>
                        )}

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

                    {/* Quantity Updater */}
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

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  {isLoading ? "Loading..." : "Load More Products"}
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            {meta.totalPages > 1 && (
              <div className="text-center mt-6 text-gray-600">
                Page {meta.page} of {meta.totalPages} ({meta.total} total
                products)
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && products.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="mb-6">
              <SearchIcon className="mx-auto h-24 w-24 text-gray-300" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No products found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {`We couldn't find any products matching your search criteria. Try
              adjusting your filters or search terms.`}
            </p>
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
