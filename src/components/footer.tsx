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

export function Footer() {
  return (
    <footer className="bg-green-100 text-gray-800 mt-12">
      {/* Trust Signals */}
      <div className="bg-green-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6" />
              <span className="text-sm">
                Free Delivery on Orders Above ৳500
              </span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6" />
              <span className="text-sm">100% Secure Payment</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-6 h-6" />
              <span className="text-sm">Same Day Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xl mb-4 text-green-600">
              GroceryFresh
            </h4>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Delivering fresh groceries to your doorstep with love. We source
              the finest organic products from trusted farmers and deliver them
              with care.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold mb-4 text-gray-800">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products"
                  className="hover:text-green-600 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/categories"
                  className="hover:text-green-600 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="hover:text-green-600 transition-colors"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-green-600 transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:text-green-600 transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="font-semibold mb-4 text-gray-800">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-600 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-green-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-green-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-green-600 transition-colors"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-semibold mb-4 text-gray-800">Support</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/help"
                  className="hover:text-green-600 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-green-600 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-green-600 transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-green-600 transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-green-600 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-green-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Bottom Section */}
        <div className="border-t border-green-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>We accept:</span>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-green-600" />
                <span>Credit Cards</span>
                <span>•</span>
                <span>Debit Cards</span>
                <span>•</span>
                <span>Mobile Banking</span>
                <span>•</span>
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              © 2024 GroceryFresh. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
