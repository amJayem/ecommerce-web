"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { getSafeImageSrc } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4 relative group">
      {product?.discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          {product?.discount}% OFF
        </div>
      )}

      <div className="w-full h-40 relative mb-4 overflow-hidden rounded-lg">
        <Image
          src={getSafeImageSrc(product?.imageUrl)}
          alt={product?.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-800 hover:bg-gray-100"
          >
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </div>

      <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2">
        {product?.name}
      </h3>

      <p className="text-green-600 text-xl font-bold mb-6">৳{product?.price}</p>

      <Button
        className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        variant="default"
      >
        <ShoppingCart className="h-5 w-5 mr-3" />
        Add to Cart
      </Button>
    </div>
  );
}
