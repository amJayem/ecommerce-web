// All Products page with modern UX - Server-side data fetching
import ProductGrid from "@/components/product-grid";
import { fetchAllProducts } from "@/lib/api/product";

// Avoid build-time API calls; always render dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  coverImage: string;
};

export default async function AllProductsPage() {
  let products: Product[] = [];

  try {
    // Fetch products server-side for better performance and SEO
    const productsRaw = await fetchAllProducts();

    // Sanitize products (moved from client component)
    products = productsRaw.map((data) => ({
      id: data.id ?? Date.now(),
      name: data.name ?? "Unknown Product",
      price: data.price ?? 0,
      imageUrl: data.imageUrl ?? "/img/placeholder_image.png",
      coverImage: data.coverImage ?? "/img/placeholder_image.png",
    }));
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Return empty products array - the grid will handle empty state
    products = [];
  }

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of fresh, organic products
          </p>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
