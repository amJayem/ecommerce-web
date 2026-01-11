// API functions for order submission (customer only)
// Only customer order creation is allowed here. Admin endpoints are handled in the dashboard app.
import { CreateOrder, Order } from "@/types/order";
import { post, get } from "./client";

// Submit a new order (customer checkout)
export const submitOrder = (order: CreateOrder) =>
  post<Order>("/orders", order); // POST /orders (public)

// Fetch a single order by ID
export const getOrderById = (id: string) => get<Order>(`/orders/${id}`);
