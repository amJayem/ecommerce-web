// app/checkout/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Link from "next/link";
import { clearCart } from "@/store/cartSlice";
import { submitOrder } from "@/lib/api/order";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handlePlaceOrder() {
    if (cartItems.length === 0) return;
    setLoading(true);
    try {
      // Prepare order payload
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      };
      // Call backend API to place order
      await submitOrder(orderPayload);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      router.push("/order-confirmation");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Items</h2>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <div className="w-16 h-16 relative">
                <Image
                  src={getSafeImageSrc(item.coverImage || item.imageUrl)}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="font-semibold">
                ৳ {item.price * item.quantity}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold text-green-700">
          Total: ৳ {total}
        </div>
      </div>

      {/* Address and Payment */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input placeholder="Full Name" required />
          <Input placeholder="Phone Number" required />
          <Input
            placeholder="Address Line 1"
            required
            className="md:col-span-2"
          />
          <Input placeholder="City" required />
          <Input placeholder="Postal Code" required />
        </form>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Payment</h2>
        <p className="text-gray-700">
          You will pay via <strong>Cash on Delivery</strong>
        </p>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <Button
          onClick={handlePlaceOrder}
          className="w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
