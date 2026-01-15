import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PackageOpen } from "lucide-react";

export default function AccountOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-12 md:p-20 text-center">
        <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <PackageOpen className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 max-w-xs mx-auto mb-8">
          Looks like you haven't placed any orders. Start shopping to see your
          history here!
        </p>
        <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl h-12 px-8">
            Browse Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
