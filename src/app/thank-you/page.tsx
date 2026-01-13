"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getThankYouSummary } from "@/lib/api/order";
import { ThankYouSummary } from "@/types/order";
import { Button } from "@/components/ui/button";
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
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";
import toast from "react-hot-toast";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const token = searchParams.get("token");
  const [summary, setSummary] = useState<ThankYouSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber && token) {
      fetchSummary(orderNumber, token);
    } else {
      setLoading(false);
    }
  }, [orderNumber, token]);

  const fetchSummary = async (num: string, tok: string) => {
    try {
      setLoading(true);
      const data = await getThankYouSummary(num, tok);
      setSummary(data);
    } catch (error) {
      console.error("Error fetching order summary:", error);
      toast.error("Failed to load order summary.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Preparing your order summary...
        </p>
      </div>
    );
  }

  if (!summary && !loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Unable to Load Summary
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            We couldn&apos;t retrieve the details for this order. This might
            happen if the session expired or the link is invalid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 h-11 rounded-xl font-medium transition-all hover:scale-105">
                Go to Shop
              </Button>
            </Link>
            <Link href="/account/orders">
              <Button
                variant="outline"
                className="px-8 h-11 rounded-xl border-gray-200 font-medium hover:bg-gray-50"
              >
                View My Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusSteps = [
    { label: "Confirmed", icon: CheckCircle2, active: true },
    {
      label: "Preparing",
      icon: Package,
      active: ["PREPARING", "SHIPPED", "DELIVERED"].includes(
        summary?.status || ""
      ),
    },
    {
      label: "On the way",
      icon: Truck,
      active: ["SHIPPED", "DELIVERED"].includes(summary?.status || ""),
    },
    {
      label: "Delivered",
      icon: CheckCircle,
      active: summary?.status === "DELIVERED",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Confetti-like Success Header */}
        <div className="text-center space-y-4 relative py-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-2 shadow-inner relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-green-100 opacity-20"></div>
            <CheckCircle2 className="w-10 h-10 text-green-600 relative z-10" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
            Your order{" "}
            <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">
              #{summary?.orderNumber}
            </span>{" "}
            is being processed with extra care.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-700 bg-white border border-green-100 py-2 px-4 rounded-full shadow-sm inline-flex">
            <Mail className="w-4 h-4" />
            <span>Confirmation sent to your email</span>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <Link href="/products" className="flex-1 min-w-[200px] sm:max-w-xs">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-11 rounded-xl font-medium shadow-lg shadow-green-100 transition-all hover:-translate-y-1">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Button
            variant="outline"
            className="flex-1 min-w-[200px] sm:max-w-xs h-11 rounded-xl border-gray-200 font-medium hover:bg-gray-50 transition-all"
          >
            <Download className="w-5 h-5 mr-2 text-blue-500" />
            Download Invoice
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visual Tracker Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden relative">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-green-600" />
                  </div>
                  Order Tracking
                </h2>
                <span className="text-xs font-bold uppercase tracking-widest text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                  Live Status
                </span>
              </div>

              <div className="relative pt-2 pb-6">
                {/* Horizontal Line (Desktop) */}
                <div className="absolute top-7 left-10 right-10 h-1 bg-gray-100 hidden md:block rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{
                      width: `${
                        (statusSteps.filter((s) => s.active).length - 1) * 33.33
                      }%`,
                    }}
                  ></div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative gap-8 md:gap-0">
                  {statusSteps.map((step, index) => (
                    <div
                      key={step.label}
                      className="flex md:flex-col items-center gap-5 md:gap-3 flex-1 w-full md:w-auto"
                    >
                      <div
                        className={`
                        w-14 h-14 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 shadow-sm
                        ${
                          step.active
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-400"
                        }
                      `}
                      >
                        <step.icon
                          className={`w-6 h-6 ${
                            step.active ? "animate-pulse" : ""
                          }`}
                        />
                      </div>
                      <div className="text-left md:text-center space-y-1">
                        <p
                          className={`text-sm font-bold tracking-tight ${
                            step.active ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step.label}
                        </p>
                        {step.active && (
                          <p className="text-[10px] font-bold text-green-600 uppercase tracking-tight">
                            {index === 0 ? "Processed" : "Pending Updates"}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logistics Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">
                  Estimated Arrival
                </h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">
                      Jan 14 – 16, 2026
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      Standard Delivery window
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-4">
                  Delivery To
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-gray-900 mb-1">
                      {summary?.shippingAddressText.split(",")[0]}
                    </p>
                    <p className="text-gray-600 leading-snug line-clamp-2">
                      {summary?.shippingAddressText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Promo / Account Benefits */}
            <div className="bg-green-600 rounded-2xl p-8 text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold leading-tight">
                    Experience better tracking.
                  </h3>
                  <p className="text-green-50 font-medium max-w-sm opacity-90">
                    Create an account now to get instant delivery updates,
                    manage addresses, and earn points on every order.
                  </p>
                </div>
                <Link href="/account/register">
                  <Button className="bg-white text-green-700 hover:bg-green-50 h-12 px-8 rounded-xl font-bold border-none transition-all shadow-md group-hover:px-10">
                    Sign Up Effortlessly
                  </Button>
                </Link>
              </div>
              <ShoppingBag className="absolute -right-8 -bottom-8 w-64 h-64 text-white opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
            </div>

            {/* Dedicated Support Card - Moved to main column */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-lg">
                  Need Assistance?
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Our care team is ready to help with your delivery or item
                  concerns.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href="tel:+880123456789"
                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-green-600 hover:text-white transition-all group border border-transparent hover:border-green-600"
                >
                  <Phone className="w-4 h-4 mr-3 text-green-600 group-hover:text-white" />
                  <span className="text-sm font-bold">+880 1234 5678</span>
                </a>
                <a
                  href="mailto:support@groceryfresh.com"
                  className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-green-600 hover:text-white transition-all group border border-transparent hover:border-green-600"
                >
                  <Mail className="w-4 h-4 mr-3 text-green-600 group-hover:text-white" />
                  <span className="text-sm font-bold">Email Support</span>
                </a>
                <button className="w-full flex items-center p-3 rounded-xl bg-gray-50 hover:bg-green-600 hover:text-white transition-all group border border-transparent hover:border-green-600">
                  <MessageSquare className="w-4 h-4 mr-3 text-green-600 group-hover:text-white" />
                  <span className="text-sm font-bold">Live Concierge</span>
                </button>
              </div>

              <div className="pt-2">
                <Link
                  href="/returns"
                  className="text-xs font-bold text-gray-400 hover:text-green-600 transition-colors flex items-center uppercase tracking-wider"
                >
                  Returns & Policy <ChevronRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Area: Receipt & Help */}
          <div className="space-y-8">
            {/* Receipt Summary Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden sticky top-24 z-20">
              <div className="p-5 bg-gray-50 border-b flex justify-between items-center">
                <h3 className="font-bold text-gray-900">Your Receipt</h3>
                <span className="text-[10px] font-bold bg-white px-2 py-1 rounded border border-gray-200 text-gray-500">
                  #THANKYOU
                </span>
              </div>
              <div className="p-5 space-y-6">
                <div className="space-y-4 max-h-[25rem] overflow-y-auto pr-2 custom-scrollbar">
                  {summary?.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg shrink-0 overflow-hidden border border-gray-100 relative">
                        <Image
                          src={getSafeImageSrc(item.coverImage)}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.productName}
                        </p>
                        <p className="text-gray-500 text-xs flex items-center mt-0.5">
                          Qty: {item.quantity} ·{" "}
                          <span className="ml-1">
                            ৳ {item.price.toFixed(2)}
                          </span>
                        </p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm flex items-center">
                        ৳ {item.total.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">
                      ৳ {summary?.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      ৳ {summary?.shippingCost.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax Estimate</span>
                    <span className="font-medium">
                      ৳ {summary?.tax.toFixed(2)}
                    </span>
                  </div>
                  {summary?.discount && summary.discount > 0 && (
                    <div className="flex justify-between text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                      <span>Discount</span>
                      <span>- ৳ {summary.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-100 my-2"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-xl font-bold text-green-700 leading-none">
                      ৳ {summary?.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link href="/account/orders" className="block pt-2">
                  <Button
                    variant="ghost"
                    className="w-full text-xs font-bold text-gray-500 hover:text-green-700 hover:bg-green-50 rounded-xl h-9 transition-all uppercase tracking-wider"
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    View My Order History
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 text-center pb-12">
          <Link
            href="/products"
            className="group inline-flex items-center text-sm font-bold text-gray-500 hover:text-green-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
          <p className="text-green-700 font-bold text-sm tracking-wide">
            SECURING ORDER DETAILS...
          </p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
