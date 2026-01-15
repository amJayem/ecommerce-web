import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function AccountWishlistPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-12 md:p-20 text-center">
        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-green-600 fill-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 max-w-xs mx-auto mb-8">
          Save items you love to find them easily later and stay updated on
          price drops.
        </p>
        <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 px-8">
            Explore Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
