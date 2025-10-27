// components/navbar.tsx

"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { toggleCart } from "@/store/cartSlice";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "./search-bar";

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
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-green-600 flex-shrink-0"
          >
            GroceryFresh
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <SearchBar className="w-full" />
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden flex-1">
            <SearchBar className="w-full" />
          </div>

          {/* Right: Profile and Cart Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link href="/account/profile" className="hidden sm:block">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white 
                text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
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
