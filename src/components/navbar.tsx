// components/navbar.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store";
import { toggleCart } from "@/store/cartSlice";
import { Menu, ShoppingCart, User, Search } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export function Navbar() {
  const dispatch = useDispatch();
  const itemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const mainCategories = [
    { name: "Fruits", href: "/products/categories/fruits" },
    { name: "Vegetables", href: "/products/categories/vegetables" },
    { name: "Oils", href: "/products/categories/oils" },
    { name: "Honey", href: "/products/categories/honey" },
    { name: "Nuts", href: "/products/categories/nuts" },
    { name: "Seeds", href: "/products/categories/seeds" },
    { name: "Grains", href: "/products/categories/grains" },
    { name: "See All", href: "/products/categories" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-xl font-bold text-green-600">
          GroceryFresh
        </Link>

        {/* Center: Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 rounded-full border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            />
          </div>
        </div>

        {/* Right: Profile and Cart Icons */}
        <div className="flex items-center gap-3">
          <Link href="/account/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="relative"
            onClick={() => dispatch(toggleCart())}
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <nav className="bg-green-600 border-t border-green-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex-shrink-0 px-4 py-3 text-white hover:bg-green-700 transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
