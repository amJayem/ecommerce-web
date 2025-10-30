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
import { useMemo, useState } from "react";
import Image from "next/image";
import { getSafeImageSrc } from "@/lib/utils";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function CheckoutPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const deliveryCost = 50;
  const discount = 0;
  const tax = 0;
  const totalAmount = subtotal + deliveryCost - discount + tax;

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [instructions, setInstructions] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">("COD");

  // Derived validation state for shipping address
  const isShippingValid =
    fullName.trim().length > 0 &&
    phone.trim().length > 0 &&
    address1.trim().length > 0 &&
    city.trim().length > 0 &&
    postalCode.trim().length > 0;

  async function handlePlaceOrder() {
    if (cartItems.length === 0) return;
    if (!isShippingValid) {
      toast.error("Please fill in all required shipping details.");
      return;
    }
    setLoading(true);
    try {
      // Prepare nested address objects
      const shippingAddress = {
        name: fullName,
        phone,
        address1,
        address2: address2 || undefined,
        city,
        postalCode,
        note: instructions || undefined,
      };
      const billingAddress = {
        name: fullName,
        phone,
        address1,
        address2: address2 || undefined,
        city,
        postalCode,
      };
      const shippingAddressText = [
        fullName,
        address1,
        address2?.trim(),
        `${city} ${postalCode}`.trim(),
      ]
        .filter(Boolean)
        .join(", ");
      // Prepare order payload in new format
      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        shippingAddressText,
        billingAddress,
        paymentMethod,
        paymentStatus: "PENDING",
        status: "PENDING",
        deliveryNote: instructions || undefined,
        estimatedDelivery: deliveryDate
          ? new Date(deliveryDate).toISOString()
          : undefined,
        subtotal,
        tax,
        shippingCost: deliveryCost,
        discount,
        totalAmount,
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="text-gray-600">
          You have {cartItems.length} item
          {cartItems.length !== 1 ? "s" : ""} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 border">
              <ShoppingCart className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven’t added anything yet. Start shopping to fill
              your cart.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" className="px-6">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                📦 Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Input
                  placeholder="Address Line 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                  className="md:col-span-2"
                />
                <Input
                  placeholder="Address Line 2 (optional)"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="md:col-span-2"
                />
                <Input
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
                <Input
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
                <Input
                  placeholder="Delivery instructions (optional)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="md:col-span-2"
                />
              </div>
            </div>

            {/* Delivery Date */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">
                📅 Expected Delivery
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-700">
                    Preferred date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
                <div className="text-sm text-gray-600">
                  {deliveryDate ? (
                    <>Expected: {deliveryDate}</>
                  ) : (
                    <>Standard delivery in 2–3 days</>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">💳 Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("COD")}
                  className={`rounded-xl border p-4 text-left ${
                    paymentMethod === "COD"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-600">
                    Pay when you receive your order.
                  </div>
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-xl border p-4 text-left border-gray-200 opacity-60 cursor-not-allowed"
                >
                  <div className="font-medium">Online Payment</div>
                  <div className="text-sm text-gray-600">
                    Secure online payment (coming soon).
                  </div>
                </button>
              </div>
            </div>

            {/* Terms Note */}
            <p className="text-xs text-gray-500">
              By placing your order, you agree to our terms and return policy.
            </p>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-20">
              <h2 className="text-lg font-semibold mb-4">🧾 Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>৳ {deliveryCost.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-৳ {discount.toFixed(2)}</span>
                  </div>
                )}
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>৳ {tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold text-green-700">
                  <span>Total</span>
                  <span>৳ {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  disabled={loading || !isShippingValid}
                >
                  {loading ? "Placing Order..." : "🛍️ Place Order"}
                </Button>
              </div>

              {/* Cart items mini list */}
              <div className="mt-6 border-t pt-4 space-y-3 max-h-64 overflow-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-md overflow-hidden">
                      <Image
                        src={getSafeImageSrc(item.coverImage || item.imageUrl)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium line-clamp-1">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        ৳{item.price.toFixed(2)} × {item.quantity}
                      </div>
                    </div>
                    <div className="text-sm font-semibold">
                      ৳ {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Link href="/cart">
                  <Button
                    variant="outline"
                    className="w-full text-green-700 border-green-500 hover:bg-green-600 hover:text-white"
                  >
                    Edit Cart
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
