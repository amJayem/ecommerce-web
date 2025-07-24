// API functions for order submission (customer only)
// Only customer order creation is allowed here. Admin endpoints are handled in the dashboard app.
import { CreateOrder, Order } from '@/types/order';
import { post } from './client';

// Submit a new order (customer checkout)
export const submitOrder = (order: CreateOrder) =>
  post<Order>('/orders', order); // POST /orders (public) 