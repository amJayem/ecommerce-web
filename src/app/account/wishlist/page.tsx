// Account Wishlist page placeholder with modern UX
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountWishlistPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Your Account Wishlist</h1>
      <p className="text-gray-600 mb-6">You haven’t added any products to your account wishlist yet.</p>
      <Link href="/products">
        <Button className="bg-green-600 hover:bg-green-700 text-white">Browse Products</Button>
      </Link>
    </div>
  );
} 