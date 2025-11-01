"use client";

import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/api";

interface ProductSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  sort: string;
  onSortChange: (value: string) => void;
  categories: Category[];
  resultCount: number;
  onClear: () => void;
  isFiltered: boolean;
}

export function ProductSearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  sort,
  onSortChange,
  categories,
  resultCount,
  onClear,
  isFiltered,
}: ProductSearchFiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Category Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (৳)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              placeholder="Min"
              min="0"
              value={minPrice || ""}
              onChange={(e) =>
                onPriceChange(
                  e.target.value ? parseInt(e.target.value) : 0,
                  maxPrice
                )
              }
              className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            />
            <span className="self-center text-gray-400 hidden sm:inline">
              -
            </span>
            <input
              type="number"
              placeholder="Max"
              min="0"
              value={maxPrice === 10000 ? "" : maxPrice || ""}
              onChange={(e) =>
                onPriceChange(
                  minPrice,
                  e.target.value ? parseInt(e.target.value) : 10000
                )
              }
              className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Sort */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Results & Clear */}
        <div className="flex items-end">
          <div className="flex gap-2">
            <div className="flex items-center px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                {resultCount} results
              </span>
            </div>
            {isFiltered && (
              <Button
                onClick={onClear}
                variant="outline"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
