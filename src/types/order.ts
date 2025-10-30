// Types for order submission and order items, matching backend DTO and model

// Used for submitting a new order
export interface CreateOrderItem {
  productId: number; // Product ID
  quantity: number; // Quantity ordered
  price: number; // Price per item at time of order
}

export interface OrderAddress {
  name: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  note?: string;
}

// Used for submitting a new order
export interface CreateOrder {
  // Optionally add userId for logged-in user checkout
  userId?: number;
  items: CreateOrderItem[];
  subtotal: number;
  shippingCost?: number;
  discount?: number;
  tax?: number;
  totalAmount: number;
  shippingAddress: OrderAddress;
  shippingAddressText?: string;
  billingAddress: Omit<OrderAddress, "note">;
  paymentMethod: string;
  paymentStatus?: string;
  status?: string;
  deliveryNote?: string;
  estimatedDelivery?: string;
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
