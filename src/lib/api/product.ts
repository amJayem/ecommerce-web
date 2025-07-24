// Only read-only product APIs are exposed here for customers. Admin actions are handled in the dashboard app.
import { Product } from '@/types/product';
import { get } from './client';

// Fetch all products from the backend
export const fetchAllProducts = () => get<Product[]>("/products");

// Fetch suggested products (currently same as all products)
export const fetchSuggestedProducts = () => get<Product[]>("/products");

// Fetch a single product by ID
export const fetchProductById = (id: number) => get<Product>(`/products/${id}`);
