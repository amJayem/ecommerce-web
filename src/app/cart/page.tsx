"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getSafeImageSrc } from "@/lib/utils";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <p className="text-gray-600">
          You have {items.length} item
          {items.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>
      {items.length === 0 ? (
        <div className="max-w-4xl mx-auto py-12 px-4 text-center bg-gray-50 rounded-xl border">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add some products to get started!
          </p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Continue Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl p-4 flex items-center gap-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20 relative flex-shrink-0">
                  <Image
                    src={getSafeImageSrc(item.coverImage || item.imageUrl)}
                    alt={item.name}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-green-600 font-bold text-lg">
                      ৳{item.price.toFixed(2)}
                    </p>
                    <span className="text-gray-500 text-sm">per unit</span>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Total: ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-3 py-1 border rounded min-w-[3rem] text-center font-medium">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            {/* Clear Cart Button */}
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => dispatch(clearCart())}
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-xl p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span>৳{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>৳{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => router.push("/checkout")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold rounded-lg"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 text-center">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
