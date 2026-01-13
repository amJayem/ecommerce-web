// components/footer.tsx
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Shield,
  Truck,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 mt-auto border-t border-gray-100">
      {/* Trust Signals */}
      <div className="bg-green-600 text-white py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-green-500/50">
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <Truck className="w-6 h-6" />
              <span className="font-medium">
                Free Delivery on Orders Above ৳500
              </span>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <Shield className="w-6 h-6" />
              <span className="font-medium">100% Secure Payment</span>
            </div>
            <div className="flex items-center justify-center gap-3 py-2 md:py-0">
              <Clock className="w-6 h-6" />
              <span className="font-medium">Same Day Delivery</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-2xl mb-6 text-green-700 tracking-tight">
              GroceryFresh
            </h4>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-sm">
              Delivering fresh groceries to your doorstep with love. We source
              the finest organic products from trusted farmers and deliver them
              with care.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-gray-900 mb-6 text-lg">Shop</h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/categories"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/best-sellers"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Deals & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-bold text-gray-900 mb-6 text-lg">Company</h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-gray-900 mb-6 text-lg">Support</h5>
            <ul className="space-y-3 text-sm font-medium">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Section */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-gray-500 font-medium">
              © {new Date().getFullYear()} GroceryFresh. All rights reserved.
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded shadow-sm border border-gray-100 h-8 flex items-center">
                <CreditCard className="w-5 h-5 text-gray-600" />
              </div>
              <span className="text-xs text-gray-400 font-medium px-2">
                Secure Payment Partners
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
