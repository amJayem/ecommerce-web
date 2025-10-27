import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api/axios";
import { Product } from "@/types/product";

interface SearchProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function useSearchProducts(query: string, debounceMs = 500) {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Fetch search results
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await api.get<SearchProductsResponse>(
        `/products/search?q=${encodeURIComponent(searchQuery)}&limit=8`
      );

      const products = response.data.data || [];
      setResults(products);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("Error searching products:", err);
      setError(error.response?.data?.message || "Failed to search products");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchProducts(debouncedQuery);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [debouncedQuery, searchProducts]);

  return {
    results,
    isLoading,
    error,
    hasResults: results.length > 0,
  };
}
