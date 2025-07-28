// Product API calls for the customer-facing app
// Best practice: Use a centralized axios instance (api) configured with the external backend URL.
// This ensures consistent base URL, headers, error handling, and credentials across all requests.
// Only read-only product APIs are exposed here for customers. Admin actions are handled in the dashboard app.

import { Product } from '@/types/product';
import api from './axios'; // Centralized axios instance

// Fetch all products from the backend
export const fetchAllProducts = async () => {
  // Returns an array of products from the external backend
  const res = await api.get<Product[]>("/products");
  return res.data;
};

// Fetch suggested products (currently same as all products)
export const fetchSuggestedProducts = async () => {
  // In a real app, this could hit a /products/suggested endpoint
  const res = await api.get<Product[]>("/products");
  return res.data;
};

// Fetch a single product by ID
export const fetchProductById = async (id: number) => {
  // Returns a single product by ID from the external backend
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

// All API calls use the centralized axios instance for consistency and maintainability.
// This approach makes it easy to add interceptors, handle errors, and update base URLs in one place.
