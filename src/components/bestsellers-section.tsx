// components/bestsellers-section.tsx

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const bestsellerProducts = [
  {
    id: 1,
    name: "Pure Honey",
    price: 299,
    imageUrl: "/img/placeholder_image.png",
    category: "Honey",
  },
  {
    id: 2,
    name: "Mustard Oil",
    price: 189,
    imageUrl: "/img/placeholder_image.png",
    category: "Oils",
  },
  {
    id: 3,
    name: "Pure Ghee",
    price: 450,
    imageUrl: "/img/placeholder_image.png",
    category: "Dairy",
  },
  {
    id: 4,
    name: "Fresh Dates",
    price: 199,
    imageUrl: "/img/placeholder_image.png",
    category: "Fruits",
  },
  {
    id: 5,
    name: "Organic Almonds",
    price: 399,
    imageUrl: "/img/placeholder_image.png",
    category: "Nuts",
  },
  {
    id: 6,
    name: "Black Pepper",
    price: 89,
    imageUrl: "/img/placeholder_image.png",
    category: "Spices",
  },
];

export function BestsellersSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Bestsellers & Seasonal Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most popular products and seasonal favorites
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {bestsellerProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-4">
                <div className="w-full h-32 relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mb-4">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">
                  {product.name}
                </h3>

                <p className="text-green-600 text-lg font-bold mb-4">
                  ৳{product.price}
                </p>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  variant="default"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
