export function ProductSkeleton() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm p-4 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>

      {/* Content skeleton */}
      <div className="space-y-2 mb-4">
        {/* Badge skeleton */}
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>

        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/2"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Price skeleton */}
        <div className="pt-2">
          <div className="h-6 bg-green-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mt-1"></div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="h-10 bg-gray-200 rounded-lg"></div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
