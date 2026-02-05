// components/category-section.tsx

import { Category } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  LucideIcon,
  Apple,
  Carrot,
  Milk,
  Cookie,
  Fish,
  Drumstick,
  Croissant,
  Candy,
  Flame,
  Milk as Cheese,
  Wheat,
  Droplets as Oil,
  Home,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Apple,
  Carrot,
  Milk,
  Cookie,
  Fish,
  Drumstick,
  Croissant,
  Candy,
  Flame,
  Cheese,
  Wheat,
  Oil,
  Home,
};

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our wide range of fresh, organic products organized by
            category
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
          {categories
            .slice(0, 10)
            .map(({ id, name, slug, icon, productCount }) => {
              // Check if icon is an emoji (contains non-ASCII characters)
              const isEmoji = icon && /[^\x00-\x7F]/.test(icon);
              const IconComponent = !isEmoji ? iconMap[icon || "Apple"] : null;

              return (
                <Link href={`/categories/${slug || id}`} key={id}>
                  <div className="flex flex-col items-center p-6 bg-green-50 rounded-xl hover:shadow-lg hover:bg-green-100 transition-all duration-300 group">
                    <div className="p-3 bg-white rounded-full mb-4 group-hover:scale-110 transition-transform">
                      {isEmoji ? (
                        <span className="text-3xl">{icon}</span>
                      ) : IconComponent ? (
                        <IconComponent size={28} className="text-green-600" />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700 text-center mb-2">
                      {name}
                    </span>
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {productCount || 0} products
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>

        <div className="text-center">
          <Link href="/categories">
            <Button
              variant="outline"
              size="lg"
              className="text-green-700 border-green-500 hover:bg-green-600 hover:text-white px-8 py-3"
            >
              See All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
