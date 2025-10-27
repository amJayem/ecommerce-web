import { useState, useEffect, useCallback, useRef } from "react";
import api from "@/lib/api/axios";
import { Product } from "@/types/product";

export interface SearchMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  q?: string;
  page?: number;
  limit?: number;
  stock?: number;
}

export interface SearchResponse {
  data: Product[];
  meta: SearchMeta;
}

export function useProductSearch(filters: SearchFilters = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<SearchMeta>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Build query string from filters
  const buildQueryString = useCallback((filtersToUse: SearchFilters) => {
    const params = new URLSearchParams();

    if (filtersToUse.category) params.append("category", filtersToUse.category);
    if (filtersToUse.minPrice)
      params.append("minPrice", filtersToUse.minPrice.toString());
    if (filtersToUse.maxPrice)
      params.append("maxPrice", filtersToUse.maxPrice.toString());
    if (filtersToUse.sort) params.append("sort", filtersToUse.sort);
    if (filtersToUse.q) params.append("q", filtersToUse.q);
    if (filtersToUse.page) params.append("page", filtersToUse.page.toString());
    if (filtersToUse.limit)
      params.append("limit", filtersToUse.limit.toString());

    return params.toString();
  }, []);

  // Fetch products from API
  const fetchProducts = useCallback(
    async (resetProducts = false, customPage?: number) => {
      try {
        setIsLoading(true);
        setError(null);

        const filtersWithPage = customPage
          ? { ...filters, page: customPage }
          : filters;

        const queryString = buildQueryString(filtersWithPage);
        const response = await api.get<SearchResponse>(
          `/products/search?${queryString}`
        );

        const newProducts = response.data.data || [];
        const newMeta = response.data.meta || {
          total: 0,
          page: 1,
          limit: 12,
          totalPages: 1,
        };

        if (resetProducts) {
          setProducts(newProducts);
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
        }

        setMeta(newMeta);
        setHasMore(newMeta.page < newMeta.totalPages);
      } catch (err) {
        const error = err as { response?: { data?: { message?: string } } };
        console.error("Error fetching products:", err);
        setError(error.response?.data?.message || "Failed to fetch products");
        setProducts([]);
        setMeta({ total: 0, page: 1, limit: 12, totalPages: 1 });
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    },
    [filters, buildQueryString]
  );

  // Refetch products
  const refetch = useCallback(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  // Load more products (for pagination)
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && fetchProducts) {
      const nextPage = meta.page + 1;
      fetchProducts(false, nextPage);
    }
  }, [isLoading, hasMore, meta.page, fetchProducts]);

  // Track if this is the initial mount
  const isInitialMount = useRef(true);

  // Initial fetch and when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
    fetchProducts(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.q,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
  ]);

  return {
    products,
    meta,
    isLoading,
    error,
    hasMore,
    refetch,
    loadMore,
  };
}
