// Centralized API helper functions for the e-commerce app
// This file provides server-side and client-side functions to interact with the backend APIs

import { Product } from "@/types/product";
import api from "./api/axios";

// Category interface to match backend structure
export interface Category {
  id: string;
  name: string;
  slug?: string; // URL-friendly identifier
  icon?: string; // Can be emoji (🌾) or Lucide icon name (Apple)
  productCount?: number;
  metaTitle?: string;
  metaDescription?: string;
}

// API Response wrapper for pagination and metadata
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * Fetch all products from the backend
 * GET /api/products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await api.get("/products");
    // Handle different response formats - your API returns { products: [...], pagination: {...} }
    const data =
      response.data?.products || response.data?.data || response.data || [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

/**
 * Fetch products by category ID or slug
 * GET /api/products?categoryId={categoryId} or GET /api/products?categorySlug={slug}
 */
export async function getProductsByCategory(
  categoryParam: string
): Promise<Product[]> {
  try {
    // Try to determine if it's an ID (numeric) or slug (string)
    const isNumeric = /^\d+$/.test(categoryParam);
    // URL encode the category param to handle special characters
    const encodedParam = encodeURIComponent(categoryParam);
    const endpoint = isNumeric
      ? `/products?categoryId=${encodedParam}`
      : `/products?categorySlug=${encodedParam}`;

    const response = await api.get(endpoint);

    // Handle different response formats - your API might return:
    // - { products: [...], pagination: {...} }
    // - { data: [...] }
    // - [...] (direct array)
    let data = response.data?.products || response.data?.data || response.data;

    // If data is not an array, try to extract from nested structure
    if (!Array.isArray(data) && data) {
      // Try common nested structures
      if (data.items && Array.isArray(data.items)) {
        data = data.items;
      } else if (data.results && Array.isArray(data.results)) {
        data = data.results;
      } else {
        // Log for debugging in production
        if (process.env.NODE_ENV === "production") {
          console.warn(
            `[getProductsByCategory] Unexpected response format for category ${categoryParam}:`,
            {
              type: typeof data,
              keys: data && typeof data === "object" ? Object.keys(data) : null,
              firstLevel:
                typeof data === "object" && data !== null
                  ? JSON.stringify(data).substring(0, 200)
                  : data,
            }
          );
        }
        data = [];
      }
    }

    const products = Array.isArray(data) ? data : [];

    // Log for debugging in production
    if (process.env.NODE_ENV === "production") {
      console.log(
        `[getProductsByCategory] Category: ${categoryParam}, Products found: ${products.length}`
      );
    }

    return products;
  } catch (error) {
    console.error(
      `Error fetching products for category ${categoryParam}:`,
      error
    );
    // In production, log more details
    if (process.env.NODE_ENV === "production" && error instanceof Error) {
      console.error(`[getProductsByCategory] Error details:`, {
        message: error.message,
        categoryParam,
        stack: error.stack,
      });
    }
    throw new Error(`Failed to fetch products for category ${categoryParam}`);
  }
}

/**
 * Fetch a single product by ID
 * GET /api/products/{id}
 */
export async function getProductById(id: string): Promise<Product> {
  try {
    const response = await api.get(`/products/${id}`);
    // Handle different response formats - your API might return { product: {...} } or just the product
    const data = response.data?.product || response.data?.data || response.data;
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product ${id}`);
  }
}

/**
 * Fetch all categories from the backend
 * GET /api/categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get("/categories");
    // Handle different response formats - your API returns an array directly
    const data = response.data?.data || response.data || [];

    if (Array.isArray(data)) {
      // Transform your API response to match the expected Category interface
      return data.map((category: unknown) => {
        const cat = category as {
          id: number;
          name: string;
          slug?: string;
          icon?: string;
          _count?: { products: number };
          metaTitle?: string;
          metaDescription?: string;
        };
        return {
          id: cat.id.toString(), // Convert number to string
          name: cat.name,
          slug: cat.slug, // Include slug for URL routing
          icon: cat.icon || "Package", // Use emoji icon or fallback
          productCount: cat._count?.products || 0, // Get product count from _count
          metaTitle: cat.metaTitle,
          metaDescription: cat.metaDescription,
        };
      });
    }

    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return fallback categories if API fails
    console.log("Using fallback categories due to API error");
    return [
      { id: "fruits", name: "Fruits", icon: "Apple", productCount: 0 },
      { id: "vegetables", name: "Vegetables", icon: "Carrot", productCount: 0 },
      { id: "meat", name: "Meat", icon: "Drumstick", productCount: 0 },
      { id: "fish", name: "Fish", icon: "Fish", productCount: 0 },
      { id: "bakery", name: "Bakery", icon: "Croissant", productCount: 0 },
      { id: "dairy", name: "Dairy & Eggs", icon: "Cheese", productCount: 0 },
      {
        id: "spices",
        name: "Spices & Condiments",
        icon: "Flame",
        productCount: 0,
      },
      {
        id: "grains",
        name: "Rice, Lentils & Staples",
        icon: "Wheat",
        productCount: 0,
      },
      { id: "oils", name: "Cooking Oils & Ghee", icon: "Oil", productCount: 0 },
      {
        id: "snacks",
        name: "Snacks & Beverages",
        icon: "Cookie",
        productCount: 0,
      },
      {
        id: "household",
        name: "Household Essentials",
        icon: "Home",
        productCount: 0,
      },
    ];
  }
}

/**
 * Server-side function to fetch products with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchProductsSSR(): Promise<Product[]> {
  try {
    return await getProducts();
  } catch (error) {
    console.error("SSR: Error fetching products:", error);
    // Return empty array as fallback for SSR
    return [];
  }
}

/**
 * Server-side function to fetch products by category with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchProductsByCategorySSR(
  categoryParam: string
): Promise<Product[]> {
  try {
    return await getProductsByCategory(categoryParam);
  } catch (error) {
    console.error(
      `SSR: Error fetching products for category ${categoryParam}:`,
      error
    );
    // Return empty array as fallback for SSR
    return [];
  }
}

/**
 * Server-side function to fetch a single product with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchProductByIdSSR(id: string): Promise<Product | null> {
  try {
    return await getProductById(id);
  } catch (error) {
    console.error(`SSR: Error fetching product ${id}:`, error);
    // Return null as fallback for SSR
    return null;
  }
}

/**
 * Server-side function to fetch categories with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchCategoriesSSR(): Promise<Category[]> {
  try {
    return await getCategories();
  } catch (error) {
    console.error("SSR: Error fetching categories:", error);
    // Return empty array as fallback for SSR
    return [];
  }
}

/**
 * Server-side function to fetch featured products with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchFeaturedProductsSSR(): Promise<Product[]> {
  try {
    return await getFeaturedProducts();
  } catch (error) {
    console.error("SSR: Error fetching featured products:", error);
    // Return empty array as fallback for SSR
    return [];
  }
}

/**
 * Server-side function to fetch bestseller products with error handling
 * Use this in server components and getServerSideProps
 */
export async function fetchBestsellerProductsSSR(): Promise<Product[]> {
  try {
    return await getBestsellerProducts();
  } catch (error) {
    console.error("SSR: Error fetching bestseller products:", error);
    // Return empty array as fallback for SSR
    return [];
  }
}

/**
 * Helper function to get featured products (products marked as featured)
 * This filters products on the client side based on the isFeatured flag
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    if (!Array.isArray(products)) {
      console.warn("Products is not an array:", products);
      return [];
    }
    return products.filter((product) => product.featured);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return []; // Return empty array instead of throwing
  }
}

/**
 * Helper function to get bestseller products
 * This could be enhanced to use a dedicated API endpoint in the future
 */
export async function getBestsellerProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    if (!Array.isArray(products)) {
      console.warn("Products is not an array:", products);
      return [];
    }
    // For now, return products with high ratings as bestsellers
    return products.filter((product) => product.bestseller).slice(0, 8); // Limit to 8 bestsellers
  } catch (error) {
    console.error("Error fetching bestseller products:", error);
    return []; // Return empty array instead of throwing
  }
}

/**
 * Helper function to get new arrival products
 */
export async function getNewArrivalProducts(): Promise<Product[]> {
  try {
    const products = await getProducts();
    if (!Array.isArray(products)) {
      console.warn("Products is not an array:", products);
      return [];
    }
    return products.filter((product) => product.isNewArrival);
  } catch (error) {
    console.error("Error fetching new arrival products:", error);
    return []; // Return empty array instead of throwing
  }
}
