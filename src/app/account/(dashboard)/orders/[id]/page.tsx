"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOrderById } from "@/lib/api/order";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Loader2,
  Package,
  MapPin,
  CreditCard,
  Calendar,
  Truck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  SHIPPED: "bg-purple-100 text-purple-800 border-purple-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-200",
};

const STATUS_STEPS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load order details");
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

  if (error || !order) {
    return (
      <div className="space-y-6">
        <Link href="/account/orders">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Button>
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
          <p className="text-red-600 font-medium">
            {error || "Order not found"}
          </p>
          <Button onClick={fetchOrder} variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/account/orders">
            <Button variant="ghost" className="gap-2 mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Button>
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-2xl font-black text-gray-900">
              Order #{order.id}
            </h2>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-bold border",
                STATUS_COLORS[order.status as keyof typeof STATUS_COLORS] ||
                  "bg-gray-100 text-gray-800 border-gray-200"
              )}
            >
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Order Timeline */}
      {order.status !== "CANCELLED" && (
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
          <h3 className="text-lg font-bold mb-6">Order Timeline</h3>
          <div className="flex items-center justify-between">
            {STATUS_STEPS.map((step, index) => (
              <div key={step} className="flex-1 flex items-center">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                      index <= currentStepIndex
                        ? "bg-green-600 border-green-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    )}
                  >
                    {index < currentStepIndex ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : index === 0 ? (
                      <Package className="w-5 h-5" />
                    ) : index === 1 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : index === 2 ? (
                      <Truck className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs font-medium mt-2 text-center",
                      index <= currentStepIndex
                        ? "text-gray-900"
                        : "text-gray-400"
                    )}
                  >
                    {step}
                  </p>
                </div>
                {index < STATUS_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-2",
                      index < currentStepIndex ? "bg-green-600" : "bg-gray-300"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                >
                  {item.product?.coverImage && (
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={getSafeImageSrc(item.product.coverImage)}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">
                      {item.product?.name || `Product #${item.productId}`}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: {item.quantity} × ৳{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      ৳{item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold">Shipping Address</h3>
            </div>
            {order.shippingAddress ? (
              <div className="text-gray-700">
                <p className="font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p className="text-sm mt-1">{order.shippingAddress.street}</p>
                <p className="text-sm">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zipCode}
                </p>
                <p className="text-sm">{order.shippingAddress.country}</p>
                <p className="text-sm mt-2">
                  Phone: {order.shippingAddress.phone}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">{order.shippingAddressText}</p>
            )}
            {order.deliveryNote && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium text-gray-700">
                  Delivery Note:
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {order.deliveryNote}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  ৳{order.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ৳{order.shippingCost.toFixed(2)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    -৳{order.discount.toFixed(2)}
                  </span>
                </div>
              )}
              {order.tax > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">৳{order.tax.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-green-600">
                  ৳{order.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold">Payment Information</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span
                  className={cn(
                    "font-medium",
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-yellow-600"
                  )}
                >
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          {order.estimatedDelivery && (
            <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold">Delivery Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated</span>
                  <span className="font-medium">
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </span>
                </div>
                {order.actualDelivery && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivered</span>
                    <span className="font-medium text-green-600">
                      {new Date(order.actualDelivery).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
