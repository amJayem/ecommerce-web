// Types for order submission and order items, matching backend DTO and model

// Used for submitting a new order
export interface CreateOrderItem {
  productId: number; // Product ID
  quantity: number; // Quantity ordered
  price: number; // Price per item at time of order
}

export interface CreateOrder {
  items: CreateOrderItem[]; // List of items in the order
  // Pricing summary
  subtotal: number;
  shipping?: number;
  discount?: number;
  tax?: number;
  totalAmount: number;
  // Customer and delivery
  fullName?: string;
  phone?: string;
  shippingAddress?: string;
  billingAddress?: string;
  deliveryInstructions?: string;
  estimatedDelivery?: string; // ISO date string
  paymentMethod?: string; // e.g., 'COD' | 'ONLINE'
  status?: string; // Optional order status (default: 'pending')
}

// Used for displaying order data (if needed)
export interface Order {
  id: number;
  userId?: number | null;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}
