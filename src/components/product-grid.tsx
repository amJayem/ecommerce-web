'use client'

import { products } from '@/lib/dummy-products'
import { ProductCard } from './product-card'

export function ProductGrid() {
  return (
    <section className='mt-10 px-4 md:px-8'>
      <h2 className='text-2xl font-bold mb-6 text-gray-900'>
        Popular Products
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
