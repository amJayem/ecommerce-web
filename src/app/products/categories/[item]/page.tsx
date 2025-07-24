// Category Item page placeholder with modern UX
import { Button } from '@/components/ui/button';

export default function CategoryItemPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Category Products</h1>
      <p className="text-gray-600 mb-6">Products for this category will be displayed here.</p>
      {/* TODO: Render products for this category */}
      <Button className="bg-green-600 hover:bg-green-700 text-white" disabled>Coming Soon</Button>
    </div>
  );
} 