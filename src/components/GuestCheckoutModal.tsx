"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  UserPlus,
  ShoppingBag,
  Package,
  MapPin,
  Clock,
  Gift,
  Sparkles,
} from "lucide-react";

interface GuestCheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export function GuestCheckoutModal({ open, onClose }: GuestCheckoutModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/account/login?from=/checkout");
  };

  const handleSignUp = () => {
    router.push("/account/register?from=/checkout");
  };

  const handleContinueAsGuest = () => {
    onClose();
  };

  const benefits = [
    { icon: Package, text: "Track your orders in real-time" },
    { icon: MapPin, text: "Save addresses for faster checkout" },
    { icon: Clock, text: "View complete order history" },
    { icon: Gift, text: "Get exclusive offers & early access" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-8 pb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-24 -mb-24" />

          <DialogHeader className="relative">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm border border-white/30">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-3xl font-black text-white text-center leading-tight">
              Welcome to Checkout!
            </DialogTitle>
            <p className="text-green-50 text-center font-medium mt-2">
              Sign in to unlock a better shopping experience
            </p>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 -mt-6">
          {/* Benefits Grid */}
          <div className="bg-gradient-to-br from-gray-50 to-green-50/30 rounded-3xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              Member Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* Sign In */}
            <Button
              onClick={handleSignIn}
              className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-base shadow-lg shadow-green-100 transition-all active:scale-95"
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Sign In to Your Account
            </Button>

            {/* Sign Up */}
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="w-full h-14 rounded-2xl border-2 border-green-600 text-green-600 hover:bg-green-50 font-black text-base transition-all active:scale-95"
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Create New Account
            </Button>

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Or
                </span>
              </div>
            </div>

            {/* Continue as Guest */}
            <Button
              onClick={handleContinueAsGuest}
              variant="ghost"
              className="w-full h-12 rounded-2xl text-gray-600 hover:bg-gray-50 font-bold transition-all"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue as Guest
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-gray-500 leading-relaxed">
            You can always create an account later. Your order details will be
            sent to your email.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
