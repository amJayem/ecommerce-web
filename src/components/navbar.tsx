// components/navbar.tsx

"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/store";
import { toggleCart } from "@/store/cartSlice";
import { Menu, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { SearchBar } from "./search-bar";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle, LogIn } from "lucide-react";
import { getCategories, Category } from "@/lib/api";

export function Navbar() {
  const dispatch = useDispatch();
  const itemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Prevent hydration mismatch by only showing cart count after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to empty array if fetch fails
        setCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      window.location.reload(); // Refresh to clear auth state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const mainCategories = [
  //   { name: "Fruits", href: "/products/categories/fruits" },
  //   { name: "Vegetables", href: "/products/categories/vegetables" },
  //   { name: "Oils", href: "/products/categories/oils" },
  //   { name: "Honey", href: "/products/categories/honey" },
  //   { name: "Nuts", href: "/products/categories/nuts" },
  //   { name: "Seeds", href: "/products/categories/seeds" },
  //   { name: "Grains", href: "/products/categories/grains" },
  //   { name: "See All", href: "/products/categories" },
  // ];

  // Get first 7 categories
  const displayCategories = categories.slice(0, 7);
  const hasMoreCategories = categories.length > 7;

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
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account/profile" className="cursor-pointer">
                        <UserCircle className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link href="/account/login" className="cursor-pointer">
                      <LogIn className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => dispatch(toggleCart())}
            >
              <>
                <ShoppingCart className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-red-500 text-white 
                  text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {itemCount}
                  </span>
                )}
              </>
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
            {!isLoadingCategories &&
              displayCategories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="flex-shrink-0 px-4 py-3 text-white hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            {!isLoadingCategories && hasMoreCategories && (
              <Link
                href="/categories"
                className="flex-shrink-0 px-4 py-3 text-white hover:bg-green-700 transition-colors whitespace-nowrap font-semibold"
              >
                See All
              </Link>
            )}
            {isLoadingCategories && (
              <div className="flex-shrink-0 px-4 py-3 text-white">
                Loading categories...
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
