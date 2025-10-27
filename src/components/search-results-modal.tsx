"use client";

import { Product } from "@/types/product";
import { getSafeImageSrc } from "@/lib/utils";
import { Search, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface SearchResultsModalProps {
  query: string;
  results: Product[];
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  selectedIndex: number;
  parentRef?: React.RefObject<HTMLDivElement>;
}

export function SearchResultsModal({
  query,
  results,
  isLoading,
  isOpen,
  onClose,
  selectedIndex,
  parentRef,
}: SearchResultsModalProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        parentRef?.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, parentRef]);

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
    onClose();
  };

  const handleKeyNavigation = (product: Product) => {
    handleProductClick(product);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-14 left-1/2 -translate-x-1/2 bg-white rounded-xl 
      shadow-2xl border border-gray-200 max-h-[400px] overflow-hidden flex flex-col 
      z-50 animate-in fade-in slide-in-from-top-1 duration-200"
      style={{ width: "min(600px, 50vw)", minWidth: "350px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Search className="text-gray-400 h-4 w-4" />
          <span className="text-sm font-semibold text-gray-700">
            {isLoading ? "Searching..." : `${results.length} results`}
          </span>
        </div>
        {query && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            aria-label="Close search results"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="overflow-y-auto flex-1">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        )}

        {!isLoading && results.length === 0 && query.trim().length >= 2 && (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="text-gray-300 mb-3">
              <Search className="h-12 w-12" />
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              No products found
            </h3>
            <p className="text-xs text-gray-500 text-center">
              Try different keywords
            </p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="divide-y divide-gray-100">
            {results.map((product, index) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleKeyNavigation(product);
                  }
                }}
                className={`w-full p-3 hover:bg-gray-50 transition-colors text-left cursor-pointer ${
                  selectedIndex === index ? "bg-green-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Product Image */}
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={getSafeImageSrc(
                        product.coverImage || product.imageUrl
                      )}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-800 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-green-600 font-bold text-sm">
                        ৳{product.price}
                      </p>
                      {product.unit && (
                        <p className="text-xs text-gray-500">
                          per {product.unit}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {!isLoading && results.length > 0 && query && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => {
              router.push(`/products?q=${encodeURIComponent(query)}`);
              onClose();
            }}
            className="w-full text-center text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer"
          >
            View all {results.length} results →
          </button>
        </div>
      )}
    </div>
  );
}
