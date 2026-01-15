"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { name: "My profile", href: "/account/profile", icon: User },
  { name: "My orders", href: "/account/orders", icon: Package },
  { name: "Addresses", href: "/account/addresses", icon: MapPin },
  {
    name: "Payment methods",
    href: "/account/payment-methods",
    icon: CreditCard,
  },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Settings", href: "/account/settings", icon: Settings },
  { name: "Support", href: "/account/support", icon: HelpCircle },
];

const routeTitles: Record<
  string,
  { title: string; subtitle: string; breadcrumb: string }
> = {
  "/account/profile": {
    title: "Your profile",
    subtitle: "Manage your account information and preferences",
    breadcrumb: "Profile",
  },
  "/account/orders": {
    title: "My orders",
    subtitle: "View and track your order history",
    breadcrumb: "Orders",
  },
  "/account/addresses": {
    title: "My addresses",
    subtitle: "Manage your shipping and billing addresses",
    breadcrumb: "Addresses",
  },
  "/account/payment-methods": {
    title: "Payment methods",
    subtitle: "Manage your saved cards and payment options",
    breadcrumb: "Payment methods",
  },
  "/account/wishlist": {
    title: "My wishlist",
    subtitle: "Products you've saved for later",
    breadcrumb: "Wishlist",
  },
  "/account/settings": {
    title: "Account settings",
    subtitle: "Global account preferences and privacy",
    breadcrumb: "Settings",
  },
  "/account/support": {
    title: "Support",
    subtitle: "Get help with your orders and account",
    breadcrumb: "Support",
  },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentRoute = routeTitles[pathname] || {
    title: "My account",
    subtitle: "Manage your account",
    breadcrumb: "Dashboard",
  };

  return (
    <div className="bg-gray-50/50 min-h-screen">
      <Container className="py-12 md:py-16">
        {/* Breadcrumb & Page Title Section per User Spec */}
        <div className="text-center mb-12">
          <nav className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 mb-4">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/account/profile"
              className="hover:text-green-600 transition-colors"
            >
              Account
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-green-600 font-bold">
              {currentRoute.breadcrumb}
            </span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
            {currentRoute.title}
          </h1>
          <p className="text-gray-500 font-medium tracking-tight">
            {currentRoute.subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          {/* Mobile Menu Trigger - Sticky pinned under header */}
          <div className="lg:hidden w-full sticky top-[112px] z-30 mb-8 px-0.5">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-gray-100 transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Menu className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-900">Account Menu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  {currentRoute.breadcrumb}
                </span>
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 transition-transform rotate-0" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </div>
            </button>
          </div>

          {/* Sidebar - Sticky on desktop */}
          <aside
            className={cn(
              "lg:w-[280px] w-full bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden shrink-0",
              "lg:sticky lg:top-[128px] lg:max-h-[calc(100vh-160px)] lg:overflow-y-auto scrollbar-hide",
              "lg:block",
              isMobileMenuOpen ? "block" : "hidden"
            )}
          >
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl transition-all group font-medium",
                      isActive
                        ? "bg-green-50 text-green-700 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.1)]"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-green-600"
                            : "text-gray-400 group-hover:text-gray-600"
                        )}
                      />
                      <span>{link.name}</span>
                    </div>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-gray-100 p-2">
                <button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-3 p-4 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all font-bold group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span>Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
