// Product type updated to match backend model
export interface Product {
  metaDescription: string | undefined;
  metaTitle: string;
  id: number; // Unique product ID
  name: string; // Product name
  slug: string; // SEO-friendly URL slug (e.g., "organic-honey-500g")

  description: string; // Detailed product description
  shortDescription?: string; // Short description for listing/preview

  price: number; // Current selling price
  oldPrice?: number; // Previous price (for discounts)
  discount?: number; // Discount percentage (if applicable)

  imageUrl: string; // Primary product image
  coverImage?: string; // Cover/banner image for product detail page
  gallery?: string[]; // Multiple product images

  categoryId: number;
  category: string | { id: number; name: string; slug: string; icon: string }; // Product category (string or object)
  subCategory?: string; // Sub-category (optional)

  brand?: string; // Brand name (if applicable)
  weight?: number; // Product weight (in grams, kg, ml, etc.)
  unit?: string; // Unit type ("kg", "g", "ml", "L", "pcs")

  stock: number; // Current stock quantity
  sku?: string; // Stock Keeping Unit (unique code for inventory)
  isFeatured?: boolean; // Highlight product on homepage or special section
  featured?: boolean; // Highlight product on homepage or special section
  isNewArrival?: boolean; // Mark as new arrival
  bestseller?: boolean; // Mark as bestseller

  ratings?: number; // Average rating (1–5)
  reviewsCount?: number; // Number of reviews

  tags?: string[]; // For search optimization (e.g., ["organic", "honey", "natural"])

  createdAt: string; // Creation timestamp
  updatedAt: string; // Last update timestamp
}
