"use client";

import { useEffect, useState } from "react";
import { getUserOrders } from "@/lib/api/order";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PackageOpen,
  Loader2,
  Package,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getUserOrders({ page: 1, limit: 20 });
      setOrders(response.orders);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
        <p className="text-red-600 font-medium">{error}</p>
        <Button onClick={fetchOrders} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-12 md:p-20 text-center">
          <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No orders yet
          </h2>
          <p className="text-gray-500 max-w-xs mx-auto mb-8">
            Looks like you haven't placed any orders. Start shopping to see your
            history here!
          </p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 px-8">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Your Orders</h2>
          <p className="text-gray-500 font-medium">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Left: Order Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold border",
                      STATUS_COLORS[
                        order.status as keyof typeof STATUS_COLORS
                      ] || "bg-gray-100 text-gray-800 border-gray-200"
                    )}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span className="font-bold text-green-600">
                      ৳{order.total?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-xl font-bold border-2"
                  asChild
                >
                  <Link href={`/account/orders/${order.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
