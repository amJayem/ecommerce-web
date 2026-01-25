"use client";

import { GuestCheckoutModal } from "@/components/GuestCheckoutModal";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { getSafeImageSrc } from "@/lib/utils";
import { RootState } from "@/store";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  toggleCart,
} from "@/store/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function CartDrawer() {
  const dispatch = useDispatch();
  const { isOpen, items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const currency = "৳";

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      // Logged-in users go directly to checkout
      dispatch(toggleCart());
      router.push("/checkout");
    } else {
      // Guest users see the modal first
      setShowGuestModal(true);
    }
  };

  const handleCloseGuestModal = () => {
    setShowGuestModal(false);
    dispatch(toggleCart()); // Close cart drawer when modal closes
  };

  const handleSignIn = () => {
    setShowGuestModal(false);
    dispatch(toggleCart());
    router.push("/account/login?from=/checkout");
  };

  const handleSignUp = () => {
    setShowGuestModal(false);
    dispatch(toggleCart());
    router.push("/account/register?from=/checkout");
  };

  const handleContinueAsGuest = () => {
    setShowGuestModal(false);
    dispatch(toggleCart());
    router.push("/checkout");
  };

  return (
    <Drawer open={isOpen} onOpenChange={() => dispatch(toggleCart())}>
      <DrawerContent className="w-full max-w-md ml-auto mr-0 h-full rounded-none">
        <DrawerHeader>
          <DrawerTitle className="text-xl">Your Cart</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">
            You have {items.length} item(s) in your cart.
          </DrawerDescription>
        </DrawerHeader>

        <Separator />

        <ScrollArea className="px-4 flex-1 overflow-y-auto h-[60vh]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item?.id}
                className="flex items-start justify-between gap-4 py-4 border-b"
              >
                <Image
                  src={getSafeImageSrc(item.coverImage || item.imageUrl)}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-base">{item?.name}</h4>
                  <p className="text-sm text-gray-500">
                    {currency}
                    {item?.price.toFixed(2)} × {item?.quantity}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(decreaseQuantity(item?.id))}
                    >
                      –
                    </Button>
                    <span>{item?.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch(increaseQuantity(item?.id))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => dispatch(removeFromCart(item?.id))}
                >
                  ✕
                </Button>
              </div>
            ))
          )}
        </ScrollArea>

        <Separator />

        <DrawerFooter className="px-4">
          <div className="flex items-center justify-between font-medium text-lg">
            <span>Total:</span>
            <span>
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={items.length === 0}
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>

      {/* Guest Checkout Modal */}
      <GuestCheckoutModal
        open={showGuestModal}
        onClose={handleCloseGuestModal}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
        onContinueAsGuest={handleContinueAsGuest}
      />
    </Drawer>
  );
}
