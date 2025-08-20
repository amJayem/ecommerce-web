"use client";

import { Button } from "@/components/ui/button";
import { addToCart, toggleCart } from "@/store/cartSlice";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getSafeImageSrc } from "@/lib/utils";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  coverImage: string;
};

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const dispatch = useDispatch();
  console.log("products: ", products);
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products?.map((product) => (
        <div
          key={product?.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <Image
            src={getSafeImageSrc(product?.coverImage)}
            alt={product?.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-md"
          />
          <Link href={`/products/${product?.id}`}>
            <h3 className="mt-2 text-lg font-semibold text-gray-800 ">
              {product?.name}
            </h3>
          </Link>
          <p className="text-green-600 font-bold">৳ {product?.price}</p>

          <Button
            className="mt-2 w-full"
            onClick={() => {
              dispatch(addToCart(product));
              dispatch(toggleCart());
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      ))}
    </section>
  );
}
