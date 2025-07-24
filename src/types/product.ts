// Product type updated to match backend model
export interface Product {
  id: number; // Product ID
  name: string; // Product name
  price: number; // Product price
  description?: string; // Product description
  imageUrl?: string; // Product image URL (optional)
  category?: string; // Product category (optional)
  stock?: number; // Product stock (optional)
  brand?: string; // Product brand (optional)
  discount?: number; // Product discount (optional)
  weight?: number; // Product weight (optional)
  isFeatured?: boolean; // Is product featured (optional)
  createdAt?: string; // Creation date (optional)
  updatedAt?: string; // Last update date (optional)
}
