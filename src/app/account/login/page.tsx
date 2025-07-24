// Account Login page placeholder with modern UX
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AccountLoginPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Login</h1>
      <p className="text-gray-600 mb-6">Login page coming soon. Don’t have an account?</p>
      <Link href="/account/register">
        <Button className="bg-green-600 hover:bg-green-700 text-white">Create Account</Button>
      </Link>
    </div>
  );
} 