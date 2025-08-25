// components/newsletter-signup.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSignup() {
  return (
    <section className="w-full py-16 bg-green-600">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe for Exclusive Offers
          </h2>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Get 10% off your first order and stay updated with our latest
            products and seasonal offers
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="flex-1 relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input pl-12 pr-4 py-4 text-base border-2 border-white/30 bg-white/10 text-white placeholder:text-green-200 rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-600 focus-visible:border-white transition-all duration-300"
            />
          </div>
          <Button
            size="lg"
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Subscribe
          </Button>
        </div>

        <p className="text-green-100 text-sm mt-6">
          By subscribing, you agree to our Privacy Policy and Terms of Service
        </p>
      </div>
    </section>
  );
}
