// components/hero-section.tsx

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-green-50 w-full py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text Section */}
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-green-700 leading-tight">
            Fresh Groceries Delivered <br /> At Your Doorstep
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Shop daily essentials, organic items, and everything in between.
            Fast, reliable delivery at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                Shop Now
              </Button>
            </Link>
            <Link href="/products/categories">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 text-lg"
              >
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/hero-image.png"
            alt="Grocery delivery illustration"
            width={600}
            height={500}
            className="object-contain rounded-xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
