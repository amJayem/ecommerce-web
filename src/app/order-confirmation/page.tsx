"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderById } from "@/lib/api/order";
import { Order } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  Truck,
  CheckCircle,
  ShoppingBag,
  Download,
  Eye,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  ArrowLeft,
  Calendar,
  MapPin,
  ClipboardList,
} from "lucide-react";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";
import toast from "react-hot-toast";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    } else {
      setLoading(false);
    }
  }, [orderId]);

  const fetchOrderDetails = async (id: string) => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      toast.error("Failed to load order details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!order && !loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-gray-50 rounded-2xl p-8 border border-dashed border-gray-300">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the order details you're looking for. It might be
            still processing or the link is incorrect.
          </p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8">
              Back to Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusSteps = [
    {
      label: "Order Confirmed",
      icon: CheckCircle2,
      status: "PENDING",
      active: true,
    },
    {
      label: "Being Prepared",
      icon: Package,
      status: "PREPARING",
      active: ["PREPARING", "SHIPPED", "DELIVERED"].includes(
        order?.status || ""
      ),
    },
    {
      label: "Out for Delivery",
      icon: Truck,
      status: "SHIPPED",
      active: ["SHIPPED", "DELIVERED"].includes(order?.status || ""),
    },
    {
      label: "Delivered",
      icon: CheckCircle,
      status: "DELIVERED",
      active: order?.status === "DELIVERED",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your purchase. Your order{" "}
            <span className="font-semibold text-gray-900">#{order?.id}</span>{" "}
            has been received.
          </p>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-block text-sm border border-green-100">
            A confirmation email has been sent to{" "}
            <span className="font-semibold">customer@example.com</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white min-w-[160px]">
              Continue Shopping
            </Button>
          </Link>
          <Link href={`/account/orders/${order?.id}`}>
            <Button
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 min-w-[160px]"
            >
              Track My Order
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-gray-300 hover:bg-gray-50 min-w-[160px]"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Link href={`/account/orders/${order?.id}`}>
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-green-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Full Details
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Tracker */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-8 flex items-center">
                <ClipboardList className="w-5 h-5 mr-2 text-green-600" />
                Order Progress
              </h2>
              <div className="relative">
                {/* Connector Line */}
                <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 hidden md:block"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8 md:gap-0">
                  {statusSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className="flex md:flex-col items-center gap-4 md:gap-3 flex-1"
                    >
                      <div
                        className={`
                        w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-300
                        ${
                          step.active
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }
                      `}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="text-left md:text-center">
                        <p
                          className={`text-sm font-bold ${
                            step.active ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.active && (
                          <p className="text-xs text-green-600 md:hidden lg:block">
                            {index === 0 ? "Completed" : "In Progress"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Details & Address */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                    Order Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Order Number</span>
                      <span className="font-semibold text-gray-900">
                        #{order?.id}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 opacity-70" /> Order
                        Date
                      </span>
                      <span>
                        {order
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Truck className="w-4 h-4 mr-1.5 opacity-70" />{" "}
                        Estimated Delivery
                      </span>
                      <span className="text-green-600 font-medium">
                        Jan 14 - Jan 16, 2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 border-b pb-2">
                    Delivery Address
                  </h3>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                    <div className="space-y-1">
                      <p className="font-bold text-gray-900">Jane Doe</p>
                      <p>123 Greenway Road, Phase 2</p>
                      <p>Uttara, Dhaka - 1230</p>
                      <p>Phone: +880 123456789</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Benefits (for non-logged in users) */}
            {!order?.userId && (
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">
                    Want to track your orders easily?
                  </h3>
                  <p className="text-sm text-green-50 opacity-90 mb-4 max-w-md">
                    Create an account to track all your orders in one place,
                    save your addresses, and get exclusive offers.
                  </p>
                  <Button className="bg-white text-green-700 hover:bg-gray-100 border-none font-bold">
                    Create an Account
                  </Button>
                </div>
                <ShoppingBag className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-10 rotate-12" />
              </div>
            )}
          </div>

          {/* Sidebar Area: Summary & Support */}
          <div className="space-y-8">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
              <div className="p-5 border-b bg-gray-50/50">
                <h3 className="font-bold text-gray-900">Order Summary</h3>
              </div>
              <div className="p-5 space-y-4 text-sm">
                <div className="max-h-60 overflow-y-auto pr-2 space-y-4">
                  {/* Mock Itemized List - in real app would use order.items */}
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          Organic Gala Apples
                        </p>
                        <p className="text-gray-500 text-xs">
                          Qty: 2 &bull; ৳ 120.00
                        </p>
                      </div>
                      <p className="font-bold text-gray-900">৳ 240.00</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳ 480.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>৳ 50.00</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>৳ 12.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-green-700">
                    <span>Total</span>
                    <span>৳ 542.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Section */}
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
              <h3 className="font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                Need Help?
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Our support team is available 24/7 to assist you with any
                questions about your order.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+880123456789"
                  className="flex items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 group-hover:bg-green-100">
                    <Phone className="w-4 h-4 text-green-600 text-xs" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">
                      Call Us
                    </p>
                    <p className="font-bold text-gray-700">+880 123456789</p>
                  </div>
                </a>
                <a
                  href="mailto:support@groceryfresh.com"
                  className="flex items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 group-hover:bg-green-100">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">
                      Email Us
                    </p>
                    <p className="font-bold text-gray-700">
                      support@groceryfresh.com
                    </p>
                  </div>
                </a>
                <button className="w-full flex items-center p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3 group-hover:bg-green-100">
                    <MessageSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-sm text-left">
                    <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">
                      Live Chat
                    </p>
                    <p className="font-bold text-gray-700">
                      Chat with an Expert
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Policies */}
            <div className="text-center space-y-2">
              <Link
                href="/returns"
                className="text-xs text-gray-400 hover:text-green-600 transition-colors flex items-center justify-center"
              >
                Returns & Refund Policy{" "}
                <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="pt-4 text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-medium text-green-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
