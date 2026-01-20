// API functions for order submission (customer only)
// Only customer order creation is allowed here. Admin endpoints are handled in the dashboard app.
import {
  CreateOrder,
  Order,
  OrderPlacementResponse,
  ThankYouSummary,
} from "@/types/order";
import { post, get } from "./client";

// Submit a new order (customer checkout)
export const submitOrder = (order: CreateOrder) =>
  post<OrderPlacementResponse>("/orders", order);

// Fetch a single order by ID (Internal use/Authenticated)
export const getOrderById = (id: string) => get<Order>(`/orders/${id}`);

// Fetch thank you page summary using order number and token (Public/Secure)
export const getThankYouSummary = (orderNumber: string, token: string) =>
  get<ThankYouSummary>(
    `/orders/thank-you?orderNumber=${orderNumber}&token=${token}`
  );

// Fetch user's orders (Authenticated)
export const getUserOrders = (params?: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.status) queryParams.append("status", params.status);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const queryString = queryParams.toString();
  return get<{ orders: Order[]; pagination: any }>(
    `/orders/my-orders${queryString ? `?${queryString}` : ""}`
  );
};
