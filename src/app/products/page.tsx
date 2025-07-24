// All Products page with modern UX
import ProductGrid from '@/components/product-grid';

export default function AllProductsPage() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">All Products</h1>
      <ProductGrid />
    </div>
  );
} 