// app/products/[id]/page.tsx - Server-side data fetching
import { fetchProductById } from "@/lib/api/product";
import Image from "next/image";
import { notFound } from "next/navigation";
import ProductActions from "./product-actions";

// API response type (what we get from the backend)
interface ProductApiResponse {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  stock?: number;
  brand?: string;
  discount?: number;
  weight?: number;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Product interface for our app (with proper Date types)
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category?: string;
  stock: number;
  brand?: string;
  discount?: number;
  weight?: number;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const sanitizeProduct = (data: ProductApiResponse): Product => {
  return {
    id: data.id ?? 0, // Default to 0 if not present
    name: data.name ?? "N/A", // Default to "N/A" if not present
    description: data.description ?? "", // Ensure description is always a string
    price: data.price ?? 0, // Default to 0 if not present
    imageUrl: data.imageUrl ?? "/img/placeholder_image.png",
    category: data.category ?? "Uncategorized",
    stock: data.stock ?? 0, // Default to 0 if not present
    brand: data.brand ?? "Unknown Brand",
    discount: data.discount ?? 0,
    weight: data.weight ?? 0,
    isFeatured: data.isFeatured ?? false, // Default to false if not present
    createdAt: new Date(data.createdAt ?? ""), // Default to current date if not present
    updatedAt: new Date(data.updatedAt ?? ""), // Default to current date if not present
  };
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product | null = null;

  try {
    // Fetch product data server-side for better performance and SEO
    const rawData = await fetchProductById(+id);
    product = sanitizeProduct(rawData);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return notFound();
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="w-full h-[400px] relative">
        <Image
          src={product.imageUrl || "/img/placeholder_image.png"}
          alt={product.name}
          fill
          className="object-contain rounded-xl bg-gray-50"
        />
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold text-green-700">{product.name}</h1>
        <p className="text-gray-600 text-sm mt-2">{product.description}</p>

        <div className="mt-4 text-xl text-green-800 font-bold">
          ৳{product.price}
        </div>
        {product.discount && product.discount > 0 && (
          <div className="mt-1 text-red-500 text-sm">
            -{product.discount}% OFF
          </div>
        )}

        <div className="mt-2 text-sm text-gray-500">
          Category: {product.category}
        </div>
        <div className="text-sm text-gray-500">Brand: {product.brand}</div>
        <div className="text-sm text-gray-500">Weight: {product.weight}g</div>
        <div className="text-sm text-gray-500">Stock: {product.stock}</div>
        {product.isFeatured && (
          <div className="text-sm text-blue-600 font-medium">⭐ Featured Product</div>
        )}

        {/* Client component for cart interactions */}
        <ProductActions product={product} />
      </div>

      {/* Suggested Products */}
      <div className="md:col-span-2 mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          You may also like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Suggested products will be implemented here */}
        </div>
      </div>
    </div>
  );
}
