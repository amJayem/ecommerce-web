"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  addToCart,
} from "@/store/cartSlice";

interface QuantityUpdaterProps {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    coverImage?: string;
    stock: number;
  };
  currentQuantity: number;
  className?: string;
}

export function QuantityUpdater({
  product,
  currentQuantity,
  className = "",
}: QuantityUpdaterProps) {
  const dispatch = useDispatch();

  // If product is not in cart, show Add to Cart button
  if (currentQuantity === 0) {
    return (
      <Button
        className={`w-full bg-green-600 ${
          product.stock < 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-700 text-white py-4 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${className}"
        } `}
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </Button>
    );
  }

  // If product is in cart, show quantity controls
  return (
    <div
      className={`flex items-center justify-between gap-3 p-3 bg-green-50 rounded-lg border border-green-200 ${className}`}
    >
      <span className="text-sm font-medium text-gray-700">Quantity:</span>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(decreaseQuantity(product.id))}
          disabled={currentQuantity <= 1}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-4 h-4" />
        </Button>

        <span className="px-3 py-1 border rounded min-w-[3rem] text-center font-medium text-gray-800">
          {currentQuantity}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(increaseQuantity(product.id))}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
