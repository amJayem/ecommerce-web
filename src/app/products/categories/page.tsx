// Categories page placeholder with modern UX
import { Button } from '@/components/ui/button';

export default function CategoriesPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Product Categories</h1>
      <p className="text-gray-600 mb-6">Browse products by category. (Categories list coming soon.)</p>
      {/* TODO: Render categories list here */}
      <Button className="bg-green-600 hover:bg-green-700 text-white" disabled>Coming Soon</Button>
    </div>
  );
} 